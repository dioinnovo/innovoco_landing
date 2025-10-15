"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Brain, Rocket, Zap } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  iconGradient: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  delay: number;
}

const ServiceCardComponent = ({
  icon,
  iconGradient,
  title,
  description,
  href,
  ctaText,
  delay
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
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
        flex
        flex-col
      ">
        <CardHeader className="pb-3 flex-grow">
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
            {icon}
          </div>

          <CardTitle className="text-xl font-semibold text-[#0B0F19] mb-2 leading-tight">
            {title}
          </CardTitle>

          <CardDescription className="text-sm text-[#525252] leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 border-t border-border/20">
          <Link href={href}>
            <Button
              variant="ghost"
              className="
                w-full
                justify-between
                text-[#0A58D0]
                hover:text-[#084BB3]
                hover:bg-[#DBEAFE]/30
                transition-all
                duration-300
                group/btn
                rounded-full
              "
            >
              <span className="font-medium">{ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function ServiceCards() {
  const services = [
    {
      icon: <Brain className="h-8 w-8 text-[#0A58D0]" />,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Implementation",
      description: "From vision to production in 12-16 weeks. Proven AI roadmaps, LLM integration, custom agents, and enterprise MLOps that deliver 171% ROI.",
      href: "/services/ai-strategy-consulting",
      ctaText: "Explore AI Services",
      delay: 0.1
    },
    {
      icon: <Database className="h-8 w-8 text-[#0F766E]" />,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "10+ years building AI-ready data platforms. Real-time cloud warehouses on AWS, BigQuery, or Snowflake—3x faster insights, 40% lower costs.",
      href: "/services/data-engineering-modernization",
      ctaText: "See Data Services",
      delay: 0.2
    },
    {
      icon: <Zap className="h-8 w-8 text-[#7C3AED]" />,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Managed AI Operations",
      description: "24/7 monitoring, continuous optimization, and SLA-backed support. Your AI stays sharp and cost-efficient with 99.9% uptime.",
      href: "/services/managed-ai-services",
      ctaText: "Discover Managed Services",
      delay: 0.3
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
            How We Transform Your Business
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            From strategic planning to 24/7 operations, we provide end-to-end AI and data services
            that turn your data warehouse into an intelligent business partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCardComponent key={index} {...service} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="
                border-2
                border-[#0A58D0]
                text-[#0A58D0]
                hover:bg-[#DBEAFE]/50
                hover:border-[#084BB3]
                transition-all
                duration-300
                rounded-full
                px-8
                h-14
                text-base
                font-medium
              "
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
