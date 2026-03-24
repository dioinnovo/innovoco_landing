"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Shield,
  CheckCircle,
  Users,
  Rocket,
  Headphones,
  Truck,
  Wrench,
  Scale,
  Megaphone,
  FileText,
  BookOpen,
  Stethoscope,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PrintPDFButton } from "@/components/case-studies/print-pdf-button";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import ContactModal from "@/components/landing/ContactModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CaseStudiesSubnav } from "@/lib/content/case-studies-page-content";
import {
  businessOutcomeUseCases,
  caseStudiesFaq,
} from "@/lib/content/case-studies-page-content";
import { cn } from "@/lib/utils";

type CaseStudiesPageClientProps = { subnav: CaseStudiesSubnav };

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
} as const;

function formatPageDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CaseStudiesPageClient({ subnav }: CaseStudiesPageClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState<string>("business-outcomes");
  /** Avoid SSR/client `new Date()` mismatch (timezone, midnight). */
  const [heroUpdatedAt, setHeroUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    setHeroUpdatedAt(formatPageDate());
  }, []);

  useEffect(() => {
    const ids = subnav.map((s) => s.id);
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSubnav(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [subnav]);

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
                  className="rounded-full border-white/40 bg-white/95 text-[#0B0F19] shadow-sm hover:bg-white dark:border-white/30 dark:bg-white/10 dark:text-white dark:backdrop-blur-md dark:hover:bg-white/15"
                  onClick={() => setContactModalOpen(true)}
                >
                  Book executive briefing
                </Button>
                <PrintPDFButton />
              </div>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] print:grid-cols-1 print:gap-6">
              <div>
                <h1 className="max-w-[20ch] text-3xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-4xl md:text-[2.65rem] print:max-w-none print:text-2xl print:text-[#0B0F19] print:drop-shadow-none">
                  Production AI that ships as outcomes—not slide decks.
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
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] print:hidden lg:mx-0 lg:max-w-none">
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

      {/* In-page navigation (content only — site chrome is global Header) */}
      <nav
        aria-label="On this page"
        className="print:hidden sticky top-16 md:top-20 z-30 border-b border-[#e0e3e5] bg-[#f8f9fb]/90 backdrop-blur-md backdrop-saturate-150"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 overflow-x-auto">
          <div className="flex min-w-min gap-1.5 pb-1">
            {subnav.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm",
                  activeSubnav === item.id
                    ? "bg-[#00518e] text-white shadow-sm"
                    : "bg-white/80 text-[#414752] hover:bg-white hover:text-[#0B0F19] border border-[#e0e3e5]/80"
                )}
              >
                {item.label}
              </Link>
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
              Twelve outcome-led patterns—open any card for challenge, phased delivery, implementations, and impact metrics. Same library, less duplication on one scroll.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {businessOutcomeUseCases.map((u) => {
              const Icon = outcomeIcons[u.icon];
              return (
                <Link
                  key={u.slug}
                  href={`/case-studies/use-cases/${u.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#eceef0]/90 bg-white shadow-[0_1px_3px_rgba(25,28,30,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(25,28,30,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00518e] focus-visible:ring-offset-2 dark:border-[#374151] dark:bg-[#1F2937] dark:focus-visible:ring-[#93C5FD] print:break-inside-avoid"
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
        </div>
      </section>

      <section
        id="faq-use-cases"
        className="py-8 md:py-16 bg-[#f8f9fb] dark:bg-[#0B0F19] border-t border-[#eceef0] dark:border-[#1f2937] print:py-4 print:bg-white print:break-before-page"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0B0F19] dark:text-[#F9FAFB] mb-2">
            Frequently asked questions
          </h2>
          <p className="text-sm text-[#525252] dark:text-[#D1D5DB] mb-8">
            Security, deployment, and how we keep humans in control for high‑risk decisions.
          </p>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {caseStudiesFaq.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="rounded-xl border border-[#eceef0] dark:border-[#374151] bg-white dark:bg-[#1F2937] px-4"
              >
                <AccordionTrigger className="text-left text-[#0B0F19] dark:text-[#F9FAFB] hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#525252] dark:text-[#D1D5DB] pb-4 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Executive CTA */}
      <section
        id="executive-next-steps"
        className="relative border-t-2 border-[#0A58D0]/20 bg-gradient-to-br from-[#0A58D0]/5 via-[#8B5CF6]/5 to-[#DC2626]/5 dark:from-[#0A58D0]/10 dark:via-[#8B5CF6]/10 dark:to-[#DC2626]/10 print:bg-white print:border-0 print:break-before-page"
      >
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16 print:py-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA] mb-4">
              <Rocket className="h-4 w-4" />
              <span>Executive Action Plan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] dark:text-[#F9FAFB] mb-4">
              Your Path to AI Excellence
            </h2>
            <p className="text-lg text-[#525252] dark:text-[#D1D5DB] max-w-3xl mx-auto">
              Transform your enterprise with our proven framework. Join industry leaders who've accelerated their AI journey with Innovoco.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white dark:bg-[#1F2937] rounded-[22px] p-6 border border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#10B981]" />
                Strategic Implementation
              </h3>
              <ul className="space-y-3 text-[#525252] dark:text-[#D1D5DB] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Adopt two cloud pillars (Azure or Vertex) per client ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Use LangGraph for framework‑agnostic, long‑running orchestration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Offer hybrid/self‑host deployments for privacy‑sensitive accounts</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-[#1F2937] rounded-[22px] p-6 border border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-[#8B5CF6]" />
                Quick-Start Accelerators
              </h3>
              <ul className="space-y-3 text-[#525252] dark:text-[#D1D5DB] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Bundle observability (Foundry/Vertex/LangSmith) and evals by default</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Package 8 enterprise workflows as quick‑start accelerators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Enterprise-ready templates with compliance built-in</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block">
              <Button 
                onClick={() => setContactModalOpen(true)}
                size="lg" 
                className="group bg-gradient-to-r from-[#0A58D0] to-[#8B5CF6] hover:from-[#0A58D0]/90 hover:to-[#8B5CF6]/90 text-white rounded-full px-12 py-8 text-xl md:text-2xl font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(10,88,208,0.5)] hover:shadow-[0_12px_40px_rgba(10,88,208,0.7)] hover:scale-110 transform min-h-[80px] print:hidden">
                Schedule Executive Briefing
                <ArrowRight className="ml-4 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <div className="hidden print:block print:bg-blue-100 print:text-blue-900 print:px-6 print:py-4 print:rounded-lg print:text-center">
                <p className="print:text-lg print:font-semibold">Schedule Executive Briefing</p>
                <p className="print:text-sm print:mt-2">Contact: sales@innovoco.com | www.innovoco.com</p>
              </div>
              <p className="mt-4 text-sm md:text-base text-[#6B7280] dark:text-[#9CA3AF] font-medium print:text-gray-700">
                30-minute strategic consultation • No obligation
              </p>
            </div>
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