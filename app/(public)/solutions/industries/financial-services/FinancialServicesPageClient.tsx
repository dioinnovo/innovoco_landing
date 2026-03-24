"use client";

import {
  IndustryPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryPage";
import {
  Shield,
  TrendingUp,
  Activity,
  AlertTriangle,
  BarChart3,
  Lock,
  DollarSign,
  FileCheck,
  Scale,
  Eye,
  Zap,
  GitBranch,
} from "lucide-react";
import { financialServicesConfig } from "@/lib/content/industries/financial-services";

const tokens = {
  heroBg: "#0c2340",
  heroBorder: "#1e3a5f",
  accent: "#0284c7",
  accentHover: "#0369a1",
  cta: "#0ea5e9",
  ctaText: "#ffffff",
  subtext: "#94A3B8",
  badgeBorder: "#075985",
  badgeBg: "rgba(7, 89, 133, 0.75)",
  badgeText: "#7dd3fc",
  pulseDot: "#0ea5e9",
  heroOverlayClassName: "from-slate-950/85 via-slate-900/65 to-slate-950",
  outlineButtonHoverBgClass: "hover:!bg-[#5BC0EB]/10",
  ctaShadowColor: "14, 165, 233",
};

const capabilities: IndustryCapability[] = [
  {
    icon: AlertTriangle,
    title: "Real-Time Fraud Detection",
    useCaseSlug: "real-time-fraud-detection",
    illustrationSrc: "/images/industries/financial-services/solutions/real-time-fraud-detection.jpg",
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
    useCaseSlug: "regulated-onboarding-kyc-aml",
    illustrationSrc: "/images/industries/financial-services/solutions/aml-transaction-monitoring.jpg",
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
    useCaseSlug: "credit-risk-modeling",
    illustrationSrc: "/images/industries/financial-services/solutions/credit-risk-modeling.jpg",
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
    useCaseSlug: "algorithmic-trading-sentiment",
    illustrationSrc: "/images/industries/financial-services/solutions/algorithmic-trading-sentiment.jpg",
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
    useCaseSlug: "deal-flow-ai-diligence",
    illustrationSrc: "/images/industries/financial-services/solutions/private-equity-sponsor-intelligence.jpg",
    description:
      "AI-assisted deal sourcing and pipeline prioritization, structured review of CIMs and dataroom materials, and portfolio-level operating metrics so investment and operating partners see performance consistently across businesses—within access controls and audit trails fit for sponsors.",
    stats: [
      { label: "Diligence outputs", value: "Structured" },
      { label: "Pipeline focus", value: "Prioritized" },
      { label: "Portco analytics", value: "Repeatable" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "PCI-DSS Level 1" },
  { icon: FileCheck, label: "SR 11-7 MRM" },
  { icon: Scale, label: "ECOA / Fair Lending" },
  { icon: Eye, label: "BSA / FinCEN" },
  { icon: Zap, label: "SEC / FINRA" },
];

export function FinancialServicesPageClient() {
  return (
    <IndustryPage
      config={financialServicesConfig}
      tokens={tokens}
      heroImageSrc="/images/industries/financial-services-hero.jpg"
      headlineAccent="Financial Services"
      headlineRest="AI Solutions"
      capabilitiesTitle="AI Solutions Engineered for Finance"
      capabilitiesSubtitle="Purpose-built AI capabilities for fraud, risk, compliance, markets—and private equity deal flow, diligence, and portfolio performance."
      complianceEyebrow="Compliance & Security"
      complianceHeadline="Built for the most regulated industry in the world"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Financial Services AI Solutions"
      serviceType="Financial Services AI Solutions"
      trackEventName="Financial Services Industry Solutions"
      breadcrumbLabel="Financial Services"
      breadcrumbUrl="https://innovoco.com/solutions/industries/financial-services"
      faqValuePrefix="financial-services-faq"
      getStartedVisualTheme="financial"
    />
  );
}
