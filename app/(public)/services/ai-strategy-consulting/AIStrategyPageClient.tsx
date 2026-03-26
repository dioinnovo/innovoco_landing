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
                  Turn AI Ambition Into a{" "}
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
