"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ConstructionSection } from '@/components/industries/ConstructionSection';
import { ConstructionFAQs } from '@/components/industries/construction/ConstructionFAQs';
import { ConstructionDifferentiators } from '@/components/industries/construction/ConstructionDifferentiators';
import { ConstructionActionCTA } from '@/components/industries/construction/ConstructionActionCTA';
import { ConstructionCaseStudies } from '@/components/industries/construction/ConstructionCaseStudies';
import { SectionCTA } from '@/components/industries/healthcare/SectionCTA';
import { RelatedIndustries } from '@/components/industries/construction/RelatedIndustries';
import ContactModal from '@/components/landing/ContactModal';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket, HardHat } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function ConstructionPageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Solutions', href: '/solutions/industries' },
    { label: 'Construction & Home Services', href: '/solutions/industries/construction' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Construction-specific AI roadmap with proven frameworks for operational excellence.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy AI solutions designed for construction and home services workflows.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build secure data infrastructure optimized for construction workloads.",
      href: "/services/data-engineering-modernization"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('Construction & Home Services Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Construction & Home Services AI Solutions",
        description: "AI-powered property inspections, automated report generation, and predictive maintenance for construction and home services. Computer vision and IoT solutions to improve efficiency and accuracy.",
        url: "https://innovoco.com/solutions/industries/construction",
        serviceType: "Construction & Home Services AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Construction", url: "https://innovoco.com/solutions/industries/construction" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="100+ Construction Clients"
          title="Construction & Home Services AI Solutions"
          subtitle="AI-Powered Property Inspections & Predictive Maintenance for Operational Excellence"
          description="Transform your construction and home services operations with AI-powered property inspections, automated report generation, and predictive maintenance. From computer vision roof damage detection to HVAC IoT analytics, our solutions deliver measurable improvements in efficiency, accuracy, and cost savings."
          trustIndicators={[
            { metric: "100+", label: "Construction Clients" },
            { metric: "50%", label: "Faster Inspections" },
            { metric: "99.7%", label: "Detection Accuracy" },
            { metric: "84%", label: "Report Time Reduction" }
          ]}
          primaryCTA={{
            text: "Schedule Consultation",
            onClick: () => setContactModalOpen(true)
          }}
          backgroundGradient="bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]"
        />

        {/* Construction-Specific Content */}
        <ConstructionSection />

        {/* Section CTA 1: After Construction Solutions */}
        <SectionCTA
          title="Schedule Your Construction AI Assessment"
          subtitle="Free consultation | 30-minute session | No obligation"
          buttonText="Book Your Assessment"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Construction Case Studies */}
        <ConstructionCaseStudies />

        {/* Section CTA 2: After Case Studies */}
        <SectionCTA
          title="See How We Can Help Your Business"
          subtitle="Join 100+ construction companies transforming operations with AI"
          buttonText="Start Your Transformation"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Construction-Specific FAQs */}
        <ConstructionFAQs />

        {/* Section CTA 3: After FAQs */}
        <SectionCTA
          title="Still Have Questions? Let's Talk"
          subtitle="Speak with a construction AI specialist about your specific needs"
          buttonText="Schedule a Call"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Why Choose Us - Construction Focus */}
        <ConstructionDifferentiators columns={2} />

        {/* Section CTA 4: After Differentiators */}
        <SectionCTA
          title="Partner With Construction AI Experts"
          subtitle="10+ years construction experience | Proven ROI"
          buttonText="Get Started Today"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Construction Action CTAs */}
        <ConstructionActionCTA onConsultationClick={() => setContactModalOpen(true)} />

        {/* Related Industries */}
        <RelatedIndustries />

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
