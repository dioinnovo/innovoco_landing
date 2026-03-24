# Innovoco Design System

Comprehensive reference for the visual system, component architecture, image generation, and industry theming. This is the canonical document for any coding agent working on the site.

---

## 1. Architecture Overview

All 7 industry pages use a single shared template: `components/industries/IndustryPage.tsx`. Each page client defines **tokens** (colors), **capabilities** (solutions with `useCaseSlug` links), and **compliance items**, then passes them to `<IndustryPage>`.

**Page section order (8 sections):**

| # | Section | Component / Location |
|---|---------|---------------------|
| 1 | **Hero** | Dark full-bleed with `next/image`, badge, headline, CTAs, trust metrics |
| 2 | **Our Solutions** | `IndustrySolutionsSection` — alternating rows with stats + "Learn more" `<Link>` to use case pages |
| 3 | **Compliance strip** | Muted bg, 6-up icon badge grid |
| 4 | **Differentiators** | "Why Innovoco" 2-column cards with icon, metric, description |
| 5 | **FAQs** | shadcn `Accordion` with `SchemaMarkup` FAQPage structured data |
| 6 | **Prioritization CTA** | Full-bleed background image, dark overlay, headline + two glass cards + white CTA button |
| 7 | **Related Industries** | Carousel of industry cards with images |
| 8 | **Footer** | Shared site footer |

**Key files:**

| File | Purpose |
|------|---------|
| `components/industries/IndustryPage.tsx` | Shared template (all 7 industries) |
| `components/industries/IndustrySolutionsSection.tsx` | Solutions section with `useCaseSlug` → `<Link>` |
| `lib/content/industries/types.ts` | `IndustryConfig` type |
| `lib/content/industries/{industry}.ts` | Per-industry content (hero, FAQs, differentiators, CTA) |
| `app/(public)/solutions/industries/{industry}/{Industry}PageClient.tsx` | Page client (tokens + capabilities + compliance) |

---

## 2. Global Theme System

**CSS custom properties** (`app/globals.css`):

| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--background` | `#ffffff` | `#020617` | Page bg |
| `--foreground` | `#0f172a` | `#f1f5f9` | Primary text |
| `--card` | `#ffffff` | `#0f172a` | Card surfaces |
| `--muted` | `#f8fafc` | `#1e293b` | Subtle backgrounds |
| `--border` | `#e2e8f0` | `#334155` | Borders |
| `--primary` | `#0284c7` | `#0ea5e9` | Primary accent |

**Secondary text:** `#64748B` (slate-500) for body copy, `#94A3B8` (slate-400) for subtext on dark backgrounds.

**Utility classes** (globals.css): `.gradient-text`, `.glass`, `.glow`, `.hover-lift`, `.skip-to-content`

---

## 3. Industry Color Tokens

Each industry defines a `tokens` object with these roles:

| Role | Construction | Manufacturing | Energy | Insurance | Retail | Healthcare | Financial Services |
|------|-------------|---------------|--------|-----------|--------|------------|-------------------|
| **heroBg** | `#1c1917` (stone) | `#0f172a` (slate) | `#0c4a6e` (sky) | `#1e1b4b` (indigo) | `#0f172a` (slate) | `#1a1a2e` (dark) | `#0c2340` (navy) |
| **accent** | `#ca8a04` (amber) | `#d97706` (amber) | `#38bdf8` (sky) | `#a78bfa` (violet) | `#6366f1` (indigo) | `#059669` (emerald) | `#0284c7` (sky) |
| **cta** | `#eab308` (yellow) | `#f59e0b` (amber) | `#0284c7` (sky) | `#7c3aed` (violet) | `#6366f1` (indigo) | `#10B981` (emerald) | `#0ea5e9` (sky) |
| **ctaText** | `#1c1917` (dark) | `#0f172a` (dark) | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| **Family** | Warm earth | Warm amber | Cool sky | Cool violet | Cool indigo | Cool green | Cool blue |

**Pattern:** Hero bg is always dark. CTA contrasts against hero. Accent colors tint eyebrows, icons, tags, and links throughout the page.

---

## 4. Typography

- **Headlines:** System sans-serif (Tailwind default), `font-bold`, `text-balance`
- **Hero H1:** `text-4xl md:text-5xl lg:text-6xl`, accent color only on the industry keyword span
- **Section H2:** `text-3xl md:text-4xl`, `text-[var(--foreground)]`
- **Eyebrows:** `text-sm font-semibold uppercase tracking-widest`, industry accent color
- **Body:** `text-base md:text-lg`, `#64748B` (muted)
- **Stats values:** `text-lg md:text-xl font-bold tabular-nums`

---

## 5. Motion System

All animation uses `framer-motion`:

```ts
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
```

- **Hero:** Parent `motion.div` with `staggerChildren: 0.12`
- **Below-fold sections:** `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- **Aurora gradient:** `animate-hero-aurora` keyframe (7s infinite alternate, translate + scale drift)
- **Accessibility:** `motion-reduce:animate-none` on all animated elements

---

## 6. Image Generation System

All images use **Gemini 3.1 Flash Image Preview** via generation scripts in `scripts/`. Output: JPEG 86-88% quality (mozjpeg via sharp).

### 6.1 Art Style Anchor

**File:** `scripts/ai-art-style-anchor.mjs` — shared across ALL generative scripts.

**Philosophy:** "Tech romanticism and romantic realism" — warm, aspirational, engaging digital illustration.

**Core directives:**
- Rolling forms, soft valley fog, golden or rose dawn/dusk light on clouds
- Innovoco cobalt & crimson as natural LIGHT (cool sky vs warm horizon glow)
- CRISP, highly resolved detail (avoid mushy AI softness)
- Painterly finish with visible brushstroke and texture in foregrounds
- NO cyberpunk noir, NO dark dystopian, NO oppressive black voids
- NO literal rockets, logos, readable text, UI screenshots, watermarks
- NO people/faces unless explicitly specified

### 6.2 Image Categories

| Category | Script | Aspect | Output Path | Art Direction |
|----------|--------|--------|-------------|---------------|
| **Industry hero** | `generate-industry-hero-images.mjs` | 16:9 | `/images/industries/{id}-hero.jpg` | Photorealistic editorial photography; trade-journal credible |
| **Solution cards** | `generate-industry-solution-images.mjs` | 4:3 | `/images/industries/{id}/solutions/{name}.jpg` | Documentary photography; real equipment, real rooms |
| **Industry related cards** | `generate-industry-related-card-images.mjs` | 4:3 | `/images/industries/related-cards/{slug}.jpg` | CINEMATIC_STYLE_ANCHOR; bold industry-specific silhouettes; 8 contrast recipes |
| **Outcome cards** | `generate-business-outcome-card-images.mjs` | 4:3 | `/images/case-studies/outcomes/{id}.jpg` | CINEMATIC_STYLE_ANCHOR; 12 contrast recipes for grid variety |
| **Challenge art** | `generate-use-case-challenge-images.mjs` | 1:1 | `/images/case-studies/use-cases/challenge/{slug}.jpg` | CINEMATIC_STYLE_ANCHOR; tension as weather/fog (NOT horror) |
| **Phase tiles** | `generate-use-case-story-images.mjs` | 1:1 | `/images/case-studies/use-cases/phases/{slug}-p1.jpg` | CINEMATIC_STYLE_ANCHOR; hopeful progress |
| **Story: implementations** | `generate-use-case-story-images.mjs` | 1:1 | `/images/case-studies/use-cases/story/{slug}-implementations.jpg` | Braided trust/traceability themes |
| **Story: technical** | `generate-use-case-story-images.mjs` | 4:3 | `/images/case-studies/use-cases/story/{slug}-technical.jpg` | Reasoning terraces, orchestration bridges |
| **Story: impact** | `generate-use-case-story-images.mjs` | 4:3 | `/images/case-studies/use-cases/story/{slug}-impact.jpg` | Ascending calm gradients, balanced metrics |
| **Case studies hero frame** | `generate-case-studies-hero-framed-art.mjs` | 1:1 | `/images/case-studies/hero-framed-production-ai.jpg` | Ideas → operational delivery |
| **CTA background (shared)** | `generate-cta-prioritization-bg.mjs` | 21:9 | `/images/case-studies/cta-prioritization-bg.jpg` | Makoto Shinkai romantic realism; clarity from complexity |
| **CTA background (per-industry)** | `generate-industry-cta-bg.mjs` | 21:9 | `/images/industries/{id}/cta-prioritization-bg.jpg` | Shinkai + industry metaphors (gears, helix, towers, etc.) |

### 6.3 Contrast Recipes (Visual Variety)

Used by outcome cards and industry related cards to ensure no two adjacent cards look the same:

1. **COOL-DOMINANT** — 70% cobalt/sapphire, crimson as edge accent
2. **WARM-DOMINANT** — Rose/coral forward, blue in shadows
3. **SPLIT FIELD** — Cool vs warm halves, soft blend at seam
4. **MINIMAL AIR** — Generous negative space, one bold form
5. **DENSE LAYERS** — Overlapping translucent planes, panoramic fullness
6. **DIAGONAL THRUST** — Strong motion along diagonal, asymmetric energy
7. **CORNER SPARK** — Concentrated crimson cluster, soft blue depth
8. **HORIZON BAND** — Luminous band across middle third
9. **SIDEWARD FAN** — Energy radiates from one edge inward
10. **FROSTED LIGHT** — Matte glass panels over warm gradient
11. **ORGANIC FLOW** — Curves and liquid ribbons, no straight lines
12. **STRUCTURED GRID** — Subtle beams/steps with ambient warmth

### 6.4 Use Case Visual Set Mapping

**File:** `lib/content/use-case-visuals.ts`

Each use case page resolves its images via path conventions:
- `caseChallengeImagePath(slug)` → `/images/case-studies/use-cases/challenge/{slug}.jpg`
- `casePhaseImagePath(slug, phaseIndex)` → `/images/case-studies/use-cases/phases/{slug}-p{n}.jpg`
- `caseStoryImplementationsImagePath(slug)` → `…/story/{slug}-implementations.jpg`
- `caseStoryTechnicalImagePath(slug)` → `…/story/{slug}-technical.jpg`
- `caseStoryImpactImagePath(slug)` → `…/story/{slug}-impact.jpg`

### 6.5 Image Caching & Versioning

- `lib/industry-solution-image-cache.ts` — `INDUSTRY_SOLUTION_IMAGES_REVISION` token; increment to bust CDN cache
- `lib/industry-hero-urls.ts` — Versioned hero filenames (e.g., `-v2`)
- `lib/industry-related-card-image.ts` — Derives card path from industry href slug
- Cache busting: query-string `?v=N` via `withIndustrySolutionImageCacheBust(src)`

---

## 7. Background Gradient System

**File:** `components/ui/background-gradient-glow.tsx`

| Variant | Palette | Usage |
|---------|---------|-------|
| `aurora` (default) | Lavender/pink/cyan aurora | Landing page hero |
| `aurora-brand` | Sky → rose (on-brand hues) | Landing page hero (brand variant) |
| `brand` | Saturated blue → indigo → crimson + left grid overlay | Case studies pages |

All variants use the `animate-hero-aurora` keyframe (7s infinite alternate, oversized 148% to allow drift).

---

## 8. CTA Strategy & Prioritization Workshop Pattern

### 8.1 Strategic Rationale

CTAs are the highest-leverage conversion surface on the site. Our CTA framework is designed around a specific insight from C-suite conversations:

**The executive pain:** Business leaders face mounting pressure to deliver AI results to their board, but the sheer volume of potential AI initiatives makes prioritization paralyzing. They don't need more vendor pitches — they need someone to help them figure out *which* initiatives will actually move the P&L, not just save time.

**Our positioning:** We don't lead with "buy our services." We lead with "let us help you prioritize." The workshop is the entry point — it's low-commitment (60 min, free, no obligation) but high-value (they walk out with a ranked roadmap). Two outcomes result from the workshop:

1. **Strategic Roadmap** — Long-term, high-impact initiatives that every company must have in their AI portfolio. These become the enterprise engagements.
2. **Quick Wins** — Deploy in 90 days, show measurable ROI this quarter. These are the proof points that build internal momentum and board confidence.

**The emotional logic of the CTA section:**
- **Headline** = their pain (industry-specific AI initiatives piling up)
- **Gradient accent line** = the sharpened question (which one moves YOUR metric?)
- **Subline** = the relief (one workshop, every initiative ranked)
- **Two glass cards** = proof there's a structured plan (strategic + quick wins)
- **Button** = easy next step (schedule, not "buy")
- **Qualifier** = removes friction (60 min, free, no obligation)

Nothing to analyze, just recognize and click.

### 8.2 Design Principles for CTAs

- **Minimize cognitive load.** A CTA should be scannable in 3 seconds. No paragraphs, no bullet lists, no feature comparisons. Headline → subline → proof → button.
- **Speak to the decision-maker, not the practitioner.** Use P&L language (margin, revenue, loss ratio, OEE), not technical jargon (RAG, embeddings, fine-tuning).
- **Industry-specific pain.** Each industry page contextualizes the headline to that vertical's core metric. "Which One Moves Your OEE?" (manufacturing) vs "Which One Lifts Your Revenue?" (retail) vs "Which One Protects Your Book?" (financial services).
- **Visual weight through atmosphere, not UI density.** The background image carries the emotional impact. The text is sparse and white. The glass cards float. The button is the only solid element.
- **One CTA per page, at the bottom.** We removed the old pattern of 13-15 CTAs scattered throughout the page. The prioritization workshop is the single conversion target, placed after the user has seen our capabilities and built confidence.

### 8.3 Per-Industry CTA Copy

Each industry's `prioritization` config in `lib/content/industries/{industry}.ts` defines:

| Field | Purpose | Example (Manufacturing) |
|-------|---------|------------------------|
| `headline` | Names the 3 key AI initiatives for this industry | "Predictive Maintenance, Quality Vision, Supply Chain AI —" |
| `headlineAccent` | The sharpened P&L question (gradient text) | "Which One Moves Your OEE First?" |
| `subline` | The relief — what we do | "One workshop. Every initiative ranked by ROI." |
| `strategic` | Left card description | "Plant-wide AI for defect detection, demand forecasting, and predictive maintenance at scale." |
| `quickWins` | Right card description | "Deploy vision QC or anomaly detection on one line in 90 days. Measurable yield gains this quarter." |
| `bgImage` | Industry-specific atmospheric background | `/images/industries/manufacturing/cta-prioritization-bg.jpg` |

### 8.4 Visual Implementation

| Layer | Implementation |
|-------|---------------|
| **Background image** | Full-bleed `next/image fill` with per-industry Makoto Shinkai-inspired atmospheric art |
| **Dark overlay** | `bg-linear-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50` — light enough to let clouds show through |
| **Brand accent overlay** | `bg-linear-to-r from-[#0A58D0]/15 via-transparent to-[#DC2626]/10` — subtle brand tint |
| **Headline** | White text, `text-3xl sm:text-4xl md:text-5xl font-bold`, with `drop-shadow` for legibility |
| **Gradient accent line** | `bg-linear-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent` |
| **Subline** | `text-white/90` with text shadow |
| **Glass cards** | `border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15` — Target icon (sky) + Zap icon (amber) |
| **CTA button** | White pill: `bg-white hover:bg-neutral-100`, dark text, scale on hover |
| **Qualifier** | `text-white/60 drop-shadow` — "60 min · Free · No obligation" |

### 8.5 Background Image Art Direction

Each industry CTA background uses the Makoto Shinkai-inflected romantic realism style (see `scripts/generate-industry-cta-bg.mjs`):

| Industry | Visual Metaphor |
|----------|----------------|
| Construction | Crane lattice forms at dawn, golden rays through steel |
| Manufacturing | Interlocking gear silhouettes at golden hour, sparks rising |
| Healthcare | Double-helix ribbons with ECG waveforms, luminous orbs |
| Energy | Transmission towers + wind turbines, aurora bands |
| Insurance | Translucent shield dome, calm below vs dramatic sky above |
| Retail | Luminous storefront archways, flowing data ribbons |
| Financial Services | Classical columns with liquidity ribbons at sunrise |

The metaphor for all: **clarity emerging from complexity** — a single beam of light cutting through layered clouds. The industry-specific element grounds it in the vertical; the shared atmospheric language keeps the site cohesive.

---

## 9. Component Patterns

### Solution Row (IndustrySolutionsSection)
- Alternating layout: text left / image right on even rows, reversed on odd
- Icon in rounded square (`bg-[accent]/10`)
- Title (H3) + description + stats `<dl>` grid
- "Learn more" `<Link>` in accent color → use case page
- Optional 4:3 illustration image on the opposite side

### Compliance Badge Grid
- 6 items in responsive grid (`grid-cols-2 md:grid-cols-3 lg:grid-cols-6`)
- Each: `border-[var(--border)] bg-[var(--card)]`, icon in accent, label text

### Differentiator Card
- 2-column grid on desktop
- Each: icon tile `bg-[accent]/10`, optional metric badge, title, description

### FAQ Accordion
- shadcn `Accordion` component
- Trigger hover: accent color
- FAQPage schema markup included

---

## 10. Use Case Page Structure

**Route:** `/case-studies/use-cases/[slug]`

**Content sources:**
- `lib/content/case-studies-page-content.ts` — `BusinessOutcomeUseCase` (slug, title, outcome, industries, tags, icon, image)
- `lib/content/use-case-study-details.ts` — `UseCaseStudyNarrative` (headline, challenge, phases, implementations, technical, impact)
- `lib/content/use-case-testimonials.ts` — Optional testimonial quotes
- `lib/content/use-case-visuals.ts` — Image path resolution

**Page sections:**
1. Hero with outcome card image
2. Intro (contextItalic + challenge)
3. Challenge section (with challenge art)
4. Solution (phases + key implementations with story art)
5. Technical innovation (with technical art)
6. Impact metrics (with impact art)
7. Optional testimonial
8. Related use cases (3 random)

**Icon mapping** (in both `case-studies-page-client.tsx` and `use-case-study-page-client.tsx`):
`chart`, `headset`, `shield`, `truck`, `wrench`, `scale`, `users`, `megaphone`, `file`, `book`, `stethoscope`, `globe`, `camera`, `factory`, `zap`, `activity`, `search`, `git-branch`

---

## 11. Accessibility

- Skip link: `<a href="#main-content" className="skip-to-content">`
- Single `<main id="main-content" role="main">` per page
- `motion-reduce:animate-none` on all framer-motion elements
- All images have descriptive `alt` text (decorative images use `alt="" aria-hidden="true"`)
- FAQ accordion uses shadcn Radix primitives (keyboard accessible)
- Color + shape for status indicators (never color alone)

---

## 12. Adding a New Industry Page

1. Create content config in `lib/content/industries/{industry}.ts` implementing `IndustryConfig`
2. Create page client in `app/(public)/solutions/industries/{industry}/{Industry}PageClient.tsx`:
   - Define `tokens` (pick a color family — see token table above)
   - Define `capabilities` array with `useCaseSlug` for each
   - Define `complianceItems` array
   - Render `<IndustryPage config={...} tokens={...} ... />`
3. Create server page at `app/(public)/solutions/industries/{industry}/page.tsx`
4. Generate hero image: add to `generate-industry-hero-images.mjs`
5. Generate solution images: add to `generate-industry-solution-images.mjs`
6. Generate CTA background: add to `generate-industry-cta-bg.mjs`
7. Ensure all `useCaseSlug` values have corresponding entries in `case-studies-page-content.ts` and `use-case-study-details.ts`
