"use client";

import {
  IndustryBloombergPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryBloombergPage";
import {
  Gauge,
  Zap,
  Sun,
  Shield,
  Lock,
  Radio,
  Cpu,
  Activity,
} from "lucide-react";
import { energyUtilitiesConfig } from "@/lib/content/industries/energy-utilities";
import { industryHero } from "@/lib/industry-hero-urls";

const tokens = {
  heroBg: "#0c4a6e",
  heroBorder: "#0369a1",
  accent: "#38bdf8",
  accentHover: "#0ea5e9",
  cta: "#0284c7",
  ctaText: "#ffffff",
  subtext: "#bae6fd",
  badgeBorder: "#075985",
  badgeBg: "rgba(7, 89, 133, 0.75)",
  badgeText: "#e0f2fe",
  pulseDot: "#7dd3fc",
  heroOverlayClassName: "from-[#0c4a6e]/88 via-[#0c4a6e]/65 to-[#0c4a6e]",
  outlineButtonHoverBgClass: "hover:!bg-sky-500/10",
  ctaShadowColor: "14, 165, 233",
};

const classes = {
  relatedCardHoverBorder: "hover:border-sky-500/35",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Gauge,
    title: "Load, price & renewable forecasting",
    description:
      "Probabilistic short- and medium-term models with weather, DER, and behavioral signals—published to trading, operations, and planning with confidence intervals.",
    stats: [
      { label: "Forecast error", value: "8–18% ↓" },
      { label: "Zones supported", value: "Multi" },
      { label: "Refresh cadence", value: "Configurable" },
    ],
  },
  {
    icon: Zap,
    title: "Grid & generation asset health",
    description:
      "Anomaly detection and health scores across substations, lines, and rotating equipment—prioritize inspections and replacements using CMMS, SCADA, and inspection history.",
    stats: [
      { label: "Unplanned events", value: "15–30% ↓" },
      { label: "Coverage", value: "Feeder to bulk" },
      { label: "Crew-ready", value: "Work hints" },
    ],
  },
  {
    icon: Sun,
    title: "DER visibility & operations assists",
    description:
      "Hosting analysis, inverter telemetry fusion, and control-room assists for voltage, congestion, and restoration—designed for transparency and operator override.",
    stats: [
      { label: "Study time", value: "50–70% ↓" },
      { label: "Scenarios", value: "Heat, cloud, peak" },
      { label: "Audit", value: "Logged overrides" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "NERC / CIP aware patterns" },
  { icon: Lock, label: "Segmented OT access" },
  { icon: Radio, label: "Historian & AMI feeds" },
  { icon: Cpu, label: "Edge & cloud options" },
  { icon: Activity, label: "Situational dashboards" },
  { icon: Zap, label: "OMS / DMS friendly outputs" },
];

export function EnergyUtilitiesPageClient() {
  return (
    <IndustryBloombergPage
      config={energyUtilitiesConfig}
      tokens={tokens}
      classes={classes}
      heroImageSrc={industryHero.energyUtilities.src}
      headlineAccent="Energy"
      headlineRest="& Utilities AI Solutions"
      capabilitiesTitle="Reliability & planning AI"
      capabilitiesSubtitle="Forecasting, asset health, and DER intelligence for operators balancing resilience, regulation, and capital efficiency."
      complianceEyebrow="Security & operations"
      complianceHeadline="OT-aware integration with enterprise-grade governance"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Energy & Utilities AI Solutions"
      serviceType="Energy & Utilities AI Solutions"
      trackEventName="Energy & Utilities Industry Solutions"
      breadcrumbLabel="Energy & Utilities"
      breadcrumbUrl="https://innovoco.com/solutions/industries/energy-utilities"
      faqValuePrefix="energy-utilities-faq"
      getStartedVisualTheme="energy"
    />
  );
}
