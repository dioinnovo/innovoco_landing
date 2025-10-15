'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/layout/footer';
import ContactModal from '@/components/landing/ContactModal';
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Brain,
  Cloud,
  Lock,
  Rocket,
  Star,
  Building
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnersPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const partners = [
    {
      name: "Microsoft Gold Partner",
      logo: "/images/logos/microsoft.png",
      logoWidth: 120,
      logoHeight: 26,
      color: "from-[#0078D4] to-[#00BCF2]",
      certifications: ["Azure AI Foundry", "Power Platform", "Co-sell Ready"],
      description: "Enterprise-grade AI solutions built on Azure's trusted cloud infrastructure",
      stats: { deployments: "200+", uptime: "99.99%", support: "24/7" }
    },
    {
      name: "Google Cloud Premier",
      logo: "/images/logos/google-cloud.png",
      logoWidth: 120,
      logoHeight: 20,
      color: "from-[#4285F4] to-[#34A853]",
      certifications: ["Vertex AI", "BigQuery", "Machine Learning Partner"],
      description: "Data-native intelligence powered by Google's cutting-edge AI technology",
      stats: { models: "50+", data: "100TB+", efficiency: "3x faster" }
    },
    {
      name: "Databricks Elite",
      logo: "/images/logos/databricks.png",
      logoWidth: 120,
      logoHeight: 22,
      color: "from-[#FF3621] to-[#FF6B35]",
      certifications: ["Lakehouse Certified", "Delta Lake", "MLflow Expert"],
      description: "Unified analytics platform for massive-scale data engineering and AI",
      stats: { pipelines: "500+", cost: "60% lower", scale: "Petabyte" }
    },
    {
      name: "AWS Advanced",
      logo: "/images/logos/aws.png",
      logoWidth: 60,
      logoHeight: 36,
      color: "from-[#FF9900] to-[#FFB266]",
      certifications: ["SageMaker", "Bedrock", "Well-Architected"],
      description: "Scalable AI/ML solutions on the world's most comprehensive cloud",
      stats: { regions: "30+", services: "200+", compliance: "Full" }
    },
    {
      name: "OpenAI Preferred",
      logo: "/images/logos/openai.png",
      logoWidth: 120,
      logoHeight: 30,
      color: "from-[#10A37F] to-[#1DB584]",
      certifications: ["GPT-4 Enterprise", "Custom Models", "Priority Support"],
      description: "State-of-the-art language models with enterprise security and scale",
      stats: { tokens: "1B+", accuracy: "95%", languages: "100+" }
    },
    {
      name: "Snowflake Select",
      logo: "/images/logos/snowflake.png",
      logoWidth: 120,
      logoHeight: 20,
      color: "from-[#29B5E8] to-[#56C7F0]",
      certifications: ["Data Cloud", "Snowpark", "Native Apps"],
      description: "Cloud-native data platform for seamless data collaboration",
      stats: { queries: "1M+/day", sharing: "Instant", security: "SOC 2" }
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2, HIPAA, and GDPR compliance across all partnerships"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "60% faster implementation with pre-built integrations and certified architectures"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Direct access to partner technical teams and 24/7 enterprise support"
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description: "Average 380% return on investment within the first 18 months"
    }
  ];

  const achievements = [
    { metric: "150+", label: "Combined Certifications" },
    { metric: "500+", label: "Enterprise Deployments" },
    { metric: "99.9%", label: "Platform Uptime" },
    { metric: "$50M+", label: "Client Value Generated" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/images/logos/innovoco-logo.png"
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
                <span className="hidden sm:inline">Schedule Briefing</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A58D0]/5 via-transparent to-[#8B5CF6]/5" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-6xl relative"
        >
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20 text-xs sm:text-sm">
              Strategic Technology Alliances
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4 md:mb-6">
              Powered by Industry Leaders
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#525252] max-w-3xl mx-auto px-4 sm:px-0">
              We've partnered with the world's most trusted technology platforms to deliver 
              unmatched enterprise AI and data solutions
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#0A58D0] mb-1 sm:mb-2">
                  {achievement.metric}
                </div>
                <div className="text-xs sm:text-sm text-[#525252]">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partner Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-gray-200 hover:border-[#0A58D0]/30 transition-all duration-300 hover:shadow-xl">
                  <div className={`h-2 bg-gradient-to-r ${partner.color}`} />
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-20 sm:w-24 h-10 sm:h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                        {partner.logo ? (
                          <Image 
                            src={partner.logo}
                            alt={partner.name}
                            width={partner.logoWidth || 100}
                            height={partner.logoHeight || 30}
                            className="object-contain w-full h-full"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-gray-400 text-xs">
                            {partner.name.split(' ')[0]}
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Certified
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg text-[#0B0F19] mb-2">
                      {partner.name}
                    </h3>
                    
                    <p className="text-sm text-[#525252] mb-4">
                      {partner.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {partner.certifications.map((cert, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-[#525252]">{cert}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(partner.stats).map(([key, value], k) => (
                          <div key={k}>
                            <div className="text-sm font-semibold text-[#0A58D0]">
                              {value}
                            </div>
                            <div className="text-[10px] text-gray-500 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#0A58D0]/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mb-3 md:mb-4">
              Why Fortune 500 Companies Choose Innovoco
            </h2>
            <p className="text-base sm:text-lg text-[#525252] px-4 sm:px-0">
              Our strategic partnerships enable unmatched capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-[#0A58D0]" />
                </div>
                <h3 className="font-semibold text-[#0B0F19] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#525252]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-[#0A58D0] to-[#084BB3] text-white p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
                  Ready to Transform Your Enterprise?
                </h2>
                <p className="text-base sm:text-lg mb-4 md:mb-6 text-white/90">
                  Join industry leaders who trust Innovoco to deliver mission-critical 
                  AI and data solutions with our world-class technology partners.
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-6 md:mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Direct access to partner technical teams</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Pre-negotiated enterprise pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Accelerated implementation timelines</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button 
                    onClick={() => setContactModalOpen(true)}
                    size="lg"
                    className="bg-white text-[#0A58D0] hover:bg-gray-100 w-full sm:w-auto"
                  >
                    <span className="hidden sm:inline">Schedule Executive Briefing</span>
                    <span className="sm:hidden">Schedule Briefing</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href="/case-studies" className="w-full sm:w-auto">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 w-full"
                    >
                      View Success Stories
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Card className="bg-white/10 backdrop-blur border-white/20 p-4 sm:p-6">
                  <Star className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-400 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">4.9/5</div>
                  <div className="text-xs sm:text-sm text-white/80">Partner Rating</div>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-white/20 p-4 sm:p-6">
                  <Clock className="h-6 sm:h-8 w-6 sm:w-8 text-green-400 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">48hrs</div>
                  <div className="text-xs sm:text-sm text-white/80">Avg. Response</div>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-white/20 p-4 sm:p-6">
                  <Building className="h-6 sm:h-8 w-6 sm:w-8 text-blue-400 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">50+</div>
                  <div className="text-xs sm:text-sm text-white/80">Enterprise Clients</div>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-white/20 p-4 sm:p-6">
                  <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-purple-400 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">380%</div>
                  <div className="text-xs sm:text-sm text-white/80">Average ROI</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Partnership Levels */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mb-3 md:mb-4">
              Partnership Recognition
            </h2>
            <p className="text-base sm:text-lg text-[#525252] px-4 sm:px-0">
              Our commitment to excellence recognized by industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
              <div className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Gold & Premier</h3>
                <p className="text-sm text-[#525252]">
                  Highest partnership tiers with Microsoft and Google Cloud
                </p>
              </div>
            </Card>
            
            <Card className="border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-white">
              <div className="p-6 text-center">
                <Brain className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">AI Specialization</h3>
                <p className="text-sm text-[#525252]">
                  Certified expertise in enterprise AI and machine learning
                </p>
              </div>
            </Card>

            <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-white">
              <div className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Security First</h3>
                <p className="text-sm text-[#525252]">
                  Validated security practices across all partner platforms
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}