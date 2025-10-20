"use client";

import { IndustryLandingPageTemplate } from '@/components/industries/template/IndustryLandingPageTemplate';
import { RetailSection } from '@/components/industries/RetailSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';
import { retailConfig } from '@/lib/content/industries/retail';

export function RetailPageClient() {
  useEffect(() => {
    trackServicePageView('Retail Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Retail & E-Commerce AI Automation Solutions",
        description: retailConfig.metadata.description,
        url: retailConfig.metadata.url,
        serviceType: "Retail AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Retail", url: "https://innovoco.com/solutions/industries/retail" }
      ])} />

      <IndustryLandingPageTemplate
        config={retailConfig}
        industryContent={<RetailSection />}
      />
    </>
  );
}
