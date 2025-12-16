/**
 * Sanity CMS Data Service
 *
 * Fetches blog content from Sanity CMS.
 * This replaces the SharePoint service while maintaining the same interface.
 */

import { client, previewClient, isSanityConfigured, getBlogImageUrl, getAvatarUrl, urlFor } from '@/lib/sanity/client';
import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import type {
  BlogArticle,
  BlogArticlePreview,
  BlogAuthor,
  BlogCategory,
  BlogCategoryInfo,
  BlogListResponse,
  BlogStatus,
  GetArticlesParams,
  BLOG_CATEGORIES,
} from '@/lib/types/blog';

// Re-export the configuration check
export { isSanityConfigured };

// ============================================
// Raw Sanity Types (internal use)
// ============================================

interface SanityAuthor {
  _id: string;
  name: string;
  email: string;
  title?: string;
  avatar?: {
    _type: 'image';
    asset: { _ref: string };
  };
}

// Sanity image reference type
interface SanityImageAsset {
  _type: 'image';
  asset: { _ref: string };
}

interface SanityArticle {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: PortableTextBlock[] | null; // Portable Text array
  featuredImage?: SanityImageAsset;
  author: SanityAuthor;
  category: BlogCategory;
  tags?: string[];
  publishDate: string;
  isPublished: boolean;
  readTimeMinutes: number;
  metaDescription?: string;
  featured: boolean;
}

// ============================================
// Portable Text to HTML Conversion
// ============================================

/**
 * Custom serializers for Portable Text to HTML conversion
 */
const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageAsset & { alt?: string; caption?: string } }) => {
      const imageUrl = urlFor(value).width(800).auto('format').url();
      const alt = value.alt || '';
      const caption = value.caption;

      if (caption) {
        return `<figure class="my-8">
          <img src="${imageUrl}" alt="${alt}" class="rounded-lg w-full" loading="lazy" />
          <figcaption class="text-center text-sm text-gray-500 mt-2">${caption}</figcaption>
        </figure>`;
      }
      return `<img src="${imageUrl}" alt="${alt}" class="rounded-lg my-8 w-full" loading="lazy" />`;
    },
    code: ({ value }: { value: { code: string; language?: string; filename?: string } }) => {
      const language = value.language || 'text';
      const filename = value.filename;

      const header = filename
        ? `<div class="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg border-b border-gray-700">${filename}</div>`
        : '';

      return `<div class="my-6">
        ${header}
        <pre class="bg-gray-900 text-gray-100 p-4 ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-x-auto"><code class="language-${language}">${escapeHtml(value.code)}</code></pre>
      </div>`;
    },
  },
  marks: {
    link: ({ children, value }: { children: string; value: { href: string; blank?: boolean } }) => {
      const target = value.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${value.href}"${target} class="text-blue-600 hover:text-blue-800 underline">${children}</a>`;
    },
    code: ({ children }: { children: string }) => {
      return `<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${children}</code>`;
    },
  },
  block: {
    h2: ({ children }: { children: string }) =>
      `<h2 class="text-2xl font-bold mt-8 mb-4">${children}</h2>`,
    h3: ({ children }: { children: string }) =>
      `<h3 class="text-xl font-semibold mt-6 mb-3">${children}</h3>`,
    h4: ({ children }: { children: string }) =>
      `<h4 class="text-lg font-semibold mt-4 mb-2">${children}</h4>`,
    blockquote: ({ children }: { children: string }) =>
      `<blockquote class="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700">${children}</blockquote>`,
    normal: ({ children }: { children: string }) =>
      `<p class="mb-4 leading-relaxed">${children}</p>`,
  },
  list: {
    bullet: ({ children }: { children: string }) =>
      `<ul class="list-disc list-inside mb-4 space-y-2">${children}</ul>`,
    number: ({ children }: { children: string }) =>
      `<ol class="list-decimal list-inside mb-4 space-y-2">${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }: { children: string }) => `<li>${children}</li>`,
    number: ({ children }: { children: string }) => `<li>${children}</li>`,
  },
};

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Convert Portable Text content to HTML string
 */
function portableTextToHtml(content: PortableTextBlock[] | null): string {
  if (!content || content.length === 0) {
    return '';
  }

  try {
    return toHTML(content, { components: portableTextComponents });
  } catch (error) {
    console.error('Error converting Portable Text to HTML:', error);
    return '';
  }
}

// ============================================
// Transform Functions
// ============================================

/**
 * Transform Sanity author to BlogAuthor
 */
function transformAuthor(author: SanityAuthor): BlogAuthor {
  return {
    id: author._id,
    name: author.name,
    email: author.email,
    title: author.title,
    avatar: author.avatar ? getAvatarUrl(author.avatar) : undefined,
  };
}

/**
 * Transform Sanity article to BlogArticle (full)
 */
function transformToArticle(article: SanityArticle): BlogArticle {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug.current,
    excerpt: article.excerpt,
    content: portableTextToHtml(article.content), // Convert Portable Text to HTML
    featuredImage: article.featuredImage ? getBlogImageUrl(article.featuredImage) : '',
    author: transformAuthor(article.author),
    category: article.category,
    tags: article.tags || [],
    publishDate: article.publishDate,
    status: article.isPublished ? 'published' : 'draft',
    readTimeMinutes: article.readTimeMinutes,
    metaDescription: article.metaDescription,
    featured: article.featured,
    createdAt: article._createdAt,
    updatedAt: article._updatedAt,
  };
}

/**
 * Transform Sanity article to BlogArticlePreview (without content)
 */
function transformToPreview(article: SanityArticle): BlogArticlePreview {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug.current,
    excerpt: article.excerpt,
    featuredImage: article.featuredImage ? getBlogImageUrl(article.featuredImage) : '',
    author: transformAuthor(article.author),
    category: article.category,
    tags: article.tags || [],
    publishDate: article.publishDate,
    readTimeMinutes: article.readTimeMinutes,
    featured: article.featured,
  };
}

// ============================================
// GROQ Queries
// ============================================

const ARTICLE_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  author->{
    _id,
    name,
    email,
    title,
    avatar
  },
  category,
  tags,
  publishDate,
  isPublished,
  readTimeMinutes,
  metaDescription,
  featured
`;

const PREVIEW_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{
    _id,
    name,
    email,
    title,
    avatar
  },
  category,
  tags,
  publishDate,
  readTimeMinutes,
  featured
`;

// ============================================
// API Functions
// ============================================

/**
 * Get paginated list of articles
 */
export async function getArticles(params: GetArticlesParams = {}): Promise<BlogListResponse> {
  const { page = 1, limit = 10, category, featured, status = 'published' } = params;

  if (!isSanityConfigured()) {
    return { articles: [], pagination: { page, limit, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } };
  }

  const offset = (page - 1) * limit;

  // Build filter conditions
  const conditions: string[] = [`_type == "article"`];

  // Filter by published status (isPublished == true means published)
  if (status === 'published') {
    conditions.push(`isPublished == true`);
  } else if (status === 'draft') {
    conditions.push(`isPublished == false`);
  }
  if (category) {
    conditions.push(`category == "${category}"`);
  }
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }

  const filter = conditions.join(' && ');

  // Get total count
  const countQuery = `count(*[${filter}])`;
  const total = await client.fetch<number>(countQuery);

  // Get articles
  const articlesQuery = `
    *[${filter}] | order(publishDate desc) [${offset}...${offset + limit}] {
      ${PREVIEW_FIELDS}
    }
  `;
  const rawArticles = await client.fetch<SanityArticle[]>(articlesQuery);

  const totalPages = Math.ceil(total / limit);

  return {
    articles: rawArticles.map(transformToPreview),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  const query = `
    *[_type == "article" && slug.current == $slug && isPublished == true][0] {
      ${ARTICLE_FIELDS}
    }
  `;

  const article = await client.fetch<SanityArticle | null>(query, { slug });

  return article ? transformToArticle(article) : null;
}

/**
 * Get a single article by slug (including drafts for preview mode)
 * Use this when in draft/preview mode to see unpublished content
 */
export async function getArticleBySlugPreview(slug: string): Promise<BlogArticle | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  // Query without isPublished filter to include drafts
  const query = `
    *[_type == "article" && slug.current == $slug][0] {
      ${ARTICLE_FIELDS}
    }
  `;

  // Use preview client if token is available, otherwise fall back to regular client
  const sanityClient = process.env.SANITY_API_TOKEN ? previewClient : client;
  const article = await sanityClient.fetch<SanityArticle | null>(query, { slug });

  return article ? transformToArticle(article) : null;
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit: number = 3): Promise<BlogArticlePreview[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `
    *[_type == "article" && featured == true && isPublished == true] | order(publishDate desc) [0...${limit}] {
      ${PREVIEW_FIELDS}
    }
  `;

  const articles = await client.fetch<SanityArticle[]>(query);
  return articles.map(transformToPreview);
}

/**
 * Get related articles (same category, excluding current)
 */
export async function getRelatedArticles(
  currentSlug: string,
  category: BlogCategory,
  limit: number = 3
): Promise<BlogArticlePreview[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `
    *[_type == "article" && slug.current != $currentSlug && category == $category && isPublished == true] | order(publishDate desc) [0...${limit}] {
      ${PREVIEW_FIELDS}
    }
  `;

  const articles = await client.fetch<SanityArticle[]>(query, { currentSlug, category });
  return articles.map(transformToPreview);
}

/**
 * Get all published article slugs (for static generation)
 */
export async function getAllSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  const query = `*[_type == "article" && isPublished == true].slug.current`;
  return client.fetch<string[]>(query);
}

/**
 * Get categories with article counts
 */
export async function getCategories(): Promise<BlogCategoryInfo[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  // Import BLOG_CATEGORIES for labels
  const { BLOG_CATEGORIES } = await import('@/lib/types/blog');

  const categories: BlogCategory[] = [
    'ai-ml',
    'data-engineering',
    'analytics-bi',
    'industry-insights',
    'company-news',
    'case-studies',
  ];

  const results: BlogCategoryInfo[] = [];

  for (const category of categories) {
    const countQuery = `count(*[_type == "article" && category == "${category}" && status == "published"])`;
    const count = await client.fetch<number>(countQuery);

    results.push({
      slug: category,
      label: BLOG_CATEGORIES[category].label,
      description: BLOG_CATEGORIES[category].description,
      count,
    });
  }

  return results;
}

/**
 * Check Sanity connection health
 */
export async function checkSanityHealth(): Promise<{
  configured: boolean;
  accessible: boolean;
  error?: string;
}> {
  if (!isSanityConfigured()) {
    return {
      configured: false,
      accessible: false,
      error: 'Sanity project ID is not configured',
    };
  }

  try {
    // Test query
    await client.fetch(`count(*[_type == "article"])`);
    return {
      configured: true,
      accessible: true,
    };
  } catch (error) {
    return {
      configured: true,
      accessible: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
