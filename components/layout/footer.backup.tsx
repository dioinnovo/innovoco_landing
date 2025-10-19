'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Linkedin, 
  Twitter, 
  Youtube, 
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Globe
} from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';  // Commented out - not implemented yet

interface FooterProps {
  onContactClick?: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call - replace with actual newsletter service
    setTimeout(() => {
      setSubscribeMessage('Successfully subscribed!');
      setEmail('');
      setIsSubscribing(false);
      // Clear message after 3 seconds
      setTimeout(() => setSubscribeMessage(''), 3000);
    }, 1000);
  };

  const currentYear = 2025; // Fixed to avoid hydration mismatch

  return (
    <footer className="bg-[#0B0F19] text-white border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Column 1: Company & Social */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image 
                src="/images/logos/innovoco-logo.png"
                alt="Innovoco Logo"
                width={628}
                height={179}
                className="h-10 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
            <p className="text-sm font-semibold text-[#93C5FD] mb-2">
              Enterprise AI & Data Tranformation
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Transforming Fortune 500 data into intelligent action since 2015
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:info@innovoco.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                <Mail className="h-4 w-4" />
                <span>info@innovoco.com</span>
              </a>
              <a href="tel:+13054158760" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                <Phone className="h-4 w-4" />
                <span>+1 305-415-8760</span>
              </a>
            </div>
            
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com/company/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#0A58D0]/20 border border-white/10 hover:border-[#0A58D0]/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-gray-400 hover:text-[#0A58D0]" />
              </a>
              <a 
                href="https://twitter.com/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/10 hover:border-[#1DA1F2]/30 transition-all duration-200"
                aria-label="Twitter/X"
              >
                <Twitter className="h-4 w-4 text-gray-400 hover:text-[#1DA1F2]" />
              </a>
              <a 
                href="https://youtube.com/@innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-gray-400 hover:text-[#FF0000]" />
              </a>
              <a 
                href="https://github.com/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Offices - spans with newsletter at bottom */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {/* Offices sub-column */}
              <div>
                <h3 className="font-semibold text-white mb-4">Offices</h3>
                <div className="space-y-4">
                  <a 
                    href="https://maps.google.com/?q=333+SE+2nd+Avenue+Suite+2000+Miami+FL+33131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Miami, USA</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">
                          333 SE 2nd Avenue<br />
                          Suite 2000<br />
                          Miami, FL 33131
                        </div>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://maps.google.com/?q=The+Exchange+Tower+130+King+St+W+Toronto+ON+M5X+2A2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Toronto, Canada</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">
                          The Exchange Tower<br />
                          130 King St W<br />
                          Toronto, ON M5X 2A2
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Solutions sub-column */}
              <div>
                <h3 className="font-semibold text-white mb-4">Solutions</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#services" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/#approach" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Approach
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/#industries" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Industries
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      About
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={onContactClick}
                      className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200 text-left"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter Signup - spans across both Offices and Solutions columns */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm h-9 flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isSubscribing}
                  className="bg-[#0A58D0] hover:bg-[#084BB3] text-white px-6 h-9"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              {subscribeMessage && (
                <p className="text-xs text-green-400 mt-2">{subscribeMessage}</p>
              )}
            </div>
          </div>

          {/* Column 4: News */}
          <div>
            <h3 className="font-semibold text-white mb-4">News</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-sm text-gray-500">
                © {currentYear} Innovoco. All rights reserved.
              </p>
              <span className="hidden md:block text-gray-700">•</span>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Offices: Florida | Ontario | Remote-First
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Link href="/sitemap" className="text-gray-500 hover:text-gray-400 transition-colors">
                Sitemap
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/accessibility" className="text-gray-500 hover:text-gray-400 transition-colors">
                Accessibility
              </Link>
              <span className="text-gray-700">•</span>
              <button className="text-gray-500 hover:text-gray-400 transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}