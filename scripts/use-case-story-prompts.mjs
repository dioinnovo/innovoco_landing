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

/** @typedef {{ intro: string; phases: string[]; implementations: string; technical: string; impact: string }} StoryPrompts */

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
 * @param {{ headline?: string; subheadline?: string; phases: Array<{title: string; body: string}>; keyImplementations: Array<{title: string; detail: string}>; technicalInnovation: string; impactMetrics: string[]; challenge?: string }} narrative
 * @returns {StoryPrompts}
 */
export function buildPromptsFromNarrative(narrative) {
  // Extract domain context from challenge (first sentence gives the industry/setting)
  const domainHint = narrative.challenge
    ? narrative.challenge.split(".")[0] + "."
    : "";

  const intro = `THIS IMAGE IS ABOUT: ${domainHint}
The solution: "${narrative.headline ?? ""} — ${narrative.subheadline ?? ""}"

${SHARED_SOLUTION}

This is the INTRO image for this use case — a grounded visual that represents the specific solution being offered. Include recognizable objects, tools, and elements from this domain that relate to the solution described above. For example, if it's about voice and digital assistants, show microphones, waveforms, chat interfaces rendered artistically. If it's about inspections, show cameras, tablets, measurement tools. The viewer should immediately understand what service this is. 4:3 aspect ratio. No text labels.`;

  const phases = narrative.phases.map(
    (p) => `THIS IMAGE IS ABOUT: ${domainHint}
The topic: "${p.title}: ${p.body}"

${SHARED_SOLUTION}

Include recognizable elements from this domain rendered artistically. The viewer should know what field this is about. No text labels.`
  );

  const implSummary = narrative.keyImplementations
    .map((ki) => `${ki.title}: ${ki.detail}`)
    .join(". ");
  const implementations = `THIS IMAGE IS ABOUT: ${domainHint}
The key implementations: ${implSummary}

${SHARED_SOLUTION}

Show this as a scene in the ACTUAL WORK ENVIRONMENT for this domain — with the real tools, devices, screens, and objects people use. Paint them beautifully but keep them recognizable and grounded. No text labels.`;

  const technical = `THIS IMAGE IS ABOUT: ${domainHint}
The innovation: "${narrative.technicalInnovation}"

${SHARED_SOLUTION}

Capture the elegance of this approach within this specific domain. Recognizable elements composed with artistic sophistication. 4:3 aspect ratio. No text labels.`;

  const impact = `THIS IMAGE IS ABOUT: ${domainHint} The results achieved:
${narrative.impactMetrics.map((m) => `- ${m}`).join("\n")}

${SHARED_SOLUTION}

Show these results in the workplace and setting of this specific domain. The image should feel like the successful outcome of the work described. Achievement mood through the domain itself. 4:3 aspect ratio. No text labels.`;

  return { intro, phases, implementations, technical, impact };
}

/**
 * Build a challenge prompt from narrative content.
 * @param {{ challenge: string }} narrative
 * @returns {string}
 */
export function buildChallengePromptFromNarrative(narrative) {
  return `THIS IMAGE IS ABOUT: ${narrative.challenge}

${SHARED_CHALLENGE}

Show recognizable elements from this domain under stress — friction, fragmentation, obstacles — rendered artistically. The viewer should understand what field this is and feel the tension. No text labels.`;
}

/** @type {Record<string, StoryPrompts>} */
export const STORY_PROMPTS_BY_SLUG = {
  // All manual overrides removed — every slug uses auto-generated prompts from narrative content
};
