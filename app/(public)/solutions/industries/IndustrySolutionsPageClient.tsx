"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { IndustryOverviewCards } from '@/components/industries/IndustryOverviewCards';
import { IndustryFAQs, industryFAQs } from '@/components/industries/IndustryFAQs';
import { TechnologyStack, healthcareTechnologies, financialTechnologies, manufacturingTechnologies, retailTechnologies } from '@/components/industries/TechnologyStack';
import { HealthcareSection } from '@/components/industries/HealthcareSection';
import { FinancialSection } from '@/components/industries/FinancialSection';
import { ManufacturingSection } from '@/components/industries/ManufacturingSection';
import { RetailSection } from '@/components/industries/RetailSection';
import { DifferentiatorGrid } from '@/components/industries/DifferentiatorGrid';
import { ActionCTASection } from '@/components/industries/ActionCTASection';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket, Building2, HeartPulse, ShoppingCart, Factory, TrendingUp, Shield, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking, trackIndustrySelection } from '@/lib/analytics/events';
import { useContact } from '@/contexts/ContactContext';

export function IndustrySolutionsPageClient() {
  const { openContactModal } = useContact();

  const breadcrumbs = [
    { label: 'AI Automation & Analytics by Industry', href: '/solutions/industries' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Build your industry-specific AI roadmap with proven frameworks tailored to your sector's unique challenges.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy production-ready AI solutions designed for your industry's regulatory and operational requirements.",
      href: "/services/ai-implementation"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build compliant, secure data infrastructure optimized for industry-specific workloads and regulations.",
      href: "/services/data-engineering-modernization"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('Industry Solutions Hub');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "AI Automation & Analytics Solutions - Healthcare, Financial Services, Manufacturing, Retail",
        description: "Industry-specific AI automation and analytics solutions for healthcare, financial services, manufacturing, and retail. Transform operations with intelligent automation and advanced analytics. Proven use cases with measurable ROI across regulated and complex enterprise environments.",
        url: "https://innovoco.com/solutions/industries",
        serviceType: "AI Automation and Analytics Solutions"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "AI Automation & Analytics by Industry", url: "https://innovoco.com/solutions/industries" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="Trusted Across 4 Major Industries"
          title="Enterprise AI Automation & Analytics Solutions by Industry"
          subtitle="Intelligent Automation & Advanced Analytics for Healthcare, Finance, Manufacturing & Retail"
          description="Transform your operations with industry-specific AI automation and analytics solutions designed for the unique challenges, regulations, and opportunities of your sector. From HIPAA-compliant healthcare analytics to real-time fraud detection automation in financial services, we deliver measurable results through intelligent automation and advanced analytics in complex enterprise environments."
          trustIndicators={[
            { metric: "500+", label: "Enterprise Clients" },
            { metric: "4", label: "Core Industries" },
            { metric: "500+", label: "AI Automation Solutions" },
            { metric: "$50M+", label: "Value Generated" }
          ]}
          primaryCTA={{
            text: "Schedule Automation Consultation",
            onClick: openContactModal
          }}
          secondaryCTA={{
            text: "View Industry Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#DBEAFE] via-[#D1FAE5] to-[#EDE9FE]"
        />

        {/* Overview Section */}
        <ServiceSection
          icon={Building2}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Why Industry Expertise Matters for AI Automation & Analytics"
          subtitle="Generic automation solutions fail in regulated, complex environments"
        >
          <p>
            AI automation and analytics are not one-size-fits-all initiatives. What works for a tech startup doesn't work for a hospital
            managing PHI under HIPAA, a bank subject to SOC 2 and PCI-DSS compliance, or a manufacturer with decades-old ERP systems
            and shop floor IoT devices. Industry-specific challenges—regulatory requirements, legacy infrastructure, domain-specific
            terminology, and unique business models—require consultants who understand your sector deeply, not just generic AI automation frameworks.
          </p>

          <p>
            Our industry AI automation and analytics solutions are built on 10+ years of experience serving healthcare providers, financial institutions, manufacturing
            enterprises, and retail companies. We've navigated HIPAA compliance for automated clinical decision support systems, implemented real-time
            fraud detection automation under PCI-DSS constraints, deployed predictive maintenance analytics on factory floors with OT/IT integration, and built
            customer 360 analytics platforms processing billions of retail transactions. This deep industry expertise in automation and analytics means we anticipate challenges
            before they arise, recommend solutions proven in your sector, and deliver intelligent automation systems that meet both business and regulatory requirements.
          </p>

          <p>
            Whether you're a hospital network looking to improve patient outcomes with AI-driven diagnostic automation, a financial services firm
            building real-time risk management analytics, a manufacturer implementing Industry 4.0 intelligent automation, or a retailer optimizing
            supply chains with demand forecasting analytics, our industry-focused AI automation and analytics approach ensures your initiatives deliver measurable
            ROI while maintaining compliance, security, and operational reliability.
          </p>
        </ServiceSection>

        {/* Industry Overview Cards */}
        <IndustryOverviewCards />

        {/* Healthcare Solutions Section */}
        <HealthcareSection />

        {/* Financial Services Solutions Section */}
        <FinancialSection />

        {/* Manufacturing Solutions Section */}
        <ManufacturingSection />

        {/* Retail Solutions Section */}
        <RetailSection />

        {/* FAQ Section */}
        <IndustryFAQs
          faqs={industryFAQs}
          title="AI Automation & Analytics FAQs"
          description="Common questions about implementing AI automation and analytics solutions across industries"
        />

        {/* Why Choose Innovoco - Visual Differentiators */}
        <DifferentiatorGrid columns={2} />

        {/* Get Started - Visual Action Cards */}
        <ActionCTASection onConsultationClick={openContactModal} />

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
