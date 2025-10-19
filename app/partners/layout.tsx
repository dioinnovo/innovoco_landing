import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microsoft Solutions Partner & Google Cloud Premier AI Consultant | Innovoco',
  description: 'Innovoco: Microsoft Solutions Partner for Data & AI (Azure), Google Cloud Premier Partner with ML Services Specialization. Elite partnerships with Databricks, AWS, OpenAI & Snowflake delivering 380% average ROI for Fortune 500 AI transformations.',
  keywords: [
    'Microsoft Solutions Partner Data AI Azure',
    'Google Cloud Premier Partner AI machine learning',
    'AWS Machine Learning Competency',
    'Databricks Elite Partner',
    'OpenAI Services Partner',
    'Snowflake Elite Partner',
    'ISO/IEC 42001:2023 AI Management',
    'Azure AI Foundry certification',
    'Vertex AI ML Services Specialization',
    'Fortune 500 AI transformation',
    'enterprise AI consultant',
    'AI technology partnerships',
    'certified AI implementation',
    'enterprise data AI solutions'
  ],
  openGraph: {
    title: 'Microsoft Solutions Partner & Google Cloud Premier AI Consultant | Innovoco',
    description: 'Elite technology partnerships with Microsoft, Google Cloud, AWS, Databricks, OpenAI & Snowflake. ISO/IEC 42001:2023 certified AI management delivering 380% ROI.',
    url: 'https://innovoco.com/partners',
    siteName: 'Innovoco',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-partners.png',
        width: 1200,
        height: 630,
        alt: 'Innovoco Technology Partnerships - Microsoft, Google Cloud, AWS, Databricks, OpenAI, Snowflake'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microsoft Solutions Partner & Google Cloud Premier AI Consultant | Innovoco',
    description: 'Elite AI technology partnerships delivering 380% ROI for Fortune 500 enterprises. ISO/IEC 42001:2023 certified.',
    images: ['/images/og-partners.png']
  },
  alternates: {
    canonical: 'https://innovoco.com/partners'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function PartnersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
