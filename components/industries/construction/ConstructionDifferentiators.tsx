"use client";

import { DifferentiatorGrid } from '../DifferentiatorGrid';

export function ConstructionDifferentiators({ columns = 2 }: { columns?: number }) {
  const differentiators = [
    {
      title: "Construction Industry Expertise",
      description: "Deep experience with roofing, HVAC, general contracting, and property inspection workflows. We understand the unique operational challenges, compliance requirements, and business models of construction and home services companies.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    },
    {
      title: "Proven Computer Vision Models",
      description: "Our AI models are trained on millions of labeled property images—roof damage, structural defects, HVAC components—with 99.7% detection accuracy. Models are continuously improved with new training data from real-world deployments.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    },
    {
      title: "Seamless Workflow Integration",
      description: "Our solutions integrate with your existing tools—CRM systems, scheduling software, mobile apps, and field service platforms. Minimal disruption to current processes while delivering immediate productivity gains.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    },
    {
      title: "Fast Implementation & ROI",
      description: "Most clients are fully operational within 4-8 weeks. Our proven deployment methodology—from pilot to production—ensures rapid time-to-value. Typical ROI achieved within 6-12 months through labor savings and increased throughput.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]"
    }
  ];

  return (
    <DifferentiatorGrid
      title="Why Choose Us for Construction AI"
      description="Proven expertise delivering measurable ROI for construction and home services companies"
      differentiators={differentiators}
      columns={columns}
    />
  );
}
