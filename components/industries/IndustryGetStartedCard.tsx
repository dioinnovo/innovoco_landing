"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  industryVisualThemes,
  type IndustryVisualThemeKey,
} from "@/components/shared/industry-card-themes";

/** Same grid as homepage industry accordion capability rows (3 equal columns). */
export const industryGetStartedGridClassName =
  "grid grid-cols-1 items-stretch gap-6 md:grid-cols-3";

export type IndustryGetStartedCardProps = {
  theme: IndustryVisualThemeKey;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  buttonBackground: string;
  buttonForeground: string;
  className?: string;
};

export function IndustryGetStartedCard({
  theme,
  icon: Icon,
  tag,
  title,
  description,
  action,
  onAction,
  buttonBackground,
  buttonForeground,
  className,
}: IndustryGetStartedCardProps) {
  const t = industryVisualThemes[theme];

  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[22px] border-border/30 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-[var(--card)]",
        t.hoverBorder,
        className,
      )}
    >
      <CardHeader className="flex flex-1 flex-col gap-3 space-y-0 p-5 pb-4">
        <span
          className={cn(
            "w-fit rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
            t.metricCell,
            t.metricPrimary,
          )}
        >
          {tag}
        </span>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105",
            t.iconGradient,
          )}
        >
          <Icon className={cn("h-5 w-5", t.iconText)} aria-hidden />
        </div>
        <CardTitle className="min-h-[4rem] text-balance text-lg font-semibold leading-snug tracking-tight text-[#0B0F19] dark:text-[var(--foreground)]">
          {title}
        </CardTitle>
        <CardDescription className="min-h-[5.25rem] flex-1 text-pretty text-sm leading-relaxed text-[#525252] dark:text-[#94a3b8]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn("mt-auto border-t p-4 pt-4", t.footerBorder, t.footerBg)}>
        <Button
          type="button"
          onClick={onAction}
          className="h-11 w-full rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:opacity-95 hover:shadow-lg"
          style={{ backgroundColor: buttonBackground, color: buttonForeground }}
        >
          {action}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
