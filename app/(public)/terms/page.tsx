import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Innovoco',
  description: 'Terms of Service for Innovoco enterprise AI and data solutions.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] to-[#F1F5F9] py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#525252] mb-8 leading-relaxed">
              Last updated: January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#525252] leading-relaxed">
                By accessing and using Innovoco's website and services, you accept and agree to be bound
                by the terms and provisions of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">2. Services</h2>
              <p className="text-[#525252] leading-relaxed">
                Innovoco provides enterprise AI consulting, data engineering, and analytics services.
                Specific terms for each engagement are detailed in separate service agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">3. Intellectual Property</h2>
              <p className="text-[#525252] leading-relaxed">
                All content, trademarks, and intellectual property on this website are owned by Innovoco
                or licensed to us. Unauthorized use is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">4. Contact</h2>
              <p className="text-[#525252] leading-relaxed">
                For questions about these terms, please contact us at{' '}
                <a href="mailto:info@innovoco.com" className="text-[#0A58D0] hover:text-[#084BB3]">
                  info@innovoco.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
