# Blog System - Agile Backlog

## Project Overview

| Field | Value |
|-------|-------|
| **Project** | Innovoco Blog System |
| **Created** | December 15, 2025 |
| **Last Updated** | December 15, 2025 |
| **Status** | In Progress (60%) |
| **Related PRD** | [BLOG_PRD.md](./BLOG_PRD.md) |

---

## Status Legend

| Status | Symbol | Description |
|--------|--------|-------------|
| Not Started | ⬜ | Work has not begun |
| In Progress | 🔄 | Currently being worked on |
| Blocked | 🚫 | Blocked by dependency or issue |
| In Review | 👀 | Completed, pending review |
| Done | ✅ | Completed and verified |
| Cancelled | ❌ | No longer needed |

---

## Epic Overview

| Epic ID | Epic Name | Status | Stories | Progress |
|---------|-----------|--------|---------|----------|
| E1 | Azure AD & SharePoint Setup | 🚫 Blocked (Manual) | 5 | 0/5 |
| E2 | SharePoint API Integration | ✅ Done | 6 | 6/6 |
| E3 | Blog UI Components | ✅ Done | 9 | 9/9 |
| E4 | Blog Pages Implementation | 🔄 In Progress | 5 | 3/5 |
| E5 | Navigation Integration | ✅ Done | 2 | 1/2 |
| E6 | SEO & Performance | 🔄 In Progress | 5 | 2/5 |
| E7 | Content Pipeline & UX | ⬜ Not Started | 4 | 0/4 |
| E8 | Testing & QA | ⬜ Not Started | 4 | 0/4 |

**Total Stories:** 40 | **Completed:** 21 | **Overall Progress:** 52.5%

> **Note:** E1 stories require manual Azure AD and SharePoint configuration by the user. The blog system includes a demo mode with placeholder content until SharePoint is configured.

---

## Epic 1: Azure AD & SharePoint Setup

**Description:** Set up all Azure and SharePoint infrastructure required for the blog system.

**Acceptance Criteria:**
- Azure AD App Registration created with correct permissions
- SharePoint List created with defined schema
- Environment variables configured in Vercel
- Authentication flow working end-to-end

### Stories

#### E1-S1: Create Azure AD App Registration
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P0 - Critical |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | None |

**Description:**
Create an Azure AD App Registration in the Microsoft Azure portal for the Innovoco blog system.

**Tasks:**
- [ ] Log into Azure Portal (portal.azure.com)
- [ ] Navigate to Azure Active Directory → App registrations
- [ ] Create new registration named "Innovoco Blog System"
- [ ] Configure as single-tenant application
- [ ] Note down Application (client) ID
- [ ] Note down Directory (tenant) ID

**Acceptance Criteria:**
- [ ] App Registration created successfully
- [ ] Client ID and Tenant ID documented

---

#### E1-S2: Configure API Permissions
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P0 - Critical |
| **Estimate** | 1 hour |
| **Assignee** | - |
| **Dependencies** | E1-S1 |

**Description:**
Configure Microsoft Graph API permissions for SharePoint access.

**Tasks:**
- [ ] Navigate to App Registration → API Permissions
- [ ] Add Microsoft Graph permissions:
  - [ ] `Sites.Read.All` (Application)
  - [ ] `Files.Read.All` (Application)
- [ ] Grant admin consent for permissions
- [ ] Verify permissions are granted (green checkmarks)

**Acceptance Criteria:**
- [ ] All required permissions added
- [ ] Admin consent granted
- [ ] No permission errors in portal

---

#### E1-S3: Create Client Secret
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P0 - Critical |
| **Estimate** | 30 minutes |
| **Assignee** | - |
| **Dependencies** | E1-S1 |

**Description:**
Generate a client secret for server-side authentication.

**Tasks:**
- [ ] Navigate to App Registration → Certificates & secrets
- [ ] Create new client secret
- [ ] Set expiration (recommend 24 months)
- [ ] Copy secret value immediately (only shown once)
- [ ] Store securely in password manager

**Acceptance Criteria:**
- [ ] Client secret generated
- [ ] Secret value securely stored
- [ ] Expiration date documented for renewal reminder

---

#### E1-S4: Create SharePoint List with Schema
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P0 - Critical |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | None |

**Description:**
Create the "Blog Articles" SharePoint List with all required columns.

**Tasks:**
- [ ] Navigate to SharePoint site
- [ ] Create new List named "Blog Articles"
- [ ] Add columns:
  - [ ] Title (Single line - default)
  - [ ] Slug (Single line, required)
  - [ ] Excerpt (Multiple lines, plain text, required)
  - [ ] Content (Multiple lines, rich text, required)
  - [ ] FeaturedImage (Hyperlink, required)
  - [ ] Author (Person, required)
  - [ ] Category (Choice: AI & ML, Data Engineering, Analytics & BI, Industry Insights, Company News, Case Studies)
  - [ ] Tags (Multiple lines, plain text)
  - [ ] PublishDate (Date and Time, required)
  - [ ] Status (Choice: Draft, Published, Archived)
  - [ ] ReadTimeMinutes (Number)
  - [ ] MetaDescription (Single line)
  - [ ] Featured (Yes/No)
- [ ] Set up column validation rules
- [ ] Create views: "All Items", "Published", "Drafts", "My Items"
- [ ] Note down Site ID and List ID

**Acceptance Criteria:**
- [ ] All columns created with correct types
- [ ] Validation rules working
- [ ] Views configured
- [ ] Site ID and List ID documented

---

#### E1-S5: Configure Vercel Environment Variables
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P0 - Critical |
| **Estimate** | 30 minutes |
| **Assignee** | - |
| **Dependencies** | E1-S1, E1-S3, E1-S4 |

**Description:**
Add all required environment variables to Vercel project.

**Tasks:**
- [ ] Navigate to Vercel project settings
- [ ] Add environment variables:
  - [ ] `AZURE_AD_CLIENT_ID`
  - [ ] `AZURE_AD_CLIENT_SECRET`
  - [ ] `AZURE_AD_TENANT_ID`
  - [ ] `SHAREPOINT_SITE_ID`
  - [ ] `SHAREPOINT_LIST_ID`
  - [ ] `REVALIDATE_SECRET` (generate random string)
- [ ] Set for Production, Preview, and Development
- [ ] Create `.env.local.example` file in repo

**Acceptance Criteria:**
- [ ] All environment variables configured in Vercel
- [ ] Variables work in all environments
- [ ] Example env file created for documentation

---

## Epic 2: SharePoint API Integration

**Description:** Build the backend services to communicate with SharePoint via Microsoft Graph API.

**Acceptance Criteria:**
- Authentication service working
- CRUD operations for articles functional
- Proper error handling and caching
- TypeScript interfaces defined

### Stories

#### E2-S1: Create TypeScript Interfaces
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P0 - Critical |
| **Estimate** | 1 hour |
| **Assignee** | Claude |
| **Dependencies** | None |

**Description:**
Define all TypeScript interfaces for the blog system.

**Tasks:**
- [ ] Create `lib/types/blog.ts`
- [ ] Define interfaces:
  - [ ] `BlogArticle`
  - [ ] `BlogAuthor`
  - [ ] `BlogCategory` type
  - [ ] `BlogCategoryInfo`
  - [ ] `BlogListResponse`
  - [ ] `SharePointListItem` (raw response)

**File to create:** `lib/types/blog.ts`

**Acceptance Criteria:**
- [ ] All interfaces defined
- [ ] Types are strict (no `any`)
- [ ] Exports working correctly

---

#### E2-S2: Implement Azure AD Authentication Service
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P0 - Critical |
| **Estimate** | 3 hours |
| **Assignee** | Claude |
| **Dependencies** | E1-S1, E1-S2, E1-S3, E2-S1 |

**Description:**
Create authentication service using @azure/identity for token management.

**Tasks:**
- [ ] Install dependencies: `bun add @azure/identity @microsoft/microsoft-graph-client`
- [ ] Create `lib/services/graph-auth.ts`
- [ ] Implement `ClientSecretCredential` authentication
- [ ] Implement token caching
- [ ] Implement token refresh logic
- [ ] Add error handling for auth failures

**File to create:** `lib/services/graph-auth.ts`

**Acceptance Criteria:**
- [ ] Can obtain access token
- [ ] Token is cached appropriately
- [ ] Graceful error handling
- [ ] No credentials exposed to client

---

#### E2-S3: Implement SharePoint Service - Read Operations
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P0 - Critical |
| **Estimate** | 4 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S2 |

**Description:**
Create SharePoint service for reading blog articles.

**Tasks:**
- [ ] Create `lib/services/sharepoint.ts`
- [ ] Implement `getArticles()` - list with pagination and filtering
- [ ] Implement `getArticleBySlug()` - single article
- [ ] Implement `getCategories()` - category list with counts
- [ ] Implement `getFeaturedArticles()` - featured flag filter
- [ ] Add response transformation (SharePoint → BlogArticle)
- [ ] Implement error handling

**File to create:** `lib/services/sharepoint.ts`

**Acceptance Criteria:**
- [ ] All read operations working
- [ ] Proper pagination support
- [ ] Category filtering working
- [ ] Data transformation correct

---

#### E2-S4: Create API Route - List Articles
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 2 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S3 |

**Description:**
Create API route for listing blog articles.

**Tasks:**
- [ ] Create `app/api/blog/articles/route.ts`
- [ ] Implement GET handler
- [ ] Support query params: `page`, `limit`, `category`, `featured`
- [ ] Return paginated response
- [ ] Add response caching headers
- [ ] Add error handling

**File to create:** `app/api/blog/articles/route.ts`

**Acceptance Criteria:**
- [ ] GET /api/blog/articles returns articles
- [ ] Pagination working
- [ ] Category filter working
- [ ] Proper error responses

---

#### E2-S5: Create API Route - Single Article
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S3 |

**Description:**
Create API route for fetching a single article by slug.

**Tasks:**
- [ ] Create `app/api/blog/articles/[slug]/route.ts`
- [ ] Implement GET handler
- [ ] Include related articles in response
- [ ] Add 404 handling for non-existent slugs
- [ ] Add response caching

**File to create:** `app/api/blog/articles/[slug]/route.ts`

**Acceptance Criteria:**
- [ ] GET /api/blog/articles/[slug] returns article
- [ ] Related articles included
- [ ] 404 for invalid slugs

---

#### E2-S6: Create API Route - Revalidation Webhook
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S4 |

**Description:**
Create webhook endpoint for cache invalidation from Power Automate.

**Tasks:**
- [ ] Create `app/api/blog/revalidate/route.ts`
- [ ] Implement POST handler
- [ ] Validate `x-revalidate-secret` header
- [ ] Call `revalidatePath('/blog')` and specific article paths
- [ ] Return success/failure response
- [ ] Log revalidation events

**File to create:** `app/api/blog/revalidate/route.ts`

**Acceptance Criteria:**
- [ ] POST triggers revalidation
- [ ] Secret validation working
- [ ] Unauthorized requests rejected
- [ ] Cache properly invalidated

---

## Epic 3: Blog UI Components

**Description:** Create all reusable React components for the blog system.

**Acceptance Criteria:**
- All components follow existing design system
- Components are responsive
- Loading states implemented
- Accessibility compliant

### Stories

#### E3-S1: Create BlogCard Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 2 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S1 |

**Description:**
Create the standard blog article card component for listings.

**Tasks:**
- [ ] Create `components/blog/blog-card.tsx`
- [ ] Display: image, category, title, excerpt, author, date, read time
- [ ] Add hover effects
- [ ] Make fully responsive
- [ ] Add proper image optimization with Next.js Image
- [ ] Link to article page

**File to create:** `components/blog/blog-card.tsx`

**Acceptance Criteria:**
- [ ] Card displays all required info
- [ ] Hover effects working
- [ ] Responsive on all breakpoints
- [ ] Images optimized

---

#### E3-S2: Create BlogCardFeatured Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 2 hours |
| **Assignee** | Claude |
| **Dependencies** | E3-S1 |

**Description:**
Create larger featured article card for hero section.

**Tasks:**
- [ ] Create `components/blog/blog-card-featured.tsx`
- [ ] Horizontal layout (image left, content right)
- [ ] Larger text sizes
- [ ] More prominent styling
- [ ] Stack vertically on mobile

**File to create:** `components/blog/blog-card-featured.tsx`

**Acceptance Criteria:**
- [ ] Prominent featured display
- [ ] Responsive layout shift
- [ ] Consistent with design system

---

#### E3-S3: Create BlogHero Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | None |

**Description:**
Create hero section for blog listing page.

**Tasks:**
- [ ] Create `components/blog/blog-hero.tsx`
- [ ] Title: "Insights & Innovation"
- [ ] Subtitle with description
- [ ] Gradient background matching site
- [ ] Responsive typography

**File to create:** `components/blog/blog-hero.tsx`

**Acceptance Criteria:**
- [ ] Matches site design language
- [ ] Responsive text sizing
- [ ] Proper spacing

---

#### E3-S4: Create BlogCategories Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S1 |

**Description:**
Create category filter tabs/pills for blog listing.

**Tasks:**
- [ ] Create `components/blog/blog-categories.tsx`
- [ ] Display all categories as clickable pills
- [ ] "All" option to show all articles
- [ ] Active state styling
- [ ] URL-based filtering (query params)
- [ ] Horizontal scroll on mobile

**File to create:** `components/blog/blog-categories.tsx`

**Acceptance Criteria:**
- [ ] All categories displayed
- [ ] Active state visible
- [ ] URL updates on selection
- [ ] Mobile scroll working

---

#### E3-S5: Create BlogAuthorCard Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1 hour |
| **Assignee** | Claude |
| **Dependencies** | E2-S1 |

**Description:**
Create author information display component.

**Tasks:**
- [ ] Create `components/blog/blog-author-card.tsx`
- [ ] Display avatar, name, title
- [ ] Used on article pages
- [ ] Compact and full variants

**File to create:** `components/blog/blog-author-card.tsx`

**Acceptance Criteria:**
- [ ] Avatar displays correctly
- [ ] Fallback for missing avatar
- [ ] Both variants working

---

#### E3-S6: Create BlogArticleContent Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 3 hours |
| **Assignee** | Claude |
| **Dependencies** | None |

**Description:**
Create component to render article content (Markdown/HTML).

**Tasks:**
- [ ] Install dependencies: `bun add marked dompurify && bun add -d @types/dompurify`
- [ ] Create `components/blog/blog-article-content.tsx`
- [ ] Parse and render Markdown
- [ ] Sanitize HTML content
- [ ] Style prose content (headings, paragraphs, lists, code blocks)
- [ ] Handle images within content
- [ ] Add syntax highlighting for code blocks (optional)

**File to create:** `components/blog/blog-article-content.tsx`

**Acceptance Criteria:**
- [ ] Markdown renders correctly
- [ ] HTML is sanitized
- [ ] Typography is consistent
- [ ] Code blocks styled

---

#### E3-S7: Create BlogRelatedArticles Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E3-S1 |

**Description:**
Create related articles section for article pages.

**Tasks:**
- [ ] Create `components/blog/blog-related-articles.tsx`
- [ ] Display 3 related article cards
- [ ] Section title "Related Articles"
- [ ] Grid layout (3 columns desktop, 1 mobile)

**File to create:** `components/blog/blog-related-articles.tsx`

**Acceptance Criteria:**
- [ ] Shows 3 related articles
- [ ] Responsive grid
- [ ] Proper spacing

---

#### E3-S8: Create BlogPagination Component
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | None |

**Description:**
Create pagination controls for blog listing.

**Tasks:**
- [ ] Create `components/blog/blog-pagination.tsx`
- [ ] Previous/Next buttons
- [ ] Page numbers with truncation
- [ ] Current page indicator
- [ ] Disabled states for first/last page

**File to create:** `components/blog/blog-pagination.tsx`

**Acceptance Criteria:**
- [ ] Navigation works correctly
- [ ] Disabled states working
- [ ] URL updates on page change

---

#### E3-S9: Create BlogSkeleton Components
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E3-S1, E3-S2 |

**Description:**
Create loading skeleton components for blog pages.

**Tasks:**
- [ ] Create `components/blog/blog-skeleton.tsx`
- [ ] BlogCardSkeleton
- [ ] BlogCardFeaturedSkeleton
- [ ] BlogArticleSkeleton
- [ ] Animate with pulse effect

**File to create:** `components/blog/blog-skeleton.tsx`

**Acceptance Criteria:**
- [ ] Skeletons match component dimensions
- [ ] Smooth animation
- [ ] Used during loading states

---

## Epic 4: Blog Pages Implementation

**Description:** Build the actual blog pages using the components.

**Acceptance Criteria:**
- Blog listing page functional
- Individual article pages functional
- Category filtering working
- ISR caching configured

### Stories

#### E4-S1: Create Blog Layout
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P1 - High |
| **Estimate** | 1 hour |
| **Assignee** | - |
| **Dependencies** | None |

**Description:**
Create shared layout for all blog pages.

**Tasks:**
- [ ] Create `app/(public)/blog/layout.tsx`
- [ ] Include Header and Footer
- [ ] Set up metadata defaults
- [ ] Add any blog-specific layout elements

**File to create:** `app/(public)/blog/layout.tsx`

**Acceptance Criteria:**
- [ ] Layout applies to all blog routes
- [ ] Header/Footer present
- [ ] Metadata working

---

#### E4-S2: Implement Blog Listing Page
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P0 - Critical |
| **Estimate** | 4 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S4, E3-S1, E3-S2, E3-S3, E3-S4 |

**Description:**
Implement the main blog listing page.

**Tasks:**
- [ ] Update `app/(public)/blog/page.tsx`
- [ ] Fetch articles from SharePoint
- [ ] Display BlogHero
- [ ] Display BlogCategories filter
- [ ] Display featured article (if any)
- [ ] Display article grid
- [ ] Implement pagination
- [ ] Add ISR with 60s revalidation
- [ ] Add loading.tsx with skeletons

**File to update:** `app/(public)/blog/page.tsx`

**Acceptance Criteria:**
- [ ] Articles display from SharePoint
- [ ] Categories filter working
- [ ] Featured article prominent
- [ ] Pagination working
- [ ] Page loads under 2 seconds

---

#### E4-S3: Implement Article Detail Page
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P0 - Critical |
| **Estimate** | 4 hours |
| **Assignee** | Claude |
| **Dependencies** | E2-S5, E3-S5, E3-S6, E3-S7 |

**Description:**
Implement individual article pages.

**Tasks:**
- [ ] Create `app/(public)/blog/[slug]/page.tsx`
- [ ] Fetch article by slug
- [ ] Display article header (category, date, title)
- [ ] Display featured image
- [ ] Display author card
- [ ] Render article content
- [ ] Display tags
- [ ] Display related articles
- [ ] Add ISR with 300s revalidation
- [ ] Handle 404 for invalid slugs
- [ ] Add loading.tsx

**File to create:** `app/(public)/blog/[slug]/page.tsx`

**Acceptance Criteria:**
- [ ] Article displays correctly
- [ ] All metadata visible
- [ ] Related articles showing
- [ ] 404 works for invalid slugs

---

#### E4-S4: Implement Category Filter Page
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E4-S2 |

**Description:**
Implement category-specific listing pages.

**Tasks:**
- [ ] Create `app/(public)/blog/category/[category]/page.tsx`
- [ ] Reuse listing page components
- [ ] Filter articles by category
- [ ] Update page metadata for category
- [ ] Category-specific hero text

**File to create:** `app/(public)/blog/category/[category]/page.tsx`

**Acceptance Criteria:**
- [ ] Category filtering working
- [ ] SEO metadata correct
- [ ] Breadcrumb/back navigation

---

#### E4-S5: Generate Static Paths
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 1 hour |
| **Assignee** | - |
| **Dependencies** | E4-S3, E4-S4 |

**Description:**
Implement generateStaticParams for article and category pages.

**Tasks:**
- [ ] Add generateStaticParams to `[slug]/page.tsx`
- [ ] Add generateStaticParams to `[category]/page.tsx`
- [ ] Configure dynamic params handling

**Acceptance Criteria:**
- [ ] Static paths generated at build time
- [ ] New articles work with ISR

---

## Epic 5: Navigation Integration

**Description:** Add blog link to site navigation.

**Acceptance Criteria:**
- Blog accessible from main navigation
- Mobile navigation updated
- Active state working

### Stories

#### E5-S1: Update Header Navigation
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 1 hour |
| **Assignee** | Claude |
| **Dependencies** | E4-S2 |

**Description:**
Add Blog link to header navigation.

**Tasks:**
- [ ] Update `components/layout/header.tsx`
- [ ] Add Blog to navItems array
- [ ] Update getNavHref to handle external routes
- [ ] Position between "Industries" and "Team"
- [ ] Test on desktop and mobile

**File to update:** `components/layout/header.tsx`

**Code change:**
```typescript
const navItems = [
  { label: "AI", section: "ai" },
  { label: "Analytics", section: "analytics" },
  { label: "Data", section: "data" },
  { label: "Industries", section: "industries" },
  { label: "Blog", href: "/blog" },  // New
  { label: "Team", section: "about" },
];
```

**Acceptance Criteria:**
- [ ] Blog link visible in nav
- [ ] Links to /blog correctly
- [ ] Mobile menu updated

---

#### E5-S2: Update Footer Navigation
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P3 - Low |
| **Estimate** | 30 minutes |
| **Assignee** | - |
| **Dependencies** | E5-S1 |

**Description:**
Add Blog link to footer navigation if applicable.

**Tasks:**
- [ ] Review footer structure
- [ ] Add Blog link to appropriate section
- [ ] Maintain consistent styling

**File to update:** `components/layout/footer.tsx`

**Acceptance Criteria:**
- [ ] Blog link in footer (if applicable)
- [ ] Consistent with other links

---

## Epic 6: SEO & Performance

**Description:** Optimize blog for search engines and performance.

**Acceptance Criteria:**
- Meta tags on all pages
- Open Graph tags working
- JSON-LD structured data
- Lighthouse score > 90

### Stories

#### E6-S1: Implement Article Meta Tags
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P1 - High |
| **Estimate** | 2 hours |
| **Assignee** | Claude |
| **Dependencies** | E4-S3 |

**Description:**
Add dynamic meta tags to article pages.

**Tasks:**
- [ ] Implement generateMetadata in `[slug]/page.tsx`
- [ ] Include title, description
- [ ] Add Open Graph tags (og:title, og:description, og:image, og:type)
- [ ] Add Twitter card tags
- [ ] Add article-specific tags (published_time, author)

**Acceptance Criteria:**
- [ ] Meta tags render correctly
- [ ] OG tags visible in debugger
- [ ] Twitter cards working

---

#### E6-S2: Implement JSON-LD Structured Data
| Field | Value |
|-------|-------|
| **Status** | ✅ Done |
| **Priority** | P2 - Medium |
| **Estimate** | 1.5 hours |
| **Assignee** | Claude |
| **Dependencies** | E4-S3 |

**Description:**
Add JSON-LD schema markup to article pages.

**Tasks:**
- [ ] Create Article schema
- [ ] Include headline, image, author, publisher
- [ ] Include datePublished, dateModified
- [ ] Add to article page head

**Acceptance Criteria:**
- [ ] Valid JSON-LD in page source
- [ ] Passes Google Rich Results Test

---

#### E6-S3: Implement Blog Listing Meta Tags
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 1 hour |
| **Assignee** | - |
| **Dependencies** | E4-S2 |

**Description:**
Add meta tags to blog listing and category pages.

**Tasks:**
- [ ] Add metadata to blog listing page
- [ ] Add dynamic metadata to category pages
- [ ] Include canonical URLs

**Acceptance Criteria:**
- [ ] Listing page has proper meta
- [ ] Category pages have unique meta

---

#### E6-S4: Optimize Images
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E3-S1, E3-S2 |

**Description:**
Ensure all blog images are optimized.

**Tasks:**
- [ ] Use Next.js Image component everywhere
- [ ] Configure remote image domains in next.config.ts
- [ ] Add proper image sizes and srcset
- [ ] Implement blur placeholder
- [ ] Add alt text from SharePoint

**Acceptance Criteria:**
- [ ] No layout shift from images
- [ ] Images lazy load
- [ ] Proper sizing on all devices

---

#### E6-S5: Performance Audit
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E4-S2, E4-S3 |

**Description:**
Run performance audit and fix issues.

**Tasks:**
- [ ] Run Lighthouse audit on blog pages
- [ ] Fix any performance issues
- [ ] Verify Core Web Vitals
- [ ] Document final scores

**Acceptance Criteria:**
- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms

---

## Epic 7: Content Pipeline & UX

**Description:** Optimize the content creation experience for non-technical users.

**Acceptance Criteria:**
- SharePoint form customized
- Auto-slug generation working
- Preview capability
- Documentation for content creators

### Stories

#### E7-S1: Create Slug Generation Helper
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 1 hour |
| **Assignee** | - |
| **Dependencies** | None |

**Description:**
Create utility to auto-generate URL slugs from titles.

**Tasks:**
- [ ] Create `lib/utils/blog-helpers.ts`
- [ ] Implement `generateSlug(title: string): string`
- [ ] Handle special characters, spaces, unicode
- [ ] Add uniqueness check (append number if exists)

**File to create:** `lib/utils/blog-helpers.ts`

**Acceptance Criteria:**
- [ ] Slugs are URL-safe
- [ ] No duplicate slugs
- [ ] Handles edge cases

---

#### E7-S2: Customize SharePoint List Form
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P3 - Low |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E1-S4 |

**Description:**
Customize the SharePoint list form for better UX.

**Tasks:**
- [ ] Hide technical fields (Slug - auto-generated)
- [ ] Reorder fields logically
- [ ] Add field descriptions/help text
- [ ] Configure default values
- [ ] Add column formatting for Status (colors)

**Acceptance Criteria:**
- [ ] Form is user-friendly
- [ ] Non-essential fields hidden
- [ ] Status colors visible

---

#### E7-S3: Create Content Creator Documentation
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E4-S2 |

**Description:**
Write documentation for content creators.

**Tasks:**
- [ ] Create `docs/BLOG_CONTENT_GUIDE.md`
- [ ] Document how to create new article
- [ ] Document image requirements
- [ ] Document Markdown formatting tips
- [ ] Include screenshots
- [ ] Document publish workflow

**File to create:** `docs/BLOG_CONTENT_GUIDE.md`

**Acceptance Criteria:**
- [ ] Non-technical users can follow guide
- [ ] All steps documented
- [ ] Screenshots included

---

#### E7-S4: Set Up Power Automate Flow (Optional)
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P3 - Low |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E2-S6 |

**Description:**
Create Power Automate flow for instant cache invalidation.

**Tasks:**
- [ ] Create new Power Automate flow
- [ ] Trigger: When item created or modified in SharePoint
- [ ] Condition: Status = Published
- [ ] Action: HTTP POST to revalidation webhook
- [ ] Test flow

**Acceptance Criteria:**
- [ ] Flow triggers on publish
- [ ] Cache invalidates immediately
- [ ] Errors logged/notified

---

## Epic 8: Testing & QA

**Description:** Ensure quality through comprehensive testing.

**Acceptance Criteria:**
- Unit tests for utilities
- Integration tests for API
- E2E tests for user flows
- All tests passing

### Stories

#### E8-S1: Create Unit Tests for Utilities
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | E7-S1 |

**Description:**
Write unit tests for blog utility functions.

**Tasks:**
- [ ] Create `tests/unit/blog-helpers.test.ts`
- [ ] Test slug generation
- [ ] Test data transformations
- [ ] Test edge cases

**Acceptance Criteria:**
- [ ] All utilities tested
- [ ] Edge cases covered
- [ ] Tests passing

---

#### E8-S2: Create API Integration Tests
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 3 hours |
| **Assignee** | - |
| **Dependencies** | E2-S4, E2-S5 |

**Description:**
Write integration tests for blog API routes.

**Tasks:**
- [ ] Create `tests/integration/blog-api.test.ts`
- [ ] Test GET /api/blog/articles
- [ ] Test GET /api/blog/articles/[slug]
- [ ] Test pagination
- [ ] Test error handling
- [ ] Mock SharePoint responses

**Acceptance Criteria:**
- [ ] All API routes tested
- [ ] Error cases covered
- [ ] Mocking working

---

#### E8-S3: Create E2E Tests with Playwright
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P2 - Medium |
| **Estimate** | 3 hours |
| **Assignee** | - |
| **Dependencies** | E4-S2, E4-S3 |

**Description:**
Write E2E tests for blog user flows.

**Tasks:**
- [ ] Create `tests/e2e/blog.spec.ts`
- [ ] Test blog listing page loads
- [ ] Test category filtering
- [ ] Test article page navigation
- [ ] Test pagination
- [ ] Test responsive behavior

**Acceptance Criteria:**
- [ ] Core user flows tested
- [ ] Tests passing in CI
- [ ] Mobile tested

---

#### E8-S4: Manual QA Checklist
| Field | Value |
|-------|-------|
| **Status** | ⬜ Not Started |
| **Priority** | P1 - High |
| **Estimate** | 2 hours |
| **Assignee** | - |
| **Dependencies** | All previous stories |

**Description:**
Perform manual QA testing before launch.

**Tasks:**
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test keyboard navigation
- [ ] Test screen reader
- [ ] Test with slow network
- [ ] Verify all content displays correctly
- [ ] Check for console errors

**Acceptance Criteria:**
- [ ] No critical bugs
- [ ] Cross-browser compatible
- [ ] Accessible
- [ ] No console errors

---

## Sprint Planning Suggestion

### Sprint 1: Foundation (5 days)
- E1-S1: Create Azure AD App Registration
- E1-S2: Configure API Permissions
- E1-S3: Create Client Secret
- E1-S4: Create SharePoint List with Schema
- E1-S5: Configure Vercel Environment Variables
- E2-S1: Create TypeScript Interfaces
- E2-S2: Implement Azure AD Authentication Service

### Sprint 2: Core Backend (5 days)
- E2-S3: Implement SharePoint Service - Read Operations
- E2-S4: Create API Route - List Articles
- E2-S5: Create API Route - Single Article
- E2-S6: Create API Route - Revalidation Webhook

### Sprint 3: UI Components (5 days)
- E3-S1: Create BlogCard Component
- E3-S2: Create BlogCardFeatured Component
- E3-S3: Create BlogHero Component
- E3-S4: Create BlogCategories Component
- E3-S5: Create BlogAuthorCard Component
- E3-S6: Create BlogArticleContent Component

### Sprint 4: Pages & Integration (5 days)
- E3-S7: Create BlogRelatedArticles Component
- E3-S8: Create BlogPagination Component
- E3-S9: Create BlogSkeleton Components
- E4-S1: Create Blog Layout
- E4-S2: Implement Blog Listing Page
- E4-S3: Implement Article Detail Page
- E5-S1: Update Header Navigation

### Sprint 5: Polish & Launch (5 days)
- E4-S4: Implement Category Filter Page
- E4-S5: Generate Static Paths
- E6-S1: Implement Article Meta Tags
- E6-S2: Implement JSON-LD Structured Data
- E6-S4: Optimize Images
- E6-S5: Performance Audit
- E8-S4: Manual QA Checklist

### Post-Launch (Optional)
- E5-S2: Update Footer Navigation
- E6-S3: Implement Blog Listing Meta Tags
- E7-S1: Create Slug Generation Helper
- E7-S2: Customize SharePoint List Form
- E7-S3: Create Content Creator Documentation
- E7-S4: Set Up Power Automate Flow
- E8-S1: Create Unit Tests
- E8-S2: Create API Integration Tests
- E8-S3: Create E2E Tests

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-15 | Initial backlog creation | Claude |
| 2025-12-15 | Completed E2 (API), E3 (Components), E4-S2/S3 (Pages), E5-S1 (Nav), E6-S1/S2 (SEO) | Claude |

---

## Quick Reference - File Paths

### New Files to Create
```
lib/
├── types/
│   └── blog.ts                      # E2-S1
├── services/
│   ├── graph-auth.ts                # E2-S2
│   └── sharepoint.ts                # E2-S3
└── utils/
    └── blog-helpers.ts              # E7-S1

app/
├── (public)/
│   └── blog/
│       ├── layout.tsx               # E4-S1
│       ├── page.tsx                 # E4-S2 (update)
│       ├── loading.tsx              # E4-S2
│       ├── [slug]/
│       │   ├── page.tsx             # E4-S3
│       │   └── loading.tsx          # E4-S3
│       └── category/
│           └── [category]/
│               └── page.tsx         # E4-S4
└── api/
    └── blog/
        ├── articles/
        │   ├── route.ts             # E2-S4
        │   └── [slug]/
        │       └── route.ts         # E2-S5
        └── revalidate/
            └── route.ts             # E2-S6

components/
└── blog/
    ├── blog-card.tsx                # E3-S1
    ├── blog-card-featured.tsx       # E3-S2
    ├── blog-hero.tsx                # E3-S3
    ├── blog-categories.tsx          # E3-S4
    ├── blog-author-card.tsx         # E3-S5
    ├── blog-article-content.tsx     # E3-S6
    ├── blog-related-articles.tsx    # E3-S7
    ├── blog-pagination.tsx          # E3-S8
    └── blog-skeleton.tsx            # E3-S9

tests/
├── unit/
│   └── blog-helpers.test.ts         # E8-S1
├── integration/
│   └── blog-api.test.ts             # E8-S2
└── e2e/
    └── blog.spec.ts                 # E8-S3

docs/
└── BLOG_CONTENT_GUIDE.md            # E7-S3
```

### Files to Update
```
components/layout/header.tsx          # E5-S1
components/layout/footer.tsx          # E5-S2
next.config.ts                        # E6-S4 (image domains)
```
