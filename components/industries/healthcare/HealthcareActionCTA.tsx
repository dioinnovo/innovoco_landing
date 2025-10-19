"use client";

import { Calendar, FileText, Download, Shield, ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  action: string;
  onClick?: () => void;
  href?: string;
}

function ActionCard({
  icon: Icon,
  title,
  description,
  tag,
  gradient,
  action,
  onClick,
  href
}: ActionCardProps) {
  const CardContent = (
    <div className="group bg-white border border-[#E5E7EB]/50 hover:border-[#E5E7EB] shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px] overflow-hidden cursor-pointer">
      <div className="p-6">
        {/* Tag */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold mb-4">
          {tag}
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-[#0B0F19] mb-2">{title}</h3>
        <p className="text-sm text-[#525252] leading-relaxed mb-4">
          {description}
        </p>

        {/* CTA Button */}
        <Button
          className="w-full bg-[#DC2626] hover:bg-[#DC2626]/90 text-white rounded-lg transition-all duration-300 group-hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]"
          onClick={onClick}
        >
          {action}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

interface HealthcareActionCTAProps {
  title?: string;
  subtitle?: string;
  onConsultationClick?: () => void;
}

export function HealthcareActionCTA({
  title = "Ready to Transform Healthcare with AI?",
  subtitle = "Choose your next step to get started with HIPAA-compliant AI automation and analytics",
  onConsultationClick
}: HealthcareActionCTAProps) {
  const actionCards: ActionCardProps[] = [
    {
      icon: Shield,
      title: "HIPAA Compliance Assessment",
      description: "Free 60-minute consultation to review your current compliance posture and discuss HIPAA-compliant AI solutions for your healthcare organization.",
      tag: "Complimentary",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      action: "Schedule Assessment",
      onClick: onConsultationClick
    },
    {
      icon: Download,
      title: "Healthcare AI ROI Calculator",
      description: "Calculate potential ROI for AI automation in your healthcare organization. Includes readmission reduction, diagnostic accuracy improvement, and operational efficiency metrics.",
      tag: "Free Tool",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      action: "Get ROI Calculator",
      onClick: onConsultationClick
    },
    {
      icon: Calendar,
      title: "Healthcare AI Webinar",
      description: "Join our quarterly webinar showcasing the latest AI innovations for healthcare: clinical decision support, medical imaging AI, and population health management.",
      tag: "Register Now",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
      action: "Register for Webinar",
      onClick: onConsultationClick
    }
  ];

  return (
    <section className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] border border-[#FCA5A5]/20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#0B0F19] mb-3">
          {title}
        </h2>
        <p className="text-lg text-[#525252] max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {actionCards.map((card, idx) => (
          <ActionCard key={idx} {...card} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-8 pt-6 border-t border-[#FCA5A5]/30">
        <p className="text-sm text-[#525252] mb-4">
          Transform patient care with HIPAA-compliant AI automation and analytics. Contact Innovoco today to receive a customized roadmap for AI transformation in your healthcare organization.
        </p>
      </div>
    </section>
  );
}
