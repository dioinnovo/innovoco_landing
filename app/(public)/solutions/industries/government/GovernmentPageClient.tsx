"use client";

import {
  IndustryPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryPage";
import {
  Users,
  ShieldCheck,
  Shield,
  Lock,
  Globe,
  FileCheck,
} from "lucide-react";
import { governmentConfig } from "@/lib/content/industries/government";

const tokens = {
  heroBg: "#0f172a",
  heroBorder: "#1e3a5f",
  accent: "#3b82f6",
  accentHover: "#2563eb",
  cta: "#2563eb",
  ctaText: "#ffffff",
  subtext: "#94a3b8",
  badgeBorder: "#1e40af",
  badgeBg: "rgba(30, 58, 138, 0.75)",
  badgeText: "#93c5fd",
  pulseDot: "#3b82f6",
  heroOverlayClassName: "from-slate-950/85 via-slate-900/65 to-slate-950",
  outlineButtonHoverBgClass: "hover:!bg-blue-400/10",
  ctaShadowColor: "37, 99, 235",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Users,
    title: "Citizen Services & Identity Resolution",
    useCaseSlug: "customer-360-identity-resolution",
    illustrationSrc: "/images/industries/government-hero.jpg",
    description:
      "Unified citizen profiles across agencies — resolving duplicate records, linking benefits history, and enabling seamless service delivery across federal, state, and local touchpoints.",
    stats: [
      { label: "Identity match rate", value: "99.2%" },
      { label: "Faster case resolution", value: "40%" },
      { label: "Duplicate records", value: "87% ↓" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection & Investigation",
    useCaseSlug: "fraud-siu-link-analytics",
    illustrationSrc: "/images/industries/government-hero.jpg",
    description:
      "AI-driven detection of benefits fraud, tax evasion, and procurement fraud with link analytics, anomaly scoring, and investigator-ready case packages that accelerate resolution.",
    stats: [
      { label: "Fraud detected", value: "3x more" },
      { label: "False positives", value: "60% ↓" },
      { label: "Investigation time", value: "45% ↓" },
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity & Threat Intelligence",
    useCaseSlug: "reporting-audit-packs",
    illustrationSrc: "/images/industries/government-hero.jpg",
    description:
      "Real-time threat detection, vulnerability management, and automated incident response powered by AI — monitoring network traffic, endpoints, and cloud infrastructure around the clock.",
    stats: [
      { label: "Threat detection", value: "24/7" },
      { label: "Response time", value: "70% ↓" },
      { label: "Coverage", value: "99.9%" },
    ],
  },
  {
    icon: Lock,
    title: "Government Procurement & Compliance",
    useCaseSlug: "supply-chain-demand",
    illustrationSrc: "/images/industries/government-hero.jpg",
    description:
      "Procurement transparency, vendor risk scoring, and automated compliance checking — streamlining acquisition workflows while ensuring FAR/DFARS adherence and audit readiness.",
    stats: [
      { label: "Procurement cycle", value: "35% ↓" },
      { label: "Compliance rate", value: "100%" },
      { label: "Vendor risk scored", value: "Auto" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: ShieldCheck, label: "FedRAMP" },
  { icon: Lock, label: "SOC 2 Type II" },
  { icon: Shield, label: "FISMA" },
  { icon: Globe, label: "GDPR / PIPEDA" },
  { icon: FileCheck, label: "ISO 27001" },
  { icon: Users, label: "NIST 800-53" },
];

export function GovernmentPageClient() {
  return (
    <IndustryPage
      config={governmentConfig}
      tokens={tokens}
      heroImageSrc="/images/industries/government-hero.jpg"
      headlineAccent="Government"
      headlineRest="& Public Sector AI Solutions"
      capabilitiesTitle="Built for the Mission"
      capabilitiesSubtitle="Citizen services, fraud detection, cybersecurity, and procurement automation designed for the unique demands of the public sector."
      complianceEyebrow="Security & Compliance"
      complianceHeadline="FedRAMP-ready, FISMA-compliant, and built for inter-agency trust"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Government & Public Sector AI Solutions"
      serviceType="Government & Public Sector AI Solutions"
      trackEventName="Government & Public Sector Industry Solutions"
      breadcrumbLabel="Government"
      breadcrumbUrl="https://innovoco.com/solutions/industries/government"
      faqValuePrefix="government-faq"
      getStartedVisualTheme="financial"
    />
  );
}
