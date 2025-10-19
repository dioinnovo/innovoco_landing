import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Data Insights Blog - Coming Soon | Innovoco',
  description: 'Innovoco AI & Data Insights Blog launching Q4 2025. Expert guides on enterprise AI strategy, ML architectures, case studies, and trends from Microsoft, Google Cloud, and OpenAI partnerships.',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://innovoco.com/blog'
  }
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
