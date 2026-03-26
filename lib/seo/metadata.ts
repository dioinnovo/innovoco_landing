import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/og-image.png'
}: PageMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Pre-configured metadata for each service page
export const SERVICE_METADATA = {
  aiStrategy: {
    title: "AI Strategy Consulting | Board-Ready Roadmap in 4 Weeks",
    description: "Enterprise AI strategy consulting: maturity assessment, use-case prioritization, and board-ready roadmaps. 171% avg ROI across 500+ deployments. Book a free workshop.",
    keywords: [
      "AI strategy consulting",
      "enterprise AI roadmap",
      "AI maturity assessment",
      "AI framework selection",
      "AI governance framework",
      "AI consulting services",
      "AI use case prioritization",
      "responsible AI governance",
      "AI ROI modeling",
      "enterprise AI transformation",
    ],
    canonical: "https://innovoco.com/services/ai-strategy-consulting",
  },
  dataEngineering: {
    title: "Data Engineering & Modernization | AI-Ready Data Platforms",
    description: "Enterprise data engineering: cloud migration, lakehouse architecture, real-time pipelines. 5PB+ migrated, 40% avg cost reduction. Zero-downtime modernization on AWS, Azure, GCP.",
    keywords: [
      "data engineering consulting services",
      "data warehouse modernization",
      "cloud data migration services",
      "data lakehouse architecture",
      "real-time data pipelines",
      "enterprise data architecture",
      "ETL modernization",
      "cloud data platform",
      "data mesh architecture",
      "AI-ready data infrastructure",
    ],
    canonical: "https://innovoco.com/services/data-engineering-modernization",
  },
  aiImplementation: {
    title: "AI Implementation Services | POC to Production in 12 Weeks",
    description: "Enterprise AI implementation: agentic AI, LLM integration, RAG systems, MLOps. 500+ deployments, 95% on-time delivery. From prototype to production in 12 weeks.",
    keywords: [
      "AI implementation services",
      "enterprise AI deployment",
      "agentic AI development",
      "LLM integration services",
      "RAG implementation",
      "AI agent development",
      "MLOps services",
      "computer vision deployment",
      "enterprise AI consulting",
      "AI proof of concept",
    ],
    canonical: "https://innovoco.com/services/ai-implementation",
  },
  managedServices: {
    title: "Managed AI Services | 24/7 MLOps & AI Operations",
    description: "SLA-backed AI operations: 24/7 monitoring, automated retraining, FinOps optimization. 99.9% uptime, predictable costs. Keep your AI sharp post-deployment.",
    keywords: [
      "managed AI services",
      "MLOps managed services",
      "AI operations support",
      "model monitoring services",
      "AI infrastructure management",
      "LLMOps services",
      "AI cost optimization",
      "model performance monitoring",
      "AI FinOps",
      "enterprise MLOps"
    ],
    canonical: "https://innovoco.com/services/managed-ai-services",
  },
};

// Helper to get metadata by page key
export function getServiceMetadata(key: keyof typeof SERVICE_METADATA): Metadata {
  const config = SERVICE_METADATA[key];
  return generateMetadata(config);
}
