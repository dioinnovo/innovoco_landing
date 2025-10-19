"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TrustIndicator {
  metric: string;
  label: string;
}

interface ServiceHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  trustIndicators: TrustIndicator[];
  primaryCTA?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundGradient?: string;
}

export function ServiceHero({
  badge,
  title,
  subtitle,
  description,
  trustIndicators,
  primaryCTA,
  secondaryCTA,
  backgroundGradient = "bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#FECACA]"
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Background with 3D Fluent gradient */}
      <div className={`absolute inset-0 ${backgroundGradient}`} />
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 container mx-auto max-w-5xl text-center px-4">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 text-sm font-semibold tracking-wide uppercase text-blue-600 bg-blue-50/80 rounded-full border-2 border-blue-200"
          >
            <CheckCircle className="h-4 w-4" />
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0F19] mb-4 leading-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#0A58D0] font-semibold mb-6"
        >
          {subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg text-[#525252] max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
        >
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur border border-border/30 rounded-2xl p-4 shadow-sm hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)] transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#0A58D0] mb-1">
                {indicator.metric}
              </div>
              <div className="text-sm text-[#525252]">{indicator.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {primaryCTA && (
            <Button
              size="lg"
              onClick={primaryCTA.onClick}
              className="
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                px-8
                py-6
                text-base
                font-medium
                rounded-lg
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}

          {secondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="
                border-2
                border-[#0A58D0]
                text-[#0A58D0]
                hover:bg-[#0A58D0]/10
                px-8
                py-6
                text-base
                font-medium
                rounded-lg
              "
            >
              <a href={secondaryCTA.href}>
                {secondaryCTA.text}
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
