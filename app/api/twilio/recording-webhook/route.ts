/**
 * Twilio Recording Webhook API Route
 * Handles recording completion notifications from Twilio
 */

import { NextRequest, NextResponse } from 'next/server';
// Recording webhook - simplified for now

export async function POST(request: NextRequest) {
  try {
    // Parse form data from Twilio
    const formData = await request.formData();
    
    const recordingSid = formData.get('RecordingSid') as string;
    const recordingUrl = formData.get('RecordingUrl') as string;
    const callSid = formData.get('CallSid') as string;
    const sessionId = request.nextUrl.searchParams.get('sessionId') || undefined;
    
    // Log the recording completion
    console.log('Recording completed:', {
      recordingSid,
      recordingUrl,
      callSid,
      sessionId,
    });
    
    // Return success response
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in recording webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}