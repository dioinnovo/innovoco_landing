/**
 * Industry solution cards use `next/image` + long-lived CDN cache. Replacing a JPEG in
 * `public/images/industries/**` under the same filename does not change the URL, so browsers
 * and the image optimizer keep serving old bytes. Increment this when you regenerate those
 * assets (see `scripts/generate-industry-solution-images.mjs`).
 */
export const INDUSTRY_SOLUTION_IMAGES_REVISION = "2";

export function withIndustrySolutionImageCacheBust(src: string): string {
  if (!src.startsWith("/images/industries/")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}v=${INDUSTRY_SOLUTION_IMAGES_REVISION}`;
}
