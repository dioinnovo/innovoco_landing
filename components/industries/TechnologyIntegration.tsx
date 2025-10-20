"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Building2, Cloud, Database, Layers } from "lucide-react";

interface TechnologyItem {
  name: string;
  category: string;
}

interface TechnologyIntegrationProps {
  title?: string;
  description?: string;
  technologies: TechnologyItem[];
  gradient?: string;
}

export function TechnologyIntegration({
  title = "Technology Integrations",
  description = "Seamless integration with industry-leading platforms",
  technologies,
  gradient = "from-[#DBEAFE] to-[#93C5FD]"
}: TechnologyIntegrationProps) {
  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechnologyItem[]>);

  const categoryIcons: Record<string, any> = {
    "EHR Systems": Building2,
    "Cloud Platforms": Cloud,
    "Data Platforms": Database,
    "Core Banking": Building2,
    "ERP Systems": Layers,
    "Retail Platforms": Building2,
    "E-Commerce": Building2,
    "IoT Platforms": Cloud,
    "MES Platforms": Layers,
    "AI/ML": Cloud,
    "Hardware": Building2,
    "Automation": Layers,
    "Platforms": Building2,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16"
    >
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 md:p-12`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {title}
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedTechnologies).map(([category, techs], index) => {
              const Icon = categoryIcons[category] || Building2;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-[#0B0F19] text-sm uppercase tracking-wide">
                      {category}
                    </h4>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-gray-100 hover:bg-gray-200 text-[#0B0F19] border-0 text-xs font-medium px-3 py-1 rounded-full transition-colors"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <p className="text-white/90 text-sm">
              And many more industry-leading platforms through our flexible integration framework
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
