/**
 * Preview API Route
 *
 * Enables draft mode for previewing unpublished Sanity content.
 * Used by the Sanity Studio preview pane.
 */

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

// Secret to validate preview requests (optional but recommended)
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const disable = searchParams.get('disable');
  const secret = searchParams.get('secret');

  // Disable draft mode if requested
  if (disable === 'true') {
    const draft = await draftMode();
    draft.disable();
    return redirect('/blog');
  }

  // Validate secret if configured (skip in development)
  if (PREVIEW_SECRET && secret !== PREVIEW_SECRET && process.env.NODE_ENV === 'production') {
    return new Response('Invalid preview token', { status: 401 });
  }

  // Validate slug
  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the article page
  redirect(`/blog/${slug}`);
}
