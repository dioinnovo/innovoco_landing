"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { IndustryCaseStudy } from "@/lib/content/industries/types";

interface IndustryCaseStudiesProps {
  badge: string;
  title: string;
  description: string;
  studies: IndustryCaseStudy[];
  gradientBackground?: string;
}

export function IndustryCaseStudies({
  badge,
  title,
  description,
  studies,
  gradientBackground = "bg-gradient-to-br from-[#FEF2F2] via-white to-[#FEE2E2]"
}: IndustryCaseStudiesProps) {
  return (
    <section className={`py-16 md:py-20 px-4 ${gradientBackground}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            {badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {studies.map((caseStudy, index) => {
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
                        <p className="text-xs text-[#2563EB] font-semibold">
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
                          className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50"
                        >
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="text-lg font-bold text-[#2563EB]">
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
