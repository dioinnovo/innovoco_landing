/**
 * Per-slug prompts for solution / story imagery (Gemini).
 *
 * TWO MODES:
 *   1. **Manual override** — entries in STORY_PROMPTS_BY_SLUG get used as-is.
 *   2. **Auto-generated** — for any slug NOT in the overrides, call
 *      `buildPromptsFromNarrative(slug)` which reads the actual narrative
 *      content from use-case-study-details.ts and builds prompts grounded
 *      in the real page text.
 *
 * The auto-generated path ensures every image is semantically relevant to
 * the text it accompanies — no more generic landscapes.
 */

import { CINEMATIC_STYLE_ANCHOR } from "./ai-art-style-anchor.mjs";

export const SHARED_SOLUTION = `Premium editorial illustration for an enterprise AI case study — SOLUTION and forward progress; mood is hopeful, motivating, and sublime.
${CINEMATIC_STYLE_ANCHOR}

This image is a REPRESENTATION OF THE CONTEXT THROUGH AN ARTISTIC LENS. Read the text provided below, identify the industry, service, and domain, then create an artistic interpretation that captures what it's about. The viewer should feel the domain — not through literal depiction of people at desks, but through the spirit, atmosphere, and symbolic forms that evoke that world. Square 1:1 for phase tiles.`;

const SHARED_CHALLENGE = `Premium editorial illustration for an enterprise AI case study "challenge" section — convey FRICTION, bottlenecks, fragmentation, or risk through artistic metaphor. Tension should feel human and surmountable — not horror or doom.
${CINEMATIC_STYLE_ANCHOR}

This image is a REPRESENTATION OF THE CHALLENGE THROUGH AN ARTISTIC LENS. Read the text provided below, identify the industry, service, and domain, then create an artistic interpretation that captures the friction, obstacles, and pain described. The viewer should feel the struggle — not through literal depiction, but through atmosphere, broken forms, and tension in the composition. Square 1:1.`;

/** @typedef {{ phases: string[]; implementations: string; technical: string; impact: string }} StoryPrompts */

/**
 * Extract concrete nouns and visual entities from text.
 * Returns a list of items that can be rendered as visual elements.
 * @param {string} text
 * @returns {string[]}
 */
export function extractVisualEntities(text) {
  // Multi-word phrases checked first (order matters — longer matches before shorter)
  const phraseMap = [
    // Customer Support & CX
    ["call center", "call center as a hub with multiple communication channels radiating outward"],
    ["customer support", "customer support as a helpdesk station with headset and communication channels"],
    ["customer service", "customer service as a helpdesk station with headset and communication channels"],
    ["chat bot", "chatbot as an AI assistant interface with speech bubbles"],
    ["voice ai", "voice AI as a stylized microphone with sound waveforms transforming into structured data"],
    ["voice assistant", "voice assistant as a microphone converting speech into organized responses"],
    ["ivr", "IVR phone menu as a branching decision path (NOT a literal tree — an abstract routing diagram)"],
    ["sentiment", "sentiment analysis as an emotion spectrum gauge shifting from red to green"],
    ["handle time", "handle time as a clock with conversation flow around it"],
    ["crm", "CRM system as a customer profile hub with connected records"],
    ["knowledge base", "knowledge base as an organized library of interconnected articles"],
    ["self-serve", "self-service portal as a user-facing interface with instant answers"],
    // Supply Chain
    ["supply chain", "supply chain as connected nodes from supplier to warehouse to delivery"],
    ["safety stock", "safety stock as a protective inventory buffer layer"],
    ["demand forecast", "demand forecast as a forward-looking trend line with confidence bands"],
    // Manufacturing
    ["quality control", "quality inspection checkpoint on a production line"],
    ["production line", "production line as a flowing horizontal manufacturing process"],
    ["bill of material", "bill of materials as a hierarchical parts tree"],
    ["predictive maintenance", "predictive maintenance as equipment with health monitoring sensors"],
    // Energy
    ["power grid", "electrical grid as connected transmission lines and substations"],
    ["load forecast", "load forecast as a demand curve with predicted peaks"],
    ["renewable energy", "renewable energy as wind turbine and solar panel silhouettes"],
    // Insurance
    ["claims processing", "claims processing as documents flowing through review stages"],
    ["fraud detection", "fraud detection as a network graph revealing suspicious connections"],
    ["field capture", "field capture as a mobile device photographing and categorizing evidence"],
    // Healthcare
    ["clinical decision", "clinical decision support as a medical dashboard with patient indicators"],
    ["patient care", "patient care as a care pathway with connected treatment stages"],
    ["early warning", "early warning system as an alert beacon detecting signals before crisis"],
    // Financial
    ["credit risk", "credit risk as a scoring scale weighing multiple data signals"],
    ["real-time fraud", "real-time fraud scoring as a transaction stream with instant pass/flag decisions"],
    ["trading signal", "trading signal as a market pulse with sentiment indicators"],
    ["due diligence", "due diligence as structured document review with extraction highlights"],
  ];

  // Single-word entities (only match if not already covered by phrases above)
  const wordMap = {
    // Data & Analytics
    dashboard: "stylized dashboard screen with charts and indicators",
    chart: "abstract chart or graph visualization",
    report: "document or report form as luminous rectangle",
    metric: "metric indicator or gauge",
    dataset: "dataset as organized glowing cube or grid",
    database: "database as cylindrical vault form",
    warehouse: "data warehouse as large structured vault",
    // Business objects
    spreadsheet: "spreadsheet grid with cells",
    invoice: "document form as floating rectangle",
    ticket: "support ticket as a small card flowing through a processing queue",
    document: "document as luminous floating page",
    // Customer support
    headset: "customer service headset as a communication symbol",
    chatbot: "chatbot as an AI conversation interface",
    escalation: "escalation as an upward routing path to a senior reviewer",
    routing: "routing as branching paths directing items to the right destination",
    triage: "triage as a sorting gate directing incoming items by priority",
    // People & Roles
    agent: "support agent silhouette at a workstation with headset",
    analyst: "analyst silhouette at workstation",
    patient: "patient silhouette in care setting",
    technician: "technician silhouette with tools",
    adjuster: "field worker silhouette with clipboard",
    // Systems & Infrastructure
    sensor: "sensor node emitting pulse rings",
    camera: "camera or lens form capturing light",
    pipeline: "pipeline as flowing connected tubes",
    workflow: "workflow as connected process steps",
    integration: "integration as interlocking puzzle forms",
    // Security & Compliance
    shield: "shield form suggesting protection",
    audit: "audit trail as illuminated chain of records",
    compliance: "compliance checkpoint as gate with checkmark",
    guardrail: "guardrail as protective barrier of light",
    // Equipment & Industry
    machine: "industrial machine silhouette",
    equipment: "equipment form with operational indicators",
    conveyor: "conveyor belt or production line",
    gear: "interlocking gear forms",
    turbine: "turbine or rotating equipment",
    vehicle: "vehicle or fleet silhouette",
    // Medical
    ehr: "electronic health records screen",
    imaging: "medical scan or imaging form",
    // Financial
    transaction: "transaction as flowing currency path",
    portfolio: "portfolio as stacked asset layers",
    fraud: "fraud as red-flagged suspicious connection in a network",
    // Abstract concepts
    forecast: "forecast as forward-looking light beam with uncertainty bands",
    prediction: "prediction as emerging light pattern",
    alert: "alert as amber warning beacon",
    approval: "approval as green checkpoint gate",
    evaluation: "evaluation as testing checkpoint with pass/fail indicators",
    score: "score as gauge or rating indicator",
    threshold: "threshold as boundary line between zones",
  };

  const found = [];
  const lower = text.toLowerCase();

  // Check multi-word phrases first (higher specificity)
  const matchedPhrases = new Set();
  for (const [phrase, visual] of phraseMap) {
    if (lower.includes(phrase)) {
      found.push(visual);
      // Mark individual words from matched phrases to avoid double-matching
      for (const word of phrase.split(" ")) matchedPhrases.add(word);
    }
  }

  // Then single words, skipping any already covered by phrase matches
  for (const [keyword, visual] of Object.entries(wordMap)) {
    if (matchedPhrases.has(keyword)) continue;
    if (lower.includes(keyword)) {
      found.push(visual);
    }
  }

  // Limit to 6 most relevant to avoid prompt overload
  return found.slice(0, 6);
}

/**
 * Build prompts automatically from narrative content.
 * Extracts visual entities from the text and creates explicit MUST INCLUDE directives.
 *
 * @param {{ phases: Array<{title: string; body: string}>; keyImplementations: Array<{title: string; detail: string}>; technicalInnovation: string; impactMetrics: string[] }} narrative
 * @returns {StoryPrompts}
 */
export function buildPromptsFromNarrative(narrative) {
  // Extract domain context from challenge (first sentence gives the industry/setting)
  const domainHint = narrative.challenge
    ? narrative.challenge.split(".")[0] + "."
    : "";

  const phases = narrative.phases.map(
    (p) => `${SHARED_SOLUTION}

Domain context: ${domainHint}
The topic: "${p.title}: ${p.body}"

Include recognizable elements from this domain rendered artistically — not photorealistic, but enough detail that the viewer knows what field this is about. Balance atmospheric artistry with concrete domain context. No text labels.`
  );

  const implSummary = narrative.keyImplementations
    .map((ki) => `${ki.title}: ${ki.detail}`)
    .join(". ");
  const implementations = `${SHARED_SOLUTION}

Domain context: ${domainHint}
The key implementations this image represents: ${implSummary}

Show these working together in the context of this domain. Balance recognizable domain detail with artistic atmosphere. No text labels.`;

  const technical = `${SHARED_SOLUTION}

Domain context: ${domainHint}
The innovation: "${narrative.technicalInnovation}"

Capture the elegance of this approach within this domain — recognizable elements composed with artistic sophistication. 4:3 aspect ratio. No text labels.`;

  const impact = `${SHARED_SOLUTION}

Domain context: ${domainHint}
The results achieved: ${narrative.impactMetrics.map((m) => m.split("—")[0].split("–")[0].trim()).join("; ")}.

Mood: achievement, milestone reached, quiet confidence. The domain should still be recognizable but elevated — a summit reached, horizon clear, the work bearing fruit. 4:3 aspect ratio. No text labels.`;

  return { phases, implementations, technical, impact };
}

/**
 * Build a challenge prompt from narrative content.
 * @param {{ challenge: string }} narrative
 * @returns {string}
 */
export function buildChallengePromptFromNarrative(narrative) {
  return `${SHARED_CHALLENGE}

The challenge: "${narrative.challenge}"

Show recognizable elements from this domain under stress — friction, fragmentation, obstacles — rendered artistically. The viewer should understand what field this is and feel the tension. Balance domain detail with atmospheric artistry. No text labels.`;
}

/** @type {Record<string, StoryPrompts>} */
export const STORY_PROMPTS_BY_SLUG = {
  // "executive-self-serve-analytics" — removed manual override; auto-generated from narrative content
  // "customer-support-voice" — removed manual override; auto-generated from narrative content
  "regulated-onboarding-kyc-aml": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Stabilize intake — unified intake basins, document classification as soft strata, accuracy baselines as measured grids.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate with oversight — straight-through flows as green-lit channels, exception routing as amber tributaries, SLA clocks as gentle rings.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Evidence lockers, lineage, risk scoring — immutable stacks of light, provenance chains, risk heat as controlled ember accents.`,
    technical: `${SHARED_SOLUTION}
Theme — IDP + rules + ML hybrid — structured extraction prisms, policy gates, model uncertainty as honest fog (abstract).`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: cycle time, audit readiness — shorter paths to approval glow, examiner confidence as steady cool light.`,
  },
  "supply-chain-demand": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Signal quality — hierarchy as nested arcs, backtest windows as transparent lenses, demand signals as coherent wavefronts.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Close the loop — reorder bands, exception surfacing, supplier context as linked nodes in motion.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Forecast + replenishment integrations — flowing inventory ribbons, SLA monitors, alternate routes as branching meridians.`,
    technical: `${SHARED_SOLUTION}
Theme — Feature store, demand models, planning connectors — feature lattice, model ensemble as layered sails, API mesh as fine grid.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: stockouts, working capital — fewer gaps as filled valleys, capital breathing room as wider light fields.`,
  },
  "field-services-iot-playbooks": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Instrument the edge — sensor constellations, asset-to-contract mapping as linked halos, noise calibration as tuning forks (abstract).`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate the playbook — alert to dispatch to fix as closed loops, customer confirmation as soft pulse return.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Voice-to-work-order, AR hints, billing hooks — hands-free capture arcs, overlay hints as glass shards of guidance.`,
    technical: `${SHARED_SOLUTION}
Theme — IoT fabric, CMMS, voice — edge pulses feeding orchestration core, durable workflows as copper-teal circuitry (abstract).`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: MTTR, first-time fix, NPS — time collapsing as tighter spirals, satisfaction as warmer spectrum.`,
  },
  "finance-close-reconciliation": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Map the close — source ribbons, cutoff lines, bottleneck baselines as honest measure marks.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate safely — auto-clearing bands, segregation of duties as twin rails, SOX logs as crystalline trails.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — ERP, bank, intercompany ties — matched pairs as interlocking tiles, exceptions as labeled glow (no numbers).`,
    technical: `${SHARED_SOLUTION}
Theme — Rules + ML hybrid journals — deterministic slabs with adaptive mist for entropy zones (abstract).`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: close days, fewer misses — calendar compression as uplifting folds, confidence as even emerald-slate balance.`,
  },
  "hr-onboarding-policy": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Blueprint journeys — role templates as modular petals, geography as soft terrain tones, journey maps as coherent paths.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate with visibility — hire-event sparks, stuck steps highlighted kindly, HRBP/IT nudges as connecting beams.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Identity bundles, access, training — privilege rings, doorways of access, learning arcs as ascending steps.`,
    technical: `${SHARED_SOLUTION}
Theme — HRIS/ITSM orchestration — ticket choreography, event-driven fan-out as synchronized light.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: time-to-productive, drop-off — smoother onboarding ramps, fewer gaps as bridged negative space.`,
  },
  "marketing-personalization": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Golden segments — resolved identity mosaic (abstract), consent as boundary glow, channel eligibility as clear channels.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate creation & learning — variant generation within brand rubric, approvals as soft gates, feedback loops as recycling light.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Consent, frequency caps, channel orchestration — hard stops as respectful barriers, orchestration as harmonic fan-out.`,
    technical: `${SHARED_SOLUTION}
Theme — CDP + decisioning + GenAI — customer graph nebula, decision engines as prisms, creative constraints as elegant frames.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: lift, unsub risk, velocity — measured lift as rising tide, trust as stable hue.`,
  },
  "reporting-audit-packs": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Catalog metrics — KPI library as ordered crystal shelves, owners and SLAs as binding filaments (no text).`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate assembly — template engines, reviewer roles, publish snapshots as frozen light layers.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Lineage graphs, controls, sign-offs — DAG of light, control towers, signatures as constellations.`,
    technical: `${SHARED_SOLUTION}
Theme — BI + orchestration + LLM drafting — query fabric, workflow spine, narrative synthesis as weaving threads.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: cycle time, audit findings — faster packs as compressed horizons, fewer findings as calmer field.`,
  },
  "governed-knowledge-copilot": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Scope corpora — domain gardens with mirrored ACL fences, validated mirrors of permissions.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Expand with quality — structured SQL/BQ lanes, groundedness monitoring as feedback aurora.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — ACL-aware indexing, citation, refusal — retrieval cones bounded by permission walls, citations as tether lines.`,
    technical: `${SHARED_SOLUTION}
Theme — RAG, vector + keyword, orchestration — hybrid retrieval as twin engines, agent steps as stepping stones.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: deflection, trust, risk — helpful deflection as upward flow, trust as steady blue-green balance.`,
  },
  "healthcare-capacity-clinical-ops": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Data alignment — roles, units, contracts harmonized as clinical blues and soft sage alignment.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Decision support — shortfall radar, staffing and supply suggestions as humane interventions (abstract, no patients).`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Credential-aware staffing, protocol links — scope rings, protocol threads, safety-first glow.`,
    technical: `${SHARED_SOLUTION}
Theme — EHR + forecasting + rules — clinical data planes, forecast surfaces, policy guards as shells.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: wait, burnout, waste — easing pressure curves, calmer operations as cooler stable tones.`,
  },
  "global-payroll-pay-compliance": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Control design — pay elements and entities as interlocking compliant plates, tolerances as fine etched circles.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automated reconciliation — pre-flight checks, anomaly spikes (abstract), controller vistas.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Gross-to-net trace, GL ties — line threads from hours to payout to ledger as luminous trace.`,
    technical: `${SHARED_SOLUTION}
Theme — Payroll engine + HCM + finance — tri-system harmony, validation layers as stacked shields.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: rework, penalties, cycle stress — fewer breaks as sealed seams, confidence as gold-navy calm.`,
  },
  "predictive-maintenance-manufacturing": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Instrument and baseline. MUST INCLUDE: stylized industrial machinery silhouettes (large gears, presses, conveyor rollers) with small glowing sensor nodes attached at key points emitting soft amber pulse rings. Vibration waveforms rendered as luminous oscillating lines running along the machine surfaces. The machines sit in atmospheric factory-floor mist. A subtle heartbeat-monitor-style baseline rhythm band runs across the lower third, showing the "normal" signature being learned. Steel blue machinery, warm amber sensor glow.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Predict and optimize. MUST INCLUDE: the same machinery silhouettes but now one machine shows an amber-to-red warning glow emanating from a developing fault point — a subtle fracture-line of light diverging from the healthy baseline. A transparent calendar or timeline band floats in the mid-ground showing a 7-14 day prediction window as a luminous corridor. Work order cards or maintenance tickets rendered as small organized luminous rectangles flowing toward a wrench-shaped form. Hopeful mood — the problem is caught early.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Multi-signal health scoring and CMMS integration. MUST INCLUDE: three distinct signal streams (vibration wave, thermal gradient band, acoustic waveform) converging into a single unified health-score beacon — like a traffic light rendered as a luminous orb transitioning from green to amber. A stylized maintenance management dashboard silhouette (abstract screen form with status indicators) floats nearby. A clock or timeline showing remaining-useful-life as a diminishing but measurable band. Factory equipment silhouettes in the background grounded in atmospheric mist.`,
    technical: `${SHARED_SOLUTION}
Theme — Per-machine learning fingerprint. MUST INCLUDE: multiple machine silhouettes each with a unique luminous signature pattern above them (different waveform shapes, like fingerprints of light). Over time arrows or progressive focus effects show these signatures becoming sharper and more defined — accuracy improving. A factory floor layout abstracted as an organized grid with machines as nodes. Warm industrial amber and steel blue palette. 4:3 aspect ratio.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: downtime eliminated, costs saved, reliability achieved. MUST INCLUDE: a production line silhouette running smoothly as an unbroken horizontal flow of amber light — no gaps or interruptions. Ascending gold gradient suggesting cost savings. A shield or foundation form suggesting reliability. Contrasted with a faded/ghosted broken production line in the background showing the "before" state. The overall mood is calm, productive confidence. 4:3 aspect ratio.`,
  },
};
