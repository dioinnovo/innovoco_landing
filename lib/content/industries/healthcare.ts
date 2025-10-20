import {
  HeartPulse, Shield, Activity, Network, Award, TrendingDown, TrendingUp,
  Target, Calendar, Download, Brain, Rocket, Database, TrendingUp as TrendingUpAlt,
  Factory, ShoppingCart, HardHat
} from 'lucide-react';
import { IndustryConfig } from './types';

export const healthcareConfig: IndustryConfig = {
  // SEO & Metadata
  metadata: {
    title: 'Healthcare AI | HIPAA-Compliant Automation & Analytics',
    description: 'HIPAA-compliant AI automation and analytics for healthcare providers. Clinical decision support, predictive patient analytics, and medical imaging AI to improve patient outcomes.',
    keywords: 'healthcare AI, HIPAA compliance, clinical decision support, medical imaging AI, predictive analytics, EHR integration',
    url: 'https://innovoco.com/solutions/industries/healthcare',
  },

  // Hero Section
  hero: {
    badge: '100+ Healthcare Clients',
    title: 'Healthcare AI Automation & Analytics Solutions',
    subtitle: 'HIPAA-Compliant Intelligent Automation for Better Patient Outcomes',
    description: 'Transform patient care with AI-powered clinical decision support, predictive analytics, and intelligent automation designed specifically for healthcare providers. From reducing readmissions to improving diagnostic accuracy, our HIPAA-compliant solutions deliver measurable improvements in both clinical and operational outcomes.',
    trustIndicators: [
      { metric: '100+', label: 'Healthcare Clients' },
      { metric: '25%', label: 'Avg Readmission Reduction' },
      { metric: '90%+', label: 'Diagnostic Accuracy' },
      { metric: '100%', label: 'HIPAA Compliant' }
    ],
    primaryCTAText: 'Schedule HIPAA Compliance Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#FECACA] via-[#FED7AA] to-[#FEF3C7]'
  },

  // Section CTAs
  sectionCTAs: {
    afterMainContent: {
      title: 'Schedule Your Healthcare AI Assessment',
      subtitle: 'HIPAA-compliant | 30-minute consultation | No obligation',
      buttonText: 'Book Your Assessment'
    },
    afterCaseStudies: {
      title: 'See How We Can Help Your Organization',
      subtitle: 'Join 100+ healthcare providers transforming patient care with AI',
      buttonText: 'Start Your Transformation'
    },
    afterFAQs: {
      title: 'Still Have Questions? Let\'s Talk',
      subtitle: 'Speak with a healthcare AI specialist about your specific needs',
      buttonText: 'Schedule a Call'
    },
    afterDifferentiators: {
      title: 'Partner With Healthcare AI Experts',
      subtitle: '10+ years healthcare experience | HIPAA compliance guaranteed',
      buttonText: 'Get Started Today'
    }
  },

  // Case Studies
  caseStudies: {
    badge: 'Proven Results',
    title: 'Healthcare AI Success Stories',
    description: 'Real-world results from healthcare providers who\'ve transformed patient outcomes and operational efficiency with HIPAA-compliant AI solutions',
    studies: [
      {
        icon: TrendingDown,
        iconGradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        title: 'Regional Hospital Network Readmission Reduction',
        industry: 'Healthcare | Multi-Hospital System',
        challenge: '15-hospital network facing $2.3M annual penalties from CMS for excessive 30-day readmissions, particularly in CHF and COPD patients.',
        solution: 'Deployed ML-powered readmission risk stratification integrated with Epic EHR. Real-time scoring at discharge identifies high-risk patients (75-85% accuracy) triggering automated care coordination workflows.',
        results: [
          { metric: '25%', label: 'Readmission Reduction', trend: 'down' },
          { metric: '$1.8M', label: 'Annual Penalty Savings' },
          { metric: '100%', label: 'HIPAA Compliant' }
        ]
      },
      {
        icon: Activity,
        iconGradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        title: 'Medical Imaging AI for Academic Medical Center',
        industry: 'Healthcare | Academic Medical Center',
        challenge: 'Radiology department overwhelmed with 500+ daily imaging studies. Average turnaround time of 36 hours causing treatment delays and patient dissatisfaction.',
        solution: 'Implemented AI-assisted radiology platform for chest X-rays and CT scans. Computer vision models (trained on NIH ChestX-ray14 + MIMIC datasets) flag abnormalities for radiologist review, prioritizing urgent cases.',
        results: [
          { metric: '90%+', label: 'Diagnostic Sensitivity' },
          { metric: '18 hrs', label: 'Turnaround Time Reduction', trend: 'down' },
          { metric: '40%', label: 'Fewer Diagnostic Errors', trend: 'down' }
        ]
      },
      {
        icon: Target,
        iconGradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        title: 'Population Health Management Platform',
        industry: 'Healthcare | Accountable Care Organization',
        challenge: 'ACO managing 125,000 Medicare beneficiaries struggled to identify high-risk patients for proactive interventions, resulting in poor quality scores and shared savings.',
        solution: 'Built predictive analytics platform integrated with multiple EHRs (Epic, Cerner, Allscripts). Chronic disease risk scoring, gap-in-care identification, and automated outreach for preventive services.',
        results: [
          { metric: '30%', label: 'Care Management Cost Reduction' },
          { metric: '22%', label: 'Preventive Care Completion', trend: 'up' },
          { metric: '$4.2M', label: 'Shared Savings Generated' }
        ]
      },
      {
        icon: TrendingUpAlt,
        iconGradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        title: 'Sepsis Early Warning System',
        industry: 'Healthcare | Critical Care Network',
        challenge: '350-bed hospital with sepsis mortality rate of 28% (above national average of 20%). Delayed recognition in 40% of cases leading to preventable deaths.',
        solution: 'Deployed real-time sepsis detection using EHR data streams (vital signs, lab results, clinical notes). ML model alerts clinicians 6-12 hours before clinical manifestation, enabling early antibiotic administration.',
        results: [
          { metric: '18%', label: 'Sepsis Mortality Rate', trend: 'down' },
          { metric: '6-12 hrs', label: 'Early Detection Window' },
          { metric: '35%', label: 'ICU Length of Stay Reduction', trend: 'down' }
        ]
      }
    ]
  },

  // FAQs
  faqs: {
    title: 'Healthcare AI Automation FAQs',
    description: 'Common questions about implementing HIPAA-compliant AI automation and analytics in healthcare',
    questions: [
      {
        question: 'How do you ensure HIPAA compliance in AI automation solutions?',
        answer: 'Our healthcare AI solutions are designed with HIPAA compliance from the ground up. We implement all required technical safeguards including AES-256 encryption at rest, TLS 1.3 for data in transit, comprehensive audit logging of all PHI access, role-based access controls (RBAC), and automated PHI de-identification for analytics. We execute Business Associate Agreements (BAAs) with all cloud providers and subprocessors, conduct regular security assessments, and maintain disaster recovery plans. Our compliance specialists work alongside engineers to ensure every solution meets HIPAA Privacy Rule, Security Rule, and Breach Notification requirements before deployment.'
      },
      {
        question: 'Which EHR systems do you integrate with?',
        answer: 'We have deep integration experience with all major EHR platforms including Epic (MyChart, Hyperspace, FHIR APIs), Cerner (Millennium, PowerChart, HealtheIntent), Allscripts (Sunrise, TouchWorks), athenahealth, and eClinicalWorks. Our integrations leverage HL7 FHIR, HL7 v2.x messaging, Direct Protocol for secure messaging, and native EHR APIs. We understand the data models, custom workflows, and security requirements of each platform, enabling us to build AI solutions that seamlessly integrate with your existing clinical systems without disrupting care delivery workflows.'
      },
      {
        question: 'What is the typical ROI timeline for healthcare AI automation?',
        answer: 'ROI timelines vary by use case complexity and implementation scope. Clinical decision support systems (sepsis detection, drug interaction alerts) typically show ROI within 6-9 months through reduced adverse events and improved patient outcomes. Predictive analytics for readmission reduction delivers ROI in 8-12 months via decreased readmission penalties and improved care coordination. Medical image analysis shows value within 4-6 months through faster diagnoses and reduced radiologist workload. Population health management platforms achieve ROI in 12-18 months through better risk stratification and resource allocation. We provide detailed ROI modeling during discovery based on your baseline metrics, patient volume, and current operational costs.'
      },
      {
        question: 'How do you handle PHI (Protected Health Information) in analytics?',
        answer: 'We employ multiple strategies for PHI handling depending on the use case. For operational analytics, we use automated de-identification removing all 18 HIPAA identifiers while preserving statistical validity through techniques like k-anonymity and differential privacy. For clinical decision support requiring identified PHI, we implement strict access controls, audit all PHI access with real-time alerts for suspicious activity, use field-level encryption for sensitive data elements, and ensure minimum necessary data access. For research analytics, we create Limited Data Sets (LDS) with Data Use Agreements. All PHI processing occurs within HIPAA-compliant infrastructure (AWS HIPAA, Azure HIPAA, Google Cloud HIPAA) with proper network isolation, encryption, and monitoring.'
      },
      {
        question: 'Can AI automation improve both clinical outcomes and operational efficiency?',
        answer: 'Absolutely. The most successful healthcare AI implementations deliver dual benefits. Clinically, AI-powered sepsis early warning systems reduce mortality by 15-20% while also decreasing ICU length of stay. Medical image analysis improves diagnostic accuracy by 30-40% while reducing radiologist reading time by 25-30%. Predictive readmission models improve patient outcomes through proactive interventions while reducing readmission penalties ($125K-$300K annually per hospital). Population health risk stratification enables better clinical outcomes for high-risk patients while optimizing care management resources. We design all solutions to deliver measurable improvements in both patient care quality and operational metrics.'
      },
      {
        question: 'What compliance certifications do your healthcare solutions maintain?',
        answer: 'Our healthcare solutions are built on infrastructure certified for HIPAA compliance (AWS HIPAA, Azure HIPAA, Google Cloud HIPAA with executed BAAs). For medical imaging AI, we support FDA Software as a Medical Device (SaMD) compliance pathways when applicable. We maintain SOC 2 Type II certification for our development and managed services operations. Solutions integrate with HITRUST-certified environments and support Joint Commission, CMS, and state health department compliance requirements. Our development follows NIST Cybersecurity Framework and OWASP security standards. We provide compliance documentation, security assessments, and support for your internal audits and regulatory reviews.'
      },
      {
        question: 'How do you train AI models while protecting patient privacy?',
        answer: 'We employ privacy-preserving AI techniques throughout the model development lifecycle. For model training, we use federated learning allowing models to learn from distributed datasets without centralizing PHI, differential privacy adding statistical noise to protect individual privacy, synthetic data generation creating realistic training data without real PHI, and secure multi-party computation for collaborative model development. All training data is de-identified per HIPAA Safe Harbor or Expert Determination methods. We maintain strict data governance with data use agreements, audit all data access, use secure enclaves for sensitive processing, and implement model testing to prevent privacy leakage. Models are validated on diverse patient populations to ensure equitable performance.'
      },
      {
        question: 'Do you provide ongoing monitoring and model retraining for healthcare AI?',
        answer: 'Yes, continuous monitoring and retraining are critical for healthcare AI. Our managed AI services include 24/7 monitoring of model performance metrics (accuracy, sensitivity, specificity), real-time alerting for model drift or degradation, automated retraining pipelines when performance thresholds are breached, and A/B testing of model updates before production deployment. For clinical decision support, we monitor alert fatigue metrics and clinical adoption rates. For predictive models, we track calibration drift and feature importance changes. We provide monthly performance reports, quarterly business reviews, and maintain audit trails of all model updates for regulatory compliance. SLA-backed support ensures your AI solutions continue delivering value as patient populations and clinical practices evolve.'
      }
    ]
  },

  // Differentiators
  differentiators: {
    title: 'Why Choose Innovoco for Healthcare AI Automation',
    description: 'Proven expertise in HIPAA-compliant AI solutions for healthcare providers',
    columns: 2,
    items: [
      {
        icon: Shield,
        title: 'HIPAA Compliance Expertise',
        description: 'Deep expertise in HIPAA Privacy Rule, Security Rule, and Breach Notification requirements. Our compliance specialists ensure every AI solution meets regulatory requirements from design through deployment.',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        metric: '100% Compliant Deployments',
        highlights: [
          'BAAs with all cloud providers and subprocessors',
          'Automated PHI de-identification for Safe Harbor compliance',
          'Comprehensive audit logging with real-time breach detection',
          'Support for HITRUST, Joint Commission, and state health dept audits'
        ]
      },
      {
        icon: Network,
        title: 'EHR Integration Experience',
        description: 'Seamless integration with Epic, Cerner, Allscripts, athenahealth, and eClinicalWorks. We understand the data models, workflows, and security requirements of each major EHR platform.',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        metric: '100+ EHR Integrations',
        highlights: [
          'HL7 FHIR, HL7 v2.x, and native EHR API expertise',
          'Real-time clinical decision support integration',
          'Minimal disruption to existing clinical workflows',
          'Support for custom EHR configurations and extensions'
        ]
      },
      {
        icon: Activity,
        title: 'Clinical Outcome Focus',
        description: 'AI solutions designed to improve patient outcomes, not just operational metrics. We measure success through clinical KPIs: reduced mortality, faster diagnoses, fewer adverse events, and improved patient satisfaction.',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        metric: '25% Avg Patient Outcome Improvement',
        highlights: [
          '15-20% reduction in sepsis mortality rates',
          '30-40% improvement in diagnostic accuracy',
          '25% decrease in 30-day readmission rates',
          '90%+ predictive accuracy for high-risk patient identification'
        ]
      },
      {
        icon: Award,
        title: 'Healthcare Regulatory Knowledge',
        description: 'Navigate complex healthcare regulations including CMS quality programs (MIPS, MSSP), FDA Software as a Medical Device (SaMD), and payer-specific requirements (Medicare, Medicaid, commercial insurance).',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        metric: '10+ Years Healthcare Experience',
        highlights: [
          'FDA SaMD compliance pathways for medical imaging AI',
          'CMS quality reporting and value-based care expertise',
          'Payer-specific analytics for risk adjustment and quality measures',
          'State health department regulation compliance'
        ]
      }
    ]
  },

  // Action CTA
  actionCTA: {
    title: 'Ready to Transform Healthcare with AI?',
    subtitle: 'Choose your next step to get started with HIPAA-compliant AI automation and analytics',
    cards: [
      {
        icon: Shield,
        title: 'HIPAA Compliance Assessment',
        description: 'Free 60-minute consultation to review your current compliance posture and discuss HIPAA-compliant AI solutions for your healthcare organization.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        action: 'Schedule Assessment'
      },
      {
        icon: Download,
        title: 'Healthcare AI ROI Calculator',
        description: 'Calculate potential ROI for AI automation in your healthcare organization. Includes readmission reduction, diagnostic accuracy improvement, and operational efficiency metrics.',
        tag: 'Free Tool',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        action: 'Get ROI Calculator'
      },
      {
        icon: Calendar,
        title: 'Healthcare AI Webinar',
        description: 'Join our quarterly webinar showcasing the latest AI innovations for healthcare: clinical decision support, medical imaging AI, and population health management.',
        tag: 'Register Now',
        gradient: 'bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]',
        action: 'Register for Webinar'
      }
    ],
    footerText: 'Transform patient care with HIPAA-compliant AI automation and analytics. Contact Innovoco today to receive a customized roadmap for AI transformation in your healthcare organization.'
  },

  // Related Industries
  relatedIndustries: [
    {
      icon: TrendingUpAlt,
      title: 'Financial Services & Banking',
      description: 'Real-time fraud detection automation, risk analytics, and regulatory compliance solutions.',
      href: '/solutions/industries/financial-services',
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
      metrics: [
        { value: '$50M+', label: 'Fraud Savings Delivered' },
        { value: '95%+', label: 'Fraud Detection Rate' },
        { value: '<100ms', label: 'Transaction Scoring' }
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
        { value: '15-25%', label: 'Forecast Improvement' }
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
      description: 'Healthcare-specific AI roadmap with proven frameworks for clinical and operational excellence.',
      href: '/services/ai-strategy-consulting'
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy HIPAA-compliant AI solutions designed for healthcare regulatory requirements.',
      href: '/services/ai-implementation'
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build secure, HIPAA-compliant data infrastructure optimized for healthcare workloads.',
      href: '/services/data-engineering-modernization'
    }
  ],

  // Breadcrumbs
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Healthcare & Life Sciences', href: '/solutions/industries/healthcare' }
  ]
};
