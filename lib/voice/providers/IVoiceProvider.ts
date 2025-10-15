/**
 * IVoiceProvider Interface
 * 
 * Common interface for voice providers - OpenAI Realtime API
 */

export interface VoiceTranscript {
  text: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  interim?: boolean;
}

export interface VoiceProviderEvents {
  connected: () => void;
  disconnected: () => void;
  reconnected: () => void;
  connection_error: (error: Error) => void;
  call_started: () => void;
  call_ended: () => void;
  audio_start: () => void;
  audio_end: () => void;
  transcript: (transcript: VoiceTranscript) => void;
  interim_transcript: (text: string) => void;
  ui_action: (action: any) => void;
  session_created: (session: any) => void;
  session_updated: (session: any) => void;
  metrics_updated: (metrics: any) => void;
}

export interface IVoiceProvider {
  // Connection management
  connect(token: string, wsUrl?: string, hasExistingContext?: boolean): Promise<void>;
  disconnect(): void;
  isConnected(): boolean;
  
  // Call management
  startCall(): Promise<void>;
  endCall(): void;
  isCallActive(): boolean;
  
  // Communication
  sendText(text: string): void;
  setContext(messages: Array<{ text: string; isUser: boolean }>): void;
  
  // Event handling
  on<K extends keyof VoiceProviderEvents>(event: K, handler: VoiceProviderEvents[K]): void;
  off<K extends keyof VoiceProviderEvents>(event: K, handler: VoiceProviderEvents[K]): void;
  emit<K extends keyof VoiceProviderEvents>(event: K, ...args: Parameters<VoiceProviderEvents[K]>): void;
  
  // Provider info
  getProviderName(): string;
  getProviderVersion(): string;
  getSupportedVoices(): string[];
  getSupportedFeatures(): string[];
}

export abstract class BaseVoiceProvider implements IVoiceProvider {
  protected listeners: Partial<Record<keyof VoiceProviderEvents, Function[]>> = {};
  protected connected = false;
  protected callActive = false;
  
  // Abstract methods that must be implemented by specific providers
  abstract connect(token: string, wsUrl?: string, hasExistingContext?: boolean): Promise<void>;
  abstract disconnect(): void;
  abstract startCall(): Promise<void>;
  abstract endCall(): void;
  abstract sendText(text: string): void;
  abstract setContext(messages: Array<{ text: string; isUser: boolean }>): void;
  abstract getProviderName(): string;
  abstract getProviderVersion(): string;
  abstract getSupportedVoices(): string[];
  abstract getSupportedFeatures(): string[];
  
  isConnected(): boolean {
    return this.connected;
  }
  
  isCallActive(): boolean {
    return this.callActive;
  }
  
  on<K extends keyof VoiceProviderEvents>(event: K, handler: VoiceProviderEvents[K]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler as Function);
  }
  
  off<K extends keyof VoiceProviderEvents>(event: K, handler: VoiceProviderEvents[K]): void {
    const handlers = this.listeners[event];
    if (handlers) {
      const index = handlers.indexOf(handler as Function);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }
  
  emit<K extends keyof VoiceProviderEvents>(event: K, ...args: Parameters<VoiceProviderEvents[K]>): void {
    const handlers = this.listeners[event];
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }
}