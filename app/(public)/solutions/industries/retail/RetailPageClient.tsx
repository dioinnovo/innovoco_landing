"use client";

import {
  IndustryPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryPage";
import { Users, Sparkles, LineChart, Shield, Lock, CreditCard, Globe, Headphones } from "lucide-react";
import { retailConfig } from "@/lib/content/industries/retail";

/** Indigo retail brand — visually separate from Financial Services (#0A58D0 sky blue). */
const tokens = {
  heroBg: "#0f172a",
  heroBorder: "#3730a3",
  accent: "#6366f1",
  accentHover: "#4f46e5",
  cta: "#6366f1",
  ctaText: "#ffffff",
  subtext: "#94a3b8",
  badgeBorder: "#4338ca",
  badgeBg: "rgba(15, 23, 42, 0.85)",
  badgeText: "#a5b4fc",
  pulseDot: "#818cf8",
  heroOverlayClassName: "from-[#0f172a]/85 via-[#0f172a]/60 to-[#0f172a]",
  outlineButtonHoverBgClass: "hover:!bg-indigo-500/10",
  ctaShadowColor: "99, 102, 241",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Users,
    title: "Customer 360 & Identity Resolution",
    useCaseSlug: "customer-360-identity-resolution",
    illustrationSrc: "/images/industries/retail/solutions/customer-360-identity.jpg",
    description:
      "Unify web, stores, marketplaces, and support into one profile with consent-aware activation. Power segmentation, journeys, and associate tools without duplicate silos.",
    stats: [
      { label: "Identity match rate", value: "94–98%" },
      { label: "Time to activate", value: "<200ms" },
      { label: "Channels unified", value: "12+" },
    ],
  },
  {
    icon: Sparkles,
    title: "Real-Time Recommendation Engine",
    useCaseSlug: "marketing-personalization",
    illustrationSrc: "/images/industries/retail/solutions/ai-personalization-search.jpg",
    description:
      "Session-aware product recommendations that adapt in real time to browsing behavior, purchase history, and inventory—driving higher conversion, larger baskets, and better margins.",
    stats: [
      { label: "Rec CTR lift", value: "35%" },
      { label: "AOV impact", value: "+18%" },
      { label: "Return rate", value: "12% ↓" },
    ],
  },
  {
    icon: LineChart,
    title: "Demand Forecasting & Pricing",
    useCaseSlug: "supply-chain-demand",
    illustrationSrc: "/images/industries/retail/solutions/demand-forecasting-pricing.jpg",
    description:
      "Probabilistic forecasts at store/SKU grain with promotions, seasonality, and weather. Connect to replenishment and dynamic price engines with audit trails.",
    stats: [
      { label: "Forecast error", value: "20–30% ↓" },
      { label: "Stockout reduction", value: "9–14%" },
      { label: "Margin lift", value: "3–5%" },
    ],
  },
  {
    icon: Headphones,
    title: "Customer Support & Voice AI",
    useCaseSlug: "customer-support-voice",
    illustrationSrc: "/images/industries/retail/solutions/demand-forecasting-pricing.jpg",
    description:
      "AI-powered triage, sentiment-aware routing, and CRM-grounded answers across chat, voice, and social—so agents handle exceptions while routine inquiries resolve themselves.",
    stats: [
      { label: "First-contact resolution", value: "40% ↑" },
      { label: "Handle time", value: "35% ↓" },
      { label: "CSAT", value: "4.6★" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "GDPR & CCPA" },
  { icon: Lock, label: "Encryption & RBAC" },
  { icon: CreditCard, label: "PCI-aware design" },
  { icon: Globe, label: "Data residency" },
  { icon: Users, label: "Consent management" },
  { icon: LineChart, label: "SOC 2 practices" },
];

export function RetailPageClient() {
  return (
    <IndustryPage
      config={retailConfig}
      tokens={tokens}
      heroImageSrc="/images/industries/retail-hero.jpg"
      headlineAccent="Retail"
      headlineRest="& E-Commerce AI Automation Solutions"
      capabilitiesTitle="Omnichannel Retail AI"
      capabilitiesSubtitle="Grow revenue with customer 360, personalization, and forecasting tuned to your catalog and channels."
      complianceEyebrow="Trust & Privacy"
      complianceHeadline="Built for regulated customer data and commerce"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Retail & E-Commerce AI Automation Solutions"
      serviceType="Retail AI Solutions"
      trackEventName="Retail Industry Solutions"
      breadcrumbLabel="Retail"
      breadcrumbUrl="https://innovoco.com/solutions/industries/retail"
      faqValuePrefix="retail-faq"
      getStartedVisualTheme="retail"
    />
  );
}
