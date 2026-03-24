import {
  DollarSign,
  Factory,
  HardHat,
  HeartPulse,
  Shield,
  ShoppingCart,
  Zap,
} from "lucide-react";
import type { RelatedIndustry } from "@/lib/content/industries/types";

/**
 * Full set of industry destinations for "Explore Other Industries" carousels.
 * Order is stable for visual consistency; the current page is filtered out at runtime.
 */
export const ALL_INDUSTRY_EXPLORE: RelatedIndustry[] = [
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description:
      "HIPAA-compliant AI for clinical decision support, medical imaging, and patient analytics.",
    href: "/solutions/industries/healthcare",
    gradient: "bg-gradient-to-br from-[#DC2626] to-[#B91C1C]",
    metrics: [
      { value: "25%", label: "Readmission Reduction" },
      { value: "90%+", label: "Diagnostic Accuracy" },
      { value: "100%", label: "HIPAA Compliant" },
    ],
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description:
      "Real-time fraud detection, risk analytics, and regulatory compliance solutions.",
    href: "/solutions/industries/financial-services",
    gradient: "bg-gradient-to-br from-[#10B981] to-[#059669]",
    metrics: [
      { value: "$50M+", label: "Fraud Savings" },
      { value: "95%+", label: "Detection Rate" },
      { value: "<100ms", label: "Transaction Scoring" },
    ],
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description:
      "Customer 360 analytics, AI personalization, and demand forecasting.",
    href: "/solutions/industries/retail",
    gradient: "bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]",
    metrics: [
      { value: "28%", label: "Revenue Increase" },
      { value: "15-25%", label: "Conversion Lift" },
      { value: "35%", label: "Recommendation CTR" },
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    description:
      "Industry 4.0 automation, predictive maintenance, and supply chain optimization.",
    href: "/solutions/industries/manufacturing",
    gradient: "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]",
    metrics: [
      { value: "30-50%", label: "Downtime Reduction" },
      { value: "99%+", label: "Defect Detection" },
      { value: "15%", label: "OEE Increase" },
    ],
  },
  {
    icon: Shield,
    title: "Insurance & Public Adjusters",
    description:
      "FNOL automation, field intelligence, and SIU analytics for carriers and adjusters.",
    href: "/solutions/industries/insurance",
    gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
  },
  {
    icon: HardHat,
    title: "Construction & Home Services",
    description:
      "Inspection AI, automated field reports, and jobsite intelligence.",
    href: "/solutions/industries/construction",
    gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]",
  },
  {
    icon: Zap,
    title: "Energy & Utilities",
    description:
      "Load forecasting, grid asset health, DER visibility, and outage analytics.",
    href: "/solutions/industries/energy-utilities",
    gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
  },
];

function normalizePath(path: string): string {
  if (!path) return "";
  try {
    const u = path.startsWith("http") ? new URL(path) : new URL(path, "https://innovoco.com");
    return u.pathname.replace(/\/$/, "") || "";
  } catch {
    return path.replace(/\/$/, "");
  }
}

/** Industries to show in Explore — excludes the page the user is already on. */
export function getExploreOtherIndustries(currentPageHrefOrUrl: string): RelatedIndustry[] {
  const current = normalizePath(currentPageHrefOrUrl);
  return ALL_INDUSTRY_EXPLORE.filter(
    (ind) => ind.href.replace(/\/$/, "") !== current,
  );
}
