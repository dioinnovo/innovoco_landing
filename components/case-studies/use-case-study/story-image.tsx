"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type StoryImageObjectPosition = "center" | "left" | "right" | "top";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Outer wrapper — default landscape hero crop */
  aspectClassName?: string;
  priority?: boolean;
  objectPosition?: StoryImageObjectPosition;
  /** If `src` fails to load (e.g. art not generated yet), show this once. */
  fallbackSrc?: string;
  sizes?: string;
};

const positionClass: Record<StoryImageObjectPosition, string> = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
};

export function StoryImage({
  src,
  alt,
  className,
  aspectClassName = "aspect-[4/3]",
  priority,
  objectPosition = "center",
  fallbackSrc,
  sizes = "(max-width: 768px) 100vw, min(520px, 42vw)",
}: Props) {
  const [current, setCurrent] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setTriedFallback(false);
  }, [src]);

  const handleError = useCallback(() => {
    if (fallbackSrc && !triedFallback && current !== fallbackSrc) {
      setTriedFallback(true);
      setCurrent(fallbackSrc);
    }
  }, [fallbackSrc, triedFallback, current]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2rem] border border-black/6 bg-muted shadow-sm dark:border-white/10",
        aspectClassName,
        className
      )}
    >
      <Image
        src={current}
        alt={alt}
        fill
        className={cn("object-cover", positionClass[objectPosition])}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "low"}
        onError={handleError}
      />
    </div>
  );
}
