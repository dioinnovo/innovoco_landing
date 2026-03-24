"use client";

import Link from "next/link";
import { Brain, Database, Zap, LifeBuoy, ArrowRight } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchemaMarkup } from "@/lib/seo/SchemaMarkup";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

const offerings = [
  {
    title: "AI Strategy & Consulting",
    description:
      "Framework-agnostic roadmaps, governance, and ROI modeling to guide enterprise AI transformation.",
    href: "/services/ai-strategy-consulting",
    icon: Brain,
    gradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
  },
  {
    title: "Data Engineering & Modernization",
    description:
      "Cloud-native data platforms and migration so your organization is AI-ready from the ground up.",
    href: "/services/data-engineering-modernization",
    icon: Database,
    gradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
  },
  {
    title: "AI Implementation",
    description:
      "From proof of concept to production—LLM integration, agents, and MLOps in 12–16 weeks.",
    href: "/services/ai-implementation",
    icon: Zap,
    gradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
  },
  {
    title: "Managed AI Services",
    description:
      "SLA-backed operations, monitoring, and continuous optimization for models and AI workloads.",
    href: "/services/managed-ai-services",
    icon: LifeBuoy,
    gradient: "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]",
  },
];

export function ServicesHubClient() {
  return (
    <>
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://innovoco.com" },
          { name: "Services", url: "https://innovoco.com/services" },
        ])}
      />

      <ServicePageLayout customLogo="/images/logos/innovoco-ai-hires.png">
        <div className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Enterprise AI &amp; Data Services
            </h1>
            <p className="text-lg text-[#525252] leading-relaxed">
              Strategy, implementation, modernization, and 24/7 operations—everything you need to
              move from data warehouse to AI-powered decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.href}
                  className="border-border/30 shadow-sm hover:shadow-md transition-shadow rounded-[22px] overflow-hidden flex flex-col"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl ${item.gradient} flex items-center justify-center mb-4`}
                    >
                      <Icon className="h-7 w-7 text-[#0A58D0]" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-[#0B0F19]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-[#525252] leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between text-[#0A58D0] hover:text-[#084BB3] rounded-full"
                    >
                      <Link href={item.href}>
                        <span className="font-medium">Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8"
            >
              <Link href="/case-studies">View case studies</Link>
            </Button>
          </div>
        </div>
      </ServicePageLayout>
    </>
  );
}
