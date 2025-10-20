"use client";

import { IndustryLandingPageTemplate } from '@/components/industries/template/IndustryLandingPageTemplate';
import { FinancialSection } from '@/components/industries/FinancialSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';
import { financialServicesConfig } from '@/lib/content/industries/financial-services';

export function FinancialServicesPageClient() {
  useEffect(() => {
    trackServicePageView('Financial Services Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Financial Services AI Automation & Analytics Solutions",
        description: financialServicesConfig.metadata.description,
        url: financialServicesConfig.metadata.url,
        serviceType: "Financial Services AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Financial Services", url: "https://innovoco.com/solutions/industries/financial-services" }
      ])} />

      <IndustryLandingPageTemplate
        config={financialServicesConfig}
        industryContent={<FinancialSection />}
      />
    </>
  );
}
