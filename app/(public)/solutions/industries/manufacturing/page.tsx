import { Metadata } from "next";
import { ManufacturingPageClient } from "./ManufacturingPageClient";

export const metadata: Metadata = {
  title: "Manufacturing AI | Predictive Maintenance & Industry 4.0 Solutions",
  description: "Transform manufacturing with AI-powered predictive maintenance reducing downtime 30-50%, computer vision quality control achieving 99%+ defect detection, and supply chain optimization. Industry 4.0 ready solutions for automotive, electronics, pharma, and discrete manufacturing.",
  keywords: [
    "manufacturing AI",
    "predictive maintenance",
    "quality control AI",
    "computer vision manufacturing",
    "supply chain optimization",
    "Industry 4.0",
    "IoT analytics",
    "smart manufacturing",
    "equipment maintenance AI",
    "production optimization",
    "defect detection",
    "demand forecasting",
    "manufacturing intelligence",
    "OEE optimization",
    "industrial AI solutions"
  ],
  alternates: {
    canonical: "https://innovoco.com/solutions/industries/manufacturing",
  },
  openGraph: {
    title: "Manufacturing AI Automation & Analytics Solutions | Innovoco",
    description: "Reduce downtime 30-50% with predictive maintenance AI. Achieve 99%+ defect detection with computer vision. Optimize supply chain with ML forecasting.",
    url: "https://innovoco.com/solutions/industries/manufacturing",
    type: "website",
    siteName: "Innovoco",
    images: [
      {
        url: "https://innovoco.com/images/industries/manufacturing-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Manufacturing AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing AI | Predictive Maintenance & Industry 4.0",
    description: "AI-powered manufacturing solutions: predictive maintenance, quality control, supply chain optimization. 30-50% downtime reduction, 99%+ defect detection.",
    images: ["https://innovoco.com/images/industries/manufacturing-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function ManufacturingPage() {
  return <ManufacturingPageClient />;
}
