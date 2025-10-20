"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { RelatedIndustry } from "@/lib/content/industries/types";

interface IndustryCardProps extends RelatedIndustry {
  delay: number;
  metrics?: Array<{ label: string; value: string }>;
}

const IndustryCardComponent = ({
  icon: Icon,
  gradient,
  title,
  description,
  metrics,
  href,
  delay
}: IndustryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
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
          flex
          flex-col
          cursor-pointer
        ">
          <CardHeader className="pb-4 flex-grow">
            {/* Icon Container with 3D Fluent styling */}
            <div className={`
              w-16 h-16
              rounded-xl
              ${gradient}
              flex items-center justify-center
              mb-4
              group-hover:scale-105
              transition-transform
              duration-300
              shadow-sm
            `}>
              <Icon className="h-8 w-8 text-white" />
            </div>

            <CardTitle className="text-xl font-semibold text-[#0B0F19] mb-2 leading-tight">
              {title}
            </CardTitle>

            <CardDescription className="text-sm text-[#525252] leading-relaxed mb-4">
              {description}
            </CardDescription>

            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-2.5 w-2.5 text-blue-600" />
                    </div>
                    <p className="text-xs text-[#525252]">
                      <span className="font-semibold text-[#0B0F19]">{metric.value}</span> {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-4 border-t border-border/20">
            <div
              className="
                w-full
                flex items-center justify-between
                text-[#0A58D0]
                group-hover:text-[#084BB3]
                transition-all
                duration-300
                px-2 py-1
              "
            >
              <span className="font-medium">Explore Solutions</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

interface IndustryRelatedLinksProps {
  industries: (RelatedIndustry & { metrics?: Array<{ label: string; value: string }> })[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

export function IndustryRelatedLinks({
  industries,
  title = "Explore AI Solutions for Other Industries",
  description = "Discover how we deliver intelligent automation and advanced analytics across multiple sectors.",
  showViewAll = true
}: IndustryRelatedLinksProps) {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-2xl">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <IndustryCardComponent key={index} {...industry} delay={index * 0.1} />
          ))}
        </div>

        {/* Link to main industries page */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link
              href="/solutions/industries"
              className="inline-flex items-center gap-2 text-[#0A58D0] hover:text-[#084BB3] font-medium transition-colors"
            >
              View All Industry Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
