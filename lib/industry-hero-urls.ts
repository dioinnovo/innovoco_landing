/**
 * Hero images use versioned filenames (not query strings) because next/image in
 * Next.js 16+ rejects local src URLs with ?search unless images.localPatterns
 * is configured. Renaming (e.g. -v2 → -v3) also busts immutable /images cache.
 */
const SITE = "https://innovoco.com";

export const industryHero = {
  energyUtilities: {
    src: "/images/industries/energy-utilities-hero-v2.jpg",
    ogUrl: `${SITE}/images/industries/energy-utilities-hero-v2.jpg`,
  },
  insurance: {
    src: "/images/industries/insurance-hero-v2.jpg",
    ogUrl: `${SITE}/images/industries/insurance-hero-v2.jpg`,
  },
} as const;
