"use client";

import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  industryVisualThemes,
  type IndustryVisualThemeKey,
} from "@/components/shared/industry-card-themes";

/** Homepage industries accordion: same responsive grid for every industry (3 capability cards). */
export const industryAccordionCapabilitiesGridClassName =
  "mt-4 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3";

export type IndustryAccordionMetric = {
  primary: string;
  secondary: string;
};

/** @deprecated Use IndustryVisualThemeKey from @/components/shared/industry-card-themes */
export type IndustryAccordionCardThemeKey = IndustryVisualThemeKey;

const labelMuted = "text-[#525252]";

export type IndustryAccordionCapabilityCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  metrics: readonly [IndustryAccordionMetric, IndustryAccordionMetric, IndustryAccordionMetric];
  theme: IndustryVisualThemeKey;
  className?: string;
};

export function IndustryAccordionCapabilityCard({
  icon: Icon,
  title,
  description,
  metrics,
  theme: themeKey,
  className,
}: IndustryAccordionCapabilityCardProps) {
  const t = industryVisualThemes[themeKey];

  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[22px] border-border/30 bg-white shadow-sm transition-all duration-300 hover:shadow-lg",
        t.hoverBorder,
        className,
      )}
    >
      <CardHeader className="flex flex-1 flex-col gap-3 space-y-0 p-5 pb-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105",
            t.iconGradient,
          )}
        >
          <Icon className={cn("h-5 w-5", t.iconText)} aria-hidden />
        </div>
        <CardTitle className="min-h-[4rem] text-lg font-semibold leading-snug tracking-tight text-[#0B0F19]">
          {title}
        </CardTitle>
        <CardDescription className="min-h-[5.25rem] flex-1 text-sm leading-relaxed text-[#525252]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn("mt-auto border-t p-4 pt-4", t.footerBorder, t.footerBg)}
      >
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex min-h-[4.5rem] min-w-0 flex-col items-center justify-center rounded-xl px-2 py-2.5 text-center",
                t.metricCell,
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold leading-tight tabular-nums",
                  t.metricPrimary,
                )}
              >
                {m.primary}
              </span>
              <span className={cn("mt-1 text-[11px] leading-tight", labelMuted)}>
                {m.secondary}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
