'use client';

/**
 * Social Share Buttons Component
 *
 * Provides sharing functionality for blog articles to:
 * - X (Twitter)
 * - LinkedIn
 * - Facebook
 * - Copy link
 */

import { useState } from 'react';
import { Check, Copy, Linkedin } from 'lucide-react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Facebook icon component
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function SocialShareButtons({ url, title, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const buttonBaseClass =
    'flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 border';

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 mr-1">Share:</span>

      {/* X (Twitter) */}
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-white border-gray-200 text-gray-600 hover:bg-black hover:text-white hover:border-black`}
        aria-label="Share on X (Twitter)"
        title="Share on X"
      >
        <XIcon className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-white border-gray-200 text-gray-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]`}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-white border-gray-200 text-gray-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]`}
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FacebookIcon className="w-4 h-4" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`${buttonBaseClass} ${
          copied
            ? 'bg-green-50 border-green-200 text-green-600'
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
        }`}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
