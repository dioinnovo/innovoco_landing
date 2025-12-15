/**
 * BlogArticleContent Component
 *
 * Renders article content from Markdown or HTML
 */

'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface BlogArticleContentProps {
  content: string;
  className?: string;
}

export function BlogArticleContent({
  content,
  className,
}: BlogArticleContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Parse markdown to HTML
    const rawHtml = marked.parse(content) as string;

    // Sanitize HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    });

    setHtmlContent(cleanHtml);
  }, [content]);

  return (
    <article
      className={cn(
        'prose prose-lg max-w-none',
        // Headings
        'prose-headings:text-[#0B0F19] prose-headings:font-semibold',
        'prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4',
        'prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2',
        'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3',
        'prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2',
        // Paragraphs
        'prose-p:text-[#374151] prose-p:leading-relaxed prose-p:mb-4',
        // Links
        'prose-a:text-[#0A58D0] prose-a:no-underline hover:prose-a:underline',
        // Lists
        'prose-li:text-[#374151] prose-li:marker:text-[#0A58D0]',
        'prose-ul:my-4 prose-ol:my-4',
        // Blockquotes
        'prose-blockquote:border-l-[#0A58D0] prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg',
        'prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic',
        'prose-blockquote:text-[#374151]',
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
        'prose-strong:text-[#0B0F19] prose-strong:font-semibold',
        className
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
