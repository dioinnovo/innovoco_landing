import { Metadata } from "next";
import { industryHero } from "@/lib/industry-hero-urls";
import { EnergyUtilitiesPageClient } from "./EnergyUtilitiesPageClient";

export const metadata: Metadata = {
  title: "Energy & Utilities AI | Grid Forecasting, Assets & Renewables",
  description:
    "AI for utilities and energy operators: load and renewable forecasting, predictive maintenance for grid and generation assets, outage analytics, and DER orchestration.",
  keywords: [
    "utilities AI",
    "energy forecasting",
    "smart grid analytics",
    "predictive maintenance utilities",
    "DER management",
    "renewable forecasting",
    "outage prediction",
  ],
  alternates: {
    canonical: "https://innovoco.com/solutions/industries/energy-utilities",
  },
  openGraph: {
    title: "Energy & Utilities AI Solutions | Innovoco",
    description:
      "Forecasting, asset health, and operations intelligence for electric, gas, and multi-utility operators.",
    url: "https://innovoco.com/solutions/industries/energy-utilities",
    type: "website",
    siteName: "Innovoco",
    images: [
      {
        url: industryHero.energyUtilities.ogUrl,
        width: 1200,
        height: 630,
        alt: "Energy & Utilities AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy & Utilities AI | Innovoco",
    description:
      "Grid and generation AI for reliability, renewables integration, and regulated operations.",
    images: [industryHero.energyUtilities.ogUrl],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function EnergyUtilitiesIndustryPage() {
  return <EnergyUtilitiesPageClient />;
}
