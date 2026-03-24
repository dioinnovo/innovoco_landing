import { Metadata } from "next";
import { RetailPageClient } from "./RetailPageClient";

export const metadata: Metadata = {
  title: "Retail AI | Customer 360, Personalization & Demand Forecasting",
  description:
    "AI-powered retail solutions: customer 360 analytics, personalization engines, demand forecasting, and dynamic pricing. Increase revenue 28%, improve conversions 15-25%.",
  keywords: [
    "retail AI",
    "customer 360",
    "personalization engine",
    "demand forecasting",
    "dynamic pricing",
    "e-commerce analytics",
    "omnichannel AI",
    "retail automation",
  ],
  alternates: {
    canonical: "https://innovoco.com/solutions/industries/retail",
  },
  openGraph: {
    title: "Retail & E-Commerce AI Automation Solutions | Innovoco",
    description:
      "Transform retail with customer 360 analytics, AI personalization, and intelligent demand forecasting.",
    url: "https://innovoco.com/solutions/industries/retail",
    type: "website",
    siteName: "Innovoco",
    images: [
      {
        url: "https://innovoco.com/images/industries/retail-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Retail & E-Commerce AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail AI | Customer 360, Personalization & Demand Forecasting",
    description:
      "AI-powered retail: customer 360, personalization, demand forecasting, and dynamic pricing.",
    images: ["https://innovoco.com/images/industries/retail-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function RetailPage() {
  return <RetailPageClient />;
}
