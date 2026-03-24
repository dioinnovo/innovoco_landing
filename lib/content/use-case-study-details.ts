/**
 * Long-form narratives for `/case-studies/use-cases/[slug]`.
 * Structure inspired by case-study layouts (e.g. phased delivery, challenge → solution → impact).
 */

export type UseCaseStudyPhase = { title: string; body: string };

export type UseCaseStudyImplementation = { title: string; detail: string };

export type UseCaseStudyNarrative = {
  headline: string;
  subheadline: string;
  contextItalic: string;
  challenge: string;
  solutionIntro: string;
  phases: UseCaseStudyPhase[];
  keyImplementations: UseCaseStudyImplementation[];
  technicalInnovation: string;
  impactMetrics: string[];
  impactClosing?: string;
  quote?: { body: string; attribution?: string };
};

const details: Record<string, UseCaseStudyNarrative> = {
  "executive-self-serve-analytics": {
    headline: "Answers without the backlog",
    subheadline: "Governed natural-language analytics on the warehouse your CFO already trusts.",
    contextItalic:
      "Leaders need speed, but ad-hoc SQL requests and static dashboards create bottlenecks and shadow IT.",
    challenge:
      "Executives and domain owners wait on analysts for every new cut of the data. Meanwhile, self-serve tools lack row-level security, citations, and audit trails—so IT blocks broad rollouts. The result is slower decisions and duplicated work across teams.",
    solutionIntro:
      "We design NL-to-SQL (or semantic-layer) experiences on Azure or Google Cloud with tenant-native identity, policy, and logging. Every answer is grounded in approved datasets, traced to source queries, and scoped to the caller’s entitlements.",
    phases: [
      {
        title: "Phase 1 — Model the guardrails",
        body: "Inventory critical metrics, define the semantic layer or approved views, and map roles to data domains. Stand up eval sets for factual accuracy and refusal behavior on out-of-scope questions.",
      },
      {
        title: "Phase 2 — Pilot then broaden",
        body: "Launch to a steering cohort with full query logging and human review queues. Expand by business unit once quality, latency, and cost profiles meet production gates.",
      },
    ],
    keyImplementations: [
      {
        title: "Entitlements-aware retrieval",
        detail: "Respect warehouse ACLs and ABAC rules; never flatten security for convenience.",
      },
      {
        title: "Citation-ready responses",
        detail: "Return traceable references to tables, metrics definitions, and refresh timestamps.",
      },
      {
        title: "Centralized query audit",
        detail: "Immutable logs for who asked what, when, and which model version answered.",
      },
      {
        title: "Fallback to governed dashboards",
        detail: "Route sensitive or low-confidence questions to approved reports or analyst workflows.",
      },
      {
        title: "Cost and latency controls",
        detail: "Cap concurrency, cache hot aggregates, and tier models by question class.",
      },
    ],
    technicalInnovation:
      "We combine cloud-native analytics runtimes with retrieval over curated metadata, plus optional LangGraph flows for multi-step reasoning when a single SQL pass is not enough. Eval loops and shadow traffic let you ship confidently without freezing innovation.",
    impactMetrics: [
      "40–70% reduction in recurring ad-hoc analytics tickets within two quarters (typical enterprise pilot).",
      "Sub-minute answers for governed questions versus multi-day backlogs for bespoke pulls.",
      "Audit-ready access logs and reproducible prompts for regulatory or internal review.",
      "Higher adoption of canonical metrics—fewer conflicting definitions across decks.",
    ],
    impactClosing:
      "Executive analytics stops being a queue and becomes a governed product: fast for leaders, safe for the data office.",
  },
  "customer-support-voice": {
    headline: "Service that scales without sounding robotic",
    subheadline: "Voice and digital assistants grounded in CRM, policies, and escalation paths.",
    contextItalic:
      "Customers expect instant, accurate answers; agents should handle exceptions—not password resets on repeat.",
    challenge:
      "Legacy IVR trees and brittle bots frustrate users and inflate handle times. Generic LLM chat lacks CRM context, brand tone, and compliance controls, so teams hesitate to automate beyond FAQs.",
    solutionIntro:
      "We implement retrieval-augmented voice and chat on your stack—Azure Communication Services / Copilot patterns or Vertex—with CRM tickets, knowledge articles, and policy snippets in the retrieval boundary. Sentiment and intent drive routing; humans keep complex cases.",
    phases: [
      {
        title: "Phase 1 — Instrument and segment",
        body: "Mine transcripts for top intents, failure modes, and compliance phrases. Define allowed actions (read-only vs transactional) and mandatory disclosures.",
      },
      {
        title: "Phase 2 — Automate with guardrails",
        body: "Roll out verified flows with human-in-the-loop for refunds, credits, and edge cases. Measure containment, CSAT, and compliance adherence weekly.",
      },
    ],
    keyImplementations: [
      {
        title: "CRM-grounded answers",
        detail: "Pull account state, entitlements, and open cases before responding.",
      },
      {
        title: "Smart routing",
        detail: "Escalate on sentiment, regulatory keywords, or low model confidence.",
      },
      {
        title: "Multilingual coverage",
        detail: "Shared retrieval with locale-specific response templates where required.",
      },
      {
        title: "Quality monitoring",
        detail: "Sampled human review plus automated rubrics on tone, policy, and accuracy.",
      },
      {
        title: "PCI/PII boundaries",
        detail: "Tokenize or avoid sensitive fields; route payments to existing secure flows.",
      },
    ],
    technicalInnovation:
      "Orchestration layers (including LangGraph where needed) coordinate speech, tool calls, and escalation APIs so the same policy graph powers voice, chat, and agent assist—one brain, many channels.",
    impactMetrics: [
      "20–45% containment on eligible intents after hardening (varies by industry).",
      "Meaningful AHT reduction when agents receive summarized context and suggested replies.",
      "24/7 coverage for tier-1 questions without linear headcount growth.",
      "Consistent policy language across regions and shifts.",
    ],
  },
  "regulated-onboarding-kyc-aml": {
    headline: "Onboarding that auditors can follow",
    subheadline: "Document intelligence, exception queues, and immutable evidence by design.",
    contextItalic:
      "Financial crime and compliance teams need speed and perfection—manual reviews do not scale.",
    challenge:
      "KYC packets arrive in mixed formats; analysts re-key data and chase missing proofs. Regulators expect explainable decisions, complete trails, and timely escalation—spreadsheets and email chains fall short.",
    solutionIntro:
      "We deploy extraction and classification pipelines with human review queues on Azure or GCP, wired to your case system. Every decision links to source pages, model version, and reviewer sign-off for audit replay.",
    phases: [
      {
        title: "Phase 1 — Stabilize intake",
        body: "Unify channels (portal, email, partner feeds), classify document types, and measure field-level accuracy against a golden set.",
      },
      {
        title: "Phase 2 — Automate with oversight",
        body: "Expand straight-through processing for low-risk patterns; route exceptions with structured reasons and SLA timers.",
      },
    ],
    keyImplementations: [
      {
        title: "Evidence lockers",
        detail: "WORM or object-lock storage for finalized packages tied to case IDs.",
      },
      {
        title: "Exception workflows",
        detail: "Configurable queues for AML, fraud, and ops with dual-control where required.",
      },
      {
        title: "Model cards & drift checks",
        detail: "Document training data boundaries and monitor score shifts by segment.",
      },
      {
        title: "Sanctions / PEP hooks",
        detail: "Integrate vendor screening with auditable API calls and retries.",
      },
      {
        title: "Reporting exports",
        detail: "Supervisor-ready summaries without copying data to desktop files.",
      },
    ],
    technicalInnovation:
      "Hybrid approaches pair specialized OCR/IDP with LLM reasoning for unstructured notes—always bounded by schema validation and reviewer UI that shows citations side-by-side with extracted fields.",
    impactMetrics: [
      "30–60% faster time-to-decision on clean applications.",
      "Lower operational risk from missing documents or inconsistent decision notes.",
      "Audit preparation measured in hours, not weeks of reconstruction.",
      "Clear capacity model for peak onboarding volumes.",
    ],
  },
  "supply-chain-demand": {
    headline: "From forecast to replenishment—with guardrails",
    subheadline: "Demand signals, vendor SLAs, and inventory actions in one orchestrated loop.",
    contextItalic:
      "Supply shocks and planner turnover make static spreadsheets a liability.",
    challenge:
      "Forecasts live in spreadsheets, while execution systems (ERP, WMS, TMS) lag reality. Alerts are noisy; buyers lack a single place to see risk, commitments, and alternatives.",
    solutionIntro:
      "We connect forecasting agents and rules to ERP and supplier portals, adding human approvals for large buys or sole-source changes. Playbooks encode thresholds, escalation paths, and logging for retrospectives.",
    phases: [
      {
        title: "Phase 1 — Signal quality",
        body: "Align on hierarchy, lead times, and KPIs. Backtest models against recent disruptions—not only smooth periods.",
      },
      {
        title: "Phase 2 — Close the loop",
        body: "Automate reorders within bands; surface exceptions with recommended actions and supplier context.",
      },
    ],
    keyImplementations: [
      {
        title: "Vendor SLA tracking",
        detail: "Monitor OTIF, penalties, and alternate sources with proactive nudges.",
      },
      {
        title: "Scenario planning",
        detail: "What-if runs for demand spikes, port delays, or commodity moves.",
      },
      {
        title: "Safety stock policies",
        detail: "Codify service levels by SKU class; avoid one-size overrides.",
      },
      {
        title: "Human gates",
        detail: "Require approval for overrides beyond policy or during blackouts.",
      },
      {
        title: "Post-mortems",
        detail: "Structured logs for stockouts and expedites to feed model and process updates.",
      },
    ],
    technicalInnovation:
      "Agent graphs coordinate data pulls, simulations, and write-backs with idempotent APIs—so partial failures do not double-order or leave systems inconsistent.",
    impactMetrics: [
      "Improved fill rates and reduced expedited freight on pilot lanes.",
      "Planner time shifted from spreadsheet wrangling to exceptions and supplier collaboration.",
      "Earlier visibility to shortages—days or weeks of lead time recovered.",
      "Shared metrics for finance and ops on inventory risk.",
    ],
  },
  "field-services-iot-playbooks": {
    headline: "Dispatch, documentation, and close-out—connected",
    subheadline: "IoT signals, work orders, and field evidence in governed playbooks.",
    contextItalic:
      "Technicians should fix problems—not retype the same notes across three systems.",
    challenge:
      "Asset telemetry, dispatch, and customer reporting often sit in silos. Technicians lose time on duplicate data entry; safety and warranty evidence is scattered, slowing claims and audits.",
    solutionIntro:
      "We wire anomaly detection and ticket creation into mobile-first flows with voice capture, photo annotation, and similar-case suggestions. Supervisors approve exceptions; customers get consistent updates.",
    phases: [
      {
        title: "Phase 1 — Instrument the edge",
        body: "Normalize IoT thresholds, map assets to contracts, and validate alert noise levels with operations.",
      },
      {
        title: "Phase 2 — Automate the playbook",
        body: "Close the loop from alert → dispatch → fix → customer confirmation with structured data for billing and compliance.",
      },
    ],
    keyImplementations: [
      {
        title: "Voice-to-work-order",
        detail: "Hands-free capture with domain dictionaries for equipment and fault codes.",
      },
      {
        title: "Photo evidence",
        detail: "Auto-tag images and link to warranty or regulatory packets.",
      },
      {
        title: "Similar-case retrieval",
        detail: "Suggest resolutions from past fixes with confidence scores.",
      },
      {
        title: "Parts & SLA integration",
        detail: "Check inventory and contract entitlements before promising dates.",
      },
      {
        title: "Offline-first UX",
        detail: "Reliable capture in low-connectivity environments with sync safety.",
      },
    ],
    technicalInnovation:
      "Edge events stream through a durable orchestration layer so retries, human approvals, and customer notifications stay consistent even when third-party APIs flap.",
    impactMetrics: [
      "More jobs per tech-day through reduced admin time.",
      "Fewer repeat visits from incomplete close-out data.",
      "Faster mean time to detect and resolve for critical assets.",
      "Cleaner evidence for insurers and regulators.",
    ],
  },
  "finance-close-reconciliation": {
    headline: "Close faster—with defensible numbers",
    subheadline: "Exception-driven matching, controller review, and immutable adjustment logs.",
    contextItalic:
      "Month-end should be predictable, not a heroics exercise in spreadsheets.",
    challenge:
      "High transaction volumes and fragmented subledgers create reconciliation drag. Manual matching hides errors until late in the close; auditors demand traceability that email approvals cannot provide.",
    solutionIntro:
      "We implement ML-assisted matching with clear confidence tiers, structured exception queues, and controller dashboards. Journals and adjustments carry signed rationales, supporting workpapers, and system-of-record links.",
    phases: [
      {
        title: "Phase 1 — Map the close",
        body: "Document sources, cutoffs, and materiality thresholds. Instrument today’s bottlenecks with baseline cycle times.",
      },
      {
        title: "Phase 2 — Automate safely",
        body: "Auto-clear high-confidence items; route exceptions with preparer/reviewer separation and SOX-ready logs.",
      },
    ],
    keyImplementations: [
      {
        title: "Rules + ML hybrid",
        detail: "Deterministic policies first; models only where entropy demands it.",
      },
      {
        title: "Exception aging",
        detail: "SLAs and escalations by entity, account class, and risk rating.",
      },
      {
        title: "Adjustment narratives",
        detail: "Mandatory structured reasons tied to evidence attachments.",
      },
      {
        title: "Subledger connectors",
        detail: "ERP, banks, cards, and intercompany with idempotent ingestion.",
      },
      {
        title: "Close cockpit",
        detail: "Single pane for tasks, blockers, and sign-offs with drill-down.",
      },
    ],
    technicalInnovation:
      "Deterministic replay and hash-chained logs for critical postings make audits faster while preserving the flexibility of assisted matching on messy inputs.",
    impactMetrics: [
      "Reduced close calendar days on pilot entities.",
      "Lower late adjustments and fewer material misstatement risks from manual gaps.",
      "Controller visibility into open items earlier in the cycle.",
      "Audit sample efficiency—evidence retrieved by ID, not email archaeology.",
    ],
  },
  "hr-onboarding-policy": {
    headline: "Day-one readiness without the chaos",
    subheadline: "Provisioning, training, and policy attestations orchestrated with HRIS as source of truth.",
    contextItalic:
      "Great hiring experiences are operational—bad handoffs cost retention and compliance.",
    challenge:
      "New hires bounce between HR, IT, and facilities trackers. Equipment delays, missing trainings, and policy gaps create risk; hiring managers lack a single status view.",
    solutionIntro:
      "We orchestrate onboarding workflows across Workday/SuccessFactors, ITSM, and identity—with checkpoints, reminders, and audit trails. Sensitive steps stay in approved systems; the agent coordinates, it does not store PII unnecessarily.",
    phases: [
      {
        title: "Phase 1 — Blueprint journeys",
        body: "Role-based templates for profiles, devices, access, and training by geography.",
      },
      {
        title: "Phase 2 — Automate with visibility",
        body: "Kick off tasks from hire events; surface stuck steps to HRBPs and IT before day one.",
      },
    ],
    keyImplementations: [
      {
        title: "Identity & access packages",
        detail: "Least-privilege bundles by role with approval for exceptions.",
      },
      {
        title: "Asset logistics",
        detail: "Integration to procurement and shipping with receipt confirmation.",
      },
      {
        title: "Training & attestations",
        detail: "Track completions; block risky access until policies are signed.",
      },
      {
        title: "Manager dashboards",
        detail: "Plain-language readiness scores for each new hire.",
      },
      {
        title: "Offboarding symmetry",
        detail: "Mirrored playbooks to revoke access and recover assets promptly.",
      },
    ],
    technicalInnovation:
      "Durable workflows survive API timeouts and partial completions—new hires never sit half-provisioned without an owner.",
    impactMetrics: [
      "Higher day-one productivity scores from hiring manager surveys.",
      "Fewer access-related incidents from rushed manual grants.",
      "Reduced HR and IT swivel-chair time on status questions.",
      "Compliance evidence for training and policy acceptance.",
    ],
  },
  "marketing-personalization": {
    headline: "Personalization with proof, not guesswork",
    subheadline: "Segments, variants, and experiment readouts flowing into CDP and CRM.",
    contextItalic:
      "Growth teams need speed, but brand and legal need control over what gets said to whom.",
    challenge:
      "Campaign tooling outpaces data hygiene. Audiences drift; experiments are under-documented; sales sees a different customer story than marketing. AI-generated copy amplifies the risk if guardrails are weak.",
    solutionIntro:
      "We connect governed customer 360s to experimentation pipelines with policy templates, approval gates, and automatic capture of variants, holdouts, and lift metrics in the systems sales and finance already trust.",
    phases: [
      {
        title: "Phase 1 — Unify the golden segments",
        body: "Resolve identity, consent flags, and channel eligibility with documented definitions.",
      },
      {
        title: "Phase 2 — Automate creation & learning",
        body: "Generate variants within brand rubrics; route approvals; log outcomes for reuse.",
      },
    ],
    keyImplementations: [
      {
        title: "Consent-aware targeting",
        detail: "Hard stops where regulations or preferences disallow personalization.",
      },
      {
        title: "Brand & legal templates",
        detail: "Structured prompts with mandatory disclosures and tone rules.",
      },
      {
        title: "Experiment registry",
        detail: "Every test has an owner, hypothesis, and success metric.",
      },
      {
        title: "CRM handoff",
        detail: "Sales sees which message variant influenced engagement.",
      },
      {
        title: "Budget guardrails",
        detail: "Caps and alerts on spend or frequency to prevent fatigue.",
      },
    ],
    technicalInnovation:
      "Closed-loop analytics tie exposure data to downstream pipeline impact—so personalization optimizes revenue, not just clicks.",
    impactMetrics: [
      "Faster campaign cycle times with fewer rework loops.",
      "Higher incremental lift where holdouts prove causality.",
      "Reduced compliance escalations from off-brand or non-compliant copy.",
      "Shared vocabulary between growth, finance, and sales.",
    ],
  },
  "reporting-audit-packs": {
    headline: "Board-ready packs from signed-off sources",
    subheadline: "Quarterly and regulatory reporting with lineage, approvals, and reproducibility.",
    contextItalic:
      "When numbers change at the last minute, trust erodes—unless provenance is automatic.",
    challenge:
      "Reporting teams manually assemble decks from exports and emails. Lineage is fuzzy; last-minute fixes lack documentation; regulators and investors ask questions that take days to answer.",
    solutionIntro:
      "We bind narratives to metric definitions, data lineage, and approval workflows. Generated sections cite the warehouse objects and model versions used—so updates are regenerations, not rewrites from memory.",
    phases: [
      {
        title: "Phase 1 — Catalog metrics",
        body: "Authoritative definitions, owners, and freshness SLAs for each KPI in the pack.",
      },
      {
        title: "Phase 2 — Automate assembly",
        body: "Template-driven generation with reviewer roles, redlines, and immutable publish snapshots.",
      },
    ],
    keyImplementations: [
      {
        title: "Lineage graphs",
        detail: "From chart cell back to transform and source system.",
      },
      {
        title: "Approval chains",
        detail: "CFO, controller, and disclosure counsel sign-offs with timestamps.",
      },
      {
        title: "Variance narratives",
        detail: "Assisted drafting grounded in actuals vs plan drivers—not generic text.",
      },
      {
        title: "Version vault",
        detail: "Point-in-time packages for regulatory requests.",
      },
      {
        title: "Access segregation",
        detail: "Producers cannot approve; approvers cannot edit source metrics post-signoff.",
      },
    ],
    technicalInnovation:
      "LLM sections are constrained by structured facts from the warehouse—reducing hallucination risk while still accelerating narrative drafting.",
    impactMetrics: [
      "Shorter close-to-publish timelines for recurring packs.",
      "Faster responses to auditor and investor data requests.",
      "Fewer restatements driven by definition drift.",
      "Higher confidence from boards and committees.",
    ],
  },
  "governed-knowledge-copilot": {
    headline: "Answers your employees can trust",
    subheadline: "SharePoint, SQL, and BigQuery—with ACLs, citations, and escalation paths.",
    contextItalic:
      "A generic chatbot on the intranet creates liability; a governed copilot creates leverage.",
    challenge:
      "Knowledge is scattered across wikis, tickets, and warehouses. Users paste sensitive questions into consumer tools; IT cannot prove who saw what; answers lack citations.",
    solutionIntro:
      "We deploy Microsoft- or Google-native patterns with retrieval that respects directory groups and row-level security. Responses include citations, confidence cues, and routes to experts when retrieval is thin.",
    phases: [
      {
        title: "Phase 1 — Scope corpora",
        body: "Select high-value domains (HR policies, IT runbooks, product specs) and validate ACL mirroring.",
      },
      {
        title: "Phase 2 — Expand with quality bars",
        body: "Add structured data sources with SQL/BQ guardrails; monitor groundedness and user feedback.",
      },
    ],
    keyImplementations: [
      {
        title: "ACL-aware indexing",
        detail: "No retrieval across documents the user cannot open natively.",
      },
      {
        title: "Hybrid search",
        detail: "Keyword + vector for precision on policies and procedures.",
      },
      {
        title: "SQL generation policies",
        detail: "Read-only roles, allowlisted schemas, and automatic explain plans for reviewers.",
      },
      {
        title: "Feedback loops",
        detail: "Thumbs, corrections, and curator workflows to improve corpora.",
      },
      {
        title: "Red-team testing",
        detail: "Prompt suites for exfiltration, policy bypass, and unsafe advice.",
      },
    ],
    technicalInnovation:
      "Orchestration chooses between doc QA, tabular tools, and human handoff dynamically—users get one interface while backends stay specialized and auditable.",
    impactMetrics: [
      "Deflection of repetitive L1/L2 knowledge questions with measurable accuracy.",
      "Shorter ramp time for new hires searching policies and systems.",
      "Reduced shadow IT use of consumer AI for work questions.",
      "Documented access and citations for sensitive domains.",
    ],
  },
  "healthcare-capacity-clinical-ops": {
    headline: "Capacity you can see before it breaks",
    subheadline: "Staffing, credentialing, and supply signals coordinated for patient service levels.",
    contextItalic:
      "Clinical operations need forecasts that respect real-world constraints—not spreadsheet optimism.",
    challenge:
      "Credentialing delays, float pool fragmentation, and supply shortages show up as last-minute chaos. Leaders lack an integrated view tying census, acuity, and staffing rules to actionable schedules.",
    solutionIntro:
      "We integrate EHR, workforce, and supply signals with policy-aware recommendations. Humans approve schedule changes and high-risk substitutions; the system tracks rationale for retrospective review.",
    phases: [
      {
        title: "Phase 1 — Data alignment",
        body: "Harmonize roles, units, and contracts; validate data latency and gaps with operations.",
      },
      {
        title: "Phase 2 — Decision support",
        body: "Surface shortfalls early; recommend shifts, locum triggers, and supply orders within governance.",
      },
    ],
    keyImplementations: [
      {
        title: "Credential-aware staffing",
        detail: "Never propose assignments that violate scope or expirations.",
      },
      {
        title: "Census & acuity models",
        detail: "Blend historical demand with live feeds for surge planning.",
      },
      {
        title: "Supply risk alerts",
        detail: "Early warning on SKUs tied to high-acuity procedures.",
      },
      {
        title: "Command center views",
        detail: "Role-specific dashboards for nursing, perfusion, and admin leads.",
      },
      {
        title: "Audit-friendly logs",
        detail: "Who changed schedules, why, and which policy applied.",
      },
    ],
    technicalInnovation:
      "FHIR and workforce APIs feed a durable planning graph so retries and partial updates do not double-book or leave units uncovered.",
    impactMetrics: [
      "Reduced last-minute premium labor costs on pilot units.",
      "Improved adherence to internal staffing ratios and external reporting.",
      "Earlier detection of credentialing bottlenecks.",
      "Better alignment between clinical and materials management.",
    ],
  },
  "global-payroll-pay-compliance": {
    headline: "Payroll runs you can defend in every jurisdiction",
    subheadline: "Cross-border payroll, statutory rules, and evidence packs—beyond day-one HR tasks.",
    contextItalic:
      "Payroll errors are expensive twice: in corrections and in trust.",
    challenge:
      "Country-specific rules, backdated adjustments, and FX nuances overwhelm centralized teams. Evidence for auditors and tax authorities lives in emails instead of systems.",
    solutionIntro:
      "We orchestrate validation agents across payroll engines, GL mappings, and time systems—flagging variances before funds move. Each run produces a signed calculation snapshot and statutory checklist by country.",
    phases: [
      {
        title: "Phase 1 — Control design",
        body: "Map pay elements, cost centers, and legal entities; define tolerances and escalation owners.",
      },
      {
        title: "Phase 2 — Automated reconciliation",
        body: "Pre-flight checks, anomaly detection, and controller dashboards for multi-country cycles.",
      },
    ],
    keyImplementations: [
      {
        title: "Gross-to-net trace",
        detail: "Line-level ties from input hours to payouts and GL postings.",
      },
      {
        title: "Statutory libraries",
        detail: "Versioned rulesets with effective dates and change logs.",
      },
      {
        title: "FX and cutoff governance",
        detail: "Documented rates, sources, and approval for late adjustments.",
      },
      {
        title: "Evidence bundles",
        detail: "Per-country packets for auditors and tax filings.",
      },
      {
        title: "Segregation of duties",
        detail: "Separate preparer, reviewer, and approver roles with system enforcement.",
      },
    ],
    technicalInnovation:
      "Deterministic payroll math stays in the engine of record; AI assists with reconciliation narratives, variance explanations, and missing-data chases—never silent substitutions.",
    impactMetrics: [
      "Fewer payroll corrections and employee escalations.",
      "Faster audit and tax responses with packaged evidence.",
      "Visibility into country-specific risk before submission deadlines.",
      "Lower operational load on centralized payroll COEs.",
    ],
  },
};

export function getUseCaseStudyDetail(slug: string): UseCaseStudyNarrative | undefined {
  return details[slug];
}
