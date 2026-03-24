/**
 * Card art for "Explore Other Industries" — filenames match Gemini output in
 * `public/images/industries/related-cards/{slug}.jpg` (slug = last segment of industry href).
 */
export function getIndustryRelatedCardImageSrc(href: string, override?: string): string {
  if (override) return override;
  const slug = href.replace(/\/$/, "").split("/").pop() ?? "";
  return `/images/industries/related-cards/${slug}.jpg`;
}
