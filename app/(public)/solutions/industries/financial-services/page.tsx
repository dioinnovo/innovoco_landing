import { Metadata } from 'next';
import { FinancialServicesPageClient } from './FinancialServicesPageClient';

export const metadata: Metadata = {
  title: 'AI for Financial Services | Fraud, Risk, Compliance & Private Equity',
  description:
    'Enterprise AI for banks, institutions, and sponsors. Real-time fraud detection (<100ms scoring, 95%+ accuracy), credit risk, AML monitoring, markets analytics, and private equity deal flow, diligence, and portfolio intelligence. SOC 2 & PCI-DSS aligned. $50M+ in fraud savings delivered.',
  keywords: [
    'financial services AI',
    'fraud detection AI',
    'real-time fraud detection',
    'AML transaction monitoring',
    'credit risk modeling',
    'algorithmic trading AI',
    'private equity AI',
    'deal diligence AI',
    'sponsor analytics AI',
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
      'Fraud detection, risk analytics, compliance, and sponsor-side deal and portfolio AI. $50M+ fraud savings. SOC 2 & PCI-DSS aligned.',
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
    title: 'AI for Financial Services | Fraud, Risk & Sponsor Intelligence',
    description:
      'Enterprise AI for banks and sponsors: fraud detection, credit risk, AML, markets, and PE deal flow & portfolio analytics. SOC 2 & PCI-DSS aligned. $50M+ fraud savings.',
    images: ['/images/industries/financial-services-hero.jpg'],
  },
  alternates: {
    canonical: 'https://innovoco.com/solutions/industries/financial-services',
  },
};

export default function FinancialServicesPage() {
  return <FinancialServicesPageClient />;
}
