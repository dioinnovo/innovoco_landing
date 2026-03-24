import {
  ShoppingCart,
  Users,
  BarChart3,
  Target,
  Shield,
  Brain,
  Rocket,
  Database,
  HeartPulse,
  DollarSign,
  HardHat,
  Sparkles,
  LineChart,
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
    backgroundGradient: 'bg-gradient-to-br from-[#EEF2FF] via-[#EDE9FE] to-[#E0E7FF]'
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
    studies: [
      {
        icon: Users,
        iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        imageSrc: '/images/industries/retail/solutions/customer-360-identity.jpg',
        title: 'Customer 360 for Omnichannel Apparel',
        industry: 'Retail | Fashion',
        challenge: 'Fragmented customer data across e-commerce, stores, and marketplaces prevented unified targeting and inflated acquisition costs.',
        solution: 'Built a real-time customer 360 with identity resolution, behavioral scoring, and activation APIs to marketing and store associates.',
        results: [
          { metric: '28%', label: 'Revenue lift', trend: 'up' },
          { metric: '22%', label: 'Lower CAC', trend: 'down' },
          { metric: '3.2x', label: 'Cross-channel ROAS' }
        ]
      },
      {
        icon: Sparkles,
        iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        imageSrc: '/images/industries/retail/solutions/ai-personalization-search.jpg',
        title: 'AI Personalization Engine',
        industry: 'E-Commerce | Specialty',
        challenge: 'Generic product grids produced low engagement; manual merchandising could not scale across 200K+ SKUs.',
        solution: 'Deployed session-aware recommendation and ranking models with guardrails for inventory, margin, and diversity.',
        results: [
          { metric: '35%', label: 'Rec CTR' },
          { metric: '18%', label: 'AOV increase', trend: 'up' },
          { metric: '12%', label: 'Return rate ↓', trend: 'down' }
        ]
      },
      {
        icon: LineChart,
        iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        imageSrc: '/images/industries/retail/solutions/demand-forecasting-pricing.jpg',
        title: 'Demand Forecasting at Scale',
        industry: 'Retail | Grocery',
        challenge: 'Store-level forecasts missed promotions and weather spikes, driving spoilage and lost sales on high-velocity categories.',
        solution: 'ML forecasting pipeline combining POS, promotions, calendar, and external signals with automated replenishment integration.',
        results: [
          { metric: '24%', label: 'Forecast error ↓', trend: 'down' },
          { metric: '$6M', label: 'Inventory savings' },
          { metric: '9%', label: 'Fewer stockouts', trend: 'down' }
        ]
      },
      {
        icon: Target,
        iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        imageSrc: '/images/industries/retail-hero.jpg',
        title: 'Dynamic Pricing & Promotions',
        industry: 'Retail | Electronics',
        challenge: 'Static pricing left margin on the table while competitors adjusted daily; promotion planning was spreadsheet-driven.',
        solution: 'Implemented elasticity-aware pricing with competitive signals and controlled guardrails by category and channel.',
        results: [
          { metric: '4.1%', label: 'Margin lift' },
          { metric: '31%', label: 'Faster price cycles' },
          { metric: '100%', label: 'Audit trail' }
        ]
      }
    ]
  },

  faqs: {
    title: 'Retail AI Automation FAQs',
    description: 'Common questions about implementing AI for retail and e-commerce',
    questions: [
      {
        question: 'How do you build a customer 360 across web, stores, and marketplaces?',
        answer: 'We unify identifiers (email, loyalty ID, device, order keys), resolve identities with probabilistic and deterministic rules, and stream events into a governed profile store. Activation goes to CDP destinations, personalization APIs, and analytics—with GDPR/CCPA consent and retention policies enforced by design.'
      },
      {
        question: 'Can personalization respect inventory and margin constraints?',
        answer: 'Yes. Models are trained with business constraints: stock availability, margin floors, category rules, and brand guidelines. Ranking layers blend relevance with commercial objectives so recommendations stay profitable and fulfillable.'
      },
      {
        question: 'What platforms do you integrate with?',
        answer: 'Common integrations include Salesforce Commerce Cloud, Shopify Plus, Adobe Commerce, BigCommerce, SAP Commerce, Snowflake, Databricks, Segment, Braze, Iterable, and major POS/OMS systems. We use APIs, CDC, and batch feeds depending on latency needs.'
      },
      {
        question: 'How long until we see ROI from retail AI?',
        answer: 'Customer 360 and activation pilots often show lift within 8–12 weeks. Personalization at scale typically reaches steady-state ROI in 3–6 months. Forecasting ROI depends on replenishment cadence but frequently appears within one inventory cycle.'
      },
      {
        question: 'How do you protect shopper privacy?',
        answer: 'We implement data minimization, consent management, pseudonymization, encryption in transit and at rest, and role-based access. Pipelines support deletion requests and regional residency. PCI scope is reduced via tokenized payment data where applicable.'
      },
      {
        question: 'Do you offer ongoing model monitoring?',
        answer: 'Yes. We monitor data drift, conversion lift, segment fairness, and guardrail violations. Dashboards tie model metrics to commercial KPIs with scheduled retraining and rollback paths.'
      }
    ]
  },

  differentiators: {
    title: 'Why Choose Innovoco for Retail AI',
    description: 'Proven expertise in customer 360 analytics and personalization',
    columns: 2,
    items: [
      {
        icon: Users,
        title: 'Omnichannel Customer 360',
        description: 'Identity resolution, real-time profiles, and activation across marketing, commerce, and stores—without duplicate silos.',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        metric: '500+ retail profiles unified',
        highlights: []
      },
      {
        icon: Shield,
        title: 'Privacy-First Architecture',
        description: 'GDPR/CCPA-ready pipelines with consent, lineage, and least-privilege access for every downstream consumer.',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        metric: 'SOC 2 aligned delivery',
        highlights: []
      },
      {
        icon: Sparkles,
        title: 'Personalization at Scale',
        description: 'Session-aware ranking, content affinity, and guardrailed merchandising rules tuned to your catalog and margin goals.',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        metric: '35% avg rec CTR lift',
        highlights: []
      },
      {
        icon: LineChart,
        title: 'Forecasting & Pricing',
        description: 'Demand signals, promotion calendars, and elasticity models that connect to replenishment and price execution systems.',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        metric: '20–30% forecast error reduction',
        highlights: []
      }
    ]
  },

  actionCTA: {
    title: 'Ready to Transform Retail with AI?',
    subtitle: 'Choose your next step toward revenue growth',
    footerText: 'Transform omnichannel retail with customer 360, personalization, and forecasting. Contact Innovoco for a tailored roadmap.',
    prioritization: {
      headline: 'Personalization, Demand Forecasting, Customer 360.',
      headlineAccent: 'Which One Lifts Your Revenue First?',
      subline: 'One workshop. Every initiative ranked by ROI.',
      strategic: 'Omnichannel personalization, CDP unification, and demand intelligence at enterprise scale.',
      quickWins: 'Deploy recommendation engines or inventory optimization in 90 days. Measurable revenue lift this quarter.',
      bgImage: '/images/industries/retail/cta-prioritization-bg.jpg',
    },
    cards: [
      {
        icon: Users,
        title: 'Retail Data & CDP Assessment',
        description: '60-minute working session to map sources, identity resolution gaps, and activation use cases for your stack.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        action: 'Book assessment'
      },
      {
        icon: BarChart3,
        title: 'Personalization ROI Model',
        description: 'Scenario modeling for recommendation lift, AOV, and retention based on your traffic and category mix.',
        tag: 'Free tool',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        action: 'Request model'
      },
      {
        icon: ShoppingCart,
        title: 'Commerce AI Office Hours',
        description: 'Monthly session on ranking, search, and generative commerce patterns with solution architects.',
        tag: 'Live',
        gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]',
        action: 'Register'
      }
    ]
  },

  relatedIndustries: [
    {
      icon: HeartPulse,
      title: 'Healthcare',
      description: 'HIPAA-compliant AI automation',
      href: '/solutions/industries/healthcare',
      gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#059669]'
    },
    {
      icon: DollarSign,
      title: 'Financial Services',
      description: 'Fraud detection and risk analytics',
      href: '/solutions/industries/financial-services',
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]'
    },
    {
      icon: HardHat,
      title: 'Construction',
      description: 'Inspection automation and field intelligence',
      href: '/solutions/industries/construction',
      gradient: 'bg-gradient-to-br from-[#CA8A04] to-[#A16207]'
    }
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#A5B4FC]',
      title: 'AI Strategy & Consulting',
      description: 'Retail AI roadmap with customer 360, personalization, and omnichannel strategies.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#A5B4FC]',
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
