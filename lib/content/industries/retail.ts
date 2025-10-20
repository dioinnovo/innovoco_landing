import {
  ShoppingCart, TrendingUp, Users, BarChart3, Target, Award, Shield,
  Brain, Rocket, Database, HeartPulse, DollarSign, Factory, Package
} from 'lucide-react';
import { IndustryConfig } from './types';

export const retailConfig: IndustryConfig = {
  metadata: {
    title: 'Retail AI | Customer 360 & Personalization',
    description: 'Customer 360 analytics, AI personalization, demand forecasting, and dynamic pricing solutions for retail excellence.',
    keywords: 'retail AI, customer 360, personalization, demand forecasting, dynamic pricing, recommendation engines',
    url: 'https://innovoco.com/solutions/industries/retail',
  },

  hero: {
    badge: '28% Average Revenue Increase',
    title: 'Retail & E-Commerce AI Automation Solutions',
    subtitle: 'Customer 360, Personalization & Demand Forecasting',
    description: 'Transform retail operations with AI-powered customer 360 analytics, intelligent personalization engines, and advanced demand forecasting. From increasing revenue 28% to improving conversions 15-25%, our solutions deliver measurable growth across every customer touchpoint.',
    trustIndicators: [
      { metric: '28%', label: 'Avg Revenue Increase' },
      { metric: '15-25%', label: 'Conversion Lift' },
      { metric: '20-30%', label: 'Forecast Error Reduction' },
      { metric: '35%', label: 'Recommendation CTR' }
    ],
    primaryCTAText: 'Schedule Retail AI Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#DBEAFE] via-[#D1FAE5] to-[#DBEAFE]'
  },

  sectionCTAs: {
    afterMainContent: {
      title: 'Transform Your Retail Operations',
      subtitle: 'Omnichannel ready | 30-minute consultation | No obligation',
      buttonText: 'Schedule Assessment'
    },
    afterCaseStudies: {
      title: 'Increase Revenue with AI Personalization',
      subtitle: 'Join retailers achieving 28% revenue growth with customer 360 analytics',
      buttonText: 'Get Started'
    },
    afterFAQs: {
      title: 'Ready to Discuss Your Retail Needs?',
      subtitle: 'Speak with a retail AI specialist about your specific challenges',
      buttonText: 'Book Consultation'
    },
    afterDifferentiators: {
      title: 'Partner With Retail AI Experts',
      subtitle: '10+ years retail experience | Proven revenue growth',
      buttonText: 'Start Today'
    }
  },

  caseStudies: {
    badge: 'Proven Results',
    title: 'Retail AI Success Stories',
    description: 'Real-world results from retailers who have transformed customer experience and revenue with AI personalization',
    studies: []
  },

  faqs: {
    title: 'Retail AI Automation FAQs',
    description: 'Common questions about implementing AI for retail and e-commerce',
    questions: []
  },

  differentiators: {
    title: 'Why Choose Innovoco for Retail AI',
    description: 'Proven expertise in customer 360 analytics and personalization',
    columns: 2,
    items: []
  },

  actionCTA: {
    title: 'Ready to Transform Retail with AI?',
    subtitle: 'Choose your next step toward revenue growth',
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
      icon: DollarSign,
      title: 'Financial Services',
      description: 'Fraud detection and risk analytics',
      href: '/solutions/industries/financial-services',
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Predictive maintenance and quality control',
      href: '/solutions/industries/manufacturing',
      gradient: 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]'
    }
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]',
      title: 'AI Strategy & Consulting',
      description: 'Retail AI roadmap with customer 360, personalization, and omnichannel strategies.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy recommendation engines, demand forecasting, and personalization at scale.',
      href: '/services/ai-implementation'
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build customer data platforms and real-time analytics for omnichannel retail.',
      href: '/services/data-engineering-modernization'
    }
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Retail & E-Commerce', href: '/solutions/industries/retail' }
  ]
};
