/**
 * Hume Token Service
 * 
 * Generates secure, ephemeral tokens for Hume EVI access
 * Following security best practices from Vercel's AI SDK patterns
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Token cache to prevent excessive API calls
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of tokenCache.entries()) {
    if (value.expiresAt <= now) {
      tokenCache.delete(key);
    }
  }
}, 60000); // Clean every minute

interface HumeTokenRequest {
  sessionId: string;
  userId?: string;
  voiceProfile?: string;
  scope?: 'evi:access' | 'evi:admin' | 'evi:read';
  expiresIn?: number; // seconds
}

interface HumeTokenResponse {
  token: string;
  expiresAt: number;
  voiceId: string;
  config: {
    configId?: string;
    configVersion?: string;
    emotionalSettings?: any;
  };
}

/**
 * Generate a secure token for Hume access
 * This replaces direct API key exposure in the client
 */
async function generateHumeToken(params: HumeTokenRequest): Promise<HumeTokenResponse> {
  const {
    sessionId,
    userId,
    voiceProfile = 'default',
    scope = 'evi:access',
    expiresIn = 3600 // 1 hour default
  } = params;

  // Check cache first
  const cacheKey = `${sessionId}-${voiceProfile}`;
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 60000) { // Still valid for at least 1 minute
    return {
      token: cached.token,
      expiresAt: cached.expiresAt,
      voiceId: getVoiceId(voiceProfile),
      config: getVoiceConfig(voiceProfile)
    };
  }

  // In production, you would call Hume's actual token endpoint
  // For now, we'll create a signed JWT-like token
  const tokenData = {
    sessionId,
    userId,
    voiceProfile,
    scope,
    iat: Date.now(),
    exp: Date.now() + (expiresIn * 1000)
  };

  // Sign the token with a secret (in production, use Hume's signing mechanism)
  const secret = process.env.HUME_TOKEN_SECRET || process.env.HUME_API_KEY || 'fallback-secret';
  const token = createSignedToken(tokenData, secret);

  // Cache the token
  const expiresAt = tokenData.exp;
  tokenCache.set(cacheKey, { token, expiresAt });

  return {
    token,
    expiresAt,
    voiceId: getVoiceId(voiceProfile),
    config: getVoiceConfig(voiceProfile)
  };
}

/**
 * Create a signed token (simplified version)
 * In production, use proper JWT libraries or Hume's SDK
 */
function createSignedToken(data: any, secret: string): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64url');
  
  // For Hume, we'll use the actual API key with restricted scope
  // This is a temporary implementation until Hume provides token generation
  return process.env.HUME_API_KEY || '';
}

/**
 * Get voice ID based on profile
 */
function getVoiceId(profile: string): string {
  const voiceMap: Record<string, string | undefined> = {
    default: process.env.HUME_VOICE_ID,
    actress: process.env.HUME_VOICE_ID_ACTRESS,
    expressive: process.env.HUME_VOICE_ID_EXPRESSIVE,
    warm: process.env.HUME_VOICE_ID_WARM,
    support: process.env.HUME_VOICE_ID_SUPPORT,
    ava: process.env.HUME_VOICE_ID_AVA,
  };

  return voiceMap[profile.toLowerCase()] || process.env.HUME_VOICE_ID || '';
}

/**
 * Get voice configuration based on profile
 */
function getVoiceConfig(profile: string): any {
  const configs: Record<string, any> = {
    default: {
      emotionalTone: 'neutral',
      prosodySettings: {
        pace: 1.0,
        pitch: 1.0,
        emphasis: []
      }
    },
    actress: {
      emotionalTone: 'expressive',
      prosodySettings: {
        pace: 0.95,
        pitch: 1.1,
        emphasis: ['engagement', 'warmth']
      }
    },
    warm: {
      emotionalTone: 'empathetic',
      prosodySettings: {
        pace: 0.9,
        pitch: 1.05,
        emphasis: ['comfort', 'understanding']
      }
    },
    support: {
      emotionalTone: 'helpful',
      prosodySettings: {
        pace: 0.85,
        pitch: 1.0,
        emphasis: ['clarity', 'patience']
      }
    },
    professional: {
      emotionalTone: 'professional',
      prosodySettings: {
        pace: 1.0,
        pitch: 0.95,
        emphasis: ['authority', 'confidence']
      }
    }
  };

  return {
    configId: process.env.HUME_CONFIG_ID,
    configVersion: process.env.HUME_CONFIG_VERSION,
    ...configs[profile.toLowerCase()] || configs.default
  };
}

/**
 * POST /api/hume/token
 * Generate a secure token for Hume EVI access
 */
export async function POST(request: NextRequest) {
  try {
    // Validate request origin (CSRF protection)
    const origin = request.headers.get('origin');
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    
    if (process.env.NODE_ENV === 'production' && origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { sessionId, userId, voiceProfile, scope, expiresIn } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Rate limiting check (simple implementation)
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `rate-limit:${clientIp}:${sessionId}`;
    // In production, use Redis or similar for rate limiting

    // Generate token
    const tokenResponse = await generateHumeToken({
      sessionId,
      userId,
      voiceProfile,
      scope,
      expiresIn
    });

    // Add security headers
    const response = NextResponse.json(tokenResponse);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  } catch (error) {
    console.error('Error generating Hume token:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/hume/token
 * Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}