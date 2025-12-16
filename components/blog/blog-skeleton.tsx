/**
 * BlogSkeleton Components
 *
 * Loading skeletons for blog pages
 */

import { cn } from '@/lib/utils';

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gray-200',
        className
      )}
    />
  );
}

/**
 * Skeleton for BlogCard component
 */
export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        className
      )}
    >
      {/* Image skeleton */}
      <Skeleton className="aspect-[16/10] rounded-none" />

      {/* Content skeleton */}
      <div className="flex flex-col p-5 sm:p-6">
        {/* Category badge */}
        <Skeleton className="w-24 h-5 mb-3" />

        {/* Title */}
        <Skeleton className="w-full h-6 mb-2" />
        <Skeleton className="w-3/4 h-6 mb-4" />

        {/* Excerpt */}
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-5/6 h-4 mb-4" />

        {/* Meta */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for BlogCardFeatured component
 */
export function BlogCardFeaturedSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        className
      )}
    >
      {/* Image skeleton */}
      <Skeleton className="aspect-[16/10] md:aspect-auto md:min-h-[320px] rounded-none" />

      {/* Content skeleton */}
      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        {/* Badge */}
        <div className="flex gap-3 mb-4">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>

        {/* Title */}
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-4/5 h-10 mb-4" />

        {/* Excerpt */}
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-full h-5 mb-2" />
        <Skeleton className="w-3/4 h-5 mb-6" />

        {/* Meta */}
        <div className="flex gap-6 mb-6">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        {/* CTA */}
        <Skeleton className="w-28 h-5" />
      </div>
    </div>
  );
}

/**
 * Skeleton for article page
 */
export function BlogArticleSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      {/* Back link */}
      <Skeleton className="w-28 h-5 mb-8" />

      {/* Header */}
      <div className="mb-8">
        {/* Meta */}
        <div className="flex gap-4 mb-4">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-28 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        {/* Title */}
        <Skeleton className="w-full h-12 mb-3" />
        <Skeleton className="w-3/4 h-12 mb-6" />

        {/* Featured image */}
        <Skeleton className="w-full aspect-[16/9] mb-6" />

        {/* Author */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="w-32 h-5 mb-1" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-4/5 h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-3/4 h-5" />
        <div className="py-4" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-5/6 h-5" />
      </div>
    </div>
  );
}

/**
 * Grid of card skeletons for listing page
 */
export function BlogGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 lg:gap-8',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}
