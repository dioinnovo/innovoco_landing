"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, FileText, Wrench, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    icon: Camera,
    company: "National Roofing Company",
    industry: "Roofing",
    title: "AI Roof Inspections Reduce Inspection Time by 55%",
    challenge: "Manual roof inspections required climbing, photography, and 3+ hours per report. Safety risks and slow turnaround limited growth.",
    solution: "Deployed AI-powered drone inspections with automated damage detection and report generation. Computer vision identifies hail damage, missing shingles, and structural issues automatically.",
    results: [
      "55% reduction in inspection time",
      "99.7% damage detection accuracy",
      "Zero safety incidents from roof climbing",
      "3x increase in daily inspection capacity"
    ],
    metrics: [
      { label: "Inspection Time", value: "55% ↓" },
      { label: "Daily Capacity", value: "3x ↑" },
      { label: "Accuracy", value: "99.7%" }
    ],
    gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
  },
  {
    icon: FileText,
    company: "Property Insurance Provider",
    industry: "Insurance",
    title: "Automated Inspection Reports Cut Processing Time by 84%",
    challenge: "Property underwriters spent 3-4 hours manually creating inspection reports. Backlog and slow turnaround hurt customer experience.",
    solution: "Implemented AI-powered report automation that generates professional PDF reports from inspection photos in 30 minutes. NLG creates damage descriptions, cost estimates, and compliance documentation automatically.",
    results: [
      "84% reduction in report generation time",
      "10x increase in daily report output",
      "Consistent formatting and quality",
      "100% compliance documentation coverage"
    ],
    metrics: [
      { label: "Report Time", value: "84% ↓" },
      { label: "Daily Output", value: "10x ↑" },
      { label: "Compliance", value: "100%" }
    ],
    gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
  },
  {
    icon: Wrench,
    company: "Commercial HVAC Services",
    industry: "HVAC",
    title: "Predictive Maintenance Reduces Equipment Failures by 70%",
    challenge: "Reactive maintenance led to frequent equipment breakdowns, emergency service calls, and high energy costs. Customer dissatisfaction from downtime.",
    solution: "Deployed IoT sensors across customer HVAC systems with ML-based failure prediction. AI monitors temperature, vibration, and performance to schedule proactive maintenance weeks in advance.",
    results: [
      "70% reduction in emergency breakdowns",
      "40% energy cost savings",
      "25% lower maintenance costs",
      "95% customer satisfaction scores"
    ],
    metrics: [
      { label: "Breakdowns", value: "70% ↓" },
      { label: "Energy Costs", value: "40% ↓" },
      { label: "Satisfaction", value: "95%" }
    ],
    gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
  }
];

export function ConstructionCaseStudies() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            Construction AI Success Stories
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Real results from construction and home services companies transforming operations with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white border-border/30 hover:border-[#D97706]/50 hover:shadow-lg transition-all duration-300 rounded-[22px]">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${study.gradient} flex items-center justify-center mb-4`}>
                    <study.icon className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]">
                      {study.industry}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-[#0B0F19]">
                    {study.company}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#0B0F19] mb-2">Challenge</h4>
                    <p className="text-sm text-[#525252]">{study.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#0B0F19] mb-2">Solution</h4>
                    <p className="text-sm text-[#525252]">{study.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B0F19] mb-3">Results</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-3 rounded-lg bg-gradient-to-br from-[#FEF3C7]/30 to-[#FDE68A]/20">
                          <div className="text-lg font-bold text-[#D97706]">{metric.value}</div>
                          <div className="text-xs text-[#525252]">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {study.results.slice(0, 3).map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#525252]">
                        <ArrowRight className="h-4 w-4 text-[#D97706] mt-0.5 flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
