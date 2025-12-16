/**
 * Sanity CLI Configuration (Root Level)
 *
 * Required by Sanity CLI for dataset and schema management
 */

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '0tib7egx',
    dataset: 'production',
  },
  studioHost: 'innovoco-blog',
  deployment: {
    appId: 'zbl69bmfen6q72c6aoh3rei6',
  },
});
