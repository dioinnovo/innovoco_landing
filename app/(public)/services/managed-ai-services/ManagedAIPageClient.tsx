"use client";

import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { RelatedServices } from "@/components/services/RelatedServices";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createServiceSchema, createBreadcrumbSchema } from "@/lib/seo/schema";
import { Brain, Database, Gauge, Shield, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { createScrollDepthTracking, trackServicePageView } from "@/lib/analytics/events";

export function ManagedAIPageClient() {
  const breadcrumbs = [
    { label: "Services", href: "/services" },
    { label: "Managed AI Services", href: "/services/managed-ai-services" },
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Align AI investments with business outcomes before you scale operations.",
      href: "/services/ai-strategy-consulting",
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "AI Implementation",
      description: "Ship production-grade models and agents with clear handoff into managed operations.",
      href: "/services/ai-implementation",
    },
  ];

  useEffect(() => {
    trackServicePageView("Managed AI Services");
    const cleanup = createScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup
        schema={createServiceSchema({
          name: "Managed AI Services",
          description:
            "SLA-backed AI operations support including 24/7 monitoring, model performance management, and continuous optimization.",
          url: "https://innovoco.com/services/managed-ai-services",
          serviceType: "Managed IT Service",
        })}
      />

      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
          { name: "Managed AI Services", url: "https://innovoco.com/services/managed-ai-services" },
        ])}
      />

      <ServicePageLayout breadcrumbs={breadcrumbs} customLogo="/images/logos/innovoco-ai-hires.png">
        <ServiceHero
          badge="Operations You Can Trust"
          title="Managed AI Services"
          subtitle="Keep Models Reliable, Secure, and Cost-Efficient"
          description="Innovoco provides SLA-backed monitoring, incident response, retraining workflows, and cost governance so your AI systems stay accurate in production—not just in the lab."
          trustIndicators={[
            { metric: "24/7", label: "Monitoring coverage" },
            { metric: "SLA", label: "Backed operations" },
            { metric: "99.9%", label: "Uptime targets" },
            { metric: "10Y+", label: "Data & AI ops" },
          ]}
          primaryCTA={{
            text: "Discuss managed operations",
            onClick: () => {
              window.location.href = "/contact?service=managed-ai";
            },
          }}
          secondaryCTA={{
            text: "View case studies",
            href: "/case-studies",
          }}
          backgroundGradient="bg-gradient-to-br from-[#FEF3C7] via-[#EDE9FE] to-[#DBEAFE]"
        />

        <ServiceSection
          icon={Gauge}
          iconGradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
          title="What we run for you"
          subtitle="Production AI needs continuous care"
        >
          <p>
            Models drift, data pipelines break, and costs creep as usage grows. Our managed AI
            services team operates your inference endpoints, batch jobs, and supporting data
            workflows with clear runbooks, on-call coverage, and executive-ready reporting.
          </p>
          <p>
            We align with your security and compliance requirements—whether you deploy on Azure,
            Google Cloud, AWS, or hybrid environments—and coordinate change management with your
            internal platform teams.
          </p>
        </ServiceSection>

        <ServiceSection
          icon={Shield}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Included capabilities"
          subtitle="A practical operations stack"
        >
          <ul className="list-disc pl-5 space-y-2 text-[#374151]">
            <li>Health checks, alerting, and incident response for models and dependent services</li>
            <li>Performance tracking: latency, throughput, error budgets, and business KPIs</li>
            <li>Cost visibility and optimization for inference, storage, and training workloads</li>
            <li>Scheduled retraining / evaluation cycles with documented promotion criteria</li>
            <li>Documentation and knowledge transfer for your internal owners</li>
          </ul>
        </ServiceSection>

        <ServiceSection
          icon={CheckCircle}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Who this is for"
          subtitle="Teams that have shipped AI and need it to scale safely"
        >
          <p>
            Ideal when you have models in production—or a roadmap to get there—and need a partner
            to share operational responsibility, reduce downtime risk, and keep spend predictable.
            We complement your engineering org; we don&apos;t replace ownership of product vision.
          </p>
        </ServiceSection>

        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
