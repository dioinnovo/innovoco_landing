/**
 * BlogCard Component
 *
 * Standard blog article card for listing pages
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogArticlePreview, BLOG_CATEGORIES } from '@/lib/types/blog';
import { cn } from '@/lib/utils';

// Category gradient backgrounds for fallback
const CATEGORY_GRADIENTS: Record<string, string> = {
  'ai-ml': 'from-blue-600 to-indigo-700',
  'data-engineering': 'from-emerald-600 to-teal-700',
  'analytics-bi': 'from-purple-600 to-violet-700',
  'industry-insights': 'from-amber-500 to-orange-600',
  'company-news': 'from-rose-500 to-pink-600',
  'case-studies': 'from-cyan-600 to-blue-700',
};

interface BlogCardProps {
  article: BlogArticlePreview;
  className?: string;
}

export function BlogCard({ article, className }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const categoryInfo = BLOG_CATEGORIES[article.category];
  const gradientClass = CATEGORY_GRADIENTS[article.category] || 'from-gray-600 to-gray-800';
  const hasValidImage = article.featuredImage && !article.featuredImage.startsWith('/images/blog/');

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        'group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        'hover:shadow-lg hover:border-gray-200 transition-all duration-300',
        className
      )}
    >
      {/* Image or Gradient Fallback */}
      <div className="relative aspect-16/10 overflow-hidden">
        {hasValidImage && !imageError ? (
          <>
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className={cn(
            'absolute inset-0 bg-linear-to-br',
            gradientClass,
            'flex items-center justify-center'
          )}>
            <FileText className="w-16 h-16 text-white/30" />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col grow p-5 sm:p-6">
        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="w-fit mb-3 bg-blue-50 text-[#0A58D0] border-0 text-xs font-medium"
        >
          {categoryInfo?.label || article.category}
        </Badge>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#0B0F19] mb-2 line-clamp-2 group-hover:text-[#0A58D0] transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#525252] text-sm leading-relaxed line-clamp-2 mb-4 grow">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] mt-auto pt-4 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{article.author.name}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
