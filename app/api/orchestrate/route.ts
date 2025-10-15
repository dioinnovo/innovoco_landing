/**
 * Mock Orchestration API Endpoint
 *
 * Provides mock responses for the virtual assistant during testing.
 * This replaces real API calls with simulated responses.
 */

import { NextRequest, NextResponse } from 'next/server';

// Mock response data for common queries
const mockResponses: Record<string, string> = {
  greeting: "Hello! I'm your AI assistant from Innovoco. How can I help you transform your business with AI and automation today?",
  services: "We offer comprehensive AI and automation solutions including:\n• Process Automation\n• Data Analytics & Insights\n• Custom AI Development\n• Machine Learning Models\n• Natural Language Processing\nWhich area interests you most?",
  pricing: "Our pricing is tailored to your specific needs. I'd be happy to schedule a consultation to discuss your requirements and provide a custom quote. Would you like to schedule a call?",
  contact: "You can reach us at:\n• Email: info@innovoco.com\n• Phone: 1-800-INNOVOCO\n• Or schedule a consultation directly through our website.",
  about: "Innovoco is a leader in enterprise AI and automation solutions. We help businesses transform their operations through cutting-edge AI technology and intelligent automation.",
  default: "I understand you're interested in learning more. Could you tell me more about your specific business challenges or goals? This will help me provide more relevant information."
};

// Categorize user input
function categorizeMessage(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'greeting';
  }
  if (lower.includes('service') || lower.includes('offer') || lower.includes('solution')) {
    return 'services';
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return 'pricing';
  }
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('call')) {
    return 'contact';
  }
  if (lower.includes('about') || lower.includes('who') || lower.includes('company')) {
    return 'about';
  }

  return 'default';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Categorize and get appropriate response
    const category = categorizeMessage(message);
    const response = mockResponses[category];

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock response
    return NextResponse.json({
      response,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      metadata: {
        category,
        isDemo: true,
        message: 'This is a demo response for testing purposes'
      }
    });
  } catch (error) {
    console.error('Orchestration error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process message',
        response: 'I apologize, but I encountered an error. Please try again.',
        isDemo: true
      },
      { status: 500 }
    );
  }
}

// Support for streaming responses
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const message = "Welcome to Innovoco AI! This is a demo streaming response for testing purposes. How can we help you today?";

      // Stream character by character
      for (const char of message) {
        controller.enqueue(encoder.encode(char));
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}