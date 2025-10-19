"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import ContactModal from '@/components/landing/ContactModal';

interface ContactContextType {
  openContactModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}

interface ContactProviderProps {
  children: ReactNode;
}

export function ContactProvider({ children }: ContactProviderProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  return (
    <ContactContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </ContactContext.Provider>
  );
}
