# Sanity CMS Implementation Guide

## Overview

This document describes the Sanity CMS integration for the Innovoco blog system. Sanity serves as the headless CMS, providing a user-friendly content management interface while the Next.js frontend handles rendering.

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Sanity Studio     │     │    Sanity Cloud     │     │   Next.js Frontend  │
│   /studio route     │────▶│   (CDN + API)       │────▶│   Blog Pages        │
│   Content editing   │     │   Content delivery  │     │   /blog/*           │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

## Key Files & Structure

### Sanity Configuration

| File | Purpose |
|------|---------|
| `sanity.config.ts` | Main Sanity Studio configuration |
| `sanity/schemas/` | Content type definitions |
| `sanity/schemas/article.ts` | Blog article schema |
| `sanity/schemas/author.ts` | Author schema |
| `sanity/schemas/blockContent.ts` | Rich text editor configuration |
| `lib/sanity/client.ts` | Sanity client & image URL helpers |

### Data Service Layer

| File | Purpose |
|------|---------|
| `lib/services/sanity.ts` | All blog data fetching functions |

### Frontend Components

| Path | Purpose |
|------|---------|
| `app/(public)/blog/page.tsx` | Blog listing page |
| `app/(public)/blog/[slug]/page.tsx` | Article detail page |
| `components/blog/` | Reusable blog UI components |

## Content Schemas

### Article Schema

The article schema includes these field groups:

**Content Group:**
- `title` - Article headline (required, max 100 chars)
- `slug` - URL-safe identifier (auto-generated from title)
- `excerpt` - Preview text for cards (max 200 chars)
- `content` - Rich text body (Portable Text)

**Media Group:**
- `featuredImage` - Main image with hotspot cropping and alt text

**Metadata Group:**
- `author` - Reference to author document
- `category` - Dropdown selection (AI & ML, Data Engineering, etc.)
- `tags` - Array of keyword strings
- `publishDate` - Publication date/time

**SEO Group:**
- `metaDescription` - Custom meta description (max 160 chars)

**Settings Group:**
- `isPublished` - Toggle to show/hide article on website
- `featured` - Toggle to feature article in hero section
- `readTimeMinutes` - Estimated reading time

### Author Schema

- `name` - Author's display name
- `email` - Contact email
- `title` - Job title/role
- `avatar` - Profile image

## Featured Articles Logic

The featured article system follows UX best practices for editorial control:

### How It Works

1. **Explicit Control**: Articles with `featured: true` get priority
2. **Multiple Featured**: You can mark multiple articles as featured
3. **Chronological Order**: Featured articles are sorted by publish date (newest first)
4. **Smart Fallback**: If no articles are marked featured, the system shows the latest published articles

### Implementation Details

```typescript
// lib/services/sanity.ts - getFeaturedArticles()

// Priority 1: Get explicitly featured articles
*[_type == "article" && isPublished == true && featured == true]

// Priority 2: If some featured but not enough, supplement with latest
*[_type == "article" && isPublished == true && featured != true]

// Fallback: No articles featured, use latest published
*[_type == "article" && isPublished == true] | order(publishDate desc)
```

### Sanity Studio Instructions

To feature an article:
1. Open the article in Sanity Studio
2. Go to the **Settings** tab
3. Toggle **"Feature this Article"** to ON
4. The article will appear in the hero section at the top of `/blog`

## Image Handling

### Configuration

Images from Sanity CDN are configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
}
```

### Image URL Helpers

The `lib/sanity/client.ts` provides optimized image URL builders:

| Function | Output Size | Use Case |
|----------|-------------|----------|
| `getBlogImageUrl()` | 1200x630 | Featured images, OG images |
| `getThumbnailUrl()` | 400x225 | Blog card thumbnails |
| `getAvatarUrl()` | 128x128 | Author avatars |

## Environment Variables

Required environment variables for Sanity:

```bash
# Public (exposed to browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Server-only (for preview/drafts)
SANITY_API_TOKEN=your-api-token
SANITY_PREVIEW_SECRET=your-preview-secret
```

## Preview Mode

### Draft Preview

The preview system allows viewing unpublished content:

1. **Preview Route**: `app/api/preview/route.ts`
2. **Activation**: `/api/preview?slug=article-slug&secret=preview-secret`
3. **Deactivation**: `/api/preview?disable=true`

### Sanity Studio Integration

The preview pane in Sanity Studio (`sanity/plugins/previewPane.tsx`) enables live preview of articles while editing.

## Data Flow

### Blog Listing Page

```
1. User visits /blog
2. getArticles() fetches paginated articles from Sanity
3. getFeaturedArticles() fetches featured/latest for hero
4. Server renders page with ISR (revalidate: 60s)
5. Client receives hydrated HTML
```

### Article Detail Page

```
1. User visits /blog/[slug]
2. getArticleBySlug() fetches article content
3. getRelatedArticles() fetches related articles
4. Dynamic metadata generated for SEO
5. Portable Text rendered to HTML
```

## Blog Categories

Available categories (defined in `lib/types/blog.ts`):

| Value | Display Name |
|-------|--------------|
| `ai-ml` | AI & Machine Learning |
| `data-engineering` | Data Engineering |
| `analytics-bi` | Analytics & BI |
| `industry-insights` | Industry Insights |
| `company-news` | Company News |
| `case-studies` | Case Studies |

## Revalidation Strategy

- **Blog listing**: ISR with 60-second revalidation
- **Article pages**: ISR with 60-second revalidation
- **On-demand**: Webhook-based revalidation supported via `/api/blog/revalidate`

## UI Components

### Blog Components (`components/blog/`)

| Component | Purpose |
|-----------|---------|
| `BlogHero` | Hero section with title and intro |
| `BlogCardFeatured` | Large featured article card |
| `BlogCard` | Standard article card for grid |
| `BlogCategories` | Category filter pills |
| `BlogPagination` | Page navigation |
| `BlogAuthorCard` | Author info display |
| `BlogArticleContent` | Portable Text renderer |
| `BlogRelatedArticles` | Related articles section |

## Footer Newsletter Section

The footer includes a newsletter signup section with responsive typography:

- Mobile: `text-2xl` (24px)
- Tablet: `text-3xl` (30px)
- Desktop: `text-4xl` (36px)

## Future Enhancements

Potential improvements for the blog system:

1. **Search functionality** - Full-text search across articles
2. **Reading progress indicator** - Track scroll position
3. **Social sharing** - Native share buttons
4. **Comments system** - Integrate with Disqus or custom solution
5. **Newsletter integration** - Connect to email service provider
6. **Analytics dashboard** - Article performance metrics

## Troubleshooting

### Images Not Loading

1. Check `next.config.ts` has `cdn.sanity.io` in `remotePatterns`
2. Verify image has asset reference in Sanity
3. Clear `.next` folder and restart dev server

### Featured Toggle Not Working

1. Ensure `isPublished` is also `true`
2. Check `publishDate` is set
3. Verify the query includes `featured == true` filter

### Preview Mode Issues

1. Confirm `SANITY_API_TOKEN` is set
2. Check `SANITY_PREVIEW_SECRET` matches URL parameter
3. Ensure article exists with the given slug

---

*Last updated: December 2024*
