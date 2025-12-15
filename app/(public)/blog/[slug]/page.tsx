/**
 * Blog Article Page
 *
 * Displays a single blog article with full content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, getAllSlugs } from '@/lib/services/sharepoint';
import { isGraphConfigured } from '@/lib/services/graph-auth';
import { BLOG_CATEGORIES, BlogArticle, BlogCategory } from '@/lib/types/blog';
import { Badge } from '@/components/ui/badge';
import {
  BlogAuthorCard,
  BlogArticleContent,
  BlogRelatedArticles,
  BlogFeaturedImage,
} from '@/components/blog';

export const revalidate = 300; // Revalidate every 5 minutes

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Placeholder article for demo mode
const PLACEHOLDER_ARTICLE: BlogArticle = {
  id: '1',
  title: 'The Future of Enterprise AI: Trends to Watch in 2025',
  slug: 'future-enterprise-ai-2025',
  excerpt:
    'Explore the emerging AI trends that will shape enterprise technology in the coming year.',
  content: `
# Introduction

Artificial Intelligence continues to reshape the enterprise landscape at an unprecedented pace. As we look toward 2025, several key trends are emerging that will define how businesses leverage AI for competitive advantage.

## 1. Generative AI Goes Enterprise

While 2024 saw the explosion of consumer-facing generative AI tools, 2025 will be the year of enterprise adoption. Organizations are moving beyond experimentation to implement generative AI in core business processes:

- **Document processing**: Automated analysis and generation of contracts, reports, and correspondence
- **Code generation**: AI-assisted development that accelerates software delivery
- **Customer service**: Intelligent chatbots that handle complex queries with human-like understanding

## 2. AI Agents and Autonomous Systems

The next frontier in enterprise AI is the development of autonomous agents capable of executing multi-step tasks with minimal human intervention:

\`\`\`typescript
// Example: AI Agent orchestration
const agent = new EnterpriseAgent({
  capabilities: ['research', 'analysis', 'reporting'],
  constraints: ['budget-aware', 'compliance-checked'],
  goals: ['optimize-operations', 'reduce-costs']
});

await agent.execute('quarterly-review');
\`\`\`

## 3. Responsible AI and Governance

As AI becomes more embedded in decision-making, enterprises are prioritizing:

> "The question is no longer whether to adopt AI, but how to adopt it responsibly." - Industry Expert

Key governance frameworks include:
- Explainability requirements
- Bias detection and mitigation
- Privacy-preserving techniques
- Audit trails for AI decisions

## Conclusion

The enterprises that thrive in 2025 will be those that embrace AI not as a standalone technology, but as a transformative force integrated throughout their operations. The key is starting now with a clear strategy and governance framework.

---

*Want to learn more about implementing AI in your enterprise? [Contact our team](/contact) for a consultation.*
  `,
  featuredImage: '/images/blog/ai-future.jpg',
  author: {
    id: '1',
    name: 'Diego de la Hoz',
    email: 'diego@innovoco.com',
    title: 'CEO & Founder',
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
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if configured
  if (!isGraphConfigured()) {
    if (slug === PLACEHOLDER_ARTICLE.slug) {
      return {
        title: `${PLACEHOLDER_ARTICLE.title} | Innovoco Blog`,
        description: PLACEHOLDER_ARTICLE.metaDescription || PLACEHOLDER_ARTICLE.excerpt,
        openGraph: {
          title: PLACEHOLDER_ARTICLE.title,
          description: PLACEHOLDER_ARTICLE.excerpt,
          type: 'article',
          publishedTime: PLACEHOLDER_ARTICLE.publishDate,
          authors: [PLACEHOLDER_ARTICLE.author.name],
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
    return {
      title: 'Article | Innovoco Blog',
    };
  }
}

export async function generateStaticParams() {
  if (!isGraphConfigured()) {
    return [{ slug: PLACEHOLDER_ARTICLE.slug }];
  }

  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: BlogArticle | null = null;
  let relatedArticles: Awaited<ReturnType<typeof getRelatedArticles>> = [];

  // Check if SharePoint is configured
  if (!isGraphConfigured()) {
    // Demo mode
    if (slug === PLACEHOLDER_ARTICLE.slug) {
      article = PLACEHOLDER_ARTICLE;
    } else {
      notFound();
    }
  } else {
    try {
      article = await getArticleBySlug(slug);

      if (!article) {
        notFound();
      }

      relatedArticles = await getRelatedArticles(slug, article.category, 3);
    } catch (error) {
      console.error('Error fetching article:', error);
      notFound();
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

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-linear-to-b from-gray-50 to-white pt-8 pb-12">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-[#0A58D0] border-0"
              >
                {categoryInfo?.label || article.category}
              </Badge>

              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Clock className="w-4 h-4" />
                <span>{article.readTimeMinutes} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Featured Image */}
            <BlogFeaturedImage
              src={article.featuredImage}
              alt={article.title}
              category={article.category as BlogCategory}
              priority
              className="mb-8"
            />

            {/* Author */}
            <BlogAuthorCard author={article.author} variant="full" />
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <BlogArticleContent content={article.content} />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-gray-200">
              <Tag className="w-4 h-4 text-[#6B7280]" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[#525252]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50">
            <BlogRelatedArticles articles={relatedArticles} />
          </div>
        )}
      </article>
    </>
  );
}
