/**
 * Sanity Schema: Blog Article
 *
 * User-friendly blog article schema with:
 * - Rich text editor (no markdown knowledge needed)
 * - Organized field groups
 * - Clear descriptions for non-technical users
 * - Character counters for text fields
 */

import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Blog Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ============================================
    // CONTENT GROUP
    // ============================================
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The main headline of your article',
      validation: (Rule) => Rule.required().max(100).error('Title is required and must be under 100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      description: 'Click "Generate" to create from title. This is the URL path for the article.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the URL slug'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Preview Text',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Short summary shown on blog cards and in search results (max 200 characters)',
      validation: (Rule) => Rule.required().max(200).warning('Keep under 200 characters for best display'),
    }),
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'blockContent',
      group: 'content',
      description: 'Write your article here. Use the toolbar for formatting, links, and images.',
      validation: (Rule) => Rule.required().error('Article content is required'),
    }),

    // ============================================
    // MEDIA GROUP
    // ============================================
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      description: 'Main image displayed at the top of the article and on cards. Recommended size: 1200x630px',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO',
        },
      ],
    }),

    // ============================================
    // METADATA GROUP
    // ============================================
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'metadata',
      to: [{ type: 'author' }],
      description: 'Select the article author',
      validation: (Rule) => Rule.required().error('Please select an author'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'metadata',
      description: 'Choose the main topic category',
      options: {
        list: [
          { title: 'AI & Machine Learning', value: 'ai-ml' },
          { title: 'Data Engineering', value: 'data-engineering' },
          { title: 'Analytics & BI', value: 'analytics-bi' },
          { title: 'Industry Insights', value: 'industry-insights' },
          { title: 'Company News', value: 'company-news' },
          { title: 'Case Studies', value: 'case-studies' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('Please select a category'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add keywords to help readers find related content (press Enter after each tag)',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      group: 'metadata',
      description: 'When this article should be published',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),

    // ============================================
    // SEO GROUP
    // ============================================
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'SEO description shown in Google search results (max 160 characters). Leave blank to use Preview Text.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
    }),

    // ============================================
    // SETTINGS GROUP
    // ============================================
    defineField({
      name: 'isPublished',
      title: 'Show on Website',
      type: 'boolean',
      group: 'settings',
      description: 'Turn ON to make this article visible on the blog. Turn OFF to hide it.',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Feature this Article',
      type: 'boolean',
      group: 'settings',
      description: 'Featured articles appear prominently at the top of the blog page',
      initialValue: false,
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'settings',
      description: 'Estimated reading time (typically 200-250 words per minute)',
      validation: (Rule) => Rule.required().min(1).max(60),
      initialValue: 5,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishDateAsc',
      by: [{ field: 'publishDate', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category',
      isPublished: 'isPublished',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, author, category, isPublished, media } = selection;
      const statusLabel = isPublished === false ? '[HIDDEN] ' : '';

      const categoryLabels: Record<string, string> = {
        'ai-ml': 'AI & ML',
        'data-engineering': 'Data Engineering',
        'analytics-bi': 'Analytics & BI',
        'industry-insights': 'Industry',
        'company-news': 'Company',
        'case-studies': 'Case Study',
      };

      return {
        title: `${statusLabel}${title}`,
        subtitle: `${author || 'No author'} • ${categoryLabels[category] || category || 'No category'}`,
        media,
      };
    },
  },
});
