import {
  Shield,
  Building2,
  Users,
  Lock,
  Eye,
  FileCheck,
  Globe,
  Brain,
  Rocket,
  Database,
  HeartPulse,
  Factory,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { IndustryConfig } from './types';

export const governmentConfig: IndustryConfig = {
  metadata: {
    title: 'Government & Public Sector AI | Secure, Compliant Automation',
    description: 'AI-powered citizen services, fraud detection, cybersecurity, and procurement automation for government agencies. FedRAMP-ready, FISMA-compliant, and built for inter-agency interoperability.',
    keywords: 'government AI, public sector automation, citizen services AI, fraud detection government, cybersecurity AI, FedRAMP, FISMA, NIST 800-53, inter-agency integration, government procurement AI',
    url: 'https://innovoco.com/solutions/industries/government',
  },

  hero: {
    badge: 'Trusted by Government Agencies',
    title: 'Government & Public Sector AI Solutions',
    subtitle: 'Secure, Compliant AI for Mission-Critical Operations',
    description: 'Modernize government operations with AI that meets the highest standards of security and compliance. From unified citizen services and benefits fraud detection to real-time cyber threat intelligence and procurement transparency, our solutions are built for the unique demands of the public sector.',
    trustIndicators: [
      { metric: '100%', label: 'Audit Compliant' },
      { metric: 'FedRAMP', label: 'Ready' },
      { metric: '24/7', label: 'Threat Monitoring' },
      { metric: 'Inter-Agency', label: 'Interoperable' },
    ],
    primaryCTAText: 'Schedule Government AI Assessment',
    backgroundGradient: 'bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#3b82f6]',
  },

  sectionCTAs: {
    afterMainContent: {
      title: 'Schedule Your Government AI Assessment',
      subtitle: 'Free consultation | 30-minute session | No obligation',
      buttonText: 'Book Your Assessment',
    },
    afterCaseStudies: {
      title: 'See How We Support Government Missions',
      subtitle: 'Join agencies modernizing operations with secure, compliant AI',
      buttonText: 'Start Your Transformation',
    },
    afterFAQs: {
      title: 'Still Have Questions? Let\'s Talk',
      subtitle: 'Speak with a government AI specialist about your agency\'s requirements',
      buttonText: 'Schedule a Call',
    },
    afterDifferentiators: {
      title: 'Partner With Government AI Experts',
      subtitle: 'FedRAMP-ready | FISMA-compliant | Proven ROI',
      buttonText: 'Get Started Today',
    },
  },

  faqs: {
    title: 'Government AI Automation FAQs',
    description: 'Common questions about implementing AI in government and public sector organizations',
    questions: [
      {
        question: 'How do you handle classified data?',
        answer: 'We deploy within your agency\'s authorized boundary — on-premises, GovCloud, or air-gapped environments — so classified and CUI data never leaves your control. All models run inside FIPS 140-2 validated encryption, and we support IL4/IL5 workloads with appropriate accreditation packages.',
      },
      {
        question: 'What compliance frameworks do you support?',
        answer: 'Our solutions are designed around FedRAMP, FISMA, NIST 800-53, SOC 2 Type II, ISO 27001, and GDPR/PIPEDA. We provide pre-built control mappings, continuous monitoring dashboards, and audit-ready documentation to accelerate your Authority to Operate (ATO) process.',
      },
      {
        question: 'Can you integrate with legacy government systems?',
        answer: 'Yes. We have proven integration patterns for mainframe-era systems, COBOL backends, and legacy databases common across federal and state agencies. Our middleware layer normalizes data from disparate sources without requiring full system replacement — preserving existing investments while enabling AI capabilities.',
      },
      {
        question: 'How do you ensure citizen data privacy?',
        answer: 'Citizen PII is protected through role-based access controls, data minimization, automated de-identification pipelines, and full audit trails. We implement Privacy Impact Assessment (PIA) requirements by design and support Privacy Act and state-level privacy regulation compliance out of the box.',
      },
    ],
  },

  differentiators: {
    title: 'Why Choose Innovoco for Government AI',
    description: 'Purpose-built AI solutions that meet the security, compliance, and interoperability requirements of the public sector',
    columns: 2,
    items: [
      {
        icon: Shield,
        title: 'Security-First Architecture',
        description: 'Every component designed for FedRAMP, FISMA, and NIST 800-53 from day one — not bolted on after the fact. FIPS 140-2 encryption, zero-trust networking, and continuous monitoring built in.',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        metric: 'FedRAMP-ready architecture',
        highlights: [],
      },
      {
        icon: Building2,
        title: 'Inter-Agency Integration',
        description: 'Proven patterns for connecting siloed agency systems — mainframes, legacy databases, and modern APIs — into unified data flows without full system replacement.',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        metric: '50+ legacy integration patterns',
        highlights: [],
      },
      {
        icon: Users,
        title: 'Citizen-First Design',
        description: 'AI that improves service delivery, reduces wait times, and resolves citizen inquiries faster — while maintaining full accessibility and Section 508 compliance.',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        metric: 'Section 508 compliant',
        highlights: [],
      },
      {
        icon: FileCheck,
        title: 'Audit-Ready AI',
        description: 'Complete explainability, decision logging, and bias monitoring for every AI-driven action. Pre-built ATO documentation and continuous compliance reporting.',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        metric: '100% decision traceability',
        highlights: [],
      },
    ],
  },

  actionCTA: {
    title: 'Ready to Modernize Government Operations with AI?',
    subtitle: 'Choose your next step toward mission excellence',
    footerText: 'Secure, compliant AI for citizen services, fraud detection, and cybersecurity. Contact Innovoco for a customized government rollout plan.',
    prioritization: {
      headline: 'Citizen Services, Fraud Detection, Cybersecurity.',
      headlineAccent: 'Which One Delivers Measurable Outcomes First?',
      subline: 'One workshop. Every initiative ranked by ROI.',
      strategic: 'Enterprise-grade citizen identity resolution, fraud investigation platforms, and cyber threat intelligence systems that scale across agencies.',
      quickWins: 'Deploy benefits fraud scoring or automated compliance reporting in 90 days. Measurable cost reduction this quarter.',
    },
    cards: [
      {
        icon: Users,
        title: 'Citizen Services Assessment',
        description: 'Complimentary review of citizen touchpoints, identity resolution gaps, and service delivery optimization opportunities.',
        tag: 'Complimentary',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        action: 'Schedule review',
      },
      {
        icon: Eye,
        title: 'Fraud Detection Workshop',
        description: 'Map fraud vectors across benefits, procurement, and tax systems with AI-driven investigation blueprints.',
        tag: 'Workshop',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        action: 'Book workshop',
      },
      {
        icon: ShieldCheck,
        title: 'Cybersecurity Quickstart',
        description: 'Threat landscape audit plus AI-powered detection POC on one critical infrastructure domain.',
        tag: 'POC',
        gradient: 'bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]',
        action: 'Start POC',
      },
    ],
  },

  relatedIndustries: [
    {
      icon: Factory,
      title: 'Financial Services',
      description: 'Fraud detection and risk analytics',
      href: '/solutions/industries/financial-services',
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
    },
    {
      icon: HeartPulse,
      title: 'Healthcare',
      description: 'HIPAA-compliant AI automation',
      href: '/solutions/industries/healthcare',
      gradient: 'bg-gradient-to-br from-[#DC2626] to-[#B91C1C]',
    },
    {
      icon: Zap,
      title: 'Energy & Utilities',
      description: 'Grid optimization and asset management',
      href: '/solutions/industries/energy-utilities',
      gradient: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
    },
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: 'bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]',
      title: 'AI Strategy & Consulting',
      description: 'Government-specific AI roadmap with proven frameworks for mission-critical operations.',
      href: '/services/ai-strategy-consulting',
    },
    {
      icon: Rocket,
      iconGradient: 'bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]',
      title: 'Enterprise AI Implementation',
      description: 'Deploy secure AI solutions designed for government workflows and compliance requirements.',
      href: '/services/ai-implementation',
    },
    {
      icon: Database,
      iconGradient: 'bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]',
      title: 'Data Engineering & Modernization',
      description: 'Build secure data infrastructure optimized for government and inter-agency workloads.',
      href: '/services/data-engineering-modernization',
    },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Government & Public Sector', href: '/solutions/industries/government' },
  ],
};
