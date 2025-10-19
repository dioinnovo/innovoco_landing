"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { RetailSection } from '@/components/industries/RetailSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function RetailPageClient() {
  const breadcrumbs = [
    { label: 'Solutions', href: '/solutions/industries' },
    { label: 'Retail & E-Commerce', href: '/solutions/industries/retail' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Retail AI roadmap with customer 360, personalization, and omnichannel strategies.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy recommendation engines, demand forecasting, and personalization at scale.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build customer data platforms and real-time analytics for omnichannel retail.",
      href: "/services/data-engineering-modernization"
    }
  ];

  useEffect(() => {
    trackServicePageView('Retail Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Retail & E-Commerce AI Automation Solutions",
        description: "Customer 360 analytics, AI personalization, demand forecasting, and dynamic pricing solutions for retail excellence.",
        url: "https://innovoco.com/solutions/industries/retail",
        serviceType: "Retail AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Retail", url: "https://innovoco.com/solutions/industries/retail" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="28% Average Revenue Increase"
          title="Retail & E-Commerce AI Automation Solutions"
          subtitle="Customer 360, Personalization & Demand Forecasting"
          description="Transform retail operations with AI-powered customer 360 analytics, intelligent personalization engines, and advanced demand forecasting. From increasing revenue 28% to improving conversions 15-25%, our solutions deliver measurable growth across every customer touchpoint."
          trustIndicators={[
            { metric: "28%", label: "Avg Revenue Increase" },
            { metric: "15-25%", label: "Conversion Lift" },
            { metric: "20-30%", label: "Forecast Error Reduction" },
            { metric: "35%", label: "Recommendation CTR" }
          ]}
          secondaryCTA={{
            text: "View Retail Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#DBEAFE] via-[#D1FAE5] to-[#DBEAFE]"
        />

        {/* Retail-Specific Content */}
        <RetailSection />

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
