import { Suspense } from "react";
import CaseStudiesPageClient from "./case-studies-page-client";

export default function CaseStudiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] bg-[#f8f9fb] dark:bg-[#0B0F19]" aria-hidden />
      }
    >
      <CaseStudiesPageClient />
    </Suspense>
  );
}
