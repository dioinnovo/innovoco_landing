"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IndustryActionCard } from '@/lib/content/industries/types';

interface ActionCardProps extends IndustryActionCard {
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
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
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
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all duration-300 group-hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]"
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

interface IndustryActionCTAProps {
  title: string;
  subtitle: string;
  cards: IndustryActionCard[];
  onConsultationClick?: () => void;
  footerText?: string;
  gradientBackground?: string;
}

export function IndustryActionCTA({
  title,
  subtitle,
  cards,
  onConsultationClick,
  footerText,
  gradientBackground = "bg-gradient-to-br from-blue-50 to-indigo-50"
}: IndustryActionCTAProps) {
  return (
    <section className={`mt-16 mb-12 p-8 rounded-2xl ${gradientBackground} border border-blue-100/50`}>
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
        {cards.map((card, idx) => (
          <ActionCard key={idx} {...card} onClick={onConsultationClick} />
        ))}
      </div>

      {/* Footer CTA */}
      {footerText && (
        <div className="text-center mt-8 pt-6 border-t border-blue-200/50">
          <p className="text-sm text-[#525252] mb-4">
            {footerText}
          </p>
        </div>
      )}
    </section>
  );
}
