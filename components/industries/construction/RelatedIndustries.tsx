"use client";

import { HeartPulse, TrendingUp, Factory, ShoppingCart } from "lucide-react";
import {
  RelatedResourceCardLink,
  RelatedResourceCardsSection,
} from "@/components/case-studies/use-case-study/related-resource-card";
import { getIndustryRelatedCardImageSrc } from "@/lib/industry-related-card-image";

const relatedIndustries = [
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description: "HIPAA-compliant AI automation and analytics for clinical excellence",
    href: "/solutions/industries/healthcare",
  },
  {
    icon: TrendingUp,
    title: "Financial Services",
    description: "Real-time fraud detection automation and risk analytics",
    href: "/solutions/industries/financial-services",
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial",
    description: "Industry 4.0 intelligent automation and predictive maintenance",
    href: "/solutions/industries/manufacturing",
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    description: "Customer 360 analytics and AI personalization",
    href: "/solutions/industries/retail",
  },
];

export function RelatedIndustries() {
  return (
    <RelatedResourceCardsSection
      heading="Explore Other Industries"
      description="Proven AI automation and analytics solutions across regulated industries."
    >
      {relatedIndustries.map((industry, index) => {
        const Icon = industry.icon;
        return (
          <RelatedResourceCardLink
            key={index}
            href={industry.href}
            imageSrc={getIndustryRelatedCardImageSrc(industry.href)}
            title={industry.title}
            description={industry.description}
            icon={Icon}
          />
        );
      })}
    </RelatedResourceCardsSection>
  );
}
