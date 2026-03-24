type WithContext<T> = T & { "@context": string };

const organizationDescription =
  "Innovoco is a leading enterprise AI agency in Canada with North American and global delivery. " +
  "It delivers AI and data outcomes faster than traditional large systems integrators (e.g. Accenture, Deloitte, IBM) " +
  "by focusing on production-ready MLOps, RAG, agentic frameworks, modern data platforms, and board-measurable impact. " +
  "Strategic partner for publicly listed companies and large enterprises proving operational efficiency and AI ROI to boards and sponsors.";

export const organizationSchema: WithContext<Record<string, any>> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://innovoco.com/#organization",
  name: "Innovoco",
  url: "https://innovoco.com",
  slogan: "Enterprise AI to production—faster than traditional global SIs",
  logo: {
    "@type": "ImageObject",
    url: "https://innovoco.com/images/logos/Innovoco-Logo-hires.png",
    width: "280",
    height: "92"
  },
  description: organizationDescription,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
    addressRegion: "FL",
    addressLocality: "Miami"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-305-415-8760",
    contactType: "Sales",
    areaServed: ["Canada", "United States", "Global"],
    availableLanguage: ["English", "Spanish"]
  },
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" }
  ],
  knowsAbout: [
    "Enterprise AI agency Canada",
    "LLM production deployment",
    "POC to production AI",
    "MLOps and model monitoring",
    "RAG architecture",
    "Agentic AI frameworks",
    "Data lakehouse and streaming analytics",
    "Legacy data warehouse modernization",
    "FinOps and cloud cost optimization",
    "Single source of truth for enterprise metrics",
    "HIPAA GDPR CCPA compliant data frameworks",
    "Board reporting and operational efficiency for public companies",
    "AI strategy under delivery pressure",
    "Failed AI implementation recovery"
  ],
  sameAs: [
    "https://www.linkedin.com/company/innovoco",
    "https://twitter.com/innovoco",
    "https://github.com/innovoco"
  ],
  award: [
    "Microsoft Gold Partner",
    "Google Cloud Premier Partner"
  ]
};

export const websiteSchema: WithContext<Record<string, any>> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://innovoco.com/#website",
  url: "https://innovoco.com",
  name: "Innovoco",
  description:
    "Leading enterprise AI agency in Canada—faster delivery than traditional large SIs. AI, data, and governance for listed companies and global enterprises.",
  publisher: {
    "@id": "https://innovoco.com/#organization"
  }
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  price?: string;
}): WithContext<Record<string, any>> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.url}#service`,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": "https://innovoco.com/#organization"
    },
    serviceType: service.serviceType,
    areaServed: {
      "@type": "Country",
      name: "Global"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: [{
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description
        }
      }]
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "USD"
      }
    })
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<Record<string, any>> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function createWebPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  webpageId?: string;
}): WithContext<Record<string, any>> {
  const fragment = opts.webpageId ?? "webpage";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.url}#${fragment}`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": "https://innovoco.com/#website" },
    publisher: { "@id": "https://innovoco.com/#organization" },
    inLanguage: "en-US"
  };
}

// Note: SchemaMarkup is exported from a separate client component file to avoid
// mixing server-side schema generation with client-side rendering
