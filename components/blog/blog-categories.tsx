/**
 * BlogCategories Component
 *
 * Category filter tabs for blog listing
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCategory, BLOG_CATEGORIES } from '@/lib/types/blog';
import { cn } from '@/lib/utils';

interface BlogCategoriesProps {
  activeCategory?: BlogCategory | 'all';
  className?: string;
}

export function BlogCategories({
  activeCategory = 'all',
  className,
}: BlogCategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: BlogCategory | 'all') => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    // Reset to page 1 when changing category
    params.delete('page');

    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  };

  const categories = [
    { slug: 'all' as const, label: 'All' },
    ...Object.entries(BLOG_CATEGORIES).map(([slug, info]) => ({
      slug: slug as BlogCategory,
      label: info.label,
    })),
  ];

  return (
    <div className={cn('w-full', className)}>
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:gap-3 pb-2 sm:pb-0 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {categories.map(({ slug, label }) => {
            const isActive = activeCategory === slug;

            return (
              <button
                key={slug}
                onClick={() => handleCategoryClick(slug)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
                  isActive
                    ? 'bg-[#0A58D0] text-white shadow-sm'
                    : 'bg-white text-[#525252] border border-gray-200 hover:border-[#0A58D0] hover:text-[#0A58D0]'
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
