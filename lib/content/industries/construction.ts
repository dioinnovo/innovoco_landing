import {
  HardHat, Camera, TrendingUp, Shield, Award, Activity,
  Brain, Rocket, Database, HeartPulse, DollarSign, Factory, ShoppingCart
} from 'lucide-react';
import { IndustryConfig } from './types';

export const constructionConfig: IndustryConfig = {
  metadata: {
    title: 'Construction AI | Property Inspections & Predictive Maintenance',
    description: 'AI-powered property inspections, automated report generation, and predictive maintenance for construction and home services.',
    keywords: 'construction AI, property inspection, computer vision, predictive maintenance, home services automation',
    url: 'https://innovoco.com/solutions/industries/construction',
  },

  hero: {
    badge: '100+ Construction Clients',
    title: 'Construction & Home Services AI Solutions',
    subtitle: 'AI-Powered Property Inspections & Predictive Maintenance',
    description: 'Transform your construction and home services operations with AI-powered property inspections, automated report generation, and predictive maintenance. From computer vision roof damage detection to HVAC IoT analytics, our solutions deliver measurable improvements in efficiency, accuracy, and cost savings.',
    trustIndicators: [
      { metric: '100+', label: 'Construction Clients' },
      { metric: '50%', label: 'Faster Inspections' },
      { metric: '99.7%', label: 'Detection Accuracy' },
      { metric: '84%', label: 'Report Time Reduction' }
    ],
    primaryCTAText: 'Schedule Construction AI Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]'
  },

  sectionCTAs: {
    afterMainContent: {
      title: 'Schedule Your Construction AI Assessment',
      subtitle: 'Free consultation | 30-minute session | No obligation',
      buttonText: 'Book Your Assessment'
    },
    afterCaseStudies: {
      title: 'See How We Can Help Your Business',
      subtitle: 'Join 100+ construction companies transforming operations with AI',
      buttonText: 'Start Your Transformation'
    },
    afterFAQs: {
      title: 'Still Have Questions? Let\'s Talk',
      subtitle: 'Speak with a construction AI specialist about your specific needs',
      buttonText: 'Schedule a Call'
    },
    afterDifferentiators: {
      title: 'Partner With Construction AI Experts',
      subtitle: '10+ years construction experience | Proven ROI',
      buttonText: 'Get Started Today'
    }
  },

  caseStudies: {
    badge: 'Proven Results',
    title: 'Construction AI Success Stories',
    description: 'Real-world results from construction and home services companies',
    studies: []
  },

  faqs: {
    title: 'Construction AI Automation FAQs',
    description: 'Common questions about implementing AI in construction and home services',
    questions: []
  },

  differentiators: {
    title: 'Why Choose Innovoco for Construction AI',
    description: 'Proven expertise in property inspection automation and predictive maintenance',
    columns: 2,
    items: []
  },

  actionCTA: {
    title: 'Ready to Transform Construction with AI?',
    subtitle: 'Choose your next step toward operational excellence',
    cards: []
  },

  relatedIndustries: [
    {
      icon: HeartPulse,
      title: 'Healthcare',
      description: 'HIPAA-compliant AI automation',
      href: '/solutions/industries/healthcare',
      gradient: 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C]'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Predictive maintenance and quality control',
      href: '/solutions/industries/manufacturing',
      gradient: 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: ShoppingCart,
      title: 'Retail',
      description: 'Customer 360 and personalization',
      href: '/solutions/industries/retail',
      gradient: 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]'
    }
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]',
      title: 'AI Strategy & Consulting',
      description: 'Construction-specific AI roadmap with proven frameworks for operational excellence.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy AI solutions designed for construction and home services workflows.',
      href: '/services/ai-implementation'
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build secure data infrastructure optimized for construction workloads.',
      href: '/services/data-engineering-modernization'
    }
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Construction & Home Services', href: '/solutions/industries/construction' }
  ]
};
