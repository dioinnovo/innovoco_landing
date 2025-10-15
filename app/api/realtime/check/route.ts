/**
 * API Route: /api/realtime/check
 * 
 * Checks voice provider configuration status
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    openai: {
      configured: !!process.env.OPENAI_API_KEY,
      voice: process.env.NEXT_PUBLIC_OPENAI_VOICE || 'alloy',
      provider: process.env.NEXT_PUBLIC_VOICE_PROVIDER || 'openai'
    },
    status: {
      ready: !!process.env.OPENAI_API_KEY,
      message: process.env.OPENAI_API_KEY 
        ? 'Voice assistant is configured and ready' 
        : 'Please add OPENAI_API_KEY to your .env.local file'
    }
  };
  
  return NextResponse.json(config);
}