import { getServiceMetadata } from '@/lib/seo/metadata';
import { AIStrategyPageClient } from './AIStrategyPageClient';

export const metadata = getServiceMetadata('aiStrategy');

export default function AIStrategyPage() {
  return <AIStrategyPageClient />;
}
