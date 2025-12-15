/**
 * BlogFeaturedImage Component
 *
 * Featured image with gradient fallback for articles
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlogCategory } from '@/lib/types/blog';

// Category gradient backgrounds for fallback
const CATEGORY_GRADIENTS: Record<string, string> = {
  'ai-ml': 'from-blue-600 to-indigo-700',
  'data-engineering': 'from-emerald-600 to-teal-700',
  'analytics-bi': 'from-purple-600 to-violet-700',
  'digital-transformation': 'from-orange-500 to-red-600',
  'case-studies': 'from-cyan-600 to-blue-700',
  'industry-insights': 'from-amber-500 to-orange-600',
};

interface BlogFeaturedImageProps {
  src: string;
  alt: string;
  category: BlogCategory;
  priority?: boolean;
  className?: string;
}

export function BlogFeaturedImage({
  src,
  alt,
  category,
  priority = false,
  className,
}: BlogFeaturedImageProps) {
  const [imageError, setImageError] = useState(false);
  const gradientClass = CATEGORY_GRADIENTS[category] || 'from-gray-600 to-gray-800';
  const hasValidImage = src && !src.startsWith('/images/blog/');

  return (
    <div className={cn('relative aspect-16/9 rounded-2xl overflow-hidden shadow-lg', className)}>
      {hasValidImage && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-br',
            gradientClass,
            'flex items-center justify-center'
          )}
        >
          <FileText className="w-24 h-24 text-white/20" />
        </div>
      )}
    </div>
  );
}
