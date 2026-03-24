/** Static IA for /case-studies — aligned with Stitch “use cases first” desktop concept. */

export type OutcomeTag = "Cost" | "Risk" | "Speed" | "CX" | "Compliance";

/** Sticky-nav filters on /case-studies — map each pattern to where it most often lands. */
export const caseStudyIndustries = [
  { id: "financial-services", label: "Financial services" },
  { id: "healthcare", label: "Healthcare" },
  { id: "retail-consumer", label: "Retail" },
  { id: "manufacturing-logistics", label: "Manufacturing" },
  { id: "energy-field", label: "Energy & field" },
  { id: "technology", label: "Technology" },
  { id: "cross-enterprise", label: "Corporate functions" },
] as const;

export type CaseStudyIndustryId = (typeof caseStudyIndustries)[number]["id"];

export type BusinessOutcomeUseCase = {
  /** URL segment for `/case-studies/use-cases/[slug]` */
  slug: string;
  title: string;
  outcome: string;
  /** Industry filters on the case-studies library page */
  industries: CaseStudyIndustryId[];
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
    industries: ["financial-services", "technology", "cross-enterprise"],
    tags: ["Speed", "Compliance"],
    icon: "chart",
    image: "/images/case-studies/outcomes/executive-analytics.jpg",
  },
  {
    slug: "customer-support-voice",
    title: "Customer support & voice",
    outcome: "Triage, sentiment-aware routing, CRM-grounded answers at scale.",
    industries: ["retail-consumer", "technology"],
    tags: ["CX", "Cost"],
    icon: "headset",
    image: "/images/case-studies/outcomes/customer-support.jpg",
  },
  {
    slug: "regulated-onboarding-kyc-aml",
    title: "Regulated onboarding (KYC / AML)",
    outcome: "Document intelligence, exception queues, immutable evidence for auditors.",
    industries: ["financial-services"],
    tags: ["Risk", "Compliance"],
    icon: "shield",
    image: "/images/case-studies/outcomes/regulated-onboarding.jpg",
  },
  {
    slug: "supply-chain-demand",
    title: "Supply chain & demand",
    outcome: "Forecast → reorder loops with SLA-aware vendors and proactive alerts.",
    industries: ["manufacturing-logistics", "retail-consumer"],
    tags: ["Cost", "Speed"],
    icon: "truck",
    image: "/images/case-studies/outcomes/supply-chain.jpg",
  },
  {
    slug: "field-services-iot-playbooks",
    title: "Field services & IoT playbooks",
    outcome: "Anomaly → dispatch → work order → close-out—with human gates.",
    industries: ["energy-field", "manufacturing-logistics"],
    tags: ["Speed", "Risk"],
    icon: "wrench",
    image: "/images/case-studies/outcomes/field-services.jpg",
  },
  {
    slug: "finance-close-reconciliation",
    title: "Finance close & reconciliation",
    outcome: "Exception-driven matching, controller review, full adjustment logs.",
    industries: ["financial-services", "cross-enterprise"],
    tags: ["Compliance", "Cost"],
    icon: "scale",
    image: "/images/case-studies/outcomes/finance-reconciliation.jpg",
  },
  {
    slug: "hr-onboarding-policy",
    title: "HR onboarding & policy",
    outcome: "Provisioning, training, policy checks—fewer manual handoffs.",
    industries: ["cross-enterprise"],
    tags: ["Speed", "Compliance"],
    icon: "users",
    image: "/images/case-studies/outcomes/hr-onboarding.jpg",
  },
  {
    slug: "marketing-personalization",
    title: "Marketing personalization",
    outcome: "Segments, variants, and experiment readouts into CDP / CRM.",
    industries: ["retail-consumer", "technology"],
    tags: ["CX", "Speed"],
    icon: "megaphone",
    image: "/images/case-studies/outcomes/marketing-personalization.jpg",
  },
  {
    slug: "reporting-audit-packs",
    title: "Reporting & audit packs",
    outcome: "Quarterly and regulatory packs from lineage-aware, signed-off sources.",
    industries: ["financial-services", "cross-enterprise"],
    tags: ["Compliance", "Risk"],
    icon: "file",
    image: "/images/case-studies/outcomes/reporting-audit.jpg",
  },
  {
    slug: "governed-knowledge-copilot",
    title: "Governed knowledge copilot",
    outcome:
      "Cross-dept answers from SharePoint, SQL, and BQ with ACLs respected and citations—not a generic chatbot.",
    industries: ["technology", "cross-enterprise"],
    tags: ["Speed", "Compliance"],
    icon: "book",
    image: "/images/case-studies/outcomes/knowledge-copilot.jpg",
  },
  {
    slug: "healthcare-capacity-clinical-ops",
    title: "Healthcare capacity & clinical ops",
    outcome:
      "Staffing, credentialing, and clinical supply continuity coordinated before service levels slip.",
    industries: ["healthcare"],
    tags: ["Risk", "Speed"],
    icon: "stethoscope",
    image: "/images/case-studies/outcomes/healthcare-ops.jpg",
  },
  {
    slug: "global-payroll-pay-compliance",
    title: "Global payroll & pay compliance",
    outcome:
      "Cross-border payroll runs, statutory rules, and evidence packs—separate from day-one onboarding tasks.",
    industries: ["financial-services", "cross-enterprise"],
    tags: ["Compliance", "Cost"],
    icon: "globe",
    image: "/images/case-studies/outcomes/global-payroll.jpg",
  },
];
