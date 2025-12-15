/**
 * Blog System Type Definitions
 *
 * These interfaces define the data structures for the blog system
 * that integrates with SharePoint as a CMS.
 */

// ============================================
// Core Blog Types
// ============================================

/**
 * Available blog categories
 */
export type BlogCategory =
  | 'ai-ml'
  | 'data-engineering'
  | 'analytics-bi'
  | 'industry-insights'
  | 'company-news'
  | 'case-studies';

/**
 * Article publication status
 */
export type BlogStatus = 'draft' | 'published' | 'archived';

/**
 * Blog author information
 */
export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
}

/**
 * Category metadata with article count
 */
export interface BlogCategoryInfo {
  slug: BlogCategory;
  label: string;
  description: string;
  count: number;
}

/**
 * Main blog article interface
 */
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  status: BlogStatus;
  readTimeMinutes: number;
  metaDescription?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Simplified article for list views (excludes full content)
 */
export interface BlogArticlePreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  readTimeMinutes: number;
  featured: boolean;
}

// ============================================
// API Response Types
// ============================================

/**
 * Pagination metadata
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Response for article list endpoint
 */
export interface BlogListResponse {
  articles: BlogArticlePreview[];
  pagination: PaginationInfo;
}

/**
 * Response for single article endpoint
 */
export interface BlogArticleResponse {
  article: BlogArticle;
  relatedArticles: BlogArticlePreview[];
}

/**
 * Response for categories endpoint
 */
export interface BlogCategoriesResponse {
  categories: BlogCategoryInfo[];
}

/**
 * Revalidation webhook payload
 */
export interface RevalidatePayload {
  slug?: string;
  action: 'create' | 'update' | 'delete';
}

// ============================================
// SharePoint Integration Types
// ============================================

/**
 * Raw SharePoint list item from Graph API
 * Maps to the Blog Articles list schema
 */
export interface SharePointBlogItem {
  id: string;
  fields: {
    Title: string;
    Slug: string;
    Excerpt: string;
    Content: string;
    FeaturedImage?: {
      Url: string;
      Description?: string;
    };
    Author?: {
      LookupId: number;
      LookupValue: string;
      Email?: string;
    };
    AuthorLookupId?: number;
    Category: string;
    Tags?: string;
    PublishDate: string;
    Status: string;
    ReadTimeMinutes?: number;
    MetaDescription?: string;
    Featured?: boolean;
    Created: string;
    Modified: string;
  };
}

/**
 * SharePoint user lookup result
 */
export interface SharePointUser {
  id: number;
  displayName: string;
  email: string;
  jobTitle?: string;
  picture?: {
    url: string;
  };
}

/**
 * Graph API list items response
 */
export interface SharePointListResponse {
  value: SharePointBlogItem[];
  '@odata.nextLink'?: string;
  '@odata.count'?: number;
}

// ============================================
// Query Parameters
// ============================================

/**
 * Parameters for fetching article list
 */
export interface GetArticlesParams {
  page?: number;
  limit?: number;
  category?: BlogCategory;
  featured?: boolean;
  status?: BlogStatus;
}

/**
 * Parameters for searching articles
 */
export interface SearchArticlesParams {
  query: string;
  page?: number;
  limit?: number;
}

// ============================================
// Constants
// ============================================

/**
 * Category display information
 */
export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  'ai-ml': {
    label: 'AI & Machine Learning',
    description: 'Insights on artificial intelligence and machine learning applications',
  },
  'data-engineering': {
    label: 'Data Engineering',
    description: 'Best practices for building robust data infrastructure',
  },
  'analytics-bi': {
    label: 'Analytics & BI',
    description: 'Business intelligence and analytics strategies',
  },
  'industry-insights': {
    label: 'Industry Insights',
    description: 'Trends and perspectives across industries',
  },
  'company-news': {
    label: 'Company News',
    description: 'Updates and announcements from Innovoco',
  },
  'case-studies': {
    label: 'Case Studies',
    description: 'Real-world success stories and implementations',
  },
};

/**
 * Default pagination settings
 */
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

/**
 * Map SharePoint category values to BlogCategory slugs
 */
export const SHAREPOINT_CATEGORY_MAP: Record<string, BlogCategory> = {
  'AI & Machine Learning': 'ai-ml',
  'Data Engineering': 'data-engineering',
  'Analytics & BI': 'analytics-bi',
  'Industry Insights': 'industry-insights',
  'Company News': 'company-news',
  'Case Studies': 'case-studies',
};

/**
 * Map BlogCategory slugs to SharePoint category values
 */
export const CATEGORY_TO_SHAREPOINT_MAP: Record<BlogCategory, string> = {
  'ai-ml': 'AI & Machine Learning',
  'data-engineering': 'Data Engineering',
  'analytics-bi': 'Analytics & BI',
  'industry-insights': 'Industry Insights',
  'company-news': 'Company News',
  'case-studies': 'Case Studies',
};
