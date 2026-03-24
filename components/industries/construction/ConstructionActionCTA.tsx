"use client";

import { Calendar, FileText, Users } from 'lucide-react';
import { ActionCTASection, type ActionCardProps } from '../ActionCTASection';

export function ConstructionActionCTA({ onConsultationClick }: { onConsultationClick: () => void }) {
  const actionCards: ActionCardProps[] = [
    {
      icon: Calendar,
      title: "Schedule Free Consultation",
      description:
        "30-minute session with a construction AI specialist to discuss your specific inspection, reporting, and maintenance challenges",
      tag: "Complimentary",
      action: "Book Consultation",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
    },
    {
      icon: FileText,
      title: "Request ROI Analysis",
      description:
        "Get a customized ROI projection showing cost savings and efficiency gains for your construction business",
      tag: "Analysis",
      action: "Get ROI Analysis",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
    },
    {
      icon: Users,
      title: "Schedule Live Demo",
      description:
        "See our AI property inspection and predictive maintenance solutions in action with your own sample data",
      tag: "Live demo",
      action: "Book Demo",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
    },
  ];

  return (
    <ActionCTASection
      title="Ready to Transform Your Construction Operations?"
      subtitle="Get started with AI-powered inspections and predictive maintenance"
      actionCards={actionCards}
    />
  );
}
