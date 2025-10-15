/**
 * Twilio Status Webhook API Route
 * Handles call status updates from Twilio
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleStatusWebhook } from '@/lib/twilio/handler';

export async function POST(request: NextRequest) {
  try {
    // Parse form data from Twilio
    const formData = await request.formData();
    
    const callSid = formData.get('CallSid') as string;
    const callStatus = formData.get('CallStatus') as string;
    const callDuration = formData.get('CallDuration') as string;
    const sessionId = request.nextUrl.searchParams.get('sessionId') || undefined;
    
    // Handle the status update
    await handleStatusWebhook(
      callSid,
      callStatus,
      callDuration,
      sessionId
    );
    
    // Return success response
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in status webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}