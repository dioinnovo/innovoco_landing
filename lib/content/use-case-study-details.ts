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
    headline: "Ask your numbers in plain language—get answers in minutes",
    subheadline:
      "Ask in plain English; get charts and governed warehouse answers—faster than a ticket queue.",
    contextItalic:
      "Executives used to email IT or analysts and wait days for a new cut of revenue, pipeline, or margin. Static dashboards help—until the question changes. Today, leading platforms treat “talk to your data” as the default: natural language becomes SQL (or a governed semantic query) so leaders move from hunch to chart without a ticket queue.",
    challenge:
      "Every board meeting spawns new questions. Without a safe self-serve path, leaders either wait on overloaded analysts or export spreadsheets and guess. Traditional “self-serve BI” often stops at pre-built reports; anything custom still means SQL skills or a request queue. Meanwhile, consumer-style chat over data fails audits: no row-level security, no proof of which tables fed an answer, no trail for regulators. So teams throttle access—and strategic decisions slow down while the business keeps moving.",
    solutionIntro:
      "We implement governed conversational analytics: a data analyst–style experience where executives ask in everyday language and receive answers, tables, and visuals grounded in the warehouse and semantic models your CFO already trusts. Under the hood that is natural-language-to-SQL (or a curated semantic layer)—the same pattern major clouds emphasize for enterprise BI: express intent in plain language, get runnable queries against approved data, with identity and policy enforced by the platform. On Azure or Google Cloud we wire tenant-native sign-in, dataset boundaries, and full query logging so every response is entitlement-scoped, traceable, and reproducible.",
    phases: [
      {
        title: "Phase 1 — Model the guardrails",
        body: "Name the metrics that matter for decisions (revenue, pipeline, unit economics, etc.), define approved datasets or a semantic layer, and map roles to what each leader may see. Build evaluation sets so the system is tested on factual accuracy—and knows when to refuse or escalate off-scope questions instead of guessing.",
      },
      {
        title: "Phase 2 — Pilot then broaden",
        body: "Start with a steering group (e.g. finance + revenue ops) with every question and answer logged. Add human review for edge cases until quality and speed meet your bar—then expand by function. Same playbook enterprises use when rolling out AI-assisted analytics: prove trust first, scale second.",
      },
    ],
    keyImplementations: [
      {
        title: "Entitlements-aware retrieval",
        detail:
          "People only see data their role allows—same rules as the warehouse. We never “open the vault” for convenience.",
      },
      {
        title: "Citation-ready responses",
        detail:
          "Answers point to definitions, source tables or models, and when data last refreshed—so a chart in a leadership meeting is explainable, not a black box.",
      },
      {
        title: "Centralized query audit",
        detail:
          "Who asked what, when, and which model version answered—immutable logs for internal review or regulatory questions.",
      },
      {
        title: "Fallback to governed dashboards",
        detail:
          "Low-confidence or highly sensitive asks route to approved reports or analysts instead of risky guesses.",
      },
      {
        title: "Cost and latency controls",
        detail:
          "Throttle concurrency, cache frequent aggregates, and match model depth to the question—so adoption does not blow the budget.",
      },
    ],
    technicalInnovation:
      "We pair cloud analytics runtimes (Fabric-style semantic models, BigQuery, or your warehouse of record) with retrieval over curated metadata and, when one pass is not enough, orchestration for multi-step reasoning. Continuous evaluation and shadow traffic mirror how enterprises ship Copilot-style experiences: measure quality before you widen the audience.",
    impactMetrics: [
      "40–70% fewer recurring “quick data request” tickets within two quarters on typical enterprise pilots—time shifts from queue management to strategy.",
      "Minutes from question to chart for governed asks, versus multi-day email threads with IT or analytics.",
      "Audit-ready logs and reproducible prompts when leadership or regulators ask how a number was produced.",
      "One set of trusted metrics across decks—less conflicting definitions when everyone pulls from the same governed answers.",
    ],
    impactClosing:
      "Leadership stops choosing between speed and control. Executives get analyst-grade answers on demand; data governance keeps the guardrails.",
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
    headline: "See every link in the chain—before the weakest one breaks",
    subheadline: "End-to-end supply chain visibility with AI-powered demand forecasting, route optimization, and automated replenishment.",
    contextItalic:
      "When a single delayed shipment can shut down a production line, spreadsheet-based planning is a liability.",
    challenge:
      "A consumer goods manufacturer operating 12 distribution centers and a mixed fleet of 200+ vehicles was losing $8M annually to forecast errors, excess inventory, and inefficient logistics. Demand planning lived in spreadsheets disconnected from the ERP and warehouse systems. Route planning was manual—dispatchers assigned vehicles based on habit, not data. When EV fleet vehicles were added to meet sustainability targets, range anxiety and charging logistics added a new layer of complexity. Stockouts hit 14% of SKUs monthly, while excess inventory tied up $12M in working capital.",
    solutionIntro:
      "We built a connected supply chain platform that unifies demand signals, inventory positions, supplier commitments, and fleet logistics into a single operational view. AI models forecast demand at the store/SKU level, trigger automated replenishment within policy bands, and optimize delivery routes—including energy-aware planning for the EV fleet that accounts for battery state, charging station availability, and delivery time windows.",
    phases: [
      {
        title: "Phase 1 — Demand visibility and forecast accuracy",
        body: "Connect POS, promotions calendar, weather, and economic signals into a unified forecasting model. Backtest against the past 18 months of disruptions—not just smooth periods. Establish automated safety stock policies by SKU class with human approval gates for large or sole-source purchase orders.",
      },
      {
        title: "Phase 2 — Fleet logistics and replenishment automation",
        body: "Optimize delivery routes across the mixed fleet—conventional and EV vehicles—accounting for load capacity, energy constraints, charging stop requirements, and delivery time windows. Automate replenishment orders within approved bands and surface exceptions with recommended actions and supplier alternatives.",
      },
      {
        title: "Phase 3 — Closed-loop optimization",
        body: "Feed delivery performance, actual vs. forecast accuracy, and supplier OTIF back into the models. Run scenario planning for demand spikes, port delays, or fleet disruptions. Structured post-mortems for every stockout and expedite to continuously improve.",
      },
    ],
    keyImplementations: [
      {
        title: "Store/SKU-level demand forecasting",
        detail: "AI models combine historical sales, promotions, seasonality, weather, and economic indicators—producing probabilistic forecasts that planners trust because they've been backtested against real disruptions.",
      },
      {
        title: "Energy-aware fleet route optimization",
        detail: "For the EV fleet: routes account for battery state, energy consumption per segment, charging station locations, and charging time—ensuring deliveries arrive on time without range anxiety or stranded vehicles.",
      },
      {
        title: "Automated replenishment with human gates",
        detail: "Reorders trigger automatically within approved policy bands. Orders above threshold, sole-source changes, or blackout period overrides require planner approval with full context on why the system recommends the action.",
      },
      {
        title: "Supplier performance tracking",
        detail: "On-time-in-full rates, lead time variability, and quality scores tracked per supplier—with automatic escalation when SLAs slip and pre-qualified alternates surfaced before shortages become emergencies.",
      },
      {
        title: "Scenario planning and post-mortems",
        detail: "What-if simulations for demand spikes, port closures, or fleet reductions. Every stockout and expedite gets a structured post-mortem that feeds model and process improvements.",
      },
    ],
    technicalInnovation:
      "The platform connects demand planning, warehouse management, and fleet logistics through a single orchestration layer. For the EV fleet, the system models each vehicle's energy state across route segments—pruning infeasible routes before dispatchers see them and inserting optimal charging stops when needed. The result is a logistics plan that respects both business constraints (delivery windows, cost targets) and physical constraints (battery capacity, charging infrastructure) simultaneously.",
    impactMetrics: [
      "Forecast error reduced 22% in the first quarter—demand models that account for promotions, weather, and disruptions instead of just historical averages.",
      "$4.5M in inventory cost savings from right-sizing safety stock by SKU class—fewer overstocks, fewer stockouts, less tied-up capital.",
      "Stockout rate dropped from 14% to under 5%—automated replenishment catches shortages days before they reach store shelves.",
      "Fleet logistics costs reduced 15%—energy-aware routing for the EV fleet eliminated range-related delays and optimized charging stops across the network.",
    ],
    impactClosing:
      "Planners spend their time on exceptions and supplier strategy instead of spreadsheet wrangling—and the fleet runs on data, not dispatcher intuition.",
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
  "visual-inspections-property-cv": {
    headline: "See the damage before the dispute",
    subheadline:
      "On-device and cloud computer vision scoring damage severity with adjuster-ready overlays and QA sampling.",
    contextItalic:
      "Scaling inspections means hiring more people—unless every photo becomes a structured data point.",
    challenge:
      "A multi-state roofing and home-services operator was processing thousands of property inspections per month. Manual photo review slowed estimates, missed subtle hail impact on shingles, and generated rework when carrier desk reviewers disagreed on damage extent. Disputes consumed senior adjuster time, delayed settlements, and eroded margins on jobs that should have been straightforward. Field teams captured inconsistent photo sets—different angles, lighting, and labeling conventions per crew—making quality assurance reactive rather than systematic.",
    solutionIntro:
      "We deployed AI-powered inspection tools that guide technicians in the field and score damage severity in real time. The system produces adjuster-ready overlays with QA sampling that carriers can verify independently.",
    phases: [
      {
        title: "Phase 1 — Calibrate on labeled inventory",
        body: "Curated a golden dataset of 12,000+ labeled roof and exterior images spanning hail, wind, and wear across shingle, tile, and metal substrates. Established precision and recall targets by damage class and trained edge-optimized models for on-device guidance alongside cloud models for final scoring.",
      },
      {
        title: "Phase 2 — Field deployment with QA loops",
        body: "Rolled out guided capture on technician devices: real-time bounding boxes prompt re-shoots for under-exposed or off-angle frames. Cloud scoring produces severity heatmaps and measurement overlays. Senior adjusters review a configurable sample; disagreements feed model retraining quarterly.",
      },
    ],
    keyImplementations: [
      {
        title: "Guided photo capture",
        detail:
          "On-device models prompt technicians for missing angles, flag blurry frames, and enforce minimum photo-set completeness before submission.",
      },
      {
        title: "Severity scoring with overlays",
        detail:
          "Cloud-based AI models classify damage type and severity, producing annotated images with measurement assists that attach directly to estimate packages.",
      },
      {
        title: "QA sampling framework",
        detail:
          "Configurable review rates by damage class and confidence band ensure human oversight scales with volume rather than growing linearly.",
      },
      {
        title: "Carrier-ready export",
        detail:
          "Structured JSON plus annotated imagery packaged for Xactimate, Symbility, and custom carrier portals—reducing back-and-forth on evidence.",
      },
      {
        title: "Drift and retraining pipeline",
        detail:
          "Monthly accuracy reports by region and substrate; disagreement logs between model and reviewer feed quarterly retraining cycles.",
      },
    ],
    technicalInnovation:
      "The system works in the field even without connectivity—guiding technicians on-device for immediate feedback, then syncing to the cloud for detailed scoring when connected. Reviewer feedback drives continuous improvement without disrupting production workflows.",
    impactMetrics: [
      "50% faster inspections from guided capture and automated severity scoring.",
      "99.7% detection accuracy on high-severity damage classes after two retraining cycles.",
      "32% reduction in carrier disputes driven by consistent, annotated evidence packages.",
      "Scalable QA—senior adjuster review time grew 15% while inspection volume doubled.",
    ],
    impactClosing:
      "Field teams capture better evidence in less time; carriers receive structured, verifiable packages; and disputes drop because both sides see the same annotated imagery.",
  },
  "cv-quality-control-manufacturing": {
    headline: "Defects caught at line speed, not at the customer",
    subheadline:
      "Deep-learning defect detection on PCBs and assemblies at 10x manual speed with 99.5% accuracy.",
    contextItalic:
      "Tired eyes miss defects; AI at line speed does not.",
    challenge:
      "An electronics manufacturer running high-mix PCB assembly was catching only 85% of defects through manual visual inspection. The 30% false positive rate generated unnecessary rework, inflated scrap costs, and consumed engineering time on disposition. Customer escapes triggered warranty claims and strained key accounts. Inspection was the bottleneck: adding shifts was unsustainable, and existing AOI equipment could not keep pace with product changeovers.",
    solutionIntro:
      "We implemented a deep-learning computer vision system for inline PCB inspection—detecting surface defects, component placement errors, and soldering anomalies at 10x the speed of manual inspection, with configurable confidence thresholds and human review for borderline cases.",
    phases: [
      {
        title: "Phase 1 — Dataset and model baseline",
        body: "Collected and labeled 25,000+ defect images across solder bridges, tombstones, missing components, and surface contamination. Established per-class accuracy targets with production engineering and benchmarked against existing AOI and manual inspection escape rates.",
      },
      {
        title: "Phase 2 — Inline deployment with shadow mode",
        body: "Deployed models in shadow mode alongside manual inspection for four weeks. Validated detection rates, tuned confidence thresholds by defect class, and then transitioned to inline gating with human review on low-confidence calls and new product introductions.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-defect classification",
        detail:
          "Single-pass inference detects solder, placement, polarity, and contamination defects simultaneously—no sequential inspection stages.",
      },
      {
        title: "Changeover adaptation",
        detail:
          "Transfer learning with small labeled sets (200–500 images) enables new product qualification in hours rather than weeks of AOI programming.",
      },
      {
        title: "Confidence-tiered routing",
        detail:
          "High-confidence rejects go to rework; borderline cases route to human inspectors with annotated imagery and suggested defect class.",
      },
      {
        title: "SPC integration",
        detail:
          "Defect counts, types, and locations feed statistical process control charts in real time, enabling upstream root-cause action before yield drops.",
      },
      {
        title: "Model versioning and rollback",
        detail:
          "Every model version is tagged to production lots; rollback to previous version takes under five minutes with no line stoppage.",
      },
    ],
    technicalInnovation:
      "On-line AI scoring delivers sub-200ms per-board results at full production speed. An orchestration layer manages model versions per product, routes exceptions, and streams defect data to quality dashboards—keeping the vision system in sync with manufacturing execution without custom automation logic.",
    impactMetrics: [
      "99.5% defect detection rate, up from 85% with manual inspection.",
      "85% reduction in inspection time per board at equivalent or higher throughput.",
      "$2M annual savings from reduced scrap, rework, and warranty claims.",
      "New product qualification in hours instead of weeks of AOI programming.",
    ],
    impactClosing:
      "Quality shifted from a bottleneck to a competitive advantage—defects are caught at line speed, customer escapes dropped, and engineering time redirected from disposition to process improvement.",
  },
  "medical-imaging-radiology-ai": {
    headline: "Urgent findings surfaced hours sooner",
    subheadline:
      "AI-assisted prioritization and abnormality flagging cutting radiology turnaround by 18 hours.",
    contextItalic:
      "A critical finding buried behind routine scans costs hours no patient can afford.",
    challenge:
      "A 700-bed academic medical center processed 500+ daily imaging studies across chest X-rays, CT, and MRI. Average turnaround was 36 hours, with urgent findings sometimes buried in queue. Treatment delays caused measurable harm—delayed pneumothorax drainage, missed early-stage nodules, and patient dissatisfaction scores that lagged peer institutions. Radiologist recruitment could not keep pace with volume growth.",
    solutionIntro:
      "We implemented an AI-assisted radiology platform for chest X-rays and CT scans. AI models flag abnormalities for radiologist review, reprioritize the worklist by clinical urgency, and provide structured pre-reads that reduce per-study interpretation time.",
    phases: [
      {
        title: "Phase 1 — Validation on institutional data",
        body: "Retrospectively validated models against 18 months of finalized radiology reports. Established sensitivity and specificity thresholds by finding class (pneumothorax, nodule, consolidation, effusion) with radiology leadership sign-off before any clinical integration.",
      },
      {
        title: "Phase 2 — Worklist integration and monitoring",
        body: "Integrated AI triage scores into PACS worklist ordering. Radiologists see flagged studies first with annotated pre-reads. A monitoring dashboard tracks concordance between AI flags and final reads; discordant cases feed quarterly model review.",
      },
      {
        title: "Phase 3 — Expanded modalities",
        body: "Extended coverage to CT pulmonary angiography and abdominal CT with institution-specific fine-tuning, maintaining the same validation and monitoring rigor.",
      },
    ],
    keyImplementations: [
      {
        title: "Urgency-based worklist reordering",
        detail:
          "AI confidence scores reprioritize the PACS reading queue so critical findings surface within minutes of acquisition, not hours.",
      },
      {
        title: "Annotated pre-reads",
        detail:
          "Structured overlays highlight regions of interest with finding-class labels, reducing per-study cognitive load without replacing radiologist judgment.",
      },
      {
        title: "Concordance monitoring",
        detail:
          "Automated comparison of AI flags versus final radiology reports tracks sensitivity drift and generates alerts when performance degrades.",
      },
      {
        title: "HIPAA-compliant architecture",
        detail:
          "All inference runs within the institution's HIPAA boundary; no PHI leaves the secure enclave. BAAs executed with all infrastructure providers.",
      },
    ],
    technicalInnovation:
      "AI models run directly within the hospital's imaging network—no data leaves the secure environment, no new interfaces for radiologists. Studies are scored and annotated within the same system radiologists already use.",
    impactMetrics: [
      "90%+ diagnostic sensitivity across primary finding classes after institutional validation.",
      "18-hour reduction in average turnaround for flagged urgent studies.",
      "40% fewer diagnostic errors on studies where AI pre-read was available.",
      "Radiologist throughput increased without additional FTEs, absorbing 12% annual volume growth.",
    ],
    impactClosing:
      "Radiologists still make every diagnosis—but they see the most urgent studies first, with structured pre-reads that make each minute of reading time more effective.",
  },
  "population-health-management": {
    headline: "Risk stratification that drives shared savings",
    subheadline:
      "Predictive analytics across 125K+ beneficiaries driving $4.2M in shared savings for an ACO.",
    contextItalic:
      "Reactive care management guarantees missed savings and missed patients.",
    challenge:
      "An ACO managing 125,000 Medicare beneficiaries struggled to identify high-risk patients across multiple EHR platforms (Epic, Cerner, Allscripts). Care management teams allocated resources reactively—after hospitalizations—rather than proactively. Quality scores lagged peers, shared savings targets were missed for two consecutive years, and care managers spent more time assembling patient profiles than intervening.",
    solutionIntro:
      "We built a predictive analytics platform that integrates data from multiple EHRs, claims feeds, pharmacy records, and social determinant proxies. Chronic disease risk scoring, gap-in-care identification, and automated outreach workflows give care managers prioritized action lists grounded in clinical evidence.",
    phases: [
      {
        title: "Phase 1 — Data unification and risk model",
        body: "Harmonized patient records across three EHR platforms using FHIR and custom ETL. Trained risk models on 36 months of claims and clinical data, validated against actual utilization with clinician review of top-decile predictions.",
      },
      {
        title: "Phase 2 — Care management integration",
        body: "Embedded risk scores and care gap alerts into existing care management workflows. Automated outreach for preventive services (annual wellness visits, A1C screening, medication adherence) with attribution tracking to measure intervention effectiveness.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-EHR data harmonization",
        detail:
          "FHIR-based integration layer normalizes patient records across Epic, Cerner, and Allscripts without requiring EHR customization.",
      },
      {
        title: "Chronic disease risk scoring",
        detail:
          "Ensemble models predict 12-month hospitalization risk for CHF, COPD, diabetes, and CKD—updated weekly as new clinical data arrives.",
      },
      {
        title: "Gap-in-care engine",
        detail:
          "Rules and ML surface overdue screenings, missed medications, and incomplete care plans against HEDIS and ACO quality measures.",
      },
      {
        title: "Attribution and impact tracking",
        detail:
          "Every outreach and intervention is logged with downstream utilization outcomes, enabling cost-per-avoided-event calculations for shared savings reporting.",
      },
      {
        title: "Clinician-facing dashboards",
        detail:
          "Care managers see prioritized patient lists with risk drivers, recommended actions, and contact history—not raw model scores.",
      },
    ],
    technicalInnovation:
      "The platform queries across EHR systems without centralizing all patient data in one place—reducing compliance scope while enabling cross-system risk scoring. Models update incrementally on weekly data rather than requiring expensive full rebuilds.",
    impactMetrics: [
      "30% reduction in care management costs through better targeting of high-risk patients.",
      "22% increase in preventive care completion rates across the beneficiary population.",
      "$4.2M in shared savings generated in the first full performance year.",
      "Quality scores improved from below-median to top-quartile on five of eight ACO measures.",
    ],
    impactClosing:
      "The ACO shifted from reactive to proactive care management—interventions reach the right patients before acute events, and shared savings fund further program expansion.",
  },
  "sepsis-early-warning-system": {
    headline: "Hours of warning before sepsis declares itself",
    subheadline:
      "Real-time EHR-driven alerts detecting sepsis 6–12 hours before clinical manifestation.",
    contextItalic:
      "Every hour of delayed sepsis treatment increases mortality by 4–8%; early recognition saves lives.",
    challenge:
      "A 350-bed hospital had a sepsis mortality rate of 28%—well above the national average of 20%. Delayed recognition occurred in 40% of cases, with nurses and residents relying on intermittent vital sign checks and static screening criteria. Alert fatigue from existing rules-based systems meant that clinicians often dismissed or delayed response to early warning signals. Each preventable sepsis death cost the institution an estimated $35,000–$50,000 in excess care and carried incalculable human cost.",
    solutionIntro:
      "We deployed a real-time sepsis detection system ingesting EHR data streams—vital signs, lab results, medication orders, and clinical notes—to generate alerts 6–12 hours before clinical manifestation. The system integrates directly into nursing and physician workflows with structured handoff protocols for rapid antibiotic administration.",
    phases: [
      {
        title: "Phase 1 — Retrospective validation and threshold tuning",
        body: "Validated models on 24 months of ICU and med-surg data, calibrating alert thresholds to achieve high sensitivity while limiting false alerts to a rate clinicians would sustain. Clinical champions reviewed every threshold decision.",
      },
      {
        title: "Phase 2 — Bedside integration and response protocol",
        body: "Integrated alerts into the EHR and nurse call systems with structured response bundles: lactate draw, blood cultures, and antibiotic administration within one hour of alert. Tracked bundle compliance and clinical outcomes weekly.",
      },
    ],
    keyImplementations: [
      {
        title: "Continuous vital sign fusion",
        detail:
          "Streaming integration of heart rate, blood pressure, temperature, respiratory rate, and SpO2 with lab trends (WBC, lactate, creatinine) for multi-signal deterioration scoring.",
      },
      {
        title: "Clinical note NLP",
        detail:
          "Extracts early indicators from nursing assessments and physician notes—altered mental status, skin changes, fluid balance concerns—that structured data alone would miss.",
      },
      {
        title: "Alert fatigue management",
        detail:
          "Tiered alerting with suppression logic: low-risk scores generate passive chart flags; high-risk scores trigger active nurse and physician notifications with recommended actions.",
      },
      {
        title: "Bundle compliance tracking",
        detail:
          "Automated measurement of time from alert to lactate draw, cultures, and antibiotic administration—feeding quality dashboards and individual case review.",
      },
    ],
    technicalInnovation:
      "The system scores patients continuously as new vitals and lab results arrive—updating risk in under a minute. It handles the messy reality of clinical data (irregular timing, missing values) without the blind spots that batch-based approaches introduce.",
    impactMetrics: [
      "Sepsis mortality rate reduced from 28% to 18%—a 36% relative improvement.",
      "6–12 hour early detection window enabling proactive antibiotic administration.",
      "35% reduction in ICU length of stay for sepsis patients detected by the system.",
      "Bundle compliance (lactate + cultures + antibiotics within 1 hour) reached 82%, up from 45%.",
    ],
    impactClosing:
      "Clinicians still diagnose and treat—but they act hours earlier, with structured protocols that convert alerts into life-saving interventions before sepsis becomes refractory.",
  },
  "load-renewable-forecasting": {
    headline: "Forecasts that keep the lights on and costs down",
    subheadline:
      "Ensemble models with weather and DER signals reducing MAPE 14% and saving $4.2M in fuel and imbalance.",
    contextItalic:
      "Yesterday's forecast models cannot keep pace with today's grid volatility.",
    challenge:
      "An investor-owned utility in an RTO footprint saw forecast error growing as distributed solar and EV charging shifted load shapes. Manual analyst tweaks did not scale across zones; day-ahead MAPE was drifting upward, and imbalance penalties and unnecessary fuel commitments were costing $8M+ annually. Weather volatility compounded the problem—models calibrated on historical norms underperformed during extreme heat, cold, and cloud events.",
    solutionIntro:
      "We built ensemble forecasting models combining weather ensembles, behind-the-meter DER signals, and calendar features—published to market operations APIs with confidence bands so dispatchers and traders can act on uncertainty, not just point estimates.",
    phases: [
      {
        title: "Phase 1 — Data integration and baseline",
        body: "Ingested SCADA, AMI, weather API, and DER registration data. Established MAPE baselines by zone and horizon (day-ahead, 4-hour, 1-hour). Identified where legacy models underperformed most—typically high-DER feeders and weather-sensitive zones.",
      },
      {
        title: "Phase 2 — Model deployment and operations handoff",
        body: "Deployed ensemble models with automated retraining on rolling windows. Confidence bands publish alongside point forecasts. Dispatchers receive zone-level dashboards with drill-down to feeder anomalies. Full rollout completed in six weeks after parallel-run validation.",
      },
    ],
    keyImplementations: [
      {
        title: "Weather ensemble integration",
        detail:
          "Blends multiple numerical weather prediction sources with location-specific bias correction, reducing forecast error during extreme and transitional weather events.",
      },
      {
        title: "Behind-the-meter DER signals",
        detail:
          "Ingests inverter telemetry and smart meter net-load to disaggregate rooftop solar and EV charging from gross load, improving net-load accuracy on high-DER feeders.",
      },
      {
        title: "Confidence bands and scenario APIs",
        detail:
          "Probabilistic forecasts with P10/P50/P90 bands published to dispatch and trading systems, enabling risk-aware unit commitment and hedging.",
      },
      {
        title: "Automated retraining",
        detail:
          "Rolling-window retraining triggered by accuracy drift or seasonal transitions, with model versioning and rollback. No manual intervention for routine updates.",
      },
      {
        title: "Regulatory-ready documentation",
        detail:
          "Model assumptions, data lineage, and performance logs exportable for rate case filings and reliability reporting.",
      },
    ],
    technicalInnovation:
      "A unified data layer aligns grid telemetry, smart meter readings, weather, and distributed energy data to common timestamps—solving the timing and missing-data problems that degrade forecasts in real operations. Model weightings adapt automatically by zone and weather pattern.",
    impactMetrics: [
      "14% MAPE reduction across all forecast horizons, with largest gains on high-DER zones.",
      "$4.2M annual savings from reduced fuel burn, imbalance penalties, and reserve procurement.",
      "Full production rollout in six weeks after parallel-run validation.",
      "Confidence bands adopted by trading desk for day-ahead and real-time hedging decisions.",
    ],
    impactClosing:
      "Dispatchers and traders now operate with forecasts that reflect today's grid—not yesterday's—and uncertainty bands that turn volatility from a cost into a manageable risk.",
  },
  "grid-asset-health-monitoring": {
    headline: "Condition-based maintenance for the grid's most critical assets",
    subheadline:
      "Unified DGA, partial discharge, and thermal data into survival-style risk scores for substations and lines.",
    contextItalic:
      "Calendar-based maintenance treats every asset the same; condition data reveals which ones actually need attention.",
    challenge:
      "A regional transmission operator managed 1,200+ substation assets and 4,000 miles of line with condition data scattered across dissolved gas analysis (DGA) labs, partial discharge monitors, thermal imaging reports, and CMMS work history. Maintenance was calendar-driven; critical failures still caused unplanned outages averaging 14 hours per event. Planners lacked a unified risk view, so capital was allocated by age and replacement cost rather than actual condition.",
    solutionIntro:
      "We unified DGA, partial discharge, thermal, and work history into health scores with survival-style risk models that estimate remaining useful life and recommend maintenance actions—integrated into CMMS and crew scheduling with planner overrides and audit-ready rationale.",
    phases: [
      {
        title: "Phase 1 — Data unification and health index",
        body: "Integrated DGA lab results, online partial discharge monitors, thermal imaging, nameplate data, and 10 years of CMMS work orders into a normalized asset health index. Validated against known failure modes and recent outage investigations with reliability engineering.",
      },
      {
        title: "Phase 2 — Risk scoring and maintenance optimization",
        body: "Trained survival models on censored failure data to estimate probability of failure over 1-, 3-, and 5-year horizons. Risk scores drive prioritized maintenance recommendations published to CMMS with cost-benefit rationale for each intervention.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-source condition fusion",
        detail:
          "Normalized scoring across DGA, partial discharge, thermal, and visual inspection data with configurable weights by asset class and vintage.",
      },
      {
        title: "Survival-style risk models",
        detail:
          "Probability-of-failure estimates over multiple horizons, handling censored data (assets that have not yet failed) correctly—unlike naive classification approaches.",
      },
      {
        title: "CMMS and crew integration",
        detail:
          "Maintenance recommendations publish directly to work management with priority, estimated cost, and supporting condition evidence for planner review.",
      },
      {
        title: "Regulatory evidence packs",
        detail:
          "Exportable asset health reports with data lineage and model assumptions for rate case filings, NERC compliance, and public utility commission inquiries.",
      },
      {
        title: "Threshold alerting",
        detail:
          "Real-time alerts when DGA or partial discharge readings cross configurable thresholds, with escalation paths to control room and asset management.",
      },
    ],
    technicalInnovation:
      "Survival models handle the censored-data problem inherent in asset health: most assets have not yet failed, so standard classification yields biased estimates. By modeling time-to-event with covariates, the system produces calibrated risk curves that maintenance planners and regulators can interrogate.",
    impactMetrics: [
      "22% reduction in emergency trips and unplanned outages on monitored assets.",
      "11% shift in O&M spend from reactive to proactive maintenance.",
      "100% asset coverage with unified health scores across all substation and line assets.",
      "Regulatory evidence preparation reduced from weeks to hours with exportable condition reports.",
    ],
    impactClosing:
      "Maintenance planners allocate capital based on actual asset condition—not age or calendar cycles—and regulators see defensible evidence that reliability investment is targeted where it matters most.",
  },
  "der-visibility-operations": {
    headline: "Interconnection at the speed the queue demands",
    subheadline:
      "Automated hosting-capacity screens cutting study time 70% and tripling interconnection throughput.",
    contextItalic:
      "Solar and storage are interconnecting faster than most utilities can process the paperwork.",
    challenge:
      "A municipal utility with rapidly growing rooftop solar faced a 14-month interconnection queue. Hosting capacity studies were manual: engineers ran load flow models one feeder at a time, with inconsistent assumptions across analysts. Planners lacked feeder-level headroom visibility under realistic heat and cloud scenarios, and developers escalated delays to the public utility commission. The utility needed to triple throughput without tripling engineering headcount.",
    solutionIntro:
      "We automated hosting capacity screens by combining load flow snapshots, inverter telemetry, and scenario libraries into a platform that pre-screens applications, flags feeders approaching limits, and produces planner-reviewable reports with override capabilities and audit logs.",
    phases: [
      {
        title: "Phase 1 — Scenario library and baseline automation",
        body: "Built a library of load flow scenarios (peak load, minimum load, high-solar, cloud transient) calibrated to the utility's feeder models. Automated the technical screen for standard residential and small commercial applications against pre-computed hosting maps.",
      },
      {
        title: "Phase 2 — Real-time visibility and queue management",
        body: "Connected inverter telemetry and AMI net-load to update hosting headroom in near-real-time. Integrated with the interconnection queue system so applications route automatically to pre-screen, detailed study, or planner review based on feeder status.",
      },
    ],
    keyImplementations: [
      {
        title: "Pre-computed hosting maps",
        detail:
          "Feeder-level hosting capacity updated nightly from latest load flow results and telemetry, enabling instant pre-screening of standard applications.",
      },
      {
        title: "Scenario-based stress testing",
        detail:
          "Automated runs for heat, cloud, and coincident-DER scenarios surface feeders approaching limits before applications arrive.",
      },
      {
        title: "Planner override and audit",
        detail:
          "Engineers can override automated decisions with structured rationale; every override is logged for regulatory transparency.",
      },
      {
        title: "Queue integration",
        detail:
          "Interconnection applications route to the appropriate study tier automatically based on feeder headroom and application size.",
      },
      {
        title: "Developer-facing portal",
        detail:
          "Self-service hosting capacity lookup by location, reducing pre-application inquiries and setting realistic expectations before formal submission.",
      },
    ],
    technicalInnovation:
      "Pre-computed hosting maps avoid the bottleneck of on-demand load flow runs for standard applications. A lightweight orchestration layer triggers detailed studies only when pre-screens identify potential constraint violations, concentrating engineering time where it adds value.",
    impactMetrics: [
      "70% reduction in per-study engineering time through automated pre-screening.",
      "3x interconnection throughput without additional engineering headcount.",
      "Zero critical voltage or thermal violations on approved interconnections.",
      "Queue backlog cleared from 14 months to under 4 months within two quarters.",
    ],
    impactClosing:
      "Engineers spend their time on complex studies that require judgment—not routine screens that a well-calibrated model handles faster and more consistently.",
  },
  "fnol-document-intelligence": {
    headline: "Structured claims from unstructured chaos",
    subheadline:
      "Speech-to-structure and document AI cutting FNOL cycle time 42% with 99.2% field completeness.",
    contextItalic:
      "Claims arrive in every format from every channel; adjusters waste hours just normalizing the intake.",
    challenge:
      "A regional P&C carrier received FNOL through email, portal, phone, and agent channels with no consistent structure. Adjusters spent 35% of their time normalizing loss details before they could begin coverage analysis. Missing fields triggered rework cycles averaging 2.3 touches per claim. Severity and peril classification varied by handler, making downstream triage inconsistent and reporting unreliable.",
    solutionIntro:
      "We deployed document and speech-to-structure models with business rules for peril classification, coverage hints, and severity scoring—feeding core and CMS systems with validated JSON and confidence scores. Human review queues handle low-confidence extractions and edge-case perils.",
    phases: [
      {
        title: "Phase 1 — Channel normalization and extraction",
        body: "Built intake pipelines for each channel: speech-to-text for phone FNOL, OCR and NLP for emailed documents, and structured parsing for portal and agent submissions. Unified output schema with field-level confidence scores and source traceability.",
      },
      {
        title: "Phase 2 — Triage automation and quality monitoring",
        body: "Added peril classification, severity scoring, and handler routing rules. Adjusters review a configurable sample; extraction accuracy is tracked by field and channel with weekly quality reports driving model tuning.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-channel intake",
        detail:
          "Phone, email, portal, and agent submissions normalized into a single structured schema with channel-specific extraction models.",
      },
      {
        title: "Field-level confidence scoring",
        detail:
          "Every extracted field carries a confidence score; low-confidence fields route to human review queues with source context for rapid verification.",
      },
      {
        title: "Peril and severity classification",
        detail:
          "AI models classify peril type and estimate severity from loss descriptions, enabling automated routing to specialized handlers.",
      },
      {
        title: "Core and CMS integration",
        detail:
          "Validated JSON payloads create claims, attach documents, and populate exposure records in Guidewire, Duck Creek, and custom core systems via API.",
      },
      {
        title: "Quality monitoring dashboard",
        detail:
          "Weekly accuracy reports by field, channel, and peril type with drill-down to individual extraction decisions and reviewer overrides.",
      },
    ],
    technicalInnovation:
      "A unified extraction schema decouples channel-specific intake from downstream business rules—so adding a new channel (e.g., chat, mobile app) requires only an intake adapter, not changes to triage or routing logic. Confidence-tiered review ensures human effort scales with uncertainty, not volume.",
    impactMetrics: [
      "42% reduction in FNOL cycle time from submission to adjuster assignment.",
      "28% reduction in manual triage effort through automated peril and severity classification.",
      "99.2% field completeness on auto-processed claims, eliminating most rework touches.",
      "Consistent triage decisions across handlers and channels, improving downstream reporting accuracy.",
    ],
    impactClosing:
      "Adjusters start coverage analysis minutes after FNOL—not hours—with structured, complete claim records that reduce rework and support faster, fairer settlements.",
  },
  "damage-assessment-field-capture": {
    headline: "Field evidence that carriers trust on first submission",
    subheadline:
      "Guided photo sets, auto-tagging, and draft narratives tripling desk throughput for public adjusters.",
    contextItalic:
      "Incomplete field evidence means rework, delays, and carriers who push back on every submission.",
    challenge:
      "A multi-state public adjusting firm handled 2,000+ property claims annually. Photo and estimate packets varied wildly by adjuster—different angles, missing context shots, inconsistent labeling. Desk reviewers spent 45 minutes per file organizing and supplementing field packages before carrier submission. Rework from incomplete submissions added 8–12 days to average settlement timelines and strained carrier relationships.",
    solutionIntro:
      "We built standardized field capture with guided photo sets, auto-tagging of damage types and locations, and draft narrative generation for carrier packages—reviewed and edited by senior adjusters before submission, with full version history and audit trail.",
    phases: [
      {
        title: "Phase 1 — Guided capture and auto-tagging",
        body: "Deployed mobile capture with shot-list guidance by claim type (wind, hail, water, fire). On-device models auto-tag damage type, severity, and location. Completeness checks prevent submission of incomplete photo sets.",
      },
      {
        title: "Phase 2 — Narrative generation and desk workflow",
        body: "Added draft narrative generation from tagged photos and field notes. Desk reviewers edit and approve rather than write from scratch. Version-controlled carrier packages track every edit with reviewer attribution.",
      },
    ],
    keyImplementations: [
      {
        title: "Shot-list guidance",
        detail:
          "Claim-type-specific photo checklists ensure field adjusters capture every required angle and context shot before leaving the property.",
      },
      {
        title: "Auto-tagging and classification",
        detail:
          "On-device models tag damage type (hail, wind, water), severity, and building component—reducing manual labeling from 20 minutes to under 2 minutes per file.",
      },
      {
        title: "Draft narrative generation",
        detail:
          "Structured narratives generated from tagged imagery and field notes, formatted for carrier submission standards with editable sections for senior adjuster review.",
      },
      {
        title: "Version-controlled packages",
        detail:
          "Every photo, narrative, and estimate revision is version-tracked with reviewer identity and timestamp—supporting dispute resolution and E&O defense.",
      },
      {
        title: "Offline-first architecture",
        detail:
          "Full capture and tagging functionality works without connectivity; sync handles conflict resolution when the device reconnects.",
      },
    ],
    technicalInnovation:
      "Edge inference for tagging and completeness checks means field adjusters get real-time guidance even on rural properties with no cell signal. A sync engine with conflict resolution ensures no work is lost, and desk reviewers see complete packages within minutes of the adjuster returning to connectivity.",
    impactMetrics: [
      "3.1x desk throughput—reviewers process three claims in the time one previously required.",
      "18% reduction in carrier rework requests from more complete, consistent submissions.",
      "100% version history on all carrier-submitted packages for E&O and dispute support.",
      "Field capture time reduced 25% through guided shot lists and automated completeness checks.",
    ],
    impactClosing:
      "Field adjusters capture better evidence faster; desk reviewers edit instead of rebuild; and carriers receive packages that settle on first review more often.",
  },
  "fraud-siu-link-analytics": {
    headline: "Fewer false flags, more organized-scheme catches",
    subheadline:
      "Graph-based link analysis with explainable risk tiers reducing false referrals 31% and lifting hit rate 22%.",
    contextItalic:
      "Rules catch individual red flags; organized fraud rings exploit the gaps between them.",
    challenge:
      "A national TPA processed 400,000+ claims annually with a rules-based fraud flagging system that produced a 68% false positive rate. SIU investigators spent the majority of their time dismissing false referrals rather than pursuing actionable cases. Meanwhile, organized fraud schemes involving coordinated claimants, staged accidents, and complicit vendors were identified only after significant payouts—often by external audit rather than internal detection.",
    solutionIntro:
      "We implemented graph-style link analysis across parties, vendors, and historical claims with explainable risk tiers and playbook-driven referrals. The system surfaces relationship patterns that rules-based approaches miss while providing investigators with visual evidence and structured case summaries.",
    phases: [
      {
        title: "Phase 1 — Graph construction and historical analysis",
        body: "Built a claims knowledge graph linking claimants, adjusters, attorneys, medical providers, and repair vendors across 5 years of claims history. Identified known fraud patterns (rings, staged losses, provider mills) and calibrated anomaly detection against confirmed SIU outcomes.",
      },
      {
        title: "Phase 2 — Real-time scoring and investigator workflow",
        body: "Deployed real-time link analysis on new claims as they enter the system. Risk tiers with explainable features route referrals to SIU with visual relationship maps and structured case summaries. Investigators provide outcome feedback that improves model precision quarterly.",
      },
    ],
    keyImplementations: [
      {
        title: "Claims knowledge graph",
        detail:
          "Entities (claimants, providers, vendors, vehicles, addresses, phone numbers) linked across millions of claims with relationship strength and recency scoring.",
      },
      {
        title: "Explainable risk tiers",
        detail:
          "Each referral includes the specific relationship patterns, anomaly signals, and historical context that drove the risk score—not a black-box number.",
      },
      {
        title: "Visual investigation maps",
        detail:
          "Interactive graph visualizations let investigators explore connections, filter by relationship type, and drill into individual claims within a network.",
      },
      {
        title: "Playbook-driven referrals",
        detail:
          "Different fraud typologies (staged loss, provider mill, identity fraud) generate tailored investigation checklists with recommended evidence collection steps.",
      },
      {
        title: "Outcome feedback loop",
        detail:
          "Investigator disposition (confirmed fraud, suspicious, cleared) feeds back to model training, improving precision with each quarterly update.",
      },
    ],
    technicalInnovation:
      "Relationship mapping detects clusters of connected entities that traditional flat-file analysis cannot see. Every network-level risk score decomposes into human-readable relationship evidence—critical for SIU teams that must document rationale for every investigation opened.",
    impactMetrics: [
      "31% reduction in false referrals, freeing investigator capacity for actionable cases.",
      "22% improvement in fraud hit rate on referred cases.",
      "Model refresh cycle under 8 weeks, incorporating latest confirmed outcomes.",
      "Organized-scheme detection identified three multi-million-dollar rings in the first year that rules-based systems had missed.",
    ],
    impactClosing:
      "Investigators spend their time on cases that matter—with visual evidence and structured summaries that accelerate investigation and support prosecution or recovery.",
  },
  "real-time-fraud-detection": {
    headline: "Sub-100ms scoring that catches fraud and keeps customers moving",
    subheadline:
      "ML-powered transaction scoring across cards, ACH, and wires delivering $18M annual savings at 95%+ detection.",
    contextItalic:
      "Block too many transactions and customers leave; miss fraud and losses mount.",
    challenge:
      "A regional bank with $25M in annual fraud losses across credit card, ACH, and wire channels was running a rules-based detection system with a 65% false positive rate. Legitimate transactions were declined at a rate that drove customer attrition and call center volume. Fraud analysts spent 80% of their time clearing false alerts rather than investigating genuine fraud. Meanwhile, sophisticated attacks—account takeover, synthetic identity, and authorized push payment fraud—exploited the rule system's inability to detect behavioral anomalies.",
    solutionIntro:
      "We deployed ML-powered real-time fraud detection analyzing payment patterns, merchant categories, geographic anomalies, device fingerprints, and behavioral biometrics. Sub-100ms transaction scoring integrates with the bank's authorization flow across all payment channels, with continuous model retraining as fraud tactics evolve.",
    phases: [
      {
        title: "Phase 1 — Model development and shadow scoring",
        body: "Trained AI models on 24 months of labeled transaction data across all channels. Deployed in shadow mode alongside the existing rules engine for six weeks, measuring detection lift and false positive reduction before any production impact.",
      },
      {
        title: "Phase 2 — Production deployment and adaptive learning",
        body: "Replaced rules-based scoring with AI models in the authorization path. Implemented continuous retraining on confirmed fraud outcomes, with champion/challenger model management and automated rollback if performance degrades.",
      },
      {
        title: "Phase 3 — Behavioral biometrics and cross-channel fusion",
        body: "Added device fingerprinting and session behavior features for card-not-present and digital banking channels. Cross-channel risk signals (e.g., address change followed by wire) feed composite scores that capture multi-step attack patterns.",
      },
    ],
    keyImplementations: [
      {
        title: "Sub-100ms inline scoring",
        detail:
          "Models deployed on low-latency inference infrastructure score every transaction within the authorization timeout window—no batch delays or post-transaction-only detection.",
      },
      {
        title: "Multi-channel coverage",
        detail:
          "Unified scoring across credit card, debit, ACH, wire, and P2P channels with channel-specific feature engineering and shared behavioral profiles.",
      },
      {
        title: "Adaptive retraining",
        detail:
          "Confirmed fraud outcomes trigger incremental model updates; champion/challenger framework ensures new models outperform incumbents before promotion.",
      },
      {
        title: "Explainable decisioning",
        detail:
          "Top contributing features accompany every score, enabling fraud analysts to understand and document the basis for blocks and alerts—supporting SR 11-7 model governance.",
      },
      {
        title: "Dynamic risk thresholds",
        detail:
          "Configurable thresholds by channel, customer segment, and transaction type allow the bank to balance fraud prevention with customer experience by product line.",
      },
    ],
    technicalInnovation:
      "A unified data layer computes 200+ real-time and historical signals per transaction in under 10 milliseconds—combining session behavior, spending velocity, and identity patterns. This ensures the AI sees the same data in production that it was trained on, preventing the drift that degrades fraud models over time.",
    impactMetrics: [
      "$18M annual fraud savings across all payment channels.",
      "95%+ fraud detection rate, up from 72% with the rules-based system.",
      "80% reduction in false positives, cutting customer friction and call center volume.",
      "Sub-100ms scoring latency with 99.99% availability SLA.",
    ],
    impactClosing:
      "The bank stopped choosing between security and experience. Fraud losses dropped by $18M annually while legitimate transactions flowed faster—and the system adapts as attack tactics evolve.",
  },
  "credit-risk-modeling": {
    headline: "Credit decisions that expand access without expanding risk",
    subheadline:
      "Alternative data credit scoring lifting approvals 25% while holding defaults below industry average.",
    contextItalic:
      "Millions of creditworthy people are invisible to traditional scoring—alternative data changes that.",
    challenge:
      "A digital lender was rejecting 40% of applicants who could safely receive credit because traditional FICO scores could not assess thin-file consumers. The lender served a demographic with high proportions of recent immigrants, gig workers, and young adults—populations with limited bureau history but verifiable financial behavior. Competitors using alternative data were capturing market share, and regulators expected the lender to demonstrate fair access efforts.",
    solutionIntro:
      "We built an alternative credit risk model incorporating utility payments, rent history, bank transaction cash flow patterns, education, and employment signals—with Fair Lending compliance baked into the model development process, including ECOA and disparate impact testing at every stage.",
    phases: [
      {
        title: "Phase 1 — Feature engineering and compliance framework",
        body: "Identified and validated alternative data sources (utility, rent, bank transaction, employment). Established a Fair Lending testing framework with legal counsel: every candidate feature tested for disparate impact before inclusion. Built baseline models with and without alternative data to quantify approval lift and default impact.",
      },
      {
        title: "Phase 2 — Production deployment with monitoring",
        body: "Deployed the alternative scoring model alongside traditional scoring. Applicants scored by both models; the alternative model expands approvals for thin-file applicants who would otherwise be declined. Ongoing monitoring tracks default rates, approval demographics, and model drift by segment.",
      },
    ],
    keyImplementations: [
      {
        title: "Alternative data integration",
        detail:
          "Utility payment history, rent reporting, bank transaction cash flow, and employment verification integrated with consumer consent and data quality validation.",
      },
      {
        title: "Fair Lending compliance",
        detail:
          "Disparate impact testing on every model feature and the composite score. Adverse action reasons generated for every decline. Regular audits with legal and compliance teams.",
      },
      {
        title: "Explainable scoring",
        detail:
          "Transparent feature attribution for every credit decision, enabling both regulatory explanation and applicant-facing adverse action notices.",
      },
      {
        title: "Dual-model architecture",
        detail:
          "Traditional and alternative models run in parallel; the alternative model activates only for applicants where bureau data is insufficient, avoiding disruption to existing credit policy.",
      },
      {
        title: "Performance monitoring by segment",
        detail:
          "Default rates, vintage curves, and approval demographics tracked by score tier and data source to detect drift and ensure continued Fair Lending compliance.",
      },
    ],
    technicalInnovation:
      "A modular feature pipeline allows new alternative data sources to be tested for predictive power and fair lending impact independently before inclusion in the production model. The compliance testing framework runs automatically with each model update, preventing regressions.",
    impactMetrics: [
      "25% increase in approval rates for thin-file applicants without relaxing credit standards.",
      "5.0% default rate on alternative-scored loans versus 6.5% industry average on comparable segments.",
      "100% ECOA compliance with documented disparate impact testing for every model version.",
      "Time-to-decision unchanged—alternative scoring adds no latency to the application experience.",
    ],
    impactClosing:
      "The lender expanded access to creditworthy consumers that traditional scoring overlooked—while demonstrating to regulators that alternative data improved both access and risk performance.",
  },
  "algorithmic-trading-sentiment": {
    headline: "Alpha from the noise—before the market prices it in",
    subheadline:
      "NLP sentiment scoring across 10K+ daily articles generating 3.2% annualized alpha with sub-5min latency.",
    contextItalic:
      "Price and volume signals are exhausted; the next edge is alternative data processed faster than the market.",
    challenge:
      "A quantitative hedge fund sought alpha-generating signals from alternative data to complement its existing systematic strategies. Manual analysis of news and earnings calls was too slow for short-term trading horizons. Previous NLP vendor solutions delivered sentiment with multi-hour latency and insufficient granularity—sector-level scores rather than entity-level signals that could drive individual security positions.",
    solutionIntro:
      "We implemented an NLP-powered sentiment analysis platform processing 10K+ daily news articles, earnings call transcripts, and social media feeds. Entity-level sentiment scoring with sub-5-minute latency integrates directly with the fund's trading algorithms and risk management systems.",
    phases: [
      {
        title: "Phase 1 — Corpus and signal validation",
        body: "Built ingestion pipelines for premium news feeds, SEC filings, earnings call transcripts, and curated social media. Validated entity-level sentiment signals against historical price movements with the quant research team, establishing which signal types and time horizons offered statistically significant alpha.",
      },
      {
        title: "Phase 2 — Production integration and alpha measurement",
        body: "Deployed real-time sentiment scoring with sub-5-minute end-to-end latency from article publication to signal delivery. Integrated with the fund's execution management system and risk framework. Measured alpha attribution through controlled backtests and live paper trading before capital allocation.",
      },
    ],
    keyImplementations: [
      {
        title: "Entity-level sentiment extraction",
        detail:
          "Named entity recognition and sentiment assignment at the company and event level—not document-level scores that blur signal across unrelated mentions.",
      },
      {
        title: "Sub-5-minute end-to-end latency",
        detail:
          "Streaming ingestion, inference, and signal delivery pipeline designed for the fund's trading horizons, with monitoring on every stage to detect latency spikes.",
      },
      {
        title: "Signal quality monitoring",
        detail:
          "Automated tracking of signal-to-noise ratio, alpha decay curves, and correlation with existing factors to detect signal degradation before it impacts P&L.",
      },
      {
        title: "Source diversification",
        detail:
          "Multiple premium news feeds, transcript providers, and social sources with deduplication and provenance tracking to avoid double-counting and source bias.",
      },
      {
        title: "Risk integration",
        detail:
          "Sentiment signals feed into the fund's existing risk framework with position limits, sector exposure caps, and correlation constraints respected.",
      },
    ],
    technicalInnovation:
      "A streaming NLP pipeline with entity disambiguation and temporal alignment ensures that sentiment shifts are attributed to the correct entity and event—avoiding the stale-signal and entity-confusion problems that plague batch-oriented alternative data products.",
    impactMetrics: [
      "3.2% annualized alpha attributable to sentiment signals in controlled measurement.",
      "10K+ articles processed daily with entity-level granularity.",
      "Sub-5-minute latency from article publication to trading signal delivery.",
      "Signal Sharpe ratio of 1.4 on sentiment-driven positions, net of transaction costs.",
    ],
    impactClosing:
      "The fund added a durable, measurable alpha source that complements existing systematic strategies—with the latency and granularity required to act before sentiment is priced in.",
  },
  "deal-flow-ai-diligence": {
    headline: "From CIM to IC memo—with structure and speed",
    subheadline:
      "Structured IC-ready outputs from CIMs, datarooms, and portfolio reporting with mandate-aware access controls.",
    contextItalic:
      "Analysts spend weeks extracting the same metrics from every deal; that time should go to judgment, not formatting.",
    challenge:
      "A middle-market sponsor reviewing 200+ deals annually spent an average of 40 analyst-hours per deal on initial screening and diligence document processing. CIMs arrived in varied formats; financial metrics were buried in narrative, footnotes, and appendices. Analysts reconciled figures across documents manually, and IC memos reflected inconsistent formatting and depth. Portfolio reporting was similarly fragmented—each portco reported different KPIs in different formats on different schedules, making operating partner reviews time-consuming and comparisons unreliable.",
    solutionIntro:
      "We built custom AI workflows for deal screening and summarization, structured extraction from diligence materials, and portfolio dashboards that normalize KPIs for investment committee and operating partner review—all with mandate-aware access controls and audit logging suitable for LP and compliance scrutiny.",
    phases: [
      {
        title: "Phase 1 — Deal screening and extraction",
        body: "Built intake pipelines for CIMs, teasers, and management presentations. Extraction models pull financial metrics (revenue, EBITDA, growth rates, customer concentration), industry classification, and deal terms into structured templates. Screening scores prioritize deals against the fund's stated criteria.",
      },
      {
        title: "Phase 2 — Diligence workflow and portfolio normalization",
        body: "Extended extraction to dataroom documents (QofE, legal, commercial). Structured outputs feed IC memo templates with sourced citations. Portfolio module normalizes monthly and quarterly reporting from portcos into comparable dashboards with variance flagging.",
      },
    ],
    keyImplementations: [
      {
        title: "CIM and teaser extraction",
        detail:
          "Financial metrics, deal terms, and sector signals extracted from varied document formats into structured JSON with page-level citations for analyst verification.",
      },
      {
        title: "IC memo drafting",
        detail:
          "Template-driven memo generation with sourced data points, editable sections, and version tracking. Analysts refine rather than write from scratch.",
      },
      {
        title: "Mandate-aware access controls",
        detail:
          "Fund-level data boundaries ensure no commingling of deal materials across mandates. Role-based access separates deal team, IC, and operating partner views.",
      },
      {
        title: "Portfolio KPI normalization",
        detail:
          "Heterogeneous portco reporting mapped to a common schema with variance detection, trend visualization, and operating partner alerts.",
      },
      {
        title: "Audit logging and compliance",
        detail:
          "Every document access, extraction, and edit logged with user identity and timestamp—supporting LP reporting, internal audit, and vendor due diligence requirements.",
      },
    ],
    technicalInnovation:
      "A document understanding layer combines layout analysis, table extraction, and entity linking to handle the diverse formats of financial documents—from formatted CIMs to scanned QofE appendices—without per-document template programming. Mandate-level isolation is enforced at the infrastructure layer, not just the application layer.",
    impactMetrics: [
      "60% reduction in analyst time on initial deal screening and CIM processing.",
      "Structured, IC-ready diligence outputs with page-level citations for every extracted metric.",
      "Unified cross-portfolio KPI views replacing manual spreadsheet consolidation.",
      "Full audit trail satisfying LP transparency requirements and internal compliance review.",
    ],
    impactClosing:
      "Analysts spend their time on judgment—evaluating businesses, not reformatting documents—while IC and operating partners receive consistent, sourced materials that support faster, better-informed decisions.",
  },

  "configurable-bom-product-design": {
    headline: "Resolve any product variant in seconds—not hours of spreadsheet wrestling",
    subheadline:
      "Graph-modeled 150% BOMs with constraint-based pruning, multi-factor scoring, and full compliance traceability.",
    contextItalic:
      "Thousands of part combinations and no system to resolve which ones actually belong together.",
    challenge:
      "A manufacturer of configurable interior products—doors, frames, and hardware systems sold to hotel developers and commercial builders—maintained over 8,000 part variants across 200+ assemblies. Sales engineers spent 2-3 hours per quote manually resolving BOMs from PDF catalogs and Excel matrices. Invalid configurations made it to procurement 12% of the time, triggering rework, delays, and margin erosion. Compliance verification for RoHS, REACH, and fire safety standards was a separate manual step that added another day to each order. The company needed configuration resolution at quoting speed with built-in compliance gates.",
    solutionIntro:
      "We modeled the entire product catalog as a connected structure—assemblies, parts, constraints, and compliance certifications linked by their real-world relationships. The system resolves valid configurations instantly by eliminating incompatible combinations, scoring alternatives on cost and lead time, and attaching regulatory proof to every bill of materials automatically.",
    phases: [
      {
        title: "Phase 1 — Graph model + constraint ingestion",
        body: "Mapped the full assembly-to-part hierarchy from ERP and PLM exports. Defined constraint rules (excludes, requires, preferred-with) and linked compliance certifications (RoHS, REACH, fire rating) directly to each part. Validated against historical orders to confirm the system resolves known-good configurations correctly.",
      },
      {
        title: "Phase 2 — Resolution engine + quoting integration",
        body: "Built a resolution engine: given a customer's selections (material, finish, dimensions, hardware), the system eliminates invalid combinations, scores remaining options by cost and weight, and returns a ranked BOM. Integrated with the quoting tool so sales engineers get a resolved, priced, compliance-verified BOM in the configurator—no spreadsheets.",
      },
    ],
    keyImplementations: [
      {
        title: "Declarative constraint pruning",
        detail: "Allow/deny lists and exclusion rules eliminate invalid combinations at configuration time—not after assembly. Engineers never see an impossible configuration.",
      },
      {
        title: "Multi-factor scoring",
        detail: "Surviving options are scored on cost, weight, lead time, and supplier preference. The system returns the optimal build, not just a valid one.",
      },
      {
        title: "Compliance-by-construction",
        detail: "RoHS, REACH, WEEE, and fire-safety certifications are graph nodes linked to parts. Every resolved BOM carries its compliance proof chain automatically.",
      },
      {
        title: "Engineering traceability",
        detail: "Changes to a part or constraint propagate through the graph—impact analysis shows which products, orders, and certifications are affected before the change is committed.",
      },
    ],
    technicalInnovation:
      "The product model treats configuration groups as decision points—constraints are evaluated as the system resolves each selection, not after the fact. For large catalogs (10K+ parts), resolution is partitioned by assembly family with caching for common configurations. When a regulation changes, a single lookup identifies every affected product, order, and certification in the portfolio.",
    impactMetrics: [
      "Configuration time from 2-3 hours to under 60 seconds per quote—sales engineers resolve and price in the configurator, not in spreadsheets.",
      "Invalid configurations reaching procurement dropped from 12% to near-zero—constraint pruning catches incompatibilities at quoting, not at assembly.",
      "Compliance verification collapsed from a separate day-long review to automatic—every BOM carries its regulatory proof chain by construction.",
      "Engineering change impact analysis in minutes instead of weeks—the graph shows every affected product, order, and certification before a change is committed.",
    ],
    impactClosing:
      "Sales quotes are faster and error-free, procurement receives only buildable BOMs, and compliance teams have traceable proof chains without manual audits—manufacturing agility that scales with the product catalog.",
  },

  "customer-360-identity-resolution": {
    headline: "One customer, one profile—no matter how many channels they use",
    subheadline:
      "Graph-based entity resolution unifying fragmented identifiers across 12+ touchpoints into a single, consent-aware customer record.",
    contextItalic:
      "The same customer appears as three records in three systems—and every downstream decision inherits that fragmentation.",
    challenge:
      "A multi-channel retailer with 4M+ customer records across e-commerce, point-of-sale, loyalty, mobile app, and customer service systems found that 22% of records were duplicates or fragments of the same person. Marketing campaigns over-contacted some customers while missing others entirely. The loyalty program double-counted redemptions. Customer lifetime value models were unreliable because purchase history was split across identities. Previous deterministic dedup (exact email match) resolved only 40% of duplicates—the remaining 60% had name variations, address changes, or shared household attributes that required fuzzy matching at scale.",
    solutionIntro:
      "We built an identity resolution platform that maps every customer identifier—email, phone, address, loyalty ID, device—and uses probabilistic matching and relationship analysis to merge records that belong to the same person. The result is a single golden record with full provenance and confidence scoring for every merge decision.",
    phases: [
      {
        title: "Phase 1 — Identity graph construction",
        body: "Ingested identifiers from all source systems and mapped the relationships between them. Shared attributes—same phone on two accounts, similar addresses, matching devices—create weighted connections. Smart grouping strategies limit comparisons to plausible matches, then score each candidate pair on name similarity, address proximity, and recency.",
      },
      {
        title: "Phase 2 — Resolution + activation",
        body: "Applied clustering algorithms to identify groups of records that belong to the same person. Produced golden records with merge provenance and exposed resolved profiles via API to the CDP, CRM, loyalty, and marketing platforms. Consent and preference records follow the golden identity—so opt-outs propagate across all fragments automatically.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-signal probabilistic matching",
        detail: "Name similarity, address proximity, phonetic encoding for spelling variations, and device fingerprint overlap—combined into a composite confidence score per candidate pair.",
      },
      {
        title: "Graph community detection",
        detail: "Clustering algorithms identify groups of identifiers that belong to the same person—handling transitive matches that pairwise dedup misses (A matches B, B matches C, so A-B-C are one person).",
      },
      {
        title: "Merge provenance and explainability",
        detail: "Every golden record carries a full audit trail: which source systems contributed each attribute, the confidence score of each merge, and the algorithm version—critical for GDPR/CCPA compliance and customer service dispute resolution.",
      },
      {
        title: "Consent propagation",
        detail: "Opt-out and preference signals follow the resolved identity—when one fragment opts out, the golden record propagates that across all channels. No more contacting a customer who already said no through a different touchpoint.",
      },
      {
        title: "Real-time incremental resolution",
        detail: "New events (purchases, logins, support calls) are matched against the existing graph incrementally—not in nightly batch. Resolution latency under 200ms for activation use cases.",
      },
    ],
    technicalInnovation:
      "The identity model places each person at the center with their identifiers (email, phone, address, device) radiating outward. Shared identifiers create implicit links between person candidates. Smart grouping reduces the comparison space, then scoring combines name similarity, address proximity, and temporal signals. AI-powered clustering identifies matches that simple rules miss—particularly household-level resolution where family members share addresses and devices but are distinct people.",
    impactMetrics: [
      "Duplicate records reduced from 22% to under 3%—golden records cover 94-98% of the true customer base with high-confidence merges.",
      "Marketing spend efficiency improved 28%—campaigns reach actual unique customers, not fragments, eliminating redundant impressions and conflicting offers.",
      "Customer lifetime value models became reliable—purchase history unified across channels produced 35% more accurate CLV predictions for retention targeting.",
      "Consent compliance achieved across all channels—opt-outs propagate in real time, eliminating the risk of contacting customers through unresolved fragments.",
    ],
    impactClosing:
      "The retailer sees one customer where they used to see three—marketing is more efficient, loyalty is more accurate, and compliance is automatic. The identity graph becomes the foundational layer that every downstream system trusts.",
  },

  "predictive-maintenance-manufacturing": {
    headline: "Predict equipment failures days before they happen—not hours after",
    subheadline:
      "IoT-driven health monitoring that tells maintenance teams what will fail, when, and what to do about it.",
    contextItalic:
      "Unplanned downtime is the most expensive problem in manufacturing—and most of it is preventable.",
    challenge:
      "An automotive manufacturer was losing $5M+ annually to unplanned equipment failures. Each failure averaged 48 hours of downtime, cascading into missed delivery schedules, overtime labor costs, and expedited shipping. Maintenance was calendar-based—replacing parts on schedule regardless of actual condition, which meant some components were replaced too early (wasting money) while others failed before their scheduled service (causing the very outages they were trying to prevent). The maintenance team had no visibility into which machines were actually at risk.",
    solutionIntro:
      "We deployed a condition-based monitoring system across critical production equipment. Sensors capture vibration, temperature, and acoustic signatures continuously. AI models analyze these signals against historical failure patterns and generate predictive alerts 7–14 days before expected failure—giving maintenance teams enough lead time to schedule repairs during planned downtime windows.",
    phases: [
      {
        title: "Phase 1 — Instrument and baseline",
        body: "Install sensors on the highest-impact equipment first (lines with the most downtime cost). Collect 8–12 weeks of baseline data to establish normal operating signatures. Integrate sensor feeds with the existing CMMS so work orders flow automatically when the system detects a developing issue.",
      },
      {
        title: "Phase 2 — Predict and optimize",
        body: "Train failure prediction models on the baseline data plus historical maintenance records. Set alert thresholds that balance early warning with false-positive tolerance. Expand to remaining equipment classes. Add remaining-useful-life estimates so planners can batch repairs into scheduled maintenance windows.",
      },
    ],
    keyImplementations: [
      {
        title: "Multi-signal health scoring",
        detail: "Vibration, thermal, and acoustic data fused into a single health score per asset—maintenance teams see a simple red/amber/green status, not raw sensor streams.",
      },
      {
        title: "7–14 day failure prediction window",
        detail: "Enough lead time to order parts, schedule crews, and plan production around the repair—not scramble after a breakdown.",
      },
      {
        title: "CMMS integration",
        detail: "Predictive alerts generate work orders automatically in the existing maintenance system. Technicians see what to inspect and what parts to bring—no separate dashboards.",
      },
      {
        title: "Remaining useful life estimates",
        detail: "Beyond pass/fail alerts, the system estimates how many operating hours remain—so planners batch repairs into scheduled windows instead of reacting to each alert individually.",
      },
    ],
    technicalInnovation:
      "The system learns each machine's unique operating fingerprint rather than relying on generic failure models. As it sees more data, predictions improve—accuracy compounds over time. The architecture handles intermittent connectivity common in factory environments and works alongside existing SCADA and historian infrastructure without replacing it.",
    impactMetrics: [
      "Unplanned downtime reduced 45% in the first year—most failures detected and addressed during planned maintenance windows.",
      "$3.5M annual savings from avoided emergency repairs, overtime labor, and expedited shipping for late orders.",
      "92% prediction accuracy within 6 months—the system correctly identified developing failures with enough lead time to act.",
      "Parts inventory optimization followed naturally—knowing what will fail when means ordering the right parts at the right time, not overstocking everything.",
    ],
    impactClosing:
      "Maintenance shifted from reactive firefighting to planned, predictable operations. The team spends time preventing problems instead of recovering from them—and the P&L reflects the difference.",
  },
};

export function getUseCaseStudyDetail(slug: string): UseCaseStudyNarrative | undefined {
  return details[slug];
}
