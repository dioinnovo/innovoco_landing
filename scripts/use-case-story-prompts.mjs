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

/** @type {Record<string, Partial<StoryPrompts>>} */
export const STORY_PROMPTS_BY_SLUG = {
  "marketing-personalization": {
    phases: [
      undefined, // Phase 1 uses auto-generated prompt
      `THIS IMAGE IS ABOUT: A marketing team using AI to systematically generate campaign variants, test them scientifically, and learn from results.
The topic: "Phase 2 — Automate creation & learning: Generate variants within brand rubrics; route approvals; log outcomes for reuse. The AI system learns from data and creates better campaigns in a systematic, almost scientific way."

${SHARED_SOLUTION}

Show a MARKETING ANALYTICS LAB — a sleek workspace where AI is generating multiple campaign variants displayed on screens side by side (email layouts, ad creatives, push notification variants). Visualize the learning loop: results flowing back from campaigns into the system, with performance metrics (conversion rates, engagement scores) feeding optimization algorithms. Show A/B test comparisons, lift charts, and a feedback cycle diagram glowing on a central display. People reviewing the AI-suggested winning variants. The mood is systematic experimentation — science meets creativity. Absolutely NO landscapes, NO mountains, NO nature scenes. This is DATA-DRIVEN MARKETING. Square 1:1 for phase tiles. No text labels.`,
    ],
    technical: `THIS IMAGE IS ABOUT: Closed-loop analytics that tie exposure data to downstream pipeline impact — personalization that optimizes revenue, not just clicks.
The innovation: "Closed-loop analytics tie exposure data to downstream pipeline impact—so personalization optimizes revenue, not just clicks."

${SHARED_SOLUTION}

Show a MARKETING INTELLIGENCE CENTER — a sophisticated analytics workspace with large curved screens showing the FULL FUNNEL: campaign exposure at the top flowing through engagement metrics, pipeline conversion, and ultimately revenue attribution at the bottom. Visualize the closed loop: revenue data feeding back up to optimize future campaigns. Show causal attribution paths (not just correlation), holdout group comparisons, and incremental lift measurements. The mood is clarity and precision — marketing as a measurable revenue engine. Absolutely NO landscapes, NO mountains, NO nature. This is MARKETING ANALYTICS and REVENUE SCIENCE. 4:3 aspect ratio. No text labels.`,
  },
  "customer-360-identity-resolution": {
    phases: [
      undefined, // Phase 1 uses auto-generated prompt
      `THIS IMAGE IS ABOUT: A multi-channel retailer resolving fragmented customer identities into unified golden records.
The topic: "Phase 2 — Resolution + activation: Applied clustering algorithms to identify groups of records that belong to the same person. Produced golden records with merge provenance and exposed resolved profiles via API to the CDP, CRM, loyalty, and marketing platforms. Consent and preference records follow the golden identity—so opt-outs propagate across all fragments automatically."

${SHARED_SOLUTION}

Show a MODERN RETAIL DATA OPERATIONS ROOM — large screens displaying customer identity graphs where scattered fragments merge into unified golden profiles. Visualize connections between email icons, phone icons, loyalty cards, and device silhouettes converging into single glowing profile nodes. People in business casual reviewing the unified customer view on screens and tablets. The mood is clarity and resolution — order emerging from fragmentation. Absolutely NO factories, NO industrial machinery, NO landscapes. This is RETAIL CUSTOMER DATA. Square 1:1 for phase tiles. No text labels.`,
    ],
    impact: `THIS IMAGE IS ABOUT: A multi-channel retailer that unified fragmented customer records into a single golden profile. The results achieved:
- Duplicate records reduced from 22% to under 3%
- Marketing spend efficiency improved 28%
- Customer lifetime value models became reliable with 35% more accurate CLV predictions
- Consent compliance achieved across all channels

${SHARED_SOLUTION}

The setting is a MODERN RETAIL HEADQUARTERS — open-plan marketing floor with large screens showing unified customer dashboards, data visualizations of merged identity graphs, and campaign performance metrics. People in business casual reviewing consolidated customer profiles. Warm, successful atmosphere. Absolutely NO factories, NO industrial machinery, NO manufacturing floors. This is a RETAIL and MARKETING story. 4:3 aspect ratio. No text labels.`,
  },
  "deal-flow-ai-diligence": {
    phases: [
      `THIS IMAGE IS ABOUT: A middle-market private equity fund using AI to screen and extract data from deal documents (CIMs, teasers, management presentations).
The topic: "Phase 1 — Deal screening and extraction: Built intake pipelines for CIMs, teasers, and management presentations. Extraction models pull financial metrics (revenue, EBITDA, growth rates, customer concentration), industry classification, and deal terms into structured templates."

${SHARED_SOLUTION}

Show a PRIVATE EQUITY ANALYST'S OFFICE — stacks of confidential information memorandums (CIMs) and deal documents on a polished desk, with a large screen showing structured financial data being extracted: revenue charts, EBITDA waterfall, deal scoring dashboard. A person in business attire reviewing extracted metrics on a tablet. The mood is focused and analytical — intelligence emerging from document chaos. Absolutely NO factories, NO landscapes, NO mountains. This is PRIVATE EQUITY and INVESTMENT BANKING. Square 1:1 for phase tiles. No text labels.`,
      `THIS IMAGE IS ABOUT: A PE fund extending AI extraction to dataroom documents and normalizing portfolio company reporting.
The topic: "Phase 2 — Diligence workflow and portfolio normalization: Extended extraction to dataroom documents (QofE, legal, commercial). Structured outputs feed IC memo templates with sourced citations. Portfolio module normalizes monthly and quarterly reporting from portcos into comparable dashboards with variance flagging."

${SHARED_SOLUTION}

Show a PRIVATE EQUITY WAR ROOM — a large conference table with multiple screens displaying normalized portfolio dashboards, IC memo drafts with highlighted citations, and dataroom document flows. Investment professionals reviewing structured deal materials. Financial charts showing comparable KPIs across portfolio companies. The mood is command and clarity — decisions informed by structured intelligence. Absolutely NO factories, NO landscapes, NO mountains. This is PRIVATE EQUITY and FINANCE. Square 1:1 for phase tiles. No text labels.`,
    ],
    technical: `THIS IMAGE IS ABOUT: A PE fund's document understanding system that combines layout analysis, table extraction, and entity linking for financial documents.
The innovation: "A document understanding layer combines layout analysis, table extraction, and entity linking to handle the diverse formats of financial documents—from formatted CIMs to scanned QofE appendices—without per-document template programming. Mandate-level isolation is enforced at the infrastructure layer."

${SHARED_SOLUTION}

Show an ELEGANT FINANCE TECHNOLOGY WORKSPACE — holographic displays revealing the inner structure of financial documents being parsed: tables being identified, entities being linked, metrics being extracted and connected. The visual metaphor is X-ray vision into complex documents. Sophisticated, precise atmosphere. Absolutely NO factories, NO landscapes, NO mountains. This is FINTECH and DOCUMENT INTELLIGENCE. 4:3 aspect ratio. No text labels.`,
    impact: `THIS IMAGE IS ABOUT: A PE fund that achieved 60% reduction in analyst time, structured IC-ready outputs, unified portfolio views, and full audit trails.
The results achieved:
- 60% reduction in analyst time on initial deal screening and CIM processing
- Structured, IC-ready diligence outputs with page-level citations
- Unified cross-portfolio KPI views replacing manual spreadsheet consolidation
- Full audit trail satisfying LP transparency requirements

${SHARED_SOLUTION}

Show a PRESTIGIOUS INVESTMENT COMMITTEE BOARDROOM — partners and analysts around a long table reviewing clean, structured deal materials on large wall-mounted screens. Portfolio performance dashboards with comparable metrics across companies. The mood is confidence and efficiency — decisions flowing from trusted, structured data. Golden hour light through floor-to-ceiling windows overlooking a financial district skyline. Absolutely NO factories, NO landscapes, NO mountains. This is PRIVATE EQUITY SUCCESS. 4:3 aspect ratio. No text labels.`,
  },
};
