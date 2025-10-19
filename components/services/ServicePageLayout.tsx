"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import ContactModal from '@/components/landing/ContactModal';

interface ServicePageLayoutProps {
  children: ReactNode;
  breadcrumbs?: any; // Keep for backward compatibility but not used
}

export function ServicePageLayout({ children }: ServicePageLayoutProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Skip to content link for keyboard navigation */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Navigation Header */}
        <Header onContactClick={() => setContactModalOpen(true)} />

        {/* Main Content */}
        <main id="main-content" className="container mx-auto max-w-7xl px-4" role="main">
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

      {/* Contact Modal */}
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}
