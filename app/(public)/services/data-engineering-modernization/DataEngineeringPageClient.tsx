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
  Cloud,
  GitBranch,
  Activity,
  Layers,
  Lock,
  AlertTriangle,
  Clock,
  BarChart3,
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
    icon: Cloud,
    title: "Cloud Data Migration",
    description: "Zero-downtime migration from Oracle, SQL Server, Teradata, Netezza, DB2 to Snowflake, BigQuery, Azure Synapse, Redshift, or Databricks. Hybrid strategies that preserve 80% of existing workloads while redesigning 20% for cloud-native performance.",
    deliverables: ["Migration assessment & risk analysis", "Automated schema conversion", "Parallel-run validation with zero downtime"],
  },
  {
    icon: GitBranch,
    title: "ETL Modernization & Pipelines",
    description: "Replace brittle Informatica, SSIS, or DataStage jobs with modern orchestration — dbt, Airflow, Azure Data Factory, AWS Glue. Automated testing, lineage tracking, and version-controlled transformations.",
    deliverables: ["dbt model library with CI/CD", "Airflow DAG orchestration", "Data quality checks with Great Expectations"],
  },
  {
    icon: Layers,
    title: "Lakehouse Architecture",
    description: "Unified data lakes + warehouses built for AI from day one. Delta Lake, Apache Iceberg, or Hudi on your cloud of choice. Medallion architecture (Bronze → Silver → Gold) with governance baked in.",
    deliverables: ["Medallion-layer data platform", "Schema evolution & time-travel support", "Role-based access with column-level security"],
  },
  {
    icon: Activity,
    title: "Real-Time Streaming",
    description: "Kafka, Kinesis, Azure Event Hubs, Pub/Sub — with Debezium CDC for change capture. Process data at the source with sub-second latency for fraud detection, IoT monitoring, or live dashboards.",
    deliverables: ["Event-driven architecture design", "CDC pipeline with exactly-once delivery", "Real-time materialized views"],
  },
  {
    icon: Shield,
    title: "Data Governance & Compliance",
    description: "GDPR, HIPAA, SOC 2, PCI-DSS frameworks with automated enforcement. Data cataloging, lineage tracking, PII detection, and audit trails — not documentation that nobody reads, but policies enforced in code.",
    deliverables: ["Automated PII detection & masking", "Data catalog with Purview/Glue Catalog", "Compliance audit trail dashboard"],
  },
];

const processPhases = [
  { phase: "Assess", duration: "1–2 weeks", description: "Infrastructure audit, data quality analysis, migration risk assessment", deliverable: "Modernization Blueprint" },
  { phase: "Architect", duration: "2–3 weeks", description: "Target platform design, cost modeling, security architecture", deliverable: "Architecture & TCO Model" },
  { phase: "Migrate", duration: "4–8 weeks", description: "Automated migration with parallel-run validation, zero downtime", deliverable: "Migrated Data Platform" },
  { phase: "Optimize", duration: "2–4 weeks", description: "Performance tuning, cost optimization, team enablement", deliverable: "Production-Ready Platform" },
  { phase: "Operate", duration: "Ongoing", description: "Monitoring, alerting, FinOps reviews, and continuous improvement", deliverable: "SLA-Backed Operations" },
];

const faqItems = [
  {
    question: "How long does a data warehouse migration take?",
    answer: "Typically 8–16 weeks depending on complexity. Simple migrations (single source, clean schema) can complete in 8 weeks. Enterprise-scale migrations with multiple source systems, complex transformations, and regulatory requirements take 12–16 weeks. We run parallel environments so there's zero downtime during cutover.",
  },
  {
    question: "How much does data engineering consulting cost?",
    answer: "Assessments start at $15K–$25K (1–2 weeks). Full modernization projects range from $75K–$300K+ depending on scope. We provide detailed cost models upfront including a 3-year TCO comparison showing your current spend vs. the modernized platform — most clients see 30–40% infrastructure cost savings within year one.",
  },
  {
    question: "Should we use Snowflake, Databricks, or BigQuery?",
    answer: "It depends on your workload mix. Snowflake excels at concurrent SQL analytics. Databricks is best for ML/AI workloads with Spark. BigQuery wins on zero-ops simplicity and Google ecosystem integration. We evaluate your specific requirements — query patterns, team skills, existing cloud contracts — and recommend the best fit. Sometimes the answer is a combination.",
  },
  {
    question: "What is a data lakehouse and do we need one?",
    answer: "A lakehouse combines the flexibility of a data lake (store any format) with the performance of a warehouse (fast SQL queries). You need one if you're running AI/ML workloads alongside traditional BI, or if you're paying for both a data lake AND a warehouse separately. Technologies like Delta Lake, Apache Iceberg, and Apache Hudi make this practical.",
  },
  {
    question: "Can you migrate without downtime?",
    answer: "Yes — zero-downtime migration is our specialty. We run parallel environments with continuous data sync (using CDC tools like Debezium). When the target platform is validated and performing at parity, we cut over during a maintenance window with rollback capability. Your users don't notice the switch.",
  },
  {
    question: "How do you handle data quality during migration?",
    answer: "We implement automated data quality checks at every stage — row counts, schema validation, value distribution comparisons, and referential integrity checks. Tools like Great Expectations and Monte Carlo run continuously during migration to catch discrepancies before they reach production. Nothing goes live without passing our validation suite.",
  },
  {
    question: "What about our existing reports and dashboards?",
    answer: "We map all downstream dependencies (Tableau, Power BI, Looker, custom apps) before migration starts. Reports are migrated or reconnected as part of the project — not left as an afterthought. We validate that every dashboard produces identical results on the new platform before cutover.",
  },
  {
    question: "Do you work with all three major clouds?",
    answer: "Yes — we're certified across AWS, Azure, and GCP. We also work with Snowflake and Databricks (which run on all three). Our recommendation is based on your requirements, existing contracts, and team capabilities — not our vendor partnerships.",
  },
  {
    question: "What is data mesh and should we adopt it?",
    answer: "Data mesh is a decentralized data architecture where domain teams own their data products. It works well for large organizations (500+ data users) with clearly defined domains. For mid-market companies, a centralized lakehouse with clear ownership policies often delivers 80% of the benefit at 20% of the complexity. We'll recommend the right approach for your scale.",
  },
  {
    question: "How do you handle regulatory compliance (HIPAA, GDPR, SOC 2)?",
    answer: "Compliance is architected from day one, not bolted on. We implement column-level encryption, automated PII detection, row-level security, audit logging, and data retention policies directly in the platform. For healthcare clients, we ensure HIPAA BAA coverage across all services. For financial services, we align with SOC 2 Type II controls.",
  },
];

export function DataEngineeringPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  useEffect(() => {
    trackServicePageView("Data Engineering & Modernization");
    const cleanup = createScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Data Engineering & Modernization Services",
          description: "Enterprise data engineering: cloud migration, lakehouse architecture, real-time pipelines. 5PB+ migrated with zero downtime.",
          url: "https://innovoco.com/services/data-engineering-modernization",
          serviceType: "Data Engineering",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
          { name: "Data Engineering & Modernization", url: "https://innovoco.com/services/data-engineering-modernization" },
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
        <Header onContactClick={openContact} customLogo="/images/logos/innovoco-data-hires.png" />

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
                  <Database className="h-4 w-4" />
                  Data Engineering & Modernization
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  Build the Data Foundation{" "}
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                    Your AI Deserves
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Cloud-native data platforms, real-time pipelines, and zero-downtime migrations.
                  10+ years building AI-ready infrastructure that delivers 3x faster insights at 40% lower cost.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Schedule Data Assessment
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
                    { value: "5PB+", label: "Data Migrated" },
                    { value: "1000+", label: "Pipelines Built" },
                    { value: "40%", label: "Avg Cost Reduction" },
                    { value: "99.9%", label: "Pipeline Uptime" },
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
                  Your AI Is Only as Good as Your Data
                </motion.h2>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  { stat: "73%", label: "of enterprises still rely on legacy data warehouses built 10–15 years ago", source: "Gartner 2026" },
                  { stat: "60%", label: "of agentic AI projects will fail in 2026 due to lack of AI-ready data", source: "Gartner" },
                  { stat: "97%", label: "of companies are investing in data & AI — but most lack the infrastructure to use it", source: "NewVantage 2026" },
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
                className="mt-10 text-center text-base text-[#64748B] max-w-2xl mx-auto"
              >
                You can&apos;t build intelligence on top of chaos. We modernize the foundation first.
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
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
                  Core Services
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  What We Build
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
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D1FAE5]">
                                  <Icon className="h-5 w-5 text-[#0F766E]" />
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
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F766E] mt-0.5" />
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
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
                  Our Process
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl lg:text-5xl">
                  Assessment to Production in 8–16 Weeks
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
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-sm font-bold text-white mt-0.5">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-bold text-[#0B0F19]">{p.phase}</h3>
                          <Badge variant="secondary" className="bg-emerald-50 text-[#0F766E] border-emerald-200 text-xs">
                            {p.duration}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-[#64748B]">{p.description}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs font-semibold text-[#0B0F19]">
                        <Target className="h-4 w-4 text-[#0F766E]" />
                        {p.deliverable}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ WHY US ═══════════ */}
          <section className="bg-[#F8FAFC] py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
                  Why Innovoco
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Data Engineering Is Our Origin Story
                </motion.h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Clock,
                    title: "10+ Years, Not 10 Months",
                    description: "We've been building enterprise data platforms since before 'data engineering' was a job title. Petabyte-scale migrations, Fortune 500 warehouses, and real-time pipelines — long before the AI hype.",
                  },
                  {
                    icon: Layers,
                    title: "AI-First Architecture",
                    description: "Every platform we build is designed for AI workloads from day one — vector-ready schemas, feature stores, embedding pipelines, and ML-optimized compute. Not a warehouse with AI bolted on later.",
                  },
                  {
                    icon: CircleDollarSign,
                    title: "30–40% Cost Reduction",
                    description: "Our FinOps practice is integrated into every project. Auto-scaling, right-sizing, reserved capacity optimization, and query cost governance. Most clients pay for the project with year-one savings.",
                  },
                  {
                    icon: Shield,
                    title: "Zero-Downtime Migration",
                    description: "5PB+ migrated without a single minute of unplanned downtime. Parallel-run validation, automated rollback, and continuous data sync ensure your business never stops while we modernize.",
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
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D1FAE5] mb-5">
                            <Icon className="h-5 w-5 text-[#0F766E]" />
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
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center"
              >
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
                  Investment
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  Transparent Pricing
                </motion.h2>
              </motion.div>

              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {[
                  {
                    tier: "Data Assessment",
                    price: "$15K–$25K",
                    duration: "1–2 weeks",
                    includes: ["Infrastructure audit", "Data quality analysis", "Migration risk assessment", "Modernization blueprint"],
                  },
                  {
                    tier: "Platform Modernization",
                    price: "$75K–$200K",
                    duration: "8–16 weeks",
                    includes: ["Everything in Assessment", "Cloud migration execution", "ETL modernization", "Governance framework", "Team enablement"],
                    featured: true,
                  },
                  {
                    tier: "Enterprise Transformation",
                    price: "$200K–$500K+",
                    duration: "16–24 weeks",
                    includes: ["Everything in Modernization", "Multi-source integration", "Real-time streaming layer", "Lakehouse architecture", "Ongoing FinOps optimization"],
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
                    <Card className={`h-full rounded-[22px] ${t.featured ? "border-[#0F766E] border-2 shadow-md" : "border-border/30 shadow-sm"}`}>
                      <CardContent className="p-8">
                        {t.featured && (
                          <Badge className="bg-[#0F766E] text-white mb-4 text-xs">Most Popular</Badge>
                        )}
                        <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">{t.tier}</p>
                        <p className="mt-2 text-3xl font-bold text-[#0B0F19]">{t.price}</p>
                        <p className="mt-1 text-sm text-[#0F766E] font-medium">{t.duration}</p>
                        <ul className="mt-6 space-y-2">
                          {t.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[#525252]">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F766E] mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={openContact}
                          className={`mt-6 w-full rounded-full cursor-pointer ${t.featured ? "bg-[#0F766E] hover:bg-[#0D5B53] text-white" : "bg-white border border-[#0F766E] text-[#0F766E] hover:bg-[#D1FAE5]/50"}`}
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
                <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[#0F766E]">
                  What Comes Next
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="mt-3 text-3xl font-bold text-[#0B0F19] md:text-4xl">
                  From Data Platform to AI Production
                </motion.h2>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: Brain,
                    gradient: "from-[#DBEAFE] to-[#93C5FD]",
                    title: "AI Strategy",
                    description: "Define which AI use cases your new platform should power first.",
                    href: "/services/ai-strategy-consulting",
                  },
                  {
                    icon: Zap,
                    gradient: "from-[#EDE9FE] to-[#C4B5FD]",
                    title: "AI Implementation",
                    description: "Build agentic AI, LLMs, and RAG systems on your modernized data.",
                    href: "/services/ai-implementation",
                  },
                  {
                    icon: LifeBuoy,
                    gradient: "from-[#FEF3C7] to-[#FDE68A]",
                    title: "Managed AI Ops",
                    description: "24/7 monitoring for both your data platform and AI models.",
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
                            <h3 className="text-base font-bold text-[#0B0F19] mb-1 group-hover:text-[#0F766E] transition-colors">{s.title}</h3>
                            <p className="text-sm text-[#64748B] mb-3">{s.description}</p>
                            <span className="text-sm font-medium text-[#0F766E] inline-flex items-center gap-1">
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
            title="Data Engineering — Common Questions"
            subtitle="What to expect when modernizing your data infrastructure with us."
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/15 via-transparent to-[#0A58D0]/10" />

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
                  Your Data Platform Is Holding You Back.
                  <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                    Let&apos;s Fix That.
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] md:text-xl"
                >
                  Free 90-minute data assessment. We&apos;ll audit your infrastructure, identify bottlenecks, and outline the fastest path to an AI-ready platform.
                </motion.p>
                <motion.div variants={fadeUp} custom={2} className="mt-10">
                  <Button
                    onClick={openContact}
                    size="lg"
                    className="group cursor-pointer rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#0B0F19] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
                  >
                    Schedule Data Assessment
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="mt-5 text-sm font-medium text-white/60 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                >
                  90 min · Free · No obligation
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
