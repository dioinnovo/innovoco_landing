"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Factory, ShoppingCart, CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface IndustryCardProps {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  href: string;
  delay: number;
}

const IndustryCardComponent = ({
  icon: Icon,
  iconGradient,
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
              ${iconGradient}
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
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-2.5 w-2.5 text-[#0F766E]" />
                  </div>
                  <p className="text-xs text-[#525252]">
                    <span className="font-semibold text-[#0B0F19]">{metric.value}</span> {metric.label}
                  </p>
                </div>
              ))}
            </div>
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

export function RelatedIndustries() {
  const industries = [
    {
      icon: TrendingUp,
      iconGradient: "bg-gradient-to-br from-[#10B981] to-[#059669]",
      title: "Financial Services & Banking",
      description: "Real-time fraud detection automation, risk analytics, and regulatory compliance solutions.",
      metrics: [
        { value: "$50M+", label: "Fraud Savings Delivered" },
        { value: "95%+", label: "Fraud Detection Rate" },
        { value: "<100ms", label: "Transaction Scoring" }
      ],
      href: "/solutions/industries/financial-services",
      delay: 0.1
    },
    {
      icon: Factory,
      iconGradient: "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]",
      title: "Manufacturing & Industrial",
      description: "Industry 4.0 intelligent automation, predictive maintenance, and supply chain optimization.",
      metrics: [
        { value: "30-50%", label: "Downtime Reduction" },
        { value: "99%+", label: "Defect Detection" },
        { value: "15-25%", label: "Forecast Improvement" }
      ],
      href: "/solutions/industries/manufacturing",
      delay: 0.2
    },
    {
      icon: ShoppingCart,
      iconGradient: "bg-gradient-to-br from-[#3B82F6] to-[#2563EB]",
      title: "Retail & E-Commerce",
      description: "Customer 360 analytics, AI personalization, demand forecasting, and dynamic pricing automation.",
      metrics: [
        { value: "28%", label: "Avg Revenue Increase" },
        { value: "15-25%", label: "Conversion Lift" },
        { value: "20-30%", label: "Forecast Error Reduction" }
      ],
      href: "/solutions/industries/retail",
      delay: 0.3
    },
  ];

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
            Explore AI Solutions for Other Industries
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Discover how we deliver intelligent automation and advanced analytics across financial services,
            manufacturing, and retail sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <IndustryCardComponent key={index} {...industry} />
          ))}
        </div>

        {/* Link to main industries page */}
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
      </div>
    </section>
  );
}
