"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onContactClick?: () => void;
  isLandingPage?: boolean;
  activeSection?: string;
  customLogo?: string;
}

interface NavItem {
  label: string;
  section?: string;
  href?: string;
}

export function Header({ onContactClick, isLandingPage = false, activeSection = "", customLogo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const logoSrc = customLogo || "/images/logos/Innovoco-Logo-hires.png";

  const navItems: NavItem[] = [
    { label: "AI", section: "ai" },
    { label: "Analytics", section: "analytics" },
    { label: "Data", section: "data" },
    { label: "Industries", section: "industries" },
    { label: "Blog", href: "/blog" },
    { label: "Team", section: "about" },
  ];

  // Get href for nav item
  const getNavHref = (item: NavItem): string => {
    if (item.href) return item.href;
    if (item.section) {
      return isLandingPage ? `#${item.section}` : `/#${item.section}`;
    }
    return "/";
  };

  // Check if nav item is active
  const isNavActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname.startsWith(item.href);
    }
    return item.section === activeSection;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50" role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
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
            {navItems.map((item) => {
              const isActive = isNavActive(item);
              return (
                <Link
                  key={item.label}
                  href={getNavHref(item)}
                  className={`text-base font-medium transition-colors relative py-2 ${
                    isActive
                      ? 'text-[#0A58D0] font-semibold'
                      : 'text-[#525252] hover:text-[#0B0F19]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-[20px] md:-bottom-[24px] left-0 right-0 h-[3px] bg-linear-to-r from-[#0A58D0] to-[#3B82F6] rounded-full" />
                  )}
                </Link>
              );
            })}
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
            {navItems.map((item) => {
              const isActive = isNavActive(item);
              return (
                <Link
                  key={item.label}
                  href={getNavHref(item)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0A58D0] font-semibold'
                      : 'text-[#525252] hover:bg-gray-50 hover:text-[#0B0F19]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
