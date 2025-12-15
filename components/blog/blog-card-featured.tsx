/**
 * BlogCardFeatured Component
 *
 * Large featured article card for hero section
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogArticlePreview, BLOG_CATEGORIES } from '@/lib/types/blog';
import { cn } from '@/lib/utils';

// Category gradient backgrounds for fallback
const CATEGORY_GRADIENTS: Record<string, string> = {
  'ai-ml': 'from-blue-600 to-indigo-700',
  'data-engineering': 'from-emerald-600 to-teal-700',
  'analytics-bi': 'from-purple-600 to-violet-700',
  'digital-transformation': 'from-orange-500 to-red-600',
  'case-studies': 'from-cyan-600 to-blue-700',
  'industry-insights': 'from-amber-500 to-orange-600',
};

interface BlogCardFeaturedProps {
  article: BlogArticlePreview;
  className?: string;
}

export function BlogCardFeatured({ article, className }: BlogCardFeaturedProps) {
  const [imageError, setImageError] = useState(false);
  const categoryInfo = BLOG_CATEGORIES[article.category];
  const gradientClass = CATEGORY_GRADIENTS[article.category] || 'from-gray-600 to-gray-800';
  const hasValidImage = article.featuredImage && !article.featuredImage.startsWith('/images/blog/');

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        'group grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        'hover:shadow-xl hover:border-gray-200 transition-all duration-300',
        className
      )}
    >
      {/* Image or Gradient Fallback */}
      <div className="relative aspect-16/10 md:aspect-auto md:min-h-[320px] overflow-hidden">
        {hasValidImage && !imageError ? (
          <>
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className={cn(
            'absolute inset-0 bg-linear-to-br',
            gradientClass,
            'flex items-center justify-center'
          )}>
            <FileText className="w-24 h-24 text-white/20" />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-[#0A58D0] border-0 text-xs font-medium"
          >
            {categoryInfo?.label || article.category}
          </Badge>
          {article.featured && (
            <Badge
              variant="outline"
              className="border-amber-300 bg-amber-50 text-amber-700 text-xs"
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B0F19] mb-4 line-clamp-3 group-hover:text-[#0A58D0] transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[#525252] text-base sm:text-lg leading-relaxed line-clamp-3 mb-6">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#6B7280] mb-6">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author.name}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[#0A58D0] font-medium group-hover:gap-3 transition-all">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
