import {
  Factory, Settings, Cog, TrendingUp, Activity, Shield, Award,
  Brain, Rocket, Database, HeartPulse, DollarSign, ShoppingCart, HardHat
} from 'lucide-react';
import { IndustryConfig } from './types';

export const manufacturingConfig: IndustryConfig = {
  metadata: {
    title: 'Manufacturing AI | Predictive Maintenance & Quality Control',
    description: 'Industry 4.0 intelligent automation: predictive maintenance, quality control AI, and supply chain optimization for manufacturing excellence.',
    keywords: 'manufacturing AI, Industry 4.0, predictive maintenance, quality control, IoT, supply chain optimization',
    url: 'https://innovoco.com/solutions/industries/manufacturing',
  },

  hero: {
    badge: 'Industry 4.0 Excellence',
    title: 'Manufacturing AI Automation & Analytics Solutions',
    subtitle: 'Predictive Maintenance, Quality Control & Supply Chain Optimization',
    description: 'Transform manufacturing operations with Industry 4.0 AI automation. From predictive maintenance reducing downtime 30-50% to computer vision quality control achieving 99%+ defect detection, our solutions drive operational excellence and competitive advantage.',
    trustIndicators: [
      { metric: '30-50%', label: 'Downtime Reduction' },
      { metric: '99%+', label: 'Defect Detection' },
      { metric: '15-25%', label: 'Forecast Improvement' },
      { metric: '15%', label: 'OEE Increase' }
    ],
    primaryCTAText: 'Schedule Manufacturing AI Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#EDE9FE] via-[#FECACA] to-[#FED7AA]'
  },

  sectionCTAs: {
    afterMainContent: {
      title: 'Transform Your Manufacturing Operations',
      subtitle: 'Industry 4.0 ready | 30-minute consultation | No obligation',
      buttonText: 'Schedule Assessment'
    },
    afterCaseStudies: {
      title: 'Reduce Downtime and Increase Quality',
      subtitle: 'Join manufacturers achieving 30-50% downtime reduction with AI',
      buttonText: 'Get Started'
    },
    afterFAQs: {
      title: 'Ready to Discuss Your Manufacturing Needs?',
      subtitle: 'Speak with an Industry 4.0 specialist about your specific challenges',
      buttonText: 'Book Consultation'
    },
    afterDifferentiators: {
      title: 'Partner With Manufacturing AI Experts',
      subtitle: '10+ years manufacturing experience | Proven ROI',
      buttonText: 'Start Your Journey'
    }
  },

  caseStudies: {
    badge: 'Proven Results',
    title: 'Manufacturing AI Success Stories',
    description: 'Real-world results from manufacturers who have transformed operations with predictive maintenance and quality control AI',
    studies: [
      {
        icon: Settings,
        iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        title: 'Predictive Maintenance for Automotive Manufacturer',
        industry: 'Manufacturing | Automotive',
        challenge: 'Unplanned equipment failures causing $5M+ annual production losses. Average downtime of 48 hours per failure affecting delivery schedules.',
        solution: 'Deployed IoT sensors and ML models analyzing vibration, temperature, and acoustic signatures. Predictive alerts 7-14 days before equipment failure enable proactive maintenance.',
        results: [
          { metric: '45%', label: 'Downtime Reduction', trend: 'down' },
          { metric: '$3.5M', label: 'Annual Savings' },
          { metric: '92%', label: 'Prediction Accuracy' }
        ]
      },
      {
        icon: Activity,
        iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        title: 'Computer Vision Quality Control',
        industry: 'Manufacturing | Electronics',
        challenge: 'Manual visual inspection missing 15% of defects. High false positive rate (30%) causing unnecessary waste and rework costs.',
        solution: 'Implemented computer vision system for PCB inspection. Deep learning models detect surface defects, component placement errors, and soldering issues at 10x speed of manual inspection.',
        results: [
          { metric: '99.5%', label: 'Defect Detection Rate' },
          { metric: '85%', label: 'Inspection Time Reduction', trend: 'down' },
          { metric: '$2M', label: 'Annual Quality Savings' }
        ]
      },
      {
        icon: TrendingUp,
        iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        title: 'Supply Chain Demand Forecasting',
        industry: 'Manufacturing | Consumer Goods',
        challenge: 'Forecast error of 35% causing $8M inventory carrying costs and frequent stockouts affecting customer satisfaction.',
        solution: 'Built ML-powered demand forecasting combining historical sales, seasonality, promotions, weather, and economic indicators. Automated replenishment with supplier integration.',
        results: [
          { metric: '22%', label: 'Forecast Error Reduction', trend: 'down' },
          { metric: '$4.5M', label: 'Inventory Cost Savings' },
          { metric: '40%', label: 'Stockout Reduction', trend: 'down' }
        ]
      },
      {
        icon: Cog,
        iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        title: 'OEE Optimization for Pharmaceutical Manufacturing',
        industry: 'Manufacturing | Pharmaceutical',
        challenge: 'Overall Equipment Effectiveness (OEE) of 65% (below industry target of 85%). Production losses from availability, performance, and quality issues.',
        solution: 'Deployed real-time OEE monitoring with root cause analysis. ML models identify patterns in downtime, speed losses, and quality defects triggering automated alerts and recommendations.',
        results: [
          { metric: '80%', label: 'OEE Achievement', trend: 'up' },
          { metric: '23%', label: 'Throughput Increase', trend: 'up' },
          { metric: '$6M', label: 'Annual Production Value Gain' }
        ]
      }
    ]
  },

  faqs: {
    title: 'Manufacturing AI Automation FAQs',
    description: 'Common questions about implementing Industry 4.0 AI and IoT solutions in manufacturing',
    questions: [
      {
        question: 'How does predictive maintenance reduce downtime?',
        answer: 'Predictive maintenance uses IoT sensors and ML algorithms to monitor equipment health in real-time. By analyzing vibration patterns, temperature anomalies, acoustic signatures, and historical failure data, our systems predict equipment failures 7-14 days in advance with 85-95% accuracy. This enables proactive maintenance scheduling during planned downtime instead of reactive repairs during unplanned outages. Manufacturers typically see 30-50% reduction in unplanned downtime, 20-25% maintenance cost savings, and 10-15% increase in equipment lifespan.'
      },
      {
        question: 'What equipment and systems do you integrate with?',
        answer: 'We integrate with major manufacturing systems including PLCs (Siemens, Allen-Bradley, Schneider), SCADA systems, MES platforms (SAP ME, Oracle MES, Dassault DELMIA), and ERP systems (SAP, Oracle, Microsoft Dynamics). For IoT connectivity, we support industrial protocols like OPC UA, MQTT, Modbus, and proprietary vendor APIs. Our solutions work with existing equipment through retrofitted sensors or leverage built-in IoT capabilities in modern machinery. We ensure secure OT/IT integration with proper network segmentation and industrial cybersecurity best practices.'
      },
      {
        question: 'What is the ROI timeline for manufacturing AI?',
        answer: 'ROI timelines vary by use case. Predictive maintenance typically shows ROI in 6-12 months through reduced unplanned downtime and maintenance cost savings. Computer vision quality control delivers ROI in 3-6 months via reduced scrap, rework, and warranty costs. Demand forecasting achieves ROI in 4-8 months through inventory optimization and improved customer service levels. OEE optimization sees value in 8-14 months through increased throughput and reduced losses. We provide detailed ROI modeling during assessment based on your baseline metrics, equipment criticality, production volume, and downtime costs.'
      },
      {
        question: 'How do you ensure production data security?',
        answer: 'Manufacturing data security requires protecting both OT (operational technology) and IT systems. We implement defense-in-depth strategies including network segmentation isolating OT from corporate networks, encrypted data transmission (TLS 1.3), secure cloud connectivity with private links, role-based access controls, and continuous security monitoring. For regulated industries (pharma, aerospace, defense), we support compliance requirements including 21 CFR Part 11, ITAR, and CMMC. All data handling follows ISA/IEC 62443 industrial cybersecurity standards with regular penetration testing and vulnerability assessments.'
      },
      {
        question: 'Can AI work with legacy manufacturing equipment?',
        answer: 'Yes, AI solutions work with both modern and legacy equipment. For older machinery lacking built-in sensors, we retrofit wireless IoT sensors for vibration, temperature, pressure, and acoustic monitoring without modifying equipment. These sensors integrate via industrial gateways supporting OPC UA or MQTT protocols. For equipment with limited connectivity, we implement edge computing devices performing local analytics before transmitting insights to cloud platforms. Many manufacturers run hybrid environments combining legacy equipment retrofits with native IoT capabilities from newer machines, all feeding into unified AI platforms for predictive maintenance and quality control.'
      },
      {
        question: 'What manufacturing industries do you serve?',
        answer: 'We serve discrete manufacturing (automotive, aerospace, electronics, machinery) and process manufacturing (chemicals, pharma, food & beverage, oil & gas). Each industry has unique requirements: automotive needs high-volume quality control, pharma requires 21 CFR Part 11 compliance, food & beverage demands HACCP compliance, and aerospace requires traceability and ITAR compliance. Our solutions adapt to industry-specific regulations, equipment types, production processes, and quality standards. We have deep experience with job shops, batch production, continuous processing, and assembly line operations across various manufacturing environments.'
      },
      {
        question: 'How do you handle model updates without disrupting production?',
        answer: 'Manufacturing AI requires careful deployment to avoid production disruptions. We use shadow mode deployment where new models run in parallel with existing systems, generating predictions without affecting operations. After validation showing >95% accuracy, we implement A/B testing gradually routing production traffic to updated models. For critical systems like predictive maintenance, we maintain model versioning with instant rollback capability if issues arise. Updates occur during scheduled maintenance windows or low-production periods. All changes follow change management protocols with approval workflows, testing documentation, and communication to operations teams. Our managed services include 24/7 monitoring ensuring production continuity.'
      },
      {
        question: 'Do you provide ongoing support and optimization?',
        answer: 'Yes, manufacturing AI requires continuous optimization as production conditions evolve. Our managed services include 24/7 system monitoring, model performance tracking, automated retraining when accuracy degrades, and quarterly optimization reviews identifying improvement opportunities. For predictive maintenance, we refine models as new failure modes emerge. For quality control, we update models when product specifications change. For demand forecasting, we adapt to market shifts and new product launches. Support includes dedicated manufacturing AI engineers, remote system access for troubleshooting, on-site visits for major changes, and SLA-backed response times ensuring minimal production impact.'
      }
    ]
  },

  differentiators: {
    title: 'Why Choose Innovoco for Manufacturing AI',
    description: 'Proven expertise in Industry 4.0 intelligent automation and IoT solutions',
    columns: 2,
    items: [
      {
        icon: Settings,
        title: 'Industry 4.0 Expertise',
        description: 'Deep experience implementing smart manufacturing solutions with IoT, AI, and edge computing. We understand production environments, equipment interfaces, and operational constraints.',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        metric: '100+ Manufacturing Implementations',
        highlights: [
          'OT/IT integration with secure network architecture',
          'Experience with PLCs, SCADA, MES, and ERP systems',
          'Edge computing for real-time analytics',
          'Support for both discrete and process manufacturing'
        ]
      },
      {
        icon: Shield,
        title: 'Industrial Cybersecurity',
        description: 'Comprehensive OT security following ISA/IEC 62443 standards. Network segmentation, encrypted communication, and continuous monitoring protect production systems.',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        metric: 'ISA/IEC 62443 Compliant',
        highlights: [
          'Defense-in-depth OT security architecture',
          'Network segmentation isolating production systems',
          'Regular penetration testing and vulnerability scans',
          'Support for regulated industries (pharma, aerospace)'
        ]
      },
      {
        icon: Activity,
        title: 'Predictive Maintenance Focus',
        description: 'Specialized in equipment health monitoring and failure prediction. Our solutions reduce unplanned downtime 30-50% while extending equipment life 10-15%.',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        metric: '30-50% Downtime Reduction',
        highlights: [
          '85-95% accuracy in failure prediction',
          '7-14 day advance warning for proactive maintenance',
          'Integration with CMMS and work order systems',
          'ROI typically achieved within 6-12 months'
        ]
      },
      {
        icon: Award,
        title: 'Operational Excellence Results',
        description: 'Track record of measurable OEE improvements, quality gains, and cost reductions. We focus on production metrics that matter: throughput, yield, and total cost.',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        metric: '15% Avg OEE Improvement',
        highlights: [
          '99%+ quality detection rates with computer vision',
          '15-25% improvement in demand forecast accuracy',
          '20-30% reduction in inventory carrying costs',
          'Detailed ROI modeling and performance tracking'
        ]
      }
    ]
  },

  actionCTA: {
    title: 'Ready to Transform Manufacturing with AI?',
    subtitle: 'Choose your next step toward Industry 4.0 excellence',
    cards: [
      {
        icon: Settings,
        title: 'Manufacturing AI Assessment',
        description: 'Free 60-minute consultation to evaluate your production systems and identify high-ROI opportunities for predictive maintenance and quality control AI.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        action: 'Schedule Assessment'
      },
      {
        icon: TrendingUp,
        title: 'OEE Improvement Calculator',
        description: 'Calculate potential ROI from AI-powered predictive maintenance, quality control, and supply chain optimization. Get custom projections based on your operations.',
        tag: 'Free Tool',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        action: 'Get Calculator'
      },
      {
        icon: Factory,
        title: 'Industry 4.0 Workshop',
        description: 'Join our quarterly workshop on smart manufacturing trends: IoT integration, predictive maintenance strategies, and quality control automation.',
        tag: 'Register Now',
        gradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
        action: 'Register'
      }
    ],
    footerText: 'Transform manufacturing operations with Industry 4.0 AI automation. Contact Innovoco to receive a customized roadmap for predictive maintenance and quality control excellence.'
  },

  relatedIndustries: [
    {
      icon: HeartPulse,
      title: 'Healthcare & Life Sciences',
      description: 'HIPAA-compliant AI for clinical decision support and predictive patient analytics.',
      href: '/solutions/industries/healthcare',
      gradient: 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C]',
      metrics: [
        { value: '25%', label: 'Readmission Reduction' },
        { value: '90%+', label: 'Diagnostic Accuracy' },
        { value: '100%', label: 'HIPAA Compliant' }
      ]
    },
    {
      icon: DollarSign,
      title: 'Financial Services',
      description: 'Real-time fraud detection, risk analytics, and regulatory compliance solutions.',
      href: '/solutions/industries/financial-services',
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
      metrics: [
        { value: '$50M+', label: 'Fraud Savings' },
        { value: '95%+', label: 'Detection Rate' },
        { value: '<100ms', label: 'Transaction Scoring' }
      ]
    },
    {
      icon: ShoppingCart,
      title: 'Retail & E-Commerce',
      description: 'Customer 360 analytics, AI personalization, and demand forecasting.',
      href: '/solutions/industries/retail',
      gradient: 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]',
      metrics: [
        { value: '28%', label: 'Revenue Increase' },
        { value: '15-25%', label: 'Conversion Lift' },
        { value: '35%', label: 'Recommendation CTR' }
      ]
    }
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]',
      title: 'AI Strategy & Consulting',
      description: 'Industry 4.0 roadmap with IoT integration and predictive maintenance strategies.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy production-ready AI for predictive maintenance, quality control, and optimization.',
      href: '/services/ai-implementation'
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build IoT data infrastructure for real-time manufacturing intelligence.',
      href: '/services/data-engineering-modernization'
    }
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Manufacturing', href: '/solutions/industries/manufacturing' }
  ]
};
