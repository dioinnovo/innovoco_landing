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
    title: "AI Strategy & Consulting Services | Enterprise AI Roadmap",
    description: "Expert AI strategy consulting to guide your AI transformation. Framework-agnostic roadmaps, governance, and ROI modeling. 10+ years data expertise.",
    keywords: [
      "AI strategy consulting",
      "enterprise AI roadmap",
      "AI framework selection",
      "AI governance framework",
      "AI maturity assessment",
      "AI consulting services"
    ],
    canonical: "https://innovoco.com/services/ai-strategy-consulting",
  },
  dataEngineering: {
    title: "Data Engineering & Modernization | Cloud Data Migration",
    description: "Modernize your data warehouse for AI-ready infrastructure. Azure, Google, AWS cloud migration. 10+ years building enterprise data platforms.",
    keywords: [
      "data warehouse modernization",
      "cloud data migration",
      "enterprise data architecture",
      "data engineering services",
      "ETL modernization",
      "cloud data platform"
    ],
    canonical: "https://innovoco.com/services/data-engineering-modernization",
  },
  aiImplementation: {
    title: "AI Implementation Services | Enterprise AI Deployment",
    description: "From POC to production in 12-16 weeks. LLM integration, AI agents, MLOps. Enterprise-grade AI with proven data foundation.",
    keywords: [
      "AI implementation services",
      "enterprise AI deployment",
      "LLM integration",
      "AI agent development",
      "MLOps services",
      "RAG implementation"
    ],
    canonical: "https://innovoco.com/services/ai-implementation",
  },
  managedServices: {
    title: "Managed AI Services | 24/7 AI Operations & Monitoring",
    description: "SLA-backed AI operations support. 24/7 monitoring, model performance management, continuous optimization. Predictable costs vs DIY.",
    keywords: [
      "managed AI services",
      "AI operations support",
      "ML model monitoring",
      "MLOps managed services",
      "AI infrastructure management",
      "model performance monitoring"
    ],
    canonical: "https://innovoco.com/services/managed-ai-services",
  },
  industries: {
    title: "AI Automation & Analytics Solutions | Healthcare, Finance, Manufacturing, Retail",
    description: "Enterprise AI automation and analytics solutions for healthcare, financial services, manufacturing, and retail. Transform operations with intelligent automation and advanced analytics. Proven ROI across industries.",
    keywords: [
      "AI automation and analytics",
      "AI automation solutions",
      "analytics automation",
      "enterprise automation platform",
      "intelligent automation",
      "AI analytics solutions",
      "financial services AI automation",
      "healthcare analytics automation",
      "manufacturing AI automation",
      "retail analytics automation",
      "predictive analytics platform",
      "automated analytics"
    ],
    canonical: "https://innovoco.com/solutions/industries",
  },
};

// Helper to get metadata by page key
export function getServiceMetadata(key: keyof typeof SERVICE_METADATA): Metadata {
  const config = SERVICE_METADATA[key];
  return generateMetadata(config);
}
