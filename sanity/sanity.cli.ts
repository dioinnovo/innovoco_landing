/**
 * Sanity CLI Configuration
 *
 * Configuration for Sanity CLI commands
 */

import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0tib7egx';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'innovoco-blog',
});
