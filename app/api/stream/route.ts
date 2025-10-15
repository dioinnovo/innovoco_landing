/**
 * Streaming API for real-time conversation
 * 
 * Implements Server-Sent Events (SSE) for streaming responses
 * Integrates with LangGraph orchestrator while maintaining streaming capability
 */

import { NextRequest, NextResponse } from 'next/server';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { masterOrchestrator } from '@/lib/orchestrator/master';
import { streamingHandler } from '@/lib/agents/streaming-conversation';

export const runtime = 'edge'; // Use edge runtime for better streaming

/**
 * POST /api/stream
 * Stream conversation responses in real-time
 */
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, mode = 'text' } = await request.json();
    
    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create session
    let state = masterOrchestrator.getSession(sessionId);
    
    if (!state) {
      // Initialize new session
      state = await masterOrchestrator.startSession(sessionId, 'callback', message);
      if (!state) {
        throw new Error('Failed to initialize session');
      }
    } else {
      // Add user message to state
      state.messages.push(new HumanMessage(message));
    }

    // Create a TransformStream for SSE
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start streaming in the background
    (async () => {
      try {
        let fullResponse = '';
        let chunkCount = 0;
        
        // Stream the response
        await streamingHandler.processStreamingEvents(
          state!.messages,
          {
            onToken: async (token) => {
              // Send each token as an SSE event
              const data = JSON.stringify({
                type: 'token',
                content: token,
                chunkId: chunkCount++
              });
              
              await writer.write(
                encoder.encode(`data: ${data}\n\n`)
              );
            },
            onPartial: async (partial) => {
              // Send partial response for UI updates
              const data = JSON.stringify({
                type: 'partial',
                content: partial
              });
              
              await writer.write(
                encoder.encode(`data: ${data}\n\n`)
              );
            },
            onComplete: async (full) => {
              fullResponse = full;
              
              // Update orchestrator state with complete response
              const aiMessage = new AIMessage(full);
              state!.messages.push(aiMessage);
              
              // Check for qualification and other business logic
              const updatedState = await masterOrchestrator.continueSession(
                sessionId,
                '' // Empty message since we already added it
              );
              
              // Send completion event with metadata
              const data = JSON.stringify({
                type: 'complete',
                content: full,
                metadata: {
                  qualification: updatedState?.qualification,
                  customerInfo: updatedState?.customerInfo,
                  phase: updatedState?.currentPhase,
                  status: updatedState?.conversationStatus
                }
              });
              
              await writer.write(
                encoder.encode(`data: ${data}\n\n`)
              );
              
              // Send done event
              await writer.write(
                encoder.encode(`data: [DONE]\n\n`)
              );
            },
            onError: async (error) => {
              const data = JSON.stringify({
                type: 'error',
                error: error.message
              });
              
              await writer.write(
                encoder.encode(`data: ${data}\n\n`)
              );
            }
          }
        );
      } catch (error) {
        console.error('Streaming error:', error);
      } finally {
        await writer.close();
      }
    })();

    // Return the stream as Server-Sent Events
    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
      },
    });
    
  } catch (error) {
    console.error('Stream API error:', error);
    return NextResponse.json(
      { error: 'Failed to stream response' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stream
 * Check streaming configuration
 */
export async function GET() {
  return NextResponse.json({
    supported: true,
    features: {
      tokenStreaming: true,
      partialResponses: true,
      interruptions: true,
      voiceIntegration: true
    },
    runtime: 'edge'
  });
}