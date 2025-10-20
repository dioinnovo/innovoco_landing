"use client";

import { IndustryLandingPageTemplate } from '@/components/industries/template/IndustryLandingPageTemplate';
import { HealthcareSection } from '@/components/industries/HealthcareSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';
import { healthcareConfig } from '@/lib/content/industries/healthcare';

export function HealthcarePageClient() {
  useEffect(() => {
    trackServicePageView('Healthcare Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Healthcare AI Automation & Analytics Solutions",
        description: healthcareConfig.metadata.description,
        url: healthcareConfig.metadata.url,
        serviceType: "Healthcare AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Healthcare", url: "https://innovoco.com/solutions/industries/healthcare" }
      ])} />

      <IndustryLandingPageTemplate
        config={healthcareConfig}
        industryContent={<HealthcareSection />}
      />
    </>
  );
}
