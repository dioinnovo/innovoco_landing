"use client";

import { IndustryFAQs } from '@/components/industries/IndustryFAQs';

interface FAQ {
  question: string;
  answer: string;
}

export const healthcareFAQs: FAQ[] = [
  {
    question: "How do you ensure HIPAA compliance in AI automation solutions?",
    answer: "Our healthcare AI solutions are designed with HIPAA compliance from the ground up. We implement all required technical safeguards including AES-256 encryption at rest, TLS 1.3 for data in transit, comprehensive audit logging of all PHI access, role-based access controls (RBAC), and automated PHI de-identification for analytics. We execute Business Associate Agreements (BAAs) with all cloud providers and subprocessors, conduct regular security assessments, and maintain disaster recovery plans. Our compliance specialists work alongside engineers to ensure every solution meets HIPAA Privacy Rule, Security Rule, and Breach Notification requirements before deployment."
  },
  {
    question: "Which EHR systems do you integrate with?",
    answer: "We have deep integration experience with all major EHR platforms including Epic (MyChart, Hyperspace, FHIR APIs), Cerner (Millennium, PowerChart, HealtheIntent), Allscripts (Sunrise, TouchWorks), athenahealth, and eClinicalWorks. Our integrations leverage HL7 FHIR, HL7 v2.x messaging, Direct Protocol for secure messaging, and native EHR APIs. We understand the data models, custom workflows, and security requirements of each platform, enabling us to build AI solutions that seamlessly integrate with your existing clinical systems without disrupting care delivery workflows."
  },
  {
    question: "What is the typical ROI timeline for healthcare AI automation?",
    answer: "ROI timelines vary by use case complexity and implementation scope. Clinical decision support systems (sepsis detection, drug interaction alerts) typically show ROI within 6-9 months through reduced adverse events and improved patient outcomes. Predictive analytics for readmission reduction delivers ROI in 8-12 months via decreased readmission penalties and improved care coordination. Medical image analysis shows value within 4-6 months through faster diagnoses and reduced radiologist workload. Population health management platforms achieve ROI in 12-18 months through better risk stratification and resource allocation. We provide detailed ROI modeling during discovery based on your baseline metrics, patient volume, and current operational costs."
  },
  {
    question: "How do you handle PHI (Protected Health Information) in analytics?",
    answer: "We employ multiple strategies for PHI handling depending on the use case. For operational analytics, we use automated de-identification removing all 18 HIPAA identifiers while preserving statistical validity through techniques like k-anonymity and differential privacy. For clinical decision support requiring identified PHI, we implement strict access controls, audit all PHI access with real-time alerts for suspicious activity, use field-level encryption for sensitive data elements, and ensure minimum necessary data access. For research analytics, we create Limited Data Sets (LDS) with Data Use Agreements. All PHI processing occurs within HIPAA-compliant infrastructure (AWS HIPAA, Azure HIPAA, Google Cloud HIPAA) with proper network isolation, encryption, and monitoring."
  },
  {
    question: "Can AI automation improve both clinical outcomes and operational efficiency?",
    answer: "Absolutely. The most successful healthcare AI implementations deliver dual benefits. Clinically, AI-powered sepsis early warning systems reduce mortality by 15-20% while also decreasing ICU length of stay. Medical image analysis improves diagnostic accuracy by 30-40% while reducing radiologist reading time by 25-30%. Predictive readmission models improve patient outcomes through proactive interventions while reducing readmission penalties ($125K-$300K annually per hospital). Population health risk stratification enables better clinical outcomes for high-risk patients while optimizing care management resources. We design all solutions to deliver measurable improvements in both patient care quality and operational metrics."
  },
  {
    question: "What compliance certifications do your healthcare solutions maintain?",
    answer: "Our healthcare solutions are built on infrastructure certified for HIPAA compliance (AWS HIPAA, Azure HIPAA, Google Cloud HIPAA with executed BAAs). For medical imaging AI, we support FDA Software as a Medical Device (SaMD) compliance pathways when applicable. We maintain SOC 2 Type II certification for our development and managed services operations. Solutions integrate with HITRUST-certified environments and support Joint Commission, CMS, and state health department compliance requirements. Our development follows NIST Cybersecurity Framework and OWASP security standards. We provide compliance documentation, security assessments, and support for your internal audits and regulatory reviews."
  },
  {
    question: "How do you train AI models while protecting patient privacy?",
    answer: "We employ privacy-preserving AI techniques throughout the model development lifecycle. For model training, we use federated learning allowing models to learn from distributed datasets without centralizing PHI, differential privacy adding statistical noise to protect individual privacy, synthetic data generation creating realistic training data without real PHI, and secure multi-party computation for collaborative model development. All training data is de-identified per HIPAA Safe Harbor or Expert Determination methods. We maintain strict data governance with data use agreements, audit all data access, use secure enclaves for sensitive processing, and implement model testing to prevent privacy leakage. Models are validated on diverse patient populations to ensure equitable performance."
  },
  {
    question: "Do you provide ongoing monitoring and model retraining for healthcare AI?",
    answer: "Yes, continuous monitoring and retraining are critical for healthcare AI. Our managed AI services include 24/7 monitoring of model performance metrics (accuracy, sensitivity, specificity), real-time alerting for model drift or degradation, automated retraining pipelines when performance thresholds are breached, and A/B testing of model updates before production deployment. For clinical decision support, we monitor alert fatigue metrics and clinical adoption rates. For predictive models, we track calibration drift and feature importance changes. We provide monthly performance reports, quarterly business reviews, and maintain audit trails of all model updates for regulatory compliance. SLA-backed support ensures your AI solutions continue delivering value as patient populations and clinical practices evolve."
  }
];

export function HealthcareFAQs() {
  return (
    <IndustryFAQs
      faqs={healthcareFAQs}
      title="Healthcare AI Automation FAQs"
      description="Common questions about implementing HIPAA-compliant AI automation and analytics in healthcare"
    />
  );
}
