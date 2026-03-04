import { Metadata } from 'next';
import { FinancialServicesPageClient } from './FinancialServicesPageClient';

export const metadata: Metadata = {
  title: 'AI for Financial Services | Fraud Detection, Risk Analytics & Compliance',
  description:
    'Enterprise AI solutions for banks and financial institutions. Real-time fraud detection (<100ms scoring, 95%+ accuracy), credit risk modeling, AML transaction monitoring, and algorithmic trading analytics. SOC 2 & PCI-DSS compliant. $50M+ in fraud savings delivered.',
  keywords: [
    'financial services AI',
    'fraud detection AI',
    'real-time fraud detection',
    'AML transaction monitoring',
    'credit risk modeling',
    'algorithmic trading AI',
    'banking automation',
    'regulatory compliance AI',
    'SOC 2 AI solutions',
    'PCI-DSS compliant AI',
    'fintech AI',
    'anti-money laundering AI',
    'risk analytics financial services',
    'AI for banks',
    'financial AI consulting',
  ].join(', '),
  openGraph: {
    title: 'AI for Financial Services | Innovoco',
    description:
      'Transform financial operations with real-time fraud detection, risk analytics, and AI-powered compliance. $50M+ fraud savings. SOC 2 & PCI-DSS compliant.',
    url: 'https://innovoco.com/solutions/industries/financial-services',
    type: 'website',
    images: [
      {
        url: '/images/industries/financial-services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Innovoco AI for Financial Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Financial Services | Fraud Detection & Risk Analytics',
    description:
      'Enterprise AI solutions for banks: real-time fraud detection, credit risk modeling, AML monitoring. SOC 2 & PCI-DSS compliant. $50M+ fraud savings.',
    images: ['/images/industries/financial-services-hero.jpg'],
  },
  alternates: {
    canonical: 'https://innovoco.com/solutions/industries/financial-services',
  },
};

export default function FinancialServicesPage() {
  return <FinancialServicesPageClient />;
}
