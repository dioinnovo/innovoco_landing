/**
 * BlogAuthorCard Component
 *
 * Author information display for article pages
 */

import Image from 'next/image';
import { BlogAuthor } from '@/lib/types/blog';
import { cn } from '@/lib/utils';

interface BlogAuthorCardProps {
  author: BlogAuthor;
  variant?: 'compact' | 'full';
  className?: string;
}

export function BlogAuthorCard({
  author,
  variant = 'compact',
  className,
}: BlogAuthorCardProps) {
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-white text-sm font-medium">{initials}</span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#0B0F19] truncate">
            {author.name}
          </p>
          {author.title && (
            <p className="text-xs text-[#6B7280] truncate">{author.title}</p>
          )}
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 bg-gray-50 rounded-xl',
        className
      )}
    >
      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-white text-lg font-semibold">{initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="text-base font-semibold text-[#0B0F19]">{author.name}</p>
        {author.title && (
          <p className="text-sm text-[#6B7280]">{author.title}</p>
        )}
        {author.email && (
          <a
            href={`mailto:${author.email}`}
            className="text-sm text-[#0A58D0] hover:underline"
          >
            {author.email}
          </a>
        )}
      </div>
    </div>
  );
}
