import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { LandingPageClient } from "./landing-page-client";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from trusted static objects only (not user input)
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <LandingPageClient />
    </>
  );
}
