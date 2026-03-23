"use client";

import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Lock, Zap, Award, MessageCircle } from "lucide-react";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/seo/schema";
import { useEffect, useState } from "react";
import { trackServicePageView, useScrollDepthTracking } from "@/lib/analytics/events";
import { manufacturingConfig } from "@/lib/content/industries/manufacturing";

/* ─── animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function ManufacturingPageClient() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  useEffect(() => {
    trackServicePageView("Manufacturing Industry Solutions");
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Manufacturing AI Automation & Analytics Solutions",
          description: manufacturingConfig.metadata.description,
          url: manufacturingConfig.metadata.url,
          serviceType: "Manufacturing AI Solutions",
        })}
      />

      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
          { name: "Manufacturing", url: "https://innovoco.com/solutions/industries/manufacturing" },
        ])}
      />

      <main id="main-content" role="main" className="w-full">
        {/* ─── HERO SECTION ─── */}
        <section
          className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
          aria-label="Manufacturing AI Solutions Hero"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/images/industries/manufacturing-hero.jpg)" }}
            aria-hidden="true"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/80" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,191,36,0.04)_1px,transparent_1px),linear-gradient(rgba(251,191,36,0.04)_1px,transparent_1px)]"
            style={{ backgroundSize: "50px 50px" }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 flex items-center gap-3">
              <div className="h-1 w-12 bg-amber-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                {manufacturingConfig.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="mb-6 max-w-4xl font-serif text-5xl font-bold text-white leading-tight sm:text-6xl"
            >
              {manufacturingConfig.hero.title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.2}
              className="mb-8 max-w-2xl text-xl text-slate-300"
            >
              {manufacturingConfig.hero.subtitle}
            </motion.p>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.3}
              className="mb-10 max-w-3xl text-base leading-relaxed text-slate-400"
            >
              {manufacturingConfig.hero.description}
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.4}
              className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {manufacturingConfig.hero.trustIndicators.map((indicator, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  custom={i}
                  className="rounded-lg border border-amber-400/25 bg-amber-400/5 px-4 py-4"
                >
                  <div className="text-2xl font-bold text-amber-400">{indicator.metric}</div>
                  <div className="text-xs font-semibold text-slate-400">{indicator.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.5}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/25 hover:scale-105"
              >
                {manufacturingConfig.hero.primaryCTAText}
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-8 py-4 font-semibold text-slate-100 transition-all hover:border-amber-400/50 hover:bg-amber-400/5"
              >
                Explore Capabilities
                <ChevronRight size={18} />
              </a>
            </motion.div>

            {/* Skip to content */}
            <a href="#main-content" className="sr-only focus:not-sr-only">
              Skip to main content
            </a>
          </div>
        </section>

        {/* ─── CAPABILITIES SECTION ─── */}
        <section
          id="capabilities"
          className="relative w-full bg-white py-20 sm:py-28 lg:py-32"
          aria-label="Manufacturing AI Capabilities"
        >
          <div className="mx-auto max-w-6xl px-6">
            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
                <Zap size={16} className="text-amber-700" />
                <span className="text-sm font-semibold text-amber-800">Core Capabilities</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">
                Industry 4.0 AI Solutions
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Transform manufacturing operations with predictive maintenance, quality control AI, and supply chain optimization.
              </p>
            </motion.div>

            {/* Capabilities grid - alternating layout */}
            <div className="space-y-16 lg:space-y-24">
              {/* Capability 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="grid gap-12 items-center lg:grid-cols-2"
              >
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-slate-950">Predictive Maintenance</h3>
                  <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                    AI-powered equipment health monitoring predicts failures 7-14 days in advance with 85-95% accuracy. IoT sensors track vibration, temperature, and acoustic signatures enabling proactive maintenance scheduling.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">30-50% reduction in unplanned downtime</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">20-25% maintenance cost savings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">10-15% equipment lifespan extension</span>
                    </li>
                  </ul>
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-slate-700">
                      <strong>ROI Timeline:</strong> 6-12 months | <strong>Avg Savings:</strong> $2-5M annually for mid-size manufacturers
                    </p>
                  </div>
                </div>
                <motion.div
                  variants={slideInRight}
                  className="relative h-96 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Zap size={64} className="mx-auto mb-4 text-orange-500 opacity-20" />
                      <p className="text-slate-600 font-semibold">Equipment Health Dashboard</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Capability 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="grid gap-12 items-center lg:grid-cols-2 lg:direction-reverse"
              >
                <motion.div
                  variants={slideInRight}
                  className="relative h-96 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden lg:order-2"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Award size={64} className="mx-auto mb-4 text-orange-500 opacity-20" />
                      <p className="text-slate-600 font-semibold">Vision Quality Control</p>
                    </div>
                  </div>
                </motion.div>
                <div className="lg:order-1">
                  <h3 className="mb-4 text-3xl font-bold text-slate-950">Computer Vision Quality Control</h3>
                  <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                    Deep learning models detect surface defects, component placement errors, and soldering issues at 10x speed of manual inspection. Achieves 99%+ defect detection rates with minimal false positives.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">99.5% defect detection accuracy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">85% inspection time reduction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">$2-3M annual quality cost savings</span>
                    </li>
                  </ul>
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-slate-700">
                      <strong>ROI Timeline:</strong> 3-6 months | <strong>Implementation:</strong> 4-8 weeks
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Capability 3 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="grid gap-12 items-center lg:grid-cols-2"
              >
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-slate-950">Supply Chain Optimization</h3>
                  <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                    ML-powered demand forecasting combining historical sales, seasonality, promotions, weather, and economic indicators. Automated replenishment with supplier integration reduces inventory costs and stockouts.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">22% forecast error reduction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">$4-5M inventory cost savings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">40% stockout reduction</span>
                    </li>
                  </ul>
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-slate-700">
                      <strong>ROI Timeline:</strong> 4-8 months | <strong>Avg Savings:</strong> $3-6M annually
                    </p>
                  </div>
                </div>
                <motion.div
                  variants={slideInRight}
                  className="relative h-96 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Zap size={64} className="mx-auto mb-4 text-orange-500 opacity-20" />
                      <p className="text-slate-600 font-semibold">Supply Chain Intelligence</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── COMPLIANCE STRIP ─── */}
        <section className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid gap-8 sm:grid-cols-3 text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <Lock size={32} className="text-amber-400" />
                <div>
                  <p className="font-bold text-white">ISA/IEC 62443 Compliant</p>
                  <p className="text-sm text-slate-400">Industrial cybersecurity standards</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Award size={32} className="text-amber-400" />
                <div>
                  <p className="font-bold text-white">100+ Implementations</p>
                  <p className="text-sm text-slate-400">Proven across discrete & process</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Zap size={32} className="text-amber-400" />
                <div>
                  <p className="font-bold text-white">24/7 Monitoring</p>
                  <p className="text-sm text-slate-400">Production continuity guaranteed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── CASE STUDIES SECTION ─── */}
        <section
          className="relative w-full bg-white py-20 sm:py-28 lg:py-32"
          aria-label="Manufacturing Success Stories"
        >
          <div className="mx-auto max-w-6xl px-6">
            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
                <Award size={16} className="text-amber-700" />
                <span className="text-sm font-semibold text-amber-800">{manufacturingConfig.caseStudies.badge}</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">
                {manufacturingConfig.caseStudies.title}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                {manufacturingConfig.caseStudies.description}
              </p>
            </motion.div>

            {/* Cases grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {manufacturingConfig.caseStudies.studies.map((study, i) => {
                const IconComponent = study.icon;
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleUp}
                    custom={i}
                    className="group rounded-xl border border-slate-200 bg-white p-8 transition-all hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/50"
                  >
                    <div className={`${study.iconGradient} mb-4 inline-flex w-12 h-12 items-center justify-center rounded-lg`}>
                      <IconComponent size={24} className="text-slate-950" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-950">{study.title}</h3>
                    <p className="mb-4 text-sm font-semibold text-amber-700">{study.industry}</p>
                    <div className="mb-6 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Challenge</p>
                        <p className="text-sm text-slate-600">{study.challenge}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Solution</p>
                        <p className="text-sm text-slate-600">{study.solution}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 pt-6 border-t border-slate-100">
                      {study.results.map((result, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div>
                            <p className="font-bold text-amber-700">{result.metric}</p>
                            <p className="text-xs text-slate-600">{result.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── MID-PAGE CTA ─── */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,191,36,0.04)_1px,transparent_1px),linear-gradient(rgba(251,191,36,0.04)_1px,transparent_1px)]" style={{ backgroundSize: "50px 50px" }} aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Transform Manufacturing Operations with AI
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Schedule a 60-minute consultation to identify high-ROI opportunities for your manufacturing facility.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition-all hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/25 hover:scale-105 mt-8"
              >
                Start Your Assessment
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ SECTION ─── */}
        <section className="relative w-full bg-white py-20 sm:py-28 lg:py-32" aria-label="Manufacturing FAQs">
          <div className="mx-auto max-w-4xl px-6">
            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
                <MessageCircle size={16} className="text-amber-700" />
                <span className="text-sm font-semibold text-amber-800">FAQs</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-slate-950 sm:text-5xl">
                {manufacturingConfig.faqs.title}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                {manufacturingConfig.faqs.description}
              </p>
            </motion.div>

            {/* FAQ items */}
            <div className="space-y-4">
              {manufacturingConfig.faqs.questions.map((faq, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-lg border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 bg-slate-50 p-6 text-left hover:bg-amber-50 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-950 text-lg">{faq.question}</h3>
                    <div
                      className={`flex-shrink-0 text-amber-600 transition-transform duration-300 ${expandedFAQ === i ? "rotate-180" : ""}`}
                    >
                      <ChevronRight size={24} />
                    </div>
                  </button>
                  {expandedFAQ === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-200 bg-white p-6"
                    >
                      <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Schema markup for FAQs */}
            <SchemaMarkup
              schema={{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: manufacturingConfig.faqs.questions.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }}
            />
          </div>
        </section>

        {/* ─── FINAL CTA SECTION ─── */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px)]" style={{ backgroundSize: "50px 50px" }} aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                Ready to Transform Manufacturing with AI?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Choose your next step toward Industry 4.0 excellence
              </p>
            </motion.div>

            {/* Action cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {manufacturingConfig.actionCTA.cards.map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <motion.a
                    key={i}
                    href="#contact"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleUp}
                    custom={i}
                    className="group relative rounded-xl border border-white/10 bg-slate-800/60 p-8 hover:border-amber-400/40 hover:bg-slate-800 transition-all"
                  >
                    {/* Top-right badge */}
                    <div className="absolute top-5 right-5 rounded-full bg-amber-400/15 px-3 py-1 border border-amber-400/25">
                      <span className="text-xs font-semibold text-amber-300">{card.tag}</span>
                    </div>
                    <div className={`${card.gradient} mb-5 inline-flex w-12 h-12 items-center justify-center rounded-lg`}>
                      <IconComponent size={24} className="text-slate-950" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white pr-20">{card.title}</h3>
                    <p className="mb-6 text-sm text-slate-400 leading-relaxed">{card.description}</p>
                    <div className="flex items-center gap-2 font-semibold text-amber-400 group-hover:gap-3 transition-all">
                      {card.action}
                      <ChevronRight size={18} />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Footer text */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-12 text-center text-sm text-slate-400"
            >
              {manufacturingConfig.actionCTA.footerText}
            </motion.p>
          </div>
        </section>
      </main>
    </>
  );
}
