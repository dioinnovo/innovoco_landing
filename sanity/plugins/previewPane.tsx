'use client';

/**
 * Preview Pane Plugin for Sanity Studio
 *
 * Adds a live preview pane that shows how articles will look on the website.
 */

import type { DefaultDocumentNodeResolver } from 'sanity/structure';

// Get the preview URL for a document
function getPreviewUrl(doc: { _type: string; slug?: { current: string } }) {
  // Use the deployed site URL - for hosted studio, this needs to be the production URL
  // For local development, it falls back to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined' && window.location.hostname === 'innovoco-blog.sanity.studio'
      ? 'https://www.innovoco.com'
      : 'http://localhost:3000');

  if (doc._type === 'article' && doc.slug?.current) {
    return `${baseUrl}/api/preview?slug=${doc.slug.current}`;
  }

  return null;
}

// Define the preview pane structure
export const previewDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show preview for article documents
  if (schemaType === 'article') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(({ document }) => {
          const doc = document.displayed;
          const previewUrl = getPreviewUrl(doc as { _type: string; slug?: { current: string } });

          if (!previewUrl) {
            return (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>Save the document with a URL slug to see the preview.</p>
              </div>
            );
          }

          return (
            <iframe
              src={previewUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Preview"
            />
          );
        })
        .title('Preview'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
