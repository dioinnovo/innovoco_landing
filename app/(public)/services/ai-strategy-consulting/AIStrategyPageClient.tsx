"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Shield,
  DollarSign,
  CheckCircle2,
  Brain,
  Zap,
  Database,
  Rocket,
  LifeBuoy,
  Users,
  BarChart3,
  FileText,
  Search,
  AlertTriangle,
  Scale,
  Bot,
  CircleDollarSign,
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
import { createServiceSchema, createBreadcrumbSchema, organizationSchema } from "@/lib/seo/schema";
import { createScrollDepthTracking, trackServicePageView } from "@/lib/analytics/events";

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
const coreServices = [
  {
    icon: Search,
    title: "AI Maturity Assessment",
    description: "Quantified scoring across 5 dimensions — data infrastructure, talent, governance, business alignment, and analytics capabilities. Benchmarked against 500+ enterprise assessments.",
    deliverables: ["AI Maturity Score with peer benchmarks", "Data readiness audit", "Gap analysis with prioritized recommendations"],
  },
  {
    icon: Brain,
    title: "Framework Selection & Architecture",
    description: "Multi-criteria evaluation of AI frameworks — OpenAI, Anthropic, Google, open-source — based on cost, performance, latency, privacy, and your existing stack. No vendor bias.",
    deliverables: ["Framework comparison matrix", "Architecture blueprint with IaC templates", "3-year TCO analysis"],
  },
  {
    icon: FileText,
    title: "Enterprise AI Roadmap",
    description: "Use cases scored on ROI, complexity, data readiness, and strategic alignment. Sequenced into Quick Wins (0-6 mo), Strategic Initiatives (6-18 mo), and Transformation (18+ mo).",
    deliverables: ["Prioritized use case backlog (10-20 initiatives)", "3-year phased roadmap", "Board-ready executive presentation"],
  },
  {
    icon: Shield,
    title: "AI Governance & Compliance",
    description: "Responsible AI frameworks tailored to your industry — HIPAA, SOX, GDPR, EU AI Act. Model approval workflows, bias testing, explainability, and audit trails from day one.",
    deliverables: ["AI governance policy framework", "Bias detection protocols", "Incident response plan"],
  },
  {
    icon: DollarSign,
    title: "ROI Modeling & Business Case",
    description: "Financial models projecting 3-year TCO and benefits with sensitivity analysis. Clear KPIs per initiative. Our business cases have helped clients secure $500K–$5M+ in AI budgets.",
    deliverables: ["Financial model with break-even timeline", "KPI measurement framework", "Executive one-pager for board approval"],
  },
];

const processPhases = [
  { phase: "Discovery", duration: "2–3 weeks", description: "Stakeholder interviews, data infrastructure audit, compliance gap analysis", deliverable: "AI Maturity Report" },
  { phase: "Prioritization", duration: "2–3 weeks", description: "Workshop to brainstorm 20-30 use cases, score and narrow to top 10-15", deliverable: "Prioritized Use Case Backlog" },
  { phase: "Architecture", duration: "2–3 weeks", description: "Framework selection, architecture design, cost modeling per use case", deliverable: "Technical Blueprint & TCO" },
  { phase: "Roadmap", duration: "2–3 weeks", description: "Sequence initiatives, define governance, build resource and budget plans", deliverable: "3-Year AI Roadmap" },
  { phase: "Alignment", duration: "1–2 weeks", description: "Executive presentation, Q&A, implementation handoff with 30-day support", deliverable: "Board Deck & Handoff Package" },
];

const faqItems = [
  {
    question: "How long does an AI strategy engagement take?",
    answer: "Typically 6–12 weeks from discovery to final roadmap delivery. Quick Wins are identified in the first 3 weeks so you can start showing value immediately, even while the full strategy is being finalized.",
  },
  {
    question: "Do we need to use Innovoco for implementation?",
    answer: "No. The roadmap, architecture blueprints, and governance frameworks are designed to be vendor-agnostic. You can implement with your internal team, another partner, or with us. No lock-in.",
  },
  {
    question: "What if we already have an AI strategy that's stalled?",
    answer: "We specialize in AI recovery. We'll audit what went wrong, salvage viable initiatives, and rebuild the roadmap around realistic timelines and proven architectures. 40% of our strategy clients come to us after a failed first attempt.",
  },
  {
    question: "How do you handle sensitive data during assessment?",
    answer: "All assessments are conducted under NDA with SOC 2-compliant practices. We can work on-premise if required. Data never leaves your environment without explicit authorization.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "Healthcare, financial services, manufacturing, retail, insurance, energy, construction, and government. Each vertical has dedicated solution architects who understand the regulatory and operational nuances.",
  },
  {
    question: "How much does AI strategy consulting cost?",
    answer: "Strategy engagements range from $50K for a focused assessment to $150K+ for comprehensive enterprise roadmaps. Every engagement includes ROI projections — you see the expected return before committing.",
  },
  {
    question: "What does an AI strategy consultant actually do?",
    answer: "We assess your data maturity, identify the highest-ROI AI use cases for your business, select the right frameworks and architectures, build a phased roadmap with timelines and budgets, and create the governance structure to keep it compliant. The output is a board-ready plan your team can execute.",
  },
  {
    question: "What is an AI strategy framework?",
    answer: "An AI strategy framework is a structured methodology for evaluating, prioritizing, and sequencing AI initiatives. Ours — the Innovoco AI Acceleration Framework — covers five pillars: Assess (data maturity), Prioritize (use cases by ROI), Architect (framework selection), Govern (compliance and ethics), and Roadmap (phased execution plan).",
  },
  {
    question: "Who should own AI strategy in our organization?",
    answer: "Ideally a cross-functional steering committee led by a C-suite sponsor (CTO, CDO, or COO). The strategy needs business alignment, not just technical direction. We facilitate this alignment as part of every engagement — ensuring IT, business units, and executives are on the same page.",
  },
  {
    question: "What's the difference between AI consulting and AI implementation?",
    answer: "AI consulting (strategy) tells you what to build and why. AI implementation builds it. We do both, but they're separate engagements. Strategy takes 4–12 weeks and produces a roadmap. Implementation takes 8–16 weeks and produces production software. Many clients start with strategy and continue to implementation with us.",
  },
  {
    question: "Is AI consulting worth the investment?",
    answer: "Yes — if done right. Our clients see 171% average ROI within the first year. The cost of NOT having a strategy is higher: 85% of unguided AI projects fail to reach production, wasting $500K–$2M in sunk costs. A $50K–$150K strategy engagement prevents millions in failed experiments.",
  },
  {
    question: "How do you handle EU AI Act compliance?",
    answer: "Full enforcement of the EU AI Act hits August 2, 2026 with penalties up to 7% of global revenue. Our governance framework includes AI system classification, risk assessment, documentation requirements, and monitoring protocols aligned with the Act. We help you inventory your AI systems and ensure compliance before the deadline.",
  },
  {
    question: "Why choose a boutique AI firm over Accenture or Deloitte?",
    answer: "Three reasons: speed (4 weeks vs 4 months for a roadmap), cost (50–70% less than Big 4 rates), and access (you work with senior architects, not junior analysts learning on your dime). We deliver the same enterprise-grade output without the overhead of a 200-person account team.",
  },
  {
    question: "Can you help with agentic AI strategy?",
    answer: "Yes — agentic AI (autonomous multi-step agents) is one of the most requested topics in 2026. Gartner predicts 40% of enterprise apps will feature AI agents by end of 2026, but 40%+ of those initiatives will fail without proper governance. We design agentic AI architectures with human-in-the-loop controls, guardrails, and clear ROI frameworks.",
  },
];

/* ─── component ─── */
export function AIStrategyPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  useEffect(() => {
    trackServicePageView("AI Strategy & Consulting");
    const cleanup = createScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "AI Strategy & Consulting Services",
          description: "Enterprise AI strategy consulting: maturity assessment, use-case prioritization, and board-ready roadmaps backed by 500+ deployments.",
          url: "https://innovoco.com/services/ai-strategy-consulting",
          serviceType: "AI Strategy Consulting",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
          { name: "AI Strategy & Consulting", url: "https://innovoco.com/services/ai-strategy-consulting" },
        ])}
      />
      <SchemaMarkup schema={organizationSchema} />
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
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <Header onContactClick={openContact} customLogo="/images/logos/innovoco-ai-hires.png" />

        <main id="main-content" role="main">

          {/* ═══════════ HERO ═══════════ */}
          <section className="relative overflow-hidden">
            <BackgroundGradientGlow variant="aurora-brand" className="absolute inset-0" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="text-center"
              >
                <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <Brain className="h-4 w-4" />
                  AI Strategy & Consulting
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  AI Strategy Consulting That Delivers a{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-rose-300 bg-clip-text text-transparent">
                    Board-Ready Roadmap
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Framework-agnostic AI strategy that cuts through the hype. We assess your data maturity,
                  prioritize the highest-ROI use cases, and deliver an actionable roadmap — in 4 weeks, not 4 months.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Schedule Strategy Assessment
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

                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4"
                >
                  {[
                    { value: "500+", label: "AI Solutions" },
                    { value: "4 Wk", label: "Roadmap Delivery" },
                    { value: "171%", label: "Avg Client ROI" },
                    { value: "10Y+", label: "Data Expertise" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-2xl font-bold tabular-nums text-white md:text-3xl">{m.value}</p>
                      <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{m.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════ THE PROBLEM ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-red-500">
                  The Reality
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  AI Without Strategy Is Expensive Experimentation
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#64748B]">
                  The numbers are clear — and they haven&apos;t improved since 2024.
                </motion.p>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  { stat: "95%", label: "of GenAI pilots fail to achieve measurable P&L impact", source: "MIT 2025" },
                  { stat: "56%", label: "of CEOs report getting 'nothing' from AI adoption", source: "PwC 2026" },
                  { stat: "80%", label: "of companies miss AI cost forecasts by over 25%", source: "Gartner 2026" },
                ].map((s, i) => (
                  <motion.div
                    key={s.stat}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <div className="rounded-2xl bg-[#FEF2F2]/60 p-8 text-center">
                      <p className="text-4xl font-bold text-red-500 md:text-5xl">{s.stat}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#525252]">{s.label}</p>
                      <p className="mt-2 text-xs text-[#94A3B8]">{s.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-10 text-center text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed"
              >
                The problem isn&apos;t the technology. It&apos;s the absence of a strategy that connects
                AI capabilities to business outcomes, governance, and realistic timelines. That&apos;s
                what we build.
              </motion.p>
            </div>
          </section>

          {/* ═══════════ WHAT WE DELIVER ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  Core Services
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  What We Deliver
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#64748B]">
                  Five integrated deliverables that take you from &ldquo;we should do something with AI&rdquo;
                  to a funded, governed, board-approved transformation plan.
                </motion.p>
              </motion.div>

              <div className="mt-14 space-y-5">
                {coreServices.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <Card className="border-border/30 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[22px]">
                        <CardContent className="p-6 md:p-8">
                          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE]">
                                  <Icon className="h-5 w-5 text-[#0A58D0]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0B0F19]">{s.title}</h3>
                              </div>
                              <p className="text-sm leading-relaxed text-[#64748B]">{s.description}</p>
                            </div>
                            <div className="md:min-w-[260px] md:border-l md:border-[#0B0F19]/5 md:pl-6">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-2">Key Deliverables</p>
                              <ul className="space-y-1.5">
                                {s.deliverables.map((d) => (
                                  <li key={d} className="flex items-start gap-2 text-sm text-[#525252]">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0A58D0] mt-0.5" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ OUR PROCESS ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  Our Process
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  Discovery to Roadmap in 6–12 Weeks
                </motion.h2>
              </motion.div>

              <div className="mt-14 space-y-4">
                {processPhases.map((p, i) => (
                  <motion.div
                    key={p.phase}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <div className="flex gap-4 rounded-2xl bg-white px-6 py-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A58D0] text-sm font-bold text-white mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-bold text-[#0B0F19]">{p.phase}</h3>
                          <Badge variant="secondary" className="bg-blue-50 text-[#0A58D0] border-blue-200 text-xs">
                            {p.duration}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-[#64748B]">{p.description}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs font-semibold text-[#0B0F19]">
                        <Target className="h-4 w-4 text-[#0A58D0]" />
                        {p.deliverable}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ WHY US ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  Why Innovoco
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Not Your Typical Strategy Deck
                </motion.h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Users,
                    title: "Data Engineers, Not Slide Makers",
                    description: "10+ years building enterprise data platforms. We don't just advise — we've built the warehouses, pipelines, and ML infrastructure that AI runs on. Our strategies are grounded in what actually ships.",
                  },
                  {
                    icon: Zap,
                    title: "Framework-Agnostic",
                    description: "OpenAI, Anthropic, Google, open-source. AWS, Azure, GCP. We evaluate every option against your constraints — cost, privacy, latency, compliance — and recommend what's right, not what pays us.",
                  },
                  {
                    icon: BarChart3,
                    title: "ROI Before You Commit",
                    description: "Every initiative in your roadmap has a financial model attached. Break-even timelines, sensitivity analysis, and clear KPIs. No faith-based AI budgets.",
                  },
                  {
                    icon: Rocket,
                    title: "Strategy That Ships",
                    description: "Unlike consultancies that hand you a deck and disappear, we can execute the roadmap we create. Same team, no knowledge loss, no handoff risk. Strategy → Build → Operate.",
                  },
                ].map((d, i) => {
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
                          <h3 className="text-lg font-bold text-[#0B0F19] mb-2">{d.title}</h3>
                          <p className="text-sm leading-relaxed text-[#64748B]">{d.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ PRICING ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  Investment
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Transparent Pricing, No Surprises
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base text-[#64748B]">
                  Every engagement includes ROI projections before you commit. No hidden fees, no scope creep clauses.
                </motion.p>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  {
                    tier: "AI Readiness Assessment",
                    price: "$15K–$30K",
                    duration: "2–3 weeks",
                    includes: ["AI maturity score with benchmarks", "Data readiness audit", "Quick win identification", "Executive summary"],
                  },
                  {
                    tier: "Full Strategy & Roadmap",
                    price: "$50K–$100K",
                    duration: "6–10 weeks",
                    includes: ["Everything in Assessment", "Framework selection & architecture", "3-year phased roadmap", "AI governance framework", "Board-ready presentation"],
                    featured: true,
                  },
                  {
                    tier: "Enterprise Transformation",
                    price: "$100K–$200K+",
                    duration: "10–16 weeks",
                    includes: ["Everything in Full Strategy", "Multi-BU use case analysis", "Change management plan", "Org design recommendations", "90-day implementation support"],
                  },
                ].map((t, i) => (
                  <motion.div
                    key={t.tier}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Card className={`h-full rounded-[22px] ${t.featured ? "border-[#0A58D0] border-2 shadow-md" : "border-border/30 shadow-sm"}`}>
                      <CardContent className="p-8">
                        {t.featured && (
                          <Badge className="bg-[#0A58D0] text-white mb-4 text-xs">Most Popular</Badge>
                        )}
                        <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{t.tier}</p>
                        <p className="mt-2 text-3xl font-bold text-[#0B0F19]">{t.price}</p>
                        <p className="mt-1 text-sm text-[#0A58D0] font-medium">{t.duration}</p>
                        <ul className="mt-6 space-y-2">
                          {t.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[#525252]">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0A58D0] mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={openContact}
                          className={`mt-6 w-full rounded-full cursor-pointer ${t.featured ? "bg-[#0A58D0] hover:bg-[#084BB3] text-white" : "bg-white border border-[#0A58D0] text-[#0A58D0] hover:bg-[#DBEAFE]/50"}`}
                        >
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ 2026 FOCUS AREAS ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  What&apos;s Different in 2026
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  The AI Strategy Landscape Has Shifted
                </motion.h2>
              </motion.div>

              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Bot,
                    title: "Agentic AI Is Here",
                    description: "Gartner predicts 40% of enterprise apps will feature AI agents by end of 2026. But 40%+ of those initiatives will fail without proper governance. Your strategy needs an agentic AI playbook.",
                  },
                  {
                    icon: Scale,
                    title: "EU AI Act Enforcement",
                    description: "Full enforcement hits August 2, 2026 with penalties up to 7% of global revenue. Most enterprises lack systematic AI system inventories. Compliance readiness is now a strategy priority, not an afterthought.",
                  },
                  {
                    icon: CircleDollarSign,
                    title: "Boards Want P&L Impact",
                    description: "The question shifted from 'What can AI do?' to 'How much did AI add to our EBITDA?' Strategy must connect every initiative to measurable financial outcomes — not innovation theater.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <Card className="h-full border-border/30 bg-white shadow-sm rounded-[22px]">
                        <CardContent className="p-8">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DBEAFE] mb-5">
                            <Icon className="h-5 w-5 text-[#0A58D0]" />
                          </div>
                          <h3 className="text-lg font-bold text-[#0B0F19] mb-2">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-[#64748B]">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ BOUTIQUE vs BIG 4 ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-4xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  The Honest Comparison
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Boutique AI Firm vs. the Big Consultancies
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base text-[#64748B]">
                  We&apos;re not for everyone. If you need a brand name to satisfy a board checkbox,
                  go with the Big 4. If you need results, read on.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-14"
              >
                <div className="overflow-hidden rounded-2xl border border-border/30 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30 bg-[#F8FAFC]">
                        <th className="px-6 py-4 text-left font-semibold text-[#64748B]"></th>
                        <th className="px-6 py-4 text-center font-bold text-[#0A58D0]">Innovoco</th>
                        <th className="px-6 py-4 text-center font-semibold text-[#64748B]">Big 4 / MBB</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {[
                        ["Roadmap delivery", "4 weeks", "3–6 months"],
                        ["Who does the work", "Senior architects", "Junior analysts"],
                        ["Cost range", "$50K–$150K", "$250K–$1M+"],
                        ["Framework bias", "Technology agnostic", "Partner-dependent"],
                        ["Strategy → Build handoff", "Same team", "Different team / vendor"],
                        ["Post-strategy support", "30 days included", "Separate SOW"],
                      ].map(([label, us, them]) => (
                        <tr key={label as string}>
                          <td className="px-6 py-3.5 font-medium text-[#0B0F19]">{label}</td>
                          <td className="px-6 py-3.5 text-center font-semibold text-[#0A58D0]">{us}</td>
                          <td className="px-6 py-3.5 text-center text-[#64748B]">{them}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════ RELATED SERVICES ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0A58D0]">
                  What Comes Next
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  From Strategy to Production
                </motion.h2>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: Database,
                    gradient: "from-[#D1FAE5] to-[#6EE7B7]",
                    title: "Data Engineering",
                    description: "Build the AI-ready data platform your roadmap requires.",
                    href: "/services/data-engineering-modernization",
                  },
                  {
                    icon: Zap,
                    gradient: "from-[#EDE9FE] to-[#C4B5FD]",
                    title: "AI Implementation",
                    description: "Turn your prioritized use cases into production systems in 12 weeks.",
                    href: "/services/ai-implementation",
                  },
                  {
                    icon: LifeBuoy,
                    gradient: "from-[#FEF3C7] to-[#FDE68A]",
                    title: "Managed AI Ops",
                    description: "24/7 monitoring and optimization once your AI is live.",
                    href: "/services/managed-ai-services",
                  },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.href}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i}
                    >
                      <Link href={s.href}>
                        <Card className="group h-full border-border/30 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-[22px] cursor-pointer">
                          <CardContent className="p-6 text-center">
                            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#0B0F19] mb-1 group-hover:text-[#0A58D0] transition-colors">{s.title}</h3>
                            <p className="text-sm text-[#64748B] mb-3">{s.description}</p>
                            <span className="text-sm font-medium text-[#0A58D0] inline-flex items-center gap-1">
                              Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════ FAQ ═══════════ */}
          <FaqMonochrome
            title="AI Strategy — Common Questions"
            subtitle="What to expect when working with us on your AI roadmap."
            items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
          />

          {/* ═══════════ CTA ═══════════ */}
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
                  Ready to Cut Through the AI Hype?
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl"
                >
                  60-minute strategy assessment. No cost, no obligation. Walk out with clarity on which AI initiatives will actually move your P&L.
                </motion.p>
                <motion.div variants={fadeUp} custom={2} className="mt-10">
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
                  custom={3}
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
