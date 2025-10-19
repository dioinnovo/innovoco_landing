"use client";

import { TrendingUp, Shield, Network, Target, ChevronDown, ChevronUp } from 'lucide-react';
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
            <div className="text-sm font-semibold text-[#0F766E] mb-1">{metric}</div>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] flex-shrink-0 mt-1.5" />
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

interface DifferentiatorGridProps {
  columns?: 1 | 2 | 3 | 4;
}

export function DifferentiatorGrid({ columns = 2 }: DifferentiatorGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const differentiators: DifferentiatorCardProps[] = [
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      metric: "500+ Solutions Delivered",
      description: "10+ years delivering AI and data solutions across healthcare, financial services, manufacturing, and retail with deep industry expertise.",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      highlights: [
        "Regulatory compliance expertise across industries",
        "Legacy system integration with decades-old infrastructure",
        "Industry-specific best practices, not generic frameworks"
      ]
    },
    {
      icon: Shield,
      title: "Compliance & Regulatory Expertise",
      metric: "100% Certified Solutions",
      description: "HIPAA-compliant healthcare platforms, SOC 2/PCI-DSS financial systems, and data architectures meeting GDPR, CCPA, and industry regulations.",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      highlights: [
        "Compliance specialists ensure legal requirements from design to deployment",
        "Minimize audit risk and enable rapid certification",
        "Embedded governance frameworks for ongoing compliance"
      ]
    },
    {
      icon: Network,
      title: "System Integration Expertise",
      metric: "50+ Platform Integrations",
      description: "Deep integration experience with specialized systems: EHRs (Epic, Cerner), core banking (FIS, Temenos), MES (Siemens, Rockwell), retail POS (Oracle, SAP).",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      highlights: [
        "Understand data models, APIs, and customization patterns",
        "Accelerate implementation and reduce integration risk",
        "Support for legacy and modern systems simultaneously"
      ]
    },
    {
      icon: Target,
      title: "Measurable Business Outcomes",
      metric: "ROI-Driven Approach",
      description: "Track real business metrics: patient outcomes, fraud detection rates, OEE improvements, revenue lift. Success defined by business impact, not technical metrics.",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      highlights: [
        "Define success criteria upfront with clear KPIs",
        "Transparent progress reporting throughout implementation",
        "Guarantee AI investments deliver promised returns"
      ]
    }
  ];

  return (
    <section className="mt-16 mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0B0F19] mb-3">
          Why Choose Innovoco for Industry Solutions
        </h2>
        <p className="text-lg text-[#525252]">
          Deep sector expertise combined with technical excellence
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
