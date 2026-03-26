"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  Lock,
  Clock,
  Users,
  Wrench,
  Rocket,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import ContactModal from "@/components/landing/ContactModal";
import { FaqMonochrome } from "@/components/ui/faq-monochrome";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import {
  createBreadcrumbSchema,
  createServiceSchema,
  organizationSchema,
} from "@/lib/seo/schema";

/* ─── animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

/* ─── data ─── */
const problems = [
  {
    icon: AlertTriangle,
    title: "Pilot Purgatory",
    description:
      "80% of AI POCs never reach production. Models sit in notebooks while the business waits for impact that never arrives. The gap isn't the technology — it's the path from experiment to operations.",
  },
  {
    icon: Lock,
    title: "Data Debt",
    description:
      "Legacy warehouses, siloed systems, and ungoverned data create a foundation too fragile for AI. You can't build intelligence on top of chaos — garbage in, hallucinations out.",
  },
  {
    icon: Clock,
    title: "Vendor Lock-In",
    description:
      "Single-cloud, single-model solutions that become liabilities when pricing changes or capabilities shift. Your AI strategy needs optionality, not dependency on one provider's roadmap.",
  },
];

const processSteps = [
  {
    phase: "Discover",
    duration: "2 weeks",
    description:
      "AI readiness assessment, data audit, and use-case prioritization workshop. You walk out with a ranked roadmap — not a 200-page deck.",
    deliverable: "Prioritized AI Roadmap",
    icon: Target,
    serviceLink: "/services/ai-strategy-consulting",
    serviceName: "AI Strategy & Consulting",
  },
  {
    phase: "Design",
    duration: "2–4 weeks",
    description:
      "Architecture design, model selection, integration planning, and security review. Every decision documented so there are no surprises in build.",
    deliverable: "Technical Blueprint",
    icon: Wrench,
    serviceLink: "/services/data-engineering-modernization",
    serviceName: "Data Engineering",
  },
  {
    phase: "Deliver",
    duration: "8–12 weeks",
    description:
      "Agile build with weekly demos. Your team sees working software every Friday — not a big-bang reveal six months from now.",
    deliverable: "Production-Ready System",
    icon: Rocket,
    serviceLink: "/services/ai-implementation",
    serviceName: "AI Implementation",
  },
  {
    phase: "Optimize",
    duration: "Ongoing",
    description:
      "24/7 monitoring, automated retraining, and continuous improvement. We keep your AI sharp, your costs down, and your compliance current.",
    deliverable: "SLA-Backed Support",
    icon: Shield,
    serviceLink: "/services/managed-ai-services",
    serviceName: "Managed AI Ops",
  },
];

const differentiators = [
  {
    icon: Users,
    title: "Senior-Led Teams",
    metric: "10+ Yrs Avg Experience",
    description:
      "You work with our architects and principals, not junior consultants passed off as experts. Every engagement is led by someone who has shipped enterprise AI — not just studied it.",
  },
  {
    icon: Wrench,
    title: "Technology Agnostic",
    metric: "Multi-Cloud & Multi-Model",
    description:
      "AWS, Azure, GCP. OpenAI, Anthropic, open-source. We pick what's right for your use case and your constraints — not what pays us commissions or locks you into our stack.",
  },
  {
    icon: Rocket,
    title: "12-Week Delivery",
    metric: "3x Faster Than Big 4",
    description:
      "POC to production in 12 weeks. Not 12 months of assessments before writing a single line of code. Weekly demos, not quarterly status reports. Working software, not slide decks.",
  },
  {
    icon: Target,
    title: "Outcome-Based Engagement",
    metric: "171% Avg Client ROI",
    description:
      "We tie our success to your KPIs. Clear milestones, measurable outcomes, and transparent reporting at every stage. If the needle doesn't move, we haven't done our job.",
  },
];

const featuredCaseStudies = [
  {
    title: "AI-Powered Business Intelligence",
    outcome:
      "Ask questions in plain language, get governed answers with charts — no analysts, no ticket queue.",
    tag: "Speed",
    metric: "64% Faster Decisions",
    href: "/case-studies/use-cases/executive-self-serve-analytics",
    image: "/images/case-studies/outcomes/executive-analytics.jpg",
  },
  {
    title: "Predictive Maintenance",
    outcome:
      "AI-powered equipment health monitoring that predicts failures 7–14 days in advance with 85–95% accuracy.",
    tag: "Cost",
    metric: "30–50% Less Downtime",
    href: "/case-studies/use-cases/predictive-maintenance-manufacturing",
    image: "/images/case-studies/outcomes/predictive-maintenance-manufacturing.jpg",
  },
  {
    title: "Customer 360 & Identity Resolution",
    outcome:
      "One golden customer record powering hyper-personalization and 25–35% more accurate lifetime value predictions.",
    tag: "CX",
    metric: "28% Revenue Lift",
    href: "/case-studies/use-cases/customer-360-identity-resolution",
    image: "/images/case-studies/outcomes/customer-360-identity-resolution.jpg",
  },
];

const faqItems = [
  {
    question: "How much does AI consulting cost?",
    answer:
      "Engagements typically range from $50K for a focused strategy workshop and roadmap to $500K+ for full-scale enterprise implementation. We structure every engagement around measurable outcomes — you see ROI projections before committing.",
  },
  {
    question: "How long does an AI implementation take?",
    answer:
      "Our standard delivery is 12 weeks from kickoff to production. Strategy and roadmapping takes 2–4 weeks. Complex enterprise-wide transformations may extend to 16–20 weeks, but you see working demos every week from week 3.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have deep domain expertise in financial services, healthcare, manufacturing, retail, insurance, energy, construction, and government. Each vertical has dedicated solution architects who understand the regulatory and operational nuances.",
  },
  {
    question: "Do you work with existing data teams or replace them?",
    answer:
      "We augment, not replace. Our model is designed to up-skill your team while delivering. Knowledge transfer is built into every engagement — we aim to make ourselves unnecessary within 12–18 months.",
  },
  {
    question: "What's the typical ROI of an AI project?",
    answer:
      "Our clients see an average 171% ROI within the first year. This comes from a combination of cost reduction (40% avg infrastructure savings), revenue acceleration (28% avg from better personalization), and operational efficiency (3x faster insights).",
  },
  {
    question: "How do you handle AI governance and compliance?",
    answer:
      "Every project includes governance by design — GDPR, HIPAA, CCPA, SOX compliance frameworks, bias auditing, model explainability, and immutable audit trails. We don't bolt security on after; it's architected from day one.",
  },
  {
    question: "Can you work with our existing cloud infrastructure?",
    answer:
      "Absolutely. We're certified across AWS, Azure, and GCP, and work with Snowflake, Databricks, and all major data platforms. We optimize what you have before recommending new tools — zero-downtime migration is our specialty.",
  },
  {
    question: "What's the difference between AI consulting and AI staffing?",
    answer:
      "AI staffing gives you bodies. AI consulting gives you outcomes. We bring a proven delivery framework, reusable accelerators, and cross-industry best practices that individual hires can't replicate. You get a team with 500+ deployments of institutional knowledge.",
  },
];

/* ─── component ─── */
export function ServicesHubClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  return (
    <>
      {/* Schema */}
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
        ])}
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Enterprise AI Consulting Services",
          description:
            "End-to-end AI consulting: strategy, agentic AI, data engineering, and managed operations for global enterprises.",
          url: "https://innovoco.com/services",
          serviceType: "AI Consulting",
        })}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <div className="min-h-screen bg-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header onContactClick={openContact} customLogo="/images/logos/innovoco-ai-hires.png" />

        <main id="main-content" role="main">

          {/* ═══════════ 1 · HERO ═══════════ */}
          <section className="relative overflow-hidden">
            <BackgroundGradientGlow variant="brand" className="absolute inset-0" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="text-center"
              >
                <motion.p
                  variants={fadeUp}
                  className="mb-5 text-sm font-semibold uppercase tracking-widest text-sky-300"
                >
                  Enterprise AI & Data Services
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  From Data Warehouse to{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent">
                    AI-Powered Decisions
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Strategy, implementation, and 24/7 operations. We take enterprises from
                  AI ambition to production in 12 weeks — while 85% of AI projects fail.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Book Your Free AI Workshop
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cursor-pointer rounded-full border-white/30 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/10"
                  >
                    <Link href="/case-studies">View Case Studies</Link>
                  </Button>
                </motion.div>

                {/* Trust metrics */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4"
                >
                  {[
                    { value: "500+", label: "Enterprises" },
                    { value: "171%", label: "Avg ROI" },
                    { value: "12 Wk", label: "Delivery" },
                    { value: "99.9%", label: "Uptime SLA" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                        {m.value}
                      </p>
                      <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════ 2 · THE CHALLENGE ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-widest text-red-500"
                >
                  The Challenge
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl"
                >
                  Why Most AI Initiatives Stall
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#64748B]"
                >
                  85% of AI projects never reach production. The problem is rarely the model —
                  it&apos;s the foundation, the process, and the lock-in.
                </motion.p>
              </motion.div>

              <div className="mt-14 space-y-4 max-w-3xl mx-auto">
                {problems.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <div className="flex items-start gap-4 rounded-2xl bg-[#FEF2F2]/60 px-6 py-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                          <Icon className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-[#0B0F19]">{p.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-12 text-center text-lg font-semibold text-[#0B0F19]"
              >
                We solve all three. Here&apos;s how.
              </motion.p>
            </div>
          </section>

          {/* ═══════════ 3 · HOW WE WORK ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]"
                >
                  How We Work
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl"
                >
                  The Innovoco Delivery Framework
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#64748B]"
                >
                  A repeatable, battle-tested process refined across 500+ enterprise engagements.
                  No surprises, no scope creep, no big-bang reveals.
                </motion.p>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-4">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.phase}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <div className="rounded-2xl bg-white p-6 h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A58D0] text-sm font-bold text-white">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-base font-bold text-[#0B0F19]">{step.phase}</p>
                            <p className="text-xs font-medium text-[#0A58D0]">{step.duration}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-[#64748B] mb-4">
                          {step.description}
                        </p>
                        <div className="flex items-center justify-between border-t border-[#0B0F19]/5 pt-4">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-[#0A58D0]" />
                            <span className="text-xs font-semibold text-[#0B0F19]">{step.deliverable}</span>
                          </div>
                          <Link
                            href={step.serviceLink}
                            className="text-xs font-medium text-[#0A58D0] hover:underline"
                          >
                            {step.serviceName} →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ 4 · WHY INNOVOCO ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]"
                >
                  Why Innovoco
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl"
                >
                  Built Different From the Big Consultancies
                </motion.h2>
              </motion.div>

              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {differentiators.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <Card className="h-full border-border/30 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[22px]">
                        <CardContent className="p-8">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DBEAFE] mb-5">
                            <Icon className="h-5 w-5 text-[#0A58D0]" />
                          </div>
                          <h3 className="text-xl font-bold text-[#0B0F19] mb-2">{d.title}</h3>
                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-[#0A58D0] border-blue-200 text-xs mb-4"
                          >
                            {d.metric}
                          </Badge>
                          <p className="text-sm leading-relaxed text-[#64748B]">
                            {d.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ 5 · PROVEN RESULTS ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]"
                >
                  Proven Results
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl"
                >
                  Featured Case Studies
                </motion.h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {featuredCaseStudies.map((cs, i) => (
                  <motion.div
                    key={cs.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Link href={cs.href}>
                      <div className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#eceef0]/90 bg-white shadow-[0_1px_3px_rgba(25,28,30,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(25,28,30,0.1)]">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={cs.image}
                            alt={cs.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute left-3 top-3">
                            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0A58D0] shadow-sm backdrop-blur-sm">
                              {cs.tag}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                          <p className="text-xl font-bold tabular-nums text-[#0A58D0] mb-1">
                            {cs.metric}
                          </p>
                          <h3 className="text-base font-bold text-[#0B0F19] mb-2 group-hover:text-[#0A58D0] transition-colors">
                            {cs.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-[#64748B] flex-grow">
                            {cs.outcome}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#0A58D0]">
                            Read case study
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-12 text-center"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-[#0A58D0] text-[#0A58D0] hover:bg-[#DBEAFE]/50 px-8 h-14"
                >
                  <Link href="/case-studies">View All Case Studies</Link>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* ═══════════ 6 · FAQ ═══════════ */}
          <FaqMonochrome
            title="Everything You Need to Know"
            subtitle="Common questions about working with us — answered directly."
            items={faqItems.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))}
          />

          {/* ═══════════ 7 · CTA — PRIORITIZATION WORKSHOP ═══════════ */}
          <section className="relative overflow-hidden">
            <Image
              src="/images/case-studies/cta-prioritization-bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A58D0]/15 via-transparent to-[#DC2626]/10" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl"
                >
                  AI Initiatives Are Piling Up.
                  <br />
                  <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent">
                    Which Ones Actually Move Your P&L?
                  </span>
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl"
                >
                  One workshop. Every initiative ranked by ROI, feasibility, and time-to-value.
                  Walk out with a board-ready roadmap.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="mt-12 grid max-w-2xl gap-5 sm:grid-cols-2 mx-auto"
                >
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-md transition-colors hover:bg-white/15">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
                      <Target className="h-5 w-5 text-sky-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Strategic Roadmap</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      Enterprise-wide AI initiatives ranked by impact, with clear milestones and
                      resource requirements.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-md transition-colors hover:bg-white/15">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                      <Zap className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Quick Wins</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      Deploy in 90 days, show measurable ROI this quarter. Proof points that
                      build board confidence.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} custom={3} className="mt-12">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Schedule Your AI Briefing
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  custom={4}
                  className="mt-5 text-sm font-medium text-white/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                >
                  60 min · Free · No obligation
                </motion.p>
              </motion.div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
