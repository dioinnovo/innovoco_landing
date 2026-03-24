import {
  Camera,
  Activity,
  Brain,
  Rocket,
  Database,
  HeartPulse,
  DollarSign,
  ShoppingCart,
  FileCheck,
  Truck,
  Wrench,
  Cloud,
  Shield,
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
    studies: [
      {
        icon: Camera,
        iconGradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        title: 'Roof & Exterior Computer Vision',
        industry: 'Home Services | Roofing',
        challenge: 'Manual photo review slowed estimates and missed subtle hail damage, driving rework and disputes.',
        solution: 'Deployed on-device and cloud CV models scoring damage severity with QA sampling and adjuster-ready overlays.',
        results: [
          { metric: '50%', label: 'Faster inspections' },
          { metric: '99.7%', label: 'Detection accuracy' },
          { metric: '32%', label: 'Dispute reduction', trend: 'down' }
        ]
      },
      {
        icon: FileCheck,
        iconGradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        title: 'Automated Field Reports',
        industry: 'Construction | GC',
        challenge: 'Superintendents spent nights writing daily reports; data was inconsistent across jobsites.',
        solution: 'Voice + photo capture with structured NLP extraction into branded PDFs and ERP work logs.',
        results: [
          { metric: '84%', label: 'Report time ↓', trend: 'down' },
          { metric: '4.2 hrs', label: 'Saved per week' },
          { metric: '100%', label: 'Audit trail' }
        ]
      },
      {
        icon: Activity,
        iconGradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        title: 'HVAC Predictive Maintenance',
        industry: 'Facilities | Multi-site',
        challenge: 'Truck rolls for preventable failures eroded margins; no unified telemetry across brands.',
        solution: 'IoT ingestion, anomaly detection, and technician routing integrated with CMMS and parts inventory.',
        results: [
          { metric: '27%', label: 'Fewer emergency calls', trend: 'down' },
          { metric: '18%', label: 'Parts cost ↓', trend: 'down' },
          { metric: '4.6★', label: 'CSAT maintained' }
        ]
      },
      {
        icon: Truck,
        iconGradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        title: 'Fleet & Jobsite Logistics',
        industry: 'Construction | Civil',
        challenge: 'Dispatch relied on radios and spreadsheets; idle time and fuel waste grew with multi-crew jobs.',
        solution: 'Real-time GPS + job progress signals to recommend crew moves and material drops with constraint solving.',
        results: [
          { metric: '12%', label: 'Fuel reduction', trend: 'down' },
          { metric: '9%', label: 'More jobs / crew' },
          { metric: '$1.1M', label: 'Annual savings' }
        ]
      }
    ]
  },

  faqs: {
    title: 'Construction AI Automation FAQs',
    description: 'Common questions about implementing AI in construction and home services',
    questions: [
      {
        question: 'Can AI work offline on jobsites?',
        answer: 'Yes. We deploy edge models for capture, labeling, and draft reports when connectivity is poor, then sync securely when back online. Conflict resolution and versioning keep field and office aligned.'
      },
      {
        question: 'How do you handle photos and PII?',
        answer: 'Media is encrypted at rest and in transit, access is role-based, and retention policies align with your insurance or franchise requirements. Faces and license plates can be redacted automatically when policies require it.'
      },
      {
        question: 'Will this integrate with our CMMS or ERP?',
        answer: 'We integrate with common CMMS, Procore, Autodesk, ServiceTitan, Salesforce Field Service, and custom ERPs via APIs, webhooks, and managed file drops—matching your change-management process.'
      },
      {
        question: 'What accuracy should we expect for damage detection?',
        answer: 'Pilot phases benchmark against labeled sets and adjuster review. Typical production targets exceed 95% precision on high-severity classes with human-in-the-loop for borderline cases until confidence thresholds are met.'
      },
      {
        question: 'How long is implementation?',
        answer: 'A focused pilot runs 6–10 weeks including data access, model calibration, and technician training. Broader rollout depends on regions and device footprint but often completes within one quarter after pilot sign-off.'
      },
      {
        question: 'Do you support drones or 360 imagery?',
        answer: 'Yes. We ingest orthomosaic, oblique, and interior 360 feeds. Pipelines normalize metadata (camera, altitude, timestamp) so models and reports stay traceable for compliance and warranty.'
      }
    ]
  },

  differentiators: {
    title: 'Why Choose Innovoco for Construction AI',
    description: 'Proven expertise in property inspection automation and predictive maintenance',
    columns: 2,
    items: [
      {
        icon: Camera,
        title: 'Field-Ready Computer Vision',
        description: 'Damage scoring, measurement assists, and QA workflows tuned for adjusters, estimators, and supers.',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        metric: '99.7% model precision targets',
        highlights: []
      },
      {
        icon: Shield,
        title: 'Secure Ops & Compliance',
        description: 'Encryption, least-privilege access, and audit trails designed for insurers, owners, and regulated owners.',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        metric: 'SOC 2 aligned practices',
        highlights: []
      },
      {
        icon: Wrench,
        title: 'OT-Friendly Integrations',
        description: 'MQTT/OPC where needed, plus REST to CMMS/ERP—so insights reach dispatch, not just dashboards.',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        metric: '50+ connector patterns',
        highlights: []
      },
      {
        icon: Cloud,
        title: 'Weather & Risk Signals',
        description: 'Blend NOAA and proprietary peril feeds with asset location for triage after storms.',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        metric: 'Faster CAT response',
        highlights: []
      }
    ]
  },

  actionCTA: {
    title: 'Ready to Transform Construction with AI?',
    subtitle: 'Choose your next step toward operational excellence',
    footerText: 'Modernize inspections, reporting, and maintenance with AI built for the field. Contact Innovoco for a customized rollout plan.',
    cards: [
      {
        icon: Camera,
        title: 'Jobsite Vision Assessment',
        description: 'Complimentary review of your photo workflows, labeling needs, and model guardrails.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        action: 'Schedule review'
      },
      {
        icon: FileCheck,
        title: 'Report Automation Blueprint',
        description: 'Template mapping from voice/photo capture to branded outputs and ERP lines.',
        tag: 'Workshop',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        action: 'Book workshop'
      },
      {
        icon: Activity,
        title: 'Predictive Maintenance Quickstart',
        description: 'Telemetry audit plus anomaly detection POC on one equipment class or region.',
        tag: 'POC',
        gradient: 'bg-gradient-to-br from-[#FEF3C7] to-[#CA8A04]',
        action: 'Start POC'
      }
    ]
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
      icon: ShoppingCart,
      title: 'Retail',
      description: 'Customer 360 and personalization',
      href: '/solutions/industries/retail',
      gradient: 'bg-gradient-to-br from-[#EEF2FF] to-[#6366F1]'
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
