import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { ServicesHubClient } from "./ServicesHubClient";

export const metadata: Metadata = buildMeta({
  title: "Enterprise AI Consulting Services | Strategy to Production in 12 Weeks",
  description:
    "End-to-end AI consulting: strategy, agentic AI, data engineering, and managed operations. 171% avg ROI across 500+ enterprise deployments. Book a free prioritization workshop.",
  keywords: [
    "enterprise AI consulting services",
    "AI strategy consulting",
    "AI implementation partner",
    "agentic AI development",
    "data engineering modernization",
    "managed AI operations",
    "AI consulting company",
    "enterprise AI agency",
    "LLM integration services",
    "AI governance consulting",
  ],
  canonical: "https://innovoco.com/services",
});

export default function ServicesHubPage() {
  return <ServicesHubClient />;
}
