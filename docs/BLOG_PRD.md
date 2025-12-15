# Blog System PRD - SharePoint Integration

## Document Information

| Field | Value |
|-------|-------|
| **Document Type** | Product Requirements Document (PRD) |
| **Project** | Innovoco Blog System |
| **Date Created** | December 15, 2025 |
| **Status** | Draft - Pending Approval |
| **Priority** | High |

---

## Executive Summary

This PRD outlines the implementation of a blog system for the Innovoco public website that connects to SharePoint as a content management system (CMS). The goal is to provide a simple, user-friendly pipeline for non-technical team members to create, edit, and manage blog articles through SharePoint Lists while maintaining the website's on-brand identity.

### Key Objectives

1. **Ease of Use** - Non-technical users can manage content via SharePoint
2. **Full Control** - Complete ownership of content and data
3. **On-Brand Identity** - Consistent visual design with existing website
4. **Real-Time Updates** - Changes in SharePoint reflect on the website
5. **Cost Efficiency** - Leverage existing Microsoft 365 subscription

---

## Current State Analysis

### Existing Infrastructure

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4.1.18
- **Hosting**: Vercel
- **Existing Blog Page**: Placeholder at `/blog` ([app/(public)/blog/page.tsx](app/(public)/blog/page.tsx))
- **Navigation**: Header with navItems array ([components/layout/header.tsx](components/layout/header.tsx))

### Current Navigation Structure

```typescript
const navItems = [
  { label: "AI", section: "ai" },
  { label: "Analytics", section: "analytics" },
  { label: "Data", section: "data" },
  { label: "Industries", section: "industries" },
  { label: "Team", section: "about" },
];
```

**Blog link will be added to this navigation.**

---

## Technical Architecture

### Option A: SharePoint Lists + Microsoft Graph API (Recommended)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Content Pipeline                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐        │
│  │  SharePoint  │────▶│  Azure AD    │────▶│   Next.js    │        │
│  │    Lists     │     │  + Graph API │     │   Website    │        │
│  └──────────────┘     └──────────────┘     └──────────────┘        │
│        │                    │                     │                  │
│        │                    │                     │                  │
│        ▼                    ▼                     ▼                  │
│   ┌─────────┐         ┌─────────┐          ┌─────────┐             │
│   │ Articles│         │  OAuth  │          │   ISR   │             │
│   │ Images  │         │  Token  │          │ Caching │             │
│   │ Authors │         │  Auth   │          │  (60s)  │             │
│   └─────────┘         └─────────┘          └─────────┘             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    Azure AD Authentication                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│   1. App Registration in Azure AD                                │
│   2. Client Credentials Flow (App-Only)                          │
│   3. Permissions: Sites.Read.All, Files.Read.All                 │
│   4. Token stored server-side (never exposed to client)          │
│                                                                   │
│   Environment Variables:                                          │
│   ┌─────────────────────────────────────────────────┐            │
│   │ AZURE_AD_CLIENT_ID=<app-id>                     │            │
│   │ AZURE_AD_CLIENT_SECRET=<secret>                 │            │
│   │ AZURE_AD_TENANT_ID=<tenant-id>                  │            │
│   │ SHAREPOINT_SITE_ID=<site-id>                    │            │
│   │ SHAREPOINT_LIST_ID=<list-id>                    │            │
│   └─────────────────────────────────────────────────┘            │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## SharePoint List Schema

### Blog Articles List

| Column Name | Type | Required | Description |
|-------------|------|----------|-------------|
| Title | Single line of text | Yes | Article title |
| Slug | Single line of text | Yes | URL-friendly identifier (auto-generated) |
| Excerpt | Multiple lines of text | Yes | Short description for cards (150-200 chars) |
| Content | Multiple lines of text (Rich) | Yes | Full article body (HTML/Markdown) |
| FeaturedImage | Hyperlink or Image | Yes | Main article image URL |
| Author | Person | Yes | Article author |
| Category | Choice | Yes | AI, Analytics, Data, Industry Insights, Company News |
| Tags | Multiple lines of text | No | Comma-separated tags |
| PublishDate | Date and Time | Yes | When to publish |
| Status | Choice | Yes | Draft, Published, Archived |
| ReadTimeMinutes | Number | No | Estimated read time |
| MetaDescription | Single line of text | No | SEO description |
| Featured | Yes/No | No | Show on homepage |

### Categories (Choice Column Values)

1. AI & Machine Learning
2. Data Engineering
3. Analytics & BI
4. Industry Insights
5. Company News
6. Case Studies

### Status Workflow

```
Draft ──▶ Published ──▶ Archived
  │           │
  └───────────┘ (Can revert to Draft for edits)
```

---

## API Routes Design

### Route Structure

```
/api/blog/
├── articles/
│   ├── route.ts          # GET: List all published articles
│   └── [slug]/
│       └── route.ts      # GET: Single article by slug
├── categories/
│   └── route.ts          # GET: List all categories with counts
└── revalidate/
    └── route.ts          # POST: Webhook for cache invalidation
```

### API Endpoints

#### 1. Get All Articles
```typescript
// GET /api/blog/articles?page=1&limit=10&category=ai
interface ArticleListResponse {
  articles: BlogArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### 2. Get Single Article
```typescript
// GET /api/blog/articles/[slug]
interface ArticleResponse {
  article: BlogArticle;
  relatedArticles: BlogArticle[]; // Same category, limit 3
}
```

#### 3. Revalidation Webhook
```typescript
// POST /api/blog/revalidate
// Called by SharePoint Power Automate flow
// Invalidates ISR cache for updated articles
```

---

## Data Models

### TypeScript Interfaces

```typescript
// lib/types/blog.ts

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
  status: 'draft' | 'published' | 'archived';
  readTimeMinutes: number;
  metaDescription?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
}

export type BlogCategory =
  | 'ai-ml'
  | 'data-engineering'
  | 'analytics-bi'
  | 'industry-insights'
  | 'company-news'
  | 'case-studies';

export interface BlogCategoryInfo {
  slug: BlogCategory;
  label: string;
  description: string;
  count: number;
}
```

---

## Page Structure

### Route Architecture

```
app/(public)/blog/
├── page.tsx                    # Blog listing page
├── [slug]/
│   └── page.tsx               # Individual article page
├── category/
│   └── [category]/
│       └── page.tsx           # Category filtered listing
└── layout.tsx                 # Shared blog layout
```

### Page Components

#### Blog Listing Page (`/blog`)

```
┌─────────────────────────────────────────────────────────┐
│                      Header (Nav)                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Blog Hero Section                    │   │
│  │  "Insights & Innovation"                         │   │
│  │  Expert perspectives on AI, data, and...         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Categories: [All] [AI] [Data] [Analytics] ...   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Featured Article (Large)             │   │
│  │  ┌─────────────┐  ┌──────────────────────────┐  │   │
│  │  │   Image     │  │  Category • Date          │  │   │
│  │  │             │  │  Title                    │  │   │
│  │  │             │  │  Excerpt...               │  │   │
│  │  └─────────────┘  │  Author • Read Time       │  │   │
│  │                   └──────────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │  Article   │  │  Article   │  │  Article   │       │
│  │   Card     │  │   Card     │  │   Card     │       │
│  │            │  │            │  │            │       │
│  └────────────┘  └────────────┘  └────────────┘       │
│                                                          │
│              [Load More / Pagination]                    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                      Footer                              │
└─────────────────────────────────────────────────────────┘
```

#### Article Page (`/blog/[slug]`)

```
┌─────────────────────────────────────────────────────────┐
│                      Header (Nav)                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ← Back to Blog    Category • Date • Read Time   │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                   │   │
│  │  Article Title (H1)                              │   │
│  │                                                   │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │         Featured Image (Full Width)       │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                   │   │
│  │  ┌───────┐                                       │   │
│  │  │Avatar │ Author Name • Title                   │   │
│  │  └───────┘                                       │   │
│  │                                                   │   │
│  │  Article Content (Markdown/HTML)                 │   │
│  │  - Headings                                      │   │
│  │  - Paragraphs                                    │   │
│  │  - Code blocks                                   │   │
│  │  - Images                                        │   │
│  │  - Lists                                         │   │
│  │                                                   │   │
│  │  Tags: [AI] [Strategy] [Enterprise]              │   │
│  │                                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Related Articles                     │   │
│  │  ┌────────┐  ┌────────┐  ┌────────┐            │   │
│  │  │ Card 1 │  │ Card 2 │  │ Card 3 │            │   │
│  │  └────────┘  └────────┘  └────────┘            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                      Footer                              │
└─────────────────────────────────────────────────────────┘
```

---

## Components to Create

### New Components

| Component | Path | Description |
|-----------|------|-------------|
| BlogHero | `components/blog/blog-hero.tsx` | Hero section for blog listing |
| BlogCard | `components/blog/blog-card.tsx` | Article preview card |
| BlogCardFeatured | `components/blog/blog-card-featured.tsx` | Large featured article card |
| BlogCategories | `components/blog/blog-categories.tsx` | Category filter tabs |
| BlogAuthorCard | `components/blog/blog-author-card.tsx` | Author info display |
| BlogArticleContent | `components/blog/blog-article-content.tsx` | Markdown/HTML renderer |
| BlogRelatedArticles | `components/blog/blog-related-articles.tsx` | Related articles section |
| BlogPagination | `components/blog/blog-pagination.tsx` | Pagination controls |
| BlogSkeleton | `components/blog/blog-skeleton.tsx` | Loading states |

### Shared Components (Reuse Existing)

- Button (`components/ui/button.tsx`)
- Header (`components/layout/header.tsx`) - Add Blog link
- Footer (`components/layout/footer.tsx`)

---

## Caching Strategy

### ISR (Incremental Static Regeneration)

```typescript
// app/(public)/blog/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

// app/(public)/blog/[slug]/page.tsx
export const revalidate = 300; // Individual articles: 5 minutes

// On-demand revalidation via webhook
// POST /api/blog/revalidate triggers revalidatePath('/blog')
```

### Caching Layers

```
┌──────────────────────────────────────────────────────────┐
│                    Caching Strategy                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│   Layer 1: Vercel Edge Cache (CDN)                       │
│   ├── Static pages cached at edge                        │
│   └── Stale-while-revalidate                             │
│                                                           │
│   Layer 2: Next.js ISR                                   │
│   ├── Blog listing: 60s revalidation                     │
│   ├── Article pages: 300s revalidation                   │
│   └── On-demand via webhook                              │
│                                                           │
│   Layer 3: Microsoft Graph Token Cache                   │
│   ├── Access token: 1 hour                               │
│   └── Refresh before expiry                              │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## Content Pipeline UX

### For Content Creators (Non-Technical)

```
┌──────────────────────────────────────────────────────────┐
│               Content Creator Workflow                    │
├──────────────────────────────────────────────────────────┤
│                                                           │
│   Step 1: Open SharePoint List                           │
│   └── Navigate to "Blog Articles" list in SharePoint     │
│                                                           │
│   Step 2: Add New Item                                   │
│   └── Click "+ New" or edit existing                     │
│                                                           │
│   Step 3: Fill Form Fields                               │
│   ├── Title: "How AI is Transforming Finance"            │
│   ├── Excerpt: "Discover how financial institutions..."  │
│   ├── Content: [Rich text editor with formatting]        │
│   ├── Featured Image: [Upload or paste URL]              │
│   ├── Category: [Dropdown - AI & Machine Learning]       │
│   ├── Status: [Draft → Published when ready]             │
│   └── Publish Date: [Date picker]                        │
│                                                           │
│   Step 4: Save                                           │
│   └── Article appears on website within 60 seconds       │
│                                                           │
│   Optional: Power Automate Notification                  │
│   └── Triggers immediate cache refresh                   │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### SharePoint Interface Customization

1. **Custom List Form** - Simplified form with only essential fields visible
2. **Column Formatting** - Visual status indicators (Draft=Yellow, Published=Green)
3. **Views** - Pre-built views for "My Drafts", "All Published", "Scheduled"
4. **Validation** - Required field checks before publishing

---

## Power Automate Integration (Optional Enhancement)

### Instant Cache Invalidation Flow

```
Trigger: When an item is created or modified
Condition: Status equals "Published"
Action: HTTP POST to https://innovoco.com/api/blog/revalidate
        Headers: { "x-revalidate-secret": "<secret>" }
        Body: { "slug": "@{triggerBody()?['Slug']}" }
```

---

## SEO Implementation

### Meta Tags per Article

```typescript
// app/(public)/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);

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
}
```

### Structured Data (JSON-LD)

```typescript
// Article schema for Google
const articleSchema = {
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
    logo: 'https://innovoco.com/images/logos/Innovoco-Logo-hires.png',
  },
  datePublished: article.publishDate,
  dateModified: article.updatedAt,
};
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

| Task | Priority | Effort |
|------|----------|--------|
| Set up Azure AD App Registration | High | 2h |
| Configure SharePoint List with schema | High | 2h |
| Create Microsoft Graph API service | High | 4h |
| Implement basic API routes | High | 4h |
| Add environment variables to Vercel | High | 30m |

### Phase 2: Core Features (Week 2)

| Task | Priority | Effort |
|------|----------|--------|
| Create BlogCard component | High | 2h |
| Create BlogCardFeatured component | High | 2h |
| Create BlogCategories component | High | 1h |
| Build blog listing page | High | 4h |
| Build individual article page | High | 4h |
| Add Blog to header navigation | High | 30m |
| Markdown/HTML content rendering | High | 2h |

### Phase 3: Polish & Optimization (Week 3)

| Task | Priority | Effort |
|------|----------|--------|
| Implement loading skeletons | Medium | 1h |
| Add pagination | Medium | 2h |
| SEO meta tags and JSON-LD | High | 2h |
| Related articles feature | Medium | 2h |
| Mobile responsive testing | High | 2h |
| Error handling and fallbacks | High | 2h |

### Phase 4: Enhancement (Optional)

| Task | Priority | Effort |
|------|----------|--------|
| Power Automate webhook flow | Low | 2h |
| SharePoint form customization | Low | 2h |
| Search functionality | Low | 4h |
| RSS feed generation | Low | 1h |
| Newsletter integration | Low | 2h |

---

## Alternative CMS Options Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **SharePoint Lists** | Existing M365 subscription, familiar UI, full control | Graph API complexity, limited rich text | **Selected** |
| Sanity.io | Excellent DX, real-time preview, generous free tier | Learning curve, external dependency | Backup option |
| Notion API | Simple interface, familiar to many teams | Rate limits, less structured | Not selected |
| Strapi (Self-hosted) | Full control, open source | Hosting costs, maintenance burden | Not selected |
| Supabase | Real-time, PostgreSQL, auth included | Requires custom admin UI | Not selected |

---

## Security Considerations

### Authentication Security

1. **Server-Side Only** - Graph API calls only from API routes/Server Components
2. **Secret Storage** - All credentials in Vercel environment variables
3. **Token Rotation** - Access tokens refreshed before expiry
4. **Minimal Permissions** - Read-only access to SharePoint site

### Content Security

1. **HTML Sanitization** - Sanitize rich text content before rendering
2. **Image Validation** - Validate image URLs from SharePoint
3. **Rate Limiting** - Implement rate limiting on API routes
4. **Webhook Authentication** - Secret header validation for revalidation

### Environment Variables Required

```env
# Azure AD / Microsoft Graph
AZURE_AD_CLIENT_ID=
AZURE_AD_CLIENT_SECRET=
AZURE_AD_TENANT_ID=

# SharePoint Configuration
SHAREPOINT_SITE_ID=
SHAREPOINT_LIST_ID=
SHAREPOINT_DRIVE_ID=

# Webhook Security
REVALIDATE_SECRET=

# Optional: Image CDN
NEXT_PUBLIC_IMAGE_CDN_URL=
```

---

## Success Metrics

### Technical Metrics

| Metric | Target |
|--------|--------|
| Page Load Time (Blog Listing) | < 1.5s |
| Time to First Byte (TTFB) | < 200ms |
| Lighthouse Performance Score | > 90 |
| Core Web Vitals (LCP) | < 2.5s |

### Business Metrics

| Metric | Target |
|--------|--------|
| Content Update Latency | < 2 minutes |
| Author Time to Publish | < 5 minutes |
| Blog Page Bounce Rate | < 60% |
| Average Time on Page | > 2 minutes |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Graph API rate limiting | Low | Medium | Implement caching, batch requests |
| SharePoint downtime | Low | High | Cache published articles, graceful fallback |
| Token expiration during request | Medium | Low | Implement token refresh logic |
| Rich text formatting issues | Medium | Medium | Use established Markdown renderer |
| Image loading performance | Medium | Medium | Use Next.js Image optimization |

---

## Dependencies

### NPM Packages to Install

```bash
bun add @azure/identity @microsoft/microsoft-graph-client
bun add marked dompurify    # For Markdown/HTML rendering
bun add -d @types/dompurify
```

### External Services

- Microsoft Azure AD (App Registration)
- SharePoint Online (M365)
- Vercel (Hosting)

---

## Acceptance Criteria

### Must Have (MVP)

- [ ] Blog listing page displays published articles from SharePoint
- [ ] Individual article pages render full content
- [ ] Blog link added to main navigation
- [ ] Category filtering works
- [ ] Mobile responsive design
- [ ] Articles load within 2 seconds
- [ ] Content updates appear within 60 seconds

### Should Have

- [ ] Featured article section on listing page
- [ ] Related articles on article pages
- [ ] Author information display
- [ ] Loading skeletons during data fetch
- [ ] SEO meta tags and Open Graph

### Nice to Have

- [ ] Instant cache invalidation via Power Automate
- [ ] Search functionality
- [ ] RSS feed
- [ ] Newsletter signup integration

---

## Appendix A: Header Navigation Update

### Current Implementation

```typescript
// components/layout/header.tsx
const navItems = [
  { label: "AI", section: "ai" },
  { label: "Analytics", section: "analytics" },
  { label: "Data", section: "data" },
  { label: "Industries", section: "industries" },
  { label: "Team", section: "about" },
];
```

### Proposed Update

```typescript
// components/layout/header.tsx
const navItems = [
  { label: "AI", section: "ai" },
  { label: "Analytics", section: "analytics" },
  { label: "Data", section: "data" },
  { label: "Industries", section: "industries" },
  { label: "Blog", section: "blog", isExternal: true }, // New
  { label: "Team", section: "about" },
];

// Updated getNavHref function
const getNavHref = (item: NavItem) => {
  if (item.isExternal) return `/${item.section}`;
  return isLandingPage ? `#${item.section}` : `/#${item.section}`;
};
```

---

## Appendix B: File Structure After Implementation

```
app/
├── (public)/
│   └── blog/
│       ├── page.tsx                 # Blog listing
│       ├── [slug]/
│       │   └── page.tsx            # Article page
│       ├── category/
│       │   └── [category]/
│       │       └── page.tsx        # Category listing
│       └── layout.tsx              # Blog layout
├── api/
│   └── blog/
│       ├── articles/
│       │   ├── route.ts            # GET all articles
│       │   └── [slug]/
│       │       └── route.ts        # GET single article
│       ├── categories/
│       │   └── route.ts            # GET categories
│       └── revalidate/
│           └── route.ts            # POST revalidate

components/
├── blog/
│   ├── blog-hero.tsx
│   ├── blog-card.tsx
│   ├── blog-card-featured.tsx
│   ├── blog-categories.tsx
│   ├── blog-author-card.tsx
│   ├── blog-article-content.tsx
│   ├── blog-related-articles.tsx
│   ├── blog-pagination.tsx
│   └── blog-skeleton.tsx

lib/
├── services/
│   ├── sharepoint.ts               # SharePoint API client
│   └── graph-auth.ts               # Azure AD authentication
├── types/
│   └── blog.ts                     # TypeScript interfaces
└── utils/
    └── blog-helpers.ts             # Slug generation, etc.
```

---

## Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Product Owner | | Pending | |
| Technical Lead | | Pending | |
| Design Lead | | Pending | |

---

**Next Steps After Approval:**

1. Create Azure AD App Registration
2. Set up SharePoint List with defined schema
3. Begin Phase 1 implementation
4. Schedule weekly progress reviews
