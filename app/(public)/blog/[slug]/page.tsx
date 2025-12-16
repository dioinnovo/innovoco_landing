/**
 * Blog Article Page
 *
 * Vercel-inspired clean article layout with:
 * - Breadcrumb navigation
 * - Large title with featured image below
 * - Inline author/date/read time metadata
 * - Clean content typography
 */

import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { getArticleBySlug, getArticleBySlugPreview, getRelatedArticles, getArticles, getAllSlugs, isSanityConfigured } from '@/lib/services/sanity';
import { BLOG_CATEGORIES, BlogArticle, BlogArticlePreview } from '@/lib/types/blog';
import { Badge } from '@/components/ui/badge';
import {
  BlogArticleContent,
  BlogCard,
} from '@/components/blog';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const revalidate = 300; // Revalidate every 5 minutes

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Placeholder articles for "More Articles" section
const PLACEHOLDER_MORE_ARTICLES: BlogArticlePreview[] = [
  {
    id: 'placeholder-1',
    title: 'How AI Coding Assistants Are Transforming Enterprise Development',
    slug: 'ai-coding-assistants-enterprise',
    excerpt: 'Discover how AI-powered coding tools are boosting developer productivity by 40% across Fortune 500 companies.',
    featuredImage: '',
    author: { id: '1', name: 'Innovoco Team', email: 'team@innovoco.com' },
    category: 'ai-ml',
    tags: ['AI', 'Development', 'Productivity'],
    publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'published',
    readTimeMinutes: 6,
  },
  {
    id: 'placeholder-2',
    title: 'Building a Data-Driven Culture: Lessons from Industry Leaders',
    slug: 'data-driven-culture-lessons',
    excerpt: 'Learn the key strategies that helped top enterprises successfully transition to data-driven decision making.',
    featuredImage: '',
    author: { id: '1', name: 'Innovoco Team', email: 'team@innovoco.com' },
    category: 'analytics-bi',
    tags: ['Data', 'Culture', 'Leadership'],
    publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'published',
    readTimeMinutes: 8,
  },
  {
    id: 'placeholder-3',
    title: 'Cloud Migration Strategies for Legacy Systems',
    slug: 'cloud-migration-legacy-systems',
    excerpt: 'A comprehensive guide to modernizing legacy infrastructure while minimizing business disruption.',
    featuredImage: '',
    author: { id: '1', name: 'Innovoco Team', email: 'team@innovoco.com' },
    category: 'data-engineering',
    tags: ['Cloud', 'Migration', 'Infrastructure'],
    publishDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'published',
    readTimeMinutes: 10,
  },
];

// Placeholder articles for demo mode (matching blog listing page)
const PLACEHOLDER_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    title: 'The Future of Enterprise AI: Trends to Watch in 2025',
    slug: 'future-enterprise-ai-2025',
    excerpt:
      'Explore the emerging AI trends that will shape enterprise technology in the coming year.',
    content: `
<h2>Introduction</h2>
<p>Artificial Intelligence continues to reshape the enterprise landscape at an unprecedented pace. As we look toward 2025, several key trends are emerging that will define how businesses leverage AI for competitive advantage.</p>

<h2>1. Generative AI Goes Enterprise</h2>
<p>While 2024 saw the explosion of consumer-facing generative AI tools, 2025 will be the year of enterprise adoption. Organizations are moving beyond experimentation to implement generative AI in core business processes:</p>
<ul>
<li><strong>Document processing</strong>: Automated analysis and generation of contracts, reports, and correspondence</li>
<li><strong>Code generation</strong>: AI-assisted development that accelerates software delivery</li>
<li><strong>Customer service</strong>: Intelligent chatbots that handle complex queries with human-like understanding</li>
</ul>

<h2>2. AI Agents and Autonomous Systems</h2>
<p>The next frontier in enterprise AI is the development of autonomous agents capable of executing multi-step tasks with minimal human intervention:</p>
<pre><code class="language-typescript">// Example: AI Agent orchestration
const agent = new EnterpriseAgent({
  capabilities: ['research', 'analysis', 'reporting'],
  constraints: ['budget-aware', 'compliance-checked'],
  goals: ['optimize-operations', 'reduce-costs']
});

await agent.execute('quarterly-review');</code></pre>

<h2>3. Responsible AI and Governance</h2>
<p>As AI becomes more embedded in decision-making, enterprises are prioritizing:</p>
<blockquote>"The question is no longer whether to adopt AI, but how to adopt it responsibly." - Industry Expert</blockquote>
<p>Key governance frameworks include:</p>
<ul>
<li>Explainability requirements</li>
<li>Bias detection and mitigation</li>
<li>Privacy-preserving techniques</li>
<li>Audit trails for AI decisions</li>
</ul>

<h2>Conclusion</h2>
<p>The enterprises that thrive in 2025 will be those that embrace AI not as a standalone technology, but as a transformative force integrated throughout their operations. The key is starting now with a clear strategy and governance framework.</p>
<hr />
<p><em>Want to learn more about implementing AI in your enterprise? <a href="/contact">Contact our team</a> for a consultation.</em></p>
    `,
    featuredImage: '/images/blog/ai-future.jpg',
    author: {
      id: '1',
      name: 'Dio de la Hoz',
      email: 'dio.delahoz@innovoco.com',
      title: 'Head of AI',
    },
    category: 'ai-ml',
    tags: ['AI', 'Enterprise', 'Trends', '2025'],
    publishDate: new Date().toISOString(),
    status: 'published',
    readTimeMinutes: 8,
    metaDescription:
      'Explore the emerging AI trends that will shape enterprise technology in 2025, from generative AI to autonomous agents.',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Building Scalable Data Pipelines with Modern Tools',
    slug: 'scalable-data-pipelines',
    excerpt:
      'Learn best practices for designing and implementing data pipelines that can handle enterprise-scale workloads.',
    content: `
<h2>Introduction</h2>
<p>Data pipelines are the backbone of modern data infrastructure. As organizations deal with ever-increasing volumes of data, the need for scalable, reliable pipelines has never been greater.</p>

<h2>Key Principles of Scalable Data Pipelines</h2>
<p>When designing data pipelines for enterprise workloads, consider these fundamental principles:</p>
<ul>
<li><strong>Idempotency</strong>: Ensure operations can be safely retried without side effects</li>
<li><strong>Incremental Processing</strong>: Process only new or changed data when possible</li>
<li><strong>Schema Evolution</strong>: Design for change with flexible schemas</li>
<li><strong>Observability</strong>: Build in monitoring and alerting from the start</li>
</ul>

<h2>Modern Tools and Technologies</h2>
<p>The data engineering landscape has evolved significantly. Here are the tools leading the way:</p>
<ul>
<li><strong>Apache Spark</strong>: Still the gold standard for large-scale batch processing</li>
<li><strong>dbt</strong>: Transforming how teams manage data transformations</li>
<li><strong>Apache Kafka</strong>: Real-time streaming at enterprise scale</li>
<li><strong>Airflow/Dagster</strong>: Orchestrating complex workflows</li>
</ul>

<h2>Best Practices</h2>
<p>Follow these practices to ensure pipeline reliability:</p>
<ol>
<li>Implement comprehensive data quality checks</li>
<li>Use version control for all pipeline code</li>
<li>Design for failure with proper retry logic</li>
<li>Document data lineage and dependencies</li>
</ol>

<h2>Conclusion</h2>
<p>Building scalable data pipelines requires careful planning and the right tooling. By following these principles and leveraging modern technologies, you can create infrastructure that grows with your organization's needs.</p>
    `,
    featuredImage: '/images/blog/data-pipelines.jpg',
    author: {
      id: '1',
      name: 'Dio de la Hoz',
      email: 'dio.delahoz@innovoco.com',
      title: 'Head of AI',
    },
    category: 'data-engineering',
    tags: ['Data', 'Engineering', 'Pipelines'],
    publishDate: new Date(Date.now() - 86400000).toISOString(),
    status: 'published',
    readTimeMinutes: 12,
    metaDescription:
      'Best practices for designing and implementing data pipelines that scale with enterprise workloads.',
    featured: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Transforming Business Intelligence with AI-Powered Analytics',
    slug: 'ai-powered-analytics',
    excerpt:
      'Discover how AI is revolutionizing business intelligence and enabling faster, more accurate decision-making.',
    content: `
<h2>The Evolution of Business Intelligence</h2>
<p>Business Intelligence has come a long way from static reports and dashboards. Today, AI is transforming how organizations derive insights from their data.</p>

<h2>AI-Powered Capabilities</h2>
<p>Modern BI platforms leverage AI in several key ways:</p>
<ul>
<li><strong>Natural Language Queries</strong>: Ask questions in plain English and get instant answers</li>
<li><strong>Automated Insights</strong>: AI surfaces anomalies and trends automatically</li>
<li><strong>Predictive Analytics</strong>: Forecast future outcomes based on historical patterns</li>
<li><strong>Smart Recommendations</strong>: Get actionable suggestions based on your data</li>
</ul>

<h2>Implementation Strategies</h2>
<p>To successfully implement AI-powered analytics:</p>
<ol>
<li>Start with clean, well-organized data</li>
<li>Define clear business questions you want to answer</li>
<li>Choose tools that integrate with your existing stack</li>
<li>Train users on new AI-powered features</li>
</ol>

<h2>Real-World Impact</h2>
<blockquote>"Companies using AI-powered analytics see 30% faster decision-making and 25% improvement in forecast accuracy."</blockquote>

<h2>Conclusion</h2>
<p>AI is not replacing traditional BI—it's enhancing it. Organizations that embrace AI-powered analytics gain a significant competitive advantage in today's data-driven world.</p>
    `,
    featuredImage: '/images/blog/analytics.jpg',
    author: {
      id: '1',
      name: 'Dio de la Hoz',
      email: 'dio.delahoz@innovoco.com',
      title: 'Head of AI',
    },
    category: 'analytics-bi',
    tags: ['Analytics', 'BI', 'AI'],
    publishDate: new Date(Date.now() - 172800000).toISOString(),
    status: 'published',
    readTimeMinutes: 6,
    metaDescription:
      'How AI is revolutionizing business intelligence and enabling faster, more accurate decision-making.',
    featured: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

// Helper to find placeholder article by slug
function getPlaceholderArticle(slug: string): BlogArticle | undefined {
  return PLACEHOLDER_ARTICLES.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check for placeholder article first (works even when Sanity is configured but empty)
  const placeholderArticle = getPlaceholderArticle(slug);

  // Check if Sanity is configured
  if (!isSanityConfigured()) {
    if (placeholderArticle) {
      return {
        title: `${placeholderArticle.title} | Innovoco Blog`,
        description: placeholderArticle.metaDescription || placeholderArticle.excerpt,
        openGraph: {
          title: placeholderArticle.title,
          description: placeholderArticle.excerpt,
          type: 'article',
          publishedTime: placeholderArticle.publishDate,
          authors: [placeholderArticle.author.name],
        },
      };
    }
    return {
      title: 'Article Not Found | Innovoco Blog',
    };
  }

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      // Try placeholder if Sanity doesn't have it
      if (placeholderArticle) {
        return {
          title: `${placeholderArticle.title} | Innovoco Blog`,
          description: placeholderArticle.metaDescription || placeholderArticle.excerpt,
          openGraph: {
            title: placeholderArticle.title,
            description: placeholderArticle.excerpt,
            type: 'article',
            publishedTime: placeholderArticle.publishDate,
            authors: [placeholderArticle.author.name],
          },
        };
      }
      return {
        title: 'Article Not Found | Innovoco Blog',
      };
    }

    return {
      title: `${article.title} | Innovoco Blog`,
      description: article.metaDescription || article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        publishedTime: article.publishDate,
        authors: [article.author.name],
        images: [article.featuredImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [article.featuredImage],
      },
    };
  } catch {
    // Try placeholder on error
    if (placeholderArticle) {
      return {
        title: `${placeholderArticle.title} | Innovoco Blog`,
        description: placeholderArticle.metaDescription || placeholderArticle.excerpt,
      };
    }
    return {
      title: 'Article | Innovoco Blog',
    };
  }
}

export async function generateStaticParams() {
  // Always include placeholder slugs
  const placeholderSlugs = PLACEHOLDER_ARTICLES.map((a) => ({ slug: a.slug }));

  if (!isSanityConfigured()) {
    return placeholderSlugs;
  }

  try {
    const slugs = await getAllSlugs();
    const sanitySlugs = slugs.map((slug) => ({ slug }));
    // Combine Sanity slugs with placeholders (placeholders as fallback)
    return [...sanitySlugs, ...placeholderSlugs];
  } catch {
    return placeholderSlugs;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { isEnabled: isPreviewMode } = await draftMode();

  let article: BlogArticle | null = null;
  let moreArticles: BlogArticlePreview[] = [];

  // Check for placeholder article
  const placeholderArticle = getPlaceholderArticle(slug);

  // Check if Sanity is configured
  if (!isSanityConfigured()) {
    // Demo mode - only use placeholders
    if (placeholderArticle) {
      article = placeholderArticle;
      // Get other placeholder articles for "More Articles" section
      moreArticles = PLACEHOLDER_MORE_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
    } else {
      notFound();
    }
  } else {
    try {
      // Use preview function when in draft mode, otherwise use regular function
      article = isPreviewMode
        ? await getArticleBySlugPreview(slug)
        : await getArticleBySlug(slug);

      // If not found in Sanity, try placeholder
      if (!article && placeholderArticle) {
        article = placeholderArticle;
      }

      if (!article) {
        notFound();
      }

      // Get more articles (excluding current article)
      const articlesResponse = await getArticles({ limit: 4 });
      const realArticles = articlesResponse.articles.filter(a => a.slug !== slug).slice(0, 3);

      // If we don't have enough real articles, supplement with placeholders
      if (realArticles.length < 3) {
        const neededPlaceholders = 3 - realArticles.length;
        // Filter out current article from placeholders too
        const availablePlaceholders = PLACEHOLDER_MORE_ARTICLES.filter((a) => a.slug !== slug);
        moreArticles = [...realArticles, ...availablePlaceholders.slice(0, neededPlaceholders)];
      } else {
        moreArticles = realArticles;
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      // Try placeholder as fallback
      if (placeholderArticle) {
        article = placeholderArticle;
        moreArticles = PLACEHOLDER_MORE_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
      } else {
        notFound();
      }
    }
  }

  const categoryInfo = BLOG_CATEGORIES[article.category];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Innovoco',
      logo: {
        '@type': 'ImageObject',
        url: 'https://innovoco.com/images/logos/Innovoco-Logo-hires.png',
      },
    },
    datePublished: article.publishDate,
    dateModified: article.updatedAt,
    description: article.excerpt,
  };

  // Format date like Vercel: "Dec 15, 2024"
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Get author initials for avatar fallback
  const authorInitials = article.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Header />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-medium shadow-md">
          <span>Preview Mode</span>
          <span className="mx-2">—</span>
          <span>You are viewing an unpublished draft.</span>
          <Link
            href="/api/preview?disable=true"
            className="ml-4 underline hover:no-underline"
          >
            Exit Preview
          </Link>
        </div>
      )}

      <article className={`min-h-screen bg-white ${isPreviewMode ? 'pt-10' : ''}`}>
        {/* Article Header - Vercel-style */}
        <header className="pt-8 pb-0">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A58D0] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Title - Large, prominent */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            {/* Featured Image - Below title with rounded borders */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 shadow-lg mb-8">
              {article.featuredImage ? (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 768px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Metadata Row - Author, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
              {/* Author with Avatar */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">{authorInitials}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                  {article.author.title && (
                    <p className="text-xs text-gray-500">{article.author.title}</p>
                  )}
                </div>
              </div>

              {/* Separator */}
              <span className="hidden sm:block w-px h-6 bg-gray-200" />

              {/* Date */}
              <time dateTime={article.publishDate} className="text-sm text-gray-500">
                {formattedDate}
              </time>

              {/* Separator */}
              <span className="hidden sm:block w-px h-6 bg-gray-200" />

              {/* Read Time */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{article.readTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <BlogArticleContent content={article.content} />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-gray-200">
              <Tag className="w-4 h-4 text-gray-400" />
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-gray-600 border-gray-200 hover:bg-gray-50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Back to Blog Button */}
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0A58D0] hover:text-[#084BB3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>

        {/* More Articles Section */}
        {moreArticles.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19]">
                  More Articles
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[#0A58D0] hover:text-[#084BB3] transition-colors"
                >
                  View all articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {moreArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
