"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Factory,
  HardHat,
  HeartPulse,
  ShoppingCart,
  Building2,
  ShieldCheck,
  PlugZap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Industry Data ─── */

type IndustrySolution = {
  title: string;
  metric: string;
  metricLabel: string;
  image?: string;
  useCaseSlug?: string;
};

type IndustryData = {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  accent: string;
  accentGlow: string;
  cardImage: string;
  heroImage: string;
  href: string;
  solutions: IndustrySolution[];
};

const industries: IndustryData[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Predictive maintenance, quality vision, supply chain AI",
    icon: Factory,
    accent: "#d97706",
    accentGlow: "shadow-[0_0_30px_rgba(217,119,6,0.3)]",
    cardImage: "/images/industries/related-cards/manufacturing.jpg",
    heroImage: "/images/industries/manufacturing-hero.jpg",
    href: "/solutions/industries/manufacturing",
    solutions: [
      { title: "Predictive Maintenance", metric: "45%", metricLabel: "downtime reduction", image: "/images/industries/manufacturing/solutions/predictive-maintenance.jpg", useCaseSlug: "predictive-maintenance-manufacturing" },
      { title: "CV Quality Control", metric: "99.5%", metricLabel: "defect detection", image: "/images/industries/manufacturing/solutions/vision-quality-control.jpg", useCaseSlug: "cv-quality-control-manufacturing" },
      { title: "Supply Chain Optimization", metric: "$4.5M", metricLabel: "inventory savings", image: "/images/industries/manufacturing/solutions/supply-chain-optimization.jpg", useCaseSlug: "supply-chain-demand" },
    ],
  },
  {
    id: "construction",
    name: "Construction",
    tagline: "Visual inspections, field reports, materials traceability",
    icon: HardHat,
    accent: "#ca8a04",
    accentGlow: "shadow-[0_0_30px_rgba(202,138,4,0.3)]",
    cardImage: "/images/industries/related-cards/construction.jpg",
    heroImage: "/images/industries/construction-hero.jpg",
    href: "/solutions/industries/construction",
    solutions: [
      { title: "Visual Inspections & CV", metric: "50%", metricLabel: "faster inspections", image: "/images/industries/construction/solutions/visual-inspections-estimating.jpg", useCaseSlug: "visual-inspections-property-cv" },
      { title: "Automated Field Reports", metric: "84%", metricLabel: "report time reduction", image: "/images/industries/construction/solutions/automated-field-reports.jpg", useCaseSlug: "field-services-iot-playbooks" },
      { title: "Materials Traceability", metric: "~0%", metricLabel: "invalid BOMs", image: "/images/industries/construction/solutions/equipment-hvac-predictive.jpg", useCaseSlug: "configurable-bom-product-design" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Clinical decision support, medical imaging, population health",
    icon: HeartPulse,
    accent: "#059669",
    accentGlow: "shadow-[0_0_30px_rgba(5,150,105,0.3)]",
    cardImage: "/images/industries/related-cards/healthcare.jpg",
    heroImage: "/images/industries/healthcare-hero.jpg",
    href: "/solutions/industries/healthcare",
    solutions: [
      { title: "Clinical Decision Support", metric: "90%+", metricLabel: "diagnostic accuracy", image: "/images/industries/healthcare/solutions/clinical-decision-support.jpg", useCaseSlug: "healthcare-capacity-clinical-ops" },
      { title: "Medical Imaging AI", metric: "18hrs", metricLabel: "turnaround reduction", image: "/images/industries/healthcare/solutions/medical-imaging-ai.jpg", useCaseSlug: "medical-imaging-radiology-ai" },
      { title: "Population Health", metric: "30%", metricLabel: "care cost reduction", image: "/images/industries/healthcare/solutions/population-health-management.jpg", useCaseSlug: "population-health-management" },
    ],
  },
  {
    id: "retail",
    name: "Retail",
    tagline: "Customer 360, real-time recommendations, demand forecasting",
    icon: ShoppingCart,
    accent: "#6366f1",
    accentGlow: "shadow-[0_0_30px_rgba(99,102,241,0.3)]",
    cardImage: "/images/industries/related-cards/retail.jpg",
    heroImage: "/images/industries/retail-hero.jpg",
    href: "/solutions/industries/retail",
    solutions: [
      { title: "Customer 360", metric: "94-98%", metricLabel: "identity match rate", image: "/images/industries/retail/solutions/customer-360-identity.jpg", useCaseSlug: "customer-360-identity-resolution" },
      { title: "Real-Time Recommendations", metric: "35%", metricLabel: "CTR lift", image: "/images/industries/retail/solutions/ai-personalization-search.jpg", useCaseSlug: "marketing-personalization" },
      { title: "Demand Forecasting", metric: "22%", metricLabel: "forecast error reduction", image: "/images/industries/retail/solutions/demand-forecasting-pricing.jpg", useCaseSlug: "supply-chain-demand" },
    ],
  },
  {
    id: "financial-services",
    name: "Financial Services",
    tagline: "Fraud detection, AML monitoring, credit risk, deal intelligence",
    icon: Building2,
    accent: "#0284c7",
    accentGlow: "shadow-[0_0_30px_rgba(2,132,199,0.3)]",
    cardImage: "/images/industries/related-cards/financial-services.jpg",
    heroImage: "/images/industries/financial-services-hero.jpg",
    href: "/solutions/industries/financial-services",
    solutions: [
      { title: "Real-Time Fraud Detection", metric: "$18M", metricLabel: "annual savings", image: "/images/industries/financial-services/solutions/real-time-fraud-detection.jpg", useCaseSlug: "real-time-fraud-detection" },
      { title: "AML Transaction Monitoring", metric: "70%", metricLabel: "alert reduction", image: "/images/industries/financial-services/solutions/aml-transaction-monitoring.jpg", useCaseSlug: "regulated-onboarding-kyc-aml" },
      { title: "Credit Risk Modeling", metric: "25%", metricLabel: "approval lift", image: "/images/industries/financial-services/solutions/credit-risk-modeling.jpg", useCaseSlug: "credit-risk-modeling" },
    ],
  },
  {
    id: "insurance",
    name: "Insurance",
    tagline: "FNOL automation, damage assessment, fraud analytics",
    icon: ShieldCheck,
    accent: "#a78bfa",
    accentGlow: "shadow-[0_0_30px_rgba(167,139,250,0.3)]",
    cardImage: "/images/industries/related-cards/insurance.jpg",
    heroImage: "/images/industries/insurance/cta-prioritization-bg.jpg",
    href: "/solutions/industries/insurance",
    solutions: [
      { title: "FNOL Document Intelligence", metric: "42%", metricLabel: "cycle time reduction", image: "/images/industries/insurance/solutions/fnol-document-ai.jpg", useCaseSlug: "fnol-document-intelligence" },
      { title: "Damage Assessment & Field", metric: "3.1x", metricLabel: "desk throughput", image: "/images/industries/insurance/solutions/damage-assessment-field.jpg", useCaseSlug: "damage-assessment-field-capture" },
      { title: "Fraud & SIU Analytics", metric: "31%", metricLabel: "false referrals reduction", image: "/images/industries/insurance/solutions/fraud-siu-analytics.jpg", useCaseSlug: "fraud-siu-link-analytics" },
    ],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    tagline: "Load forecasting, grid asset health, DER visibility",
    icon: PlugZap,
    accent: "#38bdf8",
    accentGlow: "shadow-[0_0_30px_rgba(56,189,248,0.3)]",
    cardImage: "/images/industries/related-cards/energy-utilities.jpg",
    heroImage: "/images/industries/energy-utilities/cta-prioritization-bg.jpg",
    href: "/solutions/industries/energy-utilities",
    solutions: [
      { title: "Load & Renewable Forecasting", metric: "14%", metricLabel: "MAPE reduction", image: "/images/industries/energy-utilities/solutions/load-renewable-forecasting.jpg", useCaseSlug: "load-renewable-forecasting" },
      { title: "Grid Asset Health", metric: "22%", metricLabel: "emergency trips reduction", image: "/images/industries/energy-utilities/solutions/grid-generation-asset-health.jpg", useCaseSlug: "grid-asset-health-monitoring" },
      { title: "DER Visibility", metric: "70%", metricLabel: "study time reduction", image: "/images/industries/energy-utilities/solutions/der-visibility-operations.jpg", useCaseSlug: "der-visibility-operations" },
    ],
  },
];

/* ─── Industry Card ─── */

function IndustryCard({ industry }: { industry: IndustryData }) {
  const Icon = industry.icon;
  return (
    <Link href={industry.href} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl"
      >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={industry.cardImage}
          alt={industry.name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            "group-hover:scale-105 group-hover:brightness-110",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Accent glow at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundColor: industry.accent }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${industry.accent}33` }}
          >
            <Icon className="h-4.5 w-4.5" style={{ color: industry.accent }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{industry.name}</h3>
            <p className="text-sm text-white/70 leading-snug mt-0.5">{industry.tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

/* ─── Main Showcase ─── */

export function IndustryShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {industries.map((industry) => (
        <IndustryCard key={industry.id} industry={industry} />
      ))}
    </div>
  );
}
