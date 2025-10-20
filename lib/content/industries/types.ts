import { LucideIcon } from 'lucide-react';

// Hero Section
export interface IndustryHeroConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  trustIndicators: Array<{
    metric: string;
    label: string;
  }>;
  primaryCTAText: string;
  backgroundGradient: string;
}

// Case Studies
export interface IndustryCaseStudy {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    label: string;
    trend?: 'up' | 'down';
  }>;
}

// FAQs
export interface IndustryFAQ {
  question: string;
  answer: string;
}

// Differentiators
export interface IndustryDifferentiator {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

// Action CTAs
export interface IndustryActionCard {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  action: string;
}

// Section CTAs
export interface SectionCTAConfig {
  title: string;
  subtitle: string;
  buttonText: string;
}

// Related Links
export interface RelatedIndustry {
  title: string;
  description: string;
  href: string;
  gradient: string;
  icon: LucideIcon;
}

export interface RelatedService {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  description: string;
  href: string;
}

// Complete Industry Configuration
export interface IndustryConfig {
  // SEO & Metadata
  metadata: {
    title: string;
    description: string;
    keywords: string;
    url: string;
  };

  // Hero Section
  hero: IndustryHeroConfig;

  // Section CTAs (strategic placement throughout page)
  sectionCTAs: {
    afterMainContent: SectionCTAConfig;
    afterCaseStudies: SectionCTAConfig;
    afterFAQs: SectionCTAConfig;
    afterDifferentiators: SectionCTAConfig;
  };

  // Case Studies Section
  caseStudies: {
    badge: string;
    title: string;
    description: string;
    studies: IndustryCaseStudy[];
  };

  // FAQs Section
  faqs: {
    title: string;
    description: string;
    questions: IndustryFAQ[];
  };

  // Differentiators Section
  differentiators: {
    title: string;
    description: string;
    items: IndustryDifferentiator[];
    columns?: 2 | 3;
  };

  // Action CTA Section
  actionCTA: {
    title: string;
    subtitle: string;
    cards: IndustryActionCard[];
    footerText?: string;
  };

  // Related Content
  relatedIndustries: RelatedIndustry[];
  relatedServices: RelatedService[];

  // Breadcrumbs
  breadcrumbs: Array<{
    label: string;
    href: string;
  }>;
}
