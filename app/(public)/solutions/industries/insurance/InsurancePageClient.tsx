"use client";

import {
  IndustryBloombergPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryBloombergPage";
import {
  FileText,
  Camera,
  Search,
  Shield,
  Lock,
  Scale,
  FileCheck,
  UserCheck,
} from "lucide-react";
import { insuranceConfig } from "@/lib/content/industries/insurance";
import { industryHero } from "@/lib/industry-hero-urls";

const tokens = {
  heroBg: "#1e1b4b",
  heroBorder: "#4c1d95",
  accent: "#a78bfa",
  accentHover: "#8b5cf6",
  cta: "#7c3aed",
  ctaText: "#ffffff",
  subtext: "#c4b5fd",
  badgeBorder: "#6d28d9",
  badgeBg: "rgba(49, 46, 129, 0.85)",
  badgeText: "#e9d5ff",
  pulseDot: "#c4b5fd",
  heroOverlayClassName: "from-[#1e1b4b]/90 via-[#1e1b4b]/70 to-[#1e1b4b]",
  outlineButtonHoverBgClass: "hover:!bg-violet-500/10",
  ctaShadowColor: "124, 58, 237",
};

const classes = {
  relatedCardHoverBorder: "hover:border-violet-500/35",
};

const capabilities: IndustryCapability[] = [
  {
    icon: FileText,
    title: "Intelligent FNOL & document AI",
    illustrationSrc: "/images/industries/insurance/solutions/fnol-document-ai.jpg",
    description:
      "Structure loss notices from email, voice, PDFs, and portals—extract parties, coverages, and damage cues with confidence scoring for straight-through or adjuster review.",
    stats: [
      { label: "FNOL cycle", value: "35–50% ↓" },
      { label: "Structured fields", value: "40+" },
      { label: "Core/CMS ready", value: "JSON/API" },
    ],
  },
  {
    icon: Camera,
    title: "Damage assessment & field packages",
    illustrationSrc: "/images/industries/insurance/solutions/damage-assessment-field.jpg",
    description:
      "Computer vision and guided capture for property claims—consistent photo sets, severity tagging, and draft estimates or carrier packages for public adjusters and carrier field teams.",
    stats: [
      { label: "Desk review time", value: "25–40% ↓" },
      { label: "Media consistency", value: "High" },
      { label: "Human review", value: "Built-in" },
    ],
  },
  {
    icon: Search,
    title: "Fraud, SIU & link analytics",
    illustrationSrc: "/images/industries/insurance/solutions/fraud-siu-analytics.jpg",
    description:
      "Entity resolution and graph-style signals across vendors, claimants, and history—prioritize investigations with explainable tiers and playbook-driven referrals.",
    stats: [
      { label: "False referrals", value: "20–35% ↓" },
      { label: "Investigator lift", value: "Measurable" },
      { label: "Audit trail", value: "Full" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "SOC 2 aligned practices" },
  { icon: Lock, label: "Encryption & RBAC" },
  { icon: Scale, label: "Model risk documentation" },
  { icon: FileCheck, label: "Decision lineage" },
  { icon: UserCheck, label: "Human-in-the-loop" },
  { icon: FileText, label: "Retention & legal hold" },
];

export function InsurancePageClient() {
  return (
    <IndustryBloombergPage
      config={insuranceConfig}
      tokens={tokens}
      classes={classes}
      heroImageSrc={industryHero.insurance.src}
      headlineAccent="Insurance"
      headlineRest="& Public Adjusters AI Solutions"
      capabilitiesTitle="Claims & risk intelligence"
      capabilitiesSubtitle="FNOL automation, field-ready documentation, and SIU analytics designed for carriers, TPAs, and adjusting firms."
      complianceEyebrow="Trust & governance"
      complianceHeadline="Built for regulated claims data and defensible AI"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Insurance & Public Adjusters AI Solutions"
      serviceType="Insurance AI Solutions"
      trackEventName="Insurance & Public Adjusters Industry Solutions"
      breadcrumbLabel="Insurance & Public Adjusters"
      breadcrumbUrl="https://innovoco.com/solutions/industries/insurance"
      faqValuePrefix="insurance-faq"
      getStartedVisualTheme="insurance"
    />
  );
}
