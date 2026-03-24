"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { withIndustrySolutionImageCacheBust } from "@/lib/industry-solution-image-cache";

export type IndustryCapability = {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  illustrationSrc?: string;
  /** Slug linking to /case-studies/use-cases/[slug] */
  useCaseSlug: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export type IndustrySolutionsSectionProps = {
  accent: string;
  capabilities: IndustryCapability[];
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
};

/**
 * Shared “Our Solutions” block: alternating text + optional illustration,
 * metrics as dl under the description (same layout on all industry pages).
 * Each capability links to its dedicated use case page.
 */
export function IndustrySolutionsSection({
  accent,
  capabilities,
  capabilitiesTitle,
  capabilitiesSubtitle,
}: IndustrySolutionsSectionProps) {
  return (
    <section id="capabilities" className="bg-[var(--background)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: accent }}
          >
            Our Solutions
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl lg:text-5xl"
          >
            {capabilitiesTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#64748B]"
          >
            {capabilitiesSubtitle}
          </motion.p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            const isReversed = idx % 2 === 1;
            const hasImage = Boolean(cap.illustrationSrc);
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className={`flex flex-col gap-10 lg:gap-16 ${
                  hasImage
                    ? `items-center lg:items-start ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`
                    : "mx-auto max-w-3xl"
                }`}
              >
                <div className={`space-y-5 ${hasImage ? "flex-1" : "w-full"}`}>
                  <motion.div variants={fadeUp} className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${accent}1a` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">{cap.title}</h3>
                  </motion.div>
                  <motion.p
                    variants={fadeUp}
                    custom={1}
                    className="max-w-xl text-base leading-relaxed text-[#64748B] md:text-lg"
                  >
                    {cap.description}
                  </motion.p>
                  <motion.div variants={fadeUp} custom={2}>
                    <dl
                      className={`grid max-w-xl gap-4 border-t border-[var(--border)] pt-5 ${
                        cap.stats.length >= 4
                          ? "sm:grid-cols-2 lg:grid-cols-4"
                          : "sm:grid-cols-3"
                      } sm:gap-6`}
                    >
                      {cap.stats.map((s, si) => (
                        <div key={si}>
                          <dt className="text-xs font-medium uppercase tracking-wide text-[#64748B]">
                            {s.label}
                          </dt>
                          <dd className="mt-1 text-lg font-bold tabular-nums text-[var(--foreground)] md:text-xl">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                  <motion.div variants={fadeUp} custom={3}>
                    <Link
                      href={`/case-studies/use-cases/${cap.useCaseSlug}`}
                      className="group inline-flex items-center font-semibold transition-colors"
                      style={{ color: accent }}
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>

                {hasImage ? (
                  <motion.div
                    variants={fadeUp}
                    custom={2}
                    className="w-full max-w-md shrink-0 lg:w-[420px]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)] shadow-md">
                      <Image
                        src={withIndustrySolutionImageCacheBust(
                          cap.illustrationSrc!,
                        )}
                        alt={cap.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 420px"
                      />
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
