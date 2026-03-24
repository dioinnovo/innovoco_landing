/**
 * Default anonymized testimonial copy per use-case slug so the glass testimonial
 * block renders consistently. Override with `UseCaseStudyNarrative.quote` when
 * you have approved client language.
 */
export const useCaseDefaultTestimonials: Record<
  string,
  { body: string; attribution?: string }
> = {
  "executive-self-serve-analytics": {
    body: "Our VPs ask in plain language and get charts back while the meeting is still live. We are not bypassing governance—every answer ties to the warehouse and we can show the full trail.",
    attribution: "— Data & analytics leadership, Fortune 500 (anonymized)",
  },
  "customer-support-voice": {
    body: "Containment went up without our agents feeling replaced. The model stays inside CRM and policy; humans still own the hard cases.",
    attribution: "— VP Customer Operations (anonymized)",
  },
  "regulated-onboarding-kyc-aml": {
    body: "Exception queues used to live in email. Now every decision has evidence, model version, and reviewer sign-off—we can replay a case in minutes.",
    attribution: "— Chief Compliance Officer (anonymized)",
  },
  "supply-chain-demand": {
    body: "Forecast and replenishment finally speak the same language. Planners spend time on exceptions and suppliers, not reconciling spreadsheets.",
    attribution: "— VP Supply Chain (anonymized)",
  },
  "field-services-iot-playbooks": {
    body: "Technicians close jobs with photos and voice once; billing and warranty see the same story. Repeat visits dropped on our pilot routes.",
    attribution: "— Field Operations Director (anonymized)",
  },
  "finance-close-reconciliation": {
    body: "Auto-matched lines with real exception aging changed our close rhythm. Auditors pull evidence by ID instead of digging through inboxes.",
    attribution: "— Corporate Controller (anonymized)",
  },
  "hr-onboarding-policy": {
    body: "Hiring managers see readiness in one place. IT and HR stopped playing status ping-pong the week we turned the orchestration on.",
    attribution: "— Chief People Officer (anonymized)",
  },
  "marketing-personalization": {
    body: "Growth moves faster when experiments, consent, and brand rules live in one pipeline. Sales finally trusts the same segments we market to.",
    attribution: "— CMO (anonymized)",
  },
  "reporting-audit-packs": {
    body: "Board packs regenerate from signed-off metrics. Last-minute fire drills still happen—but they are exceptions, not the operating model.",
    attribution: "— CFO office (anonymized)",
  },
  "governed-knowledge-copilot": {
    body: "Employees get one front door with citations and ACLs respected. Shadow use of consumer chat dropped within a quarter.",
    attribution: "— CIO (anonymized)",
  },
  "healthcare-capacity-clinical-ops": {
    body: "We see staffing and supply risk before service levels slip. Approvals stay human; the system keeps the rationale for review.",
    attribution: "— Chief Nursing Officer (anonymized)",
  },
  "global-payroll-pay-compliance": {
    body: "Multi-country runs ship with calculation snapshots and statutory checklists. Payroll corrections and audit prep are night-and-day different.",
    attribution: "— Global Payroll COE lead (anonymized)",
  },
};

export function resolveUseCaseTestimonial(slug: string): { body: string; attribution?: string } | undefined {
  return useCaseDefaultTestimonials[slug];
}
