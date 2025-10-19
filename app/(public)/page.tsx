"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MotionWrapper, MotionText, MotionCard, MotionList, MotionListItem } from "@/components/ui/motion-wrapper";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import ContactModal from "@/components/landing/ContactModal";
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import {
  ArrowRight,
  Sparkles,
  Database,
  Brain,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Building2,
  Factory,
  ShoppingCart,
  HeartPulse,
  DollarSign,
  Cloud,
  Code2,
  Layers,
  CheckCircle,
  PlayCircle,
  Download,
  BookOpen,
  MessageSquare,
  Award,
  Globe,
  Cpu,
  BarChart3,
  Bot,
  GitBranch,
  Rocket,
  Clock,
  Target,
  ChevronRight,
  Lightbulb,
  Phone,
  HardHat,
  Camera,
  FileText,
  Wrench,
} from "lucide-react";

export default function LandingPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Clear any hash from URL on initial load to prevent jumping
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      const sections = ['hero', 'ai', 'analytics', 'data', 'industries', 'about', 'demo'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Header
        onContactClick={() => setContactModalOpen(true)}
        isLandingPage={true}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main id="main-content" role="main">
      
      {/* Hero Section */}
      <motion.section 
        id="hero"
        className="relative overflow-hidden py-16 md:py-20 px-4 md:px-6"
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#FECACA]" />
        <div className="absolute inset-0 bg-white/70" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0.9, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* SEO-optimized H1 for search engines */}
            <h1 className="sr-only">Enterprise AI and Data Transformation Services | Proven Implementation at Scale</h1>

            <motion.div
              className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 font-semibold tracking-wide uppercase text-blue-600 bg-blue-50/80 rounded-full border border-blue-200"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <Award className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Enterprise AI & Data Transformation Leader</span>
            </motion.div>
            
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-[#0B0F19] leading-tight"
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              role="heading"
              aria-level={2}
            >
              Transform Your Data Warehouse Into an{' '}
              <motion.span
                className="bg-gradient-to-r from-[#93C5FD] via-[#A78BFA] to-[#F87171] bg-clip-text text-transparent"
                initial={{ opacity: 0.95, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                AI-Powered Business Advantage
              </motion.span>
            </motion.div>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#525252] mb-6 md:mb-8 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              End-to-end AI transformation: Strategy, implementation, and scale. We take you from POC to production in 12-16 weeks—while 85% of AI projects fail, our proven data foundation ensures your success.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4"
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Button
                onClick={() => setContactModalOpen(true)}
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 h-14 text-lg font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Book my strategy call"
              >
                Book My Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Link href="/case-studies" aria-label="View case studies" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-2 border-[#0A58D0] text-[#0A58D0] hover:bg-[#0A58D0]/10 hover:text-[#0A58D0] px-10 h-14 text-lg font-medium rounded-full">
                  View Case Studies
                </Button>
              </Link>
            </motion.div>
            
            {/* Trust Indicators - Optimized for mobile */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 md:pt-8"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0.9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-1">1000+</div>
                <div className="text-xs md:text-sm text-[#525252]">Solutions Delivered</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0.9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-1">10+</div>
                <div className="text-xs md:text-sm text-[#525252]">Years Scaling AI</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0.9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-1">500+</div>
                <div className="text-xs md:text-sm text-[#525252]">Enterprises Transformed</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0.9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.35 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-1">2 Weeks</div>
                <div className="text-xs md:text-sm text-[#525252]">Proof of Concept</div>
              </motion.div>
            </motion.div>
            </motion.div>

            {/* Partnership Section */}
            <motion.div
              className="mt-16 pt-16 border-t border-border/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-3 text-[#0B0F19]">
                  Leading Industry Partnerships
                </h2>
                <p className="text-base text-[#525252]">
                  Trusted by global enterprises to deliver cutting-edge data and AI solutions
                </p>
              </motion.div>
              
              {/* Logo Carousel */}
              <motion.div
                className="relative overflow-hidden py-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.div
                  className="flex w-max partner-carousel"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  onAnimationComplete={(definition) => {
                    // Start scroll animation after fade in
                    const element = document.querySelector('.partner-carousel');
                    if (element) {
                      element.classList.add('animate-scroll');
                    }
                  }}
                >
                  {/* First set of logos */}
                  <div className="flex items-center gap-12 px-8">
                    <Link 
                      href="https://www.microsoft.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/microsoft-gold-partner.png"
                        alt="Microsoft Gold Partner"
                        width={200}
                        height={55}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://cloud.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/google-cloud-premier-partner-1.webp"
                        alt="Google Cloud Platform"
                        width={320}
                        height={104}
                        className="object-contain"
                        style={{ width: 'auto', height: '96px' }}
                        loading="lazy"
                        quality={75}
                      />
                    </Link>
                    <Link 
                      href="https://www.qlik.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/qlik.png"
                        alt="Qlik"
                        width={200}
                        height={59}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://www.databricks.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/databricks.png"
                        alt="Databricks"
                        width={250}
                        height={56}
                        className="object-contain h-14"
                        loading="lazy"
                        quality={75}
                      />
                    </Link>
                    <Link 
                      href="https://www.snowflake.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/snowflake.svg"
                        alt="Snowflake"
                        width={240}
                        height={59}
                        className="object-contain"
                        style={{ width: 'auto', height: '44px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 120px, 240px"
                      />
                    </Link>
                    <Link 
                      href="https://www.informatica.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/informatica.png"
                        alt="Informatica"
                        width={250}
                        height={61}
                        className="object-contain"
                        style={{ width: 'auto', height: '48px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 125px, 250px"
                      />
                    </Link>
                    <Link 
                      href="https://www.langchain.com/langgraph" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/langgraph.png"
                        alt="LangGraph"
                        width={200}
                        height={55}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://n8n.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/n8n-logo.png"
                        alt="n8n"
                        width={120}
                        height={120}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-12 px-8">
                    <Link 
                      href="https://www.microsoft.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/microsoft-gold-partner.png"
                        alt="Microsoft Gold Partner"
                        width={200}
                        height={55}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://cloud.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/google-cloud-premier-partner-1.webp"
                        alt="Google Cloud Platform"
                        width={320}
                        height={104}
                        className="object-contain"
                        style={{ width: 'auto', height: '96px' }}
                        loading="lazy"
                        quality={75}
                      />
                    </Link>
                    <Link 
                      href="https://www.qlik.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/qlik.png"
                        alt="Qlik"
                        width={200}
                        height={59}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://www.databricks.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/databricks.png"
                        alt="Databricks"
                        width={250}
                        height={56}
                        className="object-contain h-14"
                        loading="lazy"
                        quality={75}
                      />
                    </Link>
                    <Link 
                      href="https://www.snowflake.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/snowflake.svg"
                        alt="Snowflake"
                        width={240}
                        height={59}
                        className="object-contain"
                        style={{ width: 'auto', height: '44px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 120px, 240px"
                      />
                    </Link>
                    <Link 
                      href="https://www.informatica.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/informatica.png"
                        alt="Informatica"
                        width={250}
                        height={61}
                        className="object-contain"
                        style={{ width: 'auto', height: '48px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 125px, 250px"
                      />
                    </Link>
                    <Link 
                      href="https://www.langchain.com/langgraph" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/langgraph.png"
                        alt="LangGraph"
                        width={200}
                        height={55}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                    <Link 
                      href="https://n8n.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-all hover:scale-105"
                    >
                      <Image 
                        src="/images/logos/n8n-logo.png"
                        alt="n8n"
                        width={120}
                        height={120}
                        className="object-contain"
                        style={{ width: 'auto', height: '32px' }}
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 100px, 200px"
                      />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
      </motion.section>

      {/* How We Transform Your Business - Services with Alternating Images */}
      <section id="services" className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              How We Transform Your Business
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              From strategic planning to 24/7 operations, we provide end-to-end AI, analytics, and data services that turn your data warehouse into an intelligent business partner.
            </p>
          </motion.div>

          {/* 4 Services with Alternating Images */}
          <div className="flex flex-col gap-8 mt-12">

            {/* Service 1: AI Strategy & Implementation - Image Left */}
            <motion.div
              id="ai"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >
              <div className="p-4 bg-gradient-to-br from-[#FEF3C7] to-[#FCD34D]/20 rounded-2xl">
                <Image
                  src="/ai-transformation-network.png"
                  alt="AI Strategy Implementation - Agentic AI Development LLM Integration"
                  width={800}
                  height={800}
                  quality={90}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19] mb-4">
                  AI Strategy & Implementation
                </h3>
                <p className="text-base md:text-lg text-[#525252] mb-6 leading-relaxed">
                  Vision to production in 12-16 weeks. We deliver agentic AI systems that execute multi-step tasks autonomously—not simple chatbots, but intelligent agents that drive 171% ROI and transform operations.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Agentic AI Development</p>
                      <p className="text-sm text-[#525252]">Autonomous agents that complete complex workflows with minimal oversight—compressing 4-week tasks into 6 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Workflow Automation & Orchestration</p>
                      <p className="text-sm text-[#525252]">Multi-agent systems that automate end-to-end business processes—from data entry to approvals, running 24/7 without human intervention</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Enterprise LLM Integration with RAG</p>
                      <p className="text-sm text-[#525252]">ChatGPT, Claude, Gemini grounded in your data—no hallucinations, just accurate enterprise intelligence</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge variant="secondary" className="bg-amber-50 text-[#D97706] border-amber-200 text-xs">
                    171% ROI
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-50 text-[#D97706] border-amber-200 text-xs">
                    12-16 Week Delivery
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-50 text-[#D97706] border-amber-200 text-xs">
                    Agentic AI
                  </Badge>
                </div>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="w-full bg-[#D97706] hover:bg-[#B45309] text-white transition-all duration-300 group/btn text-base rounded-full h-14"
                >
                  <span className="font-semibold">Discuss My Roadmap</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* Service 2: Advanced Analytics & BI - Image Right */}
            <motion.div
              id="analytics"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >
              <div className="p-4 bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]/20 rounded-2xl md:order-2">
                <Image
                  src="/analytics-bi-illustration.png"
                  alt="Advanced Analytics Business Intelligence Predictive Analytics Machine Learning Executive Dashboards KPI Tracking"
                  width={800}
                  height={800}
                  quality={90}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8 md:order-1">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19] mb-4">
                  Advanced Analytics & BI
                </h3>
                <p className="text-base md:text-lg text-[#525252] mb-6 leading-relaxed">
                  Transform data into strategic intelligence. AI-powered predictive analytics, executive dashboards, and machine learning models that improve decision-making by 64% and accelerate insights by 28%.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Predictive Analytics & ML Models</p>
                      <p className="text-sm text-[#525252]">Forecast demand, detect anomalies, predict churn—machine learning that spots risks and opportunities before they happen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Executive Dashboards & KPI Tracking</p>
                      <p className="text-sm text-[#525252]">Real-time strategic visualization with voice-enabled exploration—see revenue, margins, and efficiency in one intelligent view</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Managed Analytics Services</p>
                      <p className="text-sm text-[#525252]">End-to-end BI solutions with continuous optimization and enterprise-grade governance—empowering data-driven decision making</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge variant="secondary" className="bg-purple-50 text-[#7C3AED] border-purple-200 text-xs">
                    64% Faster Decisions
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-50 text-[#7C3AED] border-purple-200 text-xs">
                    28% Better Insights
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-50 text-[#7C3AED] border-purple-200 text-xs">
                    AI-Powered ML
                  </Badge>
                </div>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-all duration-300 group/btn text-base rounded-full h-14"
                >
                  <span className="font-semibold">Unlock My Insights</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* Service 3: Data Engineering & Modernization - Image Left */}
            <motion.div
              id="data"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >
              <div className="p-4 bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]/20 rounded-2xl">
                <Image
                  src="/data-warehouse-illustration.png"
                  alt="Data Engineering Modernization - Real-Time Streaming Cloud Migration"
                  width={800}
                  height={800}
                  quality={90}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19] mb-4">
                  Data Engineering & Modernization
                </h3>
                <p className="text-base md:text-lg text-[#525252] mb-6 leading-relaxed">
                  10+ years building AI-ready data platforms. Real-time streaming analytics, zero-ETL architectures, and cloud-native migrations that deliver 3x faster insights at 40% lower costs.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Real-Time Data Pipelines</p>
                      <p className="text-sm text-[#525252]">Apache Kafka, Flink, Spark Streaming—process data at the source with edge computing for instant insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Cloud-Native Migration</p>
                      <p className="text-sm text-[#525252]">Snowflake, Databricks, AWS, Azure, GCP—zero-downtime replatforming with automated optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">AI-Ready Lakehouse Architecture</p>
                      <p className="text-sm text-[#525252]">Unified data lakes + warehouses built for machine learning from day one—AI-ready infrastructure with decentralized ownership and centralized governance</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge variant="secondary" className="bg-blue-50 text-[#0A58D0] border-blue-200 text-xs">
                    40% Cost Reduction
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-[#0A58D0] border-blue-200 text-xs">
                    3x Faster Insights
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-[#0A58D0] border-blue-200 text-xs">
                    Real-Time Analytics
                  </Badge>
                </div>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="w-full bg-[#0A58D0] hover:bg-[#084BB3] text-white transition-all duration-300 group/btn text-base rounded-full h-14"
                >
                  <span className="font-semibold">Modernize My Data</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* Service 4: Managed AI Operations - Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >
              <div className="p-4 bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]/20 rounded-2xl md:order-2">
                <Image
                  src="/cloud-optimization-illustration.png"
                  alt="Managed AI Services - MLOps Monitoring Optimization"
                  width={800}
                  height={800}
                  quality={90}
                  className="w-full h-auto rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8 md:order-1">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B0F19] mb-4">
                  Managed AI Operations
                </h3>
                <p className="text-base md:text-lg text-[#525252] mb-6 leading-relaxed">
                  24/7 monitoring, continuous optimization, and SLA-backed support. Your AI stays sharp with automated retraining, predictive cost analysis, and 99.9% uptime guarantees.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Enterprise MLOps</p>
                      <p className="text-sm text-[#525252]">Automated deployment, monitoring, and retraining—CI/CD for AI that detects drift and self-heals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Cloud FinOps Optimization</p>
                      <p className="text-sm text-[#525252]">Predictive cost analysis and automated recommendations—reduce cloud spend by 40% with zero manual effort</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-[#0B0F19] font-semibold">Governance & Compliance</p>
                      <p className="text-sm text-[#525252]">GDPR, HIPAA, CCPA-ready frameworks with encryption, IAM, and audit trails built in</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <Badge variant="secondary" className="bg-emerald-50 text-[#0F766E] border-emerald-200 text-xs">
                    99.9% Uptime
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-50 text-[#0F766E] border-emerald-200 text-xs">
                    24/7 Monitoring
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-50 text-[#0F766E] border-emerald-200 text-xs">
                    Auto-Optimization
                  </Badge>
                </div>

                <Button
                  onClick={() => setContactModalOpen(true)}
                  size="lg"
                  className="w-full bg-[#0F766E] hover:bg-[#0D5B53] text-white transition-all duration-300 group/btn text-base rounded-full h-14"
                >
                  <span className="font-semibold">Streamline My Operations</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Industry-Specific AI Solutions - Consolidated */}
      <AnimatedSection id="industries" className="py-20 md:py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="text-sm font-bold tracking-wider uppercase text-teal-600 mb-3">
              Proven Results Across Industries
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
              Industry-Specific AI Solutions
            </h2>
            <p className="text-xl text-[#525252] max-w-4xl mx-auto leading-relaxed">
              Deep domain expertise across regulated industries with proven AI use cases and measurable ROI.
              From fraud detection to predictive maintenance, we deliver solutions that transform operations.
            </p>
          </motion.div>

          {/* Industries Accordion - Space-Saving Design */}
          <Accordion type="single" collapsible defaultValue="financial" className="space-y-4">
            {/* Financial Services */}
            <AccordionItem value="financial" className="border border-[#93C5FD]/30 rounded-[20px] overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-br hover:from-[#DBEAFE]/20 hover:to-[#93C5FD]/5 transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center shadow-md flex-shrink-0">
                    <Building2 className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B0F19]">Financial Services</h3>
                    <p className="text-sm md:text-base text-[#525252] mt-1">Real-time fraud detection, credit risk ML models, and regulatory compliance automation</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Card className="group bg-white border-border/30 hover:border-[#0A58D0]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Shield className="h-6 w-6 text-[#0A58D0]" />
                    </div>
                    <CardTitle className="text-xl">AI-Powered Fraud Detection</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Real-time transaction monitoring that processes millions of transactions daily with 99.8% accuracy and 75% reduction in false positives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">99.8%</div>
                        <div className="text-sm text-[#525252]">accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">&lt;50ms</div>
                        <div className="text-sm text-[#525252]">response</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">$50M+</div>
                        <div className="text-sm text-[#525252]">saved/yr</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-white border-border/30 hover:border-[#0A58D0]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <CheckCircle className="h-6 w-6 text-[#0A58D0]" />
                    </div>
                    <CardTitle className="text-xl">Credit Risk ML Models</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Advanced machine learning incorporating alternative data for smarter lending decisions and 18% approval rate improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">18%</div>
                        <div className="text-sm text-[#525252]">approval ↑</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">Alt Data</div>
                        <div className="text-sm text-[#525252]">sources</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#DBEAFE]/30">
                        <div className="text-2xl font-bold text-[#0A58D0]">SOX</div>
                        <div className="text-sm text-[#525252]">compliant</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Healthcare */}
            <AccordionItem value="healthcare" className="border border-[#6EE7B7]/30 rounded-[20px] overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-br hover:from-[#D1FAE5]/20 hover:to-[#6EE7B7]/5 transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center shadow-md flex-shrink-0">
                    <HeartPulse className="h-6 w-6 text-[#0F766E]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B0F19]">Healthcare Data Analytics</h3>
                    <p className="text-sm md:text-base text-[#525252] mt-1">Clinical decision support systems, readmission risk prediction, and HIPAA-compliant analytics</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Card className="group bg-white border-border/30 hover:border-[#0F766E]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Brain className="h-6 w-6 text-[#0F766E]" />
                    </div>
                    <CardTitle className="text-xl">Clinical Decision Support Systems</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      AI-powered diagnosis assistance with 35% diagnostic error reduction and seamless EMR integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">35%</div>
                        <div className="text-sm text-[#525252]">error ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">HIPAA</div>
                        <div className="text-sm text-[#525252]">compliant</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">Epic</div>
                        <div className="text-sm text-[#525252]">integration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-white border-border/30 hover:border-[#0F766E]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Users className="h-6 w-6 text-[#0F766E]" />
                    </div>
                    <CardTitle className="text-xl">Readmission Risk Prediction</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Predictive patient analytics with 87% accuracy reducing readmissions by 28% and lowering costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">87%</div>
                        <div className="text-sm text-[#525252]">accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">28%</div>
                        <div className="text-sm text-[#525252]">readm. ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#D1FAE5]/30">
                        <div className="text-2xl font-bold text-[#0F766E]">$8M+</div>
                        <div className="text-sm text-[#525252]">saved/yr</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Manufacturing */}
            <AccordionItem value="manufacturing" className="border border-[#C4B5FD]/30 rounded-[20px] overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-br hover:from-[#EDE9FE]/20 hover:to-[#C4B5FD]/5 transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center shadow-md flex-shrink-0">
                    <Factory className="h-6 w-6 text-[#7C3AED]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B0F19]">Manufacturing AI Solutions</h3>
                    <p className="text-sm md:text-base text-[#525252] mt-1">AI predictive maintenance, computer vision quality control, and IoT sensor analytics</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Card className="group bg-white border-border/30 hover:border-[#7C3AED]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Zap className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <CardTitle className="text-xl">AI Predictive Maintenance</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      IoT sensor analytics predicting equipment failures with 60% downtime reduction and 30% cost savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">60%</div>
                        <div className="text-sm text-[#525252]">downtime ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">30%</div>
                        <div className="text-sm text-[#525252]">cost ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">22%</div>
                        <div className="text-sm text-[#525252]">OEE ↑</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-white border-border/30 hover:border-[#7C3AED]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Target className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <CardTitle className="text-xl">Computer Vision Quality Control</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Real-time defect detection with 99.7% accuracy—50% faster than manual inspection at production speed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">99.7%</div>
                        <div className="text-sm text-[#525252]">accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">50%</div>
                        <div className="text-sm text-[#525252]">faster</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#EDE9FE]/30">
                        <div className="text-2xl font-bold text-[#7C3AED]">$12M+</div>
                        <div className="text-sm text-[#525252]">saved/yr</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Retail */}
            <AccordionItem value="retail" className="border border-[#FCA5A5]/30 rounded-[20px] overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-br hover:from-[#FECACA]/20 hover:to-[#FCA5A5]/5 transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center shadow-md flex-shrink-0">
                    <ShoppingCart className="h-6 w-6 text-[#DC2626]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B0F19]">Retail Analytics Platform</h3>
                    <p className="text-sm md:text-base text-[#525252] mt-1">AI-powered personalization, ML demand forecasting, and intelligent inventory optimization</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Card className="group bg-white border-border/30 hover:border-[#DC2626]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <DollarSign className="h-6 w-6 text-[#DC2626]" />
                    </div>
                    <CardTitle className="text-xl">AI-Powered Personalization</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Product recommendation engines delivering 32% conversion improvement and 18% AOV increase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">32%</div>
                        <div className="text-sm text-[#525252]">conversion ↑</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">18%</div>
                        <div className="text-sm text-[#525252]">AOV ↑</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">26%</div>
                        <div className="text-sm text-[#525252]">revenue ↑</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-white border-border/30 hover:border-[#DC2626]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <BarChart3 className="h-6 w-6 text-[#DC2626]" />
                    </div>
                    <CardTitle className="text-xl">ML Demand Forecasting</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      SKU-level forecasting with 93% accuracy reducing inventory by 45% while optimizing stock levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">93%</div>
                        <div className="text-sm text-[#525252]">accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">45%</div>
                        <div className="text-sm text-[#525252]">inventory ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FECACA]/30">
                        <div className="text-2xl font-bold text-[#DC2626]">$18M+</div>
                        <div className="text-sm text-[#525252]">added value</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Construction & Home Services */}
            <AccordionItem value="construction" className="border border-[#FDE68A]/30 rounded-[20px] overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-br hover:from-[#FEF3C7]/20 hover:to-[#FDE68A]/5 transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center shadow-md flex-shrink-0">
                    <HardHat className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B0F19]">Construction & Home Services</h3>
                    <p className="text-sm md:text-base text-[#525252] mt-1">Computer vision inspections, automated quality control, and AI-powered report generation</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                {/* First Row: Two Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-4 mb-6">
                <Card className="group bg-white border-border/30 hover:border-[#D97706]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Camera className="h-6 w-6 text-[#D97706]" />
                    </div>
                    <CardTitle className="text-xl">AI-Powered Property Inspections</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Computer vision roof and property damage detection with automated drone inspections—reducing inspection time by 50% with 99.7% accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">50%</div>
                        <div className="text-sm text-[#525252]">faster</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">99.7%</div>
                        <div className="text-sm text-[#525252]">accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">30%</div>
                        <div className="text-sm text-[#525252]">time ↓</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-white border-border/30 hover:border-[#D97706]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileText className="h-6 w-6 text-[#D97706]" />
                    </div>
                    <CardTitle className="text-xl">Automated Report Generation</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      AI-generated inspection reports with damage labeling and compliance checks—from 3 hours of manual work to 30 minutes automated
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">84%</div>
                        <div className="text-sm text-[#525252]">dev time ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">30min</div>
                        <div className="text-sm text-[#525252]">vs 3hrs</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">Auto</div>
                        <div className="text-sm text-[#525252]">PDF gen</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>

                {/* Second Row: HVAC Card */}
                <div className="grid md:grid-cols-2 gap-6">
                <Card className="group bg-white border-border/30 hover:border-[#D97706]/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-[22px]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Wrench className="h-6 w-6 text-[#D97706]" />
                    </div>
                    <CardTitle className="text-xl">HVAC Predictive Maintenance</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      IoT sensor analytics predict equipment failures before they happen—70% reduction in breakdowns and 40% energy savings with lifecycle management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">70%</div>
                        <div className="text-sm text-[#525252]">failures ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">40%</div>
                        <div className="text-sm text-[#525252]">energy ↓</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-[#FEF3C7]/30">
                        <div className="text-2xl font-bold text-[#D97706]">25%</div>
                        <div className="text-sm text-[#525252]">cost ↓</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Placeholder for visual balance */}
                <div className="hidden md:block"></div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Client Logos - Creating FOMO before CTA */}
          <div className="mt-16 pt-16 border-t border-border/50">
            <div className="text-center mb-8">
              <p className="text-[#525252]">
                Join 500+ enterprises driving real business impact with enterprise-ready Agentic systems
              </p>
            </div>
            <div className="relative overflow-hidden py-4">
              <div className="flex animate-scroll-fast" style={{ width: 'fit-content' }}>
                {/* First set of logos */}
                <div className="flex items-center gap-8 px-8 flex-shrink-0">
                  <Link href="https://www.ars.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/ars_logo.png"
                      alt="ARS Rescue Rooter"
                      width={132}
                      height={44}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.nortekair.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/nortek-air-solutions-logo.png"
                      alt="Nortek Air Solutions"
                      width={126}
                      height={42}
                      className="object-contain scale-105"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.enercare.ca/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/enercare-logo.png"
                      alt="Enercare"
                      width={132}
                      height={44}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://flynncompanies.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/flynn-companies-logo.png"
                      alt="Flynn Companies"
                      width={120}
                      height={40}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '48px' }}
                    />
                  </Link>
                  <Link href="https://www.indigo.ca/en-ca/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/indigo-logo.png"
                      alt="Indigo"
                      width={176}
                      height={66}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.apotex.com/ca/en/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/apotex-logo.png"
                      alt="Apotex"
                      width={120}
                      height={40}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '48px' }}
                    />
                  </Link>
                  <Link href="https://graftonapparel.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 relative w-60 h-20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/logos/grafton-apparel-logo.png"
                      alt="Grafton Apparel"
                      fill={true}
                      sizes="240px"
                      className="object-contain scale-[1.3]"
                    />
                  </Link>
                  <Link href="https://www.spinriteyarns.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-52 h-24 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/spinrite-logo.png"
                      alt="Spinrite Yarns"
                      width={252}
                      height={101}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.stellaradjusting.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-48 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/stellar_logo.png"
                      alt="Stellar Public Adjusting Services"
                      width={180}
                      height={60}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '56px' }}
                    />
                  </Link>
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center gap-8 px-8 flex-shrink-0">
                  <Link href="https://www.ars.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/ars_logo.png"
                      alt="ARS Rescue Rooter"
                      width={132}
                      height={44}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.nortekair.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/nortek-air-solutions-logo.png"
                      alt="Nortek Air Solutions"
                      width={126}
                      height={42}
                      className="object-contain scale-105"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.enercare.ca/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/enercare-logo.png"
                      alt="Enercare"
                      width={132}
                      height={44}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://flynncompanies.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/flynn-companies-logo.png"
                      alt="Flynn Companies"
                      width={120}
                      height={40}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '48px' }}
                    />
                  </Link>
                  <Link href="https://www.indigo.ca/en-ca/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/indigo-logo.png"
                      alt="Indigo"
                      width={176}
                      height={66}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.apotex.com/ca/en/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-40 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/apotex-logo.png"
                      alt="Apotex"
                      width={120}
                      height={40}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '48px' }}
                    />
                  </Link>
                  <Link href="https://graftonapparel.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 relative w-60 h-20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/logos/grafton-apparel-logo.png"
                      alt="Grafton Apparel"
                      fill={true}
                      sizes="240px"
                      className="object-contain scale-[1.3]"
                    />
                  </Link>
                  <Link href="https://www.spinriteyarns.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-52 h-24 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/logos/spinrite-logo.png"
                      alt="Spinrite Yarns"
                      width={252}
                      height={101}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </Link>
                  <Link href="https://www.stellaradjusting.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition-opacity flex-shrink-0 w-48 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/stellar_logo.png"
                      alt="Stellar Public Adjusting Services"
                      width={180}
                      height={60}
                      className="object-contain"
                      style={{ width: 'auto', maxHeight: '56px' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA to Industry Solutions Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/solutions/industries">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#0A58D0] text-[#0A58D0] hover:bg-[#0A58D0] hover:text-white transition-all duration-300 rounded-full px-8 h-14 text-base font-medium"
              >
                Explore All Industry Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Team & About Section */}
      {/* Team & About Section - Enhanced */}
      <AnimatedSection id="about" className="py-20 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-50 to-blue-50/30" delay={0.1}>
        <div className="container mx-auto max-w-6xl">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-bold tracking-wider uppercase text-indigo-600 mb-3">
              Leadership Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0B0F19]">
              Pioneering Data Excellence Since 2011
            </h2>
            <p className="text-lg md:text-xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
              Led by industry veterans with deep expertise in data, analytics, and AI transformation
            </p>
          </motion.div>

          {/* Team Members - 2x2 Compact Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Paul Broughan - CEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="group h-full bg-white border-2 border-border/30 hover:border-[#0A58D0]/50 shadow-sm hover:shadow-[0_8px_30px_rgba(10,88,208,0.15)] transition-all duration-300 rounded-[22px]">
                <CardContent className="p-5 md:p-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 flex-shrink-0 rounded-[16px] bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Users className="h-8 w-8 text-[#0A58D0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-[#0B0F19] mb-1">Paul Broughan</h3>
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#0A58D0]/10 border border-[#0A58D0]/20 mb-3">
                        <span className="text-xs font-semibold text-[#0A58D0]">CEO</span>
                      </div>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        13+ years building data-driven enterprises, champion of customer-first innovation. Led 1000+ successful implementations with unwavering focus on client success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chris Hill - CTO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="group h-full bg-white border-2 border-border/30 hover:border-[#7C3AED]/50 shadow-sm hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] transition-all duration-300 rounded-[22px]">
                <CardContent className="p-5 md:p-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 flex-shrink-0 rounded-[16px] bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Code2 className="h-8 w-8 text-[#7C3AED]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-[#0B0F19] mb-1">Chris Hill</h3>
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-3">
                        <span className="text-xs font-semibold text-[#7C3AED]">CTO</span>
                      </div>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        Architect of 500+ enterprise implementations, expert in cloud-native data platforms. Drives purposeful innovation that solves real business problems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Diostenes De La Hoz - Head of AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="group h-full bg-white border-2 border-border/30 hover:border-[#0F766E]/50 shadow-sm hover:shadow-[0_8px_30px_rgba(15,118,110,0.15)] transition-all duration-300 rounded-[22px]">
                <CardContent className="p-5 md:p-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 flex-shrink-0 rounded-[16px] bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Bot className="h-8 w-8 text-[#0F766E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-[#0B0F19] mb-1">Diostenes De La Hoz</h3>
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 mb-3">
                        <span className="text-xs font-semibold text-[#0F766E]">Head of AI & Automation</span>
                      </div>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        Leading AI transformation strategies, bridging enterprise data with intelligent automation. Builds ethical, trustworthy AI systems grounded in integrity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* James Ball - Head of Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="group h-full bg-white border-2 border-border/30 hover:border-[#D97706]/50 shadow-sm hover:shadow-[0_8px_30px_rgba(217,119,6,0.15)] transition-all duration-300 rounded-[22px]">
                <CardContent className="p-5 md:p-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 flex-shrink-0 rounded-[16px] bg-gradient-to-br from-[#FEF3C7] to-[#FCD34D]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <BarChart3 className="h-8 w-8 text-[#D97706]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-[#0B0F19] mb-1">James Ball</h3>
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-3">
                        <span className="text-xs font-semibold text-[#D97706]">Head of Analytics</span>
                      </div>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        Transforming raw data into actionable insights, specialist in BI and predictive analytics. Empowers decision-makers with intelligence that drives results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Core Values - Clean, Simple Approach */}
          <motion.div
            className="mb-16 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#0B0F19]">Our Values Drive Everything We Do</h3>
            <p className="text-center text-lg text-[#525252] max-w-3xl mx-auto mb-12">
              Built on a foundation of integrity, customer success, and purposeful innovation
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-[#0A58D0] to-[#3B82F6] flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#0B0F19] mb-3">Customer First</h4>
                <p className="text-base text-[#525252] leading-relaxed">
                  Every decision starts with "How does this benefit our client?" This philosophy has guided 1000+ successful implementations.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#0B0F19] mb-3">Innovation with Purpose</h4>
                <p className="text-base text-[#525252] leading-relaxed">
                  We adopt technologies because they solve real problems—not because they're trendy. AI built on proven data foundations.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-[#0F766E] to-[#10B981] flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#0B0F19] mb-3">Integrity & Trust</h4>
                <p className="text-base text-[#525252] leading-relaxed">
                  Bootstrapped growth means every client earned through merit. We deliver on promises, own mistakes, and put ethics first.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats - Compact & Clean */}
          <motion.div
            className="border-t border-border/20 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-2">13+</div>
                <div className="text-sm text-[#525252]">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-2">500+</div>
                <div className="text-sm text-[#525252]">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-2">1000+</div>
                <div className="text-sm text-[#525252]">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-2">95%</div>
                <div className="text-sm text-[#525252]">Client Retention</div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <section id="demo" className="py-20 px-6 bg-gradient-to-br from-[#DBEAFE] via-[#FECACA]/50 to-[#93C5FD]">
        <AnimatedDiv className="container mx-auto text-center" delay={0.2}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-semibold tracking-wide uppercase bg-white/90 backdrop-blur-sm rounded-full border-2 border-[#0A58D0]/30 shadow-lg">
            <Rocket className="h-4 w-4 text-[#0A58D0]" />
            <span className="bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] bg-clip-text text-transparent">Start Your AI Journey Today</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 text-[#0B0F19]">
            Ready to Lead Your Industry's AI Transformation?
          </h2>
          
          <p className="text-xl text-[#525252] mb-12 max-w-3xl mx-auto">
            Let's discuss how we can transform your data infrastructure into a competitive advantage.
          </p>

          {/* Value Propositions - Compact Display */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-3xl mx-auto mb-8 px-4 sm:px-0">
            <div className="flex items-center justify-center sm:justify-start gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 max-w-[280px] sm:max-w-none mx-auto w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 overflow-hidden">
                <Image 
                  src="/fluent-chat-icon.png" 
                  alt="Chat consultation" 
                  width={48} 
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-[#0B0F19] text-sm">Free Consultation</h4>
                <p className="text-xs text-[#525252] mt-0.5">
                  No-obligation discussion
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 max-w-[280px] sm:max-w-none mx-auto w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 overflow-hidden">
                <Image
                  src="/fluent-rocket-icon.png"
                  alt="30-Day POC"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-[#0B0F19] text-sm">30-Day POC</h4>
                <p className="text-xs text-[#525252] mt-0.5">
                  See real results quickly
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 max-w-[280px] sm:max-w-none mx-auto w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 overflow-hidden">
                <Image 
                  src="/zero-risk-shield.png"
                  alt="Zero Risk Shield"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-[#0B0F19] text-sm">Zero Risk</h4>
                <p className="text-xs text-[#525252] mt-0.5">
                  No commitment required
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Button - Centered */}
          <div className="flex justify-center">
            <Button 
              onClick={() => setContactModalOpen(true)}
              size="lg" 
              className="bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] hover:from-[#0A58D0]/90 hover:to-[#3B82F6]/90 text-white shadow-[0_8px_30px_rgba(10,88,208,0.5)] hover:shadow-[0_12px_40px_rgba(10,88,208,0.7)] transition-all duration-300 px-14 py-8 text-xl font-bold rounded-full transform hover:scale-110 min-h-[80px]"
            >
              Book My Consultation
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </AnimatedDiv>
      </section>

      {/* Footer */}
      <Footer onContactClick={() => setContactModalOpen(true)} />

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      </main>
    </div>
  );
}