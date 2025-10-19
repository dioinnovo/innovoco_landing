"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const metrics = [
  { number: "500+", label: "BI Implementations" },
  { number: "500+", label: "Enterprise Clients" },
  { number: "10Y", label: "Data Excellence" },
  { number: "90D", label: "AI Deployment" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800" />
      
      {/* Subtle animated accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent rounded-full opacity-5 blur-3xl" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Innovoco AI & Automation
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Where Enterprise Data Meets Artificial Intelligence
          </p>
          
          <p className="text-lg md:text-xl text-card-foreground mb-12 max-w-3xl mx-auto">
            Transforming a decade of data warehouse expertise into AI-powered innovation.
            <br />
            Your data knows the answers. Our AI asks the right questions.
          </p>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {metrics.map((metric) => (
              <Card
                key={metric.label}
                className="bg-card/50 backdrop-blur border-border/50 p-6 hover:bg-card/80 hover:shadow-glow transition-all duration-300 hover-lift"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.number}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/use-cases">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-glow"
              >
                Explore AI Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/50 hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg"
              >
                Schedule Discovery Call
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}