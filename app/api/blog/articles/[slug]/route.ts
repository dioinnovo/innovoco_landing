/**
 * Single Blog Article API Route
 *
 * GET /api/blog/articles/[slug]
 * Returns a single article by slug with related articles
 */

import { NextRequest, NextResponse } from 'next/server';
import { getArticleBySlug, getRelatedArticles } from '@/lib/services/sharepoint';
import { isGraphConfigured } from '@/lib/services/graph-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Check if Graph API is configured
  if (!isGraphConfigured()) {
    return NextResponse.json(
      {
        error: 'Blog service not configured',
        message: 'SharePoint integration is not set up. Please contact administrator.',
      },
      { status: 503 }
    );
  }

  try {
    const { slug } = await params;

    // Validate slug
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      );
    }

    // Sanitize slug (prevent injection)
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');

    if (sanitizedSlug !== slug) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    // Fetch article
    const article = await getArticleBySlug(sanitizedSlug);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Fetch related articles
    const relatedArticles = await getRelatedArticles(
      article.slug,
      article.category,
      3
    );

    // Return response with cache headers
    return NextResponse.json(
      {
        article,
        relatedArticles,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/blog/articles/[slug]:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch article',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
