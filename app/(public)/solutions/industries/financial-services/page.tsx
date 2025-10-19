import { Metadata } from 'next';
import { FinancialServicesPageClient } from './FinancialServicesPageClient';

export const metadata: Metadata = {
  title: 'Financial Services AI | Fraud Detection & Risk Analytics',
  description: 'Real-time fraud detection AI, risk analytics, and regulatory compliance solutions for banks and financial institutions. $50M+ in fraud savings delivered.',
  keywords: 'financial services AI, fraud detection, risk analytics, banking automation, regulatory compliance, algorithmic trading',
  openGraph: {
    title: 'Financial Services AI Automation & Analytics',
    description: 'Transform financial operations with real-time fraud detection, risk analytics, and intelligent automation.',
    url: 'https://innovoco.com/solutions/industries/financial-services',
    type: 'website',
  },
};

export default function FinancialServicesPage() {
  return <FinancialServicesPageClient />;
}
