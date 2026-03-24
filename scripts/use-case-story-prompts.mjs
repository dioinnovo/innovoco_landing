/**
 * Per-slug prompts for solution / story imagery (Gemini).
 * Each entry must stay distinct so generated files do not look interchangeable.
 */

import { CINEMATIC_STYLE_ANCHOR } from "./ai-art-style-anchor.mjs";

export const SHARED_SOLUTION = `Premium editorial illustration for an enterprise AI case study — SOLUTION and forward progress (not problems); mood is hopeful, motivating, and clear-eyed, not cold or ominous.
${CINEMATIC_STYLE_ANCHOR}
Atmospheric depth with warm undertones (dawn light, soft fog, gentle uplight). Innovoco palette: luminous cobalt and royal blue, crimson and rose highlights where sun meets sky; fluid ribbons; optional subtle grid or light trails (abstract). Square 1:1 for phase tiles. NOT photorealistic people. No readable text, no logos, no watermarks, no UI screenshots, no brand names.`;

/** @typedef {{ phases: string[]; implementations: string; technical: string; impact: string }} StoryPrompts */

/** @type {Record<string, StoryPrompts>} */
export const STORY_PROMPTS_BY_SLUG = {
  "executive-self-serve-analytics": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Model guardrails — layered semantic planes sliding into alignment, role boundaries as soft translucent rings, eval gates as calm checkpoints of light.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Pilot then broaden — ripples expanding from a steering cohort core, telemetry as fine light trails, measured expansion without sprawl.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — Key implementations: entitlements, citations, audit logs — braided threads of trust connecting vault-like forms, traceability as continuous filaments.`,
    technical: `${SHARED_SOLUTION}
Theme — Technical innovation: RAG, metadata, optional graphs — stacked reasoning terraces, retrieval beams meeting structured bases, orchestration as graceful bridges.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: fewer tickets, faster answers, audit readiness — ascending calm gradients, balanced metrics as harmonious vertical rhythm, relief from queue pressure.`,
  },
  "customer-support-voice": {
    phases: [
      `${SHARED_SOLUTION}
Theme — Phase 1: Instrument and segment — mined intents as categorized aurora bands, policy boundaries as smooth enclosures, intent maps as flowing topology.`,
      `${SHARED_SOLUTION}
Theme — Phase 2: Automate with guardrails — assisted resolution streams, human review as warm halos on edge cases, containment as protective arcs.`,
    ],
    implementations: `${SHARED_SOLUTION}
Theme — CRM grounding, escalation, QA sampling — customer record gravity wells, safe handoff bridges, quality loops as circular light.`,
    technical: `${SHARED_SOLUTION}
Theme — Voice + digital orchestration — waveform ribbons merging with structured CRM geometry, latency-aware routing as sleek diverging channels.`,
    impact: `${SHARED_SOLUTION}
Theme — Impact: CSAT, containment, compliance — uplift curves, steadier service temperature, fewer escalations as calmer color balance.`,
  },
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
};
