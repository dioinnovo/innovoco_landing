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
    | "globe"
    | "camera"
    | "factory"
    | "zap"
    | "activity"
    | "search"
    | "git-branch";
  /** Public path; generate with `pnpm run generate:outcome-cards` */
  image: string;
};

export const businessOutcomeUseCases: BusinessOutcomeUseCase[] = [
  {
    slug: "executive-self-serve-analytics",
    title: "Executive & self-serve analytics",
    outcome: "Plain-language to SQL: citations, entitlements, audit trails.",
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
  {
    slug: "visual-inspections-property-cv",
    title: "Visual inspections & property CV",
    outcome:
      "On-device and cloud computer vision scoring damage severity with adjuster-ready overlays and QA sampling.",
    industries: ["energy-field", "manufacturing-logistics"],
    tags: ["Speed", "Cost"],
    icon: "camera",
    image: "/images/case-studies/outcomes/visual-inspections-property-cv.jpg",
  },
  {
    slug: "cv-quality-control-manufacturing",
    title: "CV quality control for manufacturing",
    outcome:
      "Deep-learning defect detection on PCBs and assemblies at 10x manual speed with 99.5% accuracy.",
    industries: ["manufacturing-logistics"],
    tags: ["Cost", "Speed"],
    icon: "factory",
    image: "/images/case-studies/outcomes/cv-quality-control-manufacturing.jpg",
  },
  {
    slug: "medical-imaging-radiology-ai",
    title: "Medical imaging & radiology AI",
    outcome:
      "AI-assisted prioritization and abnormality flagging cutting radiology turnaround by 18 hours.",
    industries: ["healthcare"],
    tags: ["Speed", "Risk"],
    icon: "stethoscope",
    image: "/images/case-studies/outcomes/medical-imaging-radiology-ai.jpg",
  },
  {
    slug: "population-health-management",
    title: "Population health management",
    outcome:
      "Risk stratification across 125K+ beneficiaries driving $4.2M in shared savings for an ACO.",
    industries: ["healthcare"],
    tags: ["Cost", "Risk"],
    icon: "stethoscope",
    image: "/images/case-studies/outcomes/population-health-management.jpg",
  },
  {
    slug: "sepsis-early-warning-system",
    title: "Sepsis early warning system",
    outcome:
      "Real-time EHR-driven alerts detecting sepsis 6–12 hours before clinical manifestation.",
    industries: ["healthcare"],
    tags: ["Risk", "Speed"],
    icon: "activity",
    image: "/images/case-studies/outcomes/sepsis-early-warning-system.jpg",
  },
  {
    slug: "load-renewable-forecasting",
    title: "Load & renewable forecasting",
    outcome:
      "Ensemble models with weather and DER signals reducing MAPE 14% and saving $4.2M in fuel and imbalance.",
    industries: ["energy-field"],
    tags: ["Cost", "Speed"],
    icon: "zap",
    image: "/images/case-studies/outcomes/load-renewable-forecasting.jpg",
  },
  {
    slug: "grid-asset-health-monitoring",
    title: "Grid asset health monitoring",
    outcome:
      "Unified DGA, partial discharge, and thermal data into survival-style risk scores for substations and lines.",
    industries: ["energy-field"],
    tags: ["Risk", "Cost"],
    icon: "zap",
    image: "/images/case-studies/outcomes/grid-asset-health-monitoring.jpg",
  },
  {
    slug: "der-visibility-operations",
    title: "DER visibility & operations",
    outcome:
      "Automated hosting-capacity screens cutting study time 70% and tripling interconnection throughput.",
    industries: ["energy-field"],
    tags: ["Speed", "Risk"],
    icon: "zap",
    image: "/images/case-studies/outcomes/der-visibility-operations.jpg",
  },
  {
    slug: "fnol-document-intelligence",
    title: "FNOL document intelligence",
    outcome:
      "Speech-to-structure and document AI cutting FNOL cycle time 42% with 99.2% field completeness.",
    industries: ["financial-services"],
    tags: ["Speed", "Cost"],
    icon: "file",
    image: "/images/case-studies/outcomes/fnol-document-intelligence.jpg",
  },
  {
    slug: "damage-assessment-field-capture",
    title: "Damage assessment & field capture",
    outcome:
      "Guided photo sets, auto-tagging, and draft narratives tripling desk throughput for public adjusters.",
    industries: ["financial-services"],
    tags: ["Speed", "CX"],
    icon: "camera",
    image: "/images/case-studies/outcomes/damage-assessment-field-capture.jpg",
  },
  {
    slug: "fraud-siu-link-analytics",
    title: "Fraud & SIU link analytics",
    outcome:
      "Graph-based link analysis with explainable risk tiers reducing false referrals 31% and lifting hit rate 22%.",
    industries: ["financial-services"],
    tags: ["Risk", "Cost"],
    icon: "search",
    image: "/images/case-studies/outcomes/fraud-siu-link-analytics.jpg",
  },
  {
    slug: "real-time-fraud-detection",
    title: "Real-time fraud detection",
    outcome:
      "Sub-100ms ML scoring across cards, ACH, and wires delivering $18M annual savings at 95%+ detection.",
    industries: ["financial-services"],
    tags: ["Risk", "Cost"],
    icon: "shield",
    image: "/images/case-studies/outcomes/real-time-fraud-detection.jpg",
  },
  {
    slug: "credit-risk-modeling",
    title: "Credit risk modeling",
    outcome:
      "Alternative data credit scoring lifting approvals 25% while holding defaults below industry average.",
    industries: ["financial-services"],
    tags: ["CX", "Compliance"],
    icon: "chart",
    image: "/images/case-studies/outcomes/credit-risk-modeling.jpg",
  },
  {
    slug: "algorithmic-trading-sentiment",
    title: "Algorithmic trading & sentiment",
    outcome:
      "NLP sentiment scoring across 10K+ daily articles generating 3.2% annualized alpha with sub-5min latency.",
    industries: ["financial-services"],
    tags: ["Speed", "Cost"],
    icon: "chart",
    image: "/images/case-studies/outcomes/algorithmic-trading-sentiment.jpg",
  },
  {
    slug: "deal-flow-ai-diligence",
    title: "Deal flow & AI diligence",
    outcome:
      "Structured IC-ready outputs from CIMs, datarooms, and portfolio reporting with mandate-aware access controls.",
    industries: ["financial-services"],
    tags: ["Speed", "Cost"],
    icon: "git-branch",
    image: "/images/case-studies/outcomes/deal-flow-ai-diligence.jpg",
  },
  {
    slug: "configurable-bom-product-design",
    title: "Configurable BOM & product design",
    outcome:
      "Graph-resolved 150% BOMs cutting configuration time 60% with full RoHS/REACH compliance traceability.",
    industries: ["manufacturing-logistics", "energy-field"],
    tags: ["Speed", "Compliance"],
    icon: "factory",
    image: "/images/case-studies/outcomes/configurable-bom-product-design.jpg",
  },
  {
    slug: "customer-360-identity-resolution",
    title: "Customer 360 & identity resolution",
    outcome:
      "Graph-based entity resolution unifying 12+ channels into a single customer profile with 94-98% match accuracy.",
    industries: ["retail-consumer", "financial-services"],
    tags: ["CX", "Cost"],
    icon: "users",
    image: "/images/case-studies/outcomes/customer-360-identity-resolution.jpg",
  },
  {
    slug: "predictive-maintenance-manufacturing",
    title: "Predictive maintenance for manufacturing",
    outcome:
      "IoT-driven failure prediction 7–14 days ahead cutting unplanned downtime 45% and saving $3.5M annually.",
    industries: ["manufacturing-logistics", "energy-field"],
    tags: ["Cost", "Speed"],
    icon: "wrench",
    image: "/images/case-studies/outcomes/predictive-maintenance-manufacturing.jpg",
  },
];
