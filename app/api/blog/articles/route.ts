/**
 * Blog Articles API Route
 *
 * GET /api/blog/articles
 * Returns paginated list of published blog articles
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 50)
 * - category: Filter by category slug
 * - featured: Filter featured articles (true/false)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '@/lib/services/sharepoint';
import { isGraphConfigured } from '@/lib/services/graph-auth';
import { BlogCategory, BLOG_CATEGORIES } from '@/lib/types/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: NextRequest) {
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
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryParam = searchParams.get('category');
    const featuredParam = searchParams.get('featured');

    // Validate page and limit
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Invalid page parameter' },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid limit parameter. Must be between 1 and 50.' },
        { status: 400 }
      );
    }

    // Validate category if provided
    let category: BlogCategory | undefined;
    if (categoryParam) {
      if (categoryParam in BLOG_CATEGORIES) {
        category = categoryParam as BlogCategory;
      } else {
        return NextResponse.json(
          {
            error: 'Invalid category',
            validCategories: Object.keys(BLOG_CATEGORIES),
          },
          { status: 400 }
        );
      }
    }

    // Parse featured parameter
    let featured: boolean | undefined;
    if (featuredParam !== null) {
      featured = featuredParam === 'true';
    }

    // Fetch articles
    const result = await getArticles({
      page,
      limit,
      category,
      featured,
    });

    // Return response with cache headers
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error in /api/blog/articles:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch articles',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
