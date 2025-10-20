"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface IndustryFAQsProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

export function IndustryFAQs({
  faqs,
  title = "Frequently Asked Questions",
  description
}: IndustryFAQsProps) {
  // Generate FAQ schema for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup schema={faqSchema} />

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] mb-4">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-[#525252] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>

          {/* FAQ Accordion */}
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
                  className="
                    border
                    border-border/30
                    rounded-2xl
                    px-6
                    hover:border-border/50
                    hover:shadow-sm
                    transition-all
                    duration-300
                    bg-white
                  "
                >
                  <AccordionTrigger className="text-left font-semibold text-[#0B0F19] hover:text-[#0A58D0] py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#525252] leading-relaxed pb-5 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Pre-configured FAQ sets for the industry page

export const industryFAQs: FAQ[] = [
  {
    question: "How does AI automation improve operations across different industries?",
    answer: "AI automation transforms operations by analyzing data patterns to make intelligent decisions in real-time. In healthcare, it automates clinical decision support and patient risk stratification. In financial services, it powers real-time fraud detection and credit underwriting. In manufacturing, it enables predictive maintenance and quality control. In retail, it optimizes demand forecasting and personalization. Each industry benefits from reduced manual work, faster decision-making, and improved accuracy through intelligent automation tailored to specific sector challenges and regulations."
  },
  {
    question: "What analytics are most valuable for my industry?",
    answer: "The most valuable analytics vary by industry. Healthcare benefits from predictive patient analytics, readmission risk scoring, and clinical outcome analysis. Financial services gains from fraud pattern analytics, credit risk modeling, and market risk analysis. Manufacturing sees value in predictive maintenance analytics, quality control metrics, and supply chain optimization. Retail leverages customer behavior analytics, demand forecasting, and personalization engines. We help identify which analytics deliver the highest ROI for your specific industry challenges and business goals."
  },
  {
    question: "How long does AI automation implementation take?",
    answer: "Implementation timelines vary based on complexity and scope. A typical proof of concept (POC) takes 4-8 weeks. Production implementation ranges from 12-16 weeks for focused use cases to 6-12 months for comprehensive enterprise solutions. Healthcare and financial services may take longer due to regulatory compliance requirements (HIPAA, SOC 2, PCI-DSS). Manufacturing implementations depend on OT/IT integration complexity. We provide detailed timelines during discovery based on your specific requirements, existing infrastructure, and data readiness."
  },
  {
    question: "What ROI can I expect from AI automation and analytics?",
    answer: "ROI varies by industry and use case, but typical results include: Healthcare sees 15-25% reduction in readmissions and 30-40% faster diagnoses. Financial services achieves 40-60% reduction in fraud losses and 30-50% improvement in underwriting efficiency. Manufacturing realizes 30-50% downtime reduction and 15-25% improvement in forecast accuracy. Retail experiences 15-25% conversion lift and 20-30% reduction in inventory costs. We provide industry-specific ROI modeling during consultation based on your baseline metrics and implementation scope."
  },
  {
    question: "Is my industry data compliant and secure with AI automation?",
    answer: "Yes, we design all AI automation and analytics solutions with industry-specific compliance from the start. Healthcare solutions are HIPAA-compliant with BAAs, encryption, audit logging, and PHI de-identification. Financial services implementations meet SOC 2, PCI-DSS, and regulatory requirements (GLBA, Dodd-Frank, Basel III). Manufacturing solutions secure OT/IT integration with proper network segmentation. Retail platforms comply with GDPR, CCPA, and PCI-DSS for payment data. We conduct security assessments, implement required controls, and support compliance audits."
  },
  {
    question: "Can AI automation integrate with my existing industry systems?",
    answer: "Yes, our solutions integrate with industry-specific platforms. For healthcare: Epic, Cerner, Allscripts EHR systems. For financial services: FIS, Temenos, SAP core banking systems. For manufacturing: SAP, Oracle ERP, Siemens/Rockwell MES platforms, and IoT systems via OPC UA and MQTT. For retail: Oracle Retail, SAP Commerce, Salesforce, and major e-commerce platforms. We have deep integration experience with these systems and understand their data models, APIs, and customization patterns, accelerating implementation and reducing integration risk."
  },
  {
    question: "What makes your AI automation different from competitors?",
    answer: "Our advantage is deep industry expertise combined with technical excellence. We've delivered 500+ AI automation and analytics solutions over 10+ years across healthcare, financial services, manufacturing, and retail. We understand industry-specific challenges: HIPAA compliance for healthcare, real-time fraud detection for finance, OT/IT integration for manufacturing, omnichannel analytics for retail. Our team includes compliance specialists, industry veterans, and AI engineers who design solutions that meet both business and regulatory requirements. We deliver proven patterns, not generic frameworks adapted on the fly."
  },
  {
    question: "Do you provide ongoing support after AI automation deployment?",
    answer: "Yes, we offer comprehensive managed AI services with 24/7 monitoring, model performance management, continuous optimization, and SLA-backed support. Our managed services include real-time alerting for model drift, automated retraining pipelines, infrastructure management, and regular performance reviews. We provide Essential, Professional, and Enterprise tiers based on your support needs. Most clients choose managed services to ensure their AI automation continues delivering value, stays current with evolving data patterns, and meets changing business requirements without building internal MLOps teams."
  }
];
