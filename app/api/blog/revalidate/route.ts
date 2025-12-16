/**
 * Blog Revalidation Webhook API Route
 *
 * POST /api/blog/revalidate
 * Triggers cache revalidation for blog pages
 *
 * Supports both:
 * - Sanity CMS webhooks (with signature verification)
 * - Legacy Power Automate webhooks (with x-revalidate-secret header)
 *
 * Sanity Headers:
 * - sanity-webhook-signature: HMAC signature for verification
 * - sanity-operation: 'create' | 'update' | 'delete'
 * - sanity-document-id: Document ID that triggered the webhook
 *
 * Sanity Body (via projection):
 * - _type: Document type
 * - slug: Article slug
 * - _id: Document ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

/**
 * Sanity webhook payload type (based on our GROQ projection)
 */
interface SanityWebhookPayload {
  _type: string;
  _id: string;
  slug?: { current: string } | string;
}

/**
 * Legacy payload type (Power Automate)
 */
interface LegacyRevalidatePayload {
  slug?: string;
  action?: 'create' | 'update' | 'delete';
}

/**
 * Verify Sanity webhook signature using HMAC-SHA256
 * Follows the Stripe signature standard
 */
function verifySanitySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');

  // Sanity sends signature in format: v1=<base64-signature>
  const signatureValue = signature.replace(/^v1=/, '');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signatureValue)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Get raw body for signature verification
  const rawBody = await request.text();

  // Check for Sanity webhook headers
  const sanitySignature = request.headers.get('sanity-webhook-signature');
  const sanityOperation = request.headers.get('sanity-operation');
  const sanityDocumentId = request.headers.get('sanity-document-id');

  // Check for legacy header
  const legacySecret = request.headers.get('x-revalidate-secret');

  // Determine authentication method
  const isSanityWebhook = Boolean(sanitySignature || sanityOperation);
  const isLegacyWebhook = Boolean(legacySecret);

  // ============================================
  // Authentication
  // ============================================

  if (isSanityWebhook) {
    // Sanity webhook authentication
    if (!SANITY_WEBHOOK_SECRET) {
      console.error('SANITY_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Sanity webhook not configured' },
        { status: 503 }
      );
    }

    if (!verifySanitySignature(rawBody, sanitySignature, SANITY_WEBHOOK_SECRET)) {
      console.warn('Invalid Sanity webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
  } else if (isLegacyWebhook) {
    // Legacy Power Automate authentication
    if (!REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET not configured');
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 503 }
      );
    }

    if (legacySecret !== REVALIDATE_SECRET) {
      console.warn('Invalid revalidation secret provided');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  } else {
    // No valid authentication method
    return NextResponse.json(
      { error: 'Missing authentication' },
      { status: 401 }
    );
  }

  // ============================================
  // Process Webhook
  // ============================================

  try {
    let slug: string | undefined;
    let operation: string = 'update';

    if (isSanityWebhook) {
      // Parse Sanity webhook payload
      const payload: SanityWebhookPayload = JSON.parse(rawBody);
      operation = sanityOperation || 'update';

      // Extract slug from payload
      if (payload.slug) {
        slug = typeof payload.slug === 'string' ? payload.slug : payload.slug.current;
      }

      console.log(`[Sanity Webhook] Operation: ${operation}, Type: ${payload._type}, ID: ${payload._id}, Slug: ${slug || 'none'}`);

      // Only process article type
      if (payload._type !== 'article') {
        return NextResponse.json({
          success: true,
          message: 'Ignored non-article document',
          documentType: payload._type,
        });
      }
    } else {
      // Parse legacy payload
      const payload: LegacyRevalidatePayload = JSON.parse(rawBody);
      slug = payload.slug;
      operation = payload.action || 'update';

      console.log(`[Legacy Webhook] Action: ${operation}, Slug: ${slug || 'all'}`);
    }

    // ============================================
    // Revalidation
    // ============================================

    // Always revalidate the main blog listing
    revalidatePath('/blog');

    // If a specific slug is provided, revalidate that article page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    // Revalidate all category pages
    revalidatePath('/blog/category/[category]', 'page');

    // Also revalidate using tags if available
    revalidateTag('blog');
    revalidateTag('articles');

    return NextResponse.json({
      success: true,
      message: 'Revalidation triggered',
      source: isSanityWebhook ? 'sanity' : 'legacy',
      operation,
      revalidated: {
        listing: true,
        article: slug || null,
        categories: true,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/blog/revalidate:', error);

    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Also support GET for health checks
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Blog revalidation endpoint is active',
    configured: {
      sanity: Boolean(SANITY_WEBHOOK_SECRET),
      legacy: Boolean(REVALIDATE_SECRET),
    },
  });
}
