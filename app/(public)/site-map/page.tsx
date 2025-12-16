import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Force dynamic rendering to avoid SSG issues with client components
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sitemap - Innovoco',
  description: 'Navigate through all pages and sections of the Innovoco website.',
};

export default function SitemapPage() {
  const sections = [
    {
      title: 'Main',
      links: [
        { name: 'Home', href: '/' },
        { name: 'AI Solutions', href: '/#ai' },
        { name: 'Analytics & BI', href: '/#analytics' },
        { name: 'Data Engineering', href: '/#data' },
        { name: 'Industries', href: '/#industries' },
        { name: 'About Us', href: '/#about' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'AI Strategy & Consulting', href: '/services/ai-strategy-consulting' },
        { name: 'Data Engineering & Modernization', href: '/services/data-engineering-modernization' },
        { name: 'Enterprise AI Implementation', href: '/services/ai-implementation' },
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Healthcare & Life Sciences', href: '/solutions/industries/healthcare' },
        { name: 'Financial Services & Banking', href: '/solutions/industries/financial-services' },
        { name: 'Manufacturing & Industrial', href: '/solutions/industries/manufacturing' },
        { name: 'Retail & E-Commerce', href: '/solutions/industries/retail' },
        { name: 'Construction & Engineering', href: '/solutions/industries/construction' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Careers', href: '/careers' },
        { name: 'Partners', href: '/partners' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Webinars', href: '/webinars' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Accessibility', href: '/accessibility' },
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] to-[#F1F5F9] py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
            Sitemap
          </h1>

          <p className="text-lg text-[#525252] mb-12 leading-relaxed">
            Quick navigation to all pages and sections on our website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-bold text-[#0B0F19] border-b border-border pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-[#525252] hover:text-[#0A58D0] transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-[#525252]">
              For the XML sitemap used by search engines, visit{' '}
              <a href="/sitemap.xml" className="text-[#0A58D0] hover:text-[#084BB3]">
                sitemap.xml
              </a>
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
