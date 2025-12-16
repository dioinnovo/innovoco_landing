/**
 * BlogHero Component
 *
 * Hero section for blog listing page
 */

import { cn } from '@/lib/utils';

interface BlogHeroProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BlogHero({
  title = 'Insights & Innovation',
  subtitle = 'Expert perspectives on enterprise AI, data engineering, and the strategies that drive digital transformation.',
  className,
}: BlogHeroProps) {
  return (
    <section
      className={cn(
        'relative py-16 sm:py-20 lg:py-24 bg-linear-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E0F2FE]',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B0F19] mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-[#525252] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
