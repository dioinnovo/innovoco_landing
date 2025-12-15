/**
 * BlogRelatedArticles Component
 *
 * Related articles section for article pages
 */

import { BlogArticlePreview } from '@/lib/types/blog';
import { BlogCard } from './blog-card';
import { cn } from '@/lib/utils';

interface BlogRelatedArticlesProps {
  articles: BlogArticlePreview[];
  className?: string;
}

export function BlogRelatedArticles({
  articles,
  className,
}: BlogRelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mb-8">
          Related Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
