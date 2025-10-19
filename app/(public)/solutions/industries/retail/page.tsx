import { Metadata } from 'next';
import { RetailPageClient } from './RetailPageClient';

export const metadata: Metadata = {
  title: 'Retail AI | Customer 360, Personalization & Demand Forecasting',
  description: 'AI-powered retail solutions: customer 360 analytics, personalization engines, demand forecasting, and dynamic pricing. Increase revenue 28%, improve conversions 15-25%.',
  keywords: 'retail AI, customer 360, personalization engine, demand forecasting, dynamic pricing, e-commerce analytics',
  openGraph: {
    title: 'Retail & E-Commerce AI Automation Solutions',
    description: 'Transform retail with customer 360 analytics, AI personalization, and intelligent demand forecasting.',
    url: 'https://innovoco.com/solutions/industries/retail',
    type: 'website',
  },
};

export default function RetailPage() {
  return <RetailPageClient />;
}
