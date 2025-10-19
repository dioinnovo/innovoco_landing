'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/layout/footer';
import ContactModal from '@/components/landing/ContactModal';
import { Newspaper, TrendingUp, Lightbulb, Rocket, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    // Simulate API call - replace with actual newsletter service
    setTimeout(() => {
      setSubscribeMessage('Successfully subscribed! You\'ll be first to know when we launch.');
      setEmail('');
      setIsSubscribing(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubscribeMessage(''), 5000);
    }, 1000);
  };

  const upcomingTopics = [
    {
      icon: TrendingUp,
      title: 'AI Strategy & Roadmaps',
      description: 'Executive guides for planning and executing enterprise AI transformations',
      color: 'from-[#0A58D0] to-[#084BB3]'
    },
    {
      icon: Lightbulb,
      title: 'Technical Deep Dives',
      description: 'Architecture patterns, best practices, and implementation guides for data & AI',
      color: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: Rocket,
      title: 'Innovation & Trends',
      description: 'Latest developments in generative AI, MLOps, and emerging technologies',
      color: 'from-[#10A37F] to-[#059669]'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logos/Innovoco-Logo-hires.png"
                alt="Innovoco"
                width={140}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ height: '32px', width: 'auto' }}
                priority
              />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/case-studies" className="hidden sm:block">
                <Button variant="ghost" size="sm">Case Studies</Button>
              </Link>
              <Button
                onClick={() => setContactModalOpen(true)}
                size="sm"
                className="bg-[#0A58D0] hover:bg-[#084BB3] text-white text-xs sm:text-sm px-3 sm:px-4"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-[#0A58D0]/5 via-transparent to-[#8B5CF6]/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20 text-sm">
            <Newspaper className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B0F19] mb-6">
            AI & Data Insights Blog
          </h1>

          <p className="text-lg sm:text-xl text-[#525252] mb-8 max-w-2xl mx-auto leading-relaxed">
            Deep technical insights, executive strategy guides, and the latest trends in enterprise AI,
            machine learning, and data transformation from our experts.
          </p>

          <div className="inline-flex items-center gap-2 text-[#0A58D0] mb-12">
            <Rocket className="h-5 w-5" />
            <span className="font-semibold">Launching Q4 2025</span>
          </div>

          {/* Newsletter Signup */}
          <Card className="max-w-lg mx-auto p-8 border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Mail className="h-6 w-6 text-[#0A58D0]" />
              <h2 className="text-xl font-bold text-[#0B0F19]">Get Notified at Launch</h2>
            </div>
            <p className="text-sm text-[#525252] mb-6">
              Be the first to receive our AI strategy guides, technical tutorials, and industry insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-[#0A58D0] hover:bg-[#084BB3] text-white"
              >
                {isSubscribing ? 'Subscribing...' : 'Notify Me at Launch'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {subscribeMessage && (
              <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <p>{subscribeMessage}</p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Upcoming Content Topics */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto">
              Expert content covering the full spectrum of enterprise AI and data transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTopics.map((topic, i) => (
              <Card key={i} className="p-6 border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center mb-4`}>
                  <topic.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19] mb-3">{topic.title}</h3>
                <p className="text-[#525252] leading-relaxed">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Preview */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              Planned Content Series
            </h2>
            <p className="text-lg text-[#525252]">
              Comprehensive guides and insights from real-world implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-gray-200">
              <Badge className="mb-3 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20">
                Executive Series
              </Badge>
              <h3 className="text-xl font-bold text-[#0B0F19] mb-3">
                Building an Enterprise AI Strategy
              </h3>
              <p className="text-[#525252] mb-4">
                6-part series on developing ROI-focused AI roadmaps, building buy-in, and scaling
                AI initiatives across Fortune 500 organizations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>AI maturity assessment frameworks</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use case prioritization and ROI modeling</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Change management and adoption strategies</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-gray-200">
              <Badge className="mb-3 bg-purple-500/10 text-purple-600 border-purple-500/20">
                Technical Series
              </Badge>
              <h3 className="text-xl font-bold text-[#0B0F19] mb-3">
                Production ML Architectures
              </h3>
              <p className="text-[#525252] mb-4">
                Detailed guides on building scalable, secure ML platforms using Databricks, Snowflake,
                and cloud-native services.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>MLOps pipelines with Azure ML and Databricks</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Real-time feature stores and model serving</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>LLM deployment and RAG architectures</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-gray-200">
              <Badge className="mb-3 bg-green-500/10 text-green-600 border-green-500/20">
                Case Study Series
              </Badge>
              <h3 className="text-xl font-bold text-[#0B0F19] mb-3">
                Real-World AI Transformations
              </h3>
              <p className="text-[#525252] mb-4">
                Behind-the-scenes look at successful enterprise AI implementations with measurable
                business impact and lessons learned.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Energy sector predictive maintenance (380% ROI)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Financial services fraud detection at scale</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Healthcare NLP for clinical documentation</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-gray-200">
              <Badge className="mb-3 bg-orange-500/10 text-orange-600 border-orange-500/20">
                Industry Trends
              </Badge>
              <h3 className="text-xl font-bold text-[#0B0F19] mb-3">
                AI Technology Landscape
              </h3>
              <p className="text-[#525252] mb-4">
                Analysis of emerging AI technologies, vendor evaluations, and market trends from
                our partnerships with Microsoft, Google Cloud, and OpenAI.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Generative AI platform comparisons</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Data lakehouse architecture evolution</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#525252]">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>AI governance and regulatory compliance</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-[#0A58D0] to-[#084BB3] text-white p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Can't Wait for Our Blog?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Explore our case studies to see real-world AI transformations in action, or schedule
                a briefing to discuss your enterprise AI strategy today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    className="bg-white text-[#0A58D0] hover:bg-gray-100 w-full sm:w-auto"
                  >
                    View Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Schedule Briefing
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}
