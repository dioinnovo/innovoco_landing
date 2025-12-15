/**
 * Blog Listing Page
 *
 * Displays all published blog articles with filtering and pagination
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import { getArticles, getFeaturedArticles } from '@/lib/services/sharepoint';
import { isGraphConfigured } from '@/lib/services/graph-auth';
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
import { AlertCircle } from 'lucide-react';

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

// Placeholder data for when SharePoint is not configured
const PLACEHOLDER_ARTICLES = [
  {
    id: '1',
    title: 'The Future of Enterprise AI: Trends to Watch in 2025',
    slug: 'future-enterprise-ai-2025',
    excerpt:
      'Explore the emerging AI trends that will shape enterprise technology in the coming year, from generative AI to autonomous agents.',
    featuredImage: '/images/blog/ai-future.jpg',
    author: { id: '1', name: 'Diego de la Hoz', email: 'diego@innovoco.com' },
    category: 'ai-ml' as BlogCategory,
    tags: ['AI', 'Enterprise', 'Trends'],
    publishDate: new Date().toISOString(),
    readTimeMinutes: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Building Scalable Data Pipelines with Modern Tools',
    slug: 'scalable-data-pipelines',
    excerpt:
      'Learn best practices for designing and implementing data pipelines that can handle enterprise-scale workloads.',
    featuredImage: '/images/blog/data-pipelines.jpg',
    author: { id: '1', name: 'Diego de la Hoz', email: 'diego@innovoco.com' },
    category: 'data-engineering' as BlogCategory,
    tags: ['Data', 'Engineering', 'Pipelines'],
    publishDate: new Date(Date.now() - 86400000).toISOString(),
    readTimeMinutes: 12,
    featured: false,
  },
  {
    id: '3',
    title: 'Transforming Business Intelligence with AI-Powered Analytics',
    slug: 'ai-powered-analytics',
    excerpt:
      'Discover how AI is revolutionizing business intelligence and enabling faster, more accurate decision-making.',
    featuredImage: '/images/blog/analytics.jpg',
    author: { id: '1', name: 'Diego de la Hoz', email: 'diego@innovoco.com' },
    category: 'analytics-bi' as BlogCategory,
    tags: ['Analytics', 'BI', 'AI'],
    publishDate: new Date(Date.now() - 172800000).toISOString(),
    readTimeMinutes: 6,
    featured: false,
  },
];

async function BlogContent({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const category = params.category as BlogCategory | undefined;

  // Check if SharePoint is configured
  const isConfigured = isGraphConfigured();

  if (!isConfigured) {
    // Show placeholder content when not configured
    const filteredArticles = category
      ? PLACEHOLDER_ARTICLES.filter((a) => a.category === category)
      : PLACEHOLDER_ARTICLES;

    const featured = PLACEHOLDER_ARTICLES.find((a) => a.featured);

    return (
      <>
        {/* Configuration Notice */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Demo Mode</p>
              <p className="text-amber-700 text-sm">
                SharePoint integration is not configured. Showing placeholder content.
                Connect to SharePoint to display your actual blog articles.
              </p>
            </div>
          </div>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles
              .filter((a) => !a.featured || category)
              .map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
          </div>
        </div>
      </>
    );
  }

  try {
    // Fetch articles from SharePoint
    const [articlesResponse, featuredArticles] = await Promise.all([
      getArticles({ page, limit: 9, category }),
      page === 1 && !category ? getFeaturedArticles(1) : Promise.resolve([]),
    ]);

    const { articles, pagination } = articlesResponse;
    const featured = featuredArticles[0];

    // No articles found
    if (articles.length === 0 && !featured) {
      return (
        <>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <BlogCategories activeCategory={category || 'all'} />
          </div>

          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold text-[#0B0F19] mb-4">
              No articles found
            </h2>
            <p className="text-[#525252]">
              {category
                ? `No articles in the "${BLOG_CATEGORIES[category]?.label}" category yet.`
                : 'No articles have been published yet. Check back soon!'}
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
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#525252] py-8">
              No more articles to display.
            </p>
          )}
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
        <BlogGridSkeleton count={6} />
      </div>
    </>
  );
}

export default function BlogPage(props: BlogPageProps) {
  return (
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
  );
}
