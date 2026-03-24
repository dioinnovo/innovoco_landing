"use client";

import { TrendingUp, Shield, Network, Target } from 'lucide-react';
import { DifferentiatorGrid, type DifferentiatorCardProps } from '../DifferentiatorGrid';

export function ConstructionDifferentiators({ columns = 2 }: { columns?: 1 | 2 | 3 | 4 }) {
  const differentiators: DifferentiatorCardProps[] = [
    {
      icon: TrendingUp,
      title: "Construction Industry Expertise",
      metric: "Sector depth",
      description:
        "Deep experience with roofing, HVAC, general contracting, and property inspection workflows. We understand the unique operational challenges, compliance requirements, and business models of construction and home services companies.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
      highlights: [
        "Roofing, HVAC, and inspection workflows",
        "Compliance and operational constraints",
        "Business models common to construction and home services",
      ],
    },
    {
      icon: Shield,
      title: "Proven Computer Vision Models",
      metric: "99.7% detection accuracy",
      description:
        "Our AI models are trained on millions of labeled property images—roof damage, structural defects, HVAC components—with 99.7% detection accuracy. Models are continuously improved with new training data from real-world deployments.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
      highlights: [
        "Large labeled property image corpora",
        "Continuous improvement from deployments",
        "Focus on real defect and component classes",
      ],
    },
    {
      icon: Network,
      title: "Seamless Workflow Integration",
      metric: "Your stack",
      description:
        "Our solutions integrate with your existing tools—CRM systems, scheduling software, mobile apps, and field service platforms. Minimal disruption to current processes while delivering immediate productivity gains.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
      highlights: [
        "CRM, scheduling, and field tooling",
        "Mobile and web touchpoints",
        "Low-friction rollout paths",
      ],
    },
    {
      icon: Target,
      title: "Fast Implementation & ROI",
      metric: "4–8 week deployments",
      description:
        "Most clients are fully operational within 4-8 weeks. Our proven deployment methodology—from pilot to production—ensures rapid time-to-value. Typical ROI achieved within 6-12 months through labor savings and increased throughput.",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
      highlights: [
        "Pilot-to-production playbooks",
        "Time-to-value in weeks, not quarters",
        "Labor savings and throughput lift",
      ],
    },
  ];

  return (
    <DifferentiatorGrid
      title="Why Choose Us for Construction AI"
      subtitle="Proven expertise delivering measurable ROI for construction and home services companies"
      differentiators={differentiators}
      columns={columns}
    />
  );
}
