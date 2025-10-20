"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onContactClick?: () => void;
  isLandingPage?: boolean;
  activeSection?: string;
  customLogo?: string;
}

export function Header({ onContactClick, isLandingPage = false, activeSection = "", customLogo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc = customLogo || "/images/logos/Innovoco-Logo-hires.png";

  // For non-landing pages, link back to landing page sections
  const getNavHref = (section: string) => {
    return isLandingPage ? `#${section}` : `/#${section}`;
  };

  const navItems = [
    { label: "AI", section: "ai" },
    { label: "Analytics", section: "analytics" },
    { label: "Data", section: "data" },
    { label: "Industries", section: "industries" },
    { label: "Team", section: "about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50" role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Innovoco Logo"
              width={120}
              height={39}
              className="h-7 md:h-9 w-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.section}
                href={getNavHref(item.section)}
                className={`text-base font-medium transition-colors relative py-2 ${
                  activeSection === item.section
                    ? 'text-[#0A58D0] font-semibold'
                    : 'text-[#525252] hover:text-[#0B0F19]'
                }`}
              >
                {item.label}
                {activeSection === item.section && (
                  <span className="absolute -bottom-[20px] md:-bottom-[24px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#0A58D0] to-[#3B82F6] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={onContactClick}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base px-6 h-10 font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Open contact form"
            >
              Book My Call
            </Button>
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              onClick={onContactClick}
              size="sm"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm px-4 h-9 font-medium rounded-full"
              aria-label="Open contact form"
            >
              Book Call
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#0B0F19]" />
              ) : (
                <Menu className="h-6 w-6 text-[#0B0F19]" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.section}
                href={getNavHref(item.section)}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.section
                    ? 'bg-blue-50 text-[#0A58D0] font-semibold'
                    : 'text-[#525252] hover:bg-gray-50 hover:text-[#0B0F19]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
