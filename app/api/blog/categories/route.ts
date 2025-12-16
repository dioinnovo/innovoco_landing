/**
 * Blog Categories API Route
 *
 * GET /api/blog/categories
 * Returns all categories with article counts
 */

import { NextResponse } from 'next/server';
import { getCategories, isSanityConfigured } from '@/lib/services/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  // Check if Sanity is configured
  if (!isSanityConfigured()) {
    return NextResponse.json(
      {
        error: 'Blog service not configured',
        message: 'Sanity CMS is not set up. Please configure NEXT_PUBLIC_SANITY_PROJECT_ID.',
      },
      { status: 503 }
    );
  }

  try {
    const categories = await getCategories();

    return NextResponse.json(
      { categories },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in /api/blog/categories:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
