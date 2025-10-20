import {
  DollarSign, Shield, TrendingUp, Activity, AlertTriangle,
  BarChart3, Lock, Brain, Rocket, Database, HeartPulse,
  Factory, ShoppingCart, HardHat
} from 'lucide-react';
import { IndustryConfig } from './types';

export const financialServicesConfig: IndustryConfig = {
  // SEO & Metadata
  metadata: {
    title: 'Financial Services AI | Fraud Detection & Risk Analytics',
    description: 'Real-time fraud detection AI, risk analytics, and regulatory compliance solutions for banks and financial institutions. $50M+ in fraud savings delivered.',
    keywords: 'financial services AI, fraud detection, risk analytics, banking automation, regulatory compliance, algorithmic trading',
    url: 'https://innovoco.com/solutions/industries/financial-services',
  },

  // Hero Section
  hero: {
    badge: '$50M+ Fraud Savings Delivered',
    title: 'Financial Services AI Automation & Analytics',
    subtitle: 'Real-Time Fraud Detection, Risk Analytics & Regulatory Compliance',
    description: 'Transform financial operations with real-time fraud detection automation, advanced risk analytics, and AI-powered compliance solutions. From detecting fraudulent transactions in <100ms to reducing false positives by 80%, our solutions deliver measurable ROI while maintaining regulatory compliance.',
    trustIndicators: [
      { metric: '$50M+', label: 'Fraud Savings Delivered' },
      { metric: '95%+', label: 'Fraud Detection Rate' },
      { metric: '<100ms', label: 'Transaction Scoring' },
      { metric: '80%', label: 'False Positive Reduction' }
    ],
    primaryCTAText: 'Schedule Compliance Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#D1FAE5] via-[#DBEAFE] to-[#EDE9FE]'
  },

  // Section CTAs (strategic placement)
  sectionCTAs: {
    afterMainContent: {
      title: 'Schedule Your Financial Services AI Assessment',
      subtitle: 'SOC 2 compliant | 30-minute consultation | No obligation',
      buttonText: 'Book Your Assessment'
    },
    afterCaseStudies: {
      title: 'See How We Can Transform Your Financial Operations',
      subtitle: 'Join banks and financial institutions preventing $50M+ in fraud annually',
      buttonText: 'Start Your Transformation'
    },
    afterFAQs: {
      title: 'Still Have Questions? Let\'s Talk',
      subtitle: 'Speak with a financial services AI specialist about your compliance needs',
      buttonText: 'Schedule a Call'
    },
    afterDifferentiators: {
      title: 'Partner With Financial Services AI Experts',
      subtitle: '10+ years financial services experience | SOC 2 & PCI-DSS certified',
      buttonText: 'Get Started Today'
    }
  },

  // Case Studies
  caseStudies: {
    badge: 'Proven Results',
    title: 'Financial Services AI Success Stories',
    description: 'Real-world results from banks and financial institutions who\'ve transformed fraud detection and risk analytics with AI',
    studies: [
      {
        icon: AlertTriangle,
        iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        title: 'Regional Bank Real-Time Fraud Detection',
        industry: 'Financial Services | Regional Bank',
        challenge: '$25M annual fraud losses across credit card, ACH, and wire transactions. Existing rules-based system had 65% false positive rate causing customer friction.',
        solution: 'Deployed ML-powered real-time fraud detection analyzing payment patterns, merchant categories, geographic anomalies, and behavioral biometrics. Sub-100ms transaction scoring with continuous model retraining.',
        results: [
          { metric: '$18M', label: 'Annual Fraud Savings' },
          { metric: '95%+', label: 'Fraud Detection Rate' },
          { metric: '80%', label: 'False Positive Reduction', trend: 'down' }
        ]
      },
      {
        icon: BarChart3,
        iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        title: 'Alternative Credit Scoring for Fintech',
        industry: 'Financial Services | Digital Lending',
        challenge: 'Fintech lender missing opportunities to serve underbanked populations with thin credit files. Traditional FICO scores rejecting 40% of applicants who could safely receive credit.',
        solution: 'Built alternative credit risk model incorporating utility payments, rent history, bank transaction cash flow, education, and employment. Fair Lending compliance with ECOA and disparate impact testing.',
        results: [
          { metric: '25%', label: 'Approval Rate Increase', trend: 'up' },
          { metric: '5%', label: 'Default Rate (vs 6.5% industry)' },
          { metric: '100%', label: 'ECOA Compliant' }
        ]
      },
      {
        icon: Activity,
        iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        title: 'Algorithmic Trading Sentiment Analysis',
        industry: 'Financial Services | Hedge Fund',
        challenge: 'Quantitative hedge fund seeking alpha-generating signals from alternative data. Manual analysis of news and earnings calls too slow for short-term trading strategies.',
        solution: 'Implemented NLP-powered sentiment analysis platform processing 10K+ daily news articles, earnings call transcripts, and social media. Real-time sentiment scoring integrated with trading algorithms.',
        results: [
          { metric: '3.2%', label: 'Alpha Generation (annualized)' },
          { metric: '10K+', label: 'Daily Articles Processed' },
          { metric: '<5min', label: 'Signal Latency' }
        ]
      },
      {
        icon: Shield,
        iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        title: 'AML Transaction Monitoring System',
        industry: 'Financial Services | Commercial Bank',
        challenge: 'Bank facing $500K annual false positive investigation costs from legacy rule-based AML system. 95% of Suspicious Activity Reports (SARs) filed were false positives.',
        solution: 'Deployed hybrid rule-based + ML AML monitoring detecting structuring, smurfing, and money laundering patterns. Automated high-quality SAR generation for BSA/FinCEN compliance.',
        results: [
          { metric: '70%', label: 'False Positive Reduction', trend: 'down' },
          { metric: '$350K', label: 'Annual Cost Savings' },
          { metric: '100%', label: 'BSA/FinCEN Compliant' }
        ]
      }
    ]
  },

  // FAQs
  faqs: {
    title: 'Financial Services AI Automation FAQs',
    description: 'Common questions about implementing AI automation and analytics in financial services',
    questions: [
      {
        question: 'How do you ensure SOC 2 and PCI-DSS compliance in financial AI solutions?',
        answer: 'Our financial services AI solutions are built with SOC 2 Type II and PCI-DSS Level 1 compliance from the ground up. We implement all required controls including AES-256 encryption at rest, TLS 1.3 for data in transit, comprehensive audit logging, role-based access controls (RBAC), and secure key management. We execute Business Associate Agreements with all cloud providers (AWS, Azure, GCP) and maintain annual SOC 2 audits. For payment card data, we implement PCI-DSS requirements including network segmentation, tokenization, and quarterly vulnerability scanning. Our compliance specialists work alongside engineers to ensure every solution meets regulatory requirements before deployment.'
      },
      {
        question: 'What core banking systems do you integrate with?',
        answer: 'We have deep integration experience with major core banking platforms including FIS (Systematics, Profile, Horizon), Temenos (T24, Transact), Jack Henry (Symitar, Episys, Silverlake), Fiserv (DNA, Premier, Signature), and Oracle FLEXCUBE. Our integrations leverage native APIs, SOAP/REST web services, batch file processing (ACH, BAI2, MT940), and real-time messaging. We understand the data models, transaction flows, and security requirements of each platform, enabling us to build AI solutions that integrate with existing systems without disrupting banking operations or customer experiences.'
      },
      {
        question: 'What is the typical ROI timeline for fraud detection AI?',
        answer: 'Fraud detection ROI is typically realized within 6-9 months of deployment. Initial proof of concept (4-6 weeks) validates detection accuracy on historical fraud data. Production deployment (12-16 weeks) includes model training, integration with payment systems, and compliance validation. Most banks see measurable fraud reduction within the first quarter of operation: 40-60% reduction in fraud losses, 70-80% decrease in false positives, and <100ms transaction scoring latency. We provide detailed ROI modeling during discovery based on your annual fraud losses, transaction volume, and current false positive rates to project specific savings.'
      },
      {
        question: 'How do you handle sensitive financial data in AI model training?',
        answer: 'We employ multiple strategies for secure financial data handling. For fraud detection, we use federated learning allowing models to train on distributed datasets without centralizing sensitive transaction data. For credit modeling, we implement differential privacy adding statistical noise to protect individual privacy. We de-identify personally identifiable information (PII) per GLBA requirements and use secure enclaves for sensitive processing. All training data is encrypted, access is logged with SOC 2 audit trails, and data governance policies enforce minimum necessary access. Models are tested for privacy leakage before deployment and validated for fair lending compliance (no disparate impact).'
      },
      {
        question: 'Can AI improve both fraud detection and customer experience?',
        answer: 'Absolutely. Traditional rule-based fraud systems generate excessive false positives (60-80%), causing customer friction from declined legitimate transactions. Our ML-powered fraud detection achieves 95%+ accuracy with 70-80% fewer false positives. This means fewer legitimate transactions blocked, reduced customer service calls, and improved customer satisfaction. Behavioral biometrics and device fingerprinting enable frictionless authentication for trusted users while flagging anomalous activity. Dynamic risk scoring adjusts fraud controls in real-time: low-risk transactions proceed instantly, high-risk transactions receive additional verification. The result is both reduced fraud AND better customer experiences.'
      },
      {
        question: 'What regulatory compliance do your financial AI solutions maintain?',
        answer: 'Our financial AI solutions are designed to meet comprehensive regulatory requirements. For data security: SOC 2 Type II, PCI-DSS Level 1, and GLBA privacy safeguards. For lending AI: ECOA (Equal Credit Opportunity Act), Fair Housing Act, and Fair Lending compliance with disparate impact testing. For banking operations: Bank Secrecy Act (BSA), FinCEN AML requirements, and OFAC sanctions screening. For model risk: SR 11-7 model governance including model validation, documentation, and ongoing monitoring. For capital markets: SEC and FINRA compliance for algorithmic trading systems. We provide compliance documentation, audit support, and regulatory examination assistance.'
      },
      {
        question: 'How do you validate AI models for regulatory compliance (SR 11-7)?',
        answer: 'We follow Federal Reserve SR 11-7 guidance for model risk management throughout the AI lifecycle. Model development includes comprehensive documentation: business justification, data sources, feature engineering, algorithm selection, and validation methodology. Independent model validation assesses accuracy, stability, robustness to stress scenarios, and conceptual soundness. We test for bias and fair lending compliance using disparate impact analysis. Ongoing monitoring tracks model performance metrics, data drift, and prediction accuracy with automated alerting for degradation. Quarterly model performance reports and annual comprehensive reviews ensure continued compliance. We provide all documentation required for regulatory examinations and internal audit reviews.'
      },
      {
        question: 'Do you provide ongoing model monitoring and retraining for financial AI?',
        answer: 'Yes, continuous monitoring and retraining are critical for financial AI. Our managed AI services include 24/7 monitoring of model performance (accuracy, precision, recall, AUC), real-time alerting for model drift or data quality issues, and automated retraining pipelines when performance thresholds are breached. For fraud detection, we monitor fraud pattern evolution and retrain models as attack tactics change. For credit models, we track economic conditions and update models for changing risk profiles. For algorithmic trading, we monitor market regime changes and strategy performance. We provide monthly performance reports, quarterly business reviews, SR 11-7 compliant documentation, and SLA-backed support ensuring your AI continues delivering value as financial markets and fraud tactics evolve.'
      }
    ]
  },

  // Differentiators
  differentiators: {
    title: 'Why Choose Innovoco for Financial Services AI',
    description: 'Proven expertise in SOC 2 and PCI-DSS compliant AI solutions for banks and financial institutions',
    columns: 2,
    items: [
      {
        icon: Shield,
        title: 'SOC 2 & PCI-DSS Expertise',
        description: 'Deep expertise in SOC 2 Type II and PCI-DSS Level 1 compliance. Our security specialists ensure every AI solution meets financial services regulatory requirements from design through deployment.',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        metric: '100% Compliant Deployments',
        highlights: [
          'SOC 2 Type II annual audits with all cloud providers',
          'PCI-DSS Level 1 certified payment data security',
          'Comprehensive audit logging with real-time breach detection',
          'Support for regulatory examinations (OCC, FDIC, Fed)'
        ]
      },
      {
        icon: BarChart3,
        title: 'Core Banking Integration',
        description: 'Seamless integration with FIS, Temenos, Jack Henry, Fiserv, and Oracle core banking systems. We understand data models, transaction flows, and API requirements of each platform.',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        metric: '100+ Banking Integrations',
        highlights: [
          'Native API integration with major core banking platforms',
          'Real-time transaction data streaming for fraud detection',
          'Minimal disruption to existing banking operations',
          'Support for custom core configurations and extensions'
        ]
      },
      {
        icon: DollarSign,
        title: 'Fraud Detection Excellence',
        description: 'AI solutions designed to maximize fraud detection while minimizing false positives. We measure success through fraud savings, detection rates, and customer satisfaction.',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        metric: '$50M+ Fraud Savings Delivered',
        highlights: [
          '95%+ fraud detection accuracy',
          '70-80% reduction in false positive rates',
          'Sub-100ms real-time transaction scoring',
          'Continuous model retraining as fraud tactics evolve'
        ]
      },
      {
        icon: Lock,
        title: 'Financial Regulatory Knowledge',
        description: 'Navigate complex financial regulations including BSA, GLBA, ECOA, Fair Lending, SR 11-7 model governance, and SEC/FINRA requirements for algorithmic trading.',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        metric: '10+ Years Financial Services',
        highlights: [
          'SR 11-7 compliant model governance and documentation',
          'Fair Lending compliance with disparate impact testing',
          'BSA/FinCEN AML and OFAC sanctions screening',
          'SEC/FINRA compliance for algorithmic trading systems'
        ]
      }
    ]
  },

  // Action CTA
  actionCTA: {
    title: 'Ready to Transform Financial Services with AI?',
    subtitle: 'Choose your next step to get started with SOC 2 and PCI-DSS compliant AI automation',
    cards: [
      {
        icon: Shield,
        title: 'Compliance Assessment',
        description: 'Free 60-minute consultation to review your current compliance posture and discuss SOC 2/PCI-DSS compliant AI solutions for your financial institution.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        action: 'Schedule Assessment'
      },
      {
        icon: DollarSign,
        title: 'Fraud Detection ROI Calculator',
        description: 'Calculate potential ROI for fraud detection AI in your institution. Includes fraud savings, false positive reduction, and operational efficiency metrics.',
        tag: 'Free Tool',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        action: 'Get ROI Calculator'
      },
      {
        icon: BarChart3,
        title: 'Financial Services AI Webinar',
        description: 'Join our quarterly webinar showcasing latest AI innovations for financial services: fraud detection, credit risk modeling, and algorithmic trading.',
        tag: 'Register Now',
        gradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
        action: 'Register for Webinar'
      }
    ],
    footerText: 'Transform financial operations with SOC 2 and PCI-DSS compliant AI automation. Contact Innovoco today to receive a customized roadmap for AI transformation in your financial institution.'
  },

  // Related Industries
  relatedIndustries: [
    {
      icon: HeartPulse,
      title: 'Healthcare & Life Sciences',
      description: 'HIPAA-compliant AI automation for clinical decision support, predictive analytics, and medical imaging.',
      href: '/solutions/industries/healthcare',
      gradient: 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C]',
      metrics: [
        { value: '25%', label: 'Readmission Reduction' },
        { value: '90%+', label: 'Diagnostic Accuracy' },
        { value: '100%', label: 'HIPAA Compliant' }
      ]
    },
    {
      icon: Factory,
      title: 'Manufacturing & Industrial',
      description: 'Industry 4.0 intelligent automation, predictive maintenance, and supply chain optimization.',
      href: '/solutions/industries/manufacturing',
      gradient: 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]',
      metrics: [
        { value: '30-50%', label: 'Downtime Reduction' },
        { value: '99%+', label: 'Defect Detection' },
        { value: '15%', label: 'OEE Increase' }
      ]
    },
    {
      icon: ShoppingCart,
      title: 'Retail & E-Commerce',
      description: 'Customer 360 analytics, AI personalization, demand forecasting, and dynamic pricing automation.',
      href: '/solutions/industries/retail',
      gradient: 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]',
      metrics: [
        { value: '28%', label: 'Avg Revenue Increase' },
        { value: '15-25%', label: 'Conversion Lift' },
        { value: '35%', label: 'Recommendation CTR' }
      ]
    }
  ],

  // Related Services
  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]',
      title: 'AI Strategy & Consulting',
      description: 'Financial services AI roadmap with regulatory compliance and risk management focus.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy compliant AI solutions for banking, insurance, and financial services.',
      href: '/services/ai-implementation'
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build secure data infrastructure meeting SOC 2, PCI-DSS, and regulatory requirements.',
      href: '/services/data-engineering-modernization'
    }
  ],

  // Breadcrumbs
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Financial Services', href: '/solutions/industries/financial-services' }
  ]
};
