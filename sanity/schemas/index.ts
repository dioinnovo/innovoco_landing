/**
 * Sanity Schema Index
 *
 * Export all schemas for Sanity Studio
 */

import { article } from './article';
import { author } from './author';
import { blockContent } from './blockContent';

export const schemaTypes = [article, author, blockContent];
