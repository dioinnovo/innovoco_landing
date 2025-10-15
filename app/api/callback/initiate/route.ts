/**
 * API Route to initiate customer callbacks
 * Can be triggered from chat widget, forms, or scheduled tasks
 */

import { NextRequest, NextResponse } from 'next/server';
import { initiateCallback, scheduleCallback } from '@/lib/twilio/handler';
import { z } from 'zod';

// Request validation schema
const callbackRequestSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  customerData: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    company: z.string().optional(),
    previousInteraction: z.string().optional(),
  }).optional(),
  scheduleTime: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = callbackRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request data',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }
    
    const { phoneNumber, customerData, scheduleTime } = validation.data;
    
    // Check if callback should be scheduled
    if (scheduleTime) {
      const scheduledDate = new Date(scheduleTime);
      const result = await scheduleCallback(phoneNumber, scheduledDate, customerData);

      return NextResponse.json({
        success: result.success,
        message: result.message || `Callback scheduled for ${scheduledDate.toLocaleString()}`,
        scheduled: result.scheduled,
        phoneNumber: result.phoneNumber,
        scheduleTime: result.scheduleTime
      });
    }
    
    // Initiate immediate callback
    const result = await initiateCallback(phoneNumber, customerData);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        callSid: result.callSid,
        message: 'Callback initiated successfully',
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in callback initiation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check callback system status
export async function GET(request: NextRequest) {
  try {
    // Check if required environment variables are set
    const isConfigured = !!(
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER
    );
    
    return NextResponse.json({
      status: isConfigured ? 'ready' : 'not_configured',
      message: isConfigured 
        ? 'Callback system is ready' 
        : 'Twilio credentials not configured',
      capabilities: {
        immediateCallback: isConfigured,
        scheduledCallback: isConfigured,
        voiceTranscription: true,
        leadQualification: true,
        notifications: {
          email: !!process.env.RESEND_API_KEY,
          slack: !!process.env.SLACK_WEBHOOK_URL,
          crm: !!process.env.HUBSPOT_API_KEY,
        },
      },
    });
  } catch (error) {
    console.error('Error checking callback status:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to check system status',
      },
      { status: 500 }
    );
  }
}