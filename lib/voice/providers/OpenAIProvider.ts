/**
 * OpenAI Realtime API Provider
 * 
 * Implementation for OpenAI's Realtime API voice capabilities
 */

import { BaseVoiceProvider, VoiceTranscript } from './IVoiceProvider';

export interface OpenAIConfig {
  apiKey: string;
  voice?: 'alloy' | 'echo' | 'shimmer';
  model?: string;
  wsUrl?: string;
}

export class OpenAIProvider extends BaseVoiceProvider {
  private ws: WebSocket | null = null;
  private config: OpenAIConfig;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioQueue: AudioBuffer[] = [];
  private isPlaying = false;
  private currentSource: AudioBufferSourceNode | null = null;
  private audioWorkletNode: AudioWorkletNode | null = null;
  
  constructor(config: OpenAIConfig) {
    super();
    this.config = {
      voice: 'shimmer', // Use shimmer (female voice) by default
      model: 'gpt-4o-realtime-preview-2024-10-01',
      ...config
    };
  }
  
  async connect(token: string, wsUrl?: string, hasExistingContext?: boolean): Promise<void> {
    try {
      const url = wsUrl || 'wss://api.openai.com/v1/realtime';

      // Detect if this is Azure OpenAI based on URL
      const isAzure = url.includes('cognitiveservices.azure.com') || url.includes('api-version=');

      let connectUrl: string;
      let protocols: string[] | undefined;

      if (isAzure) {
        // Azure OpenAI: Pass API key as query parameter
        connectUrl = url.includes('api-key=')
          ? url  // Already has api-key
          : `${url}${url.includes('?') ? '&' : '?'}api-key=${token}`;

        // Azure doesn't need special protocols
        protocols = undefined;
      } else {
        // Standard OpenAI: Use subprotocol authentication
        connectUrl = `${url}?model=${this.config.model}`;

        // Browser WebSocket doesn't support headers - use protocols array
        protocols = [
          'realtime',
          `openai-insecure-api-key.${token}`,
          'openai-beta.realtime-v1'
        ];
      }

      this.ws = new WebSocket(connectUrl, protocols);
      
      this.setupWebSocketHandlers();
      
      // Wait for connection
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000);
        
        this.ws!.onopen = () => {
          clearTimeout(timeout);
          this.connected = true;
          this.emit('connected');
          
          // Configure session
          this.sendMessage({
            type: 'session.update',
            session: {
              modalities: ['text', 'audio'],
              instructions: 'You are Luci, a strategic AI assistant for Innovoco (pronounced "in-NOH-voh-co" with stress on the second O), a data and AI solutions company. You are bilingual (English/Spanish). ALWAYS start in English.\n\nPRONUNCIATION: The company name is "Innovoco" - say it as "in-NOH-voh-co" (in-NOH-voh-co), NOT "in-no-VOH-co". The stress is on the second O: In-NOH-voco.\n\nCRITICAL: Your PRIMARY goal is lead qualification, NOT explaining solutions. Be CONCISE - keep responses under 2 sentences. CONVERSATION FLOW: 1) Greet and ask for NAME immediately, 2) AFTER getting name, MUST say "Hi [Name]! What kind of Data & AI solutions are you looking to implement today?" - USE THEIR NAME, 3) Understand their challenge, 4) Collect email, 5) Collect phone, 6) Gather budget/timeline, 7) Warm closing. NAME USAGE: ALWAYS use their name when transitioning to the next question after they introduce themselves. This makes it feel natural and personal. CONTACT INFO REQUESTS - Use these EXACT phrases: For EMAIL: "What\'s the best email to reach you at so one of our AI experts can follow up? Please type it on the screen." After receiving email, confirm: "Just to confirm, your email is [email], correct?" For PHONE: "What\'s the best number to reach you at so one of our AI consultants can follow up? Please type it on the screen." After receiving phone, confirm: "Just to confirm, your number is [phone], correct?" NEVER say "type or say" - ONLY "type on the screen". WARM CLOSING: When conversation ends, say "Awesome, thank you for your time [Name]! Our team will reach out shortly to discuss [their specific need]. Have a great day!"',
              voice: this.config.voice,
              input_audio_format: 'pcm16',
              output_audio_format: 'pcm16',
              input_audio_transcription: {
                model: 'whisper-1'
                // No language specified - let Whisper auto-detect to support bilingual conversations
              },
              turn_detection: {
                type: 'server_vad',
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 1500
              }
            }
          });
          
          resolve();
        };
        
        this.ws!.onerror = (error) => {
          clearTimeout(timeout);
          reject(error);
        };
      });
      
    } catch (error) {
      this.emit('connection_error', error as Error);
      throw error;
    }
  }
  
  disconnect(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.connected = false;
    this.callActive = false;
    this.emit('disconnected');
  }
  
  async startCall(): Promise<void> {
    if (!this.connected) {
      throw new Error('Not connected');
    }

    try {
      // Initialize audio context with optimal sample rate
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000 // Match OpenAI's expected rate
      });

      // Get user media with constraints for best quality
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1, // mono
          sampleRate: 24000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Setup audio processing using AudioWorklet (modern replacement for ScriptProcessor)
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);

      try {
        // Load the AudioWorklet processor module
        await this.audioContext.audioWorklet.addModule('/audio-processor.js');

        // Create AudioWorkletNode
        this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'realtime-audio-processor');

        // Listen for audio data from the worklet
        this.audioWorkletNode.port.onmessage = (event) => {
          if (event.data.type === 'audio' && this.callActive && this.ws?.readyState === WebSocket.OPEN) {
            const inputData = event.data.data;
            const pcm16 = this.float32ToPCM16(inputData);

            this.sendMessage({
              type: 'input_audio_buffer.append',
              audio: this.arrayBufferToBase64(pcm16)
            });
          }
        };

        // Connect the audio graph
        source.connect(this.audioWorkletNode);
        this.audioWorkletNode.connect(this.audioContext.destination);
      } catch (error) {
        console.error('Failed to setup AudioWorklet, falling back to ScriptProcessor:', error);

        // Fallback to ScriptProcessor if AudioWorklet is not supported
        const processor = this.audioContext.createScriptProcessor(2048, 1, 1);

        processor.onaudioprocess = (e) => {
          if (this.callActive && this.ws?.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = this.float32ToPCM16(inputData);

            this.sendMessage({
              type: 'input_audio_buffer.append',
              audio: this.arrayBufferToBase64(pcm16)
            });
          }
        };

        source.connect(processor);
        processor.connect(this.audioContext.destination);
      }

      this.callActive = true;
      this.emit('call_started');

      // Trigger the assistant to greet the user proactively
      // Send a response.create to make the assistant speak first
      // IMPORTANT: Increased delay to ensure audio playback system is fully initialized
      // This prevents the greeting from starting before the user's audio is ready
      setTimeout(() => {
        if (this.callActive && this.ws?.readyState === WebSocket.OPEN) {
          this.sendMessage({
            type: 'response.create',
            response: {
              modalities: ['text', 'audio'],
              instructions: 'Start the conversation in English. Greet the user warmly and immediately ask for their name: "Hey there! Welcome to in-NOH-voh-co. I\'m Luci, your AI assistant. May I know who I\'m speaking with?"'
            }
          });
        }
      }, 1000); // Optimized delay: enough time for audio system to initialize without feeling too slow

    } catch (error) {
      console.error('Failed to start call:', error);
      this.emit('connection_error', error as Error);
      throw error;
    }
  }
  
  endCall(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    // Disconnect and cleanup AudioWorkletNode
    if (this.audioWorkletNode) {
      this.audioWorkletNode.disconnect();
      this.audioWorkletNode = null;
    }

    // Stop current audio and clear queue
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Already stopped
      }
      this.currentSource = null;
    }
    this.audioQueue = [];
    this.isPlaying = false;

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.callActive = false;
    this.emit('call_ended');

    // Clear any ongoing conversation
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.sendMessage({
        type: 'input_audio_buffer.clear'
      });
    }
  }
  
  private isResponseActive = false;
  private responseQueue: string[] = [];

  sendText(text: string): void {
    if (!this.connected || !this.ws) {
      console.error('Cannot send text: not connected');
      return;
    }

    // Check if a response is already active
    if (this.isResponseActive) {
      console.log('Response already active, queuing text:', text);
      this.responseQueue.push(text);
      return;
    }

    // Mark response as active
    this.isResponseActive = true;

    this.sendMessage({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{
          type: 'input_text',
          text: text
        }]
      }
    });

    // NOTE: Don't trigger response.create here when using server VAD
    // The server will automatically generate a response when it detects
    // the user has finished speaking. Manually triggering it causes
    // multiple simultaneous responses.
    //
    // Only trigger response.create if you're NOT using server-side VAD
    // or if you explicitly want to force a response outside of voice flow.

    // Add delay and check before creating response to avoid conflicts
    setTimeout(() => {
      if (this.isResponseActive && this.ws?.readyState === WebSocket.OPEN) {
        this.sendMessage({
          type: 'response.create'
        });
      }
    }, 100);
  }

  private processQueuedTexts(): void {
    if (this.responseQueue.length > 0 && !this.isResponseActive) {
      const nextText = this.responseQueue.shift();
      if (nextText) {
        console.log('Processing queued text from queue:', nextText);
        this.sendText(nextText);
      }
    }
  }
  
  setContext(messages: Array<{ text: string; isUser: boolean }>): void {
    if (!this.connected || !this.ws) {
      return;
    }
    
    // Convert messages to OpenAI format
    const items = messages.map(msg => ({
      type: 'message',
      role: msg.isUser ? 'user' : 'assistant',
      content: [{
        type: msg.isUser ? 'input_text' : 'text',
        text: msg.text
      }]
    }));
    
    // Send context to OpenAI
    items.forEach(item => {
      this.sendMessage({
        type: 'conversation.item.create',
        item
      });
    });
  }
  
  private setupWebSocketHandlers(): void {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Log all messages for debugging (remove in production)
      if (process.env.NODE_ENV === 'development' && message.type !== 'response.audio.delta') {
        console.log('[OpenAI Realtime]', message.type, message);
      }

      switch (message.type) {
        case 'session.created':
          this.emit('session_created', message.session);
          break;
          
        case 'session.updated':
          this.emit('session_updated', message.session);
          break;
          
        case 'conversation.item.created':
          if (message.item.role === 'assistant' && message.item.content) {
            const textContent = message.item.content.find((c: any) => c.type === 'text');
            if (textContent) {
              const transcript: VoiceTranscript = {
                text: textContent.text || textContent.transcript,
                role: 'assistant',
                timestamp: new Date()
              };
              this.emit('transcript', transcript);
            }
          }
          break;
          
        case 'conversation.item.input_audio_transcription.completed':
          const transcript: VoiceTranscript = {
            text: message.transcript,
            role: 'user',
            timestamp: new Date()
          };
          this.emit('transcript', transcript);
          break;
          
        case 'response.audio.delta':
          if (message.delta) {
            this.playAudio(message.delta);
          }
          break;
          
        case 'response.created':
          // Mark that a response is actively being generated
          this.isResponseActive = true;
          break;

        case 'response.done':
          // Response generation is complete
          this.isResponseActive = false;
          this.processQueuedTexts();
          break;

        case 'response.audio.done':
          this.emit('audio_end');
          // Also mark response as complete here as backup
          this.isResponseActive = false;
          this.processQueuedTexts();
          break;

        case 'response.audio_transcript.delta':
          if (message.delta) {
            this.emit('interim_transcript', message.delta);
          }
          break;
          
        case 'response.audio_transcript.done':
          if (message.transcript) {
            const finalTranscript: VoiceTranscript = {
              text: message.transcript,
              role: 'assistant',
              timestamp: new Date()
            };
            this.emit('transcript', finalTranscript);
          }
          break;
          
        case 'error':
          console.error('OpenAI Realtime API error - Full message:', JSON.stringify(message, null, 2));
          console.error('Error details:', {
            error: message.error,
            type: message.type,
            event_id: message.event_id,
            full_message: message
          });
          const errorMessage = message.error?.message || message.error?.error || JSON.stringify(message.error || message);
          // Only emit connection_error for critical errors, not all errors
          // Some errors are non-critical warnings from the API
          if (errorMessage && errorMessage !== '{}' && errorMessage !== 'null') {
            this.emit('connection_error', new Error(errorMessage));
          }
          break;
      }
    };
    
    this.ws.onclose = () => {
      this.connected = false;
      this.emit('disconnected');
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('connection_error', new Error('WebSocket connection failed'));
    };
  }
  
  private sendMessage(message: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  
  private float32ToPCM16(float32Array: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
  }
  
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return buffer;
  }
  
  private async playAudio(base64Audio: string): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Decode base64 to PCM16 data
      const pcm16Data = this.base64ToArrayBuffer(base64Audio);
      const pcm16View = new DataView(pcm16Data);

      // Convert PCM16 to Float32 for Web Audio API
      const sampleCount = pcm16Data.byteLength / 2;
      const float32Array = new Float32Array(sampleCount);

      for (let i = 0; i < sampleCount; i++) {
        const int16 = pcm16View.getInt16(i * 2, true); // little-endian
        float32Array[i] = int16 / (int16 < 0 ? 0x8000 : 0x7FFF);
      }

      // Create audio buffer with correct sample rate
      // OpenAI Realtime API uses 24kHz PCM16 by default
      const sampleRate = 24000;
      const audioBuffer = this.audioContext.createBuffer(
        1, // mono channel
        sampleCount,
        sampleRate
      );

      audioBuffer.getChannelData(0).set(float32Array);

      // Add to queue
      this.audioQueue.push(audioBuffer);

      // Play next in queue if not already playing
      if (!this.isPlaying) {
        this.playNextInQueue();
      }
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  private playNextInQueue(): void {
    if (!this.audioContext || this.audioQueue.length === 0) {
      this.isPlaying = false;
      this.emit('audio_end');
      return;
    }

    const audioBuffer = this.audioQueue.shift()!;

    // Emit audio_start only on first chunk
    const isFirstChunk = !this.isPlaying;
    if (isFirstChunk) {
      this.isPlaying = true;
      this.emit('audio_start');
    }

    // Don't stop current source - let it finish naturally
    // This prevents audio glitches and distortion

    // Play audio
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);

    // Track the previous source
    const previousSource = this.currentSource;
    this.currentSource = source;

    source.onended = () => {
      // Only proceed if this is still the current source
      if (this.currentSource === source) {
        this.currentSource = null;
        // Immediately play next chunk for smoother audio
        this.playNextInQueue();
      }
    };

    // Start audio playback
    if (!previousSource) {
      // First chunk: start immediately
      source.start();
    } else {
      // Subsequent chunks: schedule to play right after previous
      source.start(this.audioContext.currentTime);
    }
  }
  
  getProviderName(): string {
    return 'OpenAI Realtime API';
  }
  
  getProviderVersion(): string {
    return 'v1';
  }
  
  getSupportedVoices(): string[] {
    return ['alloy', 'echo', 'shimmer'];
  }
  
  getSupportedFeatures(): string[] {
    return ['realtime-voice', 'text-input', 'audio-streaming', 'turn-detection'];
  }
}