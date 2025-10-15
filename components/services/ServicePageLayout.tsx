"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from '@/components/layout/footer';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ServicePageLayoutProps {
  children: ReactNode;
  breadcrumbs: BreadcrumbItem[];
}

export function ServicePageLayout({ children, breadcrumbs }: ServicePageLayoutProps) {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <nav className="bg-[#F8FAFC] border-b border-border/30" aria-label="Breadcrumb">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-[#525252] hover:text-[#0A58D0] transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-[#94A3B8] mx-2" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-[#0B0F19]" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-[#525252] hover:text-[#0A58D0] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0.95, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
