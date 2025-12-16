/**
 * Sanity Configuration
 *
 * This file configures the Sanity Studio for the blog CMS.
 * Loaded only on the client via dynamic import with ssr: false.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas';
import { previewDocumentNode } from './plugins/previewPane';

// Get project ID from environment or use placeholder
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0tib7egx';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'innovoco-blog',
  title: 'Innovoco Blog CMS',

  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      defaultDocumentNode: previewDocumentNode,
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
