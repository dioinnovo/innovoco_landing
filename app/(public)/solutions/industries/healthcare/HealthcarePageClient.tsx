"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Activity,
  HeartPulse,
  AlertTriangle,
  Brain,
  Users,
  Target,
  FileText,
  CheckCircle,
  Factory,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
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
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── data ─── */
const trustMetrics = [
  { value: "100+", label: "Healthcare Clients" },
  { value: "25%", label: "Avg Readmission Reduction" },
  { value: "90%+", label: "Diagnostic Accuracy" },
  { value: "100%", label: "HIPAA Compliant" },
];

const capabilities = [
  {
    icon: Brain,
    title: "Clinical Decision Support",
    description:
      "AI-powered clinical decision support systems that analyze patient histories, lab results, medical imaging, and clinical notes in real time. Integrated with EHR systems like Epic, Cerner, and Allscripts to provide drug interaction alerts, sepsis risk detection, and clinical deterioration warnings at the point of care.",
    stats: [
      { label: "Diagnostic Accuracy", value: "90%+" },
      { label: "Adverse Events Reduction", value: "25-35%" },
      { label: "Alert Response Time", value: "Real-time" },
    ],
  },
  {
    icon: Activity,
    title: "Medical Imaging AI",
    description:
      "Computer vision models trained on NIH ChestX-ray14 and MIMIC datasets that detect tumors, fractures, and abnormalities in X-rays, CT scans, and MRIs. Prioritizes urgent cases for radiologist review, reducing turnaround times and diagnostic errors while handling 500+ daily imaging studies.",
    stats: [
      { label: "Sensitivity Rate", value: "90%+" },
      { label: "Turnaround Reduction", value: "18 hrs" },
      { label: "Fewer Diagnostic Errors", value: "30-40%" },
    ],
  },
  {
    icon: Target,
    title: "Population Health Management",
    description:
      "Predictive analytics platform integrated with multiple EHRs for chronic disease risk scoring, gap-in-care identification, and automated outreach for preventive services. Identifies high-risk patients likely to be readmitted, develop chronic conditions, or become high utilizers of emergency services.",
    stats: [
      { label: "Prediction Accuracy", value: "75-85%" },
      { label: "Care Cost Reduction", value: "30%" },
      { label: "Preventive Care Lift", value: "22%" },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Sepsis Early Warning System",
    description:
      "Real-time sepsis detection using EHR data streams including vital signs, lab results, and clinical notes. ML models alert clinicians 6-12 hours before clinical manifestation, enabling early antibiotic administration and dramatically reducing mortality in critical care settings.",
    stats: [
      { label: "Early Detection", value: "6-12 hrs" },
      { label: "Mortality Reduction", value: "15-20%" },
      { label: "ICU Stay Reduction", value: "35%" },
    ],
  },
];

const caseStudies = [
  {
    tag: "Multi-Hospital System",
    title: "Regional Hospital Network Readmission Reduction",
    challenge:
      "15-hospital network facing $2.3M annual penalties from CMS for excessive 30-day readmissions, particularly in CHF and COPD patients.",
    solution:
      "Deployed ML-powered readmission risk stratification integrated with Epic EHR. Real-time scoring at discharge identifies high-risk patients (75-85% accuracy) triggering automated care coordination workflows.",
    results: [
      { metric: "25%", label: "Readmission Reduction" },
      { metric: "$1.8M", label: "Annual Penalty Savings" },
      { metric: "100%", label: "HIPAA Compliant" },
    ],
  },
  {
    tag: "Academic Medical Center",
    title: "Medical Imaging AI for Radiology",
    challenge:
      "Radiology department overwhelmed with 500+ daily imaging studies. Average turnaround time of 36 hours causing treatment delays and patient dissatisfaction.",
    solution:
      "Implemented AI-assisted radiology platform for chest X-rays and CT scans. Computer vision models flag abnormalities for radiologist review, prioritizing urgent cases automatically.",
    results: [
      { metric: "90%+", label: "Diagnostic Sensitivity" },
      { metric: "18 hrs", label: "Turnaround Reduction" },
      { metric: "40%", label: "Fewer Diagnostic Errors" },
    ],
  },
  {
    tag: "Accountable Care Org",
    title: "Population Health Management Platform",
    challenge:
      "ACO managing 125,000 Medicare beneficiaries struggled to identify high-risk patients for proactive interventions, resulting in poor quality scores and shared savings.",
    solution:
      "Built predictive analytics platform integrated with multiple EHRs (Epic, Cerner, Allscripts). Chronic disease risk scoring, gap-in-care identification, and automated outreach for preventive services.",
    results: [
      { metric: "30%", label: "Care Cost Reduction" },
      { metric: "22%", label: "Preventive Care Lift" },
      { metric: "$4.2M", label: "Shared Savings" },
    ],
  },
  {
    tag: "Critical Care Network",
    title: "Sepsis Early Warning System",
    challenge:
      "350-bed hospital with sepsis mortality rate of 28% (above national average of 20%). Delayed recognition in 40% of cases leading to preventable deaths.",
    solution:
      "Deployed real-time sepsis detection using EHR data streams. ML model alerts clinicians 6-12 hours before clinical manifestation, enabling early antibiotic administration.",
    results: [
      { metric: "18%", label: "Mortality Rate (was 28%)" },
      { metric: "6-12 hrs", label: "Early Detection Window" },
      { metric: "35%", label: "ICU Stay Reduction" },
    ],
  },
];

const differentiators = [
  {
    icon: Shield,
    title: "HIPAA Compliance Expertise",
    description:
      "Deep expertise in HIPAA Privacy Rule, Security Rule, and Breach Notification requirements. BAAs with all cloud providers, automated PHI de-identification, comprehensive audit logging with real-time breach detection.",
    metric: "100% Compliant Deployments",
  },
  {
    icon: Activity,
    title: "EHR Integration Experience",
    description:
      "Seamless integration with Epic, Cerner, Allscripts, athenahealth, and eClinicalWorks. HL7 FHIR, HL7 v2.x messaging, Direct Protocol, and native EHR APIs with minimal workflow disruption.",
    metric: "100+ EHR Integrations",
  },
  {
    icon: HeartPulse,
    title: "Clinical Outcome Focus",
    description:
      "AI solutions designed to improve patient outcomes, not just operational metrics. Measured through reduced mortality, faster diagnoses, fewer adverse events, and improved patient satisfaction scores.",
    metric: "25% Avg Patient Outcome Improvement",
  },
  {
    icon: FileText,
    title: "Regulatory Knowledge",
    description:
      "Navigate CMS quality programs (MIPS, MSSP), FDA Software as a Medical Device (SaMD), payer-specific requirements, and state health department regulations with confidence.",
    metric: "10+ Years Healthcare Experience",
  },
];

const complianceItems = [
  { icon: Shield, label: "HIPAA" },
  { icon: CheckCircle, label: "SOC 2 Type II" },
  { icon: FileText, label: "FDA SaMD" },
  { icon: Users, label: "HITRUST" },
  { icon: Target, label: "CMS / MIPS" },
  { icon: Brain, label: "Joint Commission" },
];

const faqs = [
  {
    q: "How do you ensure HIPAA compliance in AI automation solutions?",
    a: "Our healthcare AI solutions are designed with HIPAA compliance from the ground up. We implement all required technical safeguards including AES-256 encryption at rest, TLS 1.3 for data in transit, comprehensive audit logging of all PHI access, role-based access controls (RBAC), and automated PHI de-identification for analytics. We execute Business Associate Agreements (BAAs) with all cloud providers and subprocessors, conduct regular security assessments, and maintain disaster recovery plans.",
  },
  {
    q: "Which EHR systems do you integrate with?",
    a: "We have deep integration experience with all major EHR platforms including Epic (MyChart, Hyperspace, FHIR APIs), Cerner (Millennium, PowerChart, HealtheIntent), Allscripts (Sunrise, TouchWorks), athenahealth, and eClinicalWorks. Our integrations leverage HL7 FHIR, HL7 v2.x messaging, Direct Protocol for secure messaging, and native EHR APIs. We build AI solutions that seamlessly integrate with your existing clinical systems without disrupting care delivery workflows.",
  },
  {
    q: "What is the typical ROI timeline for healthcare AI automation?",
    a: "Clinical decision support systems (sepsis detection, drug interaction alerts) typically show ROI within 6-9 months through reduced adverse events. Predictive analytics for readmission reduction delivers ROI in 8-12 months via decreased readmission penalties. Medical image analysis shows value within 4-6 months through faster diagnoses. Population health management platforms achieve ROI in 12-18 months through better risk stratification and resource allocation.",
  },
  {
    q: "How do you handle PHI (Protected Health Information) in analytics?",
    a: "We employ multiple strategies depending on the use case. For operational analytics, we use automated de-identification removing all 18 HIPAA identifiers while preserving statistical validity through k-anonymity and differential privacy. For clinical decision support requiring identified PHI, we implement strict access controls, audit all PHI access with real-time alerts, and use field-level encryption. All PHI processing occurs within HIPAA-compliant infrastructure with proper network isolation.",
  },
  {
    q: "Can AI improve both clinical outcomes and operational efficiency?",
    a: "Absolutely. AI-powered sepsis early warning systems reduce mortality by 15-20% while also decreasing ICU length of stay. Medical image analysis improves diagnostic accuracy by 30-40% while reducing radiologist reading time by 25-30%. Predictive readmission models improve patient outcomes through proactive interventions while reducing readmission penalties ($125K-$300K annually per hospital). We design all solutions to deliver measurable improvements in both patient care quality and operational metrics.",
  },
  {
    q: "What compliance certifications do your healthcare solutions maintain?",
    a: "Our healthcare solutions are built on infrastructure certified for HIPAA compliance with executed BAAs. For medical imaging AI, we support FDA Software as a Medical Device (SaMD) compliance pathways. We maintain SOC 2 Type II certification, integrate with HITRUST-certified environments, and support Joint Commission, CMS, and state health department compliance requirements. Our development follows NIST Cybersecurity Framework and OWASP security standards.",
  },
  {
    q: "How do you train AI models while protecting patient privacy?",
    a: "We employ privacy-preserving AI techniques including federated learning, differential privacy, synthetic data generation, and secure multi-party computation. All training data is de-identified per HIPAA Safe Harbor or Expert Determination methods. We maintain strict data governance, audit all data access, use secure enclaves for sensitive processing, and implement model testing to prevent privacy leakage. Models are validated on diverse patient populations to ensure equitable performance.",
  },
  {
    q: "Do you provide ongoing monitoring and model retraining?",
    a: "Yes. Our managed AI services include 24/7 monitoring of model performance metrics, real-time alerting for model drift or degradation, automated retraining pipelines, and A/B testing of model updates before production deployment. For clinical decision support, we monitor alert fatigue metrics and clinical adoption rates. SLA-backed support ensures your AI solutions continue delivering value as patient populations and clinical practices evolve.",
  },
];

const relatedIndustries = [
  {
    icon: TrendingUp,
    title: "Financial Services & Banking",
    description:
      "Real-time fraud detection automation, risk analytics, and regulatory compliance solutions.",
    href: "/solutions/industries/financial-services",
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
export function HealthcarePageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const openContact = () => setContactModalOpen(true);

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Healthcare AI Automation & Analytics Solutions",
          description:
            "HIPAA-compliant AI automation and analytics for healthcare providers. Clinical decision support, predictive analytics, medical imaging AI, and population health management.",
          url: "https://innovoco.com/solutions/industries/healthcare",
          serviceType: "Healthcare AI Solutions",
        })}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
          {
            name: "Healthcare",
            url: "https://innovoco.com/solutions/industries/healthcare",
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
          <section className="relative overflow-hidden bg-[#082420]">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/industries/healthcare-hero.jpg"
                alt=""
                fill
                className="object-cover opacity-35"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#082420]/70 via-[#082420]/50 to-[#082420]" />
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
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1A4A3E] bg-[#0D3028] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#34D399]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    HIPAA-Compliant AI Solutions
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  AI-Powered Intelligence for{" "}
                  <span className="text-[#34D399]">Healthcare</span>
                </motion.h1>

                {/* Subhead */}
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#94A3B8] md:text-xl"
                >
                  Clinical decision support, predictive analytics, and medical
                  imaging AI that help healthcare providers deliver better patient
                  outcomes while maintaining full HIPAA compliance.
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
                    className="bg-[#34D399] text-[#082420] hover:bg-[#6EE7B7] px-8 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#34D399]/20 hover:shadow-xl hover:shadow-[#34D399]/30 transition-all duration-300"
                  >
                    Schedule HIPAA Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() =>
                      document
                        .getElementById("capabilities")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="border-[#1A4A3E] text-[#94A3B8] hover:text-white hover:border-[#34D399]/50 hover:bg-[#34D399]/10 px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300"
                  >
                    Explore Solutions
                  </Button>
                </motion.div>

                {/* Trust metrics bar */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-[#1A4A3E] pt-10 md:grid-cols-4"
                >
                  {trustMetrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-white md:text-3xl">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs text-[#64748B] md:text-sm">
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#059669]"
                >
                  Our Solutions
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl lg:text-5xl"
                >
                  AI Solutions Engineered for Healthcare
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#64748B]"
                >
                  Purpose-built AI capabilities that address the unique
                  challenges of clinical care, diagnostics, compliance, and
                  population health management.
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
                        <motion.div
                          variants={fadeUp}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#059669]/10">
                            <Icon className="h-5 w-5 text-[#059669]" />
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
                            className="group px-0 text-[#059669] hover:text-[#047857] hover:bg-transparent font-semibold"
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
                              <div
                                key={si}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-[#64748B]">
                                  {s.label}
                                </span>
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
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#059669]">
                  Compliance & Security
                </h3>
                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  Built for the most regulated industry in healthcare
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
                      <Icon className="h-5 w-5 text-[#059669]" />
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#059669]"
                >
                  Proven Results
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  Healthcare AI Success Stories
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-[#64748B]"
                >
                  Real-world results from healthcare providers who&apos;ve
                  transformed patient outcomes with HIPAA-compliant AI.
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
                      <span className="inline-block rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-semibold text-[#059669]">
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
                            <div className="text-lg font-bold text-[#059669]">
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
          <section className="bg-[#082420] py-20">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                Ready to transform patient outcomes with AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#94A3B8]">
                HIPAA compliant. 30-minute consultation. No obligation.
              </p>
              <Button
                size="lg"
                onClick={openContact}
                className="mt-8 bg-[#34D399] text-[#082420] hover:bg-[#6EE7B7] px-10 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#34D399]/20 transition-all duration-300"
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
                  className="text-sm font-semibold uppercase tracking-widest text-[#059669]"
                >
                  Why Innovoco
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="mt-3 text-balance text-3xl font-bold text-[var(--foreground)] md:text-4xl"
                >
                  Purpose-Built for Healthcare
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
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#059669]/10">
                          <Icon className="h-6 w-6 text-[#059669]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#059669]">
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
                  Common questions about implementing HIPAA-compliant AI in
                  healthcare
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
                    <AccordionTrigger className="py-5 text-left font-semibold text-[var(--foreground)] hover:text-[#059669]">
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
                  Choose your next step toward AI-powered healthcare operations
                </p>
              </div>
              <div className={industryGetStartedGridClassName}>
                {[
                  {
                    icon: Shield,
                    tag: "Complimentary",
                    title: "HIPAA Compliance Assessment",
                    description:
                      "Free 60-minute consultation to review your compliance posture and discuss HIPAA-compliant AI solutions for your organization.",
                    cta: "Schedule Assessment",
                  },
                  {
                    icon: DollarSign,
                    tag: "Free Tool",
                    title: "Healthcare AI ROI Calculator",
                    description:
                      "Calculate potential ROI including readmission reduction, diagnostic accuracy improvement, and operational efficiency metrics.",
                    cta: "Get ROI Calculator",
                  },
                  {
                    icon: Calendar,
                    tag: "On Demand",
                    title: "Healthcare AI Webinar",
                    description:
                      "Explore the latest AI innovations in clinical decision support, medical imaging AI, and population health management.",
                    cta: "Register Now",
                  },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <IndustryGetStartedCard
                      key={idx}
                      theme="healthcare"
                      icon={Icon}
                      tag={card.tag}
                      title={card.title}
                      description={card.description}
                      action={card.cta}
                      onAction={openContact}
                      buttonBackground="#059669"
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
                      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all duration-300 hover:shadow-lg hover:border-[#059669]/30"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669]/10">
                        <Icon className="h-6 w-6 text-[#059669]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--foreground)]">
                        {ind.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                        {ind.description}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-semibold text-[#059669] group-hover:text-[#047857] transition-colors">
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
          <section className="bg-[#082420] py-20">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
                Partner with healthcare AI experts
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#94A3B8]">
                10+ years healthcare experience. HIPAA compliance guaranteed.
                Proven results with hospitals and healthcare providers nationwide.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={openContact}
                  className="bg-[#34D399] text-[#082420] hover:bg-[#6EE7B7] px-10 py-6 text-base font-semibold rounded-lg shadow-lg shadow-[#34D399]/20 transition-all duration-300"
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

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
