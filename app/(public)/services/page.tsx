import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { ServicesHubClient } from "./ServicesHubClient";

export const metadata: Metadata = buildMeta({
  title: "Enterprise AI & Data Services | Strategy, Implementation & Operations",
  description:
    "End-to-end AI and data services: strategy, cloud data modernization, implementation, and managed AI operations. Proven delivery for global enterprises.",
  keywords: [
    "enterprise AI services",
    "AI consulting company",
    "data engineering services",
    "managed AI operations",
    "AI implementation partner",
  ],
  canonical: "https://innovoco.com/services",
});

export default function ServicesHubPage() {
  return <ServicesHubClient />;
}
