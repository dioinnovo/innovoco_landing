'use client'

/**
 * Sanity Configuration
 *
 * This file configures the Sanity Studio for the blog CMS.
 * Must be marked as 'use client' because sanity uses React.createContext.
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'
import { previewDocumentNode } from './sanity/plugins/previewPane'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0tib7egx'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

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
})
