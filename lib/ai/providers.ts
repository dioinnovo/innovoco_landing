/**
 * AI Provider Configuration
 * 
 * Centralized configuration for AI models following Vercel AI SDK best practices
 * This allows easy switching between models and providers
 */

import { createAzure } from '@ai-sdk/azure';

/**
 * Get Azure provider instance with runtime configuration
 * Reads environment variables at runtime to ensure they're properly loaded
 */
export function getAzureProvider() {
  // Extract resource name from endpoint if not explicitly set
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
  let resourceName = process.env.AZURE_RESOURCE_NAME;
  
  if (!resourceName && endpoint) {
    // Extract from endpoint: https://xxx-yyy-region.cognitiveservices.azure.com/...
    const match = endpoint.match(/https:\/\/([^.]+)\.cognitiveservices\.azure\.com/);
    if (match) {
      resourceName = match[1];
    }
  }
  
  const apiKey = process.env.AZURE_OPENAI_KEY || process.env.AZURE_OPENAI_API_KEY;
  // Azure expects 'preview' or specific date format, not the full version string
  const apiVersion = 'preview'; // Use 'preview' for latest preview features
  
  if (!resourceName || !apiKey) {
    throw new Error('Azure OpenAI configuration missing. Check AZURE_RESOURCE_NAME and AZURE_OPENAI_KEY');
  }
  
  return createAzure({
    resourceName,
    apiKey,
    apiVersion,
  });
}

/**
 * Get the conversation model instance
 * This can be easily switched to different models or providers
 */
export function getConversationModel() {
  const provider = getAzureProvider();
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-5-chat-01';
  return provider(deployment);
}

/**
 * Get a model for structured output generation
 * Uses the same deployment but with structured output settings
 */
export function getStructuredModel() {
  const provider = getAzureProvider();
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-5-chat-01';
  return provider(deployment);
}

/**
 * Model configuration settings
 * Can be overridden per use case
 */
export const DEFAULT_MODEL_SETTINGS = {
  temperature: 0.3,
  maxTokens: 500,
  topP: 0.95,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

/**
 * Conversation-specific model settings
 */
export const CONVERSATION_MODEL_SETTINGS = {
  ...DEFAULT_MODEL_SETTINGS,
  temperature: 0.3, // Lower for more consistent responses
  maxTokens: 500,   // Enough for conversational responses
};