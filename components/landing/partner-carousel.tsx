"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const partners = [
  { src: "/images/logos/microsoft-gold-partner.png", alt: "Microsoft Gold Partner", width: 200, height: 55, href: "https://www.microsoft.com" },
  { src: "/google-cloud-premier-partner-1.webp", alt: "Google Cloud Platform", width: 250, height: 72, href: "https://cloud.google.com" },
  { src: "/images/logos/qlik.png", alt: "Qlik", width: 200, height: 59, href: "https://www.qlik.com" },
  { src: "/images/logos/databricks.png", alt: "Databricks", width: 200, height: 67, href: "https://www.databricks.com" },
  { src: "/images/logos/snowflake.png", alt: "Snowflake", width: 200, height: 42, href: "https://www.snowflake.com" },
  { src: "/images/logos/informatica.png", alt: "Informatica", width: 200, height: 49, href: "https://www.informatica.com" },
  { src: "/images/logos/langgraph.png", alt: "LangGraph", width: 200, height: 100, href: "https://www.langchain.com/langgraph" },
  { src: "/images/logos/n8n-logo.png", alt: "n8n", width: 120, height: 120, href: "https://n8n.io" },
];

export function PartnerCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.classList.add('animate-scroll');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-16 pt-16 border-t border-gray-200/50">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-[#0B0F19]">
          Leading Industry Partnerships
        </h3>
        <p className="text-base text-[#6B7280]">
          Trusted by global enterprises to deliver cutting-edge data and AI solutions
        </p>
      </div>
      
      <div className="relative overflow-hidden py-8">
        <div ref={carouselRef} className="flex w-max">
          {/* First set of logos */}
          <div className="flex items-center gap-12 px-8">
            {partners.map((partner, idx) => (
              <a 
                key={`first-${idx}`} 
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all hover:scale-105"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                  quality={75}
                  placeholder="empty"
                />
              </a>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-12 px-8">
            {partners.map((partner, idx) => (
              <a 
                key={`second-${idx}`} 
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all hover:scale-105"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                  quality={75}
                  placeholder="empty"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}