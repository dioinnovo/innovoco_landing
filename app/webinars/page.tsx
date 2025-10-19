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
import { Video, Calendar, Users, Trophy, CheckCircle, ArrowRight, Sparkles, Brain, Zap } from 'lucide-react';

export default function WebinarsPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    // Simulate API call - replace with actual webinar registration service
    setTimeout(() => {
      setSubscribeMessage('You\'re on the list! We\'ll notify you when our first webinar is scheduled.');
      setEmail('');
      setIsSubscribing(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubscribeMessage(''), 5000);
    }, 1000);
  };

  const plannedWebinarSeries = [
    {
      icon: Brain,
      title: 'AI Strategy for Executives',
      description: 'Building enterprise AI roadmaps that deliver measurable ROI',
      topics: ['AI maturity assessment', 'Use case prioritization', 'Building the business case'],
      color: 'from-[#0A58D0] to-[#084BB3]'
    },
    {
      icon: Zap,
      title: 'Generative AI in Production',
      description: 'Deploying LLMs and RAG systems at enterprise scale',
      topics: ['ChatGPT Enterprise deployment', 'Custom GPT development', 'Security & governance'],
      color: 'from-[#10A37F] to-[#059669]'
    },
    {
      icon: Trophy,
      title: 'MLOps Best Practices',
      description: 'Automating ML workflows with Databricks and Azure ML',
      topics: ['CI/CD for ML models', 'Feature stores', 'Model monitoring & drift detection'],
      color: 'from-[#FF3621] to-[#DC2626]'
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
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-[#0A58D0]/5 via-transparent to-[#10A37F]/5">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20 text-sm">
            <Video className="h-4 w-4 mr-2" />
            Coming Q1 2026
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B0F19] mb-6">
            Expert-Led AI Webinars
          </h1>

          <p className="text-lg sm:text-xl text-[#525252] mb-8 max-w-2xl mx-auto leading-relaxed">
            Live technical sessions and executive briefings on enterprise AI, machine learning,
            and data transformation from Innovoco's certified experts and technology partners.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-[#525252]">
              <Calendar className="h-5 w-5 text-[#0A58D0]" />
              <span className="font-medium">Monthly Sessions</span>
            </div>
            <span className="hidden sm:block text-gray-300">•</span>
            <div className="flex items-center gap-2 text-[#525252]">
              <Users className="h-5 w-5 text-[#0A58D0]" />
              <span className="font-medium">Live Q&A</span>
            </div>
            <span className="hidden sm:block text-gray-300">•</span>
            <div className="flex items-center gap-2 text-[#525252]">
              <Trophy className="h-5 w-5 text-[#0A58D0]" />
              <span className="font-medium">Free for All</span>
            </div>
          </div>

          {/* Interest Registration */}
          <Card className="max-w-lg mx-auto p-8 border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Sparkles className="h-6 w-6 text-[#0A58D0]" />
              <h2 className="text-xl font-bold text-[#0B0F19]">Register Your Interest</h2>
            </div>
            <p className="text-sm text-[#525252] mb-6">
              Be first to know when we announce our webinar schedule and get exclusive early access.
            </p>
            <form onSubmit={handleInterestSubmit} className="space-y-4">
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
                {isSubscribing ? 'Registering...' : 'Notify Me When Available'}
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

      {/* Planned Webinar Series */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              Planned Webinar Series
            </h2>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto">
              Interactive sessions covering AI strategy, technical implementation, and emerging technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plannedWebinarSeries.map((series, i) => (
              <Card key={i} className="p-6 border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${series.color} rounded-lg flex items-center justify-center mb-4`}>
                  <series.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19] mb-2">{series.title}</h3>
                <p className="text-[#525252] mb-4">{series.description}</p>
                <div className="space-y-2">
                  {series.topics.map((topic, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#525252]">{topic}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-[#525252]">
              Practical insights from real Fortune 500 implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-gray-200">
              <h3 className="text-xl font-bold text-[#0B0F19] mb-4 flex items-center gap-2">
                <Badge className="bg-[#0A58D0] text-white">Executive Track</Badge>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Building AI strategies that align with business objectives
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    ROI modeling and measuring AI impact
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Managing organizational change and AI adoption
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    AI governance frameworks and ethical considerations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Vendor selection and partnership strategies
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-gray-200">
              <h3 className="text-xl font-bold text-[#0B0F19] mb-4 flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Technical Track</Badge>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Production ML architectures on Azure, GCP, and AWS
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    LLM deployment patterns and RAG system design
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    MLOps automation with Databricks and Azure ML
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Data lakehouse architecture with Delta Lake
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[#525252]">
                    Enterprise security and compliance (SOC 2, HIPAA, GDPR)
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              Who Should Attend
            </h2>
            <p className="text-lg text-[#525252]">
              Designed for decision-makers and practitioners driving AI transformation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Chief Data Officers',
              'VP of AI/ML',
              'Enterprise Architects',
              'Data Scientists',
              'ML Engineers',
              'Business Leaders',
              'Technology Directors',
              'Innovation Managers'
            ].map((role, i) => (
              <Card key={i} className="p-4 border-gray-200 text-center hover:shadow-md transition-all duration-300">
                <Users className="h-8 w-8 text-[#0A58D0] mx-auto mb-2" />
                <p className="font-semibold text-[#0B0F19]">{role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Speakers */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0F19] mb-4">
              Expert Speakers from Leading Technology Partners
            </h2>
            <p className="text-lg text-[#525252]">
              Joint sessions with Microsoft, Google Cloud, Databricks, and OpenAI
            </p>
          </div>

          <Card className="p-8 border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center opacity-60">
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">Microsoft</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">Google Cloud</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">Databricks</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">OpenAI</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">AWS</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#525252]">Snowflake</p>
              </div>
            </div>
            <p className="text-center text-sm text-[#525252] mt-6">
              Co-presented with certified experts from our technology partners
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-[#0A58D0] to-[#084BB3] text-white p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Need AI Expertise Now?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Don't wait for webinars. Schedule a private executive briefing to discuss your
                enterprise AI strategy and get expert recommendations tailored to your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="bg-white text-[#0A58D0] hover:bg-gray-100 w-full sm:w-auto"
                >
                  Schedule Private Briefing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    View Case Studies
                  </Button>
                </Link>
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
