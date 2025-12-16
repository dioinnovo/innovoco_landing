'use client';

/**
 * Preview Pane Plugin for Sanity Studio
 *
 * Adds a live preview pane that shows how articles will look on the website.
 */

import type { DefaultDocumentNodeResolver } from 'sanity/structure';

// Get the site base URL
function getSiteUrl() {
  // Check if we're running in the hosted Sanity Studio
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Hosted studio at innovoco-blog.sanity.studio should preview on production
    if (hostname.includes('sanity.studio')) {
      return 'https://www.innovoco.com';
    }
  }
  // Local development - use the Next.js dev server
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

// Get the preview URL for a document
function getPreviewUrl(doc: { _type: string; slug?: { current: string } }) {
  const baseUrl = getSiteUrl();

  if (doc._type === 'article' && doc.slug?.current) {
    return `${baseUrl}/api/preview?slug=${doc.slug.current}`;
  }

  return null;
}

// Get the direct article URL (for viewing published articles)
function getArticleUrl(doc: { _type: string; slug?: { current: string } }) {
  const baseUrl = getSiteUrl();

  if (doc._type === 'article' && doc.slug?.current) {
    return `${baseUrl}/blog/${doc.slug.current}`;
  }

  return null;
}

// Preview component with buttons
function PreviewPane({ document }: { document: { displayed: unknown } }) {
  const doc = document.displayed as { _type: string; slug?: { current: string }; isPublished?: boolean };
  const previewUrl = getPreviewUrl(doc);
  const articleUrl = getArticleUrl(doc);

  if (!doc.slug?.current) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        color: '#666',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.5 }}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>Preview not available</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Generate a URL slug to enable preview.</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2276FC" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
        Preview Article
      </h3>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#666' }}>
        Open the article in a new tab to see how it looks on the website.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={previewUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#2276FC',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1a5fd4')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2276FC')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Preview Draft
        </a>

        {doc.isPublished && (
          <a
            href={articleUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid #e5e7eb',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Published
          </a>
        )}
      </div>

      <p style={{ margin: '24px 0 0', fontSize: '12px', color: '#999' }}>
        Slug: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>/blog/{doc.slug.current}</code>
      </p>
    </div>
  );
}

// Define the preview pane structure
export const previewDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show preview for article documents
  if (schemaType === 'article') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(PreviewPane)
        .title('Preview'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
