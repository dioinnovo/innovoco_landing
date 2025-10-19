"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, HeartPulse, TrendingUp, Factory, ShoppingCart } from "lucide-react";

const relatedIndustries = [
  {
    icon: HeartPulse,
    iconGradient: "bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]",
    title: "Healthcare & Life Sciences",
    description: "HIPAA-compliant AI automation and analytics for clinical excellence",
    href: "/solutions/industries/healthcare"
  },
  {
    icon: TrendingUp,
    iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
    title: "Financial Services",
    description: "Real-time fraud detection automation and risk analytics",
    href: "/solutions/industries/financial-services"
  },
  {
    icon: Factory,
    iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
    title: "Manufacturing & Industrial",
    description: "Industry 4.0 intelligent automation and predictive maintenance",
    href: "/solutions/industries/manufacturing"
  },
  {
    icon: ShoppingCart,
    iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
    title: "Retail & E-Commerce",
    description: "Customer 360 analytics and AI personalization",
    href: "/solutions/industries/retail"
  }
];

export function RelatedIndustries() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            Explore Other Industries
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto">
            Proven AI automation and analytics solutions across regulated industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedIndustries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={industry.href}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 rounded-[22px] border-border/30 hover:border-border/50 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${industry.iconGradient} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <industry.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2 group-hover:text-[#D97706] transition-colors">
                      {industry.title}
                    </CardTitle>
                    <CardDescription className="text-sm mb-4">
                      {industry.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-[#D97706] text-sm font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
