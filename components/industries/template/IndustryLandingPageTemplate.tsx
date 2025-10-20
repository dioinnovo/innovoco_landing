"use client";

import { useState, ReactNode } from 'react';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { RelatedServices } from '@/components/services/RelatedServices';
import { IndustryHero } from '@/components/industries/shared/IndustryHero';
import { SectionCTA } from '@/components/industries/shared/SectionCTA';
import { IndustryCaseStudies } from '@/components/industries/shared/IndustryCaseStudies';
import { IndustryFAQs } from '@/components/industries/shared/IndustryFAQs';
import { IndustryDifferentiators } from '@/components/industries/shared/IndustryDifferentiators';
import { IndustryActionCTA } from '@/components/industries/shared/IndustryActionCTA';
import { IndustryRelatedLinks } from '@/components/industries/shared/IndustryRelatedLinks';
import ContactModal from '@/components/landing/ContactModal';
import { IndustryConfig } from '@/lib/content/industries/types';

interface IndustryLandingPageTemplateProps {
  config: IndustryConfig;
  industryContent: ReactNode;
}

export function IndustryLandingPageTemplate({
  config,
  industryContent
}: IndustryLandingPageTemplateProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleCTAClick = () => {
    setContactModalOpen(true);
  };

  return (
    <>
      <ServicePageLayout breadcrumbs={config.breadcrumbs}>
        {/* Hero Section with Primary CTA */}
        <IndustryHero
          {...config.hero}
          onCTAClick={handleCTAClick}
        />

        {/* Industry-Specific Content Section (FinancialSection, HealthcareSection, etc.) */}
        {industryContent}

        {/* Section CTA #1: After Main Content */}
        <SectionCTA
          {...config.sectionCTAs.afterMainContent}
          onClick={handleCTAClick}
        />

        {/* Case Studies Section */}
        <IndustryCaseStudies {...config.caseStudies} />

        {/* Section CTA #2: After Case Studies */}
        <SectionCTA
          {...config.sectionCTAs.afterCaseStudies}
          onClick={handleCTAClick}
        />

        {/* FAQs Section */}
        <IndustryFAQs
          faqs={config.faqs.questions}
          title={config.faqs.title}
          description={config.faqs.description}
        />

        {/* Section CTA #3: After FAQs */}
        <SectionCTA
          {...config.sectionCTAs.afterFAQs}
          onClick={handleCTAClick}
        />

        {/* Differentiators Section */}
        <IndustryDifferentiators
          title={config.differentiators.title}
          description={config.differentiators.description}
          items={config.differentiators.items}
          columns={config.differentiators.columns}
        />

        {/* Section CTA #4: After Differentiators */}
        <SectionCTA
          {...config.sectionCTAs.afterDifferentiators}
          onClick={handleCTAClick}
        />

        {/* Action CTA Section (3 cards with CTAs) */}
        <IndustryActionCTA
          {...config.actionCTA}
          onConsultationClick={handleCTAClick}
        />

        {/* Related Industries */}
        <IndustryRelatedLinks
          industries={config.relatedIndustries}
          showViewAll={false}
        />

        {/* Related Services */}
        <RelatedServices services={config.relatedServices} />
      </ServicePageLayout>

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
