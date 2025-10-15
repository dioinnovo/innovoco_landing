import { Organization, Service, BreadcrumbList, WebSite, WithContext } from 'schema-dts';

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://innovoco.com/#organization",
  name: "Innovoco",
  url: "https://innovoco.com",
  logo: {
    "@type": "ImageObject",
    url: "https://innovoco.com/images/logos/Innovoco-Logo-hires.png",
    width: "280",
    height: "92"
  },
  description: "Enterprise AI and data transformation services. 10+ years expertise, 1000+ solutions delivered to 300+ enterprise clients.",
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
    areaServed: "Global",
    availableLanguage: ["English", "Spanish"]
  },
  sameAs: [
    "https://www.linkedin.com/company/innovoco",
    "https://twitter.com/innovoco",
    "https://github.com/innovoco"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127"
  },
  award: [
    "Microsoft Gold Partner",
    "Google Cloud Premier Partner"
  ]
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://innovoco.com/#website",
  url: "https://innovoco.com",
  name: "Innovoco",
  description: "Enterprise AI and Data Transformation Services",
  publisher: {
    "@id": "https://innovoco.com/#organization"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://innovoco.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  price?: string;
}): WithContext<Service> {
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

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
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

// Note: SchemaMarkup is exported from a separate client component file to avoid
// mixing server-side schema generation with client-side rendering
