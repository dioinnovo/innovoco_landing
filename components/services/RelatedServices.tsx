"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface RelatedService {
  icon: LucideIcon;
  iconGradient: string;
  title: string;
  description: string;
  href: string;
}

interface RelatedServicesProps {
  services: RelatedService[];
  title?: string;
}

export function RelatedServices({
  services,
  title = "Related Services"
}: RelatedServicesProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B0F19] mb-8 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="
                  group
                  bg-white
                  border-border/30
                  hover:border-border/50
                  shadow-sm
                  hover:shadow-[0_0_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.14)]
                  transition-all
                  duration-300
                  rounded-[22px]
                "
              >
                <CardHeader>
                  <div className={`
                    w-12 h-12
                    rounded-xl
                    ${service.iconGradient}
                    flex items-center justify-center
                    mb-4
                    group-hover:scale-105
                    transition-transform
                    duration-300
                    shadow-sm
                  `}>
                    <Icon className="h-6 w-6 text-[#0A58D0]" />
                  </div>

                  <CardTitle className="text-lg font-semibold text-[#0B0F19] mb-2">
                    {service.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-[#525252] mb-4">
                    {service.description}
                  </CardDescription>

                  <Link href={service.href}>
                    <Button
                      variant="ghost"
                      className="
                        w-full
                        justify-between
                        text-[#0A58D0]
                        hover:text-[#084BB3]
                        hover:bg-[#DBEAFE]/30
                        transition-all
                        duration-300
                        group/btn
                        p-0
                      "
                    >
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
