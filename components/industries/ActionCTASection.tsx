"use client";

import { Calendar, FileText, Download, Users, ArrowRight } from 'lucide-react';
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
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#DBEAFE] text-[#0A58D0] text-xs font-semibold mb-4">
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
          className="w-full bg-[#0A58D0] hover:bg-[#0A58D0]/90 text-white rounded-lg transition-all duration-300 group-hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]"
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

interface ActionCTASectionProps {
  title?: string;
  subtitle?: string;
  onConsultationClick?: () => void;
}

export function ActionCTASection({
  title = "Ready to Transform Your Industry?",
  subtitle = "Choose your next step to get started with industry-specific AI solutions",
  onConsultationClick
}: ActionCTASectionProps) {
  const actionCards: ActionCardProps[] = [
    {
      icon: Calendar,
      title: "Schedule Consultation",
      description: "60-minute session to discuss your sector-specific challenges and explore proven solutions tailored to your industry.",
      tag: "Complimentary",
      gradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      action: "Book Your Call",
      onClick: onConsultationClick
    },
    {
      icon: FileText,
      title: "Industry Case Studies",
      description: "See how we've solved problems similar to yours with measurable ROI across healthcare, finance, manufacturing, and retail.",
      tag: "Free Download",
      gradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      action: "View Case Studies",
      href: "/case-studies"
    },
    {
      icon: Download,
      title: "Solution Guides",
      description: "Free resources covering use cases, compliance requirements, and implementation best practices specific to your sector.",
      tag: "Free Resources",
      gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      action: "Download Guides",
      href: "/resources"
    },
    {
      icon: Users,
      title: "Industry Workshop",
      description: "Join our quarterly workshops showcasing the latest AI innovations and use cases specifically for your industry.",
      tag: "Register Now",
      gradient: "bg-gradient-to-br from-[#FECACA] to-[#F87171]",
      action: "Join Workshop",
      href: "/workshops"
    }
  ];

  return (
    <section className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {actionCards.map((card, idx) => (
          <ActionCard key={idx} {...card} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-8 pt-6 border-t border-[#E5E7EB]">
        <p className="text-sm text-[#525252] mb-4">
          Transform your industry challenges into competitive advantages. Contact Innovoco today to receive a customized roadmap for AI and data transformation in your sector.
        </p>
      </div>
    </section>
  );
}
