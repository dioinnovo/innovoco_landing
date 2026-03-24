"use client";

import {
  IndustryBloombergPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryBloombergPage";
import {
  Zap,
  Award,
  Activity,
  Shield,
  Lock,
  Cpu,
  Factory,
  FileCheck,
  Radio,
} from "lucide-react";
import { manufacturingConfig } from "@/lib/content/industries/manufacturing";

const tokens = {
  heroBg: "#0f172a",
  heroBorder: "#334155",
  accent: "#d97706",
  accentHover: "#b45309",
  cta: "#f59e0b",
  ctaText: "#0f172a",
  subtext: "#94a3b8",
  badgeBorder: "#78350f",
  badgeBg: "rgba(69, 26, 3, 0.8)",
  badgeText: "#fbbf24",
  pulseDot: "#f59e0b",
  heroOverlayClassName: "from-[#0f172a]/80 via-[#0f172a]/55 to-[#0f172a]",
  outlineButtonHoverBgClass: "hover:!bg-[#f59e0b]/10",
  ctaShadowColor: "245, 158, 11",
};

const classes = {
  relatedCardHoverBorder: "hover:border-[#d97706]/30",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Zap,
    title: "Predictive Maintenance",
    description:
      "AI-powered equipment health monitoring predicts failures 7–14 days in advance with 85–95% accuracy. IoT sensors track vibration, temperature, and acoustic signatures for proactive maintenance scheduling.",
    stats: [
      { label: "Unplanned downtime", value: "30–50% ↓" },
      { label: "Maintenance cost", value: "20–25% ↓" },
      { label: "Equipment lifespan", value: "+10–15%" },
    ],
  },
  {
    icon: Award,
    title: "Computer Vision Quality Control",
    description:
      "Deep learning detects surface defects, placement errors, and soldering issues at 10× manual speed with 99%+ defect detection and minimal false positives.",
    stats: [
      { label: "Detection accuracy", value: "99.5%" },
      { label: "Inspection time", value: "85% ↓" },
      { label: "Quality savings", value: "$2–3M" },
    ],
  },
  {
    icon: Activity,
    title: "Supply Chain Optimization",
    description:
      "Unify procurement, production, and logistics data for end-to-end visibility—trace multi-tier dependencies, spot bottlenecks and delays sooner, and pair that view with ML forecasting, replenishment, and supplier signals to cut inventory and stockouts.",
    stats: [
      { label: "Forecast error", value: "22% ↓" },
      { label: "Inventory savings", value: "$4–5M" },
      { label: "Stockout reduction", value: "40%" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "ISA / IEC 62443" },
  { icon: Lock, label: "OT / IT segmentation" },
  { icon: Radio, label: "OPC UA & MQTT" },
  { icon: Factory, label: "MES / SCADA" },
  { icon: FileCheck, label: "21 CFR Part 11" },
  { icon: Cpu, label: "Edge analytics" },
];

export function ManufacturingPageClient() {
  return (
    <IndustryBloombergPage
      config={manufacturingConfig}
      tokens={tokens}
      classes={classes}
      heroImageSrc="/images/industries/manufacturing-hero.jpg"
      headlineAccent="Manufacturing"
      headlineRest="AI Automation & Analytics Solutions"
      capabilitiesTitle="Industry 4.0 AI Solutions"
      capabilitiesSubtitle="Transform manufacturing operations with predictive maintenance, quality control AI, and supply chain optimization."
      complianceEyebrow="Compliance & Security"
      complianceHeadline="Built for industrial OT, IT, and regulated production"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Manufacturing AI Automation & Analytics Solutions"
      serviceType="Manufacturing AI Solutions"
      trackEventName="Manufacturing Industry Solutions"
      breadcrumbLabel="Manufacturing"
      breadcrumbUrl="https://innovoco.com/solutions/industries/manufacturing"
      faqValuePrefix="mfg-faq"
      getStartedVisualTheme="manufacturing"
    />
  );
}
