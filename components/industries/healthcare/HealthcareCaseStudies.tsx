"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, TrendingDown, TrendingUp, Target, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CaseStudy {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; label: string; trend?: "up" | "down" }>;
}

const healthcareCaseStudies: CaseStudy[] = [
  {
    icon: TrendingDown,
    iconGradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
    title: "Regional Hospital Network Readmission Reduction",
    industry: "Healthcare | Multi-Hospital System",
    challenge: "15-hospital network facing $2.3M annual penalties from CMS for excessive 30-day readmissions, particularly in CHF and COPD patients.",
    solution: "Deployed ML-powered readmission risk stratification integrated with Epic EHR. Real-time scoring at discharge identifies high-risk patients (75-85% accuracy) triggering automated care coordination workflows.",
    results: [
      { metric: "25%", label: "Readmission Reduction", trend: "down" },
      { metric: "$1.8M", label: "Annual Penalty Savings" },
      { metric: "100%", label: "HIPAA Compliant" }
    ]
  },
  {
    icon: Activity,
    iconGradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
    title: "Medical Imaging AI for Academic Medical Center",
    industry: "Healthcare | Academic Medical Center",
    challenge: "Radiology department overwhelmed with 500+ daily imaging studies. Average turnaround time of 36 hours causing treatment delays and patient dissatisfaction.",
    solution: "Implemented AI-assisted radiology platform for chest X-rays and CT scans. Computer vision models (trained on NIH ChestX-ray14 + MIMIC datasets) flag abnormalities for radiologist review, prioritizing urgent cases.",
    results: [
      { metric: "90%+", label: "Diagnostic Sensitivity" },
      { metric: "18 hrs", label: "Turnaround Time Reduction", trend: "down" },
      { metric: "40%", label: "Fewer Diagnostic Errors", trend: "down" }
    ]
  },
  {
    icon: Target,
    iconGradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
    title: "Population Health Management Platform",
    industry: "Healthcare | Accountable Care Organization",
    challenge: "ACO managing 125,000 Medicare beneficiaries struggled to identify high-risk patients for proactive interventions, resulting in poor quality scores and shared savings.",
    solution: "Built predictive analytics platform integrated with multiple EHRs (Epic, Cerner, Allscripts). Chronic disease risk scoring, gap-in-care identification, and automated outreach for preventive services.",
    results: [
      { metric: "30%", label: "Care Management Cost Reduction" },
      { metric: "22%", label: "Preventive Care Completion", trend: "up" },
      { metric: "$4.2M", label: "Shared Savings Generated" }
    ]
  },
  {
    icon: TrendingUp,
    iconGradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
    title: "Sepsis Early Warning System",
    industry: "Healthcare | Critical Care Network",
    challenge: "350-bed hospital with sepsis mortality rate of 28% (above national average of 20%). Delayed recognition in 40% of cases leading to preventable deaths.",
    solution: "Deployed real-time sepsis detection using EHR data streams (vital signs, lab results, clinical notes). ML model alerts clinicians 6-12 hours before clinical manifestation, enabling early antibiotic administration.",
    results: [
      { metric: "18%", label: "Sepsis Mortality Rate", trend: "down" },
      { metric: "6-12 hrs", label: "Early Detection Window" },
      { metric: "35%", label: "ICU Length of Stay Reduction", trend: "down" }
    ]
  }
];

export function HealthcareCaseStudies() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#FEF2F2] via-white to-[#FEE2E2]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold mb-4">
            Proven Results
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            Healthcare AI Success Stories
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Real-world results from healthcare providers who've transformed patient outcomes and operational efficiency with HIPAA-compliant AI solutions
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {healthcareCaseStudies.map((caseStudy, index) => {
            const Icon = caseStudy.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="
                  group
                  h-full
                  bg-white
                  border-border/30
                  hover:border-border/50
                  shadow-sm
                  hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]
                  transition-all
                  duration-300
                  rounded-[22px]
                  overflow-hidden
                ">
                  <CardHeader className="pb-4">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`
                        w-14 h-14
                        rounded-xl
                        ${caseStudy.iconGradient}
                        flex items-center justify-center
                        flex-shrink-0
                        group-hover:scale-105
                        transition-transform
                        duration-300
                        shadow-sm
                      `}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#0B0F19] mb-1 leading-tight">
                          {caseStudy.title}
                        </h3>
                        <p className="text-xs text-[#DC2626] font-semibold">
                          {caseStudy.industry}
                        </p>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-[#0B0F19] mb-1">Challenge</h4>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#0B0F19] mb-1">Solution</h4>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 border-t border-border/20">
                    <h4 className="text-sm font-semibold text-[#0B0F19] mb-3">Results</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {caseStudy.results.map((result, idx) => (
                        <div
                          key={idx}
                          className="text-center p-3 rounded-xl bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] border border-[#FCA5A5]/20"
                        >
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="text-lg font-bold text-[#DC2626]">
                              {result.metric}
                            </span>
                            {result.trend === "down" && (
                              <TrendingDown className="h-4 w-4 text-[#0F766E]" />
                            )}
                            {result.trend === "up" && (
                              <TrendingUp className="h-4 w-4 text-[#0F766E]" />
                            )}
                          </div>
                          <p className="text-xs text-[#525252] leading-tight">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
