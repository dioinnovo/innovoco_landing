"use client";

import { IndustryLandingPageTemplate } from '@/components/industries/template/IndustryLandingPageTemplate';
import { ManufacturingSection } from '@/components/industries/ManufacturingSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';
import { manufacturingConfig } from '@/lib/content/industries/manufacturing';

export function ManufacturingPageClient() {
  useEffect(() => {
    trackServicePageView('Manufacturing Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Manufacturing AI Automation & Analytics Solutions",
        description: manufacturingConfig.metadata.description,
        url: manufacturingConfig.metadata.url,
        serviceType: "Manufacturing AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Manufacturing", url: "https://innovoco.com/solutions/industries/manufacturing" }
      ])} />

      <IndustryLandingPageTemplate
        config={manufacturingConfig}
        industryContent={<ManufacturingSection />}
      />
    </>
  );
}
