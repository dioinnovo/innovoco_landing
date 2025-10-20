"use client";

import { ServiceSection } from '@/components/services/ServiceSection';
import { UseCaseCard, UseCaseGrid } from './UseCaseCard';
import { MetricCard, MetricGrid } from './MetricCard';
import { TechnologyIntegration } from './TechnologyIntegration';
import { HardHat, Camera, FileText, Wrench, Target, Shield, Zap, Settings } from 'lucide-react';

const constructionTechnologies = [
  { name: "Computer Vision", category: "AI/ML" },
  { name: "IoT Sensors", category: "Hardware" },
  { name: "Drone Integration", category: "Hardware" },
  { name: "PDF Generation", category: "Automation" },
  { name: "Mobile Apps", category: "Platforms" },
];

export function ConstructionSection() {
  return (
    <div id="construction" className="scroll-mt-20">
      <ServiceSection
        icon={HardHat}
        iconGradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
        title="Construction & Home Services AI Solutions"
        subtitle="AI-powered inspections, automated reporting, and predictive maintenance for operational excellence"
      >
        {/* Key Metrics */}
        <MetricGrid columns={4}>
          <MetricCard
            icon={Camera}
            metric="50%"
            label="Faster Inspections"
            description="Automated property inspections with computer vision"
            gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            trend="down"
            trendValue="50%"
          />
          <MetricCard
            icon={Target}
            metric="99.7%"
            label="Detection Accuracy"
            description="Roof damage and defect detection with AI"
            gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
          />
          <MetricCard
            icon={FileText}
            metric="84%"
            label="Report Time Reduction"
            description="From 3 hours manual to 30 minutes automated"
            gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            trend="down"
            trendValue="84%"
          />
          <MetricCard
            icon={Zap}
            metric="70%"
            label="Breakdown Reduction"
            description="HVAC predictive maintenance with IoT analytics"
            gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            trend="down"
            trendValue="70%"
          />
        </MetricGrid>

        {/* Property Inspections */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            AI-Powered Property Inspections
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Transform property inspections with computer vision AI that detects roof damage, structural issues, and property defects
            with 99.7% accuracy. Our drone-integrated solutions reduce inspection time by 50% while improving accuracy and safety—
            eliminating the need for manual roof climbs and reducing liability.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Camera}
              title="Roof Damage Detection"
              metric="99.7% accuracy"
              description="Computer vision identifies hail damage, missing shingles, and structural issues from drone imagery. AI models trained on millions of roof images detect damage patterns with 50% faster inspections and reduced safety risks."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
            <UseCaseCard
              icon={Target}
              title="Property Condition Assessment"
              metric="Automated scoring"
              description="AI-powered property condition scoring for insurance underwriting and risk assessment. Computer vision analyzes exterior photos to assess property condition, age, and maintenance level—reducing inspection costs by 60%."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
          </UseCaseGrid>
        </div>

        {/* Automated Report Generation */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            Automated Report Generation
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Generate professional inspection reports automatically from AI analysis. Our system labels damage, estimates repair costs,
            and produces compliance-ready PDF reports—reducing report generation time from 3 hours of manual work to 30 minutes automated.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={FileText}
              title="Inspection Report Automation"
              metric="30 min vs 3 hrs"
              description="AI-generated reports with damage labeling, repair estimates, and compliance checks. Natural language generation creates professional reports automatically with 84% reduction in generation time and automated PDF delivery."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
            <UseCaseCard
              icon={Shield}
              title="Compliance Documentation"
              metric="Audit-ready"
              description="Automated documentation for building codes, safety standards, and regulatory compliance. AI ensures all required documentation, photos, and certifications are included with automatic compliance checklist validation."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
          </UseCaseGrid>
        </div>

        {/* Predictive Maintenance */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            HVAC & Equipment Predictive Maintenance
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Predict HVAC equipment failures before they happen with IoT sensor analytics. Our predictive maintenance solutions monitor
            temperature, vibration, and performance metrics to schedule proactive maintenance—reducing breakdowns by 70% and energy
            costs by 40% while extending equipment lifespan.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Wrench}
              title="HVAC Failure Prediction"
              metric="70% fewer breakdowns"
              description="IoT sensors predict compressor, motor, and system failures weeks in advance. Machine learning analyzes sensor data to detect anomaly patterns with 70% reduction in emergency breakdowns and 40% energy savings."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
            <UseCaseCard
              icon={Settings}
              title="Lifecycle Management"
              metric="Extended lifespan"
              description="Optimize maintenance schedules and replacement planning based on equipment condition. AI predicts optimal replacement timing and maintenance intervals with 20% longer equipment lifespan and optimized capital expenditure planning."
              gradient="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
            />
          </UseCaseGrid>
        </div>

        {/* Technology Integrations */}
        <TechnologyIntegration
          title="Construction Technology Integrations"
          description="Seamless integration with industry-leading platforms and hardware"
          technologies={constructionTechnologies}
          gradient="from-[#FEF3C7] to-[#FDE68A]"
        />
      </ServiceSection>
    </div>
  );
}
