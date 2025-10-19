import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Innovoco - Enterprise AI & Data Protection',
  description: 'Innovoco Privacy Policy: Learn how we protect your data with SOC 2 Type II, HIPAA, GDPR compliance and ISO/IEC 42001:2023 AI Management Systems certification. Enterprise-grade security for Fortune 500 clients.',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://innovoco.com/privacy'
  }
};

export default function PrivacyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
