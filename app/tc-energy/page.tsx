"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Server,
  GitBranch,
  Workflow,
  BadgeCheck,
  Cloud,
  ArrowRight,
  FileText,
  Download,
  Library,
  BarChart3,
  Database,
  MessageSquare,
  Shield,
  Cpu,
  CheckCircle,
  Users,
  Phone,
  User,
  Rocket,
  Briefcase,
  X,
  FileSpreadsheet,
  TrendingUp,
  Activity,
  Clock,
  Zap,
  AlertTriangle,
  FileCheck,
  Bot,
  Network,
  Gauge,
  Target,
  Leaf,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TODAY = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function TCEnergyPitch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm print:hidden">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logos/Innovoco-Logo-hires.png"
                  alt="Innovoco Logo"
                  width={628}
                  height={179}
                  className="object-contain"
                  style={{ width: 'auto', height: '40px' }}
                  priority
                />
              </Link>
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-[#525252] dark:text-[#D1D5DB]">Executive Briefing</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                {TODAY}
              </Badge>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Personalized */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0A58D0]/10 via-white to-[#0A58D0]/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-[#0A58D0] text-white">
              Confidential - Prepared for TC Energy
            </Badge>
            <h1 className="text-5xl font-bold text-[#0B0F19] mb-4">
              AI Agent Systems for TC Energy
            </h1>
            <p className="text-2xl text-[#525252] mb-2">
              Prepared for Robin Lee
            </p>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              Strategic Implementation of Agentic AI for Operations, Administration & Compliance
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            <Card className="text-center p-6 border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <FileCheck className="h-8 w-8 text-[#0A58D0] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0A58D0] mb-2">&lt;5 min</div>
              <div className="text-sm font-medium text-[#0B0F19] mb-1">Report Generation</div>
              <div className="text-xs text-[#525252]">From data to compliance-ready docs</div>
            </Card>
            <Card className="text-center p-6 border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <Database className="h-8 w-8 text-[#0A58D0] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0A58D0] mb-2">Text-to-SQL</div>
              <div className="text-sm font-medium text-[#0B0F19] mb-1">Natural Language Queries</div>
              <div className="text-xs text-[#525252]">Ask questions, get instant insights</div>
            </Card>
            <Card className="text-center p-6 border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <Zap className="h-8 w-8 text-[#0A58D0] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0A58D0] mb-2">Real-Time</div>
              <div className="text-sm font-medium text-[#0B0F19] mb-1">Data Integration</div>
              <div className="text-xs text-[#525252]">Live connections to all systems</div>
            </Card>
            <Card className="text-center p-6 border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <Bot className="h-8 w-8 text-[#0A58D0] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0A58D0] mb-2">24/7</div>
              <div className="text-sm font-medium text-[#0B0F19] mb-1">AI Assistants</div>
              <div className="text-xs text-[#525252]">Always-on support for your team</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why AI Agents for TC Energy Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B0F19] mb-4">
              Why AI Agents for TC Energy?
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              Address your critical operational challenges with intelligent automation tailored for energy infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Accelerate Document Processing */}
            <Card className="border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0A58D0]/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <CardTitle className="text-lg">Accelerate Document Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A58D0] mb-3">75% faster</div>
                <p className="text-sm text-[#525252]">
                  Turnaround time for compliance reports, environmental documentation, and regulatory submissions
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Predictive Operations Management */}
            <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <Gauge className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Predictive Operations Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-3">40% reduction</div>
                <p className="text-sm text-[#525252]">
                  In unplanned downtime through AI-driven predictive maintenance and proactive issue detection
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Streamlined Employee Onboarding */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Streamlined Employee Onboarding</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-3">60% faster</div>
                <p className="text-sm text-[#525252]">
                  Automatic employee setup with AI-powered skill set profiling, role-based access provisioning, and personalized training paths—no manual lookups required
                </p>
              </CardContent>
            </Card>

            {/* Card 4: Automated Compliance & Reporting */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Automated Compliance & Reporting</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-3">90% accuracy</div>
                <p className="text-sm text-[#525252]">
                  Compliance accuracy with automated validation against CER regulations and industry standards
                </p>
              </CardContent>
            </Card>

            {/* Card 5: Enhanced Safety Management */}
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Enhanced Safety Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-3">50% reduction</div>
                <p className="text-sm text-[#525252]">
                  In safety incidents through real-time hazard detection and automated safety protocol enforcement
                </p>
              </CardContent>
            </Card>

            {/* Card 6: ESG & Sustainability Tracking */}
            <Card className="border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">ESG & Sustainability Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600 mb-3">Real-time</div>
                <p className="text-sm text-[#525252]">
                  Emissions monitoring and sustainability reporting with automated ESG metrics tracking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Challenges Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#0B0F19] mb-8 text-center">
            Current Operational Challenges
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-red-500" />
                  Data Silos & Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#525252] mb-4">
                  Over 70 disparate data sources prevent unified project planning and efficient operations coordination
                </p>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Fragmented SCADA, EAM, ERP, and GIS systems
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Manual data reconciliation across platforms
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-orange-500" />
                  Document & Compliance Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#525252] mb-4">
                  Manual generation of regulatory compliance reports and documentation
                </p>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Time-intensive CER reporting processes
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Environmental compliance documentation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-500" />
                  Onboarding & Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#525252] mb-4">
                  Complex technical training for new technicians and analysts across vast operations
                </p>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Extended ramp-up time for new hires
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Knowledge transfer from retiring workforce
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Workflow className="h-6 w-6 text-purple-500" />
                  Work Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#525252] mb-4">
                  Manual enrichment and routing of work orders across operations control centres
                </p>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Delayed response to pipeline events
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                    Inefficient approval workflows
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Agent Solutions Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B0F19] mb-4">
              AI Agent System Solutions
            </h2>
            <p className="text-lg text-[#525252] max-w-3xl mx-auto">
              Autonomous, intelligent systems that proactively enhance operations without requiring constant human oversight
            </p>
          </div>

          <div className="space-y-8">
            {/* Solution 1: Document Automation Agent */}
            <Card className="border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <CardHeader className="bg-gradient-to-r from-[#0A58D0]/10 to-transparent">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0A58D0] flex items-center justify-center">
                      <FileCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Document Automation & Compliance Agent</CardTitle>
                      <p className="text-sm text-[#525252] mt-1">Automated regulatory reporting and documentation generation</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-300">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2 text-sm text-[#525252]">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-[#0A58D0] flex-shrink-0" />
                        Auto-generate CER compliance reports from operational data
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-[#0A58D0] flex-shrink-0" />
                        Create environmental monitoring documentation
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-[#0A58D0] flex-shrink-0" />
                        Generate safety incident reports with root cause analysis
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-[#0A58D0] flex-shrink-0" />
                        Automated audit trail documentation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#0A58D0]" />
                      Expected Impact
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Time Savings</span>
                          <span className="text-lg font-bold text-[#0A58D0]">70%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Reduction in manual documentation time</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Compliance Accuracy</span>
                          <span className="text-lg font-bold text-green-600">99%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Automated validation against regulations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution 2: Onboarding Assistant Agent */}
            <Card className="border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Intelligent Onboarding Assistant</CardTitle>
                      <p className="text-sm text-[#525252] mt-1">Interactive training and knowledge transfer for new technicians</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2 text-sm text-[#525252]">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                        24/7 conversational assistant for policy and procedure queries
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                        Interactive pipeline operations training modules
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                        Safety protocol certification automation
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                        Personalized learning paths based on role and experience
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Expected Impact
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Ramp-Up Speed</span>
                          <span className="text-lg font-bold text-purple-600">60%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Faster time to full productivity</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Training Costs</span>
                          <span className="text-lg font-bold text-blue-600">-50%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Reduction in instructor-led training hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution 3: Operations Automation Agent */}
            <Card className="border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                      <Network className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Operations Intelligence Agent</CardTitle>
                      <p className="text-sm text-[#525252] mt-1">Automated work order enrichment, routing, and event response</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-300">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2 text-sm text-[#525252]">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        Auto-enrich work orders with historical data and context
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        Intelligent routing to appropriate teams and specialists
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        Predictive maintenance alerts from telemetry data
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        Automated approval workflows with validation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Expected Impact
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Response Time</span>
                          <span className="text-lg font-bold text-green-600">-40%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Faster incident response and resolution</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Operational Efficiency</span>
                          <span className="text-lg font-bold text-blue-600">35%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Improvement in work order processing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution 4: Data Integration Agent */}
            <Card className="border-2 border-[#0A58D0]/20 hover:border-[#0A58D0]/40 transition-all">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-transparent">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Data Integration & Orchestration Agent</CardTitle>
                      <p className="text-sm text-[#525252] mt-1">Unified data platform connecting SCADA, EAM, ERP, and GIS systems</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-300">Foundation</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2 text-sm text-[#525252]">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                        Real-time integration of 70+ data sources
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                        Automated data quality validation and enrichment
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                        Unified dashboard for operations visibility
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                        Intelligent data routing and transformation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B0F19] mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Expected Impact
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Data Access Time</span>
                          <span className="text-lg font-bold text-orange-600">-80%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Instant access to unified data</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Decision Quality</span>
                          <span className="text-lg font-bold text-blue-600">45%</span>
                        </div>
                        <div className="text-xs text-[#525252]">Better data-driven decisions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Foundation */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#0B0F19] mb-8 text-center">
            Enterprise-Grade Technology Foundation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Microsoft Azure</CardTitle>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300 w-fit">Primary Platform</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    Azure AI Foundry for agent orchestration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    Azure tenant with Private Link/VNet
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    Seamless M365 & Power Platform integration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    SOC 2 Type II & ISO 27001 certified
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                    <Network className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">LangGraph Platform</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300 w-fit">Agent Framework</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    Stateful multi-agent workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    Full observability with LangSmith
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    Self-host or cloud deployment options
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    Auditable agent decision paths
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Power Automate</CardTitle>
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300 w-fit">Workflow Engine</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                    Native M365 integration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                    Automated approval workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                    Desktop RPA capabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-purple-600 flex-shrink-0" />
                    Enterprise DLP & governance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#0B0F19] mb-8 text-center">
            Phased Implementation Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0A58D0]/30">
              <CardHeader className="bg-gradient-to-br from-[#0A58D0]/10 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">Phase 1: Foundation</CardTitle>
                  <Badge className="bg-[#0A58D0] text-white">Weeks 1-6</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0A58D0] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                    <span>Data Integration Agent deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0A58D0] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                    <span>Unified data platform setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0A58D0] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                    <span>Security & compliance validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0A58D0] text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</div>
                    <span>Initial pilot with one Operations Control Centre (OCC)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-300">
              <CardHeader className="bg-gradient-to-br from-purple-500/10 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">Phase 2: Core Agents</CardTitle>
                  <Badge className="bg-purple-600 text-white">Weeks 7-12</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                    <span>Document Automation Agent live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                    <span>Onboarding Assistant deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                    <span>Operations Intelligence Agent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</div>
                    <span>Expand to 3 additional Operations Control Centres</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-300">
              <CardHeader className="bg-gradient-to-br from-green-500/10 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">Phase 3: Scale</CardTitle>
                  <Badge className="bg-green-600 text-white">Weeks 13-24</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm text-[#525252]">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                    <span>Full network rollout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                    <span>Continuous optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</div>
                    <span>Additional use case expansion</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-[#0B0F19] mb-8 text-center">
            Projected Business Impact
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-green-600 mb-2">$2.5M+</div>
                <div className="text-sm font-medium text-[#0B0F19] mb-1">Annual Cost Savings</div>
                <div className="text-xs text-[#525252]">Operational efficiency gains</div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-blue-600 mb-2">65%</div>
                <div className="text-sm font-medium text-[#0B0F19] mb-1">Time Reduction</div>
                <div className="text-xs text-[#525252]">Admin & documentation tasks</div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-purple-600 mb-2">99.5%</div>
                <div className="text-sm font-medium text-[#0B0F19] mb-1">Compliance Rate</div>
                <div className="text-xs text-[#525252]">Automated validation</div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-orange-600 mb-2">50%</div>
                <div className="text-sm font-medium text-[#0B0F19] mb-1">Faster Onboarding</div>
                <div className="text-xs text-[#525252]">New hire productivity</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0A58D0] to-[#084BB3] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform TC Energy's Operations?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Let's discuss how these AI agent systems can be customized for your specific operational needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#0A58D0] hover:bg-gray-100">
              Schedule Technical Deep Dive
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Request Detailed Proposal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0B0F19] text-white text-center">
        <div className="container mx-auto">
          <p className="text-sm text-gray-400">
            Confidential - Prepared exclusively for TC Energy | {TODAY}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Innovoco AI & Automation | info@innovoco.com | +1 305-415-8760
          </p>
        </div>
      </footer>
    </div>
  );
}
