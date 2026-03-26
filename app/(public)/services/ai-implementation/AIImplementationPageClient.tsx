"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Shield,
  CheckCircle2,
  Brain,
  Zap,
  Database,
  Rocket,
  LifeBuoy,
  Users,
  Bot,
  Search,
  Eye,
  Cpu,
  GitBranch,
  CircleDollarSign,
  Clock,
  BarChart3,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const coreServices = [
  {
    icon: Brain,
    title: "LLM Integration & Applications",
    description: "Production LLM systems for customer support, document intelligence, code assistants, and knowledge search. OpenAI, Anthropic, Google, or fine-tuned open-source (Llama, Mistral). Includes prompt engineering frameworks and 40–60% cost optimization.",
    deliverables: ["Production LLM application", "Prompt engineering framework", "Cost-optimized inference pipeline"],
  },
  {
    icon: Search,
    title: "RAG Systems & Knowledge Retrieval",
    description: "Full RAG pipelines — document ingestion, embedding generation, vector database (Pinecone, Weaviate, Qdrant, pgvector), and retrieval optimization. Advanced techniques: parent-child chunking, HyDE, query expansion. 80–90% answer accuracy vs 40–50% with keyword search.",
    deliverables: ["End-to-end RAG pipeline", "Vector database with hybrid search", "Answer accuracy benchmarking suite"],
  },
  {
    icon: Bot,
    title: "Agentic AI & Multi-Agent Systems",
    description: "Autonomous agents that complete multi-step workflows — from research to decision to action. Built with LangGraph, Semantic Kernel, or custom frameworks. Human-in-the-loop controls, guardrails, and graceful fallbacks for enterprise safety.",
    deliverables: ["Production agent architecture", "Human-in-the-loop approval flows", "Agent observability dashboard"],
  },
  {
    icon: Eye,
    title: "Computer Vision & Image Processing",
    description: "Quality control, medical imaging, visual search, document OCR. Models: YOLO, ResNet, ViT. 99%+ accuracy for visual inspection with 60–80% cost reduction vs manual processes. Edge deployment with TensorRT/ONNX for latency-sensitive applications.",
    deliverables: ["Trained CV model with benchmarks", "Edge-optimized inference", "Continuous retraining pipeline"],
  },
  {
    icon: Cpu,
    title: "ML Model Development & Deployment",
    description: "Supervised, unsupervised, time-series, and recommender systems. PyTorch, TensorFlow, XGBoost. Deployed via Docker/Kubernetes with REST/gRPC APIs. A/B testing, drift monitoring, and automated retraining from day one.",
    deliverables: ["Production ML model with CI/CD", "Feature store integration", "Drift detection & alerting"],
  },
  {
    icon: GitBranch,
    title: "Enterprise MLOps & Governance",
    description: "Model versioning, CI/CD pipelines, feature stores, monitoring dashboards. Governance: documentation, bias testing, explainability (SHAP, LIME), and audit trails for regulated industries. Stack: MLflow, Kubeflow, Feast, Evidently.",
    deliverables: ["MLOps platform deployment", "Model governance framework", "Compliance audit trail"],
  },
];

const processPhases = [
  { phase: "Discovery & POC", duration: "Weeks 1–2", description: "Requirements gathering, data assessment, and rapid prototype to validate feasibility", deliverable: "Working Prototype" },
  { phase: "Data Pipeline", duration: "Weeks 3–6", description: "Feature engineering, data preparation, embedding pipelines, and integration points", deliverable: "Production Data Pipeline" },
  { phase: "Model Development", duration: "Weeks 7–10", description: "Model training, fine-tuning, prompt optimization, and performance benchmarking", deliverable: "Optimized Model" },
  { phase: "Integration & Alpha", duration: "Weeks 11–14", description: "System integration, security review, load testing, and alpha deployment", deliverable: "Alpha Deployment" },
  { phase: "Production Launch", duration: "Weeks 15–16", description: "Production release, monitoring setup, team training, and handoff documentation", deliverable: "Production System" },
];

const faqItems = [
  {
    question: "How long does AI implementation take?",
    answer: "12 weeks is our standard for single-system deployments (one LLM app, one RAG system, one agent). Complex multi-system projects take 16–20 weeks. You see working demos from week 2 — not a big reveal at the end.",
  },
  {
    question: "How much does AI implementation cost?",
    answer: "Single-system projects (LLM app, RAG, or agent) range from $75K–$150K. Multi-system enterprise deployments range from $150K–$400K+. Every engagement starts with a 2-week paid discovery ($15K–$25K) that produces a working prototype — so you see results before committing to the full build.",
  },
  {
    question: "What is agentic AI and do we need it?",
    answer: "Agentic AI systems autonomously execute multi-step tasks — research, decide, act, verify — with minimal human oversight. You need it if you have workflows that follow predictable logic but require judgment calls: claims processing, document review, code generation, customer escalation. Gartner predicts 40% of enterprise apps will feature AI agents by end of 2026.",
  },
  {
    question: "Should we use OpenAI, Anthropic, or open-source models?",
    answer: "It depends on your requirements. OpenAI GPT-5 excels at general tasks and function calling. Anthropic Claude is strongest for long documents and careful reasoning. Open-source (Llama, Mistral) is best when data must stay on-premise or you need fine-tuned domain performance. We evaluate all options against your cost, latency, privacy, and accuracy requirements.",
  },
  {
    question: "What is RAG and why does it matter?",
    answer: "RAG (Retrieval-Augmented Generation) grounds LLM responses in your actual data — documents, databases, knowledge bases — instead of relying on the model's training data alone. It eliminates hallucinations and keeps answers current. We build RAG systems that achieve 80–90% answer accuracy vs 40–50% with standard keyword search.",
  },
  {
    question: "How do you ensure AI safety in production?",
    answer: "Multiple layers: input validation, output filtering, guardrail policies, human-in-the-loop for high-stakes decisions, and continuous monitoring for drift and adversarial inputs. For regulated industries, we add model explainability (SHAP/LIME), bias testing across demographics, and immutable audit trails.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes — we integrate with Salesforce, SAP, Oracle, ServiceNow, Jira, Slack, Teams, SharePoint, Confluence, custom APIs, and most enterprise platforms. Integration architecture is designed in week 1 so there are no surprises later.",
  },
  {
    question: "What happens after deployment?",
    answer: "Every project includes 30 days of post-deployment support. For ongoing operations, our Managed AI Services team provides 24/7 monitoring, automated retraining, and continuous optimization. Most clients transition to managed services — it's cheaper than building an internal MLOps team.",
  },
  {
    question: "Do you transfer knowledge to our team?",
    answer: "Yes — knowledge transfer is built into every sprint. Your engineers pair with ours during development. We deliver comprehensive documentation, recorded walkthroughs, and a 2-week enablement period. The goal is to make your team self-sufficient for day-to-day operations.",
  },
  {
    question: "What if our POC already failed?",
    answer: "40% of our clients come to us after a failed first attempt. Common failure causes: insufficient data preparation, wrong model for the use case, no production architecture from the start, or scope creep. We audit what went wrong, salvage viable components, and rebuild on a proven architecture.",
  },
];

export function AIImplementationPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  useEffect(() => {
    trackServicePageView("Enterprise AI Implementation");
    const cleanup = createScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Enterprise AI Implementation Services",
          description: "AI implementation: agentic AI, LLM integration, RAG systems, computer vision, MLOps. POC to production in 12 weeks. 500+ deployments.",
          url: "https://innovoco.com/services/ai-implementation",
          serviceType: "AI Implementation",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
          { name: "AI Implementation", url: "https://innovoco.com/services/ai-implementation" },
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
        <Header onContactClick={openContact} />

        <main id="main-content" role="main">

          {/* ═══════════ HERO ═══════════ */}
          <section className="relative overflow-hidden">
            <BackgroundGradientGlow variant="brand" className="absolute inset-0" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                className="text-center"
              >
                <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <Zap className="h-4 w-4" />
                  AI Implementation Services
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  From POC to Production in{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-sky-300 bg-clip-text text-transparent">
                    12 Weeks
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Agentic AI, LLM integration, RAG systems, computer vision, and enterprise MLOps.
                  We build AI that ships — not prototypes that sit in notebooks.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Schedule Implementation Assessment
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
                    { value: "500+", label: "AI Deployments" },
                    { value: "12 Wk", label: "Avg Delivery" },
                    { value: "95%", label: "On-Time Rate" },
                    { value: "3x", label: "Avg ROI Year 1" },
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
                  The Gap
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  The Distance Between Demo and Production
                </motion.h2>
              </motion.div>

              <div className="mt-14 space-y-4 max-w-3xl mx-auto">
                {[
                  { icon: Clock, text: "95% of GenAI pilots fail to achieve measurable P&L impact — the gap isn't the model, it's the engineering to make it production-grade (MIT 2025)" },
                  { icon: CircleDollarSign, text: "Average failed AI project wastes $500K–$2M in sunk costs before the team admits it won't ship" },
                  { icon: BarChart3, text: "40%+ of agentic AI initiatives will be discontinued by 2027 without proper governance (Gartner)" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
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
                        <p className="text-sm leading-relaxed text-[#525252]">{item.text}</p>
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
                className="mt-10 text-center text-base text-[#64748B] max-w-2xl mx-auto"
              >
                We bridge that gap. Every project is architected for production from day one — not prototyped in a notebook and then &ldquo;productionized&rdquo; later.
              </motion.p>
            </div>
          </section>

          {/* ═══════════ CORE SERVICES ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                  What We Build
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  AI Implementation Services
                </motion.h2>
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
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE]">
                                  <Icon className="h-5 w-5 text-[#7C3AED]" />
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
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7C3AED] mt-0.5" />
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

          {/* ═══════════ PROCESS ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                  Our Process
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  12-Week Implementation Sprint
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
                    <div className="flex gap-4 rounded-2xl bg-[#F8FAFC] px-6 py-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-sm font-bold text-white mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-bold text-[#0B0F19]">{p.phase}</h3>
                          <Badge variant="secondary" className="bg-purple-50 text-[#7C3AED] border-purple-200 text-xs">
                            {p.duration}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-[#64748B]">{p.description}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs font-semibold text-[#0B0F19]">
                        <Target className="h-4 w-4 text-[#7C3AED]" />
                        {p.deliverable}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                  Investment
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Transparent Pricing
                </motion.h2>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  {
                    tier: "Discovery & POC",
                    price: "$15K–$25K",
                    duration: "2 weeks",
                    includes: ["Requirements analysis", "Data assessment", "Working prototype", "Go/no-go recommendation"],
                  },
                  {
                    tier: "Single System Build",
                    price: "$75K–$150K",
                    duration: "12 weeks",
                    includes: ["Everything in Discovery", "Production AI system", "MLOps pipeline", "30-day post-launch support", "Team enablement"],
                    featured: true,
                  },
                  {
                    tier: "Enterprise Multi-System",
                    price: "$150K–$400K+",
                    duration: "16–20 weeks",
                    includes: ["Everything in Single System", "Multiple AI systems", "Cross-system integration", "Governance framework", "90-day support"],
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
                    <Card className={`h-full rounded-[22px] ${t.featured ? "border-[#7C3AED] border-2 shadow-md" : "border-border/30 shadow-sm"}`}>
                      <CardContent className="p-8">
                        {t.featured && (
                          <Badge className="bg-[#7C3AED] text-white mb-4 text-xs">Most Popular</Badge>
                        )}
                        <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{t.tier}</p>
                        <p className="mt-2 text-3xl font-bold text-[#0B0F19]">{t.price}</p>
                        <p className="mt-1 text-sm text-[#7C3AED] font-medium">{t.duration}</p>
                        <ul className="mt-6 space-y-2">
                          {t.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[#525252]">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7C3AED] mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={openContact}
                          className={`mt-6 w-full rounded-full cursor-pointer ${t.featured ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white" : "bg-white border border-[#7C3AED] text-[#7C3AED] hover:bg-[#EDE9FE]/50"}`}
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

          {/* ═══════════ RELATED SERVICES ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                  Complete AI Lifecycle
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Before and After Implementation
                </motion.h2>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { icon: Brain, gradient: "from-[#DBEAFE] to-[#93C5FD]", title: "AI Strategy", description: "Define your roadmap before building.", href: "/services/ai-strategy-consulting" },
                  { icon: Database, gradient: "from-[#D1FAE5] to-[#6EE7B7]", title: "Data Engineering", description: "Build the AI-ready data foundation.", href: "/services/data-engineering-modernization" },
                  { icon: LifeBuoy, gradient: "from-[#FEF3C7] to-[#FDE68A]", title: "Managed AI Ops", description: "24/7 operations after go-live.", href: "/services/managed-ai-services" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.href} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                      <Link href={s.href}>
                        <Card className="group h-full border-border/30 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-[22px] cursor-pointer">
                          <CardContent className="p-6 text-center">
                            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-base font-bold text-[#0B0F19] mb-1 group-hover:text-[#7C3AED] transition-colors">{s.title}</h3>
                            <p className="text-sm text-[#64748B] mb-3">{s.description}</p>
                            <span className="text-sm font-medium text-[#7C3AED] inline-flex items-center gap-1">
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
            title="AI Implementation — Common Questions"
            subtitle="What to expect when building production AI with us."
            items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
          />

          {/* ═══════════ CTA ═══════════ */}
          <section className="relative overflow-hidden">
            <Image src="/images/case-studies/cta-prioritization-bg.jpg" alt="" fill className="object-cover" sizes="100vw" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/15 via-transparent to-[#0A58D0]/10" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl"
                >
                  Stop Prototyping. Start Shipping.
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl"
                >
                  2-week paid discovery. Working prototype. Clear path to production. No risk, full transparency.
                </motion.p>
                <motion.div variants={fadeUp} custom={2} className="mt-10">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Start Your Discovery Sprint
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>
                <motion.p variants={fadeUp} custom={3} className="mt-5 text-sm font-medium text-white/60">
                  2 weeks · $15K–$25K · Working prototype included
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
