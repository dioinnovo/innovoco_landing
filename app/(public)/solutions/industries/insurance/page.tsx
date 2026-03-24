import { Metadata } from "next";
import { industryHero } from "@/lib/industry-hero-urls";
import { InsurancePageClient } from "./InsurancePageClient";

export const metadata: Metadata = {
  title: "Insurance & Public Adjusters AI | Claims, FNOL & Fraud Analytics",
  description:
    "AI for carriers, TPAs, and public adjusters: intelligent FNOL, document and damage triage, fraud/SIU signals, and audit-ready workflows.",
  keywords: [
    "insurance AI",
    "public adjuster software",
    "claims automation",
    "FNOL AI",
    "insurance fraud detection",
    "SIU analytics",
    "property claims AI",
  ],
  alternates: {
    canonical: "https://innovoco.com/solutions/industries/insurance",
  },
  openGraph: {
    title: "Insurance & Public Adjusters AI Solutions | Innovoco",
    description:
      "Accelerate claims with AI for FNOL, documentation, field packages, and fraud analytics—governed and audit-ready.",
    url: "https://innovoco.com/solutions/industries/insurance",
    type: "website",
    siteName: "Innovoco",
    images: [
      {
        url: industryHero.insurance.ogUrl,
        width: 1200,
        height: 630,
        alt: "Insurance & Public Adjusters AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance & Public Adjusters AI | Innovoco",
    description:
      "Claims intelligence, field documentation, and SIU analytics for carriers and adjusting firms.",
    images: [industryHero.insurance.ogUrl],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function InsuranceIndustryPage() {
  return <InsurancePageClient />;
}
