"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

export type IndustryCapability = {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
};

export type IndustryComplianceItem = {
  icon: LucideIcon;
  label: string;
};

export type IndustryBloombergTokens = {
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

export type IndustryBloombergClasses = {
  relatedCardHoverBorder: string;
};

export type IndustryBloombergPageProps = {
  config: IndustryConfig;
  tokens: IndustryBloombergTokens;
  classes: IndustryBloombergClasses;
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

export function IndustryBloombergPage({
  config,
  tokens,
  classes,
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
}: IndustryBloombergPageProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  const faqsForAccordion = config.faqs.questions.map((q) => ({
    q: q.question,
    a: q.answer,
  }));

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

          <section id="capabilities" className="bg-[var(--background)] py-20 md:py-28">
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
                  return (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                      className={`flex flex-col items-center gap-10 lg:gap-16 ${
                        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                      }`}
                    >
                      <div className="flex-1 space-y-5">
                        <motion.div variants={fadeUp} className="flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${tokens.accent}1a` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: tokens.accent }} />
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
                          <Button
                            variant="ghost"
                            onClick={openContact}
                            className="group px-0 font-semibold hover:bg-transparent"
                            style={{ color: tokens.accent }}
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      </div>

                      <motion.div
                        variants={fadeUp}
                        custom={2}
                        className="w-full max-w-md shrink-0 lg:w-[380px]"
                      >
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
                          <div className="space-y-6">
                            {cap.stats.map((s, si) => (
                              <div key={si} className="flex items-center justify-between gap-4">
                                <span className="text-sm text-[#64748B]">{s.label}</span>
                                <span className="text-xl font-bold text-[var(--foreground)]">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

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
                  {config.caseStudies.badge}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  {config.caseStudies.title}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-[#64748B]"
                >
                  {config.caseStudies.description}
                </motion.p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                {config.caseStudies.studies.map((cs, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    custom={idx * 0.5}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="border-b border-[var(--border)] px-8 py-5">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${tokens.accent}1a`, color: tokens.accent }}
                      >
                        {cs.industry.split("|")[0]?.trim() ?? cs.industry}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-[var(--foreground)]">{cs.title}</h3>
                    </div>
                    <div className="flex flex-1 flex-col px-8 py-6">
                      <div className="mb-4">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                          Challenge
                        </h4>
                        <p className="text-sm leading-relaxed text-[#64748B]">{cs.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                          Solution
                        </h4>
                        <p className="text-sm leading-relaxed text-[#64748B]">{cs.solution}</p>
                      </div>
                      <div className="mt-auto grid grid-cols-3 gap-3 rounded-xl bg-[var(--muted)] p-4">
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="text-center">
                            <div className="text-lg font-bold" style={{ color: tokens.accent }}>
                              {r.metric}
                            </div>
                            <div className="mt-0.5 text-xs text-[#64748B]">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20" style={{ backgroundColor: tokens.heroBg }}>
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                {config.sectionCTAs.afterCaseStudies.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg" style={{ color: tokens.subtext }}>
                {config.sectionCTAs.afterCaseStudies.subtitle}
              </p>
              <Button
                size="lg"
                onClick={openContact}
                className="mt-8 rounded-lg px-10 py-6 text-base font-semibold shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: tokens.cta,
                  color: tokens.ctaText,
                  boxShadow: `0 10px 15px -3px rgba(${tokens.ctaShadowColor}, 0.25)`,
                }}
              >
                {config.sectionCTAs.afterCaseStudies.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>

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

          <section
            className="border-t border-[var(--border)] bg-[var(--muted)] py-20 md:py-28"
            style={{ "--industry-faq-accent": tokens.accent } as CSSProperties}
          >
            <div className="mx-auto max-w-3xl px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="mb-12 text-center"
              >
                <motion.h2 variants={fadeUp} className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  {config.faqs.title}
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="mx-auto mt-3 max-w-xl text-pretty text-lg text-[#64748B]">
                  {config.faqs.description}
                </motion.p>
              </motion.div>

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

              <Accordion type="single" collapsible className="space-y-3">
                {faqsForAccordion.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`${faqValuePrefix}-${i}`}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 transition-shadow hover:shadow-sm"
                  >
                    <AccordionTrigger className="py-5 text-left font-semibold text-[var(--foreground)] hover:no-underline hover:text-[color:var(--industry-faq-accent)]">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-1 text-sm leading-relaxed text-[#64748B]">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

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

          <section className="border-t border-[var(--border)] bg-[var(--muted)] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">Explore Other Industries</h2>
                <p className="mx-auto mt-3 max-w-xl text-lg text-[#64748B]">
                  Discover how we deliver intelligent automation across multiple sectors.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {config.relatedIndustries.map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <Link
                      key={idx}
                      href={ind.href}
                      className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:shadow-lg ${classes.relatedCardHoverBorder}`}
                    >
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:opacity-90"
                        style={{ backgroundColor: `${tokens.accent}1a` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: tokens.accent }} />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--foreground)]">{ind.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">{ind.description}</p>
                      <div
                        className="mt-6 flex items-center text-sm font-semibold transition-colors"
                        style={{ color: tokens.accent }}
                      >
                        Explore Solutions
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20 py-20" style={{ backgroundColor: tokens.heroBg }}>
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">{config.actionCTA.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg" style={{ color: tokens.subtext }}>
                {config.actionCTA.footerText ?? config.sectionCTAs.afterFAQs.subtitle}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={openContact}
                  className="rounded-lg px-10 py-6 text-base font-semibold shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: tokens.cta,
                    color: tokens.ctaText,
                    boxShadow: `0 10px 15px -3px rgba(${tokens.ctaShadowColor}, 0.25)`,
                  }}
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
