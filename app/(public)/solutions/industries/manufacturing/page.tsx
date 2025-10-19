import { Metadata } from 'next';
import { ManufacturingPageClient } from './ManufacturingPageClient';

export const metadata: Metadata = {
  title: 'Manufacturing AI | Predictive Maintenance & Industry 4.0',
  description: 'Industry 4.0 AI automation: predictive maintenance, quality control, and supply chain optimization. Reduce downtime 30-50%, improve defect detection 99%+.',
  keywords: 'manufacturing AI, predictive maintenance, quality control AI, supply chain optimization, Industry 4.0, IoT analytics',
  openGraph: {
    title: 'Manufacturing AI Automation & Analytics Solutions',
    description: 'Transform manufacturing with predictive maintenance, AI quality control, and intelligent automation.',
    url: 'https://innovoco.com/solutions/industries/manufacturing',
    type: 'website',
  },
};

export default function ManufacturingPage() {
  return <ManufacturingPageClient />;
}
