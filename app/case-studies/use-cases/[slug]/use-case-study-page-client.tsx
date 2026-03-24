"use client";

import React, { useState } from "react";
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
} as const;

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

        <section className="bg-[#f0f3f7] py-14 dark:bg-[#0B0F19] md:py-16">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-xl font-semibold tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] md:text-2xl">
              Explore this outcome on your stack
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-[#525252] dark:text-[#D1D5DB]">
              We map scope, guardrails, and rollout to your data boundaries and teams—practical next steps, not a
              generic slide deck.
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-8 rounded-full bg-[#00518e] px-8 hover:bg-[#00518e]/90 dark:bg-[#0A58D0]"
              onClick={() => setContactOpen(true)}
            >
              Book a briefing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
