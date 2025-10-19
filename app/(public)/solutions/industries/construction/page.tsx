import { Metadata } from 'next';
import { ConstructionPageClient } from './ConstructionPageClient';

export const metadata: Metadata = {
  title: 'Construction AI | Property Inspections, Automated Reports & Predictive Maintenance',
  description: 'AI-powered property inspections, automated report generation, and predictive maintenance for construction and home services. 50% faster inspections, 99.7% accuracy, 84% report time reduction.',
  keywords: 'construction AI, property inspection automation, roof damage detection, HVAC predictive maintenance, automated reports, computer vision, drone inspections',
  openGraph: {
    title: 'Construction & Home Services AI Automation Solutions',
    description: 'Transform construction operations with AI-powered inspections, automated reporting, and predictive maintenance.',
    url: 'https://innovoco.com/solutions/industries/construction',
    type: 'website',
  },
};

export default function ConstructionPage() {
  return <ConstructionPageClient />;
}
