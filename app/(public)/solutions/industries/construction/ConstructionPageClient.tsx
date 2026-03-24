"use client";

import {
  IndustryBloombergPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryBloombergPage";
import {
  Camera,
  FileCheck,
  Activity,
  Shield,
  HardHat,
  Truck,
  Wrench,
} from "lucide-react";
import { constructionConfig } from "@/lib/content/industries/construction";

const tokens = {
  heroBg: "#1c1917",
  heroBorder: "#44403c",
  accent: "#ca8a04",
  accentHover: "#a16207",
  cta: "#eab308",
  ctaText: "#1c1917",
  subtext: "#a8a29e",
  badgeBorder: "#854d0e",
  badgeBg: "rgba(66, 32, 6, 0.75)",
  badgeText: "#fde047",
  pulseDot: "#eab308",
  heroOverlayClassName: "from-stone-950/85 via-stone-900/65 to-stone-950",
  outlineButtonHoverBgClass: "hover:!bg-amber-400/10",
  ctaShadowColor: "234, 179, 8",
};

const classes = {
  relatedCardHoverBorder: "hover:border-[#ca8a04]/30",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Camera,
    title: "Visual Inspections & Estimating",
    illustrationSrc: "/images/industries/construction/solutions/visual-inspections-estimating.jpg",
    description:
      "Computer vision for roofs, siding, and interiors with severity scoring, measurement assists, and adjuster-ready outputs. Works on phone capture or drone orthomosaics.",
    stats: [
      { label: "Faster inspections", value: "50%" },
      { label: "Model precision", value: "99.7%" },
      { label: "Disputes", value: "32% ↓" },
    ],
  },
  {
    icon: FileCheck,
    title: "Automated Field Reports",
    illustrationSrc: "/images/industries/construction/solutions/automated-field-reports.jpg",
    description:
      "Voice and photo capture structured into daily logs, safety checklists, and owner updates—synced to Procore, CMMS, or your ERP with full audit history.",
    stats: [
      { label: "Report time", value: "84% ↓" },
      { label: "Super hours saved", value: "4+/wk" },
      { label: "Compliance", value: "100%" },
    ],
  },
  {
    icon: Activity,
    title: "Equipment & HVAC Predictive Maintenance",
    illustrationSrc: "/images/industries/construction/solutions/equipment-hvac-predictive.jpg",
    description:
      "IoT ingestion, anomaly detection, and technician routing for chillers, fleets, and generators—integrated with inventory and SLA clocks.",
    stats: [
      { label: "Emergency calls", value: "27% ↓" },
      { label: "Parts spend", value: "18% ↓" },
      { label: "Uptime", value: "+3 pts" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "Encrypted media" },
  { icon: HardHat, label: "Safety workflows" },
  { icon: FileCheck, label: "Audit-ready logs" },
  { icon: Truck, label: "Fleet privacy" },
  { icon: Wrench, label: "CMMS integrations" },
  { icon: Camera, label: "Redaction ready" },
];

export function ConstructionPageClient() {
  return (
    <IndustryBloombergPage
      config={constructionConfig}
      tokens={tokens}
      classes={classes}
      heroImageSrc="/images/industries/construction-hero.jpg"
      headlineAccent="Construction"
      headlineRest="& Home Services AI Solutions"
      capabilitiesTitle="Built for the Field"
      capabilitiesSubtitle="Inspection intelligence, automated reporting, and predictive maintenance designed for jobsites and service fleets."
      complianceEyebrow="Safety & Governance"
      complianceHeadline="Secure capture, traceable reports, and integration-ready delivery"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Construction & Home Services AI Solutions"
      serviceType="Construction & Home Services AI Solutions"
      trackEventName="Construction & Home Services Industry Solutions"
      breadcrumbLabel="Construction"
      breadcrumbUrl="https://innovoco.com/solutions/industries/construction"
      faqValuePrefix="construction-faq"
      getStartedVisualTheme="construction"
    />
  );
}
