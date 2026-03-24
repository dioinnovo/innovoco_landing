import {
  Shield,
  FileText,
  Camera,
  Scale,
  Brain,
  Rocket,
  Database,
  HeartPulse,
  DollarSign,
  HardHat,
  Search,
  FileCheck,
} from "lucide-react";
import { IndustryConfig } from "./types";

export const insuranceConfig: IndustryConfig = {
  metadata: {
    title: "Insurance & Public Adjusters AI | Claims, FNOL & Fraud Analytics",
    description:
      "AI for carriers, TPAs, and public adjusters: intelligent FNOL, document and damage triage, fraud/SIU signals, and audit-ready workflows.",
    keywords:
      "insurance AI, public adjuster software, claims automation, FNOL, fraud detection insurance, SIU analytics, property claims AI, document intelligence insurance",
    url: "https://innovoco.com/solutions/industries/insurance",
  },

  hero: {
    badge: "Faster cycle times · Defensible decisions",
    title: "Insurance & Public Adjusters AI Solutions",
    subtitle: "Claims intelligence, field documentation, and risk analytics",
    description:
      "Accelerate first notice of loss through settlement with AI that structures unstructured submissions, scores severity and fraud risk, and supports adjusters and public adjusters with consistent, explainable outputs—integrated to your core, CMS, and document platforms.",
    trustIndicators: [
      { metric: "35–50%", label: "FNOL processing time ↓" },
      { metric: "20–40%", label: "Manual triage ↓" },
      { metric: "SOC 2", label: "aligned delivery" },
      { metric: "Full", label: "audit trail" },
    ],
    primaryCTAText: "Schedule an insurance AI assessment",
    backgroundGradient: "bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#ddd6fe]",
  },

  sectionCTAs: {
    afterMainContent: {
      title: "Modernize claims without losing control",
      subtitle: "Governed AI · 30-minute discovery · No obligation",
      buttonText: "Talk to a specialist",
    },
    afterCaseStudies: {
      title: "See how peers shortened claims cycles",
      subtitle: "Join carriers and adjusting firms using AI for triage, documentation, and SIU support",
      buttonText: "Get started",
    },
    afterFAQs: {
      title: "Ready to discuss your claims stack?",
      subtitle: "Speak with an insurance AI architect about FNOL, core/CMS, and field workflows",
      buttonText: "Book consultation",
    },
    afterDifferentiators: {
      title: "Partner with regulated-industry AI experts",
      subtitle: "10+ years delivering production AI with audit trails and human-in-the-loop patterns",
      buttonText: "Start today",
    },
  },

  caseStudies: {
    badge: "Proven outcomes",
    title: "Insurance & adjusting AI success stories",
    description: "Measurable impact on cycle time, adjuster capacity, and fraud referral quality",
    studies: [
      {
        icon: FileText,
        iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        title: "FNOL intake & routing at scale",
        industry: "P&C | Regional carrier",
        challenge:
          "Email, portal, and phone FNOL produced inconsistent payloads; adjusters spent hours normalizing loss details before assignment.",
        solution:
          "Deployed document and speech-to-structure models with business rules for peril, coverage hints, and severity scoring—feeding core and CMS with validated JSON and confidence scores.",
        results: [
          { metric: "42%", label: "FNOL cycle ↓", trend: "down" },
          { metric: "28%", label: "Triage effort ↓", trend: "down" },
          { metric: "99.2%", label: "Field completeness" },
        ],
      },
      {
        icon: Camera,
        iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        title: "Public adjuster field intelligence",
        industry: "Adjusting | Multi-state firm",
        challenge:
          "Photo and estimate packets varied by adjuster; desk review bottlenecks delayed carrier submissions and slowed settlements.",
        solution:
          "Standardized capture with guided photo sets, auto-tagging of damage types, and draft narrative generation for carrier packages—reviewed and edited by senior adjusters.",
        results: [
          { metric: "3.1×", label: "Desk throughput" },
          { metric: "18%", label: "Rework ↓", trend: "down" },
          { metric: "100%", label: "Version history" },
        ],
      },
      {
        icon: Search,
        iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        title: "SIU referral quality",
        industry: "P&C | National TPA",
        challenge:
          "High false-positive fraud flags burned investigator time and strained vendor relationships; simple rules missed organized schemes.",
        solution:
          "Graph-style link analysis across parties, vendors, and historical claims with explainable risk tiers and playbook-driven referrals.",
        results: [
          { metric: "31%", label: "False referrals ↓", trend: "down" },
          { metric: "22%", label: "Hit rate ↑", trend: "up" },
          { metric: "<8wk", label: "Model refresh" },
        ],
      },
      {
        icon: Scale,
        iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        title: "Litigation & regulatory readiness",
        industry: "Carrier | Specialty lines",
        challenge:
          "Ad-hoc spreadsheets and email chains made it hard to reproduce decision paths for audits and disputes.",
        solution:
          "Immutable decision logs, model cards, and human override capture tied to each claim milestone with exportable evidence packs.",
        results: [
          { metric: "60%", label: "Prep time ↓", trend: "down" },
          { metric: "100%", label: "Traceability" },
          { metric: "0", label: "Critical audit gaps" },
        ],
      },
    ],
  },

  faqs: {
    title: "Insurance & adjusting AI FAQs",
    description: "Common questions for carriers, TPAs, MGAs, and public adjusting firms",
    questions: [
      {
        question: "How do you keep humans in the loop for claims decisions?",
        answer:
          "We design for adjuster review on high-impact or low-confidence outcomes: thresholds, sampling, and escalation paths are configurable. Every model-assisted field stores provenance, version, and reviewer identity for audit.",
      },
      {
        question: "Can you integrate with our core, Guidewire, Duck Creek, or custom CMS?",
        answer:
          "Yes. We use APIs, events, and batch patterns depending on latency needs—claims creation, exposure updates, document attach, and financials. We have experience with major suites and bespoke mainframe bridges.",
      },
      {
        question: "What about PII and state privacy requirements?",
        answer:
          "We apply minimization, encryption, retention policies, and regional processing where required. Role-based access and data masking are standard; DPIAs and vendor controls align to your security team’s checklist.",
      },
      {
        question: "Will this replace adjusters?",
        answer:
          "No—the goal is to remove repetitive normalization and search so adjusters focus on judgment, negotiation, and customer care. Public adjusters gain faster package assembly without sacrificing professional oversight.",
      },
      {
        question: "How long until we see ROI?",
        answer:
          "Focused FNOL or document pilots often show measurable cycle reduction in 10–14 weeks. SIU and graph analytics depend on data history but typically produce referral-quality gains within two quarters.",
      },
      {
        question: "Do you support catastrophe (CAT) surge workflows?",
        answer:
          "Yes—queue prioritization, geographic triage, and contractor/vendor deduplication patterns are common extensions. We scale ingestion and batch scoring with your cloud footprint.",
      },
    ],
  },

  differentiators: {
    title: "Why Innovoco for insurance AI",
    description: "Production discipline with the compliance posture carriers and firms expect",
    columns: 2,
    items: [
      {
        icon: Shield,
        title: "Governed AI by design",
        description:
          "Model risk documentation, monitoring, and rollback paths aligned to how compliance and legal teams actually review deployments.",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        metric: "Audit-ready lineage",
        highlights: [],
      },
      {
        icon: FileCheck,
        title: "Structured + unstructured mastery",
        description:
          "OCR, NLP, and computer vision pipelines tuned for loss descriptions, policies, endorsements, and field media—not generic document demos.",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        metric: "End-to-end FNOL to payment support",
        highlights: [],
      },
      {
        icon: Brain,
        title: "Explainable risk signals",
        description:
          "Features and narratives your SIU and legal partners can interrogate—not black-box scores dropped into legacy green screens.",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        metric: "Human-readable rationales",
        highlights: [],
      },
      {
        icon: Database,
        title: "Data platform depth",
        description:
          "Lakehouse, streaming, and API fabrics so telematics, IoT, weather, and third-party enrichment land where models and adjusters need them.",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        metric: "500+ enterprise data projects",
        highlights: [],
      },
    ],
  },

  actionCTA: {
    title: "Ready to accelerate claims with AI?",
    subtitle: "Choose your next step toward faster, defensible claims handling",
    footerText:
      "Innovoco helps carriers, TPAs, MGAs, and public adjusters deploy AI that fits existing cores, compliance, and field realities.",
    cards: [
      {
        icon: FileText,
        title: "Claims workflow assessment",
        description:
          "60-minute working session mapping FNOL sources, core touchpoints, and highest-friction manual steps.",
        tag: "Complimentary",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        action: "Schedule review",
      },
      {
        icon: Camera,
        title: "Field capture blueprint",
        description:
          "Architecture for guided photo/video, offline sync, and adjuster QA—aligned to your cat and daily operations.",
        tag: "Workshop",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        action: "Book workshop",
      },
      {
        icon: Search,
        title: "Fraud analytics quickstart",
        description:
          "Scoped POC for referral scoring or graph analysis with clear success metrics and exit criteria.",
        tag: "POC",
        gradient: "bg-gradient-to-br from-[#f5f3ff] to-[#7c3aed]",
        action: "Start POC",
      },
    ],
  },

  relatedIndustries: [
    {
      icon: DollarSign,
      title: "Financial Services",
      description: "Fraud, risk, and regulatory analytics for financial institutions",
      href: "/solutions/industries/financial-services",
      gradient: "bg-gradient-to-br from-[#DBEAFE] to-[#0A58D0]",
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Inspection AI and field documentation for property and trades",
      href: "/solutions/industries/construction",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#D97706]",
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      description: "HIPAA-aware analytics and clinical workflow AI",
      href: "/solutions/industries/healthcare",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#059669]",
    },
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#a78bfa]",
      title: "AI Strategy & Consulting",
      description: "Roadmaps for claims modernization, data governance, and vendor selection.",
      href: "/services/ai-strategy-consulting",
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#f5f3ff] to-[#a78bfa]",
      title: "Enterprise AI Implementation",
      description: "Deploy FNOL, document AI, and fraud models with MLOps and monitoring.",
      href: "/services/ai-implementation",
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]",
      title: "Data Engineering & Modernization",
      description: "Claims data lakes, streaming FNOL, and integration to core and CMS.",
      href: "/services/data-engineering-modernization",
    },
  ],

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Insurance & Public Adjusters", href: "/solutions/industries/insurance" },
  ],
};
