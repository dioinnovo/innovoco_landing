import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Webinars - Innovoco',
  description: 'Join our webinars and learn about enterprise AI implementation, data modernization, and digital transformation strategies.',
};

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] to-[#F1F5F9] py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
            Webinars & Events
          </h1>

          <p className="text-lg text-[#525252] mb-8 leading-relaxed">
            Join our expert-led webinars to learn about AI strategy, data modernization,
            and proven approaches to enterprise digital transformation.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-[#0B0F19] font-medium">
              We're planning exciting webinars for 2025. Subscribe to get notified about upcoming events.
            </p>
          </div>

          <Button
            asChild
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          >
            <Link href="/">Get Notified</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
