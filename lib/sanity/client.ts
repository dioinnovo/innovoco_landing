/**
 * Sanity Client Configuration
 *
 * Creates and exports the Sanity client for data fetching
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

/**
 * Check if Sanity is configured
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

/**
 * Sanity client for read operations
 */
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

/**
 * Sanity client for preview/draft content (optional)
 */
export const previewClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Image URL builder
 */
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image reference
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get image URL with default options for blog images
 */
export function getBlogImageUrl(source: SanityImageSource | null | undefined): string {
  if (!source) {
    return '';
  }
  return urlFor(source).width(1200).height(630).fit('crop').auto('format').url();
}

/**
 * Get thumbnail URL for cards
 */
export function getThumbnailUrl(source: SanityImageSource | null | undefined): string {
  if (!source) {
    return '';
  }
  return urlFor(source).width(400).height(225).fit('crop').auto('format').url();
}

/**
 * Get avatar URL for authors
 */
export function getAvatarUrl(source: SanityImageSource | null | undefined): string {
  if (!source) {
    return '';
  }
  return urlFor(source).width(128).height(128).fit('crop').auto('format').url();
}
