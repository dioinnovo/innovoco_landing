import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Rocket } from "lucide-react";

// Pure server component - NO client-side JavaScript
export function HeroStatic() {
  return (
    <section id="hero" className="relative overflow-hidden py-16 md:py-20 px-4 md:px-6 hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#FECACA]" />
      <div className="absolute inset-0 bg-white/70" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center hero-content">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-blue-600 hero-badge">
            <Rocket className="h-3 w-3" />
            10+ Years of Enterprise Data Excellence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#0B0F19] hero-title">
            Your Enterprise Data Warehouse.
            <br />
            <span className="bg-gradient-to-r from-[#93C5FD] via-[#A78BFA] to-[#F87171] bg-clip-text text-transparent hero-highlight">
              Now AI-Powered
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-[#6B7280] mb-6 md:mb-8 max-w-3xl mx-auto hero-description">
            Decades of enterprise-grade data expertise turned into AI-driven analytics, automation, and intelligent decisioning. Trusted by global organizations, Innovoco delivers secure, scalable transformation that accelerates insight and delivers competitive advantage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 hero-buttons">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-[#2563EB]">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button size="lg" variant="outline">
                <PlayCircle className="mr-2 h-5 w-5" />
                View Case Studies
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-gray-200/50 hero-stats">
            <div className="text-center stat-item">
              <div className="text-2xl md:text-3xl font-bold text-[#0B0F19]">500+</div>
              <div className="text-xs md:text-sm text-[#6B7280]">Solutions Delivered</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-2xl md:text-3xl font-bold text-[#0B0F19]">10+</div>
              <div className="text-xs md:text-sm text-[#6B7280]">Years Expertise</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-2xl md:text-3xl font-bold text-[#0B0F19]">300+</div>
              <div className="text-xs md:text-sm text-[#6B7280]">Enterprise Clients</div>
            </div>
            <div className="text-center stat-item">
              <div className="text-2xl md:text-3xl font-bold text-[#0B0F19]">90D</div>
              <div className="text-xs md:text-sm text-[#6B7280]">AI Deployment</div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}