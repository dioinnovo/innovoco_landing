/**
 * API Route: /api/realtime/session
 *
 * Creates session tokens for OpenAI and Azure OpenAI Realtime API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, provider, voiceProvider } = await request.json();

    // Determine which provider to use - check in order:
    // 1. Explicit request parameter
    // 2. Environment variable
    const effectiveProvider = voiceProvider || provider || process.env.VOICE_PROVIDER || process.env.NEXT_PUBLIC_VOICE_PROVIDER || 'openai';

    console.log('[Realtime Session] Provider selected:', effectiveProvider);

    // Azure OpenAI Realtime API
    if (effectiveProvider === 'azure') {
      const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
      const azureKey = process.env.AZURE_OPENAI_KEY;
      const deployment = process.env.AZURE_OPENAI_REALTIME_DEPLOYMENT;
      const apiVersion = process.env.AZURE_OPENAI_REALTIME_API_VERSION || '2025-04-01-preview';

      if (!azureEndpoint || !azureKey || !deployment) {
        console.error('[Realtime Session] Missing Azure config:', {
          hasEndpoint: !!azureEndpoint,
          hasKey: !!azureKey,
          hasDeployment: !!deployment
        });
        return NextResponse.json(
          {
            error: 'Azure OpenAI not configured',
            details: 'Missing AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, or AZURE_OPENAI_REALTIME_DEPLOYMENT'
          },
          { status: 503 }
        );
      }

      // Clean endpoint and construct WebSocket URL
      // Azure endpoint format: https://RESOURCE.cognitiveservices.azure.com
      // WebSocket format: wss://RESOURCE.cognitiveservices.azure.com/openai/realtime?api-version=XXXX&deployment=XXXX
      const cleanEndpoint = azureEndpoint.replace(/\/$/, '').replace(/^https:\/\//, '');
      const wsUrl = `wss://${cleanEndpoint}/openai/realtime?api-version=${apiVersion}&deployment=${deployment}`;

      const response = {
        token: azureKey,
        provider: 'azure',
        wsUrl: wsUrl,
        endpoint: cleanEndpoint,
        deployment: deployment,
        apiVersion: apiVersion,
        config: {
          voiceId: process.env.NEXT_PUBLIC_OPENAI_VOICE || 'shimmer'
        }
      };

      console.log('[Realtime Session] Azure session created:', { deployment, wsUrl });
      return NextResponse.json(response);
    }

    // OpenAI Realtime API
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      return NextResponse.json(
        {
          error: 'OpenAI API key not configured',
          details: 'Please add your OPENAI_API_KEY to environment variables'
        },
        { status: 503 }
      );
    }

    const response = {
      token: openaiKey,
      provider: 'openai',
      wsUrl: 'wss://api.openai.com/v1/realtime',
      config: {
        voiceId: process.env.NEXT_PUBLIC_OPENAI_VOICE || 'alloy'
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[Realtime Session] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
