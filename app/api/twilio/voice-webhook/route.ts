/**
 * Twilio Voice Webhook API Route
 * Handles incoming voice interactions from Twilio
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleVoiceWebhook } from '@/lib/twilio/handler';

// Validate Twilio webhook signature
function validateTwilioSignature(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') {
    // Skip validation in development
    return true;
  }
  
  const twilioSignature = request.headers.get('X-Twilio-Signature');
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const url = request.url;
  
  if (!twilioSignature) {
    return false;
  }
  
  // TODO: Implement proper signature validation
  // This requires reconstructing the request body which is complex in Next.js 13+
  // For production, use Twilio's webhook validation
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Validate Twilio signature
    if (!validateTwilioSignature(request)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    // Parse form data from Twilio
    const formData = await request.formData();
    const sessionId = request.nextUrl.searchParams.get('sessionId') || '';
    const speechResult = formData.get('SpeechResult') as string || '';
    const answeredBy = formData.get('AnsweredBy') as string || '';
    
    // Handle the voice interaction
    const twimlResponse = await handleVoiceWebhook(
      sessionId,
      speechResult,
      answeredBy
    );
    
    // Return TwiML response
    return new NextResponse(twimlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error in voice webhook:', error);
    
    // Return error TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="Polly.Joanna">
          I apologize, but I'm experiencing technical difficulties. 
          Please try again later or contact us directly.
        </Say>
        <Hangup/>
      </Response>`;
    
    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}