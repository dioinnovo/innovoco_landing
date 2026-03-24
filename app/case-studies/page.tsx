import { caseStudiesSubnav } from "@/lib/content/case-studies-page-content";
import CaseStudiesPageClient from "./case-studies-page-client";

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient subnav={caseStudiesSubnav} />;
}
