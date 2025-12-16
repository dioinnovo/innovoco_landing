/**
 * Preview API Route
 *
 * Enables draft mode for previewing unpublished Sanity content.
 * Used by the Sanity Studio preview pane.
 */

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const disable = searchParams.get('disable');

  // Disable draft mode if requested
  if (disable === 'true') {
    const draft = await draftMode();
    draft.disable();
    return redirect('/blog');
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
