"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SectionCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onClick: () => void;
}

export function SectionCTA({
  title,
  subtitle,
  buttonText,
  onClick
}: SectionCTAProps) {
  return (
    <motion.section
      className="py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-3">
          {title}
        </h3>
        <p className="text-base md:text-lg text-[#525252] mb-6 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button
          onClick={onClick}
          size="lg"
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 h-14 text-lg font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.section>
  );
}
