"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceCards } from "@/components/landing/ServiceCards";
import { Footer } from '@/components/layout/footer';
import ContactModal from "@/components/landing/ContactModal";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import {
  ArrowRight,
  CheckCircle,
  Database,
  Brain,
  Shield,
  TrendingUp,
  Users,
  Building2,
  Factory,
  ShoppingCart,
  HeartPulse,
  Award,
  Zap,
  Target,
  Code2,
} from "lucide-react";

/**
 * Optimized Landing Page - Hub-and-Spoke Model
 *
 * Target: ~1,350 words (reduced from 7,116 words)
 * Strategy: High-level overview with clear paths to specialized content
 *
 * Structure:
 * 1. Hero Section (~200 words)
 * 2. Service Cards (~300 words via ServiceCards component)
 * 3. Why Innovoco (~250 words)
 * 4. Industry Highlights (~250 words)
 * 5. Social Proof (~150 words)
 * 6. Final CTA (~200 words)
 */

export default function OptimizedLandingPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org Markup for SEO */}
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={websiteSchema} />

      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* ========================================
          HERO SECTION (~200 words)
          Value proposition + trust indicators + primary CTA
      ========================================= */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#F8FAFC] py-20 md:py-32"
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 text-sm font-semibold tracking-wide uppercase text-blue-600 bg-blue-50/80 rounded-full border border-blue-200"
            >
              <Award className="h-4 w-4" />
              Trusted by 500+ Enterprise Clients
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0F19] mb-6 leading-tight"
            >
              Transform Your Data Warehouse Into an{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A58D0] to-[#7C3AED]">
                Intelligent Business Partner
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#525252] max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Enterprise AI strategy, data engineering, and AI implementation services that turn complex data into competitive advantage.
              From POC to production in 12-16 weeks, backed by 10+ years of proven expertise.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur border border-border/30 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-[#0A58D0] mb-1">10+</div>
                <div className="text-sm text-[#525252]">Years Expertise</div>
              </div>
              <div className="bg-white/80 backdrop-blur border border-border/30 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-[#0A58D0] mb-1">1000+</div>
                <div className="text-sm text-[#525252]">Solutions Delivered</div>
              </div>
              <div className="bg-white/80 backdrop-blur border border-border/30 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-[#0A58D0] mb-1">500+</div>
                <div className="text-sm text-[#525252]">Enterprise Clients</div>
              </div>
              <div className="bg-white/80 backdrop-blur border border-border/30 rounded-2xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-[#0A58D0] mb-1">99%</div>
                <div className="text-sm text-[#525252]">Client Satisfaction</div>
              </div>
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="
                  bg-[#2563EB]
                  hover:bg-[#1D4ED8]
                  text-white
                  px-8
                  py-6
                  text-base
                  font-medium
                  rounded-lg
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  duration-200
                "
              >
                Book My Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link href="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    border-2
                    border-[#0A58D0]
                    text-[#0A58D0]
                    hover:bg-[#0A58D0]/10
                    px-8
                    py-6
                    text-base
                    font-medium
                    rounded-lg
                  "
                >
                  View Case Studies
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SERVICE CARDS SECTION (~300 words)
          Using the pre-built ServiceCards component
      ========================================= */}
      <ServiceCards />

      {/* ========================================
          WHY INNOVOCO SECTION (~250 words)
          Key differentiators and value propositions
      ========================================= */}
      <section id="why-innovoco" className="py-20 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Why Choose Innovoco
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              We combine deep technical expertise with proven business outcomes to deliver AI solutions that actually work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Differentiator 1: Proven Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-border/30 hover:border-border/50 hover:shadow-lg transition-all duration-300 rounded-[22px]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#0B0F19]">
                    10+ Years Expertise
                  </CardTitle>
                  <CardDescription className="text-sm text-[#525252] leading-relaxed">
                    Over a decade building enterprise data platforms and AI solutions. We've seen it all—from legacy mainframes
                    to cutting-edge LLM integrations. Our experience means fewer surprises and faster time to value.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Differentiator 2: End-to-End Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-border/30 hover:border-border/50 hover:shadow-lg transition-all duration-300 rounded-[22px]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#0F766E]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#0B0F19]">
                    End-to-End Partnership
                  </CardTitle>
                  <CardDescription className="text-sm text-[#525252] leading-relaxed">
                    From strategy to implementation to managed services, we're with you every step of the way. No hand-offs
                    to third parties. One team, one vision, seamless execution from POC to production and beyond.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Differentiator 3: Enterprise-Grade Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-border/30 hover:border-border/50 hover:shadow-lg transition-all duration-300 rounded-[22px]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-[#7C3AED]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#0B0F19]">
                    Enterprise-Grade Security
                  </CardTitle>
                  <CardDescription className="text-sm text-[#525252] leading-relaxed">
                    HIPAA, SOC 2, GDPR compliant architectures. Microsoft Gold Partner and Google Cloud Premier Partner.
                    Your data security and compliance aren't afterthoughts—they're foundational to everything we build.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Differentiator 4: Measurable ROI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-border/30 hover:border-border/50 hover:shadow-lg transition-all duration-300 rounded-[22px]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[#DC2626]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[#0B0F19]">
                    Measurable ROI
                  </CardTitle>
                  <CardDescription className="text-sm text-[#525252] leading-relaxed">
                    Every project includes clear success metrics and ROI modeling. Our clients see an average 40% cost reduction
                    in data operations and 3x faster time-to-insight with AI-powered analytics. Results, not just deliverables.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          INDUSTRY HIGHLIGHTS SECTION (~250 words)
          Brief overview with link to Industry Solutions Hub
      ========================================= */}
      <section id="industries" className="py-20 md:py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Industry-Specific AI Solutions
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              Deep domain expertise across regulated industries with proven use cases and measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Financial Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/solutions/industries#financial">
                <Card className="h-full group border-border/30 hover:border-[#0A58D0]/50 hover:shadow-lg transition-all duration-300 rounded-[22px] cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Building2 className="h-6 w-6 text-[#0A58D0]" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#0B0F19] group-hover:text-[#0A58D0] transition-colors">
                      Financial Services
                    </CardTitle>
                    <CardDescription className="text-sm text-[#525252]">
                      Fraud detection, credit risk modeling, algorithmic trading, and AML compliance powered by AI.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-[#0A58D0] text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Healthcare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/solutions/industries#healthcare">
                <Card className="h-full group border-border/30 hover:border-[#0A58D0]/50 hover:shadow-lg transition-all duration-300 rounded-[22px] cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <HeartPulse className="h-6 w-6 text-[#0F766E]" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#0B0F19] group-hover:text-[#0A58D0] transition-colors">
                      Healthcare & Life Sciences
                    </CardTitle>
                    <CardDescription className="text-sm text-[#525252]">
                      Clinical decision support, predictive analytics, and HIPAA-compliant data platforms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-[#0A58D0] text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Manufacturing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/solutions/industries#manufacturing">
                <Card className="h-full group border-border/30 hover:border-[#0A58D0]/50 hover:shadow-lg transition-all duration-300 rounded-[22px] cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Factory className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#0B0F19] group-hover:text-[#0A58D0] transition-colors">
                      Manufacturing
                    </CardTitle>
                    <CardDescription className="text-sm text-[#525252]">
                      Predictive maintenance, quality control, supply chain optimization, and OT/IT data integration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-[#0A58D0] text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Retail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/solutions/industries#retail">
                <Card className="h-full group border-border/30 hover:border-[#0A58D0]/50 hover:shadow-lg transition-all duration-300 rounded-[22px] cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <ShoppingCart className="h-6 w-6 text-[#DC2626]" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#0B0F19] group-hover:text-[#0A58D0] transition-colors">
                      Retail & E-Commerce
                    </CardTitle>
                    <CardDescription className="text-sm text-[#525252]">
                      Customer 360, demand forecasting, dynamic pricing, and personalization engines.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-[#0A58D0] text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          {/* CTA to Industry Solutions Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/solutions/industries">
              <Button
                size="lg"
                variant="outline"
                className="
                  border-2
                  border-[#0A58D0]
                  text-[#0A58D0]
                  hover:bg-[#0A58D0]
                  hover:text-white
                  transition-all
                  duration-300
                  rounded-lg
                  px-8
                  py-6
                  text-base
                  font-medium
                "
              >
                Explore All Industry Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF SECTION (~150 words)
          Client testimonials and success metrics
      ========================================= */}
      <section id="testimonials" className="py-20 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              Real results from real clients across financial services, healthcare, manufacturing, and retail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Financial Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-border/30 rounded-[22px] shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-[#0A58D0] fill-[#0A58D0]" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-[#525252] leading-relaxed mb-4">
                    "Innovoco transformed our fraud detection capabilities. We now identify suspicious transactions
                    in real-time with 95% accuracy, saving us $50M annually in fraud losses."
                  </CardDescription>
                  <div className="border-t border-border/30 pt-4">
                    <p className="font-semibold text-[#0B0F19]">Chief Risk Officer</p>
                    <p className="text-sm text-[#525252]">Major Regional Bank</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Testimonial 2 - Healthcare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-border/30 rounded-[22px] shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-[#0A58D0] fill-[#0A58D0]" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-[#525252] leading-relaxed mb-4">
                    "The predictive analytics platform reduced patient readmissions by 25% in the first year.
                    HIPAA compliance was built-in from day one—no retrofitting required."
                  </CardDescription>
                  <div className="border-t border-border/30 pt-4">
                    <p className="font-semibold text-[#0B0F19]">VP of Clinical Analytics</p>
                    <p className="text-sm text-[#525252]">Large Healthcare System</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Testimonial 3 - Manufacturing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-border/30 rounded-[22px] shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-[#0A58D0] fill-[#0A58D0]" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-[#525252] leading-relaxed mb-4">
                    "Predictive maintenance AI increased our OEE by 15% and reduced unplanned downtime by 40%.
                    The ROI was clear within 6 months."
                  </CardDescription>
                  <div className="border-t border-border/30 pt-4">
                    <p className="font-semibold text-[#0B0F19]">Director of Operations</p>
                    <p className="text-sm text-[#525252]">Fortune 500 Manufacturer</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Client Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-sm font-semibold text-[#525252] uppercase tracking-wider mb-8">
              Trusted by Leading Organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-60">
              {/* Partner logos would go here */}
              <div className="text-[#525252] font-semibold text-lg">Microsoft Gold Partner</div>
              <div className="text-[#525252] font-semibold text-lg">Google Cloud Premier Partner</div>
              <div className="text-[#525252] font-semibold text-lg">Qlik Elite Partner</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION (~200 words)
          Strong closing call-to-action
      ========================================= */}
      <section
        id="final-cta"
        className="relative overflow-hidden py-20 md:py-24 px-4 bg-gradient-to-br from-[#0A58D0] to-[#7C3AED]"
      >
        <div className="relative z-10 container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Data Into a Competitive Advantage?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Let's discuss your AI strategy, data modernization needs, or implementation roadmap.
              Book a free 30-minute strategy call with our AI experts—no sales pitch, just actionable insights.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Free 30-min consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Talk to actual experts, not sales</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="
                  bg-white
                  hover:bg-gray-100
                  text-[#0A58D0]
                  px-8
                  py-6
                  text-base
                  font-medium
                  rounded-lg
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  duration-200
                "
              >
                Schedule My Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link href="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    border-2
                    border-white
                    text-white
                    hover:bg-white/10
                    px-8
                    py-6
                    text-base
                    font-medium
                    rounded-lg
                  "
                >
                  View Success Stories
                </Button>
              </Link>
            </div>

            {/* Additional resources */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <Link href="/projects/ai-discovery-workshop" className="hover:text-white transition-colors flex items-center gap-1">
                <Target className="h-4 w-4" />
                AI Discovery Workshop
              </Link>
              <Link href="/case-studies" className="hover:text-white transition-colors flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Case Studies
              </Link>
              <Link href="/partners" className="hover:text-white transition-colors flex items-center gap-1">
                <Users className="h-4 w-4" />
                Technology Partners
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Skip to content styles */}
      <style jsx global>{`
        .skip-to-content {
          position: absolute;
          left: -9999px;
          z-index: 999;
          padding: 1rem;
          background-color: #2563EB;
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
        }
        .skip-to-content:focus {
          left: 50%;
          transform: translateX(-50%);
          top: 1rem;
        }
      `}</style>
    </div>
  );
}
