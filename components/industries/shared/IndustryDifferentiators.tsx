"use client";

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { IndustryDifferentiator } from '@/lib/content/industries/types';

interface DifferentiatorCardProps extends IndustryDifferentiator {
  expandable?: boolean;
  highlights?: string[];
  metric?: string;
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
            {metric && (
              <div className="text-sm font-semibold text-[#2563EB] mb-1">{metric}</div>
            )}
            <h3 className="text-lg font-bold text-[#0B0F19]">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#525252] leading-relaxed mb-4">
          {description}
        </p>

        {/* Highlights - Expandable */}
        {expandable && highlights && highlights.length > 0 && (
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
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0 mt-1.5" />
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

interface IndustryDifferentiatorsProps {
  title: string;
  description: string;
  items: (IndustryDifferentiator & { metric?: string; highlights?: string[] })[];
  columns?: 1 | 2 | 3 | 4;
}

export function IndustryDifferentiators({
  title,
  description,
  items,
  columns = 2
}: IndustryDifferentiatorsProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className="mt-16 mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0B0F19] mb-3">
          {title}
        </h2>
        <p className="text-lg text-[#525252]">
          {description}
        </p>
      </div>

      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {items.map((item, idx) => (
          <DifferentiatorCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
}
