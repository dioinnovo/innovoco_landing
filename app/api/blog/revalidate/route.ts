/**
 * Blog Revalidation Webhook API Route
 *
 * POST /api/blog/revalidate
 * Triggers cache revalidation for blog pages
 *
 * Used by Power Automate when SharePoint list items are updated
 *
 * Headers:
 * - x-revalidate-secret: Secret token for authentication
 *
 * Body:
 * - slug?: Article slug to revalidate specific article
 * - action: 'create' | 'update' | 'delete'
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { RevalidatePayload } from '@/lib/types/blog';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  // Validate secret
  const secret = request.headers.get('x-revalidate-secret');

  if (!REVALIDATE_SECRET) {
    console.error('REVALIDATE_SECRET not configured');
    return NextResponse.json(
      { error: 'Revalidation not configured' },
      { status: 503 }
    );
  }

  if (secret !== REVALIDATE_SECRET) {
    console.warn('Invalid revalidation secret provided');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body: RevalidatePayload = await request.json();
    const { slug, action } = body;

    // Log revalidation event
    console.log(`[Blog Revalidation] Action: ${action}, Slug: ${slug || 'all'}`);

    // Always revalidate the main blog listing
    revalidatePath('/blog');

    // If a specific slug is provided, revalidate that article page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    // Revalidate category pages
    revalidatePath('/blog/category/[category]', 'page');

    return NextResponse.json({
      success: true,
      message: 'Revalidation triggered',
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

// Also support GET for simple health checks
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Blog revalidation endpoint is active',
    configured: Boolean(REVALIDATE_SECRET),
  });
}
