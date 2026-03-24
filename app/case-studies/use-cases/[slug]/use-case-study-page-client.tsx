"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Globe2,
  Headphones,
  Megaphone,
  Scale,
  Shield,
  Stethoscope,
  Truck,
  Users,
  Wrench,
  Camera,
  Factory,
  Zap,
  Activity,
  Search,
  GitBranch,
} from "lucide-react";
import type { BusinessOutcomeUseCase } from "@/lib/content/case-studies-page-content";
import type { UseCaseStudyNarrative } from "@/lib/content/use-case-study-details";
import { resolveUseCaseTestimonial } from "@/lib/content/use-case-testimonials";
import { resolveUseCaseVisualSet } from "@/lib/content/use-case-visuals";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import ContactModal from "@/components/landing/ContactModal";
import { UseCaseTestimonialGlass } from "@/components/case-studies/use-case-study/testimonial-glass";
import {
  UseCaseChallengeSection,
  UseCaseIntroSection,
  UseCaseRelatedSection,
  UseCaseSolutionSection,
  UseCaseTechnicalInnovationImpactSection,
  useCaseStoryHeroTitleClass,
} from "@/components/case-studies/use-case-study/use-case-study-story-sections";

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

/** Map use case industry IDs → per-industry CTA background image paths. */
const industryCtaBgMap: Record<string, string> = {
  "financial-services": "/images/industries/financial-services/cta-prioritization-bg.jpg",
  healthcare: "/images/industries/healthcare/cta-prioritization-bg.jpg",
  "retail-consumer": "/images/industries/retail/cta-prioritization-bg.jpg",
  "manufacturing-logistics": "/images/industries/manufacturing/cta-prioritization-bg.jpg",
  "energy-field": "/images/industries/energy-utilities/cta-prioritization-bg.jpg",
  technology: "/images/case-studies/cta-prioritization-bg.jpg",
  "cross-enterprise": "/images/case-studies/cta-prioritization-bg.jpg",
};

function resolveCtaBg(industries: string[]): string {
  for (const id of industries) {
    if (industryCtaBgMap[id]) return industryCtaBgMap[id];
  }
  return "/images/case-studies/cta-prioritization-bg.jpg";
}

type Props = {
  summary: BusinessOutcomeUseCase;
  detail: UseCaseStudyNarrative;
  related: BusinessOutcomeUseCase[];
};

export default function UseCaseStudyPageClient({ summary, detail, related }: Props) {
  const [contactOpen, setContactOpen] = useState(false);
  const Icon = outcomeIcons[summary.icon];
  const visuals = resolveUseCaseVisualSet(summary.slug, summary.image, detail.phases.length);
  const testimonialCopy = detail.quote ?? resolveUseCaseTestimonial(summary.slug);

  const testimonialLogoCard = (
    <div className="flex h-32 w-48 items-center justify-center rounded-2xl bg-[#0B0F19] text-white shadow-xl dark:bg-black dark:ring-1 dark:ring-white/10">
      <Icon className="h-12 w-12 opacity-95" aria-hidden />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#use-case-main" className="skip-to-content">
        Skip to main content
      </a>
      <div className="print:hidden">
        <Header onContactClick={() => setContactOpen(true)} isLandingPage={false} />
      </div>

      <main id="use-case-main">
        <section className="relative overflow-hidden border-b border-border/40 bg-[linear-gradient(135deg,rgba(10,88,208,0.12)_0%,rgba(139,92,246,0.1)_45%,rgba(219,234,254,0.35)_100%)] dark:bg-[linear-gradient(135deg,rgba(10,88,208,0.18)_0%,rgba(15,23,42,0.95)_55%)]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(10,88,208,0.2),transparent_55%)] dark:opacity-40"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 md:pb-14 md:pt-20">
            <Link
              href="/case-studies#business-outcomes"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#00518e] hover:underline dark:text-[#93C5FD]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to use case library
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00518e] dark:text-[#93C5FD]">
              Use case
            </p>
            <h1 className={cn("mt-2 max-w-4xl", useCaseStoryHeroTitleClass)}>
              {summary.title}
            </h1>
          </div>
        </section>

        <UseCaseIntroSection
          headline={detail.headline}
          subheadline={detail.subheadline}
          tags={summary.tags}
          image={summary.image}
          icon={Icon}
          useCaseTitle={summary.title}
        />

        <UseCaseChallengeSection
          contextItalic={detail.contextItalic}
          challenge={detail.challenge}
          challengeImage={visuals.challengeImage}
          challengeImageFallback={summary.image}
          useCaseTitle={summary.title}
        />

        <UseCaseSolutionSection
          solutionIntro={detail.solutionIntro}
          phases={detail.phases}
          phaseImages={visuals.phaseImages}
          keyImplementations={detail.keyImplementations}
          keyImplementationsImage={visuals.keyImplementationsImage}
          storyImageFallback={summary.image}
          useCaseTitle={summary.title}
        />

        <UseCaseTechnicalInnovationImpactSection
          technicalInnovation={detail.technicalInnovation}
          impactMetrics={detail.impactMetrics}
          impactClosing={detail.impactClosing}
          technicalInnovationImage={visuals.technicalInnovationImage}
          impactImage={visuals.impactImage}
          storyImageFallback={summary.image}
          useCaseTitle={summary.title}
        />

        {testimonialCopy ? (
          <UseCaseTestimonialGlass
            quote={testimonialCopy.body}
            attribution={testimonialCopy.attribution}
            logoCard={testimonialLogoCard}
          />
        ) : null}

        <section className="relative overflow-hidden">
          <Image
            src={resolveCtaBg(summary.industries)}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-[#0A58D0]/15 via-transparent to-[#DC2626]/10"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
            <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
              Explore this outcome on your stack
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl">
              We map scope, guardrails, and rollout to your data boundaries and teams—practical next steps, not a
              generic slide deck.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-10 rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100 hover:shadow-[0_12px_44px_rgba(255,255,255,0.3)]"
              onClick={() => setContactOpen(true)}
            >
              Book a briefing
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm font-medium text-white/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
              60 min · Free · No obligation
            </p>
          </div>
        </section>

        <UseCaseRelatedSection related={related} iconFor={(ic) => outcomeIcons[ic]} />
      </main>

      <div className="print:hidden">
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
