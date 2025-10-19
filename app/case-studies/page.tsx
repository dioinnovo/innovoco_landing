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
  FileSpreadsheet,
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrintPDFButton } from "@/components/case-studies/print-pdf-button";
import { Footer } from '@/components/layout/footer';
import ContactModal from "@/components/landing/ContactModal";

// --- Data (exec-ready) ---
const TODAY = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// --- Players (vendors) ---
const players = [
  {
    name: "Azure AI Foundry (+ SK / AutoGen)",
    tag: "Microsoft | GA",
    color: "bg-blue-600",
    readiness: "GA, enterprise governance & observability",
    bestFor: "Agentic apps in MS stack; enterprise trust & compliance",
    privacy: "Azure tenant, Private Link/VNet; Arc hybrid/on‑prem patterns",
    stability: "Very high (Microsoft)",
  },
  {
    name: "Google Vertex AI (+ BigQuery, Agent Builder)",
    tag: "Google Cloud | GA",
    color: "bg-red-600",
    readiness: "Mature platform; Agent Builder; Studio for prompts/evals",
    bestFor: "Data‑native AI (BigQuery) and agentic apps inside GCP",
    privacy: "GCP tenant; VPC‑SC; regional residency; CMEK",
    stability: "Very high (Google)",
  },
  {
    name: "LangGraph Platform (+ LangSmith)",
    tag: "LangChain | GA",
    color: "bg-green-600",
    readiness: "GA, stateful agents, strong observability",
    bestFor: "Structured, auditable multi‑agent workflows (cloud/hybrid/self‑host)",
    privacy: "Cloud, hybrid, or self‑host in VPC",
    stability: "High (VC‑backed, broad adoption)",
  },
  {
    name: "n8n",
    tag: "Workflow | SOC2",
    color: "bg-orange-500",
    readiness: "Enterprise features, strong community",
    bestFor: "Integration/automation abstraction; self‑host",
    privacy: "Self‑host or cloud; fine‑grained secrets",
    stability: "High (growing ecosystem)",
  },
  {
    name: "Power Automate",
    tag: "Microsoft | Enterprise",
    color: "bg-sky-400",
    readiness: "Embedded across M365 + RPA",
    bestFor: "Approvals, O365 flows, desktop RPA",
    privacy: "M365 tenant; DLP & governance",
    stability: "Very high (Microsoft)",
  },
  {
    name: "Pipedream",
    tag: "Dev‑centric SaaS",
    color: "bg-teal-500",
    readiness: "Mature SaaS; VPC isolation option",
    bestFor: "Fast developer glue (cloud only)",
    privacy: "SaaS/VPC (no true on‑prem)",
    stability: "Medium‑high (startup)",
  },
  {
    name: "CrewAI / Flowise / Dify",
    tag: "Rapid prototyping",
    color: "bg-zinc-700",
    readiness: "Great for POCs/innovation",
    bestFor: "Dept. pilots; fast iteration",
    privacy: "Varies (mostly SaaS/OSS)",
    stability: "Medium (fast‑moving, consolidating)",
  },
];

// --- Matrix (rows must have 7 cols to match vendors) ---
const matrix = [
  {
    category: "Enterprise Readiness",
    cols: [
      "✔ GA; governance/observability",
      "✔ GA; Agent Builder; Studio",
      "✔ GA; SOC2/HIPAA (cloud); self‑host",
      "✔ SOC2; RBAC; self‑host",
      "✔ Enterprise; M365 ecosystem",
      "⚠ SaaS; VPC only (no on‑prem)",
      "⚠ Early stage / acquired / OSS",
    ],
  },
  {
    category: "Observability & Evals & Prompt Management",
    cols: [
      "Prompt Flow, tracing, evals; OTel",
      "Vertex Studio evals; Prompt mgmt; Model Garden",
      "LangSmith evals/traces; Studio",
      "Exec logs; Prometheus/Grafana; run history",
      "Admin center, run history, DLP",
      "Runs/insights in app; credits",
      "Varies by tool; basic to good",
    ],
  },
  {
    category: "Long‑running Agents / Orchestration",
    cols: [
      "✔ Foundry Agent Service; SK Agents",
      "✔ Vertex Agent Builder; Workflows",
      "✔ Graph state + retries, cycles, parallel",
      "Flows & schedules; external tasks",
      "RPA/Flows (not LLM‑native agents)",
      "Serverless steps; not on‑prem",
      "Framework‑dependent",
    ],
  },
  {
    category: "Best For",
    cols: [
      "Agentic apps in MS stack",
      "Data‑native AI (BigQuery) & agents",
      "Stateful multi‑agent graphs",
      "Workflow automation, integration",
      "O365 approvals, RPA",
      "Dev glue (serverless)",
      "Prototyping / labs",
    ],
  },
  {
    category: "Privacy & Deployment",
    cols: [
      "Azure tenant; VNet; Arc hybrid",
      "GCP; VPC‑SC; CMEK; regional",
      "Cloud / hybrid / self‑host",
      "Self‑host or cloud",
      "Tenant‑bound; DLP",
      "Cloud/VPC only",
      "Varies; often SaaS/OSS",
    ],
  },
  {
    category: "Stability / Longevity",
    cols: ["Very high", "Very high", "High", "High", "Very high", "Med‑high", "Medium"],
  },
];

// --- Enterprise automation workflows ---
const workflows = [
  {
    id: 1,
    title: "Regulated Client Onboarding (Finance/Insurance)",
    stack: "LangGraph + n8n + Azure Foundry / Vertex Agent Builder",
    value: "Frictionless KYC/AML with auditable trails & automated approvals",
  },
  {
    id: 2,
    title: "Enterprise Knowledge Copilot (Cross‑Dept)",
    stack: "Azure Foundry or Vertex + LangGraph",
    value: "Governed retrieval across SharePoint/SQL/BigQuery; answers w/ citations",
  },
  {
    id: 3,
    title: "Predictive Supply Chain Management",
    stack: "Vertex AI + n8n + LangGraph (or Azure analogs)",
    value: "Demand forecasting → reorder → vendor orchestration (SLA‑aware)",
  },
  {
    id: 4,
    title: "360° Customer Support Bot",
    stack: "SK/AutoGen or Vertex Agents + LangGraph + n8n",
    value: "Tiered triage; agent handoff; CRM updates; summaries",
  },
  {
    id: 5,
    title: "Field Services & IoT Incident Playbooks",
    stack: "n8n + LangGraph + Power Automate (or Vertex Workflows)",
    value: "Sensor anomaly → dispatch → work order → report",
  },
  {
    id: 6,
    title: "Enterprise Reporting & Audit Automation",
    stack: "LangSmith/LangGraph + n8n + Power Automate / Vertex",
    value: "Quarterly packs; lineage; immutable audit trails",
  },
  {
    id: 7,
    title: "Marketing Personalization Engine",
    stack: "LangGraph + Vertex AI (BQ) + n8n / (Azure analogs)",
    value: "Segments, content variants, A/B learnings into CDP/CRM",
  },
  {
    id: 8,
    title: "Cross‑border HR & Payroll Automation",
    stack: "n8n + Azure Foundry or Vertex + LangGraph",
    value: "Policy checks; payroll runs; compliance evidence",
  },
];

// --- Exec recommendations ---
const recs = [
  {
    title: "Microsoft Agentic Stack",
    subtitle: "Azure-First Enterprise AI Platform",
    keyPoints: [
      "Azure AI Foundry for enterprise runtime",
      "Semantic Kernel for flexible SDK",
      "AutoGen for multi-agent workflows",
      "Full Microsoft ecosystem integration"
    ],
    tags: ["Microsoft Partner", "Enterprise Ready", "SOC2 Compliant"],
    icon: "microsoft",
    highlight: true
  },
  {
    title: "Google Vertex AI Stack",
    subtitle: "GCP-Native AI Infrastructure",
    keyPoints: [
      "Vertex AI Agent Builder for rapid deployment",
      "BigQuery-native data processing",
      "Built-in model evaluation & monitoring",
      "Enterprise security with VPC-SC/CMEK"
    ],
    tags: ["Google Cloud", "BigQuery", "Scale Ready"],
    icon: "google",
    highlight: false
  },
  {
    title: "LangGraph Orchestration",
    subtitle: "Cloud-Agnostic Workflow Engine",
    keyPoints: [
      "Stateful agent workflows across clouds",
      "Full audit trail and compliance tracking",
      "Deploy anywhere: cloud, hybrid, on-premise",
      "LangSmith integration for observability"
    ],
    tags: ["Multi-Cloud", "Flexible", "Observable"],
    icon: "langgraph",
    highlight: false
  },
  {
    title: "Integration & Automation",
    subtitle: "Enterprise Connectivity Layer",
    keyPoints: [
      "n8n for self-hosted integration fabric",
      "Connect any ERP, CRM, or database",
      "Citizen developer enablement",
      "Power Automate for Office 365"
    ],
    tags: ["Integration", "No-Code", "Automation"],
    icon: "integration",
    highlight: false
  },
];

// --- Data Use Cases ---
const dataUseCases = [
  {
    id: 1,
    title: "Conversational Data Analytics",
    desc: "Enable non-technical executives and teams to access critical business insights through natural language queries. Transform data access from a technical bottleneck into a competitive advantage.",
    example:
      "Show me our top performing products by region last quarter and predict next month's demand",
    impact: [
      "Democratize data access across your organization without SQL training",
      "Accelerate decision-making with instant answers to business questions",
      "Reduce dependency on technical teams and eliminate reporting backlogs",
      "Improve data governance through centralized query tracking and audit trails",
      "Enable executives to explore data independently with enterprise-grade security",
    ],
  },
  {
    id: 2,
    title: "AI‑Powered Master Data Management",
    desc: "Protect revenue and reduce operational costs by establishing enterprise-wide data quality and governance. Transform fragmented data into a strategic asset that powers AI initiatives and regulatory compliance.",
    impact: [
      "Eliminate costly data quality issues that drain millions in annual revenue",
      "Automated duplicate detection, anomaly identification, and quality scoring",
      "Accelerate data preparation while ensuring GDPR/CCPA compliance",
      "Build the data foundation required to scale AI across your enterprise",
      "Reduce operational costs and improve cross-selling opportunities through unified customer views",
      "Self-documenting data lineage for audit trails and regulatory reporting",
    ],
  },
  {
    id: 3,
    title: "Intelligent Pipeline Support Agent",
    desc: "Minimize costly downtime and free your engineering teams from firefighting. AI-powered autonomous monitoring detects, diagnoses, and resolves data pipeline issues around the clock.",
    impact: [
      "Detect → Diagnose → Generate Fix → Human Approval → Deploy → Verify",
      "Dramatically reduce pipeline failures and mean time to resolution",
      "24/7 autonomous monitoring eliminates on-call engineer fatigue",
      "Save millions by preventing downtime that impacts business operations",
      "Predictive maintenance catches issues before they cascade into failures",
      "Reduce engineering overhead while improving data reliability and trust",
    ],
  },
  {
    id: 4,
    title: "AI‑Driven DataOps Platform",
    desc: "Accelerate your path to enterprise AI by modernizing data operations. Gain the agility to respond to market changes in days, not quarters, while optimizing infrastructure costs.",
    impact: [
      "Infrastructure as Code • Auto‑scaling • Performance Optimization • Cost Management",
      "Boost analytics team productivity and accelerate time to market",
      "Optimize infrastructure costs through intelligent resource allocation",
      "Enable faster deployment cycles with zero‑downtime updates",
      "Scale AI initiatives beyond pilots with enterprise-grade automation",
      "Automated compliance documentation and self-healing pipelines",
      "Critical foundation for organizations competing in the AI-driven economy",
    ],
  },
];

// --- Functional Use Cases ---
const functionalUseCases = [
  {
    id: 1,
    title: "Intelligent Inspection Report System",
    desc: "Multiply field team productivity with hands-free AI documentation. Transform inspections across construction, utilities, insurance, and real estate while delivering superior client service.",
    impact: [
      "Inspector speaks → AI transcribes → Finds similar cases → Report generated → Human reviews → Client receives",
      "Dramatically reduce documentation time, enabling more inspections per day",
      "Hands-free operation critical for challenging field conditions",
      "Automatic photo annotation and consistent damage assessment",
      "Historical case matching ensures reporting consistency and quality",
      "Accelerate client delivery and improve customer satisfaction",
      "Address skilled labor shortages by making teams more efficient",
    ],
  },
  {
    id: 2,
    title: "AI Voice Assistant Platform",
    desc: "Transform customer service from a cost center into a competitive advantage. Deliver immediate, intelligent support 24/7 while dramatically reducing operational expenses and improving satisfaction.",
    impact: [
      "Natural voice synthesis • Sentiment analysis • Intent recognition • Smart routing",
      "Achieve strong return on investment through operational cost savings",
      "Handle customer inquiries around the clock in multiple languages",
      "Deliver immediate responses while human agents handle complex cases",
      "Improve customer satisfaction through faster, more consistent service",
      "Scale customer support without proportional headcount increases",
      "Essential capability for competitive parity in 2025 marketplace",
    ],
  },
  {
    id: 3,
    title: "Intelligent HR Onboarding Suite",
    desc: "Win the talent war by delivering exceptional employee experiences from day one. Accelerate productivity, improve retention, and reduce HR administrative burden through intelligent automation.",
    impact: [
      "Background checks → Credential creation → Equipment provisioning → Training assignment",
      "Accelerate time-to-productivity and improve new hire retention",
      "Enhance employee satisfaction during critical first 90 days",
      "Reduce errors in employee data collection and system provisioning",
      "Free HR teams from repetitive tasks to focus on strategic initiatives",
      "Automatic compliance tracking with complete audit trails",
      "Create competitive advantage in attracting and retaining top talent",
    ],
  },
  {
    id: 4,
    title: "BMAD‑Powered Development Accelerator",
    desc: "Accelerate innovation cycles and reduce time-to-market with multi-agent AI systems. Transform how your organization builds, tests, and deploys software solutions.",
    impact: [
      "Research Agent → Design Agent → Architecture Agent → Development Agent → Testing Agent",
      "Dramatically accelerate prototype development and reduce concept-to-deployment time",
      "Eliminate fragmented tools and reduce development complexity",
      "Enable rapid experimentation and faster learning cycles",
      "Automatic technical documentation and compliance tracking",
      "Improve system resilience with distributed, parallel agent operations",
      "Essential for organizations competing in the AI-driven economy",
    ],
  },
];

export default function CaseStudiesPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#0B0F19] dark:text-[#F9FAFB] print:bg-white print:text-black overflow-x-hidden">
      {/* Skip to content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0A58D0] text-white rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] transition-all duration-300 print:hidden"
      >
        Skip to main content
      </a>
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm print:hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between gap-4">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/images/logos/Innovoco-Logo-hires.png"
                  alt="Innovoco Logo"
                  width={628}
                  height={179}
                  className="object-contain max-w-[120px] sm:max-w-none"
                  style={{ width: 'auto', height: '32px', maxHeight: '40px' }}
                  priority
                />
              </Link>
              <div className="hidden md:flex items-center">
                <span className="text-sm font-medium text-[#525252] dark:text-[#D1D5DB]">Enterprise Brief</span>
              </div>
            </div>
            
            {/* Right side - Download button */}
            <div className="flex-shrink-0">
              <PrintPDFButton />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">
      
        {/* Hero - Executive Decision Matrix */}
        <section className="border-b border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-gradient-to-br from-[#DBEAFE]/20 via-[#EDE9FE]/10 to-[#FECACA]/10 dark:from-[#0B0F19] dark:via-[#1F2937]/30 dark:to-[#0B0F19] print:bg-white print:border-0 print:break-inside-avoid">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16 grid md:grid-cols-2 gap-6 md:gap-10 items-start print:py-6 print:gap-4 print:px-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0B0F19] dark:text-[#F9FAFB] print:text-2xl print:text-black print:mb-3">
              Enterprise Agentic Frameworks — Executive & Enterprise Ready
            </h1>
            <p className="mt-4 text-[#525252] dark:text-[#D1D5DB] max-w-xl text-sm sm:text-base print:text-gray-700 print:text-sm print:mt-2">
              A decision‑grade view of the Microsoft & Google stacks, plus framework‑agnostic orchestration with LangGraph, and automation with n8n. Updated {TODAY}.
            </p>
            
            <div className="mt-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[22px] p-6 border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.08)] print:mt-4 print:p-3 print:border-gray-200 print:shadow-none print:rounded-lg">
              <div className="mb-4">
                <div className="text-xs uppercase tracking-wider text-[#8B5CF6] dark:text-[#A78BFA] font-semibold mb-2 print:text-xs print:mb-2 print:text-gray-600">Deployment Options</div>
              </div>
              
              <div className="space-y-3 print:space-y-2">
                <div className="flex items-center justify-between p-3 rounded-[12px] bg-white/60 dark:bg-black/20 shadow-sm print:p-2 print:rounded-lg print:shadow-none print:border print:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg print:w-6 print:h-6 print:rounded-md bg-[#0A58D0] flex items-center justify-center">
                      <span className="text-white font-semibold text-xs print:text-[10px]">MS</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0B0F19] dark:text-[#F9FAFB] text-sm print:text-xs print:text-black">Microsoft Ecosystem</div>
                      <div className="text-[#525252] dark:text-[#D1D5DB] text-xs print:text-[10px] print:text-gray-600">Azure AI Foundry</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-[#0F766E] print:text-[10px]">High Trust</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[12px] bg-white/60 dark:bg-black/20 shadow-sm print:p-2 print:rounded-lg print:shadow-none print:border print:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg print:w-6 print:h-6 print:rounded-md bg-[#DC2626] flex items-center justify-center">
                      <span className="text-white font-semibold text-xs print:text-[10px]">GC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0B0F19] dark:text-[#F9FAFB] text-sm print:text-xs print:text-black">Google Data-Native</div>
                      <div className="text-[#525252] dark:text-[#D1D5DB] text-xs print:text-[10px] print:text-gray-600">Vertex AI + BigQuery</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-[#0F766E] print:text-[10px]">Data-First</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-[12px] bg-white/60 dark:bg-black/20 shadow-sm print:p-2 print:rounded-lg print:shadow-none print:border print:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg print:w-6 print:h-6 print:rounded-md bg-[#8B5CF6] flex items-center justify-center">
                      <span className="text-white font-semibold text-xs print:text-[10px]">HA</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0B0F19] dark:text-[#F9FAFB] text-sm print:text-xs print:text-black">Hybrid Approach</div>
                      <div className="text-[#525252] dark:text-[#D1D5DB] text-xs print:text-[10px] print:text-gray-600">LangGraph + Self-Host</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-[#0F766E] print:text-[10px]">No Lock-in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Executive Decision Dashboard */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[22px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.12),0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wider text-[#0F766E] dark:text-[#10B981] font-semibold mb-2">Business Impact</div>
              <h3 className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB]">ROI & Deployment Metrics</h3>
            </div>
            
            <div className="space-y-4">
              {/* ROI Impact */}
              <div className="flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#D1FAE5]/50 to-[#10B981]/10 border border-[#0F766E]/10">
                <div className="flex-1">
                  <div className="font-semibold text-[#0F766E] text-xl">40-60% Cost Reduction</div>
                  <div className="text-xs text-[#525252] dark:text-[#D1D5DB]">Year 1 Operational Savings</div>
                </div>
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src="/images/icons/cost-reduction-3d.png"
                    alt="Cost Reduction"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain rounded-xl"
                    quality={75}
                    priority
                  />
                </div>
              </div>
              
              {/* Time to Value */}
              <div className="flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#EDE9FE]/50 to-[#8B5CF6]/10 border border-[#8B5CF6]/10">
                <div className="flex-1">
                  <div className="font-semibold text-[#8B5CF6] text-xl">30 Days POC</div>
                  <div className="text-xs text-[#525252] dark:text-[#D1D5DB]">90 Days Full Production</div>
                </div>
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src="/images/icons/poc-timeline-3d.png"
                    alt="POC Timeline"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain rounded-xl"
                    quality={75}
                    priority
                  />
                </div>
              </div>
              
              {/* Enterprise Ready */}
              <div className="flex items-center justify-between p-4 rounded-[16px] bg-gradient-to-r from-[#DBEAFE]/50 to-[#0A58D0]/10 border border-[#0A58D0]/10">
                <div className="flex-1">
                  <div className="font-semibold text-[#0A58D0] text-xl">SOC2 + GDPR</div>
                  <div className="text-xs text-[#525252] dark:text-[#D1D5DB]">Enterprise Compliance</div>
                </div>
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src="/images/icons/compliance-shield-3d.png"
                    alt="Compliance Shield"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain rounded-xl"
                    quality={75}
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Bottom Line */}
            <div className="mt-6 pt-4 border-t border-[#E5E7EB]/30 dark:border-[#374151]/30">
              <div className="text-center">
                <div className="text-sm font-medium text-[#0B0F19] dark:text-[#F9FAFB]">Ready for Executive Decision</div>
                <div className="text-xs text-[#525252] dark:text-[#D1D5DB] mt-1">Choose stack → Validate ROI → Deploy Q1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Foundations - Fluent Design */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 print:py-4 print:px-4 print:block print:max-w-full print:page-break-inside-avoid" style={{pageBreakInside: 'avoid'}}>
        <div className="text-center mb-12 print:mb-4">
          <h2 className="text-4xl font-semibold text-[#0B0F19] dark:text-[#F3F2F1] mb-4 print:text-2xl print:font-bold print:text-black print:mb-2">
            Strategic Foundations
          </h2>
          <p className="text-[#525252] dark:text-[#D1D5DB] max-w-2xl mx-auto print:text-gray-700 print:text-sm print:mb-3">
            Four foundational frameworks to transform your enterprise with proven AI orchestration
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 print:gap-2 print:grid-cols-2">
          {recs.map((r, idx) => {
            const microsoftGlassThemes = [
              { 
                brandColor: '#0A58D0',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 11.4H0V0h11.4v11.4ZM24 11.4H12.6V0H24v11.4ZM11.4 24H0V12.6h11.4V24Zm12.6 0H12.6V12.6H24V24Z"/>
                  </svg>
                ),
                environmentalTint: 'bg-[#0A58D0]/5 dark:bg-[#0A58D0]/10'
              },
              { 
                brandColor: '#DC2626',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ),
                environmentalTint: 'bg-[#DC2626]/5 dark:bg-[#DC2626]/10'
              },
              { 
                brandColor: '#2d5a53',
                icon: "langgraph",
                environmentalTint: 'bg-[#2d5a53]/5 dark:bg-[#2d5a53]/10'
              },
              { 
                brandColor: '#8B5CF6',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 7h10v10H7zm5-5v5m0 10v5M2 12h5m10 0h5"/>
                  </svg>
                ),
                environmentalTint: 'bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10'
              }
            ];
            const theme = microsoftGlassThemes[idx];
            
            return (
              <div key={idx} className="group relative">
                {/* Simplified glassmorphism with less offset */}
                
                {/* Background panel */}
                <div className={`absolute inset-0 ${theme.environmentalTint} rounded-[22px] transform translate-x-1 translate-y-1 opacity-40 print:hidden`}></div>
                
                {/* Main glass panel */}
                <div className="relative bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-[22px] p-6 transition-all duration-300 ease-out border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15),0_20px_50px_rgba(0,0,0,0.20)] hover:-translate-y-1 hover:border-white/50 cursor-pointer transform-gpu print:bg-white print:shadow-none print:border print:border-gray-300 print:p-3 print:hover:transform-none print:break-inside-avoid print:rounded-lg">
                  
                  {/* Highlight badge for Microsoft stack */}
                  
                  {/* Content area */}
                  <div className="relative z-10">
                    {/* Header with larger icon */}
                    <div className="flex items-start gap-4 mb-4 print:gap-2 print:mb-2">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 flex-shrink-0 relative overflow-hidden print:w-8 print:h-8 print:shadow-none print:rounded-lg"
                        style={{ backgroundColor: theme.brandColor }}
                      >
                        {theme.icon === "langgraph" ? (
                          <>
                            <div className="absolute left-2 right-2 top-4 bottom-4 bg-white rounded-full"></div>
                            <Image 
                              src="/images/icons/langgraph-icon.png" 
                              alt="LangGraph" 
                              width={42} 
                              height={42}
                              className="object-contain relative z-10"
                            />
                          </>
                        ) : (
                          theme.icon
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-[#0B0F19] dark:text-[#F9FAFB] text-xl mb-1 print:text-sm print:font-semibold print:mb-0.5">
                          {r.title}
                        </h3>
                        <p className="text-[#8B5CF6] dark:text-[#A78BFA] text-sm font-medium print:text-xs print:text-gray-600">
                          {r.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Key points with bullets */}
                    <ul className="space-y-2 mb-4 print:space-y-1 print:mb-2">
                      {r.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 print:w-1 print:h-1 print:mt-1"
                            style={{ backgroundColor: theme.brandColor }}
                          />
                          <span className="text-[#525252] dark:text-[#D1D5DB] text-sm leading-relaxed print:text-xs print:leading-tight print:text-gray-700">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 print:gap-1">
                      {r.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 text-xs font-medium rounded-full border print:text-[10px] print:px-1.5 print:py-0.5 print:rounded-full"
                          style={{ 
                            borderColor: `${theme.brandColor}30`,
                            backgroundColor: `${theme.brandColor}10`,
                            color: theme.brandColor
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none print:hidden"></div>
                  
                  {/* Interactive shine effect on hover */}
                  <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-500 print:hidden"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Landscape Matrix */}
      <section className="container mx-auto max-w-6xl px-4 py-6 md:py-8 print:py-3 print:px-2 print:break-before-page print:landscape">
        <div className="flex items-center justify-between mb-6 print:mb-4">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0B0F19] dark:text-[#F9FAFB] print:text-2xl print:text-black">Landscape Matrix</h2>
          <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] print:text-gray-600">As of {TODAY}</div>
        </div>
        <div className="overflow-x-auto rounded-[22px] border border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm print:shadow-none print:border-gray-300 print:overflow-visible">
              <Table className="min-w-full">
            <TableHeader className="bg-muted/50 print:bg-gray-100">
              <TableRow>
                <TableHead className="w-[260px] print:font-semibold">Category</TableHead>
                <TableHead className="text-white bg-[#0A58D0] print:bg-blue-600 print:text-white">Azure Foundry</TableHead>
                <TableHead className="text-white bg-[#DC2626] print:bg-red-600 print:text-white">Vertex AI</TableHead>
                <TableHead className="text-white bg-[#059669] print:bg-green-600 print:text-white">LangGraph</TableHead>
                <TableHead className="text-white bg-[#FB923C] print:bg-orange-500 print:text-white">n8n</TableHead>
                <TableHead className="text-white bg-[#38BDF8] print:bg-sky-500 print:text-white">Power Automate</TableHead>
                <TableHead className="text-white bg-[#EC4899] print:bg-pink-500 print:text-white">Pipedream</TableHead>
                <TableHead className="text-white bg-[#6B7280] print:bg-gray-600 print:text-white">CrewAI/Flowise/Dify</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium print:text-black print:font-semibold">{row.category}</TableCell>
                  {row.cols.map((c, j) => (
                    <TableCell key={j} className="text-muted-foreground print:text-gray-700">
                      {c}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableCaption className="text-left mx-4 my-4 print:text-gray-600 print:text-sm">
              Azure & Vertex both provide agent runtimes, evals, and prompt tooling; LangGraph adds framework‑agnostic orchestration, including long‑running state across clouds.
            </TableCaption>
          </Table>
        </div>
      </section>

      {/* Data Use Cases */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-[#DBEAFE]/10 via-white to-[#EDE9FE]/10 dark:from-[#0B0F19] dark:via-[#1F2937]/30 dark:to-[#0B0F19] print:py-3 print:bg-white print:break-before-page">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 print:mb-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#0A58D0] dark:text-[#93C5FD] mb-4 print:text-blue-600">
              <Database className="h-4 w-4" />
              <span>Data Transformation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B0F19] dark:text-[#F9FAFB] mb-3 print:text-2xl print:text-black">
              Data Use Cases
            </h2>
            <p className="text-[#525252] dark:text-[#D1D5DB] max-w-2xl mx-auto text-sm md:text-base print:text-gray-700">
              Revolutionary AI applications that transform your data warehouse into an intelligent business partner
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 print:gap-3 print:grid-cols-2">
            {dataUseCases.map((u, index) => {
              const gradients = [
                'from-sky-500/10 to-blue-500/10',
                'from-emerald-500/10 to-green-500/10',
                'from-amber-500/10 to-orange-500/10',
                'from-purple-500/10 to-indigo-500/10'
              ];
              const iconColors = ['text-sky-500', 'text-emerald-500', 'text-amber-500', 'text-purple-500'];
              const icons = [MessageSquare, Shield, Cpu, GitBranch];
              const Icon = icons[index % icons.length];
              
              return (
                <Card 
                  key={u.id} 
                  className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px] print:shadow-none print:border-gray-300 print:break-inside-avoid"
                >
                  
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-[#DBEAFE] to-[#93C5FD]' : index === 1 ? 'from-[#D1FAE5] to-[#10B981]' : index === 2 ? 'from-[#FECACA] to-[#F87171]' : 'from-[#EDE9FE] to-[#A78BFA]'} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className={`h-5 w-5 ${index === 0 ? 'text-[#0A58D0]' : index === 1 ? 'text-[#0F766E]' : index === 2 ? 'text-[#DC2626]' : 'text-[#8B5CF6]'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#0B0F19] dark:text-[#F9FAFB] leading-tight print:text-black">
                          {u.title}
                        </h3>
                        <p className="text-sm text-[#525252] dark:text-[#D1D5DB] font-normal mt-1 print:text-gray-700">
                          {u.desc}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {u.example && (
                      <div className="p-3 rounded-lg bg-[#F9FAFB] dark:bg-[#0B0F19]/50 border border-[#E5E7EB]/20 dark:border-[#374151]/20 print:bg-gray-50 print:border-gray-200">
                        <p className="text-xs font-medium text-[#0A58D0] dark:text-[#93C5FD] mb-1 print:text-blue-600">Example Query:</p>
                        <p className="text-sm text-[#525252] dark:text-[#D1D5DB] italic print:text-gray-700">"{u.example}"</p>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider print:text-gray-600">Impact Metrics</p>
                      <div className="space-y-2">
                        {u.impact.map((line, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#525252] dark:text-[#D1D5DB] print:text-gray-700">{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Functional Use Cases */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-[#FECACA]/10 via-white to-[#DBEAFE]/10 dark:from-[#0B0F19] dark:via-[#1F2937]/30 dark:to-[#0B0F19] print:py-3 print:bg-white">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 print:mb-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#DC2626] dark:text-[#F87171] mb-4 print:text-red-600">
              <Briefcase className="h-4 w-4" />
              <span>Industry Solutions</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3 print:text-2xl print:text-black">
              Functional Use Cases
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto print:text-gray-700">
              Industry-specific AI applications tailored to transform operations across your entire enterprise ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 print:gap-3 print:grid-cols-2">
            {functionalUseCases.map((u, index) => {
              const gradients = [
                'from-violet-500/10 to-purple-500/10',
                'from-rose-500/10 to-pink-500/10',
                'from-cyan-500/10 to-teal-500/10',
                'from-indigo-500/10 to-blue-500/10'
              ];
              const iconColors = ['text-violet-500', 'text-rose-500', 'text-cyan-500', 'text-indigo-500'];
              const icons = [FileSpreadsheet, Phone, User, Rocket];
              const Icon = icons[index % icons.length];
              
              return (
                <Card 
                  key={u.id} 
                  className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px] print:shadow-none print:border-gray-300 print:break-inside-avoid"
                >
                  
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-[#EDE9FE] to-[#A78BFA]' : index === 1 ? 'from-[#FDDDE6] to-[#F9A8D4]' : index === 2 ? 'from-[#DBEAFE] to-[#93C5FD]' : 'from-[#FECACA] to-[#F87171]'} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className={`h-5 w-5 ${index === 0 ? 'text-[#8B5CF6]' : index === 1 ? 'text-[#EC4899]' : index === 2 ? 'text-[#0A58D0]' : 'text-[#DC2626]'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#0B0F19] dark:text-[#F9FAFB] leading-tight print:text-black">
                          {u.title}
                        </h3>
                        <p className="text-sm text-[#525252] dark:text-[#D1D5DB] font-normal mt-1 print:text-gray-700">
                          {u.desc}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider print:text-gray-600">Key Benefits</p>
                      <div className="grid gap-2">
                        {u.impact.slice(0, 1).map((line, i) => (
                          <div key={i} className="p-2 rounded-lg bg-[#F9FAFB] dark:bg-[#0B0F19]/50 border border-[#E5E7EB]/20 dark:border-[#374151]/20 print:bg-gray-50 print:border-gray-200">
                            <p className="text-xs text-[#525252] dark:text-[#D1D5DB] print:text-gray-700">{line}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        {u.impact.slice(1).map((line, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#525252] dark:text-[#D1D5DB] print:text-gray-700">{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Automation Workflows */}
      <section className="py-8 md:py-16 bg-white dark:bg-[#0B0F19] print:py-3 print:bg-white print:break-before-page">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 print:mb-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA] mb-4 print:text-purple-600">
              <Workflow className="h-4 w-4" />
              <span>Enterprise Integration</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3 print:text-2xl print:text-black">
              Enterprise Workflows
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto print:text-gray-700">
              Battle-tested workflow patterns combining the best of cloud platforms and open-source orchestration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 print:grid-cols-3 print:gap-2">
            {workflows.map((w) => {
              // Define color schemes for different workflow categories
              const getWorkflowTheme = (id: number) => {
                const themes = [
                  // Security & Compliance
                  {
                    gradient: "from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/30",
                    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                    borderTop: "bg-gradient-to-r from-emerald-500 to-green-500",
                    category: "Security"
                  },
                  // Data Management
                  {
                    gradient: "from-blue-50 to-cyan-100 dark:from-blue-950/20 dark:to-cyan-950/30",
                    iconBg: "bg-blue-100 dark:bg-blue-900/40",
                    iconColor: "text-blue-600 dark:text-blue-400",
                    borderTop: "bg-gradient-to-r from-blue-500 to-cyan-500",
                    category: "Data"
                  },
                  // Analytics & Insights
                  {
                    gradient: "from-amber-50 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/30",
                    iconBg: "bg-amber-100 dark:bg-amber-900/40",
                    iconColor: "text-amber-600 dark:text-amber-400",
                    borderTop: "bg-gradient-to-r from-amber-500 to-orange-500",
                    category: "Analytics"
                  },
                  // Customer Experience
                  {
                    gradient: "from-purple-50 to-indigo-100 dark:from-purple-950/20 dark:to-indigo-950/30",
                    iconBg: "bg-purple-100 dark:bg-purple-900/40",
                    iconColor: "text-purple-600 dark:text-purple-400",
                    borderTop: "bg-gradient-to-r from-purple-500 to-indigo-500",
                    category: "Customer"
                  },
                  // Operations & Infrastructure
                  {
                    gradient: "from-slate-50 to-gray-100 dark:from-slate-950/20 dark:to-gray-950/30",
                    iconBg: "bg-slate-100 dark:bg-slate-900/40",
                    iconColor: "text-slate-600 dark:text-slate-400",
                    borderTop: "bg-gradient-to-r from-slate-500 to-gray-500",
                    category: "Operations"
                  },
                  // Finance & Reporting
                  {
                    gradient: "from-red-50 to-pink-100 dark:from-red-950/20 dark:to-pink-950/30",
                    iconBg: "bg-red-100 dark:bg-red-900/40",
                    iconColor: "text-red-600 dark:text-red-400",
                    borderTop: "bg-gradient-to-r from-red-500 to-pink-500",
                    category: "Finance"
                  },
                  // Communication
                  {
                    gradient: "from-teal-50 to-cyan-100 dark:from-teal-950/20 dark:to-cyan-950/30",
                    iconBg: "bg-teal-100 dark:bg-teal-900/40",
                    iconColor: "text-teal-600 dark:text-teal-400",
                    borderTop: "bg-gradient-to-r from-teal-500 to-cyan-500",
                    category: "Communication"
                  },
                  // Business Intelligence
                  {
                    gradient: "from-violet-50 to-purple-100 dark:from-violet-950/20 dark:to-purple-950/30",
                    iconBg: "bg-violet-100 dark:bg-violet-900/40",
                    iconColor: "text-violet-600 dark:text-violet-400",
                    borderTop: "bg-gradient-to-r from-violet-500 to-purple-500",
                    category: "Business"
                  }
                ];
                return themes[(id - 1) % themes.length];
              };

              const getWorkflowIcon = (id: number) => {
                const icons = [ShieldCheck, Database, BarChart3, Users, Server, FileSpreadsheet, MessageSquare, Briefcase];
                return icons[(id - 1) % icons.length];
              };

              const WorkflowIcon = getWorkflowIcon(w.id);
              const theme = getWorkflowTheme(w.id);
              
              return (
                <Card 
                  key={w.id} 
                  className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12),0_6px_20px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-[22px]"
                >
                  {/* Color-coded top border */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${theme.borderTop}`} />
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                        <WorkflowIcon className={`h-6 w-6 ${theme.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme.gradient} ${theme.iconColor} border border-current/20`}>
                            {theme.category}
                          </span>
                        </div>
                        <CardTitle className="text-base font-semibold text-[#0B0F19] dark:text-[#F9FAFB] leading-tight">
                          {w.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className={`p-3 rounded-lg ${theme.gradient} border border-current/10`}>
                      <div className="flex items-start gap-2 mb-1">
                        <Cpu className={`h-3 w-3 mt-0.5 ${theme.iconColor}`} />
                        <p className={`text-xs font-medium ${theme.iconColor} uppercase tracking-wider`}>
                          Tech Stack
                        </p>
                      </div>
                      <p className="text-sm text-[#0B0F19] dark:text-[#F9FAFB] font-medium">
                        {w.stack}
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-[#525252] dark:text-[#D1D5DB] leading-relaxed">
                        {w.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Return on Investment */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-[#DBEAFE]/10 via-white to-[#D1FAE5]/10 dark:from-[#0B0F19] dark:via-[#1F2937]/30 dark:to-[#0B0F19] print:py-6 print:bg-white print:break-before-page print:block">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#10B981] dark:text-[#34D399] mb-4">
              <BarChart3 className="h-4 w-4" />
              <span>Investment Analysis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B0F19] dark:text-[#F9FAFB] mb-3">
              Return on Investment Factors
            </h2>
            <p className="text-[#525252] dark:text-[#D1D5DB] max-w-2xl mx-auto text-sm md:text-base">
              Critical metrics to evaluate when choosing between open-source and proprietary AI platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 print:gap-3 print:grid-cols-3">
            {/* Time to Value */}
            <Card className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#0B0F19] dark:text-[#F9FAFB]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
                      <Rocket className="h-5 w-5 text-[#0A58D0]" />
                    </div>
                    Time to Value
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Fast</span>
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">Days to Weeks</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">n8n, LangChain, CrewAI</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Medium</span>
                    <Badge variant="outline" className="text-xs">Weeks to Months</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Azure, Google Vertex</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Slow</span>
                    <Badge variant="secondary" className="text-xs">Months to Quarters</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Custom solutions</p>
                </div>
              </CardContent>
            </Card>

            {/* Scalability Costs */}
            <Card className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#0B0F19] dark:text-[#F9FAFB]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-[#0A58D0]" />
                    </div>
                    Scalability Costs
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Linear</span>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">Predictable</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">n8n self-hosted</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Progressive</span>
                    <Badge variant="outline" className="text-xs">Tiered</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">LangChain</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50/30 dark:bg-orange-950/10 border border-orange-200/30 dark:border-orange-800/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Exponential</span>
                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs">Usage-based</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Cloud platforms</p>
                </div>
              </CardContent>
            </Card>

            {/* Switching Costs */}
            <Card className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#0B0F19] dark:text-[#F9FAFB]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#A78BFA] flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    Switching Costs
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/10 border border-purple-200/50 dark:border-purple-800/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Low</span>
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs">Portable</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Open source options</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">Medium</span>
                    <Badge variant="outline" className="text-xs">Some lock-in</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">LangChain, n8n</p>
                </div>
                <div className="p-3 rounded-lg bg-red-50/30 dark:bg-red-950/10 border border-red-200/30 dark:border-red-800/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">High</span>
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">Platform-specific</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Azure, Google</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open‑Source vs Proprietary - Practical Take */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-[#EDE9FE]/20 via-white to-[#DBEAFE]/20 dark:from-[#1F2937] dark:via-[#0B0F19] dark:to-[#1F2937] print:py-3 print:bg-white">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA] mb-4">
              <Library className="h-4 w-4" />
              <span>Decision Framework</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B0F19] dark:text-[#F9FAFB] mb-3">
              Open‑Source vs Proprietary — Practical Take
            </h2>
            <p className="text-[#525252] dark:text-[#D1D5DB] max-w-2xl mx-auto text-sm md:text-base">
              Choose the approach that aligns with your enterprise constraints and strategic objectives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-950/20">
                    <Library className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground mb-1">
                      Framework‑Agnostic Approach
                    </CardTitle>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">LangGraph, n8n</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-800/20">
                    <p className="text-sm text-[#0F766E] dark:text-[#10B981] font-semibold mb-1 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Advantages
                    </p>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">
                      Orchestrate across Azure & GCP; self‑host to keep data in VPC; avoid lock‑in; pair with LangSmith for evals/tracing.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/30 dark:border-amber-800/20">
                    <p className="text-sm text-[#DC2626] dark:text-[#F87171] font-semibold mb-1 flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Considerations
                    </p>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">
                      You own ops and SLAs when self‑hosting; budget for SRE/observability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-[#E5E7EB]/30 dark:border-[#374151]/30 bg-white dark:bg-[#1F2937] hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-blue-500" />
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg border border-sky-200/50 dark:border-sky-800/30 bg-sky-50/50 dark:bg-sky-950/20">
                    <Cloud className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground mb-1">
                      First‑Party Cloud Platform
                    </CardTitle>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">Azure Foundry • Vertex AI</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-800/20">
                    <p className="text-sm text-[#0F766E] dark:text-[#10B981] font-semibold mb-1 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Advantages
                    </p>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">
                      Native evals/observability, agent runtimes, identity, and governance inside each cloud; fastest path for in‑ecosystem clients.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/30 dark:border-amber-800/20">
                    <p className="text-sm text-[#DC2626] dark:text-[#F87171] font-semibold mb-1 flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Considerations
                    </p>
                    <p className="text-sm text-[#525252] dark:text-[#D1D5DB]">
                      Cross‑cloud portability lower than framework‑agnostic; pricing & quotas apply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <section className="relative border-t-2 border-[#0A58D0]/20 bg-gradient-to-br from-[#0A58D0]/5 via-[#8B5CF6]/5 to-[#DC2626]/5 dark:from-[#0A58D0]/10 dark:via-[#8B5CF6]/10 dark:to-[#DC2626]/10 print:bg-white print:border-0 print:break-before-page">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16 print:py-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA] mb-4">
              <Rocket className="h-4 w-4" />
              <span>Executive Action Plan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] dark:text-[#F9FAFB] mb-4">
              Your Path to AI Excellence
            </h2>
            <p className="text-lg text-[#525252] dark:text-[#D1D5DB] max-w-3xl mx-auto">
              Transform your enterprise with our proven framework. Join industry leaders who've accelerated their AI journey with Innovoco.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white dark:bg-[#1F2937] rounded-[22px] p-6 border border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#10B981]" />
                Strategic Implementation
              </h3>
              <ul className="space-y-3 text-[#525252] dark:text-[#D1D5DB] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Adopt two cloud pillars (Azure or Vertex) per client ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Use LangGraph for framework‑agnostic, long‑running orchestration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Offer hybrid/self‑host deployments for privacy‑sensitive accounts</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-[#1F2937] rounded-[22px] p-6 border border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0B0F19] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-[#8B5CF6]" />
                Quick-Start Accelerators
              </h3>
              <ul className="space-y-3 text-[#525252] dark:text-[#D1D5DB] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Bundle observability (Foundry/Vertex/LangSmith) and evals by default</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Package 8 enterprise workflows as quick‑start accelerators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0A58D0] mt-1">•</span>
                  <span>Enterprise-ready templates with compliance built-in</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block">
              <Button 
                onClick={() => setContactModalOpen(true)}
                size="lg" 
                className="group bg-gradient-to-r from-[#0A58D0] to-[#8B5CF6] hover:from-[#0A58D0]/90 hover:to-[#8B5CF6]/90 text-white rounded-full px-12 py-8 text-xl md:text-2xl font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(10,88,208,0.5)] hover:shadow-[0_12px_40px_rgba(10,88,208,0.7)] hover:scale-110 transform min-h-[80px] print:hidden">
                Schedule Executive Briefing
                <ArrowRight className="ml-4 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <div className="hidden print:block print:bg-blue-100 print:text-blue-900 print:px-6 print:py-4 print:rounded-lg print:text-center">
                <p className="print:text-lg print:font-semibold">Schedule Executive Briefing</p>
                <p className="print:text-sm print:mt-2">Contact: sales@innovoco.com | www.innovoco.com</p>
              </div>
              <p className="mt-4 text-sm md:text-base text-[#6B7280] dark:text-[#9CA3AF] font-medium print:text-gray-700">
                30-minute strategic consultation • No obligation
              </p>
            </div>
          </div>
        </div>
      </section>
      
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer onContactClick={() => setContactModalOpen(true)} />
      </div>

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
}

function KPI({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <Card className="group bg-white dark:bg-[#1F2937] border-[#E5E7EB]/30 dark:border-[#374151]/30 shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Icon className="h-5 w-5 text-[#0A58D0]" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-[#6B7280] dark:text-[#9CA3AF]">
              {title}
            </div>
            <div className="text-base font-semibold text-[#0B0F19] dark:text-[#F9FAFB]">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}