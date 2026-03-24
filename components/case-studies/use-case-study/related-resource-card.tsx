"use client";

import {
  Children,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type RelatedResourceCardLinkProps = {
  href: string;
  imageSrc: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Defaults to "Read more" to match use case "More case studies" cards */
  linkLabel?: string;
};

/**
 * Card used by use case "More case studies" and industry "Explore Other Industries"
 * — same layout, hover, and typography.
 */
export function RelatedResourceCardLink({
  href,
  imageSrc,
  title,
  description,
  icon: Icon,
  linkLabel = "Read more",
}: RelatedResourceCardLinkProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-md transition-[box-shadow,transform] duration-300 dark:border-white/10 dark:bg-[#1F2937]",
        "hover:-translate-y-1 hover:shadow-xl"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8ecf2] dark:bg-[#111827]">
        {!imageFailed ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 85vw, 400px"
            onError={() => setImageFailed(true)}
          />
        ) : null}
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-[#00518e] shadow-sm dark:bg-[#1f2937]/95 dark:text-[#93C5FD]">
          <Icon className="h-4 w-4" aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB]">{title}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#525252] dark:text-[#D1D5DB]">
          {description}
        </p>
        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#0B0F19] px-4 py-2 text-sm font-medium text-[#0B0F19] transition-colors group-hover:bg-[#0B0F19] group-hover:text-white dark:border-[#e5e7eb] dark:text-[#e5e7eb] dark:group-hover:bg-white dark:group-hover:text-[#0B0F19]">
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export type RelatedResourceCardsSectionProps = {
  heading: string;
  description: string;
  children: ReactNode;
  /** Grid (default) or horizontal scroll for many cards (e.g. all industries). */
  variant?: "grid" | "carousel";
};

function RelatedResourceCardsCarousel({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = (card?.offsetWidth ?? 360) + 24;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <div className="relative mt-12">
      <div className="mb-3 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 shrink-0 rounded-full border-[#0B0F19]/15 bg-white/80 backdrop-blur-sm dark:border-white/15 dark:bg-[#1F2937]/80"
          onClick={() => scroll(-1)}
          aria-label="Previous industries"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 shrink-0 rounded-full border-[#0B0F19]/15 bg-white/80 backdrop-blur-sm dark:border-white/15 dark:bg-[#1F2937]/80"
          onClick={() => scroll(1)}
          aria-label="Next industries"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-6 overflow-x-auto pb-4 pt-1 [-webkit-overflow-scrolling:touch]",
          "snap-x snap-mandatory scroll-pl-4 scroll-pr-4",
          "[scrollbar-width:thin] [&::-webkit-scrollbar]:h-2",
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label="Industry solutions"
        tabIndex={0}
      >
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            data-carousel-card
            className={cn(
              "shrink-0 snap-start",
              // Match prior grid: 1 col mobile, 2 @ sm, 3 @ lg — % is of the scroll viewport width
              "w-[min(100%,20rem)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]",
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Section shell matching "More case studies" (gradient band, max width, grid spacing). */
export function RelatedResourceCardsSection({
  heading,
  description,
  children,
  variant = "grid",
}: RelatedResourceCardsSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-[#eceef0] py-16 dark:border-[#1f2937] md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-rose-100/70 dark:from-[#1a1008]/80 dark:via-[#0f172a]/90 dark:to-[#1e1b4b]/60"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[#525252] dark:text-[#D1D5DB]">{description}</p>
        {variant === "carousel" ? (
          <RelatedResourceCardsCarousel>{children}</RelatedResourceCardsCarousel>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
        )}
      </div>
    </section>
  );
}
