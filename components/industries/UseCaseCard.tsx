"use client";

import { motion } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";
import { useState } from "react";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  metric?: string;
  description: string;
  details?: string;
  benefits?: string[];
  gradient?: string;
  delay?: number;
  expandable?: boolean;
}

export function UseCaseCard({
  icon: Icon,
  title,
  metric,
  description,
  details,
  benefits,
  gradient = "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
  delay = 0,
  expandable = false
}: UseCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <div
        className={`
          group
          h-full
          relative
          overflow-hidden
          rounded-2xl
          bg-white
          border
          border-border/30
          hover:border-border/50
          shadow-sm
          hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]
          transition-all
          duration-300
          ${expandable ? 'cursor-pointer' : ''}
        `}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
      >
        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            {/* Icon */}
            <div className={`
              w-12 h-12
              rounded-xl
              ${gradient}
              flex items-center justify-center
              flex-shrink-0
              group-hover:scale-105
              transition-transform
              duration-300
              shadow-sm
            `}>
              <Icon className="h-6 w-6 text-white" />
            </div>

            {/* Title and Metric */}
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-[#0B0F19] mb-1 leading-tight">
                {title}
              </h4>
              {metric && (
                <p className="text-sm font-bold text-[#0A58D0]">
                  {metric}
                </p>
              )}
            </div>

            {/* Expand Icon */}
            {expandable && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronRight className="h-5 w-5 text-[#6B7280]" />
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#525252] leading-relaxed mb-3">
            {description}
          </p>

          {/* Expanded Content */}
          {expandable && (
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-border/30">
                {details && (
                  <p className="text-sm text-[#525252] leading-relaxed mb-3">
                    {details}
                  </p>
                )}

                {benefits && benefits.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#0B0F19] uppercase tracking-wide">
                      Key Benefits
                    </p>
                    <ul className="space-y-1.5">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#525252]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-1.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Accent Bar (optional) */}
        <div className={`h-1 ${gradient}`} />
      </div>
    </motion.div>
  );
}

// Grid wrapper component for consistent layout
interface UseCaseGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export function UseCaseGrid({ children, columns = 2 }: UseCaseGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-5 my-6`}>
      {children}
    </div>
  );
}
