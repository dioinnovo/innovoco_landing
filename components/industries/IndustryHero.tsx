"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TrustIndicator {
  metric: string;
  label: string;
}

interface IndustryHeroProps {
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
    href?: string;
    onClick?: () => void;
  };
  backgroundGradient?: string;
  image?: string;
  videoUrl?: string;
}

export function IndustryHero({
  badge,
  title,
  subtitle,
  description,
  trustIndicators,
  primaryCTA,
  secondaryCTA,
  backgroundGradient = "bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#FECACA]",
  image,
  videoUrl
}: IndustryHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide uppercase text-teal-700 bg-teal-50 rounded-full border border-teal-200"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                {badge}
              </motion.div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0F19] leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#0A58D0] font-semibold">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-[#525252] leading-relaxed">
              {description}
            </p>

            {/* Trust Indicators Grid */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                  className="text-left"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#0A58D0] mb-1">
                    {indicator.metric}
                  </div>
                  <div className="text-sm text-[#525252]">{indicator.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    font-semibold
                    rounded-full
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    group
                  "
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {secondaryCTA && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={secondaryCTA.onClick}
                  className="
                    border-2
                    border-[#0A58D0]
                    text-[#0A58D0]
                    hover:bg-[#0A58D0]
                    hover:text-white
                    px-8
                    py-6
                    text-base
                    font-semibold
                    rounded-full
                    transition-all
                    duration-300
                  "
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right Side - Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className={`absolute inset-0 ${backgroundGradient} opacity-20 rounded-3xl blur-3xl`} />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/20">
              {videoUrl ? (
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* Video placeholder with play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-[#2563EB] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* You can add actual video element here */}
                </div>
              ) : image ? (
                <div className="relative aspect-video">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                /* Default gradient visual */
                <div className={`aspect-video ${backgroundGradient} relative overflow-hidden`}>
                  {/* Animated decorative elements */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-500" />
                  </div>

                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-white/20" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating badges/metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-border/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0B0F19]">Proven Results</div>
                  <div className="text-xs text-[#525252]">500+ Enterprises</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-border/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0B0F19]">Fast ROI</div>
                  <div className="text-xs text-[#525252]">6-12 Months</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
