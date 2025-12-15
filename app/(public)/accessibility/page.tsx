import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Innovoco',
  description: 'Innovoco is committed to ensuring digital accessibility for people with disabilities.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] to-[#F1F5F9] py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
            Accessibility Statement
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#525252] mb-8 leading-relaxed">
              Last updated: January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Our Commitment</h2>
              <p className="text-[#525252] leading-relaxed mb-4">
                Innovoco is committed to ensuring digital accessibility for people with disabilities.
                We are continually improving the user experience for everyone and applying the relevant
                accessibility standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Conformance Status</h2>
              <p className="text-[#525252] leading-relaxed mb-4">
                We aim to conform with WCAG 2.1 Level AA standards. We are actively working to achieve
                full compliance across all pages and features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Accessibility Features</h2>
              <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4">
                <li>Semantic HTML structure</li>
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>Sufficient color contrast ratios</li>
                <li>Responsive design for various devices</li>
                <li>Alternative text for images</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Feedback</h2>
              <p className="text-[#525252] leading-relaxed">
                We welcome your feedback on the accessibility of our website. Please contact us at{' '}
                <a href="mailto:info@innovoco.com" className="text-[#0A58D0] hover:text-[#084BB3]">
                  info@innovoco.com
                </a>{' '}
                if you encounter any accessibility barriers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">Technical Specifications</h2>
              <p className="text-[#525252] leading-relaxed">
                The accessibility of this website relies on the following technologies:
              </p>
              <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mt-2">
                <li>HTML5</li>
                <li>WAI-ARIA</li>
                <li>CSS3</li>
                <li>JavaScript</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
