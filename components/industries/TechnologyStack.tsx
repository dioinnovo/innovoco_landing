"use client";

import { motion } from "framer-motion";
import { Database, Cloud, Server, Cpu, Lock, Zap } from "lucide-react";

interface TechnologyItem {
  name: string;
  category: string;
  icon?: React.ReactNode;
}

interface TechnologyStackProps {
  title?: string;
  description?: string;
  technologies: TechnologyItem[];
  columns?: 3 | 4 | 5 | 6;
}

export function TechnologyStack({
  title = "Technology Integrations",
  description,
  technologies,
  columns = 6
}: TechnologyStackProps) {
  const gridCols = {
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-3 sm:grid-cols-5",
    6: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
  };

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyItem[]>);

  return (
    <div className="my-12 py-8 px-6 rounded-[22px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-border/30">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-[#0B0F19] mb-2"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base text-[#525252] max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Technologies Grid */}
      <div className="space-y-8">
        {Object.entries(groupedTechnologies).map(([category, techs], categoryIndex) => (
          <div key={category}>
            {/* Category Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-4"
            >
              <h4 className="text-sm font-semibold text-[#525252] uppercase tracking-wide">
                {category}
              </h4>
            </motion.div>

            {/* Technology Cards */}
            <div className={`grid ${gridCols[columns]} gap-4`}>
              {techs.map((tech, index) => (
                <motion.div
                  key={`${category}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="group"
                >
                  <div className="
                    relative
                    h-20
                    flex items-center justify-center
                    rounded-xl
                    bg-white
                    border border-border/30
                    hover:border-border/50
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                    group-hover:scale-105
                    p-4
                  ">
                    {tech.icon ? (
                      <div className="text-[#0A58D0]">
                        {tech.icon}
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-[#0B0F19] text-center">
                        {tech.name}
                      </span>
                    )}

                    {/* Tooltip on hover */}
                    <div className="
                      absolute
                      bottom-full
                      left-1/2
                      transform
                      -translate-x-1/2
                      mb-2
                      px-3
                      py-1.5
                      bg-[#0B0F19]
                      text-white
                      text-xs
                      rounded-lg
                      whitespace-nowrap
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-200
                      pointer-events-none
                      z-10
                    ">
                      {tech.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#0B0F19]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pre-configured technology stacks for each industry

export const healthcareTechnologies: TechnologyItem[] = [
  { name: "Epic", category: "EHR Systems" },
  { name: "Cerner", category: "EHR Systems" },
  { name: "Allscripts", category: "EHR Systems" },
  { name: "Meditech", category: "EHR Systems" },
  { name: "Azure Health Data Services", category: "Cloud Platforms" },
  { name: "Google Cloud Healthcare API", category: "Cloud Platforms" },
  { name: "AWS HealthLake", category: "Cloud Platforms" },
  { name: "FHIR", category: "Data Standards" },
  { name: "HL7", category: "Data Standards" },
  { name: "DICOM", category: "Data Standards" },
];

export const financialTechnologies: TechnologyItem[] = [
  { name: "FIS", category: "Core Banking" },
  { name: "Temenos", category: "Core Banking" },
  { name: "SAP Banking", category: "Core Banking" },
  { name: "Jack Henry", category: "Core Banking" },
  { name: "Azure Financial Services", category: "Cloud Platforms" },
  { name: "AWS Financial Services", category: "Cloud Platforms" },
  { name: "Snowflake", category: "Data Platforms" },
  { name: "Databricks", category: "Data Platforms" },
  { name: "MuleSoft", category: "Integration" },
  { name: "Kafka", category: "Streaming" },
];

export const manufacturingTechnologies: TechnologyItem[] = [
  { name: "SAP", category: "ERP Systems" },
  { name: "Oracle EBS", category: "ERP Systems" },
  { name: "Microsoft Dynamics", category: "ERP Systems" },
  { name: "Siemens Opcenter", category: "MES Platforms" },
  { name: "Rockwell FactoryTalk", category: "MES Platforms" },
  { name: "GE Predix", category: "IoT Platforms" },
  { name: "PTC ThingWorx", category: "IoT Platforms" },
  { name: "Siemens MindSphere", category: "IoT Platforms" },
  { name: "OPC UA", category: "Protocols" },
  { name: "MQTT", category: "Protocols" },
];

export const retailTechnologies: TechnologyItem[] = [
  { name: "Oracle Retail", category: "Retail Platforms" },
  { name: "SAP Commerce", category: "Retail Platforms" },
  { name: "Salesforce Commerce", category: "Retail Platforms" },
  { name: "Shopify Plus", category: "E-Commerce" },
  { name: "Magento", category: "E-Commerce" },
  { name: "Segment", category: "Customer Data" },
  { name: "mParticle", category: "Customer Data" },
  { name: "Google BigQuery", category: "Analytics" },
  { name: "Snowflake", category: "Data Platforms" },
  { name: "Databricks", category: "Data Platforms" },
];
