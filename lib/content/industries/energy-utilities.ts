import {
  Zap,
  Gauge,
  Sun,
  Wind,
  Activity,
  Cpu,
  Shield,
  Factory,
  Brain,
  Rocket,
  Database,
  HardHat,
  ShoppingCart,
} from "lucide-react";
import { IndustryConfig } from "./types";

export const energyUtilitiesConfig: IndustryConfig = {
  metadata: {
    title: "Energy & Utilities AI | Grid, Assets & Renewables",
    description:
      "AI for utilities and energy operators: load and renewable forecasting, predictive maintenance for grid and generation assets, outage analytics, and DER orchestration.",
    keywords:
      "utilities AI, energy forecasting, smart grid analytics, predictive maintenance utilities, DER management, outage prediction, renewable forecasting, pipeline integrity analytics",
    url: "https://innovoco.com/solutions/industries/energy-utilities",
  },

  hero: {
    badge: "Resilience · Reliability · Operations",
    title: "Energy & Utilities AI Solutions",
    subtitle: "Forecasting, asset health, and operations intelligence",
    description:
      "Improve reliability and capital efficiency with AI that fuses SCADA, AMI, weather, market, and work-order data—supporting control room, field, and planning teams with forecasts, anomaly detection, and prioritized maintenance you can explain to regulators and the public.",
    trustIndicators: [
      { metric: "8–18%", label: "Forecast error ↓" },
      { metric: "15–30%", label: "Unplanned events ↓" },
      { metric: "NERC", label: "aware patterns" },
      { metric: "Edge", label: "to cloud options" },
    ],
    primaryCTAText: "Schedule a utilities AI assessment",
    backgroundGradient: "bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#bae6fd]",
  },

  sectionCTAs: {
    afterMainContent: {
      title: "Modernize operations with trusted AI",
      subtitle: "OT/IT aware · 30-minute discovery · No obligation",
      buttonText: "Talk to a specialist",
    },
    afterCaseStudies: {
      title: "See how operators improved reliability",
      subtitle: "Utilities using AI for load, renewables, and asset health",
      buttonText: "Get started",
    },
    afterFAQs: {
      title: "Ready to discuss your control center and field data?",
      subtitle: "Speak with an energy AI architect about forecasting, CMMS, and telemetry",
      buttonText: "Book consultation",
    },
    afterDifferentiators: {
      title: "Partner with industrial AI experts",
      subtitle: "Deep experience with time-series, geospatial, and OT-adjacent deployments",
      buttonText: "Start today",
    },
  },

  caseStudies: {
    badge: "Field-proven",
    title: "Energy & utilities AI outcomes",
    description: "Results from IOUs, municipals, and integrated energy companies",
    studies: [
      {
        icon: Gauge,
        iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        imageSrc: "/images/industries/energy-utilities/solutions/load-renewable-forecasting.jpg",
        title: "Short-term load & renewable forecasting",
        industry: "IOU | RTO footprint",
        challenge:
          "Ramping DER and weather volatility increased day-ahead and intra-day error; manual analyst tweaks did not scale across zones.",
        solution:
          "Ensemble models with weather ensembles, behind-the-meter signals, and holiday/event features—published to market ops APIs with confidence bands.",
        results: [
          { metric: "14%", label: "MAPE ↓", trend: "down" },
          { metric: "$4.2M", label: "Fuel & imbalance savings" },
          { metric: "6wk", label: "Full rollout" },
        ],
      },
      {
        icon: Zap,
        iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        imageSrc: "/images/industries/energy-utilities/solutions/grid-generation-asset-health.jpg",
        title: "Substation & line asset health",
        industry: "Transmission | Regional",
        challenge:
          "Condition data lived in silos; maintenance was calendar-driven and critical failures still caused unplanned outages.",
        solution:
          "Unified DGA, partial discharge, thermal, and work history into health scores with survival-style risk and crew-ready work recommendations.",
        results: [
          { metric: "22%", label: "Emergency trips ↓", trend: "down" },
          { metric: "11%", label: "O&M spend shift", trend: "down" },
          { metric: "100%", label: "Asset coverage" },
        ],
      },
      {
        icon: Sun,
        iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        imageSrc: "/images/industries/energy-utilities/solutions/der-visibility-operations.jpg",
        title: "DER visibility & hosting analysis",
        industry: "Municipal | Growing solar",
        challenge:
          "Hosting capacity studies were slow; planners lacked consistent feeder-level headroom under heat and cloud scenarios.",
        solution:
          "Automated hosting screens combining load flow snapshots, inverter telemetry, and scenario libraries—with planner overrides and audit logs.",
        results: [
          { metric: "70%", label: "Study time ↓", trend: "down" },
          { metric: "3×", label: "Interconnection throughput" },
          { metric: "0", label: "Critical violations" },
        ],
      },
      {
        icon: Wind,
        iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        imageSrc: "/images/industries/energy-utilities-hero-v2.jpg",
        title: "Outage prediction & crew routing",
        industry: "Distribution | Storm-prone",
        challenge:
          "Vegetation and equipment risk were assessed with static cycles; storms overwhelmed prioritization.",
        solution:
          "Risk layers from LiDAR, inspection tickets, and weather models to pre-position crews and sequence restoration assists.",
        results: [
          { metric: "18%", label: "CMI reduction", trend: "down" },
          { metric: "12%", label: "Truck-hours saved" },
          { metric: "Live", label: "Storm mode dashboards" },
        ],
      },
    ],
  },

  faqs: {
    title: "Energy & utilities AI FAQs",
    description: "Questions from grid operators, asset teams, and digital leads",
    questions: [
      {
        question: "How do you handle OT security and segmentation?",
        answer:
          "We follow your Purdue model and utility standards: read-mostly historian taps, unidirectional gateways, DMZ brokers, and least-privilege service accounts. Edge inference is available when backhaul or policy requires it.",
      },
      {
        question: "Can models run on-prem or hybrid cloud?",
        answer:
          "Yes—Kubernetes on utility data centers, sovereign regions, and hybrid patterns are common. Training may be cloud-burst with anonymized or synthetic data per your policy.",
      },
      {
        question: "What data sources do you typically integrate?",
        answer:
          "AMI/MDMS, SCADA/historian, DMS/OMS, CMMS/EAM, weather APIs, market feeds, vegetation/LiDAR, drone inspections, and work management. We align to CIM where available.",
      },
      {
        question: "How do you support regulatory and public transparency?",
        answer:
          "We document assumptions, data lineage, and override paths. Outputs can include natural-language rationales for planner review and exportable evidence for rate cases or reliability reporting.",
      },
      {
        question: "Timeline to production for a forecasting pilot?",
        answer:
          "With clean historical telemetry, 12–16 weeks to controlled production with shadow mode and parallel run. Asset health depends on CMMS quality but often follows a similar cadence.",
      },
      {
        question: "Do you work with gas, water, or multi-utility operators?",
        answer:
          "Yes—pressure transient analytics, leak risk scoring, and pump station optimization share the same forecasting and reliability patterns as electric, adapted to your telemetry and compliance context.",
      },
    ],
  },

  differentiators: {
    title: "Why Innovoco for energy AI",
    description: "Time-series, geospatial, and OT-aware delivery at enterprise scale",
    columns: 2,
    items: [
      {
        icon: Activity,
        title: "Operations-grade ML",
        description:
          "Models built for missing sensors, clock skew, and regime change—with monitoring that control room engineers actually use.",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        metric: "24/7 reliability focus",
        highlights: [],
      },
      {
        icon: Cpu,
        title: "Edge to cloud",
        description:
          "Deploy where latency, bandwidth, or policy demands—without forgoing centralized retraining and governance.",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        metric: "Field-tested architectures",
        highlights: [],
      },
      {
        icon: Shield,
        title: "Security-first integration",
        description:
          "Partnership with your NERC CIP, IEC 62443, and enterprise security teams from architecture review through runbooks.",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        metric: "Utility compliance aware",
        highlights: [],
      },
      {
        icon: Database,
        title: "Modern data foundations",
        description:
          "Lakehouse, streaming, and feature stores so telemetry, weather, and market data stay consistent for every downstream model.",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        metric: "500+ data & AI programs",
        highlights: [],
      },
    ],
  },

  actionCTA: {
    title: "Ready to strengthen the grid with AI?",
    subtitle: "Choose your next step toward reliable, efficient operations",
    footerText:
      "Innovoco helps utilities and energy companies deploy forecasting, asset health, and operations AI with the security and rigor the sector demands.",
    prioritization: {
      headline: 'Load Forecasting, Asset Health, DER Visibility —',
      headlineAccent: 'Which One Strengthens Your Grid First?',
      subline: 'One workshop. Every initiative ranked by ROI.',
      strategic: 'Enterprise forecasting, predictive asset management, and grid optimization built for regulatory rigor.',
      quickWins: 'Deploy demand forecasting or anomaly detection in 90 days. Measurable reliability gains this quarter.',
      bgImage: '/images/industries/energy-utilities/cta-prioritization-bg.jpg',
    },
    cards: [
      {
        icon: Gauge,
        title: "Forecasting & telemetry assessment",
        description:
          "Map data latency, gaps, and model surfaces for load, price, or renewable forecasting.",
        tag: "Complimentary",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        action: "Schedule review",
      },
      {
        icon: Zap,
        title: "Asset health blueprint",
        description:
          "Workshop on CMMS, historian, and inspection feeds to prioritize predictive maintenance wins.",
        tag: "Workshop",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        action: "Book workshop",
      },
      {
        icon: Sun,
        title: "DER & hosting quickstart",
        description:
          "Scoped POC for hosting headroom or visibility dashboards with clear KPIs.",
        tag: "POC",
        gradient: "bg-gradient-to-br from-[#e0f2fe] to-[#0284c7]",
        action: "Start POC",
      },
    ],
  },

  relatedIndustries: [
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Industrial AI, predictive maintenance, and quality",
      href: "/solutions/industries/manufacturing",
      gradient: "bg-gradient-to-br from-[#FFF7ED] to-[#d97706]",
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Field intelligence and inspection automation",
      href: "/solutions/industries/construction",
      gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#D97706]",
    },
    {
      icon: ShoppingCart,
      title: "Retail",
      description: "Demand forecasting and customer analytics",
      href: "/solutions/industries/retail",
      gradient: "bg-gradient-to-br from-[#EEF2FF] to-[#6366f1]",
    },
  ],

  relatedServices: [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]",
      title: "AI Strategy & Consulting",
      description: "Roadmaps for grid modernization, data platforms, and AI governance.",
      href: "/services/ai-strategy-consulting",
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#e0f2fe] to-[#38bdf8]",
      title: "Enterprise AI Implementation",
      description: "Deploy forecasting, anomaly detection, and optimization with MLOps.",
      href: "/services/ai-implementation",
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#d1fae5] to-[#34d399]",
      title: "Data Engineering & Modernization",
      description: "Telemetry lakehouses, streaming, and integration for OT/IT convergence.",
      href: "/services/data-engineering-modernization",
    },
  ],

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Energy & Utilities", href: "/solutions/industries/energy-utilities" },
  ],
};
