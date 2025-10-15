'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Clock, 
  Target, 
  Shield, 
  Zap, 
  Brain,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Building2,
  Microscope,
  Rocket,
  FileText,
  Users,
  Database,
  LineChart,
  Workflow,
  Layers,
  GitBranch,
  BarChart3,
  Eye,
  Sparkles,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Briefcase,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AIDiscoveryWorkshopPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId)
  }

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch('/api/workshop-pdf')
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'AI-Discovery-Workshop-Executive-Brief.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 print:bg-white">
      {/* Page 1: Hero + Executive Summary Combined */}
      <div>
        {/* Hero Section - Compact for Print */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0A58D0] via-[#8B5CF6] to-[#DC2626] p-1" style={{backgroundImage: 'linear-gradient(to right, #0A58D0, #8B5CF6, #DC2626)', printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact'}}>
          <div className="bg-white/95 backdrop-blur print:bg-white">
            <div className="container mx-auto px-4 py-16 md:py-24 print:py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                className="max-w-5xl mx-auto text-center print:!opacity-100 print:!visible print:!block"
              >
                <Badge className="mb-4 px-6 py-2.5 text-sm font-semibold bg-[#0A58D0] text-white border-0 rounded-full shadow-sm print:mb-2">
                  Executive Strategy Framework
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold text-[#0B0F19] mb-6 leading-tight print:text-3xl print:mb-3">
                  AI Leadership Accelerator:
                  <span className="block mt-2 bg-gradient-to-r from-[#0A58D0] via-[#8B5CF6] to-[#DC2626] bg-clip-text text-transparent print:text-[#0A58D0] print:text-2xl">
                    From Discovery to Strategic Excellence
                  </span>
                </h1>
                
                <p className="text-xl text-[#525252] mb-8 max-w-3xl mx-auto leading-relaxed print:text-base print:mb-4">
                  A structured framework to assess your organization's AI readiness, identify strategic opportunities, 
                  and develop an actionable AI approach aligned with your business objectives.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center items-center mb-8 print:mb-0">
                  <div className="flex items-center gap-2 text-[#525252] print:text-sm">
                    <Clock className="h-5 w-5 text-[#0A58D0] print:h-4 print:w-4" />
                    <span className="font-medium">2 Hour Workshop</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#525252] print:text-sm">
                    <Users className="h-5 w-5 text-[#8B5CF6] print:h-4 print:w-4" />
                    <span className="font-medium">8-12 Senior Leaders</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#525252] print:text-sm">
                    <Target className="h-5 w-5 text-[#DC2626] print:h-4 print:w-4" />
                    <span className="font-medium">Strategic Moats</span>
                  </div>
                </div>

                <div className="flex gap-4 justify-center print:hidden">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#0A58D0] to-[#8B5CF6] hover:from-[#0A58D0]/90 hover:to-[#8B5CF6]/90 text-white rounded-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Schedule Executive Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="rounded-lg px-8 py-3 border-2 hover:bg-gray-50 transition-all duration-300"
                    onClick={downloadPDF}
                    disabled={isDownloading}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    {isDownloading ? 'Generating PDF...' : 'Download Executive Brief'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Executive Summary - Same Page */}
        <section className="py-16 bg-white print:py-4 print:block">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto print:!opacity-100 print:!visible print:!block"
              style={{ 
                ['--print-opacity' as any]: '1',
              }}
              animate={{ opacity: 1 }} // Force visible for PDF
              transition={{ duration: 0 }} // Instant for PDF
            >
              <Card className="border-0 shadow-xl rounded-[22px] overflow-hidden bg-gradient-to-br from-gray-50 to-white no-break-inside print:shadow-md">
                <CardHeader className="p-8 bg-gradient-to-r from-[#0A58D0]/5 via-[#8B5CF6]/5 to-[#DC2626]/5 print:p-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EDE9FE] to-[#A78BFA] flex items-center justify-center mb-4 print:w-7 print:h-7 print:mb-1">
                    <Briefcase className="h-8 w-8 text-[#8B5CF6] print:h-6 print:w-6" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-[#0B0F19] print:text-xl">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4 print:p-3 print:space-y-2">
                  <p className="text-lg text-[#525252] leading-relaxed print:text-sm">
                    In today's AI-driven economy, enterprises face a critical strategic decision: organizations that 
                    successfully deploy AI as a core competitive advantage will dominate their markets for the next decade, 
                    while those that fail to establish strategic AI capabilities risk obsolescence.
                  </p>
                  <p className="text-lg text-[#525252] leading-relaxed print:text-sm">
                    The AI Leadership Accelerator delivers proven frameworks to identify market opportunities, 
                    build competitive moats, and execute enterprise strategies that drive sustainable revenue growth through 
                    artificial intelligence deployment.
                  </p>
                  <div className="bg-gradient-to-r from-[#0A58D0]/10 via-[#8B5CF6]/10 to-[#DC2626]/10 rounded-2xl p-6 border-l-4 border-[#8B5CF6] print:p-2">
                    <p className="text-[#0B0F19] font-semibold print:text-sm">
                      90% of AI initiatives fail not due to technology limitations, but due to absence of strategic planning, 
                      unclear value propositions, and misaligned implementation approaches.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Philosophy & 18-Month Window - Page 2 for Print */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white print:break-before-page print:pt-6 print:pb-3">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto print:!opacity-100 print:!visible print:!block"
          >
            {/* Keep title and content together in print */}
            <div>
              <div className="text-center mb-12 print:mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                  Workshop Philosophy & Approach
                </h2>
                <p className="text-lg text-[#525252] max-w-3xl mx-auto print:text-xs print:leading-tight">
                  AI represents a fundamental business model transformation, not merely a technological upgrade
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-2">
              {[
                {
                  icon: Target,
                  title: "Strategic Positioning",
                  description: "Determining whether your organization should pioneer new AI-enabled markets, disrupt existing workflows, or enhance current capabilities through AI augmentation",
                  color: "from-[#DBEAFE] to-[#93C5FD]",
                  iconColor: "text-[#0A58D0]"
                },
                {
                  icon: Database,
                  title: "Value Architecture", 
                  description: "Designing systems where each user interaction generates proprietary data that continuously improves your AI capabilities, creating barriers to competitive entry",
                  color: "from-[#EDE9FE] to-[#A78BFA]",
                  iconColor: "text-[#8B5CF6]"
                },
                {
                  icon: LineChart,
                  title: "Economic Sustainability",
                  description: "Establishing unit economics that remain profitable at scale, avoiding the common trap where increased usage leads to unsustainable inference costs",
                  color: "from-[#FECACA] to-[#F87171]",
                  iconColor: "text-[#DC2626]"
                }
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full group bg-white border-border/30 hover:border-border/50 shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px]">
                    <CardHeader className="pb-4 print:pb-1 print:pt-2 print:px-2">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 print:w-8 print:h-8 print:mb-2`}>
                        <pillar.icon className={`h-7 w-7 ${pillar.iconColor} print:h-4 print:w-4`} />
                      </div>
                      <CardTitle className="text-xl print:text-lg print:font-semibold">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="print:pt-0 print:p-3">
                      <p className="text-sm text-[#525252] leading-relaxed print:text-sm print:leading-normal">{pillar.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Context Section - Same Page as Philosophy */}
      <section className="py-16 bg-white print:pt-4 print:pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto print:!opacity-100 print:!visible print:!block"
          >
            <div className="text-center mb-12 print:mb-3">
              <Badge className="mb-4 px-4 py-2 bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20 print:mb-1 print:px-2 print:py-0.5 print:text-[10px]">
                Market Urgency
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                The 18-Month Window
              </h2>
              <p className="text-lg text-[#525252] max-w-3xl mx-auto print:text-base">
                Organizations have approximately 18 months to establish defensible AI positions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 print:grid-cols-2 print:gap-3 print:mb-4">
              <Card className="border-0 shadow-lg rounded-[22px] bg-gradient-to-br from-white to-gray-50 print:shadow-sm">
                <CardHeader className="print:p-2">
                  <div className="flex items-center gap-3 mb-2 print:gap-2 print:mb-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#10B981] flex items-center justify-center print:w-6 print:h-6">
                      <TrendingUp className="h-5 w-5 text-[#0F766E] print:h-3 print:w-3" />
                    </div>
                    <CardTitle className="text-xl print:text-sm">Market Drivers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 print:space-y-1 print:p-2 print:pt-0">
                  {[
                    "Data Accumulation: Early movers building insurmountable advantages",
                    "Talent Concentration: AI expertise consolidating around clear strategies",
                    "Customer Expectations: AI capabilities becoming baseline requirements",
                    "Regulatory Landscape: Emerging frameworks favoring established implementations"
                  ].map((driver, index) => (
                    <div key={index} className="flex items-start gap-2 print:gap-1">
                      <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5 print:h-3 print:w-3 print:mt-0" />
                      <span className="text-sm text-[#525252] print:text-sm print:leading-normal">{driver}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-[22px] bg-gradient-to-br from-white to-gray-50 print:shadow-sm">
                <CardHeader className="print:p-2">
                  <div className="flex items-center gap-3 mb-2 print:gap-2 print:mb-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#F87171] flex items-center justify-center print:w-6 print:h-6">
                      <AlertTriangle className="h-5 w-5 text-[#DC2626] print:h-3 print:w-3" />
                    </div>
                    <CardTitle className="text-xl print:text-sm">Case Studies</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 print:space-y-2 print:p-2 print:pt-0">
                  <div>
                    <p className="font-semibold text-[#DC2626] text-sm mb-1 print:text-sm print:mb-1">Failure Pattern:</p>
                    <p className="text-sm text-[#525252] print:text-sm print:leading-normal">
                      Chegg lost 90% of market value within nine months when ChatGPT disrupted their homework assistance model
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#10B981] text-sm mb-1 print:text-sm print:mb-1">Success Pattern:</p>
                    <p className="text-sm text-[#525252] print:text-sm print:leading-normal">
                      Legal technology startup achieved $400M acquisition within 18 months through AI-powered document review
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pre-Workshop Section - Page 3 for Print */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white print:break-before-page print:pt-6 print:pb-4">
        <div className="container mx-auto px-4 print:px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto print:!opacity-100 print:!visible print:!block"
          >
            <div className="text-center mb-12 print:mb-3">
              <Badge className="mb-4 px-4 py-2 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20 print:mb-2 print:px-3 print:py-1">
                1-2 Weeks Before
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                Pre-Workshop Preparation
              </h2>
              <p className="text-lg text-[#525252] max-w-3xl mx-auto print:text-sm">
                Preliminary analysis conducted by our team to maximize workshop productivity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-2">
              {[
                {
                  icon: Microscope,
                  title: "Competitive Landscape Assessment",
                  color: "from-[#DBEAFE] to-[#93C5FD]",
                  iconColor: "text-[#0A58D0]",
                  items: [
                    "Mapping AI initiatives within your industry",
                    "Analyzing competitive positioning and market gaps",
                    "Identifying emerging threats and opportunities"
                  ]
                },
                {
                  icon: Database,
                  title: "Data Asset Inventory",
                  color: "from-[#EDE9FE] to-[#A78BFA]",
                  iconColor: "text-[#8B5CF6]",
                  items: [
                    "Cataloging existing proprietary data sources",
                    "Assessing data quality and strategic value",
                    "Identifying untapped data opportunities"
                  ]
                },
                {
                  icon: Workflow,
                  title: "Workflow Analysis",
                  color: "from-[#FECACA] to-[#F87171]",
                  iconColor: "text-[#DC2626]",
                  items: [
                    "Identifying high-impact processes for AI transformation",
                    "Calculating current process costs and inefficiencies",
                    "Determining automation potential and ROI"
                  ]
                },
                {
                  icon: Users,
                  title: "Stakeholder Alignment",
                  color: "from-[#D1FAE5] to-[#10B981]",
                  iconColor: "text-[#0F766E]",
                  items: [
                    "Ensuring appropriate participants and decision-makers",
                    "Pre-workshop briefings with key stakeholders",
                    "Aligning expectations and objectives"
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className=""
                >
                  <Card className="h-full group bg-white border-border/30 hover:border-border/50 shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300 rounded-[22px] print:shadow-sm print:rounded-lg print:h-auto">
                    <CardHeader className="pb-4 print:pb-1 print:pt-2 print:px-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 print:w-7 print:h-7 print:mb-1`}>
                        <section.icon className={`h-6 w-6 ${section.iconColor} print:h-4 print:w-4`} />
                      </div>
                      <CardTitle className="text-xl print:text-sm print:font-medium">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="print:p-2 print:pt-0">
                      <ul className="space-y-3 print:space-y-0.5">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 print:gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5 print:w-4 print:h-4 print:mt-0">
                              <CheckCircle className="h-3 w-3 text-[#0F766E] print:h-2.5 print:w-2.5" />
                            </div>
                            <span className="text-sm text-[#525252] leading-relaxed print:text-xs print:leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Structure - Page 4 for Print */}
      <section className="py-16 bg-white print:pt-4 print:pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
                Workshop Structure
              </h2>
              <p className="text-lg text-[#525252] mb-2">
                2-hour intensive session with 8-12 senior leaders
              </p>
              <p className="text-sm text-[#525252]/70 print:hidden">
                Click on each phase below to explore detailed activities and outcomes
              </p>
            </div>

            {/* Timeline Visual */}
            <div className="mb-12 relative hidden md:block print:block">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#0A58D0] via-[#8B5CF6] to-[#DC2626] transform -translate-y-1/2"></div>
              <div className="flex justify-between relative">
                {[
                  { time: "30 min", label: "Strategic Alignment", icon: Building2 },
                  { time: "30 min", label: "Opportunity Discovery", icon: Lightbulb },
                  { time: "30 min", label: "Economic Modeling", icon: LineChart },
                  { time: "30 min", label: "Prioritization", icon: Rocket }
                ].map((phase, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#8B5CF6] flex items-center justify-center mb-2 shadow-lg">
                      <phase.icon className="h-8 w-8 text-[#8B5CF6]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0B0F19]">{phase.label}</span>
                    <span className="text-xs text-[#525252] mt-1">{phase.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Details */}
            <div className="space-y-6">
              {/* Phase 1 - Page 5 for Print */}
              <div className="print:pt-8">
                <PhaseCard
                  phase="1"
                  title="Strategic Alignment & Market Positioning"
                  duration="30 minutes"
                  description="Establish strategic context and determine optimal market positioning"
                  icon={Building2}
                  color="from-[#0A58D0] to-[#2563EB]"
                  expanded={expandedPhase === 'phase1'}
                  onToggle={() => togglePhase('phase1')}
                >
                  <div className="space-y-6 pt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">AI Strategic Lens Application</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Market Lens:</strong> Analyzing competitive dynamics and identifying sustainable positioning
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Value Lens:</strong> Determining unique value propositions and defensibility mechanisms
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Execution Lens:</strong> Assessing organizational capabilities and resource requirements
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Positioning Matrix Exercise</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Pioneer Strategy:</strong> Creating entirely new AI-enabled business models
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Disruptor Strategy:</strong> Reimagining existing workflows with AI-first approaches
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Enhancement Strategy:</strong> Augmenting current capabilities with AI features
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Competitive Moat Architecture</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Data Moats:</strong> Proprietary information that improves model performance
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Behavioral Moats:</strong> User interaction patterns that create reinforcement loops
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            <strong>Workflow Moats:</strong> Deep integration into critical business processes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </PhaseCard>
              </div>

              {/* Phase 2 - Page 6 for Print */}
              <div className="print:pt-8">
                <PhaseCard
                  phase="2"
                  title="Opportunity Discovery & Solution Design"
                  duration="30 minutes"
                  description="Identify high-impact opportunities and design AI-native solutions"
                  icon={Lightbulb}
                  color="from-[#8B5CF6] to-[#A78BFA]"
                  expanded={expandedPhase === 'phase2'}
                  onToggle={() => togglePhase('phase2')}
                >
                  <div className="space-y-6 pt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Opportunity Mapping</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Document critical business problems where AI could deliver 10x improvement
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Prioritize based on value potential, technical feasibility, and data availability
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Apply the Double Diamond methodology (Divergent exploration → Convergent definition)
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Solution Ideation Framework</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Generate AI-native solutions (only possible with AI technology)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Assess platform dependency risks (avoiding over-reliance on third-party APIs)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Design proprietary feedback mechanisms for continuous improvement
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Assumption Testing Protocol</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { risk: "Value Risk", question: "Will customers pay for this capability?" },
                          { risk: "Usability Risk", question: "Can users effectively interact with AI features?" },
                          { risk: "Viability Risk", question: "Does the model remain profitable at scale?" },
                          { risk: "Feasibility Risk", question: "Can we achieve required accuracy?" },
                          { risk: "Ethical Risk", question: "Are there regulatory considerations?" }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <p className="font-medium text-xs text-[#8B5CF6] mb-1">{item.risk}</p>
                            <p className="text-xs text-[#525252]">{item.question}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PhaseCard>
              </div>

              {/* Phase 3 - Page 7 for Print */}
              <div className="print:pt-8">
                <PhaseCard
                  phase="3"
                  title="Economic Modeling & Scaling Strategy"
                  duration="30 minutes"
                  description="Ensure financial sustainability and design for exponential growth"
                  icon={LineChart}
                  color="from-[#DC2626] to-[#F87171]"
                  expanded={expandedPhase === 'phase3'}
                  onToggle={() => togglePhase('phase3')}
                >
                  <div className="space-y-6 pt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Unit Economics Analysis</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Calculate current inference costs per user/transaction
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Project costs at 10x, 100x, and 1000x current scale
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Identify break points where economics become unsustainable
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Value Loop Design</h4>
                      <div className="bg-gradient-to-r from-[#0A58D0]/5 to-[#8B5CF6]/5 rounded-xl p-4">
                        <p className="text-sm text-[#525252] font-medium text-center mb-3">
                          The Compounding Value Cycle
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <span className="px-3 py-1 bg-white rounded-lg shadow">User Action</span>
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                          <span className="px-3 py-1 bg-white rounded-lg shadow">Data Generation</span>
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                          <span className="px-3 py-1 bg-white rounded-lg shadow">Model Improvement</span>
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6]" />
                          <span className="px-3 py-1 bg-white rounded-lg shadow">Enhanced Value</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Pricing Strategy Framework</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <DollarSign className="h-5 w-5 text-[#0A58D0] mx-auto mb-1" />
                          <p className="text-xs font-medium text-[#0B0F19]">Usage-Based</p>
                          <p className="text-xs text-[#525252] mt-1">Per transaction/API call</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <Award className="h-5 w-5 text-[#8B5CF6] mx-auto mb-1" />
                          <p className="text-xs font-medium text-[#0B0F19]">Value-Based</p>
                          <p className="text-xs text-[#525252] mt-1">% of value created</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <Layers className="h-5 w-5 text-[#DC2626] mx-auto mb-1" />
                          <p className="text-xs font-medium text-[#0B0F19]">Hybrid Model</p>
                          <p className="text-xs text-[#525252] mt-1">Base + usage tiers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PhaseCard>
              </div>

              {/* Phase 4 - Page 8 for Print */}
              <div className="print:pt-8">
                <PhaseCard
                  phase="4"
                  title="Prioritization & Next Steps"
                  duration="30 minutes"
                  description="Establish clear priorities and immediate action items"
                  icon={Rocket}
                  color="from-[#0F766E] to-[#10B981]"
                  expanded={expandedPhase === 'phase4'}
                  onToggle={() => togglePhase('phase4')}
                >
                  <div className="space-y-6 pt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Initiative Portfolio Design</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#0F766E]">20%</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-[#0B0F19]">Quick Wins</p>
                            <p className="text-xs text-[#525252]">Demonstrable AI value within 30 days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#8B5CF6]">30%</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-[#0B0F19]">Core Capabilities</p>
                            <p className="text-xs text-[#525252]">Foundational features for 90-day delivery</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#0A58D0]/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#0A58D0]">50%</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-[#0B0F19]">Strategic Moats</p>
                            <p className="text-xs text-[#525252]">Long-term defensive advantages (6-12 months)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Risk Mitigation Planning</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Identify highest-risk assumptions requiring immediate validation
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Design minimum viable experiments for assumption testing
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Establish kill criteria for initiatives
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0B0F19]">Governance Framework</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Define decision rights and escalation paths
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Establish success metrics and monitoring cadence
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#525252]">
                            Assign executive sponsors and working team leads
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </PhaseCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section - Page 9 for Print */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white print:pt-4 print:page-break-before">
        <div className="container mx-auto px-4 print:px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto print:!opacity-100 print:!visible print:!block print:max-w-none"
          >
            <div className="text-center mb-12 print:mb-3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                Post-Workshop Deliverables
              </h2>
              <p className="text-lg text-[#525252] print:text-base">
                Comprehensive documentation and actionable frameworks
              </p>
            </div>

            {/* Immediate Deliverables */}
            <div className="mb-12 print:mb-4">
              <Badge className="mb-4 px-4 py-2 bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20 print:mb-2 print:px-3 print:py-1">
                Within 48 Hours
              </Badge>
              <div className="grid md:grid-cols-2 gap-6 mt-6 print:grid-cols-2 print:gap-2 print:mt-2">
                <Card className="bg-white border-border/30 shadow-sm rounded-[22px] print:rounded-lg">
                  <CardHeader className="print:p-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#F87171] flex items-center justify-center mb-3 print:w-8 print:h-8 print:mb-2">
                      <FileText className="h-5 w-5 text-[#DC2626] print:h-4 print:w-4" />
                    </div>
                    <CardTitle className="text-lg print:text-base">Executive Summary Report</CardTitle>
                  </CardHeader>
                  <CardContent className="print:p-3 print:pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Strategic positioning recommendation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Top 3 prioritized AI initiatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Critical risks and mitigation strategies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border/30 shadow-sm rounded-[22px] print:rounded-lg">
                  <CardHeader className="print:p-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#F87171] flex items-center justify-center mb-3 print:w-8 print:h-8 print:mb-2">
                      <BookOpen className="h-5 w-5 text-[#DC2626] print:h-4 print:w-4" />
                    </div>
                    <CardTitle className="text-lg print:text-base">Workshop Recording & Transcript</CardTitle>
                  </CardHeader>
                  <CardContent className="print:p-3 print:pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Complete session documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Key decision points highlighted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#525252]">Action items with assigned owners</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Week 1 Deliverables */}
            <div className="mb-12 print:mb-4">
              <Badge className="mb-4 px-4 py-2 bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 print:mb-2 print:px-3 print:py-1">
                Week 1
              </Badge>
              <div className="grid md:grid-cols-3 gap-6 mt-6 print:grid-cols-3 print:gap-2 print:mt-2">
                {[
                  {
                    icon: Target,
                    title: "AI Strategic Position Statement",
                    items: ["Formal articulation of AI strategy", "Competitive differentiation thesis", "Investment priorities"]
                  },
                  {
                    icon: GitBranch,
                    title: "Opportunity Solution Tree",
                    items: ["Visual mapping of opportunities", "Assumption inventory", "Dependencies and sequencing"]
                  },
                  {
                    icon: BarChart3,
                    title: "Economic Model Canvas",
                    items: ["Detailed unit economics", "Pricing strategy", "Investment requirements"]
                  }
                ].map((deliverable, index) => (
                  <Card key={index} className="bg-white border-border/30 shadow-sm rounded-[22px] print:rounded-lg">
                    <CardHeader className="print:p-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#A78BFA] flex items-center justify-center mb-3 print:w-8 print:h-8 print:mb-2">
                        <deliverable.icon className="h-5 w-5 text-[#8B5CF6] print:h-4 print:w-4" />
                      </div>
                      <CardTitle className="text-lg print:text-base">{deliverable.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="print:p-3 print:pt-0">
                      <ul className="space-y-2">
                        {deliverable.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[#525252]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Week 2 Deliverables */}
            <div>
              <Badge className="mb-4 px-4 py-2 bg-[#10B981]/10 text-[#0F766E] border-[#10B981]/20 print:mb-2 print:px-3 print:py-1">
                Week 2
              </Badge>
              <div className="grid md:grid-cols-3 gap-6 mt-6 print:grid-cols-3 print:gap-2 print:mt-2">
                {[
                  {
                    icon: Calendar,
                    title: "90-Day Implementation Roadmap",
                    items: ["Sprint-by-sprint execution plan", "Resource requirements", "Milestone definitions"]
                  },
                  {
                    icon: Microscope,
                    title: "Continuous Discovery Playbook",
                    items: ["Customer interview protocols", "Assumption testing frameworks", "Iteration decision criteria"]
                  },
                  {
                    icon: Shield,
                    title: "Risk Register & Mitigation",
                    items: ["Comprehensive risk assessment", "Probability and impact analysis", "Specific mitigation strategies"]
                  }
                ].map((deliverable, index) => (
                  <Card key={index} className="bg-white border-border/30 shadow-sm rounded-[22px] print:rounded-lg">
                    <CardHeader className="print:p-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#10B981] flex items-center justify-center mb-3 print:w-8 print:h-8 print:mb-2">
                        <deliverable.icon className="h-5 w-5 text-[#0F766E] print:h-4 print:w-4" />
                      </div>
                      <CardTitle className="text-lg print:text-base">{deliverable.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="print:p-3 print:pt-0">
                      <ul className="space-y-2">
                        {deliverable.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[#525252]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Methodology - Page 10 for Print */}
      <section className="py-16 bg-white print:pt-6 print:page-break-before">
        <div className="container mx-auto px-4 print:px-2">
          <div className="max-w-5xl mx-auto print:max-w-none">
            <div className="text-center mb-12 print:mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                Implementation Methodology
              </h2>
              <p className="text-lg text-[#525252] print:text-base">
                Dual-track development model for continuous value delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
              <Card className="border-0 shadow-xl rounded-[22px] bg-gradient-to-br from-[#DBEAFE]/20 to-white" style={{background: 'linear-gradient(to bottom right, rgba(219, 234, 254, 0.2), white)', printColorAdjust: 'exact'}}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
                      <Microscope className="h-5 w-5 text-[#0A58D0]" />
                    </div>
                    <CardTitle className="text-xl">Discovery Track</CardTitle>
                  </div>
                  <CardDescription>Continuous learning and validation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Weekly customer interviews to validate assumptions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Rapid prototype development for concept testing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Continuous competitive intelligence gathering</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Regular assumption testing and iteration</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-[22px] bg-gradient-to-br from-[#EDE9FE]/20 to-white" style={{background: 'linear-gradient(to bottom right, rgba(237, 233, 254, 0.2), white)', printColorAdjust: 'exact'}}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#A78BFA] flex items-center justify-center">
                      <Rocket className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    <CardTitle className="text-xl">Delivery Track</CardTitle>
                  </div>
                  <CardDescription>Execution and scaling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">2-week sprints for validated feature development</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Progressive rollout with careful monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Performance optimization and scaling</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#525252]">Integration with existing systems</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Metrics Framework */}
            <div className="mt-12 print:mt-6">
              <h3 className="text-2xl font-semibold text-[#0B0F19] mb-8 text-center print:text-xl print:mb-4">Success Metrics Framework</h3>
              <div className="grid md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
                <Card className="border-0 shadow-lg rounded-[22px] bg-gradient-to-br from-[#DBEAFE]/30 to-white" style={{background: 'linear-gradient(to bottom right, rgba(219, 234, 254, 0.3), white)', printColorAdjust: 'exact'}}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-[#0A58D0]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#0B0F19]">Leading Indicators</h4>
                        <p className="text-sm text-[#525252]">Weekly Monitoring</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Assumption validation rate",
                      "Prototype testing results", 
                      "User engagement metrics",
                      "Data accumulation velocity"
                    ].map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-[#0A58D0]" />
                        <span className="text-sm text-[#525252]">{metric}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-[22px] bg-gradient-to-br from-[#EDE9FE]/30 to-white" style={{background: 'linear-gradient(to bottom right, rgba(237, 233, 254, 0.3), white)', printColorAdjust: 'exact'}}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#A78BFA] flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#0B0F19]">Lagging Indicators</h4>
                        <p className="text-sm text-[#525252]">Monthly Review</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Revenue impact",
                      "Cost per inference trends",
                      "User retention rates",
                      "Competitive position changes"
                    ].map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                        <span className="text-sm text-[#525252]">{metric}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Engagement - Page 11 for Print */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white print:pt-6 print:page-break-before">
        <div className="container mx-auto px-4 print:px-2">
          <div className="max-w-5xl mx-auto print:max-w-none">
            <div className="text-center mb-12 print:mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4 print:text-2xl print:mb-2">
                Investment & Engagement Model
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 print:grid-cols-2 print:gap-4 print:mb-6">
              <Card className="border-0 shadow-xl rounded-[22px] print:bg-white print:border print:border-gray-200 print:rounded-lg">
                <CardHeader className="bg-gradient-to-r from-[#0A58D0]/5 to-[#8B5CF6]/5 print:bg-white print:p-4">
                  <CardTitle className="text-xl print:text-lg">Engagement Options</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4 print:p-4 print:pt-2 print:space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-[#0A58D0] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">On-site Facilitation</p>
                      <p className="text-sm text-[#525252]">Full-day engagement at your location</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">Virtual Delivery</p>
                      <p className="text-sm text-[#525252]">Structured online workshop with digital collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Layers className="h-5 w-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">Hybrid Model</p>
                      <p className="text-sm text-[#525252]">Core team on-site with remote stakeholders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-[22px] print:bg-white print:border print:border-gray-200 print:rounded-lg">
                <CardHeader className="bg-gradient-to-r from-[#8B5CF6]/5 to-[#DC2626]/5 print:bg-white print:p-4">
                  <CardTitle className="text-xl print:text-lg">Participant Requirements</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4 print:p-4 print:pt-2 print:space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">6-15 Participants</p>
                      <p className="text-sm text-[#525252]">Optimal group size for productive discussion</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-[#0A58D0] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">C-Suite Representation</p>
                      <p className="text-sm text-[#525252]">CEO, CTO/CIO, CPO, CFO participation required</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B0F19]">Decision Authority</p>
                      <p className="text-sm text-[#525252]">Participants must have budget and strategic authority</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why This Matters */}
            <Card className="border-0 shadow-xl rounded-[22px] bg-gradient-to-br from-[#0A58D0]/5 via-[#8B5CF6]/5 to-[#DC2626]/5 print:rounded-lg">
              <CardHeader className="text-center pb-4 print:p-4 print:pb-2">
                <CardTitle className="text-2xl print:text-xl">Why This Workshop Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 print:p-4 print:pt-2 print:space-y-4">
                <div>
                  <h4 className="font-semibold text-[#0B0F19] mb-3 print:text-base print:mb-2">The Strategic Imperative</h4>
                  <div className="grid md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
                    <div className="bg-white rounded-xl p-4 print:p-3">
                      <Sparkles className="h-6 w-6 text-[#10B981] mb-2 print:h-5 print:w-5 print:mb-1" />
                      <p className="font-medium text-sm text-[#0B0F19] mb-1">Category Leaders</p>
                      <p className="text-xs text-[#525252]">Establish AI moats to dominate markets with insurmountable advantages</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 print:p-3">
                      <Zap className="h-6 w-6 text-[#8B5CF6] mb-2 print:h-5 print:w-5 print:mb-1" />
                      <p className="font-medium text-sm text-[#0B0F19] mb-1">Fast Followers</p>
                      <p className="text-xs text-[#525252]">Face exponentially higher costs and inferior market positions</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 print:p-3">
                      <AlertTriangle className="h-6 w-6 text-[#DC2626] mb-2 print:h-5 print:w-5 print:mb-1" />
                      <p className="font-medium text-sm text-[#0B0F19] mb-1">Obsolete Incumbents</p>
                      <p className="text-xs text-[#525252]">Risk disruption or acquisition without AI transformation</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0B0F19] mb-3 print:text-base print:mb-2">Our Differentiation</h4>
                  <ul className="space-y-3 print:space-y-2">
                    <li className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-[#0A58D0] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-[#0B0F19]">20+ Years Enterprise Data Experience</p>
                        <p className="text-sm text-[#525252]">Deep expertise in data warehousing, BI, and analytics architecture</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-[#0B0F19]">Proven AI Implementation Methodology</p>
                        <p className="text-sm text-[#525252]">Battle-tested frameworks from real-world enterprise AI deployments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-[#0B0F19]">Practical, Actionable Frameworks</p>
                        <p className="text-sm text-[#525252]">Specific, implementable strategies tailored to your context</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Executive CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A58D0] via-[#8B5CF6] to-[#DC2626] print:hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center print:opacity-100 print:visible"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              AI Leadership Accelerator
            </h2>
            <p className="text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
              A structured framework to assess your organization's AI readiness, identify strategic opportunities, 
              and develop an actionable AI approach aligned with your business objectives.
            </p>
            <p className="text-lg text-white/80 mb-10">
              Limited availability for Q4 2025. Priority scheduling for enterprise organizations.
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#0A58D0] hover:bg-gray-100 rounded-lg px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Reserve Executive Session
              <Calendar className="ml-3 h-5 w-5" />
            </Button>
            <p className="text-sm text-white/60 mt-6">
              Contact for enterprise pricing and custom engagement options
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Note - Final Page for Print */}
      <footer className="py-8 bg-gray-50 border-t print:mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-[#525252] mb-2">
              © 2025 Innovoco AI & Automation. All rights reserved.
            </p>
            <p className="text-xs text-[#525252]">
              This workshop framework positions enterprises as strategic architects of their AI-enabled future,
              creating sustainable competitive advantages that define market leadership in the AI era.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Phase Card Component
function PhaseCard({ 
  phase, 
  title, 
  duration, 
  description, 
  icon: Icon, 
  color, 
  expanded, 
  onToggle, 
  children 
}: {
  phase: string
  title: string
  duration: string
  description: string
  icon: any
  color: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <Card className="border-0 shadow-lg rounded-[22px] overflow-hidden transition-all duration-300 hover:shadow-xl print:shadow-none">
      <div 
        className={`bg-gradient-to-r ${color} text-white cursor-pointer hover:brightness-110 transition-all print:cursor-default print:!bg-[#0A58D0] print:!text-white print:!opacity-100 print:!visible p-6 rounded-t-[22px]`}
        style={{ 
          printColorAdjust: 'exact', 
          WebkitPrintColorAdjust: 'exact',
          colorAdjust: 'exact'
        }}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between print:!opacity-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center print:!bg-white/30">
              <Icon className="h-7 w-7 text-white print:!text-white" />
            </div>
            <div className="print:!opacity-100">
              <div className="flex items-center gap-3 mb-1">
                <Badge className="bg-white/20 text-white border-0 px-2 py-1 print:!bg-white/30 print:!text-white">
                  Phase {phase}
                </Badge>
                <span className="text-sm font-medium text-white/90 print:!text-white">{duration}</span>
              </div>
              <h3 className="text-xl font-bold print:!text-white print:!opacity-100">{title}</h3>
              {description && (
                <p className="text-sm text-white/80 mt-1 print:!text-white/90">{description}</p>
              )}
            </div>
          </div>
          <ChevronRight className={`h-6 w-6 transition-transform duration-300 print:hidden ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      {expanded && (
        <CardContent className="p-6 bg-gray-50">
          {children}
        </CardContent>
      )}
      {/* Always show content for print */}
      <CardContent className="p-6 bg-gray-50 hidden print:block">
        {children}
      </CardContent>
    </Card>
  )
}