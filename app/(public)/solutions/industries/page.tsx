import { getServiceMetadata } from '@/lib/seo/metadata';
import { IndustrySolutionsPageClient } from './IndustrySolutionsPageClient';

export const metadata = getServiceMetadata('industries');

export default function IndustrySolutionsPage() {
  return <IndustrySolutionsPageClient />;
}
