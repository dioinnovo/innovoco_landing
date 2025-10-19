import { Metadata } from 'next';
import { HealthcarePageClient } from './HealthcarePageClient';

export const metadata: Metadata = {
  title: 'Healthcare AI Automation & Analytics | HIPAA-Compliant Solutions',
  description: 'HIPAA-compliant AI automation and analytics for healthcare providers. Reduce readmissions 25%, improve diagnostic accuracy 90%+, and transform patient outcomes with intelligent automation.',
  keywords: 'healthcare AI, HIPAA compliant analytics, clinical decision support, predictive patient analytics, medical imaging AI, healthcare automation',
  openGraph: {
    title: 'Healthcare AI Automation & Analytics Solutions',
    description: 'Transform patient outcomes with HIPAA-compliant AI automation and advanced analytics for healthcare providers.',
    url: 'https://innovoco.com/solutions/industries/healthcare',
    type: 'website',
  },
};

export default function HealthcarePage() {
  return <HealthcarePageClient />;
}
