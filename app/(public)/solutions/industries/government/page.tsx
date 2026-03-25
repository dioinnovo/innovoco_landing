import type { Metadata } from "next";
import { GovernmentPageClient } from "./GovernmentPageClient";
import { governmentConfig } from "@/lib/content/industries/government";

export const metadata: Metadata = {
  title: governmentConfig.metadata.title,
  description: governmentConfig.metadata.description,
  keywords: governmentConfig.metadata.keywords,
};

export default function GovernmentPage() {
  return <GovernmentPageClient />;
}
