import type { Metadata } from "next";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/seo/schema";

const pageUrl = "https://innovoco.com/case-studies";

const pageTitle = "Production AI Use Cases | Innovoco";
const pageDescription =
  "Twelve business-outcome patterns for production AI and automation on Azure, Google Cloud, LangGraph, and n8n—" +
  "each with a dedicated use case page for challenge, solution, implementations, and impact.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "enterprise AI use cases",
    "agentic AI frameworks",
    "Azure AI Foundry",
    "Google Vertex AI",
    "LangGraph enterprise",
    "n8n automation",
    "RAG production",
    "knowledge graph enterprise AI",
    "enterprise copilot implementation",
    "fraud analytics AI",
    "supply chain AI visibility",
    "customer 360 AI",
    "MLOps enterprise",
    "AI orchestration Microsoft Google",
    "hybrid AI deployment",
    "Innovoco case studies"
  ],
  alternates: {
    canonical: "/case-studies"
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: "Innovoco",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Innovoco — enterprise AI and agentic frameworks"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/twitter-card.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function CaseStudiesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://innovoco.com" },
    { name: "Case studies", url: pageUrl }
  ]);
  const webPage = createWebPageSchema({
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    webpageId: "webpage"
  });

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />
      <SchemaMarkup schema={webPage} />
      {children}
    </>
  );
}
