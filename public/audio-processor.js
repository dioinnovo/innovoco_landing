/**
 * AudioWorklet Processor for Real-time Audio Streaming
 *
 * Replaces deprecated ScriptProcessorNode for better performance and lower latency
 */

class RealtimeAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = [];
    this.bufferSize = 2048; // Match the previous ScriptProcessor buffer size
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];

    if (input && input.length > 0) {
      const inputChannel = input[0]; // Mono channel

      // Accumulate samples
      for (let i = 0; i < inputChannel.length; i++) {
        this.buffer.push(inputChannel[i]);
      }

      // When we have enough samples, send them to main thread
      if (this.buffer.length >= this.bufferSize) {
        // Convert Float32Array to regular array for postMessage
        const audioData = new Float32Array(this.buffer.splice(0, this.bufferSize));

        this.port.postMessage({
          type: 'audio',
          data: audioData
        });
      }
    }

    // Return true to keep processor alive
    return true;
  }
}

registerProcessor('realtime-audio-processor', RealtimeAudioProcessor);
