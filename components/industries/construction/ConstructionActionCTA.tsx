"use client";

import { ActionCTASection } from '../ActionCTASection';

export function ConstructionActionCTA({ onConsultationClick }: { onConsultationClick: () => void }) {
  const actions = [
    {
      title: "Schedule Free Consultation",
      description: "30-minute session with a construction AI specialist to discuss your specific inspection, reporting, and maintenance challenges",
      buttonText: "Book Consultation",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    },
    {
      title: "Request ROI Analysis",
      description: "Get a customized ROI projection showing cost savings and efficiency gains for your construction business",
      buttonText: "Get ROI Analysis",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    },
    {
      title: "Schedule Live Demo",
      description: "See our AI property inspection and predictive maintenance solutions in action with your own sample data",
      buttonText: "Book Demo",
      onClick: onConsultationClick,
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    }
  ];

  return (
    <ActionCTASection
      title="Ready to Transform Your Construction Operations?"
      description="Get started with AI-powered inspections and predictive maintenance"
      actions={actions}
    />
  );
}
