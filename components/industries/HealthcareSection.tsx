"use client";

import { ServiceSection } from '@/components/services/ServiceSection';
import { UseCaseCard, UseCaseGrid } from './UseCaseCard';
import { MetricCard, MetricGrid } from './MetricCard';
import { TechnologyIntegration } from './TechnologyIntegration';
import { healthcareTechnologies } from './TechnologyStack';
import { HeartPulse, Activity, Users, Shield, Target, Brain, FileText, AlertTriangle } from 'lucide-react';

export function HealthcareSection() {
  return (
    <div id="healthcare" className="scroll-mt-20">
      <ServiceSection
        icon={HeartPulse}
        iconGradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
        title="Healthcare AI Automation & Analytics Solutions"
        subtitle="HIPAA-compliant intelligent automation and analytics platforms for better patient outcomes"
      >
        {/* Key Metrics */}
        <MetricGrid columns={4}>
          <MetricCard
            icon={Activity}
            metric="90%+"
            label="Diagnostic Accuracy"
            description="AI-assisted radiology for faster, more accurate diagnoses"
            gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          />
          <MetricCard
            icon={Users}
            metric="25%"
            label="Readmission Reduction"
            description="ML models predicting 30-day readmission risk"
            gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            trend="down"
            trendValue="25%"
          />
          <MetricCard
            icon={Target}
            metric="75-85%"
            label="Prediction Accuracy"
            description="High-risk patient identification for proactive care"
            gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          />
          <MetricCard
            icon={Shield}
            metric="100%"
            label="HIPAA Compliant"
            description="Full encryption, audit trails, BAAs in place"
            gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          />
        </MetricGrid>

        {/* Clinical Decision Support */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            Clinical Decision Support & Diagnostics
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            AI-powered clinical decision support systems help physicians diagnose diseases faster and more accurately by analyzing patient
            histories, lab results, medical imaging, and clinical notes. Our healthcare AI solutions integrate with EHR systems (Epic,
            Cerner, Allscripts) to provide real-time alerts for drug interactions, sepsis risk, and clinical deterioration.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={AlertTriangle}
              title="Sepsis Early Warning"
              metric="6-12 hrs advance notice"
              description="Real-time risk scoring using EHR data to alert clinicians before onset. Analyzes vital signs, lab results, and patient history to detect sepsis patterns 6-12 hours before clinical manifestation. Reduces sepsis mortality by 15-20%."
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
            <UseCaseCard
              icon={FileText}
              title="Medical Image Analysis"
              metric="90%+ sensitivity"
              description="AI-assisted radiology for detecting tumors, fractures, and abnormalities in X-rays, CT scans, MRIs. Computer vision models trained on NIH ChestX-ray and MIMIC datasets reduce diagnostic errors by 30-40%."
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
            <UseCaseCard
              icon={Users}
              title="Clinical Trial Matching"
              metric="40% faster enrollment"
              description="NLP-based patient-trial matching to accelerate enrollment and improve outcomes. Natural language processing analyzes EHR data to match eligible patients with relevant clinical trials automatically."
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
            <UseCaseCard
              icon={Shield}
              title="Drug Interaction Detection"
              metric="Real-time alerts"
              description="Alerts for dangerous medication combinations at prescription time. Analyzes patient medications, allergies, and conditions to prevent adverse drug events. Reduces adverse drug events by 25-35%."
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
          </UseCaseGrid>
        </div>

        {/* Population Health */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            Population Health Management & Predictive Analytics
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Population health initiatives improve outcomes for entire patient populations while reducing costs. Our predictive analytics
            solutions identify high-risk patients—those likely to be readmitted, develop chronic conditions, or become high utilizers of
            emergency services—enabling proactive interventions.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Target}
              title="30-Day Readmission Prediction"
              metric="75-85% accuracy"
              description="ML models to target discharge planning resources effectively"
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
            <UseCaseCard
              icon={Activity}
              title="Chronic Disease Management"
              metric="30% cost reduction"
              description="Risk stratification for diabetes, CHF, COPD patients requiring intensive support"
              gradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
            />
          </UseCaseGrid>
        </div>

        {/* HIPAA Compliance */}
        <div className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] border border-[#FCA5A5]/30">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <Shield className="h-7 w-7 text-[#DC2626]" />
            Healthcare Data Compliance & Security
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-6">
            HIPAA compliance is non-negotiable. Our solutions implement required safeguards: encryption at rest and in transit (AES-256, TLS 1.3),
            role-based access controls, comprehensive audit logging, and disaster recovery plans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#FCA5A5]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">HIPAA Technical Safeguards</h4>
              <p className="text-sm text-[#525252]">Encryption, access controls, audit logs, transmission security</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#FCA5A5]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">PHI De-Identification</h4>
              <p className="text-sm text-[#525252]">Automated removal of 18 HIPAA identifiers for research and analytics</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#FCA5A5]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Business Associate Agreements</h4>
              <p className="text-sm text-[#525252]">BAAs with AWS, Azure, Google Cloud and all subprocessors</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#FCA5A5]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Audit & Monitoring</h4>
              <p className="text-sm text-[#525252]">Real-time alerts for unauthorized PHI access or suspicious activity</p>
            </div>
          </div>
        </div>

        {/* Technology Integrations */}
        <TechnologyIntegration
          title="Healthcare Technology Integrations"
          description="Seamless integration with leading EHR systems, health data platforms, and compliance frameworks"
          technologies={healthcareTechnologies}
          gradient="from-[#FECACA] to-[#FCA5A5]"
        />
      </ServiceSection>
    </div>
  );
}
