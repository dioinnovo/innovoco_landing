"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Users,
  Target,
  Zap,
  Headphones,
  Truck,
  Wrench,
  Scale,
  Megaphone,
  FileText,
  BookOpen,
  Stethoscope,
  Globe2,
  Camera,
  Factory,
  Activity,
  Search,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import ContactModal from "@/components/landing/ContactModal";
import type { CaseStudyIndustryId } from "@/lib/content/case-studies-page-content";
import {
  businessOutcomeUseCases,
  caseStudyIndustries,
} from "@/lib/content/case-studies-page-content";
import { cn } from "@/lib/utils";

const NAV_ALL = "all-solutions";

/** Max use case cards per page (library grid). */
const USE_CASES_PAGE_SIZE = 12;

/** Inner hero frame art — `pnpm run generate:case-studies-hero-frame` */
const CASE_STUDIES_HERO_FRAMED_ART =
  "/images/case-studies/hero-framed-production-ai.jpg";

const outcomeIcons = {
  chart: BarChart3,
  headset: Headphones,
  shield: Shield,
  truck: Truck,
  wrench: Wrench,
  scale: Scale,
  users: Users,
  megaphone: Megaphone,
  file: FileText,
  book: BookOpen,
  stethoscope: Stethoscope,
  globe: Globe2,
  camera: Camera,
  factory: Factory,
  zap: Zap,
  activity: Activity,
  search: Search,
  "git-branch": GitBranch,
} as const;

function formatPageDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CaseStudiesPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState<string>(NAV_ALL);
  /** Industry filter for the use-case card grid (null = show all). */
  const [selectedIndustryId, setSelectedIndustryId] =
    useState<CaseStudyIndustryId | null>(null);
  /** Avoid SSR/client `new Date()` mismatch (timezone, midnight). */
  const [heroUpdatedAt, setHeroUpdatedAt] = useState<string | null>(null);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ind of caseStudyIndustries) {
      counts[ind.id] = businessOutcomeUseCases.filter((u) =>
        u.industries.includes(ind.id)
      ).length;
    }
    return counts;
  }, []);

  const filteredUseCases = useMemo(() => {
    if (selectedIndustryId == null) return businessOutcomeUseCases;
    return businessOutcomeUseCases.filter((u) =>
      u.industries.includes(selectedIndustryId)
    );
  }, [selectedIndustryId]);

  const totalFiltered = filteredUseCases.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / USE_CASES_PAGE_SIZE));
  const rawPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const currentPage = Math.min(rawPage, totalPages);

  /** Slice for the current results page. */
  const paginatedUseCases = useMemo(() => {
    const start = (currentPage - 1) * USE_CASES_PAGE_SIZE;
    return filteredUseCases.slice(start, start + USE_CASES_PAGE_SIZE);
  }, [filteredUseCases, currentPage]);

  const rangeStart = totalFiltered === 0 ? 0 : (currentPage - 1) * USE_CASES_PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * USE_CASES_PAGE_SIZE, totalFiltered);

  /** Clamp invalid `?page=` when the filter changes or total shrinks. */
  useEffect(() => {
    if (rawPage === currentPage) return;
    const next = new URLSearchParams(searchParams.toString());
    if (currentPage <= 1) next.delete("page");
    else next.set("page", String(currentPage));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [rawPage, currentPage, pathname, router, searchParams]);

  const goToPage = useCallback(
    (page: number) => {
      const p = Math.min(Math.max(1, page), totalPages);
      const next = new URLSearchParams(searchParams.toString());
      if (p <= 1) next.delete("page");
      else next.set("page", String(p));
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      document.getElementById("business-outcomes")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [pathname, router, searchParams, totalPages]
  );

  useEffect(() => {
    setHeroUpdatedAt(formatPageDate());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      const outcomesEl = document.getElementById("business-outcomes");
      if (!outcomesEl) return;

      if (outcomesEl.offsetTop <= y) {
        setActiveSubnav(selectedIndustryId ?? NAV_ALL);
        return;
      }
      setActiveSubnav(NAV_ALL);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedIndustryId]);

  function scrollToOutcomes() {
    document.getElementById("business-outcomes")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function selectIndustry(id: CaseStudyIndustryId) {
    setSelectedIndustryId(id);
    router.replace(pathname, { scroll: false });
    scrollToOutcomes();
  }

  function clearIndustryFilter() {
    setSelectedIndustryId(null);
    router.replace(pathname, { scroll: false });
    scrollToOutcomes();
  }

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:text-black overflow-x-hidden">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="print:hidden">
        <Header onContactClick={() => setContactModalOpen(true)} isLandingPage={false} />
      </div>

      <main id="main-content" role="main">
        <section className="relative overflow-hidden border-b border-border/40 print:border-0 print:break-inside-avoid">
          <BackgroundGradientGlow variant="brand" />
          <div
            className="pointer-events-none absolute inset-0 z-1 bg-white/10 dark:bg-gray-950/25 print:hidden"
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 md:py-20 print:px-4 print:py-6">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] print:text-[#00518e] print:drop-shadow-none">
                Use case library
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-full border-white/50 bg-white/95 text-[#0B0F19] shadow-sm hover:border-white hover:bg-white hover:text-[#0B0F19] dark:border-white/35 dark:bg-white/10 dark:text-white dark:backdrop-blur-md dark:hover:border-white dark:hover:bg-white/95 dark:hover:text-[#0B0F19]"
                  onClick={() => setContactModalOpen(true)}
                >
                  Book executive briefing
                </Button>
              </div>
            </div>

            <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] print:grid-cols-1 print:gap-6">
              <div>
                <h1 className="max-w-[20ch] text-3xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-4xl md:text-[2.65rem] print:max-w-none print:text-2xl print:text-[#0B0F19] print:drop-shadow-none">
                  Production AI that ships as outcomes.
                </h1>
                <p
                  className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] sm:text-lg print:text-sm print:text-[#1f2937] print:drop-shadow-none"
                  suppressHydrationWarning
                >
                  Copilots, RAG, regulated workflows, supply chain, and customer operations on Azure, Google Cloud, and orchestration you can audit.
                  {heroUpdatedAt != null ? ` Updated ${heroUpdatedAt}.` : ""}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "Pilot → production playbooks",
                    "Human-in-the-loop by design",
                    "Microsoft Gold · Google Cloud Premier",
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex rounded-full border border-white/25 bg-white/92 px-3 py-1 text-xs font-medium text-[#0B0F19] shadow-sm backdrop-blur-sm dark:border-white/20 dark:bg-[#0f172a]/75 dark:text-neutral-100 dark:shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* aspect-square at ALL breakpoints — lg:aspect-auto was collapsing height (only abs children), hiding the Image fill layer */}
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] print:hidden md:mx-0 md:max-w-none">
                <div
                  className="absolute inset-0 rounded-[2rem] bg-linear-to-br from-sky-400/35 via-indigo-500/30 to-rose-500/40 opacity-95 dark:from-sky-500/25 dark:via-violet-600/22 dark:to-red-600/32"
                  aria-hidden
                />
                <div
                  className="absolute -right-6 top-10 h-52 w-52 rounded-full bg-sky-400/45 blur-3xl dark:bg-sky-400/30"
                  aria-hidden
                />
                <div
                  className="absolute bottom-6 left-2 h-44 w-44 rounded-full bg-rose-500/35 blur-3xl dark:bg-red-500/25"
                  aria-hidden
                />
                <figure className="absolute inset-5 z-10 m-0 overflow-hidden rounded-2xl border border-white/55 bg-black/5 shadow-[0_28px_80px_rgba(25,28,30,0.12)] dark:border-white/15 dark:bg-black/20 dark:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                  <Image
                    src={CASE_STUDIES_HERO_FRAMED_ART}
                    alt="Abstract visualization of production AI delivering governed, operational outcomes—not experiments."
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 380px"
                    priority
                    quality={90}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/25 dark:ring-white/10"
                    aria-hidden
                  />
                </figure>
              </div>
            </div>
          </div>
      </section>

      {/* Industry filters — sticky below global header */}
      <nav
        aria-label="Filter use cases by industry"
        className="print:hidden sticky top-16 md:top-20 z-30 border-b border-[#e0e3e5] bg-[#f8f9fb]/90 backdrop-blur-md backdrop-saturate-150 dark:border-[#374151] dark:bg-[#0B0F19]/90"
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7280] dark:text-[#9ca3af]">
            Find solutions by industry
          </p>
          <div
            className="mt-2 flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
            role="toolbar"
            aria-label="Industry filters"
          >
            <button
              type="button"
              onClick={clearIndustryFilter}
              aria-pressed={selectedIndustryId === null}
              className={cn(
                "cursor-pointer shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm",
                selectedIndustryId === null && activeSubnav === NAV_ALL
                  ? "border-transparent bg-[#00518e] text-white shadow-sm dark:bg-[#93C5FD] dark:text-[#0B0F19]"
                  : "border border-[#e0e3e5]/80 bg-white/80 text-[#414752] hover:bg-white hover:text-[#0B0F19] dark:border-[#374151] dark:bg-[#1f2937]/90 dark:text-[#e5e7eb] dark:hover:bg-[#374151]"
              )}
            >
              All
            </button>
            {caseStudyIndustries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => selectIndustry(ind.id)}
                aria-pressed={selectedIndustryId === ind.id}
                title={`${industryCounts[ind.id] ?? 0} use case patterns`}
                className={cn(
                  "cursor-pointer shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm",
                  selectedIndustryId === ind.id
                    ? "border-transparent bg-[#00518e] text-white shadow-sm dark:bg-[#93C5FD] dark:text-[#0B0F19]"
                    : "border border-[#e0e3e5]/80 bg-white/80 text-[#414752] hover:bg-white hover:text-[#0B0F19] dark:border-[#374151] dark:bg-[#1f2937]/90 dark:text-[#e5e7eb] dark:hover:bg-[#374151]"
                )}
              >
                <span className="whitespace-nowrap">{ind.label}</span>
                <span
                  className={cn(
                    "ml-1.5 tabular-nums text-[10px] opacity-80",
                    selectedIndustryId === ind.id ? "text-white/90 dark:text-[#0B0F19]/80" : ""
                  )}
                >
                  ({industryCounts[ind.id] ?? 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Business outcomes — primary IA (Stitch-aligned) */}
      <section
        id="business-outcomes"
        className="bg-[#f8f9fb] dark:bg-[#0B0F19] border-b border-[#eceef0] dark:border-[#1f2937] print:bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 print:py-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#00518e] dark:text-[#93C5FD] mb-2">
              Where we focus first
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0B0F19] dark:text-[#F9FAFB] tracking-tight">
              Business outcomes from production AI & automation
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#525252] dark:text-[#D1D5DB]">
              Outcome-led patterns—open any card for challenge, phased delivery, implementations, and impact metrics. Up to {USE_CASES_PAGE_SIZE} cards per page for a cleaner, easier-to-scan library.
            </p>
            <p
              className="mt-3 text-sm text-[#525252] dark:text-[#D1D5DB]"
              aria-live="polite"
            >
              {selectedIndustryId != null ? (
                <>
                  Showing{" "}
                  <span className="font-semibold tabular-nums text-[#0B0F19] dark:text-[#F9FAFB]">
                    {filteredUseCases.length}
                  </span>{" "}
                  pattern
                  {filteredUseCases.length === 1 ? "" : "s"} for{" "}
                  <span className="font-medium text-[#0B0F19] dark:text-[#F9FAFB]">
                    {caseStudyIndustries.find((i) => i.id === selectedIndustryId)?.label}
                  </span>
                  .{" "}
                  <button
                    type="button"
                    onClick={clearIndustryFilter}
                    className="cursor-pointer font-semibold text-[#00518e] underline decoration-[#00518e]/40 underline-offset-2 hover:decoration-[#00518e] dark:text-[#93C5FD] dark:decoration-[#93C5FD]/40"
                  >
                    Clear filter
                  </button>
                </>
              ) : (
                <>Use the industry bar above to narrow the library to what applies to your operating model.</>
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {paginatedUseCases.map((u) => {
              const Icon = outcomeIcons[u.icon];
              return (
                <Link
                  key={u.slug}
                  href={`/case-studies/use-cases/${u.slug}`}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#eceef0]/90 bg-white shadow-[0_1px_3px_rgba(25,28,30,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(25,28,30,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00518e] focus-visible:ring-offset-2 dark:border-[#374151] dark:bg-[#1F2937] dark:focus-visible:ring-[#93C5FD] print:break-inside-avoid"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8ecf2] dark:bg-[#111827]">
                    <Image
                      src={u.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-linear-to-t from-[#0B0F19]/55 via-[#0B0F19]/15 to-transparent dark:from-black/60"
                      aria-hidden
                    />
                    <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-[#00518e] shadow-sm backdrop-blur-sm dark:bg-[#1f2937]/90 dark:text-[#93C5FD]">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="absolute bottom-3 left-3 right-3 text-base font-semibold leading-snug text-white drop-shadow-sm md:text-[1.05rem]">
                      {u.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <p className="text-sm leading-relaxed text-[#525252] dark:text-[#D1D5DB]">
                      {u.outcome}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {u.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] font-medium bg-[#f2f4f6] dark:bg-[#374151] text-[#414752] dark:text-[#e5e7eb] border-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#00518e] dark:text-[#93C5FD]">
                      View use case
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalFiltered > 0 ? (
            <nav
              className="mt-10 flex flex-col items-stretch gap-4 border-t border-[#eceef0] pt-8 dark:border-[#1f2937] sm:flex-row sm:items-center sm:justify-between print:hidden"
              aria-label="Use case library pagination"
            >
              <p
                id="case-studies-pagination-summary"
                className="text-center text-sm text-[#525252] dark:text-[#D1D5DB] sm:text-left"
                aria-live="polite"
              >
                Showing{" "}
                <span className="font-semibold tabular-nums text-[#0B0F19] dark:text-[#F9FAFB]">
                  {rangeStart}
                </span>
                –
                <span className="font-semibold tabular-nums text-[#0B0F19] dark:text-[#F9FAFB]">
                  {rangeEnd}
                </span>{" "}
                of{" "}
                <span className="font-semibold tabular-nums text-[#0B0F19] dark:text-[#F9FAFB]">
                  {totalFiltered}
                </span>
                {totalPages > 1 ? (
                  <>
                    {" "}
                    <span className="text-[#6b7280] dark:text-[#9ca3af]">
                      (page {currentPage} of {totalPages})
                    </span>
                  </>
                ) : null}
              </p>

              {totalPages > 1 ? (
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
                  <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer gap-1"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      aria-label="Go to previous page of use cases"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer gap-1"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      aria-label="Go to next page of use cases"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Button>
                  </div>

                  {totalPages <= 9 ? (
                    <ul
                      className="flex flex-wrap items-center justify-center gap-1.5"
                      role="list"
                      aria-labelledby="case-studies-pagination-summary"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <li key={p}>
                          <button
                            type="button"
                            onClick={() => goToPage(p)}
                            aria-label={`Go to page ${p}`}
                            aria-current={p === currentPage ? "page" : undefined}
                            className={cn(
                              "flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors",
                              p === currentPage
                                ? "border-[#00518e] bg-[#00518e] text-white dark:border-[#93C5FD] dark:bg-[#93C5FD] dark:text-[#0B0F19]"
                                : "border-[#e0e3e5] bg-white text-[#414752] hover:bg-[#f3f4f6] dark:border-[#374151] dark:bg-[#1f2937] dark:text-[#e5e7eb] dark:hover:bg-[#374151]"
                            )}
                          >
                            {p}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>

      {/* Executive CTA — AI Prioritization Workshop */}
      <section
        id="executive-next-steps"
        className="relative overflow-hidden print:bg-white print:border-0 print:break-before-page"
      >
        {/* Background image layer */}
        <Image
          src="/images/case-studies/cta-prioritization-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          aria-hidden="true"
        />
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 bg-linear-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50"
          aria-hidden="true"
        />
        {/* Subtle brand accent glow */}
        <div
          className="absolute inset-0 bg-linear-to-r from-[#0A58D0]/15 via-transparent to-[#DC2626]/10"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:py-28 text-center print:py-8">
          {/* Headline — their pain */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            AI Initiatives Are Piling Up.
            <br />
            <span className="bg-linear-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent">
              Which Ones Actually Move Your P&L?
            </span>
          </h2>

          {/* Subline — the relief */}
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            One workshop. Every initiative ranked by ROI.
          </p>

          {/* Two outcome cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
            {/* Strategic Implementation */}
            <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
                <Target className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Strategic Roadmap
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                Long-term, high-impact initiatives your board can back with confidence.
              </p>
            </div>

            {/* Quick Wins Accelerator */}
            <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Quick Wins
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                Ship in 90 days. Measurable P&L impact you can report this quarter.
              </p>
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-10 print:hidden">
            <Button
              onClick={() => setContactModalOpen(true)}
              size="lg"
              className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-neutral-100 hover:scale-105 hover:shadow-[0_12px_44px_rgba(255,255,255,0.3)]"
            >
              Schedule Your AI Briefing
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/60 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] print:hidden">
            60 min · Free · No obligation
          </p>

          {/* Print fallback */}
          <div className="hidden print:block print:bg-blue-100 print:text-blue-900 print:px-6 print:py-4 print:rounded-lg print:text-center print:mt-6">
            <p className="print:text-lg print:font-semibold">Schedule Your AI Briefing</p>
            <p className="print:text-sm print:mt-2">Contact: sales@innovoco.com | www.innovoco.com</p>
          </div>
        </div>
      </section>
      
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer onContactClick={() => setContactModalOpen(true)} />
      </div>

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
}