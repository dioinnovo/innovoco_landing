import { UseCaseCard } from "./use-case-card";
import { MessageSquare, Settings, Bot, Zap } from "lucide-react";

const dataUseCases = [
  {
    title: "Conversational Data Analytics",
    icon: MessageSquare,
    description: "Empower every executive to become a data analyst. Ask questions in plain English, receive insights in seconds. No SQL knowledge required.",
    example: {
      label: "Example Query:",
      content: "Show me our top performing products by region last quarter and predict next month's demand"
    },
    benefits: [
      "300% increase in data adoption across organizations",
      "75% reduction in IT support tickets",
      "10x faster insight generation",
      "Enterprise-grade security with row-level permissions"
    ],
    tags: ["Claude AI", "LangGraph", "Real-time"],
    badge: "Live Demo Available"
  },
  {
    title: "AI-Powered Master Data Management",
    icon: Settings,
    description: "Ensure your data is AI-ready with intelligent cleaning, standardization, and governance powered by machine learning algorithms.",
    benefits: [
      "95% data quality improvement in 30 days",
      "60% reduction in data preparation time",
      "Automated GDPR/CCPA compliance tracking",
      "Self-documenting data lineage"
    ],
    tags: ["Databricks", "AutoML", "Governance"]
  },
  {
    title: "Intelligent Pipeline Support Agent",
    icon: Bot,
    description: "Never lose sleep over failed pipelines again. Our AI agent diagnoses, resolves, and prevents data pipeline issues autonomously.",
    benefits: [
      "90% reduction in pipeline failures",
      "24/7 autonomous monitoring and healing",
      "15-minute average resolution time",
      "Predictive maintenance prevents 80% of issues"
    ],
    tags: ["CrewAI", "Self-Healing", "24/7"]
  },
  {
    title: "AI-Driven DataOps Platform",
    icon: Zap,
    description: "Revolutionize your data operations with AI-powered CI/CD, automated testing, and intelligent resource optimization.",
    benefits: [
      "40% reduction in infrastructure costs",
      "5x faster deployment cycles",
      "Zero-downtime updates and migrations",
      "Automated compliance documentation"
    ],
    tags: ["GitOps", "Kubernetes", "MLOps"]
  }
];

export function DataUseCases() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Enterprise Data AI Solutions
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Four revolutionary AI applications that transform your data warehouse into an intelligent business partner
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {dataUseCases.map((useCase) => (
            <UseCaseCard key={useCase.title} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}