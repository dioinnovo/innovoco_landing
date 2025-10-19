import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Innovoco - Enterprise AI Consulting Agreement',
  description: 'Innovoco Terms of Service: Professional AI and data transformation consulting terms, intellectual property rights, confidentiality, and service agreements for Fortune 500 enterprises.',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://innovoco.com/terms'
  }
};

export default function TermsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
