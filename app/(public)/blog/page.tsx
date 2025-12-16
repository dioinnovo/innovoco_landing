/**
 * Blog Listing Page
 *
 * Displays all published blog articles with filtering and pagination.
 * Only shows articles from Sanity CMS - no placeholder content.
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import { getArticles, getFeaturedArticles, isSanityConfigured } from '@/lib/services/sanity';
import { BlogCategory, BLOG_CATEGORIES } from '@/lib/types/blog';
import {
  BlogHero,
  BlogCategories,
  BlogCard,
  BlogCardFeatured,
  BlogPagination,
  BlogGridSkeleton,
  BlogCardFeaturedSkeleton,
} from '@/components/blog';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AlertCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Innovoco',
  description:
    'Insights and best practices on enterprise AI, data engineering, and digital transformation.',
  openGraph: {
    title: 'Blog - Innovoco',
    description:
      'Expert perspectives on enterprise AI, data engineering, and digital transformation.',
    type: 'website',
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const category = params.category as BlogCategory | undefined;

  // Check if Sanity is configured
  const isConfigured = isSanityConfigured();

  if (!isConfigured) {
    // Show message when Sanity is not configured
    return (
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-[#0B0F19] mb-4">
          Blog Coming Soon
        </h2>
        <p className="text-[#525252]">
          Our blog is being set up. Check back soon for insights on AI, data engineering, and digital transformation.
        </p>
      </div>
    );
  }

  try {
    // Fetch articles from Sanity
    // Fetch 11 articles: the featured article is in both lists, so after filtering
    // we get 1 featured hero + 9 in grid (3x3) = 10 total for complete desktop layout
    const [articlesResponse, featuredArticles] = await Promise.all([
      getArticles({ page, limit: 11, category }),
      page === 1 && !category ? getFeaturedArticles(1) : Promise.resolve([]),
    ]);

    const { articles, pagination } = articlesResponse;
    const featured = featuredArticles[0];

    // No articles found - show appropriate message
    if (articles.length === 0 && !featured) {
      return (
        <>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <BlogCategories activeCategory={category || 'all'} />
          </div>

          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#0B0F19] mb-4">
              {category ? 'No articles found' : 'No articles yet'}
            </h2>
            <p className="text-[#525252]">
              {category
                ? `No articles in the "${BLOG_CATEGORIES[category]?.label}" category yet.`
                : 'Check back soon for insights on AI, data engineering, and digital transformation.'}
            </p>
          </div>
        </>
      );
    }

    return (
      <>
        {/* Categories */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <BlogCategories activeCategory={category || 'all'} />
        </div>

        {/* Featured Article */}
        {featured && page === 1 && !category && (
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <BlogCardFeatured article={featured} />
          </div>
        )}

        {/* Articles Grid */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          {(() => {
            // Filter out the featured article from grid when showing on page 1 without category
            const gridArticles = featured && page === 1 && !category
              ? articles.filter((a) => a.id !== featured.id)
              : articles;

            return gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-center text-[#525252] py-8">
                No more articles to display.
              </p>
            );
          })()}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <BlogPagination pagination={pagination} />
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching blog articles:', error);

    return (
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-[#0B0F19] mb-4">
          Unable to load articles
        </h2>
        <p className="text-[#525252]">
          We&apos;re having trouble loading blog articles. Please try again later.
        </p>
      </div>
    );
  }
}

function BlogContentLoading() {
  return (
    <>
      {/* Categories skeleton */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-3 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Featured skeleton */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <BlogCardFeaturedSkeleton />
      </div>

      {/* Grid skeleton */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <BlogGridSkeleton count={9} />
      </div>
    </>
  );
}

export default function BlogPage(props: BlogPageProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
        {/* Hero */}
        <BlogHero />

        {/* Content */}
        <div className="py-12">
          <Suspense fallback={<BlogContentLoading />}>
            <BlogContent {...props} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
