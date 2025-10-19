"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HardHat } from "lucide-react";

const faqs = [
  {
    question: "How accurate is AI roof damage detection compared to manual inspection?",
    answer: "Our computer vision models achieve 99.7% accuracy in detecting roof damage, which matches or exceeds experienced human inspectors. The AI is trained on millions of labeled roof images and can identify subtle damage patterns—like hail impacts or missing granules—that human eyes might miss. Importantly, AI provides consistent, objective assessments without variability between inspectors."
  },
  {
    question: "Do I need to buy expensive drone equipment to use AI property inspections?",
    answer: "No. Many of our clients use consumer-grade drones (DJI Mavic, Phantom) or even smartphones for property photos. Our AI works with standard image/video formats. For clients doing high-volume inspections, we can recommend commercial drone setups, but expensive equipment isn't required to get started."
  },
  {
    question: "How long does it take to generate an inspection report with AI?",
    answer: "Automated report generation typically takes 15-30 minutes from uploading inspection photos to receiving a completed PDF report. This compares to 2-4 hours for manual report writing. The AI handles damage labeling, photo annotation, repair cost estimation, and compliance documentation automatically—dramatically reducing administrative overhead."
  },
  {
    question: "Can your HVAC predictive maintenance integrate with existing building management systems?",
    answer: "Yes. Our IoT-based predictive maintenance solutions integrate with major building management systems (BMS) and HVAC control platforms via standard protocols (BACnet, Modbus, MQTT). We can pull data from existing sensors or deploy our own IoT hardware depending on your infrastructure. Most integrations are completed within 2-4 weeks."
  },
  {
    question: "What ROI can I expect from AI-powered construction solutions?",
    answer: "Typical ROI includes: 50% reduction in inspection time (labor savings), 84% faster report generation (increased throughput), 70% reduction in equipment breakdowns (reduced emergency service costs), and 40% energy savings from HVAC optimization. Most clients see positive ROI within 6-12 months, with payback accelerating as inspection/maintenance volume increases."
  },
  {
    question: "Do your AI solutions work for both commercial and residential construction?",
    answer: "Yes. Our computer vision models are trained on both commercial and residential properties—from single-family homes to multi-story commercial buildings. The AI adapts to different roof types (asphalt shingles, metal, tile, flat roofs), building materials, and property configurations. We can also customize models for specialized construction types (industrial, agricultural, etc.)."
  }
];

export function ConstructionFAQs() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center mx-auto mb-6">
            <HardHat className="h-8 w-8 text-[#D97706]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
            Construction AI FAQs
          </h2>
          <p className="text-lg text-[#525252]">
            Common questions about implementing AI in construction and home services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-gradient-to-br from-[#FEF3C7]/5 to-[#FDE68A]/5"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-semibold text-[#0B0F19] pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#525252] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
