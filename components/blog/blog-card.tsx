/**
 * BlogCard Component
 *
 * Standard blog article card for listing pages
 */

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogArticlePreview, BLOG_CATEGORIES } from '@/lib/types/blog';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  article: BlogArticlePreview;
  className?: string;
}

export function BlogCard({ article, className }: BlogCardProps) {
  const categoryInfo = BLOG_CATEGORIES[article.category];

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        'group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        'hover:shadow-lg hover:border-gray-200 transition-all duration-300',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
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
        <p className="text-[#525252] text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
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
