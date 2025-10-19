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
  Building,
  BadgeCheck,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnersPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const partners = [
    {
      name: "Microsoft Solutions Partner",
      subtitle: "Data & AI (Azure)",
      logo: "/images/logos/microsoft.png",
      logoWidth: 120,
      logoHeight: 26,
      color: "from-[#0078D4] to-[#00BCF2]",
      certifications: ["Azure AI Foundry", "ISO/IEC 42001:2023", "Microsoft 365 Copilot", "Co-sell Ready"],
      description: "Microsoft Solutions Partner for Data & AI with Azure AI Foundry ISO/IEC 42001:2023 certification",
      stats: { deployments: "200+", uptime: "99.99%", "co-sell": "3x faster" }
    },
    {
      name: "Google Cloud Premier",
      subtitle: "ML Services Specialization",
      logo: "/images/logos/google-cloud.png",
      logoWidth: 120,
      logoHeight: 20,
      color: "from-[#4285F4] to-[#34A853]",
      certifications: ["Vertex AI", "ML Services", "Generative AI", "AI Agent Ecosystem"],
      description: "Google Cloud Premier Partner with ML Services Specialization and AI Agent Ecosystem Program membership",
      stats: { models: "50+", data: "100TB+", agents: "250+" }
    },
    {
      name: "Databricks Elite Partner",
      subtitle: "Delivery Provider Program",
      logo: "/images/logos/databricks.png",
      logoWidth: 120,
      logoHeight: 22,
      color: "from-[#FF3621] to-[#FF6B35]",
      certifications: ["Lakehouse Certified", "MLflow Expert", "Delta Lake", "Unity Catalog"],
      description: "Elite-tier Databricks partnership with Delivery Provider Program recognition and Accelerate funding",
      stats: { pipelines: "500+", cost: "60% lower", scale: "Petabyte" }
    },
    {
      name: "AWS Advanced Partner",
      subtitle: "ML & Gen AI Competency",
      logo: "/images/logos/aws.png",
      logoWidth: 60,
      logoHeight: 36,
      color: "from-[#FF9900] to-[#FFB266]",
      certifications: ["ML Competency", "Gen AI Competency", "SageMaker AI", "Bedrock"],
      description: "AWS Machine Learning and Generative AI Competency validated with Well-Architected framework expertise",
      stats: { regions: "30+", services: "200+", compliance: "Full" }
    },
    {
      name: "OpenAI Services Partner",
      subtitle: "1 of 7 Global Partners",
      logo: "/images/logos/openai.png",
      logoWidth: 120,
      logoHeight: 30,
      color: "from-[#10A37F] to-[#1DB584]",
      certifications: ["ChatGPT Enterprise", "GPT-4", "Custom GPTs", "Priority Support"],
      description: "Exclusive OpenAI Services Partner (1 of 7 globally) with ChatGPT Enterprise deployment expertise",
      stats: { tokens: "1B+", accuracy: "95%", languages: "100+" }
    },
    {
      name: "Snowflake Elite Partner",
      subtitle: "AI Data Cloud Certified",
      logo: "/images/logos/snowflake.png",
      logoWidth: 120,
      logoHeight: 20,
      color: "from-[#29B5E8] to-[#56C7F0]",
      certifications: ["AI Data Cloud", "Snowpark ML", "Native Apps", "Practice Development"],
      description: "Snowflake Elite Services Partner with highest-tier funding, AI Data Cloud and Snowpark ML specialization",
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
    { metric: "380%", label: "Average ROI" },
    { metric: "3x", label: "Faster Deal Closure" }
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
              <Shield className="h-3 w-3 mr-1" />
              ISO/IEC 42001:2023 Certified AI Management
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4 md:mb-6">
              Microsoft Solutions Partner, Google Cloud Premier Partner & Elite AI Technology Alliances
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#525252] max-w-3xl mx-auto px-4 sm:px-0">
              Certified partnerships with Microsoft, Google Cloud, AWS, Databricks, OpenAI, and Snowflake
              delivering <span className="font-semibold text-[#0A58D0]">380% average ROI</span> for Fortune 500 AI transformations
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

                    <h3 className="font-bold text-lg text-[#0B0F19] mb-1">
                      {partner.name}
                    </h3>
                    {partner.subtitle && (
                      <p className="text-xs font-medium text-[#0A58D0] mb-2">
                        {partner.subtitle}
                      </p>
                    )}

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

      {/* Enterprise Security & Compliance */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mb-3 md:mb-4">
              Enterprise Security & Compliance
            </h2>
            <p className="text-base sm:text-lg text-[#525252] px-4 sm:px-0">
              ISO/IEC 42001:2023 certified AI management across all partner platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-[#0A58D0]/5 to-white border-[#0A58D0]/20">
              <div className="p-6">
                <Shield className="h-10 w-10 text-[#0A58D0] mb-4" />
                <h3 className="font-bold text-[#0B0F19] mb-2">ISO/IEC 42001:2023</h3>
                <p className="text-sm text-[#525252]">
                  Globally recognized AI Management Systems certification
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/5 to-white border-green-500/20">
              <div className="p-6">
                <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="font-bold text-[#0B0F19] mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-[#525252]">
                  Comprehensive security, availability, and confidentiality controls
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/5 to-white border-purple-500/20">
              <div className="p-6">
                <Lock className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="font-bold text-[#0B0F19] mb-2">HIPAA & GDPR</h3>
                <p className="text-sm text-[#525252]">
                  Healthcare and data privacy compliance across all platforms
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/5 to-white border-orange-500/20">
              <div className="p-6">
                <BadgeCheck className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="font-bold text-[#0B0F19] mb-2">FedRAMP Ready</h3>
                <p className="text-sm text-[#525252]">
                  Federal security standards with PCI-DSS compliance
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-[#0A58D0]/5 to-purple-500/5 rounded-2xl border border-[#0A58D0]/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-[#0A58D0]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0B0F19] mb-2">Enterprise Data Protection</h3>
                <p className="text-sm text-[#525252] leading-relaxed">
                  VPC isolation, encryption at rest and in transit (AWS KMS, Azure Key Vault), IAM-based access controls,
                  and automated vulnerability scanning across all partner platforms. 73% reduction in security incidents
                  with certified technology partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mb-3 md:mb-4">
              Proven Success with Fortune 500 Enterprises
            </h2>
            <p className="text-base sm:text-lg text-[#525252] px-4 sm:px-0">
              Real-world results from our certified technology partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF3621]/10 rounded-lg flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-[#FF3621]" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">Databricks</Badge>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#0B0F19] mb-2">Petrobras Energy</h3>
                <p className="text-sm text-[#525252] mb-4">
                  Model deployment time reduced from days to hours with automated metric-driven workflows
                  and Databricks Elite Partner MLOps expertise.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="font-bold text-[#0A58D0]">Days → Hours</div>
                    <div className="text-xs text-gray-500">Deployment Time</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0A58D0]">100% Automated</div>
                    <div className="text-xs text-gray-500">ML Workflows</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF3621]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#FF3621]" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">Databricks</Badge>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#0B0F19] mb-2">Adidas Global</h3>
                <p className="text-sm text-[#525252] mb-4">
                  60% latency reduction and 91.67% cost savings with Databricks Lakehouse architecture
                  and Unity Catalog governance.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="font-bold text-green-600">60% Faster</div>
                    <div className="text-xs text-gray-500">Latency</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-600">91.67% Lower</div>
                    <div className="text-xs text-gray-500">Costs</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#10A37F]/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#10A37F]" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">OpenAI</Badge>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#0B0F19] mb-2">Moderna Therapeutics</h3>
                <p className="text-sm text-[#525252] mb-4">
                  ChatGPT Enterprise deployed to thousands of employees with custom GPTs like "Dose ID"
                  for clinical data analysis and research acceleration.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="font-bold text-[#0A58D0]">Thousands</div>
                    <div className="text-xs text-gray-500">Active Users</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0A58D0]">Custom GPTs</div>
                    <div className="text-xs text-gray-500">Clinical Tools</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#4285F4]/10 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-[#4285F4]" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">Google Cloud</Badge>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#0B0F19] mb-2">PwC Global</h3>
                <p className="text-sm text-[#525252] mb-4">
                  250+ AI agents developed globally using Vertex AI and Agent2Agent protocol
                  with Google Cloud Premier Partner ML Services Specialization.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="font-bold text-[#0A58D0]">250+</div>
                    <div className="text-xs text-gray-500">AI Agents</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0A58D0]">Global Scale</div>
                    <div className="text-xs text-gray-500">Deployment</div>
                  </div>
                </div>
              </div>
            </Card>
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

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://innovoco.com/#organization",
                "name": "Innovoco",
                "url": "https://innovoco.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://innovoco.com/images/logos/Innovoco-Logo-hires.png",
                  "width": 628,
                  "height": 179
                },
                "description": "Enterprise AI & Data Transformation Leader specializing in Fortune 500 AI implementations",
                "address": [
                  {
                    "@type": "PostalAddress",
                    "streetAddress": "333 SE 2nd Avenue, Suite 2000",
                    "addressLocality": "Miami",
                    "addressRegion": "FL",
                    "postalCode": "33131",
                    "addressCountry": "US"
                  },
                  {
                    "@type": "PostalAddress",
                    "streetAddress": "The Exchange Tower, 130 King St W",
                    "addressLocality": "Toronto",
                    "addressRegion": "ON",
                    "postalCode": "M5X 2A2",
                    "addressCountry": "CA"
                  }
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-305-415-8760",
                  "contactType": "Sales",
                  "email": "info@innovoco.com",
                  "availableLanguage": ["en"]
                },
                "sameAs": [
                  "https://linkedin.com/company/innovoco",
                  "https://twitter.com/innovoco",
                  "https://youtube.com/@innovoco",
                  "https://github.com/innovoco"
                ],
                "award": [
                  "Microsoft Solutions Partner for Data & AI (Azure)",
                  "Google Cloud Premier Partner",
                  "AWS Machine Learning Competency",
                  "Databricks Elite Partner",
                  "OpenAI Services Partner (1 of 7 globally)",
                  "Snowflake Elite Services Partner",
                  "ISO/IEC 42001:2023 AI Management Systems"
                ]
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#microsoft",
                "serviceType": "Microsoft Solutions Partner for Data & AI",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "Microsoft Solutions Partner for Data & AI with Azure AI Foundry ISO/IEC 42001:2023 certification",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Microsoft Azure AI Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Azure AI Foundry",
                        "description": "Enterprise AI platform implementation and management"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Microsoft 365 Copilot",
                        "description": "AI-powered productivity solutions for enterprises"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#google-cloud",
                "serviceType": "Google Cloud Premier Partner with ML Services Specialization",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "Google Cloud Premier Partner with ML Services Specialization and AI Agent Ecosystem Program membership",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Google Cloud AI/ML Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Vertex AI",
                        "description": "End-to-end ML platform for training and deploying models"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Generative AI",
                        "description": "Enterprise generative AI solutions on Google Cloud"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#databricks",
                "serviceType": "Databricks Elite Partner - Delivery Provider Program",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "Elite-tier Databricks partnership with Delivery Provider Program recognition and Accelerate funding",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Databricks Data & AI Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Lakehouse Architecture",
                        "description": "Unified data platform combining data lakes and warehouses"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "MLflow & Delta Lake",
                        "description": "Enterprise ML lifecycle and data management"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#aws",
                "serviceType": "AWS Advanced Partner with ML & Generative AI Competency",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "AWS Machine Learning and Generative AI Competency validated with Well-Architected framework expertise",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "AWS AI/ML Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Amazon SageMaker AI",
                        "description": "Build, train, and deploy ML models at scale"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Amazon Bedrock",
                        "description": "Fully managed generative AI service"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#openai",
                "serviceType": "OpenAI Services Partner (1 of 7 globally)",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "Exclusive OpenAI Services Partner (1 of 7 globally) with ChatGPT Enterprise deployment expertise",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "OpenAI Enterprise Solutions",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "ChatGPT Enterprise",
                        "description": "Enterprise-grade AI assistant with custom GPTs"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "GPT-4",
                        "description": "Advanced language model integration and deployment"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://innovoco.com/partners#snowflake",
                "serviceType": "Snowflake Elite Services Partner",
                "provider": {
                  "@id": "https://innovoco.com/#organization"
                },
                "areaServed": ["US", "CA", "Global"],
                "description": "Snowflake Elite Services Partner with highest-tier funding, AI Data Cloud and Snowpark ML specialization",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Snowflake Data Cloud Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Data Cloud",
                        "description": "Cloud data platform with AI/ML capabilities"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Snowpark ML",
                        "description": "ML development and deployment on Snowflake"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://innovoco.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Partners",
                    "item": "https://innovoco.com/partners"
                  }
                ]
              }
            ]
          })
        }}
      />
    </main>
  );
}