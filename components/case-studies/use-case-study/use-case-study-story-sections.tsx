"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BusinessOutcomeUseCase } from "@/lib/content/case-studies-page-content";
import type { UseCaseStudyImplementation, UseCaseStudyPhase } from "@/lib/content/use-case-study-details";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StoryImage, type StoryImageObjectPosition } from "./story-image";
import {
  RelatedResourceCardLink,
  RelatedResourceCardsSection,
} from "./related-resource-card";

/** Shared style: Technical innovation, Impact (and similar); solution block uses its own title scale */
const useCaseSectionHeadingClass =
  "text-2xl font-semibold tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] md:text-3xl";

function phaseObjectPosition(i: number): StoryImageObjectPosition {
  const cycle: StoryImageObjectPosition[] = ["left", "center", "right", "top"];
  return cycle[i % cycle.length]!;
}

function ListArrowBullet({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-500 dark:text-neutral-400",
        className
      )}
      aria-hidden
    >
      <ArrowRight className="h-3 w-3" strokeWidth={2} />
    </span>
  );
}

type IntroProps = {
  headline: string;
  subheadline: string;
  tags: BusinessOutcomeUseCase["tags"];
  image: string;
  icon: LucideIcon;
  useCaseTitle: string;
};

/**
 * Sole page title (`h1` in hero). Must stay visually above the intro story `h2` (useCaseIntroStoryTitleClass).
 */
export const useCaseStoryHeroTitleClass =
  "font-semibold leading-[1.05] tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] text-[clamp(2.75rem,6.5vw,4rem)]";

/**
 * Intro story headline (`h2`) — e.g. “Service that scales…”. Subordinate to hero `h1` (use case name).
 */
export const useCaseIntroStoryTitleClass =
  "font-semibold leading-tight tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] text-[clamp(1.875rem,3.5vw,3rem)]";

/** Ateko global `h4`: clamp(1.25rem, 1.25rem + ((1vw - 0.2rem) * 1.154), 2rem) */
const ateIntroSubheadClass =
  "font-normal leading-snug text-[#525252] dark:text-[#D1D5DB] text-[clamp(1.25rem,calc(1.25rem+(1vw-0.2rem)*1.154),2rem)]";

/** WP `has-large-font-size` — body under phase / list detail */
const ateLargeBodyClass =
  "text-pretty font-normal leading-relaxed text-[#525252] dark:text-[#D1D5DB] text-[clamp(1.125rem,calc(1.125rem+(1vw-0.2rem)*0.192),1.25rem)]";

/** Same `h2` + same type for peer sections “The Challenge” and “The Innovoco Solution”. */
const useCaseMajorSectionTitleClass =
  "m-0 font-bold leading-tight tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] text-[clamp(2rem,4.25vw,2.75rem)] md:leading-[1.1]";

/**
 * Phase / key-implementations titles — Salesforce-style case study: large bold line, body follows.
 */
const ateSolutionPhaseTitleClass =
  "m-0 text-xl font-bold leading-tight tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] md:text-2xl lg:text-[1.75rem]";

/** Same 30% | 60px pad | 70% row as challenge + solution reference */
const atekoMediaTextRowClass =
  "flex flex-col gap-10 md:flex-row md:flex-nowrap md:items-start md:gap-0";

/**
 * Phases only: on small screens, row layout (thumb left, copy right) to avoid wasted gutters.
 * Key implementations keeps `atekoSolutionRowClass` — stacked on mobile so the bulleted list stays full width.
 */
const atekoSolutionPhaseRowClass =
  "flex flex-row flex-nowrap items-start gap-4 sm:gap-5 md:items-center md:gap-8 lg:gap-10";

const atekoSolutionPhaseImageColClass =
  "flex w-[6.75rem] shrink-0 flex-col items-stretch justify-start sm:w-[7.5rem] " +
  "md:w-auto md:max-w-none md:basis-[30%] md:items-center md:justify-center md:px-3 md:py-1 lg:px-4";

const atekoSolutionPhaseTextColClass =
  "min-w-0 flex-1 pt-0.5 md:flex-1 md:min-w-0 md:pt-0";

/**
 * Key implementations (and any block that needs stacked mobile): image above, full-width list below.
 */
const atekoSolutionRowClass =
  "flex flex-col gap-6 md:flex-row md:flex-nowrap md:items-center md:gap-8 lg:gap-10";

/** Proportional media column + symmetric inset so art is not edge-hugged (pairs with inner max-w wrapper). */
const atekoSolutionImageColClass =
  "flex w-full shrink-0 items-center justify-center " +
  "mx-auto max-w-[min(100%,10.5rem)] sm:max-w-[10.5rem] " +
  "md:mx-0 md:max-w-none md:basis-[30%] md:justify-center md:px-3 md:py-1 lg:px-4";

/** Keeps square art at a stable size while sitting inside the wider 30% column. */
const atekoSolutionImageInnerClass =
  "w-full max-w-[7.5rem] sm:max-w-32 md:max-w-[clamp(7.25rem,14vw,10.5rem)]";

const atekoSolutionTextColClass =
  "min-w-0 w-full md:flex-1 md:min-w-0";

/** Key implementations image: landscape strip; full width when stacked on mobile (not square-thumb width). */
const atekoKeyImplementationsImageColClass =
  "flex w-full shrink-0 items-center justify-center " +
  "mx-auto max-w-full " +
  "md:mx-0 md:max-w-none md:basis-[34%] md:justify-center md:px-3 md:py-1 lg:px-4";

const atekoKeyImplementationsImageInnerClass = "w-full min-w-0 max-w-full";

const ateSolutionBodyClass =
  "text-pretty font-normal leading-relaxed text-[#525252] dark:text-[#D1D5DB] text-[clamp(1.0625rem,calc(1.0625rem+(1vw-0.2rem)*0.08),1.125rem)]";

const solutionListArrowClass =
  "border-amber-500/70 text-amber-600 dark:border-amber-400/55 dark:text-amber-400";

const atekoMediaColClass =
  "min-w-0 md:basis-[30%] md:grow-0 md:shrink-0 md:pr-[60px] md:pl-0";

const atekoTextColClass = "min-w-0 md:basis-[70%] md:min-w-0";

export function UseCaseIntroSection({ headline, subheadline, tags, image, icon: Icon, useCaseTitle }: IntroProps) {
  return (
    <section className="border-b border-[#eceef0] bg-white dark:border-[#1f2937] dark:bg-[#0B0F19]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex flex-col-reverse gap-10",
            "py-[clamp(30px,5vw,50px)]",
            "md:flex-row md:flex-nowrap md:items-center md:gap-[clamp(2rem,10vw,5.5rem)]"
          )}
        >
          <div className="min-w-0 md:flex-1">
            <h2 className={useCaseIntroStoryTitleClass}>{headline}</h2>
            <p className={cn(ateIntroSubheadClass, "mt-5 md:mt-6")}>{subheadline}</p>
            <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
              {tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="border-0 bg-[#f2f4f6] text-[11px] font-medium text-[#414752] dark:bg-[#374151] dark:text-[#e5e7eb]"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative min-w-0 md:flex-1">
            <StoryImage
              src={image}
              alt={`${useCaseTitle} — overview`}
              priority
              aspectClassName="aspect-[2560/1707]"
              className="rounded-[30px]"
              objectPosition="center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 48vw, 560px"
            />
            <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-[#00518e] shadow-md backdrop-blur-sm dark:bg-[#1f2937]/95 dark:text-[#93C5FD]">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ChallengeProps = {
  contextItalic: string;
  challenge: string;
  challengeImage: string;
  /** Outcome card (or other) art if challenge-specific file is missing */
  challengeImageFallback?: string;
  useCaseTitle: string;
};

/** Ateko-style challenge visual: fixed display width 219px, height auto (wp-block-image.is-resized). */
function UseCaseChallengeFigureImage({
  src,
  fallbackSrc,
  alt,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
}) {
  const [current, setCurrent] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setTriedFallback(false);
  }, [src]);

  const onError = useCallback(() => {
    if (fallbackSrc && !triedFallback && current !== fallbackSrc) {
      setTriedFallback(true);
      setCurrent(fallbackSrc);
    }
  }, [fallbackSrc, triedFallback, current]);

  return (
    <figure className="m-0 w-full max-w-[219px]">
      <Image
        src={current}
        alt={alt}
        width={800}
        height={800}
        className="h-auto w-full max-w-[219px] rounded-[30px] border border-black/6 object-cover shadow-sm dark:border-white/10"
        sizes="219px"
        priority
        fetchPriority="high"
        onError={onError}
      />
    </figure>
  );
}

/**
 * Structure aligned with Ateko NASCAR case study:
 * wp-block-columns (flex, items-center) →
 *   column 30% + pr-[60px]: figure (219px image) + p>em
 *   column 70%: heading + p.has-large-font-size
 */
export function UseCaseChallengeSection({
  contextItalic,
  challenge,
  challengeImage,
  challengeImageFallback,
  useCaseTitle,
}: ChallengeProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[#eceef0] bg-[#f8f9fb] dark:border-[#1f2937] dark:bg-[#111827]/50",
        "[--challenge-grid:rgba(0,81,142,0.065)] dark:[--challenge-grid:rgba(148,163,184,0.11)]"
      )}
    >
      {/* Soft blueprint grid — working-surface / case-study board before the build */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.42]",
          "bg-[linear-gradient(to_right,var(--challenge-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--challenge-grid)_1px,transparent_1px)] bg-size-[32px_32px] bg-position-[center_top]"
        )}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className={cn(atekoMediaTextRowClass, "gap-10 py-[clamp(30px,5vw,50px)] md:items-center")}>
          <div className={atekoMediaColClass}>
            <UseCaseChallengeFigureImage
              src={challengeImage}
              fallbackSrc={challengeImageFallback}
              alt={`${useCaseTitle} — the challenge`}
            />
            <p className="m-0 pt-3 text-base leading-relaxed text-[#525252] dark:text-[#D1D5DB] md:pt-4 md:text-[1.0625rem]">
              <em>{contextItalic}</em>
            </p>
          </div>
          <div className={atekoTextColClass}>
            <h2 className={useCaseMajorSectionTitleClass}>The Challenge</h2>
            <p className={cn(ateLargeBodyClass, "mt-4 text-[#414752] md:mt-5")}>{challenge}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type SolutionSectionProps = {
  solutionIntro: string;
  phases: UseCaseStudyPhase[];
  phaseImages: string[];
  keyImplementations: UseCaseStudyImplementation[];
  keyImplementationsImage: string;
  /** Outcome card image — used if generated story art is missing. */
  storyImageFallback?: string;
  useCaseTitle: string;
};

/**
 * Phases: compact square art left + title/body right (row on mobile). Key implementations: stacked on mobile
 * for the bulleted list; `md+` matches the same media-object row as phases.
 */
export function UseCaseSolutionSection({
  solutionIntro,
  phases,
  phaseImages,
  keyImplementations,
  keyImplementationsImage,
  storyImageFallback,
  useCaseTitle,
}: SolutionSectionProps) {
  const solutionThumbSizes = "(max-width: 768px) 120px, 168px";
  const keyImplementationsImageSizes =
    "(max-width: 768px) min(100vw, 72rem), (max-width: 1200px) 34vw, 400px";

  return (
    <section className="bg-white dark:bg-[#0B0F19]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-2 sm:px-6 md:pb-12">
        <header className="py-6 md:py-8">
          <h2 className={useCaseMajorSectionTitleClass}>The Innovoco Solution</h2>
          <p className={cn(ateLargeBodyClass, "mt-3 max-w-none text-[#414752] dark:text-[#D1D5DB] md:mt-4")}>
            {solutionIntro}
          </p>
        </header>

        <div className="space-y-10 md:space-y-12">
          {phases.map((phase, i) => (
            <div key={phase.title} className={atekoSolutionPhaseRowClass}>
              <div className={atekoSolutionPhaseImageColClass}>
                <div className={atekoSolutionImageInnerClass}>
                  <StoryImage
                    src={phaseImages[i] ?? phaseImages[0]!}
                    alt={`${useCaseTitle} — ${phase.title}`}
                    aspectClassName="aspect-square"
                    className="rounded-2xl border border-black/6 shadow-sm dark:border-white/10"
                    objectPosition={phaseObjectPosition(i)}
                    sizes={solutionThumbSizes}
                    fallbackSrc={storyImageFallback}
                  />
                </div>
              </div>
              <div className={atekoSolutionPhaseTextColClass}>
                <h3 className={ateSolutionPhaseTitleClass}>{phase.title}</h3>
                <p className={cn(ateSolutionBodyClass, "mt-3 md:mt-4")}>{phase.body}</p>
              </div>
            </div>
          ))}

          <div className={atekoSolutionRowClass}>
            <div className={atekoKeyImplementationsImageColClass}>
              <div className={atekoKeyImplementationsImageInnerClass}>
                <StoryImage
                  src={keyImplementationsImage}
                  alt={`${useCaseTitle} — key implementations`}
                  aspectClassName="aspect-[16/9]"
                  className="rounded-2xl border border-black/6 shadow-sm dark:border-white/10"
                  objectPosition="center"
                  sizes={keyImplementationsImageSizes}
                  fallbackSrc={storyImageFallback}
                />
              </div>
            </div>
            <div className={atekoSolutionTextColClass}>
              <h3 className={ateSolutionPhaseTitleClass}>Key implementations</h3>
              <ul className="mt-5 space-y-5 md:mt-6 md:space-y-5">
                {keyImplementations.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <ListArrowBullet className={solutionListArrowClass} />
                    <div className="min-w-0">
                      <p className="text-base font-bold text-[#0B0F19] dark:text-[#F9FAFB] md:text-[1.0625rem]">
                        {item.title}
                      </p>
                      <p className={cn(ateSolutionBodyClass, "mt-1.5")}>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type TechImpactProps = {
  technicalInnovation: string;
  impactMetrics: string[];
  impactClosing?: string;
  technicalInnovationImage: string;
  impactImage: string;
  storyImageFallback?: string;
  useCaseTitle: string;
};

export function UseCaseTechnicalInnovationImpactSection({
  technicalInnovation,
  impactMetrics,
  impactClosing,
  technicalInnovationImage,
  impactImage,
  storyImageFallback,
  useCaseTitle,
}: TechImpactProps) {
  return (
    <section className="border-b border-[#eceef0] bg-[#f8f9fb] py-14 dark:border-[#1f2937] dark:bg-[#111827]/50 md:py-20">
      <div className="mx-auto max-w-6xl space-y-20 px-4 md:space-y-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="order-2 md:order-1">
            <h2 className={useCaseSectionHeadingClass}>Technical innovation</h2>
            <p className="mt-6 text-base leading-relaxed text-[#525252] dark:text-[#D1D5DB] md:text-lg">
              {technicalInnovation}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <StoryImage
              src={technicalInnovationImage}
              alt={`${useCaseTitle} — technical innovation`}
              aspectClassName="aspect-[4/3]"
              objectPosition="right"
              fallbackSrc={storyImageFallback}
            />
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <StoryImage
              src={impactImage}
              alt={`${useCaseTitle} — impact`}
              aspectClassName="aspect-[4/3]"
              objectPosition="center"
              fallbackSrc={storyImageFallback}
            />
          </div>
          <div>
            <h2 className={useCaseSectionHeadingClass}>Impact</h2>
            <ul className="mt-8 space-y-4">
              {impactMetrics.map((line, mi) => (
                <li
                  key={mi}
                  className="flex gap-3 text-base leading-relaxed text-[#525252] dark:text-[#D1D5DB]"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A58D0]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {impactClosing ? (
              <p className="mt-8 text-base leading-relaxed text-[#414752] dark:text-[#D1D5DB] md:text-lg">
                {impactClosing}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

type RelatedProps = {
  related: BusinessOutcomeUseCase[];
  iconFor: (icon: BusinessOutcomeUseCase["icon"]) => LucideIcon;
};

export function UseCaseRelatedSection({ related, iconFor }: RelatedProps) {
  if (related.length === 0) return null;

  return (
    <RelatedResourceCardsSection
      heading="More case studies"
      description="Explore adjacent patterns from the same production playbook."
    >
      {related.map((u) => {
        const RIcon = iconFor(u.icon);
        return (
          <RelatedResourceCardLink
            key={u.slug}
            href={`/case-studies/use-cases/${u.slug}`}
            imageSrc={u.image}
            title={u.title}
            description={u.outcome}
            icon={RIcon}
          />
        );
      })}
    </RelatedResourceCardsSection>
  );
}
