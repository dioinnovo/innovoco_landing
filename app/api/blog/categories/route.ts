/**
 * Blog Categories API Route
 *
 * GET /api/blog/categories
 * Returns all categories with article counts
 */

import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/services/sharepoint';
import { isGraphConfigured } from '@/lib/services/graph-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
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
