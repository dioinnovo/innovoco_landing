import { Metadata } from 'next';
import { HealthcarePageClient } from './HealthcarePageClient';

export const metadata: Metadata = {
  title: 'Healthcare AI Solutions | HIPAA-Compliant Clinical Decision Support & Predictive Analytics',
  description: 'HIPAA-compliant AI automation and analytics for healthcare providers. Clinical decision support, medical imaging AI, predictive readmission models, and population health management. Reduce readmissions 25%, improve diagnostic accuracy 90%+.',
  keywords: [
    'healthcare AI solutions',
    'HIPAA compliant AI',
    'clinical decision support AI',
    'medical imaging AI',
    'predictive patient analytics',
    'healthcare automation',
    'EHR integration AI',
    'sepsis early warning system',
    'population health management',
    'hospital readmission reduction',
    'healthcare predictive analytics',
    'AI for hospitals',
    'HIPAA compliant analytics',
    'clinical AI automation',
  ].join(', '),
  openGraph: {
    title: 'Healthcare AI Solutions | HIPAA-Compliant Automation & Analytics',
    description: 'Transform patient outcomes with HIPAA-compliant AI. Clinical decision support, medical imaging AI, and predictive analytics for healthcare providers.',
    url: 'https://innovoco.com/solutions/industries/healthcare',
    type: 'website',
    siteName: 'Innovoco',
    images: [
      {
        url: 'https://innovoco.com/images/industries/healthcare-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Innovoco Healthcare AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare AI Solutions | HIPAA-Compliant Clinical AI',
    description: 'HIPAA-compliant AI for clinical decision support, medical imaging, and predictive analytics. 90%+ diagnostic accuracy. 25% readmission reduction.',
    images: ['https://innovoco.com/images/industries/healthcare-hero.jpg'],
  },
  alternates: {
    canonical: 'https://innovoco.com/solutions/industries/healthcare',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HealthcarePage() {
  return <HealthcarePageClient />;
}
