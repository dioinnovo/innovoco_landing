"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { FinancialSection } from '@/components/industries/FinancialSection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function FinancialServicesPageClient() {
  const breadcrumbs = [
    { label: 'Solutions', href: '/solutions/industries' },
    { label: 'Financial Services', href: '/solutions/industries/financial-services' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Financial services AI roadmap with regulatory compliance and risk management focus.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy compliant AI solutions for banking, insurance, and financial services.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build secure data infrastructure meeting SOC 2, PCI-DSS, and regulatory requirements.",
      href: "/services/data-engineering-modernization"
    }
  ];

  useEffect(() => {
    trackServicePageView('Financial Services Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Financial Services AI Automation & Analytics Solutions",
        description: "Real-time fraud detection, risk analytics, and regulatory compliance solutions for financial institutions. $50M+ in fraud savings delivered.",
        url: "https://innovoco.com/solutions/industries/financial-services",
        serviceType: "Financial Services AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Financial Services", url: "https://innovoco.com/solutions/industries/financial-services" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="$50M+ Fraud Savings Delivered"
          title="Financial Services AI Automation & Analytics"
          subtitle="Real-Time Fraud Detection, Risk Analytics & Regulatory Compliance"
          description="Transform financial operations with real-time fraud detection automation, advanced risk analytics, and AI-powered compliance solutions. From detecting fraudulent transactions in <100ms to reducing false positives by 80%, our solutions deliver measurable ROI while maintaining regulatory compliance."
          trustIndicators={[
            { metric: "$50M+", label: "Fraud Savings Delivered" },
            { metric: "95%+", label: "Fraud Detection Rate" },
            { metric: "<100ms", label: "Transaction Scoring" },
            { metric: "80%", label: "False Positive Reduction" }
          ]}
          secondaryCTA={{
            text: "View Financial Services Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#D1FAE5] via-[#DBEAFE] to-[#EDE9FE]"
        />

        {/* Financial-Specific Content */}
        <FinancialSection />

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
