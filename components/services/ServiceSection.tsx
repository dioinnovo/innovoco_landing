"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceSectionProps {
  icon?: LucideIcon;
  iconGradient?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
}

export function ServiceSection({
  icon: Icon,
  iconGradient = "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
  title,
  subtitle,
  children,
  id
}: ServiceSectionProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          {Icon && (
            <div className={`
              w-14 h-14
              rounded-xl
              ${iconGradient}
              flex items-center justify-center
              mb-4
              shadow-sm
            `}>
              <Icon className="h-7 w-7 text-[#0A58D0]" />
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-3">
            {title}
          </h2>

          {subtitle && (
            <p className="text-lg text-[#525252] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Section Content */}
        <div className="prose prose-lg max-w-none
          prose-headings:text-[#0B0F19]
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8
          prose-h4:text-xl prose-h4:font-semibold prose-h4:mb-3 prose-h4:mt-6
          prose-p:text-[#525252] prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-[#525252]
          prose-li:mb-2
          prose-strong:text-[#0B0F19] prose-strong:font-semibold
          prose-a:text-[#0A58D0] prose-a:no-underline hover:prose-a:underline
        ">
          {children}
        </div>
      </div>
    </section>
  );
}
