"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Original landing-page hero: soft lavender–pink aurora (default). */
const AURORA_BACKGROUND = `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `.trim();

/**
 * Landing hero: same geometry + alpha strengths as `AURORA_BACKGROUND`, but hues aligned
 * with the case-studies brand ramp (sky / blue / indigo / rose / red family)—not brighter,
 * just a different pigment mix. Base wash stays in the same lightness band as the lavender ramp.
 */
const AURORA_BRAND_BACKGROUND = `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(129, 140, 248, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(125, 211, 252, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(244, 114, 182, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(56, 189, 248, 0.45), transparent 62%),
            linear-gradient(180deg, #f0f9ff 0%, #fff1f2 100%)
      `.trim();

/** Case-studies / brand: saturated blue → indigo/violet → crimson + left grid. */
const BRAND_BASE_LAYERS = `
            radial-gradient(ellipse 125% 75% at -5% 42%, rgba(56, 189, 248, 0.5), transparent 56%),
            radial-gradient(ellipse 100% 58% at 10% 58%, rgba(37, 99, 235, 0.42), transparent 52%),
            radial-gradient(ellipse 85% 48% at 38% 48%, rgba(129, 140, 248, 0.28), transparent 50%),
            radial-gradient(ellipse 70% 45% at 52% 35%, rgba(167, 139, 250, 0.2), transparent 48%),
            radial-gradient(ellipse 110% 72% at 108% 38%, rgba(251, 113, 133, 0.48), transparent 54%),
            radial-gradient(ellipse 90% 58% at 92% 62%, rgba(220, 38, 38, 0.35), transparent 52%),
            linear-gradient(106deg,
              #0c4a8e 0%,
              #124a9c 10%,
              #1e3a7a 24%,
              #312c83 40%,
              #581c3f 58%,
              #9f1239 76%,
              #dc2626 92%,
              #b91c1c 100%)
      `.trim();

export type BackgroundGradientGlowProps = {
  className?: string;
  children?: ReactNode;
  /** `aurora` = original lavender hero. `aurora-brand` = same softness, on-brand sky→rose hues. `brand` = case-studies saturated ramp. Default: `aurora`. */
  variant?: "aurora" | "aurora-brand" | "brand";
};

function AuroraGradientLayers({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background: AURORA_BACKGROUND }}
      aria-hidden
    />
  );
}

function AuroraBrandGradientLayers({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background: AURORA_BRAND_BACKGROUND }}
      aria-hidden
    />
  );
}

function BrandGradientLayers({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0" style={{ background: BRAND_BASE_LAYERS }} />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 22px,
              rgba(186, 230, 253, 0.09) 23px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 22px,
              rgba(186, 230, 253, 0.09) 23px
            )
          `,
          maskImage: "linear-gradient(to right, black 0%, black 30%, transparent 56%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 30%, transparent 56%)",
        }}
      />
    </div>
  );
}

export function BackgroundGradientGlow({
  className,
  children,
  variant = "aurora",
}: BackgroundGradientGlowProps) {
  const Layers =
    variant === "brand"
      ? BrandGradientLayers
      : variant === "aurora-brand"
        ? AuroraBrandGradientLayers
        : AuroraGradientLayers;

  if (children != null) {
    return (
      <div className={cn("relative min-h-screen w-full", className)}>
        <Layers className="z-0 pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return <Layers className={cn("z-0 pointer-events-none", className)} />;
}

export const Component = BackgroundGradientGlow;
