"use client";

import { Shield, Activity, Network, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface DifferentiatorCardProps {
  icon: LucideIcon;
  title: string;
  metric: string;
  description: string;
  gradient: string;
  highlights: string[];
  expandable?: boolean;
}

function DifferentiatorCard({
  icon: Icon,
  title,
  metric,
  description,
  gradient,
  highlights,
  expandable = true
}: DifferentiatorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group bg-white border border-[#E5E7EB]/50 hover:border-[#E5E7EB] shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px] overflow-hidden">
      <div className="p-6">
        {/* Icon and Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#DC2626] mb-1">{metric}</div>
            <h3 className="text-lg font-bold text-[#0B0F19]">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#525252] leading-relaxed mb-4">
          {description}
        </p>

        {/* Highlights - Expandable */}
        {expandable && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium text-[#0A58D0] hover:text-[#0A58D0]/80 transition-colors mb-3"
              aria-expanded={isExpanded}
            >
              <span>Key Capabilities</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isExpanded && (
              <ul className="space-y-2 mt-3 pt-3 border-t border-[#E5E7EB]">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-[#525252]">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface HealthcareDifferentiatorsProps {
  columns?: 1 | 2 | 3 | 4;
}

export function HealthcareDifferentiators({ columns = 2 }: HealthcareDifferentiatorsProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const differentiators: DifferentiatorCardProps[] = [
    {
      icon: Shield,
      title: "HIPAA Compliance Expertise",
      metric: "100% Compliant Deployments",
      description: "Deep expertise in HIPAA Privacy Rule, Security Rule, and Breach Notification requirements. Our compliance specialists ensure every AI solution meets regulatory requirements from design through deployment.",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      highlights: [
        "BAAs with all cloud providers and subprocessors",
        "Automated PHI de-identification for Safe Harbor compliance",
        "Comprehensive audit logging with real-time breach detection",
        "Support for HITRUST, Joint Commission, and state health dept audits"
      ]
    },
    {
      icon: Network,
      title: "EHR Integration Experience",
      metric: "100+ EHR Integrations",
      description: "Seamless integration with Epic, Cerner, Allscripts, athenahealth, and eClinicalWorks. We understand the data models, workflows, and security requirements of each major EHR platform.",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      highlights: [
        "HL7 FHIR, HL7 v2.x, and native EHR API expertise",
        "Real-time clinical decision support integration",
        "Minimal disruption to existing clinical workflows",
        "Support for custom EHR configurations and extensions"
      ]
    },
    {
      icon: Activity,
      title: "Clinical Outcome Focus",
      metric: "25% Avg Patient Outcome Improvement",
      description: "AI solutions designed to improve patient outcomes, not just operational metrics. We measure success through clinical KPIs: reduced mortality, faster diagnoses, fewer adverse events, and improved patient satisfaction.",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      highlights: [
        "15-20% reduction in sepsis mortality rates",
        "30-40% improvement in diagnostic accuracy",
        "25% decrease in 30-day readmission rates",
        "90%+ predictive accuracy for high-risk patient identification"
      ]
    },
    {
      icon: Award,
      title: "Healthcare Regulatory Knowledge",
      metric: "10+ Years Healthcare Experience",
      description: "Navigate complex healthcare regulations including CMS quality programs (MIPS, MSSP), FDA Software as a Medical Device (SaMD), and payer-specific requirements (Medicare, Medicaid, commercial insurance).",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      highlights: [
        "FDA SaMD compliance pathways for medical imaging AI",
        "CMS quality reporting and value-based care expertise",
        "Payer-specific analytics for risk adjustment and quality measures",
        "State health department regulation compliance"
      ]
    }
  ];

  return (
    <section className="mt-16 mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0B0F19] mb-3">
          Why Choose Innovoco for Healthcare AI Automation
        </h2>
        <p className="text-lg text-[#525252]">
          Proven expertise in HIPAA-compliant AI solutions for healthcare providers
        </p>
      </div>

      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {differentiators.map((differentiator, idx) => (
          <DifferentiatorCard key={idx} {...differentiator} />
        ))}
      </div>
    </section>
  );
}
