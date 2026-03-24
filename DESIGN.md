# Industry landing pages — design system & template

This document describes the **shared “Bloomberg-inspired” template** used for **Financial Services** and **Healthcare** industry solutions pages. It is the canonical reference for layout, section order, tokens, components, and motion. Use it when building or refactoring **Manufacturing** (or any new industry) so the experience stays visually and structurally consistent.

**Reference implementations (source of truth):**

- `app/(public)/solutions/industries/financial-services/FinancialServicesPageClient.tsx`
- `app/(public)/solutions/industries/healthcare/HealthcarePageClient.tsx`

**Related page (audit below):**

- `app/(public)/solutions/industries/manufacturing/ManufacturingPageClient.tsx`

---

## 1. Goals of the template

- **Editorial, premium feel**: Dark photographic hero, strong typographic hierarchy, restrained motion.
- **Predictable scan path**: Same section order on every industry so users and SEO patterns repeat.
- **Design tokens per vertical**: Each industry gets a **hero shell color**, a **primary CTA color**, and a **section accent** (used for labels, icons, tags, links). Body content uses **shared neutrals** (`--foreground`, `--border`, `--card`, `--muted`, `#64748B` for secondary text).
- **Accessible patterns**: Skip link, single `<main id="main-content">`, `Button` + `Accordion` from the design system, contact flows via `ContactModal`.

---

## 2. Global page shell (all industry pages)

Every page should follow this outer structure:

1. **JSON-LD**: `SchemaMarkup` with `createServiceSchema` + `createBreadcrumbSchema`.
2. **Wrapper**: `<div className="min-h-screen bg-[var(--background)]">`.
3. **Skip link**: `<a href="#main-content" className="skip-to-content">` (global styles in `app/globals.css`).
4. **Site chrome**: `<Header onContactClick={openContact} />` and `<Footer />` outside `<main>` (or immediately wrapping content per existing files).
5. **Main landmark**: `<main id="main-content" role="main">` containing all primary sections.
6. **Contact**: `<ContactModal open={...} onOpenChange={...} />` at the end; CTAs call `openContact()`.

**State:** `const [contactModalOpen, setContactModalOpen] = useState(false)` and `const openContact = () => setContactModalOpen(true)`.

**Public layout note:** `app/(public)/layout.tsx` uses a **div** (not `<main>`) so this page can own the single `<main>` without invalid nesting.

---

## 3. Canonical section order (do not reorder without updating all industries)

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Hero** | Full-bleed dark hero with `next/image`, badge, headline + accent span, subhead, primary + secondary CTAs, trust metrics row |
| 2 | **Capabilities** | `id="capabilities"`; alternating rows: copy + icon title + “Learn more” + **stats card** |
| 3 | **Compliance strip** | Muted background; small caps heading; **grid of compliance badges** (icons + labels) |
| 4 | **Case studies** | Grid of cards: tag pill, title, Challenge / Solution, **3-column results bar** |
| 5 | **Mid-page CTA** | Solid **hero background color**; headline; supporting line; primary `Button` |
| 6 | **Differentiators** | “Why Innovoco” style; 2×2 grid of cards (icon, metric line, title, body) |
| 7 | **FAQs** | `SchemaMarkup` FAQPage + **`Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent`** from `@/components/ui/accordion` |
| 8 | **Action CTAs** | Three **light** cards (`bg-[var(--card)]`, `border-[var(--border)]`) with tag, icon, copy, text CTA row |
| 9 | **Related industries** | Three **`Link`** cards to other industry routes (same card language as action CTAs) |
| 10 | **Final CTA** | Again **hero background color**; headline; supporting copy; primary `Button` |

Financial and Healthcare both implement **all ten** blocks in this order.

---

## 4. Hero pattern (Financial & Healthcare)

**Layout**

- `section`: `relative overflow-hidden` + **solid hero bg** (`bg-[#0B1426]` finance, `bg-[#082420]` healthcare).
- Background: `next/image` `fill` + `object-cover` + controlled opacity + **gradient overlay** matching the hero bg (not a generic slate gradient).
- Content container: `relative z-10 mx-auto max-w-7xl px-4` with **centered** column `mx-auto max-w-4xl text-center`.
- Motion: parent `motion.div` with `variants={{ visible: { transition: { staggerChildren: 0.12 } } }}` and children using **`fadeUp`** with `custom` indices.

**Badge**

- Pill: `rounded-full border` (industry-tinted border + bg), `uppercase tracking-widest`, **pulsing dot** + single line of trust copy (not a horizontal rule + separate label).

**Typography**

- H1: `text-balance`, **sans** bold (`font-bold`), **accent color only on the industry keyword span** (e.g. “Financial Services”, “Healthcare”).
- Subhead: `text-pretty`, `text-[#94A3B8]` (or same role), `md:text-xl`.

**CTAs**

- **`Button`** from `@/components/ui/button` (size `lg`), primary filled with **industry primary CTA color**, secondary `variant="outline"` with industry border/text tokens.
- Secondary scrolls to `#capabilities` via `document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })`.
- Icons: **`ArrowRight`** on primary CTA (not `ChevronRight` for the main actions).

**Trust metrics**

- Grid under a **top border** `border-t border-[industry-border]` with **simple typographic metrics** (no heavy bordered tiles).

---

## 5. Capabilities pattern

- Section: `bg-[var(--background)] py-20 md:py-28`, `max-w-7xl px-4`.
- Intro: small caps **eyebrow** in **section accent** (`text-[#0284c7]` finance, `text-[#059669]` healthcare), then H2 using `text-[var(--foreground)]`, then muted body `#64748B`.
- Each capability: `flex` row / `lg:flex-row-reverse` on alternating index; **icon in rounded square** `bg-[accent]/10`, title, paragraph, **ghost `Button` “Learn more”** → `openContact`.
- **Right column**: single **stats card** `rounded-2xl border border-[var(--border)] bg-[var(--card)]` with label/value rows — not a decorative gradient placeholder.

---

## 6. Compliance strip

- `border-y border-[var(--border)] bg-[var(--muted)] py-12`.
- Centered title + subtitle.
- **Responsive grid** of small cards: `border-[var(--border)] bg-[var(--card)]`, icon in **accent** color, label text.

---

## 7. Case studies

- Section `bg-[var(--background)]`, same intro rhythm (eyebrow / H2 / description).
- Cards: `rounded-2xl border border-[var(--border)] bg-[var(--card)]`, header block with **accent tag pill**, Challenge/Solution labels in uppercase muted style, **results** in a **muted inner panel** `bg-[var(--muted)]` with **accent-colored metrics**.

---

## 8. Mid-page CTA, differentiators, FAQs

- **Mid CTA**: `bg-[hero-color]`, white headline, `#94A3B8` body, primary `Button` with **same fill as hero primary** (finance `#5BC0EB` on `#0B1426`, healthcare `#34D399` on `#082420`).
- **Differentiators**: `bg-[var(--background)]`, eyebrow + H2, 2-column cards with large icon tile `bg-[accent]/10` and metric line in accent.
- **FAQs**: `bg-[var(--muted)]` + `border-t`; centered H2 + description; **Radix/shadcn `Accordion`** with `rounded-xl border bg-[var(--card)]`, trigger hover to accent.

---

## 9. Action CTAs, related industries, final CTA

- **Action CTAs**: `bg-[var(--background)]`, light cards, `onClick={openContact}`, accent tags and icon tiles, `ArrowRight` on the row CTA.
- **Related industries**: `bg-[var(--muted)]`, **`Link href=...`** (real navigation), same card visual language as action CTAs.
- **Final CTA**: repeat hero dark bg + primary `Button`.

---

## 10. Vertical color roles (token cheat sheet)

| Role | Financial | Healthcare |
|------|-----------|------------|
| Hero / final CTA bg | `#0B1426` | `#082420` |
| Primary CTA fill | `#5BC0EB` (text `#0B1426`) | `#34D399` (text `#082420`) |
| Hero badge border/bg | `#1E3A5F` / `#0F2035` | `#1A4A3E` / `#0D3028` |
| Badge + headline accent | `#5BC0EB` | `#34D399` |
| Section accent (eyebrows, icons, tags) | `#0284c7` | `#059669` |
| Secondary hero outline button border | `#1E3A5F` | `#1A4A3E` |

Manufacturing should pick **one coherent trio** (hero bg + primary CTA + section accent) and use it **the same way** (not mixing amber hero with unrelated slate-only body components).

---

## 11. Motion

- Shared **`fadeUp`**: `hidden: { opacity: 0, y: 24 }` (finance) / `y: 20` (healthcare) — keep consistent if possible.
- Prefer **stagger on a parent** in the hero; **`whileInView`** with `viewport={{ once: true, margin: "-80px" }}` (or similar) for below-fold blocks.
- Avoid one-off animation primitives per section unless necessary.

---

## 12. Content architecture

- Financial & Healthcare keep **page-local `const` arrays** (`capabilities`, `caseStudies`, `faqs`, etc.) for clarity and grep-ability.
- Manufacturing may keep using `manufacturingConfig` from `lib/content/industries/manufacturing` **if** the **rendered structure** still matches the template (same sections, same card anatomy). Today the **structure** diverges more than the data location.

---

# Audit: Manufacturing vs this template

The manufacturing page shares **some** motifs (dark hero, capabilities-ish blocks, case studies, CTAs) but **does not** implement the same framework end-to-end. Below is a systematic gap list.

## Aligned or partially aligned

- **Shell**: Uses `Header`, `Footer`, `ContactModal`, skip link, and `main id="main-content"` (after recent fixes).
- **Rough content types**: Hero, capabilities narrative, “compliance” messaging, case studies, mid CTA, FAQ, action cards, final band.
- **Motion**: Uses `framer-motion` and `fadeUp`-style variants.

## Deviations (should be reconciled)

1. **Hero layout & media**  
   - **Left-aligned** editorial column + `font-serif` headline vs **centered** sans stack on FS/HC.  
   - Background via **`style={{ backgroundImage }}`** instead of **`next/image`** + overlay recipe.  
   - Extra **grid overlay** and **amber bar** badge treatment vs pill + pulse dot.

2. **Hero CTAs**  
   - Raw `<button>` / `<a>` with custom classes vs **`Button`** primary + outline secondary; **ChevronRight** on primary vs **ArrowRight**.

3. **Trust metrics**  
   - **Four bordered tiles** in the hero vs **simple grid under a top border** in the template.

4. **Capabilities section**  
   - Long-form **two-column editorial** + **decorative gradient placeholders** (“Equipment Health Dashboard”) vs **icon + stats card** + “Learn more” ghost button pattern.  
   - Section intro uses **amber chip** (`bg-amber-100`) vs **small caps eyebrow + `var(--foreground)` heading** rhythm.

5. **Compliance strip**  
   - **Three large narrative columns** on a dark gradient vs **muted strip + 6-up badge grid** on `var(--card)`.

6. **Case study cards**  
   - Different visual system (amber borders, flat structure) vs **template card** (header band, `var(--card)`, accent tag, muted results panel).

7. **Mid-page CTA**  
   - Busy **gradient + grid** background vs **flat hero bg color** + single `Button`.

8. **Missing section: Differentiators**  
   - Financial & Healthcare include **“Why Innovoco”** 2×2 differentiator cards. Manufacturing **omits** this block entirely.

9. **FAQs**  
   - **Custom** expand/collapse with `useState`, `AnimatePresence`, and **manual** `button` vs **shadcn `Accordion`** (accessibility + consistent chevron behavior already solved in UI kit).

10. **Missing section: Related industries**  
    - No **`Link`** grid to Healthcare / Financial / Retail (or equivalent).

11. **Action CTA cards**  
    - **Dark glass** cards (`bg-slate-800/60`, white text) vs **light** `var(--card)` / `var(--border)` cards with accent tags.

12. **Final CTA**  
    - Uses `id="contact"` (good for deep links) but **visual language** still diverges (gradient/grid) from **flat hero bg + Button** pattern.

13. **Tokens**  
    - Heavy use of **Tailwind slate + amber** vs **per-vertical hex system** + shared `var(--*)` for surfaces. For parity, manufacturing should define a **hero bg**, **primary CTA**, and **section accent** and apply them like FS/HC—not only amber everywhere.

14. **Analytics**  
    - Only manufacturing wires `useEffect` + `trackServicePageView` / `useScrollDepthTracking` in the client shown; FS/HC pages do not mirror that in the same file (consider a shared wrapper or parity).

---

## Recommended next step for engineering

Refactor **Manufacturing** by **copying the section structure from `FinancialServicesPageClient`**, then:

- Swapping in **manufacturing** hero image path, copy, and **token trio** (hero / CTA / accent).  
- Mapping `manufacturingConfig` fields into the **same JSX shapes** (capabilities rows, case cards, FAQ accordion items).  
- Adding **Differentiators** and **Related industries** data for manufacturing.  
- Deleting one-off patterns (placeholder gradient panels, custom FAQ) in favor of **shared components** where possible.

Until that refactor, treat Financial and Healthcare as the **design framework**, and Manufacturing as a **partial** implementation that needs alignment.

---

## File index

| File | Role |
|------|------|
| `FinancialServicesPageClient.tsx` | Canonical template (finance tokens) |
| `HealthcarePageClient.tsx` | Canonical template (healthcare tokens) |
| `ManufacturingPageClient.tsx` | Industry-specific layout; **audit above** |
| `@/components/ui/button` | Primary / outline CTAs |
| `@/components/ui/accordion` | FAQ pattern |
| `app/globals.css` | `.skip-to-content` |
