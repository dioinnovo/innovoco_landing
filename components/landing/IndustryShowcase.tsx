"use client";

import { useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import {
  Factory,
  HardHat,
  HeartPulse,
  ShoppingCart,
  Building2,
  ShieldCheck,
  PlugZap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

function IndustryCard({
  industry,
  isSelected,
  onClick,
}: {
  industry: IndustryData;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = industry.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left transition-all duration-500",
        isSelected
          ? cn("ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0B0F19]", industry.accentGlow)
          : "hover:shadow-xl",
      )}
      style={isSelected ? { ringColor: industry.accent } as React.CSSProperties : undefined}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={industry.cardImage}
          alt={industry.name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isSelected ? "brightness-110" : "group-hover:scale-105 group-hover:brightness-110",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Accent glow at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 transition-opacity duration-500"
          style={{ backgroundColor: industry.accent, opacity: isSelected ? 1 : 0 }}
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
    </motion.button>
  );
}

/* ─── Solution Card ─── */

function SolutionCard({ solution, accent }: { solution: IndustrySolution; accent: string }) {
  const content = (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {solution.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={solution.image}
            alt={solution.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      )}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-[var(--foreground)]">{solution.title}</h4>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-xl font-bold" style={{ color: accent }}>
            {solution.metric}
          </span>
          <span className="text-xs text-[#64748B]">{solution.metricLabel}</span>
        </div>
      </div>
    </div>
  );

  if (solution.useCaseSlug) {
    return (
      <Link href={`/case-studies/use-cases/${solution.useCaseSlug}`} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

/* ─── Industry Detail Panel ─── */

function IndustryDetail({ industry }: { industry: IndustryData }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      <div className="pt-8">
        {/* Solution Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industry.solutions.map((solution) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              accent={industry.accent}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-full px-8 py-5 text-base font-semibold">
            <Link href={industry.href}>
              Explore {industry.name} Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Showcase ─── */

export function IndustryShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = industries.find((i) => i.id === selectedId) ?? null;

  const toggle = useCallback(
    (id: string) => setSelectedId((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <div className="space-y-8">
      {/* Industry Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            isSelected={selectedId === industry.id}
            onClick={() => toggle(industry.id)}
          />
        ))}
      </div>

      {/* Expandable Detail */}
      <AnimatePresence mode="wait">
        {selected && (
          <IndustryDetail key={selected.id} industry={selected} />
        )}
      </AnimatePresence>
    </div>
  );
}
