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
  Activity,
  RefreshCw,
  CircleDollarSign,
  Clock,
  AlertTriangle,
  Eye,
  Lock,
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
    icon: Activity,
    title: "24/7 Model Monitoring & Alerting",
    description: "Continuous monitoring of inference latency, throughput, error rates, and business KPIs. Automated alerting with escalation chains. We detect model degradation before your users do — and fix it before it impacts revenue.",
    deliverables: ["Real-time monitoring dashboard", "Automated alerting with PagerDuty/Slack", "Weekly performance reports"],
  },
  {
    icon: RefreshCw,
    title: "Automated Retraining & Drift Detection",
    description: "Scheduled evaluation cycles with automated retraining when performance drops below thresholds. Data drift, concept drift, and prediction drift detection. Model promotion criteria ensure only validated models reach production.",
    deliverables: ["Automated retraining pipeline", "Drift detection with Evidently/Arize", "Model promotion with approval gates"],
  },
  {
    icon: CircleDollarSign,
    title: "Cloud FinOps & Cost Optimization",
    description: "AI infrastructure costs spiral without governance. We optimize GPU utilization, right-size inference endpoints, implement spot/preemptible instances, and automate scaling policies. Most clients see 30–40% cost reduction within 90 days.",
    deliverables: ["Monthly FinOps review & recommendations", "Auto-scaling policies", "Cost attribution by model/team"],
  },
  {
    icon: Shield,
    title: "Governance, Compliance & Audit",
    description: "GDPR, HIPAA, SOC 2, EU AI Act compliance monitoring. Automated bias checks, model explainability reports, and immutable audit trails. Ready for regulatory audits at any time — not scrambling when the auditor arrives.",
    deliverables: ["Compliance monitoring dashboard", "Automated bias testing schedule", "Audit-ready documentation"],
  },
  {
    icon: LifeBuoy,
    title: "Incident Response & Remediation",
    description: "Runbooks for every failure mode. On-call coverage with <15 min response time for critical incidents. Post-incident reviews with root cause analysis. We don't just restart the service — we fix the underlying cause.",
    deliverables: ["Incident runbooks per system", "<15 min critical response SLA", "Post-incident review reports"],
  },
];

const faqItems = [
  {
    question: "How much do managed AI services cost?",
    answer: "Monitoring-only plans start at $5K/month. Full managed operations (monitoring + retraining + FinOps + incident response) range from $10K–$30K/month depending on the number of models and complexity. This is typically 50–70% cheaper than building an internal MLOps team ($200K+ per ML engineer).",
  },
  {
    question: "What's included in 24/7 monitoring?",
    answer: "Inference latency, throughput, error rates, data drift, concept drift, prediction accuracy, and custom business KPIs. Alerts go to PagerDuty/Slack/email with configurable escalation chains. You get a weekly report summarizing performance, anomalies, and recommendations.",
  },
  {
    question: "How often do models need retraining?",
    answer: "It depends on how fast your domain changes. E-commerce recommendation models may need weekly retraining. Fraud detection models drift monthly. Stable models (document classification) may go 3–6 months. We set up automated evaluation schedules and retrain only when performance drops below your thresholds — not on arbitrary schedules.",
  },
  {
    question: "Can you manage models we didn't build?",
    answer: "Yes. We onboard existing AI systems regardless of who built them. We audit the architecture, set up monitoring, create runbooks, and integrate with your existing infrastructure. Onboarding typically takes 2–4 weeks depending on complexity and documentation quality.",
  },
  {
    question: "What cloud platforms do you support?",
    answer: "AWS (SageMaker, ECS, Lambda), Azure (ML Studio, AKS, Functions), and GCP (Vertex AI, GKE, Cloud Functions). We also manage hybrid environments with on-premise GPU clusters. Our monitoring tools are platform-agnostic — we use the same dashboards regardless of where your models run.",
  },
  {
    question: "How do you handle EU AI Act compliance?",
    answer: "We maintain a registry of all AI systems with risk classifications per the EU AI Act. High-risk systems get automated bias testing, explainability reports, and human oversight protocols. We generate compliance documentation on demand for regulatory audits. Full enforcement begins August 2, 2026.",
  },
  {
    question: "What's the difference between MLOps and managed AI services?",
    answer: "MLOps is the infrastructure and practices. Managed AI services means we run that infrastructure for you — 24/7 monitoring, incident response, retraining, cost optimization, and compliance. You get the outcome (reliable, cost-efficient AI) without hiring a 3–5 person MLOps team.",
  },
  {
    question: "How do you reduce AI infrastructure costs?",
    answer: "Four levers: GPU right-sizing (most endpoints are over-provisioned), auto-scaling (scale to zero when idle), spot/preemptible instances for batch jobs, and inference optimization (quantization, distillation, batching). We review costs monthly and implement optimizations continuously. Most clients see 30–40% savings within 90 days.",
  },
  {
    question: "What SLAs do you offer?",
    answer: "Standard SLA: 99.9% uptime, <15 min critical incident response, <4 hour resolution for P1 issues. Premium SLA: 99.95% uptime, <5 min critical response, dedicated on-call engineer. Both include monthly performance reviews and quarterly strategy sessions.",
  },
  {
    question: "Can we start with monitoring and add more services later?",
    answer: "Absolutely. Most clients start with monitoring-only ($5K/month) and add retraining, FinOps, or full incident response as their AI footprint grows. There's no lock-in — you can adjust your plan monthly based on what you need.",
  },
];

export function ManagedAIPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  useEffect(() => {
    trackServicePageView("Managed AI Services");
    const cleanup = createScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Managed AI Services",
          description: "SLA-backed AI operations: 24/7 monitoring, automated retraining, FinOps optimization, compliance governance. 99.9% uptime.",
          url: "https://innovoco.com/services/managed-ai-services",
          serviceType: "Managed AI Operations",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
          { name: "Managed AI Services", url: "https://innovoco.com/services/managed-ai-services" },
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
                  <LifeBuoy className="h-4 w-4" />
                  Managed AI Services
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  Keep Your AI{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-orange-200 to-rose-300 bg-clip-text text-transparent">
                    Reliable, Secure & Cost-Efficient
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  24/7 monitoring, automated retraining, cloud FinOps, and compliance governance.
                  SLA-backed operations that cost 50–70% less than an internal MLOps team.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Discuss Managed Operations
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
                    { value: "24/7", label: "Monitoring" },
                    { value: "99.9%", label: "Uptime SLA" },
                    { value: "<15m", label: "Incident Response" },
                    { value: "30-40%", label: "Cost Savings" },
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
                  Deploying AI Is the Easy Part
                </motion.h2>
              </motion.div>

              <div className="mt-14 space-y-4 max-w-3xl mx-auto">
                {[
                  { icon: AlertTriangle, text: "AI models degrade silently. Without monitoring, you won't know your recommendations are wrong until customers leave." },
                  { icon: CircleDollarSign, text: "80% of AI infrastructure costs are wasted on over-provisioned GPUs and idle endpoints that nobody optimizes." },
                  { icon: Lock, text: "EU AI Act enforcement begins August 2, 2026. Non-compliance penalties reach 7% of global revenue. Most enterprises aren't ready." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
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
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">
                  What We Run For You
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  Managed AI Operations
                </motion.h2>
              </motion.div>

              <div className="mt-14 space-y-5">
                {coreServices.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                      <Card className="border-border/30 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[22px]">
                        <CardContent className="p-6 md:p-8">
                          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7]">
                                  <Icon className="h-5 w-5 text-[#D97706]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0B0F19]">{s.title}</h3>
                              </div>
                              <p className="text-sm leading-relaxed text-[#64748B]">{s.description}</p>
                            </div>
                            <div className="md:min-w-[260px] md:border-l md:border-[#0B0F19]/5 md:pl-6">
                              <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-2">Included</p>
                              <ul className="space-y-1.5">
                                {s.deliverables.map((d) => (
                                  <li key={d} className="flex items-start gap-2 text-sm text-[#525252]">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D97706] mt-0.5" />
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

          {/* ═══════════ PRICING ═══════════ */}
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">
                  Investment
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Predictable Monthly Pricing
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-2xl text-base text-[#64748B]">
                  50–70% cheaper than hiring an internal MLOps team. Scale up or down monthly — no lock-in.
                </motion.p>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  {
                    tier: "Monitor",
                    price: "$5K/mo",
                    description: "Per model/system",
                    includes: ["24/7 monitoring & alerting", "Weekly performance reports", "Drift detection", "Slack/PagerDuty integration"],
                  },
                  {
                    tier: "Operate",
                    price: "$10K–$20K/mo",
                    description: "Per model/system",
                    includes: ["Everything in Monitor", "Automated retraining", "Incident response (<15m)", "Monthly FinOps review", "Compliance monitoring"],
                    featured: true,
                  },
                  {
                    tier: "Enterprise",
                    price: "$20K–$30K+/mo",
                    description: "Multi-system",
                    includes: ["Everything in Operate", "Dedicated on-call engineer", "Quarterly strategy sessions", "EU AI Act compliance", "Custom SLAs (99.95%+)"],
                  },
                ].map((t, i) => (
                  <motion.div key={t.tier} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                    <Card className={`h-full rounded-[22px] ${t.featured ? "border-[#D97706] border-2 shadow-md" : "border-border/30 shadow-sm"}`}>
                      <CardContent className="p-8">
                        {t.featured && (
                          <Badge className="bg-[#D97706] text-white mb-4 text-xs">Most Popular</Badge>
                        )}
                        <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{t.tier}</p>
                        <p className="mt-2 text-3xl font-bold text-[#0B0F19]">{t.price}</p>
                        <p className="mt-1 text-sm text-[#D97706] font-medium">{t.description}</p>
                        <ul className="mt-6 space-y-2">
                          {t.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[#525252]">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D97706] mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={openContact}
                          className={`mt-6 w-full rounded-full cursor-pointer ${t.featured ? "bg-[#D97706] hover:bg-[#B45309] text-white" : "bg-white border border-[#D97706] text-[#D97706] hover:bg-[#FEF3C7]/50"}`}
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
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">
                  The Full Lifecycle
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Build It Right, Then Run It Right
                </motion.h2>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { icon: Brain, gradient: "from-[#DBEAFE] to-[#93C5FD]", title: "AI Strategy", description: "Define what to build and why.", href: "/services/ai-strategy-consulting" },
                  { icon: Database, gradient: "from-[#D1FAE5] to-[#6EE7B7]", title: "Data Engineering", description: "Build the AI-ready data foundation.", href: "/services/data-engineering-modernization" },
                  { icon: Zap, gradient: "from-[#EDE9FE] to-[#C4B5FD]", title: "AI Implementation", description: "POC to production in 12 weeks.", href: "/services/ai-implementation" },
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
                            <h3 className="text-base font-bold text-[#0B0F19] mb-1 group-hover:text-[#D97706] transition-colors">{s.title}</h3>
                            <p className="text-sm text-[#64748B] mb-3">{s.description}</p>
                            <span className="text-sm font-medium text-[#D97706] inline-flex items-center gap-1">
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
            title="Managed AI — Common Questions"
            subtitle="What to expect when we run your AI operations."
            items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
          />

          {/* ═══════════ CTA ═══════════ */}
          <section className="relative overflow-hidden">
            <Image src="/images/case-studies/cta-prioritization-bg.jpg" alt="" fill className="object-cover" sizes="100vw" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/45 via-[#0B0F19]/35 to-[#0B0F19]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#D97706]/15 via-transparent to-[#0A58D0]/10" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl"
                >
                  Your AI Deserves Better Than &ldquo;We&apos;ll Monitor It Later.&rdquo;
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl"
                >
                  Free operations assessment. We&apos;ll audit your current AI systems and show you exactly what&apos;s at risk — performance, cost, and compliance.
                </motion.p>
                <motion.div variants={fadeUp} custom={2} className="mt-10">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Get Your Free AI Ops Assessment
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>
                <motion.p variants={fadeUp} custom={3} className="mt-5 text-sm font-medium text-white/60">
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
