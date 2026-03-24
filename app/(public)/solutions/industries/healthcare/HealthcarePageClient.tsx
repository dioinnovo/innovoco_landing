"use client";

import {
  IndustryPage,
  type IndustryCapability,
  type IndustryComplianceItem,
} from "@/components/industries/IndustryPage";
import {
  Shield,
  Activity,
  HeartPulse,
  AlertTriangle,
  Brain,
  Users,
  Target,
  FileText,
  CheckCircle,
} from "lucide-react";
import { healthcareConfig } from "@/lib/content/industries/healthcare";

const tokens = {
  heroBg: "#1a1a2e",
  heroBorder: "#374151",
  accent: "#059669",
  accentHover: "#047857",
  cta: "#10B981",
  ctaText: "#ffffff",
  subtext: "#94A3B8",
  badgeBorder: "#065f46",
  badgeBg: "rgba(6, 95, 70, 0.75)",
  badgeText: "#6ee7b7",
  pulseDot: "#10B981",
  heroOverlayClassName: "from-slate-950/85 via-slate-900/65 to-slate-950",
  outlineButtonHoverBgClass: "hover:!bg-[#34D399]/10",
  ctaShadowColor: "16, 185, 129",
};

const capabilities: IndustryCapability[] = [
  {
    icon: Brain,
    title: "Clinical Decision Support",
    useCaseSlug: "healthcare-capacity-clinical-ops",
    illustrationSrc: "/images/industries/healthcare/solutions/clinical-decision-support.jpg",
    description:
      "AI-powered clinical decision support systems that analyze patient histories, lab results, medical imaging, and clinical notes in real time. Integrated with EHR systems like Epic, Cerner, and Allscripts to provide drug interaction alerts, sepsis risk detection, and clinical deterioration warnings at the point of care.",
    stats: [
      { label: "Diagnostic Accuracy", value: "90%+" },
      { label: "Adverse Events Reduction", value: "25-35%" },
      { label: "Alert Response Time", value: "Real-time" },
    ],
  },
  {
    icon: Activity,
    title: "Medical Imaging AI",
    useCaseSlug: "medical-imaging-radiology-ai",
    illustrationSrc: "/images/industries/healthcare/solutions/medical-imaging-ai.jpg",
    description:
      "Computer vision models trained on NIH ChestX-ray14 and MIMIC datasets that detect tumors, fractures, and abnormalities in X-rays, CT scans, and MRIs. Prioritizes urgent cases for radiologist review, reducing turnaround times and diagnostic errors while handling 500+ daily imaging studies.",
    stats: [
      { label: "Sensitivity Rate", value: "90%+" },
      { label: "Turnaround Reduction", value: "18 hrs" },
      { label: "Fewer Diagnostic Errors", value: "30-40%" },
    ],
  },
  {
    icon: Target,
    title: "Population Health Management",
    useCaseSlug: "population-health-management",
    illustrationSrc: "/images/industries/healthcare/solutions/population-health-management.jpg",
    description:
      "Predictive analytics platform integrated with multiple EHRs for chronic disease risk scoring, gap-in-care identification, and automated outreach for preventive services. Identifies high-risk patients likely to be readmitted, develop chronic conditions, or become high utilizers of emergency services.",
    stats: [
      { label: "Prediction Accuracy", value: "75-85%" },
      { label: "Care Cost Reduction", value: "30%" },
      { label: "Preventive Care Lift", value: "22%" },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Sepsis Early Warning System",
    useCaseSlug: "sepsis-early-warning-system",
    illustrationSrc: "/images/industries/healthcare/solutions/sepsis-early-warning.jpg",
    description:
      "Real-time sepsis detection using EHR data streams including vital signs, lab results, and clinical notes. ML models alert clinicians 6-12 hours before clinical manifestation, enabling early antibiotic administration and dramatically reducing mortality in critical care settings.",
    stats: [
      { label: "Early Detection", value: "6-12 hrs" },
      { label: "Mortality Reduction", value: "15-20%" },
      { label: "ICU Stay Reduction", value: "35%" },
    ],
  },
];

const complianceItems: IndustryComplianceItem[] = [
  { icon: Shield, label: "HIPAA" },
  { icon: CheckCircle, label: "SOC 2 Type II" },
  { icon: FileText, label: "FDA SaMD" },
  { icon: Users, label: "HITRUST" },
  { icon: Target, label: "CMS / MIPS" },
  { icon: Brain, label: "Joint Commission" },
];

export function HealthcarePageClient() {
  return (
    <IndustryPage
      config={healthcareConfig}
      tokens={tokens}
      heroImageSrc="/images/industries/healthcare-hero.jpg"
      headlineAccent="Healthcare"
      headlineRest="& Life Sciences AI Solutions"
      capabilitiesTitle="AI Solutions Engineered for Healthcare"
      capabilitiesSubtitle="Purpose-built AI capabilities that address the unique challenges of clinical care, diagnostics, compliance, and population health management."
      complianceEyebrow="Compliance & Security"
      complianceHeadline="HIPAA-compliant infrastructure with end-to-end encryption and audit trails"
      complianceItems={complianceItems}
      capabilities={capabilities}
      serviceSchemaName="Healthcare AI Solutions"
      serviceType="Healthcare AI Solutions"
      trackEventName="Healthcare Industry Solutions"
      breadcrumbLabel="Healthcare"
      breadcrumbUrl="https://innovoco.com/solutions/industries/healthcare"
      faqValuePrefix="healthcare-faq"
      getStartedVisualTheme="healthcare"
    />
  );
}
