import { Metadata } from "next";
import { ConstructionPageClient } from "./ConstructionPageClient";

export const metadata: Metadata = {
  title:
    "Construction AI | Property Inspections, Automated Reports & Predictive Maintenance",
  description:
    "AI-powered property inspections, automated report generation, and predictive maintenance for construction and home services. 50% faster inspections, 99.7% accuracy, 84% report time reduction.",
  keywords: [
    "construction AI",
    "property inspection automation",
    "roof damage detection",
    "HVAC predictive maintenance",
    "automated reports",
    "computer vision",
    "drone inspections",
    "home services AI",
  ],
  alternates: {
    canonical: "https://innovoco.com/solutions/industries/construction",
  },
  openGraph: {
    title: "Construction & Home Services AI Automation Solutions | Innovoco",
    description:
      "Transform construction operations with AI-powered inspections, automated reporting, and predictive maintenance.",
    url: "https://innovoco.com/solutions/industries/construction",
    type: "website",
    siteName: "Innovoco",
    images: [
      {
        url: "https://innovoco.com/images/industries/construction-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Construction & Home Services AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Construction AI | Inspections, Automated Reports & Predictive Maintenance",
    description:
      "AI for property inspections, automated field reports, and predictive maintenance for construction and home services.",
    images: ["https://innovoco.com/images/industries/construction-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ConstructionPage() {
  return <ConstructionPageClient />;
}
