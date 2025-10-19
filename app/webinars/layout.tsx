import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expert AI Webinars - Coming Soon | Innovoco',
  description: 'Innovoco expert-led AI webinars launching Q1 2026. Live sessions on enterprise AI strategy, MLOps, generative AI deployment with Microsoft, Google Cloud, Databricks, and OpenAI experts.',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://innovoco.com/webinars'
  }
};

export default function WebinarsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
