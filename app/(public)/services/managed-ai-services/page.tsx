import { getServiceMetadata } from "@/lib/seo/metadata";
import { ManagedAIPageClient } from "./ManagedAIPageClient";

export const metadata = getServiceMetadata("managedServices");

export default function ManagedAIServicesPage() {
  return <ManagedAIPageClient />;
}
