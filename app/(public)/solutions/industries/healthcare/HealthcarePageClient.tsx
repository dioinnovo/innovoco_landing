"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { HealthcareSection } from '@/components/industries/HealthcareSection';
import { HealthcareFAQs } from '@/components/industries/healthcare/HealthcareFAQs';
import { HealthcareDifferentiators } from '@/components/industries/healthcare/HealthcareDifferentiators';
import { HealthcareActionCTA } from '@/components/industries/healthcare/HealthcareActionCTA';
import { HealthcareCaseStudies } from '@/components/industries/healthcare/HealthcareCaseStudies';
import { SectionCTA } from '@/components/industries/healthcare/SectionCTA';
import { RelatedIndustries } from '@/components/industries/healthcare/RelatedIndustries';
import ContactModal from '@/components/landing/ContactModal';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket, HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function HealthcarePageClient() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Solutions', href: '/solutions/industries' },
    { label: 'Healthcare & Life Sciences', href: '/solutions/industries/healthcare' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Healthcare-specific AI roadmap with proven frameworks for clinical and operational excellence.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy HIPAA-compliant AI solutions designed for healthcare regulatory requirements.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build secure, HIPAA-compliant data infrastructure optimized for healthcare workloads.",
      href: "/services/data-engineering-modernization"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('Healthcare Industry Solutions');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Healthcare AI Automation & Analytics Solutions",
        description: "HIPAA-compliant AI automation and analytics for healthcare providers. Clinical decision support, predictive patient analytics, and medical imaging AI to improve patient outcomes.",
        url: "https://innovoco.com/solutions/industries/healthcare",
        serviceType: "Healthcare AI Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Solutions", url: "https://innovoco.com/solutions/industries" },
        { name: "Healthcare", url: "https://innovoco.com/solutions/industries/healthcare" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="100+ Healthcare Clients"
          title="Healthcare AI Automation & Analytics Solutions"
          subtitle="HIPAA-Compliant Intelligent Automation for Better Patient Outcomes"
          description="Transform patient care with AI-powered clinical decision support, predictive analytics, and intelligent automation designed specifically for healthcare providers. From reducing readmissions to improving diagnostic accuracy, our HIPAA-compliant solutions deliver measurable improvements in both clinical and operational outcomes."
          trustIndicators={[
            { metric: "100+", label: "Healthcare Clients" },
            { metric: "25%", label: "Avg Readmission Reduction" },
            { metric: "90%+", label: "Diagnostic Accuracy" },
            { metric: "100%", label: "HIPAA Compliant" }
          ]}
          primaryCTA={{
            text: "Schedule HIPAA Compliance Assessment",
            onClick: () => setContactModalOpen(true)
          }}
          backgroundGradient="bg-gradient-to-br from-[#FECACA] via-[#FED7AA] to-[#FEF3C7]"
        />

        {/* Healthcare-Specific Content */}
        <HealthcareSection />

        {/* Section CTA 1: After Healthcare Solutions */}
        <SectionCTA
          title="Schedule Your Healthcare AI Assessment"
          subtitle="HIPAA-compliant | 30-minute consultation | No obligation"
          buttonText="Book Your Assessment"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Healthcare Case Studies */}
        <HealthcareCaseStudies />

        {/* Section CTA 2: After Case Studies */}
        <SectionCTA
          title="See How We Can Help Your Organization"
          subtitle="Join 100+ healthcare providers transforming patient care with AI"
          buttonText="Start Your Transformation"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Healthcare-Specific FAQs */}
        <HealthcareFAQs />

        {/* Section CTA 3: After FAQs */}
        <SectionCTA
          title="Still Have Questions? Let's Talk"
          subtitle="Speak with a healthcare AI specialist about your specific needs"
          buttonText="Schedule a Call"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Why Choose Us - Healthcare Focus */}
        <HealthcareDifferentiators columns={2} />

        {/* Section CTA 4: After Differentiators */}
        <SectionCTA
          title="Partner With Healthcare AI Experts"
          subtitle="10+ years healthcare experience | HIPAA compliance guaranteed"
          buttonText="Get Started Today"
          onClick={() => setContactModalOpen(true)}
        />

        {/* Healthcare Action CTAs */}
        <HealthcareActionCTA onConsultationClick={() => setContactModalOpen(true)} />

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
