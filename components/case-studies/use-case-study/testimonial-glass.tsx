"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  quote: string;
  attribution?: string;
  /** Brand mark layered behind / beside the glass quote (revealed as the pair slides on scroll). */
  logoCard?: ReactNode;
  className?: string;
};

/**
 * Ateko-style testimonial: glass quote overlaps a square logo track; on scroll (desktop only)
 * the quote shifts left and the logo shifts right slightly — scrubbed, same as GSAP ScrollTrigger.
 * @see https://ateko.com/wp-content/themes/ateko-theme/blocks/testimonial-slider/testimonial-slider.js
 */
export function UseCaseTestimonialGlass({ quote, attribution, logoCard, className }: Props) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scrollEnabled = desktop && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    /** Scrub while the block crosses the viewport (same idea as Ateko `top 80%` → `bottom 20%`). */
    offset: ["start end", "end start"],
  });

  const quoteX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const logoX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      className={cn(
        /* `relative`: Framer useScroll needs a non-static offset parent with Lenis + scroll-linked motion */
        "relative bg-[#f0f3f7] py-16 dark:bg-[#0B0F19] md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center md:mx-5 md:flex-row md:items-center">
            <motion.div
              className={cn(
                "relative z-[2] flex min-h-0 w-full flex-col justify-between overflow-hidden rounded-[30px] p-8",
                /* True glass: mostly transparent fill — blur + saturation do the work; avoid opaque milky bg */
                "border border-white/50 bg-white/15 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[22px] backdrop-saturate-150",
                "dark:border-white/12 dark:bg-white/[0.06] dark:shadow-[0_24px_70px_-24px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] dark:backdrop-blur-[22px]",
                "md:ml-[25px] md:min-h-[min(500px,72vh)] md:min-w-[60%] md:p-12",
                logoCard ? "-mb-6 md:mb-0" : ""
              )}
              style={{ x: scrollEnabled ? quoteX : 0 }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/15 via-transparent to-transparent dark:from-white/[0.06]"
                aria-hidden
              />
              <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-between">
                <div>
                  <Quote
                    className="h-9 w-9 text-[#0A58D0]/35 dark:text-[#93C5FD]/40"
                    aria-hidden
                  />
                  <blockquote className="mt-5 text-lg font-medium leading-[1.65] tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] md:text-xl">
                    {quote}
                  </blockquote>
                </div>
                {attribution ? (
                  <p className="mt-8 text-sm font-medium text-[#525252] dark:text-[#9CA3AF] md:mt-auto md:pt-8">
                    {attribution}
                  </p>
                ) : null}
              </div>
            </motion.div>

            {logoCard ? (
              <motion.div
                className={cn(
                  "relative z-[1] flex aspect-square w-full max-w-[80%] flex-shrink-0 items-center justify-center overflow-hidden rounded-[30px] border border-black/6 bg-muted/40 shadow-sm dark:border-white/10",
                  "max-h-[400px] -mt-[25px] md:mt-0",
                  "md:-ml-[50px] md:max-h-[400px] md:max-w-[calc(30%+50px)] md:basis-[calc(30%+50px)] md:flex-[1_0_auto]"
                )}
                style={{ x: scrollEnabled ? logoX : 0 }}
                aria-hidden
              >
                <div className="flex h-full w-full items-center justify-center p-6">{logoCard}</div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
