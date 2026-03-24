"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Activity,
  AlertTriangle,
  BarChart3,
  Lock,
  DollarSign,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Brain,
  Rocket,
  Database,
  HeartPulse,
  Factory,
  ShoppingCart,
  Zap,
  Eye,
  FileCheck,
  Scale,
  GitBranch,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  IndustryGetStartedCard,
  industryGetStartedGridClassName,
} from "@/components/industries/IndustryGetStartedCard";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/landing/ContactModal";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/seo/schema";

/* ─── animations ─── */
const fadeEase = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: fadeEase },
  }),
};

/* ─── data ─── */
const trustMetrics = [
  { value: "$50M+", label: "Fraud Savings Delivered" },
  { value: "95%+", label: "Detection Accuracy" },
  { value: "<100ms", label: "Transaction Scoring" },
  { value: "80%", label: "False Positive Reduction" },
];

const capabilities = [
  {
    icon: AlertTriangle,
    title: "Real-Time Fraud Detection",
    description:
      "ML-powered transaction scoring analyzing payment patterns, merchant categories, geographic anomalies, and behavioral biometrics in under 100ms. Continuously retrained as fraud tactics evolve.",
    stats: [
      { label: "Detection Rate", value: "95%+" },
      { label: "Scoring Latency", value: "<100ms" },
      { label: "False Positive Reduction", value: "80%" },
    ],
  },
  {
    icon: Shield,
    title: "AML Transaction Monitoring",
    description:
      "Hybrid rule-based and machine learning systems detecting structuring, smurfing, and money laundering patterns. Automated high-quality SAR generation for BSA/FinCEN compliance.",
    stats: [
      { label: "Alert Reduction", value: "70%" },
      { label: "Annual Savings", value: "$350K+" },
      { label: "Regulatory Compliance", value: "100%" },
    ],
  },
  {
    icon: BarChart3,
    title: "Credit Risk Modeling",
    description:
      "Alternative credit risk models incorporating utility payments, rent history, cash flow analysis, and employment data. Fair Lending compliant with ECOA disparate impact testing.",
    stats: [
      { label: "Approval Lift", value: "25%" },
      { label: "Default Rate", value: "5%" },
      { label: "ECOA Compliant", value: "100%" },
    ],
  },
  {
    icon: Activity,
    title: "Algorithmic Trading & Sentiment",
    description:
      "NLP-powered sentiment analysis processing 10K+ daily news articles, earnings call transcripts, and social media signals. Real-time integration with trading algorithms.",
    stats: [
      { label: "Alpha Generation", value: "3.2%" },
      { label: "Articles / Day", value: "10K+" },
      { label: "Signal Latency", value: "<5 min" },
    ],
  },
  {
    icon: GitBranch,
    title: "Private Equity & Sponsor Intelligence",
    description:
      "AI-assisted deal sourcing and pipeline prioritization, structured review of CIMs and dataroom materials, and portfolio-level operating metrics so investment and operating partners see performance consistently across businesses—within access controls and audit trails fit for sponsors.",
    stats: [
      { label: "Diligence outputs", value: "Structured" },
      { label: "Pipeline focus", value: "Prioritized" },
      { label: "Portco analytics", value: "Repeatable" },
    ],
  },
];

const caseStudies = [
  {
    tag: "Regional Bank",
    title: "Real-Time Fraud Detection System",
    challenge:
      "$25M annual fraud losses across credit card, ACH, and wire transactions. Legacy rules-based system had a 65% false positive rate causing significant customer friction.",
    solution:
      "Deployed ML-powered real-time fraud detection analyzing payment patterns, merchant categories, geographic anomalies, and behavioral biometrics with sub-100ms transaction scoring.",
    results: [
      { metric: "$18M", label: "Annual Fraud Savings" },
      { metric: "95%+", label: "Fraud Detection Rate" },
      { metric: "80%", label: "False Positive Reduction" },
    ],
  },
  {
    tag: "Digital Lending",
    title: "Alternative Credit Scoring for Fintech",
    challenge:
      "Fintech lender missing opportunities to serve underbanked populations. Traditional FICO scores rejected 40% of applicants who could safely receive credit.",
    solution:
      "Built alternative credit risk model incorporating utility payments, rent history, bank transaction cash flow, education, and employment with Fair Lending compliance.",
    results: [
      { metric: "25%", label: "Approval Rate Increase" },
      { metric: "5%", label: "Default Rate" },
      { metric: "100%", label: "ECOA Compliant" },
    ],
  },
  {
    tag: "Hedge Fund",
    title: "Algorithmic Trading Sentiment Analysis",
    challenge:
      "Quantitative hedge fund seeking alpha-generating signals from alternative data. Manual analysis of news and earnings calls too slow for short-term strategies.",
    solution:
      "Implemented NLP-powered sentiment analysis platform processing 10K+ daily articles, earnings call transcripts, and social media with real-time trading integration.",
    results: [
      { metric: "3.2%", label: "Alpha Generation" },
      { metric: "10K+", label: "Daily Articles Processed" },
      { metric: "<5min", label: "Signal Latency" },
    ],
  },
  {
    tag: "Commercial Bank",
    title: "AML Transaction Monitoring System",
    challenge:
      "$500K annual false positive investigation costs from legacy rule-based AML system. 95% of Suspicious Activity Reports filed were false positives.",
    solution:
      "Deployed hybrid rule-based + ML AML monitoring detecting structuring, smurfing, and money laundering patterns with automated high-quality SAR generation.",
    results: [
      { metric: "70%", label: "False Positive Reduction" },
      { metric: "$350K", label: "Annual Cost Savings" },
      { metric: "100%", label: "BSA/FinCEN Compliant" },
    ],
  },
  {
    tag: "Private Equity",
    title: "Deal Flow & Diligence Acceleration",
    challenge:
      "Middle-market sponsor facing high volumes of teasers, CIMs, and dataroom documents. Teams lost time reconciling financial and operating metrics across targets and portfolio companies with inconsistent reporting.",
    solution:
      "Custom AI workflows for screening and summarization, structured extraction from diligence materials, and portfolio dashboards that normalize KPIs for investment committee and operating partner review.",
    results: [
      { metric: "Structured", label: "IC-ready diligence packs" },
      { metric: "Unified", label: "Cross-portco KPI views" },
      { metric: "Governed", label: "Confidentiality & access" },
    ],
  },
];

const differentiators = [
  {
    icon: Shield,
    title: "SOC 2 & PCI-DSS Expertise",
    description:
      "Deep expertise in SOC 2 Type II and PCI-DSS Level 1 compliance. Every AI solution meets financial services regulatory requirements from design through deployment.",
    metric: "100% Compliant Deployments",
  },
  {
    icon: BarChart3,
    title: "Core Banking Integration",
    description:
      "Seamless integration with FIS, Temenos, Jack Henry, Fiserv, and Oracle platforms. We understand data models, transaction flows, and API requirements.",
    metric: "100+ Banking Integrations",
  },
  {
    icon: DollarSign,
    title: "Fraud Detection Excellence",
    description:
      "AI solutions maximizing fraud detection while minimizing false positives. Measured through fraud savings, detection rates, and customer satisfaction.",
    metric: "$50M+ Fraud Savings",
  },
  {
    icon: Lock,
    title: "Regulatory Knowledge",
    description:
      "Navigate complex regulations including BSA, GLBA, ECOA, Fair Lending, SR 11-7 model governance, and SEC/FINRA requirements for algorithmic trading.",
    metric: "10+ Years Experience",
  },
  {
    icon: GitBranch,
    title: "Private Equity & Sponsors",
    description:
      "Support for GPs and sponsor platforms: deal flow, diligence efficiency, and portfolio analytics—with confidentiality, least-privilege access, and documentation suitable for internal risk and LP scrutiny.",
    metric: "Deals + portcos",
  },
];

const complianceItems = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "PCI-DSS Level 1" },
  { icon: FileCheck, label: "SR 11-7 MRM" },
  { icon: Scale, label: "ECOA / Fair Lending" },
  { icon: Eye, label: "BSA / FinCEN" },
  { icon: Zap, label: "SEC / FINRA" },
];

const faqs = [
  {
    q: "How do you ensure SOC 2 and PCI-DSS compliance in financial AI solutions?",
    a: "Our financial services AI solutions are built with SOC 2 Type II and PCI-DSS Level 1 compliance from the ground up. We implement AES-256 encryption at rest, TLS 1.3 for data in transit, comprehensive audit logging, role-based access controls, and secure key management. We maintain annual SOC 2 audits and PCI-DSS requirements including network segmentation, tokenization, and quarterly vulnerability scanning.",
  },
  {
    q: "What core banking systems do you integrate with?",
    a: "We have deep integration experience with FIS (Systematics, Profile, Horizon), Temenos (T24, Transact), Jack Henry (Symitar, Episys, Silverlake), Fiserv (DNA, Premier, Signature), and Oracle FLEXCUBE. Our integrations leverage native APIs, SOAP/REST web services, batch file processing (ACH, BAI2, MT940), and real-time messaging.",
  },
  {
    q: "What is the typical ROI timeline for fraud detection AI?",
    a: "Fraud detection ROI is typically realized within 6-9 months. Initial POC (4-6 weeks) validates detection accuracy on historical data. Production deployment (12-16 weeks) includes model training, payment system integration, and compliance validation. Most banks see 40-60% fraud reduction, 70-80% fewer false positives, and sub-100ms scoring within the first quarter.",
  },
  {
    q: "How do you handle sensitive financial data in AI model training?",
    a: "We employ federated learning, differential privacy, PII de-identification per GLBA requirements, and secure enclaves. All training data is encrypted, access is logged with SOC 2 audit trails, and data governance policies enforce minimum necessary access. Models are tested for privacy leakage and validated for fair lending compliance.",
  },
  {
    q: "Can AI improve both fraud detection and customer experience?",
    a: "Our ML-powered fraud detection achieves 95%+ accuracy with 70-80% fewer false positives compared to traditional rule-based systems. Behavioral biometrics and device fingerprinting enable frictionless authentication for trusted users while flagging anomalous activity. Dynamic risk scoring adjusts controls in real-time, delivering reduced fraud and better customer experiences simultaneously.",
  },
  {
    q: "How do you validate AI models for regulatory compliance (SR 11-7)?",
    a: "We follow Federal Reserve SR 11-7 guidance throughout the AI lifecycle, including comprehensive documentation, independent model validation, bias and fair lending compliance testing, automated performance monitoring with drift alerting, and quarterly reviews. We provide all documentation required for regulatory examinations and internal audit reviews.",
  },
  {
    q: "Do you work with private equity firms and sponsors?",
    a: "Yes. We build governed AI workflows for investment teams and operating partners—deal screening, diligence support, knowledge search across materials, and portfolio operating views—without mixing confidential data across mandates. Deployments align with your security standards, vendor due diligence, and model risk expectations.",
  },
  {
    q: "What PE use cases do sponsors typically prioritize first?",
    a: "Most sponsors start with high-friction document workflows (CIMs, dataroom Q&A support, management presentation summaries) and portfolio reporting consistency. From there we expand to pipeline prioritization, sector research assistance, and operating metrics aligned across portcos—always with human review for investment decisions.",
  },
];

const relatedIndustries = [
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description:
      "HIPAA-compliant AI for clinical decision support, predictive analytics, and medical imaging.",
    href: "/solutions/industries/healthcare",
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    description:
      "Industry 4.0 intelligent automation, predictive maintenance, and supply chain optimization.",
    href: "/solutions/industries/manufacturing",
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description:
      "Customer 360 analytics, AI personalization, demand forecasting, and dynamic pricing.",
    href: "/solutions/industries/retail",
  },
];

/* ─── component ─── */
export function FinancialServicesPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Financial Services AI Automation & Analytics Solutions",
          description:
            "Real-time fraud detection AI, risk analytics, regulatory compliance, and private equity deal and portfolio intelligence for banks, institutions, and sponsors.",
          url: "https://innovoco.com/solutions/industries/financial-services",
          serviceType: "Financial Services AI Solutions",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
          {
            name: "Financial Services",
            url: "https://innovoco.com/solutions/industries/financial-services",
          },
        ])}
      />

      <div className="min-h-screen bg-[var(--background)]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header onContactClick={openContact} />

        <main id="main-content" role="main">
          {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
          <section className="relative overflow-hidden bg-[#0B1426]">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/industries/financial-services-hero.jpg"
                alt=""
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-black/35" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/70 via-[#0B1426]/50 to-[#0B1426]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-40">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
                className="mx-auto max-w-4xl text-center"
              >
                {/* Badge */}
                <motion.div variants={fadeUp} custom={0}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1E3A5F] bg-[#0F2035] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#5BC0EB]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5BC0EB] animate-pulse" />
                    Banks, Markets & Sponsors
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  AI-Powered Intelligence for{" "}
                  <span className="text-[#5BC0EB]">Financial Services</span>
                </motion.h1>

                {/* Subhead */}
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-200 md:text-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
                >
                  Real-time fraud detection, risk analytics, regulatory
                  compliance, and sponsor-side deal and portfolio intelligence—so
                  banks, institutions, and private equity teams move faster with
                  governed AI.
                </motion.p>

                {/* CTA */}
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  <Button
                    size="lg"
                    onClick={openContact}
                    className="bg-[#5BC0EB] text-[#0B1426] hover:bg-[#89D2F1] px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#5BC0EB]/20 hover:shadow-xl hover:shadow-[#5BC0EB]/30 transition-all duration-300"
                  >
                    Schedule Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() =>
                      document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="border border-solid border-[#1E3A5F] px-8 py-6 text-base font-semibold text-white shadow-none transition-all duration-300 hover:border-[#5BC0EB]/50 hover:text-white hover:!bg-[#5BC0EB]/10"
                  >
                    Explore Solutions
                  </Button>
                </motion.div>

                {/* Trust metrics bar */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-[#1E3A5F] pt-10 md:grid-cols-4"
                >
                  {trustMetrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white md:text-3xl">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-slate-300 md:text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.75)]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════ CAPABILITIES ═══════════════════ */}
          <section
            id="capabilities"
            className="bg-[var(--background)] py-20 md:py-28"
          >
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#0284c7]"
                >
                  Our Solutions
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl lg:text-5xl"
                >
                  AI Solutions Engineered for Finance
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#64748B]"
                >
                  Purpose-built AI capabilities for fraud, risk, compliance,
                  markets—and private equity deal flow, diligence, and
                  portfolio performance.
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
                      variants={{
                        visible: { transition: { staggerChildren: 0.08 } },
                      }}
                      className={`flex flex-col items-center gap-10 lg:gap-16 ${
                        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                      }`}
                    >
                      {/* Text side */}
                      <div className="flex-1 space-y-5">
                        <motion.div variants={fadeUp} className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0284c7]/10">
                            <Icon className="h-5 w-5 text-[#0284c7]" />
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                            {cap.title}
                          </h3>
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
                            className="group px-0 text-[#0284c7] hover:text-[#0369a1] hover:bg-transparent font-semibold"
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      </div>

                      {/* Stats card */}
                      <motion.div
                        variants={fadeUp}
                        custom={2}
                        className="w-full max-w-md flex-shrink-0 lg:w-[380px]"
                      >
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
                          <div className="space-y-6">
                            {cap.stats.map((s, si) => (
                              <div key={si} className="flex items-center justify-between">
                                <span className="text-sm text-[#64748B]">{s.label}</span>
                                <span className="text-xl font-bold text-[var(--foreground)]">
                                  {s.value}
                                </span>
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

          {/* ═══════════════════ COMPLIANCE STRIP ═══════════════════ */}
          <section className="border-y border-[var(--border)] bg-[var(--muted)] py-12">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-8 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#0284c7]">
                  Compliance & Security
                </h3>
                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  Built for the most regulated industry in the world
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {complianceItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center"
                    >
                      <Icon className="h-5 w-5 text-[#0284c7]" />
                      <span className="text-xs font-semibold text-[var(--foreground)]">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════ CASE STUDIES ═══════════════════ */}
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#0284c7]"
                >
                  Proven Results
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  Financial Services AI Success Stories
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-[#64748B]"
                >
                  Real-world results from banks and financial institutions
                  who&apos;ve transformed operations with AI.
                </motion.p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                {caseStudies.map((cs, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    custom={idx * 0.5}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-shadow duration-300 hover:shadow-lg"
                  >
                    {/* Header */}
                    <div className="border-b border-[var(--border)] px-8 py-5">
                      <span className="inline-block rounded-full bg-[#0284c7]/10 px-3 py-1 text-xs font-semibold text-[#0284c7]">
                        {cs.tag}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-[var(--foreground)]">
                        {cs.title}
                      </h3>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col px-8 py-6">
                      <div className="mb-4">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                          Challenge
                        </h4>
                        <p className="text-sm leading-relaxed text-[#64748B]">
                          {cs.challenge}
                        </p>
                      </div>
                      <div className="mb-6">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                          Solution
                        </h4>
                        <p className="text-sm leading-relaxed text-[#64748B]">
                          {cs.solution}
                        </p>
                      </div>

                      {/* Results bar */}
                      <div className="mt-auto grid grid-cols-3 gap-3 rounded-xl bg-[var(--muted)] p-4">
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="text-center">
                            <div className="text-lg font-bold text-[#0284c7]">
                              {r.metric}
                            </div>
                            <div className="mt-0.5 text-xs text-[#64748B]">
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════ MID-PAGE CTA ═══════════════════ */}
          <section className="bg-[#0B1426] py-20">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                Ready to transform your financial operations with AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#94A3B8]">
                SOC 2 compliant. 30-minute consultation. No obligation.
              </p>
              <Button
                size="lg"
                onClick={openContact}
                className="mt-8 bg-[#5BC0EB] text-[#0B1426] hover:bg-[#89D2F1] px-10 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#5BC0EB]/20 transition-all duration-300"
              >
                Book Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>

          {/* ═══════════════════ DIFFERENTIATORS ═══════════════════ */}
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#0284c7]"
                >
                  Why Innovoco
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  Purpose-Built for Financial Services
                </motion.h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {differentiators.map((d, idx) => {
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
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0284c7]/10">
                          <Icon className="h-6 w-6 text-[#0284c7]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0284c7]">
                            {d.metric}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
                            {d.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                            {d.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════ FAQS ═══════════════════ */}
          <section className="border-t border-[var(--border)] bg-[var(--muted)] py-20 md:py-28">
            <div className="mx-auto max-w-3xl px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="mb-12 text-center"
              >
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  Frequently Asked Questions
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mx-auto mt-3 max-w-xl text-pretty text-lg text-[#64748B]"
                >
                  Common questions about implementing AI in financial services
                </motion.p>
              </motion.div>

              <SchemaMarkup
                schema={{
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }}
              />

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 transition-shadow hover:shadow-sm"
                  >
                    <AccordionTrigger className="py-5 text-left font-semibold text-[var(--foreground)] hover:text-[#0284c7]">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-1 text-sm leading-relaxed text-[#64748B]">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* ═══════════════════ ACTION CTAs ═══════════════════ */}
          <section className="bg-[var(--background)] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  Get Started
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-lg text-[#64748B]">
                  Choose your next step toward AI-powered financial operations
                </p>
              </div>
              <div className={industryGetStartedGridClassName}>
                {[
                  {
                    icon: Shield,
                    tag: "Complimentary",
                    title: "Compliance Assessment",
                    description:
                      "Free 60-minute consultation to review your compliance posture and discuss SOC 2/PCI-DSS compliant AI solutions.",
                    cta: "Schedule Assessment",
                  },
                  {
                    icon: DollarSign,
                    tag: "Free Tool",
                    title: "Fraud Detection ROI Calculator",
                    description:
                      "Calculate potential ROI including fraud savings, false positive reduction, and operational efficiency metrics.",
                    cta: "Get ROI Calculator",
                  },
                  {
                    icon: BarChart3,
                    tag: "On Demand",
                    title: "Financial AI Webinar",
                    description:
                      "Explore the latest AI innovations in fraud detection, credit risk modeling, and algorithmic trading.",
                    cta: "Register Now",
                  },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <IndustryGetStartedCard
                      key={idx}
                      theme="financial"
                      icon={Icon}
                      tag={card.tag}
                      title={card.title}
                      description={card.description}
                      action={card.cta}
                      onAction={openContact}
                      buttonBackground="#0284c7"
                      buttonForeground="#ffffff"
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════ RELATED INDUSTRIES ═══════════════════ */}
          <section className="border-t border-[var(--border)] bg-[var(--muted)] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  Explore Other Industries
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-lg text-[#64748B]">
                  Discover how we deliver intelligent automation across multiple
                  sectors.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedIndustries.map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <Link
                      key={idx}
                      href={ind.href}
                      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:shadow-lg hover:border-[#0284c7]/30"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0284c7]/10">
                        <Icon className="h-6 w-6 text-[#0284c7]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--foreground)]">
                        {ind.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                        {ind.description}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-semibold text-[#0284c7] group-hover:text-[#0369a1] transition-colors">
                        Explore Solutions
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══════════════════ FINAL CTA ═══════════════════ */}
          <section className="bg-[#0B1426] py-20">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                Partner with financial services AI experts
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#94A3B8]">
                10+ years financial services experience. SOC 2 & PCI-DSS
                certified. Proven results with banks and financial institutions.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={openContact}
                  className="bg-[#5BC0EB] text-[#0B1426] hover:bg-[#89D2F1] px-10 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#5BC0EB]/20 transition-all duration-300"
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
