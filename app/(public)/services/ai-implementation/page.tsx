import { getServiceMetadata } from '@/lib/seo/metadata';
import { AIImplementationPageClient } from './AIImplementationPageClient';

export const metadata = getServiceMetadata('aiImplementation');

export default function AIImplementationPage() {
  return <AIImplementationPageClient />;
}
