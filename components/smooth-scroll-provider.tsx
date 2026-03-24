"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/** Same easing as Ateko case study Lenis setup (exponential ease-out). */
function atekoEasing(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
}

const lenisOptions = {
  duration: 1.2,
  easing: atekoEasing,
  smoothWheel: true,
} as const;

/**
 * Smooths native scroll (Lenis) so scroll-linked UI (e.g. Framer `useScroll`) scrubs like Ateko + GSAP.
 * Skipped when `prefers-reduced-motion: reduce` is set.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setUseLenis(true);
  }, []);

  if (!useLenis) {
    return children;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
