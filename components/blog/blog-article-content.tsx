/**
 * BlogArticleContent Component
 *
 * Renders article content from Markdown or HTML
 * Content is already sanitized HTML from Sanity's Portable Text conversion
 */

import { cn } from '@/lib/utils';

interface BlogArticleContentProps {
  content: string;
  className?: string;
}

export function BlogArticleContent({
  content,
  className,
}: BlogArticleContentProps) {
  // Content is already HTML from the Sanity service (portableTextToHtml)
  // or raw HTML/Markdown for placeholder content
  // Anthropic-inspired typography: 17px font, 1.55 line height, left-aligned
  return (
    <article
      className={cn(
        'prose max-w-none',
        // Base text: 17px with 1.55 line height (matching Anthropic)
        'text-[17px] leading-[1.55]',
        // Headings - Anthropic style: 32px h2 with generous spacing
        'prose-headings:text-[#141413] prose-headings:font-semibold',
        'prose-h1:text-[40px] prose-h1:mt-12 prose-h1:mb-6',
        'prose-h2:text-[32px] prose-h2:mt-16 prose-h2:mb-8',
        'prose-h3:text-[24px] prose-h3:mt-10 prose-h3:mb-4',
        'prose-h4:text-[20px] prose-h4:mt-6 prose-h4:mb-3',
        // Paragraphs - left aligned for readability (not justified)
        'prose-p:text-[#141413] prose-p:mb-4',
        // Links
        'prose-a:text-[#0A58D0] prose-a:no-underline hover:prose-a:underline',
        // Lists
        'prose-li:text-[#141413] prose-li:marker:text-[#0A58D0]',
        'prose-ul:my-4 prose-ol:my-4',
        // Blockquotes
        'prose-blockquote:border-l-[#0A58D0] prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg',
        'prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic',
        'prose-blockquote:text-[#141413]',
        // Code
        'prose-code:text-[#0A58D0] prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal',
        'prose-code:before:content-none prose-code:after:content-none',
        // Pre (code blocks)
        'prose-pre:bg-[#1E293B] prose-pre:rounded-xl prose-pre:shadow-sm',
        'prose-pre:overflow-x-auto prose-pre:text-sm',
        // Images
        'prose-img:rounded-xl prose-img:shadow-sm prose-img:my-6',
        // Tables
        'prose-table:border-collapse prose-table:w-full',
        'prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left',
        'prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2',
        // HR
        'prose-hr:border-gray-200 prose-hr:my-8',
        // Strong/Bold
        'prose-strong:text-[#141413] prose-strong:font-semibold',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
