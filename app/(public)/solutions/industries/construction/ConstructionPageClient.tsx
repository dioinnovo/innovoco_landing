"use client";

import { IndustryLandingPageTemplate } from '@/components/industries/template/IndustryLandingPageTemplate';
import { ConstructionSection } from '@/components/industries/ConstructionSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';
import { constructionConfig } from '@/lib/content/industries/construction';

export function ConstructionPageClient() {
  useEffect(() => {
    trackServicePageView('Construction & Home Services Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Construction & Home Services AI Solutions",
        description: constructionConfig.metadata.description,
        url: constructionConfig.metadata.url,
        serviceType: "Construction & Home Services AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Construction", url: "https://innovoco.com/solutions/industries/construction" }
      ])} />

      <IndustryLandingPageTemplate
        config={constructionConfig}
        industryContent={<ConstructionSection />}
      />
    </>
  );
}
