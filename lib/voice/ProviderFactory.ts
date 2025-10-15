/**
 * Voice Provider Factory
 * 
 * Factory for creating voice provider instances (OpenAI, Hume, etc.)
 */

import { IVoiceProvider } from './providers/IVoiceProvider';
import { OpenAIProvider } from './providers/OpenAIProvider';

export type VoiceProvider = 'openai' | 'azure' | 'hume';

export interface VoiceConfig {
  provider: VoiceProvider;
  sessionId: string;
  orchestratorEndpoint?: string;
  apiKey?: string;
  voice?: string;
  
  // OpenAI specific config
  openai?: {
    voice?: 'alloy' | 'echo' | 'shimmer';
    model?: string;
    wsUrl?: string;
  };

  // Azure OpenAI specific config
  azure?: {
    endpoint?: string;
    deployment?: string;
    apiVersion?: string;
    voice?: 'alloy' | 'echo' | 'shimmer';
    wsUrl?: string;
  };
  
  // Hume specific config (placeholder for future implementation)
  hume?: {
    configId?: string;
    configVersion?: string;
    voiceId?: string;
    resumedChatGroupId?: string;
    verboseTranscription?: boolean;
  };
}

class VoiceProviderFactory {
  private providers: Map<VoiceProvider, typeof OpenAIProvider> = new Map();
  
  constructor() {
    // Register available providers
    this.providers.set('openai', OpenAIProvider);
    this.providers.set('azure', OpenAIProvider); // Azure uses same protocol as OpenAI
    // Hume provider would be registered here when implemented
    // this.providers.set('hume', HumeProvider);
  }
  
  createProvider(config: VoiceConfig): IVoiceProvider {
    const ProviderClass = this.providers.get(config.provider);

    if (!ProviderClass) {
      // Default to OpenAI if provider not found
      console.warn(`Provider ${config.provider} not found, defaulting to OpenAI`);
      return this.createOpenAIProvider(config);
    }

    switch (config.provider) {
      case 'openai':
        return this.createOpenAIProvider(config);
      case 'azure':
        return this.createAzureProvider(config);
      case 'hume':
        // For now, return OpenAI as fallback until Hume is implemented
        console.warn('Hume provider not yet implemented, using OpenAI');
        return this.createOpenAIProvider(config);
      default:
        return this.createOpenAIProvider(config);
    }
  }
  
  private createOpenAIProvider(config: VoiceConfig): IVoiceProvider {
    return new OpenAIProvider({
      apiKey: config.apiKey || '',
      voice: config.openai?.voice || 'alloy',
      model: config.openai?.model,
      wsUrl: config.openai?.wsUrl
    });
  }

  private createAzureProvider(config: VoiceConfig): IVoiceProvider {
    // Azure OpenAI uses the same WebSocket protocol as OpenAI
    // The wsUrl from the session API will contain the full Azure endpoint with deployment and API version
    return new OpenAIProvider({
      apiKey: config.apiKey || '',
      voice: config.azure?.voice || 'shimmer',
      wsUrl: config.azure?.wsUrl
    });
  }
  
  getSupportedProviders(): VoiceProvider[] {
    return ['openai', 'azure', 'hume'];
  }
  
  getProviderCapabilities(provider: VoiceProvider): {
    name: string;
    version: string;
    voices: string[];
    features: string[];
  } | null {
    switch (provider) {
      case 'openai':
        return {
          name: 'OpenAI Realtime API',
          version: 'v1',
          voices: ['alloy', 'echo', 'shimmer'],
          features: ['realtime-voice', 'text-input', 'audio-streaming', 'turn-detection']
        };
      case 'azure':
        return {
          name: 'Azure OpenAI Realtime API',
          version: '2025-04-01-preview',
          voices: ['alloy', 'echo', 'shimmer'],
          features: ['realtime-voice', 'text-input', 'audio-streaming', 'turn-detection']
        };
      case 'hume':
        return {
          name: 'Hume EVI',
          version: 'v2',
          voices: ['ito', 'kora', 'dacher'],
          features: ['emotion-detection', 'empathic-voice', 'text-input', 'audio-streaming']
        };
      default:
        return null;
    }
  }
}

export const voiceProviderFactory = new VoiceProviderFactory();