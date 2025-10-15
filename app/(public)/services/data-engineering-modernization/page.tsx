import { getServiceMetadata } from '@/lib/seo/metadata';
import { DataEngineeringPageClient } from './DataEngineeringPageClient';

export const metadata = getServiceMetadata('dataEngineering');

export default function DataEngineeringPage() {
  return <DataEngineeringPageClient />;
}
