"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ManufacturingSection } from '@/components/industries/ManufacturingSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function ManufacturingPageClient() {
  const breadcrumbs = [
    { label: 'Solutions', href: '/solutions/industries' },
    { label: 'Manufacturing', href: '/solutions/industries/manufacturing' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Industry 4.0 roadmap with IoT integration and predictive maintenance strategies.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy production-ready AI for predictive maintenance, quality control, and optimization.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build IoT data infrastructure for real-time manufacturing intelligence.",
      href: "/services/data-engineering-modernization"
    }
  ];

  useEffect(() => {
    trackServicePageView('Manufacturing Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Manufacturing AI Automation & Analytics Solutions",
        description: "Industry 4.0 intelligent automation: predictive maintenance, quality control AI, and supply chain optimization for manufacturing excellence.",
        url: "https://innovoco.com/solutions/industries/manufacturing",
        serviceType: "Manufacturing AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Manufacturing", url: "https://innovoco.com/solutions/industries/manufacturing" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="Industry 4.0 Excellence"
          title="Manufacturing AI Automation & Analytics Solutions"
          subtitle="Predictive Maintenance, Quality Control & Supply Chain Optimization"
          description="Transform manufacturing operations with Industry 4.0 AI automation. From predictive maintenance reducing downtime 30-50% to computer vision quality control achieving 99%+ defect detection, our solutions drive operational excellence and competitive advantage."
          trustIndicators={[
            { metric: "30-50%", label: "Downtime Reduction" },
            { metric: "99%+", label: "Defect Detection" },
            { metric: "15-25%", label: "Forecast Improvement" },
            { metric: "15%", label: "OEE Increase" }
          ]}
          secondaryCTA={{
            text: "View Manufacturing Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#EDE9FE] via-[#FECACA] to-[#FED7AA]"
        />

        {/* Manufacturing-Specific Content */}
        <ManufacturingSection />

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
