import { InDevelopment } from "@/components/dashboard/in-development";

// Force dynamic rendering to avoid SSG issues with client components in layout
export const dynamic = 'force-dynamic';

export default function Page() {
  return <InDevelopment />;
}