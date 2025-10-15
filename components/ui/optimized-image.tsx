"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  sizes,
  quality = 75,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      observer.observe(imgRef.current);

      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [priority]);

  // Generate blur data URL for placeholder
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width || 100}" height="${height || 100}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`
  ).toString('base64')}`;

  return (
    <div ref={imgRef} className={cn('relative', className)}>
      {isInView && (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            priority={priority}
            quality={quality}
            sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className={cn(
              'duration-700 ease-in-out',
              isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0',
              className
            )}
            onLoad={() => {
              setIsLoading(false);
              onLoad?.();
            }}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </>
      )}
    </div>
  );
}