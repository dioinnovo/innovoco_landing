/** Static IA for /case-studies — aligned with Stitch “use cases first” desktop concept. */

export type OutcomeTag = "Cost" | "Risk" | "Speed" | "CX" | "Compliance";

export type BusinessOutcomeUseCase = {
  /** URL segment for `/case-studies/use-cases/[slug]` */
  slug: string;
  title: string;
  outcome: string;
  tags: OutcomeTag[];
  icon:
    | "chart"
    | "headset"
    | "shield"
    | "truck"
    | "wrench"
    | "scale"
    | "users"
    | "megaphone"
    | "file"
    | "book"
    | "stethoscope"
    | "globe";
  /** Public path; generate with `pnpm run generate:outcome-cards` */
  image: string;
};

export const businessOutcomeUseCases: BusinessOutcomeUseCase[] = [
  {
    slug: "executive-self-serve-analytics",
    title: "Executive & self-serve analytics",
    outcome: "NL queries over the warehouse—governed access, citations, audit trails.",
    tags: ["Speed", "Compliance"],
    icon: "chart",
    image: "/images/case-studies/outcomes/executive-analytics.jpg",
  },
  {
    slug: "customer-support-voice",
    title: "Customer support & voice",
    outcome: "Triage, sentiment-aware routing, CRM-grounded answers at scale.",
    tags: ["CX", "Cost"],
    icon: "headset",
    image: "/images/case-studies/outcomes/customer-support.jpg",
  },
  {
    slug: "regulated-onboarding-kyc-aml",
    title: "Regulated onboarding (KYC / AML)",
    outcome: "Document intelligence, exception queues, immutable evidence for auditors.",
    tags: ["Risk", "Compliance"],
    icon: "shield",
    image: "/images/case-studies/outcomes/regulated-onboarding.jpg",
  },
  {
    slug: "supply-chain-demand",
    title: "Supply chain & demand",
    outcome: "Forecast → reorder loops with SLA-aware vendors and proactive alerts.",
    tags: ["Cost", "Speed"],
    icon: "truck",
    image: "/images/case-studies/outcomes/supply-chain.jpg",
  },
  {
    slug: "field-services-iot-playbooks",
    title: "Field services & IoT playbooks",
    outcome: "Anomaly → dispatch → work order → close-out—with human gates.",
    tags: ["Speed", "Risk"],
    icon: "wrench",
    image: "/images/case-studies/outcomes/field-services.jpg",
  },
  {
    slug: "finance-close-reconciliation",
    title: "Finance close & reconciliation",
    outcome: "Exception-driven matching, controller review, full adjustment logs.",
    tags: ["Compliance", "Cost"],
    icon: "scale",
    image: "/images/case-studies/outcomes/finance-reconciliation.jpg",
  },
  {
    slug: "hr-onboarding-policy",
    title: "HR onboarding & policy",
    outcome: "Provisioning, training, policy checks—fewer manual handoffs.",
    tags: ["Speed", "Compliance"],
    icon: "users",
    image: "/images/case-studies/outcomes/hr-onboarding.jpg",
  },
  {
    slug: "marketing-personalization",
    title: "Marketing personalization",
    outcome: "Segments, variants, and experiment readouts into CDP / CRM.",
    tags: ["CX", "Speed"],
    icon: "megaphone",
    image: "/images/case-studies/outcomes/marketing-personalization.jpg",
  },
  {
    slug: "reporting-audit-packs",
    title: "Reporting & audit packs",
    outcome: "Quarterly and regulatory packs from lineage-aware, signed-off sources.",
    tags: ["Compliance", "Risk"],
    icon: "file",
    image: "/images/case-studies/outcomes/reporting-audit.jpg",
  },
  {
    slug: "governed-knowledge-copilot",
    title: "Governed knowledge copilot",
    outcome:
      "Cross-dept answers from SharePoint, SQL, and BQ with ACLs respected and citations—not a generic chatbot.",
    tags: ["Speed", "Compliance"],
    icon: "book",
    image: "/images/case-studies/outcomes/knowledge-copilot.jpg",
  },
  {
    slug: "healthcare-capacity-clinical-ops",
    title: "Healthcare capacity & clinical ops",
    outcome:
      "Staffing, credentialing, and clinical supply continuity coordinated before service levels slip.",
    tags: ["Risk", "Speed"],
    icon: "stethoscope",
    image: "/images/case-studies/outcomes/healthcare-ops.jpg",
  },
  {
    slug: "global-payroll-pay-compliance",
    title: "Global payroll & pay compliance",
    outcome:
      "Cross-border payroll runs, statutory rules, and evidence packs—separate from day-one onboarding tasks.",
    tags: ["Compliance", "Cost"],
    icon: "globe",
    image: "/images/case-studies/outcomes/global-payroll.jpg",
  },
];

export const caseStudiesFaq: Array<{ q: string; a: string }> = [
  {
    q: "How do you keep customer and model data inside our compliance boundary?",
    a: "We design for tenant-native runtimes (Azure AI Foundry, Vertex AI), private networking, encryption, and optional self-hosted orchestration (e.g. LangGraph, n8n) so sensitive workloads stay in your VPC or hybrid footprint.",
  },
  {
    q: "Can you run hybrid or multi-cloud while we standardize on one hyperscaler?",
    a: "Yes. Many programs use a primary cloud for runtime and identity while LangGraph or n8n coordinates cross-system workflows, approvals, and observability without forcing a big-bang migration.",
  },
  {
    q: "What timeline should we expect from pilot to production?",
    a: "Typical paths include a focused POC (weeks), hardening with evals and governance (additional weeks), and phased rollout by use case. Exact timelines depend on data readiness, integration depth, and approval workflows.",
  },
  {
    q: "How do you handle evals, tracing, and production monitoring?",
    a: "We pair cloud-native tooling (Prompt Flow, Vertex Studio, etc.) with framework observability (e.g. LangSmith) so teams can trace runs, score quality, and regress safely before broad release.",
  },
  {
    q: "Where do humans stay in the loop for high-risk decisions?",
    a: "We embed approvals, policy checks, and escalation paths into agent graphs—automation handles volume, while people retain control for exceptions, regulatory actions, and customer-impacting changes.",
  },
];

export const caseStudiesSubnav = [
  { id: "business-outcomes", label: "Business outcomes" },
  { id: "faq-use-cases", label: "FAQ" },
] as const;

export type CaseStudiesSubnav = typeof caseStudiesSubnav;
