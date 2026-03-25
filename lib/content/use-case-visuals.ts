/**
 * Visual storytelling assets for `/case-studies/use-cases/[slug]`.
 *
 * Gemini scripts:
 *   `pnpm run generate:use-case-challenges` → challenge/{slug}.jpg (1:1)
 *   `pnpm run generate:use-case-story`     → phases/{slug}-p1.jpg, -p2.jpg; story/{slug}-*.jpg
 *
 * Optional per-slug overrides: `useCaseVisualOverrides`.
 */

/** Public URL for Gemini-generated "The challenge" illustration (1:1). */
export function caseChallengeImagePath(slug: string): string {
  return `/images/case-studies/use-cases/challenge/${slug}.jpg`;
}

/** Phase art (1:1), one file per phase index (1-based). Generator currently emits p1–p2. */
export function casePhaseImagePath(slug: string, phaseIndex1: number): string {
  const capped = Math.min(Math.max(phaseIndex1, 1), 2);
  return `/images/case-studies/use-cases/phases/${slug}-p${capped}.jpg`;
}

export function caseStoryImplementationsImagePath(slug: string): string {
  return `/images/case-studies/use-cases/story/${slug}-implementations.jpg`;
}

export function caseStoryTechnicalImagePath(slug: string): string {
  return `/images/case-studies/use-cases/story/${slug}-technical.jpg`;
}

export function caseStoryImpactImagePath(slug: string): string {
  return `/images/case-studies/use-cases/story/${slug}-impact.jpg`;
}

/** Intro image — grounded variation of the outcome card for the section after the header. */
export function caseStoryIntroImagePath(slug: string): string {
  return `/images/case-studies/use-cases/story/${slug}-intro.jpg`;
}

export type UseCaseVisualSet = {
  introImage: string;
  challengeImage: string;
  phaseImages: string[];
  keyImplementationsImage: string;
  technicalInnovationImage: string;
  impactImage: string;
};

type Override = Partial<{
  introImage: string;
  challengeImage: string;
  phaseImages: string[];
  keyImplementationsImage: string;
  technicalInnovationImage: string;
  impactImage: string;
}>;

/** Per-slug overrides — prefer explicit paths as art is produced. */
export const useCaseVisualOverrides: Record<string, Override> = {};

export function resolveUseCaseVisualSet(
  slug: string,
  outcomeCardImage: string,
  phaseCount: number
): UseCaseVisualSet {
  const o = useCaseVisualOverrides[slug] ?? {};
  const challengeDefault = caseChallengeImagePath(slug);
  const phases = Array.from({ length: phaseCount }, (_, i) => {
    const list = o.phaseImages;
    if (list?.[i]) return list[i]!;
    if (list?.[0]) return list[0]!;
    return casePhaseImagePath(slug, i + 1);
  });
  return {
    introImage: o.introImage ?? caseStoryIntroImagePath(slug),
    challengeImage: o.challengeImage ?? challengeDefault,
    phaseImages: phases,
    keyImplementationsImage: o.keyImplementationsImage ?? caseStoryImplementationsImagePath(slug),
    technicalInnovationImage: o.technicalInnovationImage ?? caseStoryTechnicalImagePath(slug),
    impactImage: o.impactImage ?? caseStoryImpactImagePath(slug),
  };
}
