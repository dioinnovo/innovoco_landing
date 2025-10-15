"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Download, Mail, Phone, Building2, Award, Users, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LightRays } from "@/components/ui/hero-spotlight";

const pressReleases = [
  {
    id: 1,
    date: "January 15, 2025",
    category: "Product Launch",
    title: "Innovoco Launches Revolutionary AI-Powered Business Automation Platform",
    excerpt: "New platform reduces operational costs by up to 60% while improving efficiency through intelligent workflow automation.",
    image: "/images/press/launch.jpg",
    featured: true
  },
  {
    id: 2,
    date: "December 10, 2024",
    category: "Partnership",
    title: "Innovoco Partners with Leading Fortune 500 Companies for AI Transformation",
    excerpt: "Strategic partnerships to accelerate AI adoption across multiple industries including healthcare, finance, and manufacturing.",
    image: "/images/press/partnership.jpg"
  },
  {
    id: 3,
    date: "November 28, 2024",
    category: "Award",
    title: "Innovoco Named 'AI Innovation Leader' by Tech Industry Awards 2024",
    excerpt: "Recognition for groundbreaking contributions to enterprise AI solutions and commitment to responsible AI development.",
    image: "/images/press/award.jpg"
  },
  {
    id: 4,
    date: "October 15, 2024",
    category: "Expansion",
    title: "Innovoco Expands Global Presence with New European Headquarters",
    excerpt: "Opening of new office in Amsterdam to better serve European clients and accelerate international growth.",
    image: "/images/press/expansion.jpg"
  }
];

const companyMilestones = [
  { year: "2024", achievement: "Reached 500+ enterprise clients globally" },
  { year: "2024", achievement: "$50M Series B funding round" },
  { year: "2023", achievement: "Launched AI Stack Explorer platform" },
  { year: "2022", achievement: "Founded with mission to democratize AI" }
];

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Product Launch", "Partnership", "Award", "Expansion"];

  const filteredReleases = selectedCategory === "all" 
    ? pressReleases 
    : pressReleases.filter(release => release.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section with Spotlight Effect */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Light Rays Background Effect */}
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#0A58D0"
            lightSpread={0.45}
            rayLength={1.8}
            fadeDistance={1.0}
            pulsating={false}
            raysSpeed={0.3}
            mouseInfluence={0.15}
            distortion={0.01}
            noiseAmount={0}
            saturation={1.5}
            className="opacity-20"
            introAnimation={true}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#0A58D0]/10 text-[#0A58D0] border-[#0A58D0]/20">
              Press Room
            </Badge>
            <h1 className="text-5xl font-bold mb-4 relative">
              <span 
                className="bg-gradient-to-r from-[#0A58D0] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(10, 88, 208, 0.15))",
                }}
              >
                Latest News & Updates
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about Innovoco's latest innovations, partnerships, and company milestones
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Building2, label: "Founded", value: "2022" },
              { icon: Users, label: "Clients", value: "500+" },
              { icon: Globe, label: "Countries", value: "25+" },
              { icon: Award, label: "Awards", value: "12" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <stat.icon className="h-8 w-8 text-[#0A58D0] mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] text-white" 
                  : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Featured Release */}
              {filteredReleases.filter(r => r.featured).map((release) => (
                <Card key={release.id} className="overflow-hidden border-gray-200 shadow-lg">
                  <div className="md:grid md:grid-cols-2">
                    <div className="relative h-64 md:h-full bg-gradient-to-br from-[#0A58D0]/10 to-[#8B5CF6]/10">
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="h-24 w-24 text-gray-300" />
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary">{release.category}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {release.date}
                        </span>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Featured
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        {release.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {release.excerpt}
                      </p>
                      <Button className="bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] text-white">
                        Read Full Release
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}

              {/* Regular Releases */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredReleases.filter(r => !r.featured).map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{release.category}</Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {release.date}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{release.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {release.excerpt}
                        </CardDescription>
                        <Button variant="ghost" className="text-[#0A58D0] p-0 hover:bg-transparent">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="px-4 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Media Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Download our media kit for logos, brand guidelines, and company information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Brand Assets",
                description: "Logos, colors, and brand guidelines",
                icon: Download,
                action: "Download Assets"
              },
              {
                title: "Company Fact Sheet",
                description: "Key facts, figures, and milestones",
                icon: Download,
                action: "Download PDF"
              },
              {
                title: "Executive Bios",
                description: "Leadership team profiles and photos",
                icon: Download,
                action: "Download Bios"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-[#0A58D0]" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Button variant="outline" className="w-full">
                    {item.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Company Milestones</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0A58D0] to-[#8B5CF6]" />
            
            {/* Timeline items */}
            <div className="space-y-8">
              {companyMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="relative z-10 w-16 h-16 bg-white rounded-full border-4 border-[#0A58D0] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#0A58D0]">{milestone.year}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-700">{milestone.achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="px-4 py-20 bg-gradient-to-br from-[#0A58D0]/5 to-[#8B5CF6]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Press Inquiries</h2>
          <p className="text-gray-600 mb-8">
            For media inquiries, interviews, or additional information, please contact our press team
          </p>
          
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-[#0A58D0]" />
                  <span className="font-semibold">Email</span>
                </div>
                <a href="mailto:press@innovoco.com" className="text-[#0A58D0] hover:underline">
                  press@innovoco.com
                </a>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-[#0A58D0]" />
                  <span className="font-semibold">Phone</span>
                </div>
                <a href="tel:+1234567890" className="text-[#0A58D0] hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] text-white">
                Submit Press Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}