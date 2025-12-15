/**
 * SharePoint Blog Service
 *
 * Handles all interactions with SharePoint Lists via Microsoft Graph API
 * for the blog content management system.
 */

import { getGraphClient } from './graph-auth';
import {
  BlogArticle,
  BlogArticlePreview,
  BlogAuthor,
  BlogCategory,
  BlogCategoryInfo,
  BlogListResponse,
  BlogStatus,
  GetArticlesParams,
  SharePointBlogItem,
  SharePointListResponse,
  BLOG_CATEGORIES,
  SHAREPOINT_CATEGORY_MAP,
  CATEGORY_TO_SHAREPOINT_MAP,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../types/blog';

// SharePoint configuration
const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const LIST_ID = process.env.SHAREPOINT_LIST_ID;

/**
 * Validate SharePoint configuration
 */
function validateConfig(): void {
  if (!SITE_ID || !LIST_ID) {
    throw new Error(
      'Missing SharePoint configuration. Set SHAREPOINT_SITE_ID and SHAREPOINT_LIST_ID environment variables.'
    );
  }
}

/**
 * Get the base API path for the SharePoint list
 */
function getListPath(): string {
  validateConfig();
  return `/sites/${SITE_ID}/lists/${LIST_ID}`;
}

/**
 * Transform SharePoint item to BlogAuthor
 */
function transformAuthor(item: SharePointBlogItem): BlogAuthor {
  const authorField = item.fields.Author;

  if (authorField) {
    return {
      id: String(authorField.LookupId || ''),
      name: authorField.LookupValue || 'Unknown Author',
      email: authorField.Email || '',
      avatar: undefined, // Would need separate lookup for profile picture
      title: undefined,
    };
  }

  return {
    id: '',
    name: 'Unknown Author',
    email: '',
  };
}

/**
 * Transform SharePoint category string to BlogCategory slug
 */
function transformCategory(sharePointCategory: string): BlogCategory {
  return SHAREPOINT_CATEGORY_MAP[sharePointCategory] || 'company-news';
}

/**
 * Transform SharePoint status to BlogStatus
 */
function transformStatus(sharePointStatus: string): BlogStatus {
  const statusMap: Record<string, BlogStatus> = {
    Draft: 'draft',
    Published: 'published',
    Archived: 'archived',
  };
  return statusMap[sharePointStatus] || 'draft';
}

/**
 * Parse tags from comma-separated string
 */
function parseTags(tagsString?: string): string[] {
  if (!tagsString) return [];
  return tagsString
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

/**
 * Transform SharePoint item to BlogArticle
 */
function transformToBlogArticle(item: SharePointBlogItem): BlogArticle {
  const fields = item.fields;

  return {
    id: item.id,
    title: fields.Title || '',
    slug: fields.Slug || '',
    excerpt: fields.Excerpt || '',
    content: fields.Content || '',
    featuredImage: fields.FeaturedImage?.Url || '/images/blog/default-cover.jpg',
    author: transformAuthor(item),
    category: transformCategory(fields.Category),
    tags: parseTags(fields.Tags),
    publishDate: fields.PublishDate || fields.Created,
    status: transformStatus(fields.Status),
    readTimeMinutes: fields.ReadTimeMinutes || 5,
    metaDescription: fields.MetaDescription,
    featured: fields.Featured || false,
    createdAt: fields.Created,
    updatedAt: fields.Modified,
  };
}

/**
 * Transform SharePoint item to BlogArticlePreview (lighter version)
 */
function transformToPreview(item: SharePointBlogItem): BlogArticlePreview {
  const fields = item.fields;

  return {
    id: item.id,
    title: fields.Title || '',
    slug: fields.Slug || '',
    excerpt: fields.Excerpt || '',
    featuredImage: fields.FeaturedImage?.Url || '/images/blog/default-cover.jpg',
    author: transformAuthor(item),
    category: transformCategory(fields.Category),
    tags: parseTags(fields.Tags),
    publishDate: fields.PublishDate || fields.Created,
    readTimeMinutes: fields.ReadTimeMinutes || 5,
    featured: fields.Featured || false,
  };
}

/**
 * Build OData filter string for SharePoint query
 */
function buildFilter(params: GetArticlesParams): string {
  const filters: string[] = [];

  // Always filter by published status unless explicitly requested otherwise
  const status = params.status || 'published';
  filters.push(`fields/Status eq '${status === 'published' ? 'Published' : status === 'draft' ? 'Draft' : 'Archived'}'`);

  // Category filter
  if (params.category) {
    const sharePointCategory = CATEGORY_TO_SHAREPOINT_MAP[params.category];
    if (sharePointCategory) {
      filters.push(`fields/Category eq '${sharePointCategory}'`);
    }
  }

  // Featured filter
  if (params.featured !== undefined) {
    filters.push(`fields/Featured eq ${params.featured}`);
  }

  return filters.join(' and ');
}

/**
 * Get paginated list of blog articles
 */
export async function getArticles(
  params: GetArticlesParams = {}
): Promise<BlogListResponse> {
  const client = getGraphClient();
  const listPath = getListPath();

  const page = Math.max(1, params.page || 1);
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, params.limit || DEFAULT_PAGE_SIZE));
  const skip = (page - 1) * limit;

  // Build query
  const filter = buildFilter(params);

  try {
    // Get total count first
    const countResponse = await client
      .api(`${listPath}/items`)
      .filter(filter)
      .count(true)
      .top(1)
      .get();

    const total = countResponse['@odata.count'] || 0;

    // Get paginated items
    const response: SharePointListResponse = await client
      .api(`${listPath}/items`)
      .expand('fields')
      .filter(filter)
      .orderby('fields/PublishDate desc')
      .skip(skip)
      .top(limit)
      .get();

    const articles = response.value.map(transformToPreview);
    const totalPages = Math.ceil(total / limit);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching articles from SharePoint:', error);
    throw new Error('Failed to fetch articles');
  }
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  const client = getGraphClient();
  const listPath = getListPath();

  try {
    const response: SharePointListResponse = await client
      .api(`${listPath}/items`)
      .expand('fields')
      .filter(`fields/Slug eq '${slug}' and fields/Status eq 'Published'`)
      .top(1)
      .get();

    if (response.value.length === 0) {
      return null;
    }

    return transformToBlogArticle(response.value[0]);
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    throw new Error('Failed to fetch article');
  }
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(
  limit: number = 3
): Promise<BlogArticlePreview[]> {
  const client = getGraphClient();
  const listPath = getListPath();

  try {
    const response: SharePointListResponse = await client
      .api(`${listPath}/items`)
      .expand('fields')
      .filter("fields/Status eq 'Published' and fields/Featured eq true")
      .orderby('fields/PublishDate desc')
      .top(limit)
      .get();

    return response.value.map(transformToPreview);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw new Error('Failed to fetch featured articles');
  }
}

/**
 * Get related articles (same category, excluding current)
 */
export async function getRelatedArticles(
  currentSlug: string,
  category: BlogCategory,
  limit: number = 3
): Promise<BlogArticlePreview[]> {
  const client = getGraphClient();
  const listPath = getListPath();
  const sharePointCategory = CATEGORY_TO_SHAREPOINT_MAP[category];

  try {
    const response: SharePointListResponse = await client
      .api(`${listPath}/items`)
      .expand('fields')
      .filter(
        `fields/Status eq 'Published' and fields/Category eq '${sharePointCategory}' and fields/Slug ne '${currentSlug}'`
      )
      .orderby('fields/PublishDate desc')
      .top(limit)
      .get();

    return response.value.map(transformToPreview);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return []; // Return empty array on error for related articles
  }
}

/**
 * Get all categories with article counts
 */
export async function getCategories(): Promise<BlogCategoryInfo[]> {
  const client = getGraphClient();
  const listPath = getListPath();

  const categories: BlogCategoryInfo[] = [];

  try {
    // Get counts for each category
    for (const [slug, info] of Object.entries(BLOG_CATEGORIES)) {
      const sharePointCategory = CATEGORY_TO_SHAREPOINT_MAP[slug as BlogCategory];

      const response = await client
        .api(`${listPath}/items`)
        .filter(
          `fields/Status eq 'Published' and fields/Category eq '${sharePointCategory}'`
        )
        .count(true)
        .top(1)
        .get();

      categories.push({
        slug: slug as BlogCategory,
        label: info.label,
        description: info.description,
        count: response['@odata.count'] || 0,
      });
    }

    // Sort by count descending
    return categories.sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return categories with zero counts on error
    return Object.entries(BLOG_CATEGORIES).map(([slug, info]) => ({
      slug: slug as BlogCategory,
      label: info.label,
      description: info.description,
      count: 0,
    }));
  }
}

/**
 * Get all article slugs (for static path generation)
 */
export async function getAllSlugs(): Promise<string[]> {
  const client = getGraphClient();
  const listPath = getListPath();

  try {
    const response: SharePointListResponse = await client
      .api(`${listPath}/items`)
      .expand('fields($select=Slug)')
      .filter("fields/Status eq 'Published'")
      .select('fields')
      .get();

    return response.value
      .map((item) => item.fields.Slug)
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error('Error fetching all slugs:', error);
    return [];
  }
}

/**
 * Check if SharePoint is properly configured and accessible
 */
export async function checkSharePointHealth(): Promise<{
  configured: boolean;
  accessible: boolean;
  error?: string;
}> {
  // Check configuration
  if (!SITE_ID || !LIST_ID) {
    return {
      configured: false,
      accessible: false,
      error: 'SharePoint site or list ID not configured',
    };
  }

  try {
    const client = getGraphClient();
    const listPath = getListPath();

    // Try to access the list
    await client.api(listPath).get();

    return {
      configured: true,
      accessible: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      configured: true,
      accessible: false,
      error: message,
    };
  }
}
