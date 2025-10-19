"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  icon?: LucideIcon;
  metric: string;
  label: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  gradient?: string;
  delay?: number;
}

export function MetricCard({
  icon: Icon,
  metric,
  label,
  description,
  trend,
  trendValue,
  gradient = "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
  delay = 0
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-[#10B981]" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-[#EF4444]" />;
      case "neutral":
        return <Minus className="h-4 w-4 text-[#6B7280]" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-[#10B981]";
      case "down":
        return "text-[#EF4444]";
      case "neutral":
        return "text-[#6B7280]";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className={`
        relative
        overflow-hidden
        rounded-[22px]
        bg-white
        border
        border-border/30
        hover:border-border/50
        shadow-sm
        hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]
        transition-all
        duration-300
        p-6
      `}>
        {/* Background Gradient Overlay */}
        <div className={`absolute inset-0 ${gradient} opacity-5`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {Icon && (
            <div className={`
              w-12 h-12
              rounded-xl
              ${gradient}
              flex items-center justify-center
              mb-4
              group-hover:scale-105
              transition-transform
              duration-300
              shadow-sm
            `}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          )}

          {/* Metric */}
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl md:text-5xl font-bold text-[#0B0F19]">
                {metric}
              </h3>
              {trend && trendValue && (
                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="text-sm font-semibold">{trendValue}</span>
                </div>
              )}
            </div>
          </div>

          {/* Label */}
          <p className="text-base font-semibold text-[#525252] mb-2">
            {label}
          </p>

          {/* Description */}
          {description && (
            <p className="text-sm text-[#6B7280] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Grid wrapper component for consistent layout
interface MetricGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function MetricGrid({ children, columns = 3 }: MetricGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-8`}>
      {children}
    </div>
  );
}
