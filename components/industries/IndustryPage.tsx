"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaqMonochrome } from "@/components/ui/faq-monochrome";
import Image from "next/image";
import { ArrowRight, Target, Zap } from "lucide-react";
import ContactModal from "@/components/landing/ContactModal";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/seo/schema";
import { createScrollDepthTracking, trackServicePageView } from "@/lib/analytics/events";
import type { IndustryConfig } from "@/lib/content/industries/types";
import type { IndustryVisualThemeKey } from "@/components/shared/industry-card-themes";
import {
  IndustryGetStartedCard,
  industryGetStartedGridClassName,
} from "@/components/industries/IndustryGetStartedCard";
import {
  IndustrySolutionsSection,
  type IndustryCapability,
} from "@/components/industries/IndustrySolutionsSection";
import {
  RelatedResourceCardLink,
  RelatedResourceCardsSection,
} from "@/components/case-studies/use-case-study/related-resource-card";
import { getExploreOtherIndustries } from "@/lib/content/industries/all-industries-explore";
import { getIndustryRelatedCardImageSrc } from "@/lib/industry-related-card-image";

export type { IndustryCapability };

export type IndustryComplianceItem = {
  icon: LucideIcon;
  label: string;
};

export type IndustryPageTokens = {
  heroBg: string;
  heroBorder: string;
  accent: string;
  accentHover: string;
  cta: string;
  ctaText: string;
  subtext: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  pulseDot: string;
  /** Full class string for hero image gradient overlay, e.g. from-slate-900/80 */
  heroOverlayClassName: string;
  outlineButtonHoverBgClass: string;
  ctaShadowColor: string;
};

export type IndustryPageProps = {
  config: IndustryConfig;
  tokens: IndustryPageTokens;
  heroImageSrc: string;
  headlineAccent: string;
  headlineRest: string;
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
  complianceEyebrow: string;
  complianceHeadline: string;
  complianceItems: IndustryComplianceItem[];
  capabilities: IndustryCapability[];
  serviceSchemaName: string;
  serviceType: string;
  trackEventName: string;
  breadcrumbLabel: string;
  breadcrumbUrl: string;
  faqValuePrefix: string;
  /** Visual tokens for Get Started cards (aligned with homepage industry accordion system). */
  getStartedVisualTheme: IndustryVisualThemeKey;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function IndustryPage({
  config,
  tokens,
  heroImageSrc,
  headlineAccent,
  headlineRest,
  capabilitiesTitle,
  capabilitiesSubtitle,
  complianceEyebrow,
  complianceHeadline,
  complianceItems,
  capabilities,
  serviceSchemaName,
  serviceType,
  trackEventName,
  breadcrumbLabel,
  breadcrumbUrl,
  faqValuePrefix,
  getStartedVisualTheme,
}: IndustryPageProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  const faqsForAccordion = config.faqs.questions.map((q) => ({
    q: q.question,
    a: q.answer,
  }));

  const exploreOtherIndustries = getExploreOtherIndustries(breadcrumbUrl);

  useEffect(() => {
    trackServicePageView(trackEventName);
    return createScrollDepthTracking();
  }, [trackEventName]);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: serviceSchemaName,
          description: config.metadata.description,
          url: config.metadata.url,
          serviceType,
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
          { name: breadcrumbLabel, url: breadcrumbUrl },
        ])}
      />

      <div className="min-h-screen bg-[var(--background)]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header onContactClick={openContact} />

        <main id="main-content" role="main">
          <section className="relative overflow-hidden" style={{ backgroundColor: tokens.heroBg }}>
            <div className="absolute inset-0">
              <Image
                src={heroImageSrc}
                alt=""
                fill
                className="object-cover opacity-40"
                priority
              />
              {/* Dark scrim improves text contrast on busy photography without hiding the scene */}
              <div className="absolute inset-0 bg-black/35" aria-hidden />
              <div className={`absolute inset-0 bg-gradient-to-b ${tokens.heroOverlayClassName}`} aria-hidden />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-40">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="mx-auto max-w-4xl text-center"
              >
                <motion.div variants={fadeUp} custom={0}>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                    style={{
                      borderColor: tokens.badgeBorder,
                      backgroundColor: tokens.badgeBg,
                      color: tokens.badgeText,
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full"
                      style={{ backgroundColor: tokens.pulseDot }}
                    />
                    {config.hero.badge}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  <span style={{ color: tokens.accent }}>{headlineAccent}</span> {headlineRest}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-200 md:text-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
                >
                  {config.hero.subtitle}
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  {config.hero.description}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Button
                    size="lg"
                    onClick={openContact}
                    className="rounded-lg px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{
                      backgroundColor: tokens.cta,
                      color: tokens.ctaText,
                      boxShadow: `0 10px 15px -3px rgba(${tokens.ctaShadowColor}, 0.25)`,
                    }}
                  >
                    {config.hero.primaryCTAText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() =>
                      document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`rounded-lg border border-solid px-8 py-6 text-base font-semibold text-white shadow-none transition-all duration-300 hover:text-white ${tokens.outlineButtonHoverBgClass}`}
                    style={{
                      borderColor: tokens.heroBorder,
                    }}
                  >
                    Explore Capabilities
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  custom={5}
                  className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t pt-10 md:grid-cols-4"
                  style={{ borderColor: tokens.heroBorder }}
                >
                  {config.hero.trustIndicators.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white md:text-3xl">{m.metric}</div>
                      <div className="mt-1 text-xs text-slate-300 md:text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.75)]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <IndustrySolutionsSection
            accent={tokens.accent}
            capabilities={capabilities}
            capabilitiesTitle={capabilitiesTitle}
            capabilitiesSubtitle={capabilitiesSubtitle}
          />

          <section className="border-y border-[var(--border)] bg-[var(--muted)] py-12">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-8 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: tokens.accent }}>
                  {complianceEyebrow}
                </h3>
                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{complianceHeadline}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {complianceItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center"
                    >
                      <Icon className="h-5 w-5" style={{ color: tokens.accent }} />
                      <span className="text-xs font-semibold text-[var(--foreground)]">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Case studies + mid-page CTA removed — solutions now link to dedicated use case pages */}

          <section className="bg-[var(--background)] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4">
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
                  style={{ color: tokens.accent }}
                >
                  Why Innovoco
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  {config.differentiators.title}
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-3 max-w-2xl text-lg text-[#64748B]">
                  {config.differentiators.description}
                </motion.p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {config.differentiators.items.map((d, idx) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={idx * 0.5}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-shadow duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${tokens.accent}1a` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: tokens.accent }} />
                        </div>
                        <div>
                          {d.metric ? (
                            <p className="text-sm font-semibold" style={{ color: tokens.accent }}>
                              {d.metric}
                            </p>
                          ) : null}
                          <h3 className={`text-lg font-bold text-[var(--foreground)] ${d.metric ? "mt-1" : ""}`}>
                            {d.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{d.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Prioritization Workshop CTA */}
          {config.actionCTA.prioritization ? (
            <section className="relative overflow-hidden">
              <Image
                src={config.actionCTA.prioritization.bgImage ?? "/images/case-studies/cta-prioritization-bg.jpg"}
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

              <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {config.actionCTA.prioritization.headline}
                  <br />
                  <span className="bg-linear-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent">
                    {config.actionCTA.prioritization.headlineAccent}
                  </span>
                </h2>

                <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                  {config.actionCTA.prioritization.subline}
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                  <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
                      <Target className="h-5 w-5 text-sky-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Strategic Roadmap</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                      {config.actionCTA.prioritization.strategic}
                    </p>
                  </div>

                  <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/15">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                      <Zap className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Quick Wins</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                      {config.actionCTA.prioritization.quickWins}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-neutral-100 hover:scale-105 hover:shadow-[0_12px_44px_rgba(255,255,255,0.3)]"
                  >
                    Schedule Your AI Briefing
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </div>
                <p className="mt-4 text-sm text-white/60 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                  60 min · Free · No obligation
                </p>
              </div>
            </section>
          ) : (
            <section className="bg-[var(--background)] py-20 md:py-28">
              <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">Get Started</h2>
                  <p className="mx-auto mt-3 max-w-xl text-lg text-[#64748B]">{config.actionCTA.subtitle}</p>
                </div>
                <div className={industryGetStartedGridClassName}>
                  {config.actionCTA.cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <IndustryGetStartedCard
                        key={idx}
                        theme={getStartedVisualTheme}
                        icon={Icon}
                        tag={card.tag}
                        title={card.title}
                        description={card.description}
                        action={card.action}
                        onAction={openContact}
                        buttonBackground={tokens.cta}
                        buttonForeground={tokens.ctaText}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          <SchemaMarkup
            schema={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqsForAccordion.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }}
          />

          <FaqMonochrome
            title={config.faqs.title}
            subtitle={config.faqs.description}
            items={faqsForAccordion.map((f) => ({
              question: f.q,
              answer: f.a,
            }))}
          />

          <RelatedResourceCardsSection
            heading="Explore Other Industries"
            description="Discover how we deliver intelligent automation across multiple sectors."
            variant="carousel"
          >
            {exploreOtherIndustries.map((ind) => {
              const Icon = ind.icon;
              return (
                <RelatedResourceCardLink
                  key={ind.href}
                  href={ind.href}
                  imageSrc={getIndustryRelatedCardImageSrc(ind.href, ind.image)}
                  title={ind.title}
                  description={ind.description}
                  icon={Icon}
                />
              );
            })}
          </RelatedResourceCardsSection>

          {/* Final CTA removed — consolidated into prioritization workshop CTA above */}
        </main>

        <Footer />
      </div>

      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
