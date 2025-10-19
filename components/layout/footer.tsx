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
        {/* Newsletter Section - Full Width */}
        <div className="mb-12 pb-12 border-b border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest insights on AI transformation and enterprise automation</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 flex-1"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-[#0A58D0] hover:bg-[#084BB3] text-white px-8 whitespace-nowrap shadow-lg shadow-[#0A58D0]/25 hover:shadow-xl hover:shadow-[#0A58D0]/40 transition-all duration-300 relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-[#0A58D0]/20 before:to-[#93C5FD]/20 before:blur-xl before:-z-10 hover:before:blur-2xl"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {subscribeMessage && (
              <p className="text-sm text-green-400 mt-3">{subscribeMessage}</p>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Company & Social - spans full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logos/Innovoco-Logo-hires.png"
                alt="Innovoco Logo"
                width={628}
                height={179}
                className="object-contain brightness-0 invert"
                style={{ height: '40px', width: 'auto' }}
                priority
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#93C5FD] mb-3">
              Enterprise AI & Data Transformation Leader
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
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
            
            <div className="flex gap-2 flex-wrap">
              <a 
                href="https://linkedin.com/company/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#0A58D0]/20 border border-white/10 hover:border-[#0A58D0]/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-gray-400" />
              </a>
              <a 
                href="https://twitter.com/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#1DA1F2]/20 border border-white/10 hover:border-[#1DA1F2]/30 transition-all duration-200"
                aria-label="Twitter/X"
              >
                <Twitter className="h-4 w-4 text-gray-400" />
              </a>
              <a
                href="https://www.youtube.com/@Innovoco"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-gray-400" />
              </a>
              <a 
                href="https://github.com/innovoco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Offices */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Offices</h3>
                <div className="space-y-4">
                  <a 
                    href="https://maps.google.com/?q=333+SE+2nd+Avenue+Suite+2000+Miami+FL+33131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-xs sm:text-sm">Miami, USA</div>
                        <div className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mt-1">
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
                      <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-xs sm:text-sm">Toronto, Canada</div>
                        <div className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 mt-1">
                          The Exchange Tower<br />
                          130 King St W<br />
                          Toronto, ON M5X 2A2
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
          </div>

          {/* Column 3: Solutions */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Solutions</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#ai" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      AI Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/#data" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Data Engineering
                    </Link>
                  </li>
                  <li>
                    <Link href="/#analytics" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                      Analytics & BI
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
                </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200">
                  Our Team
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
              <li>
                <button
                  onClick={onContactClick}
                  className="text-sm text-gray-400 hover:text-[#93C5FD] transition-colors duration-200 text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="col-span-1 md:col-span-1">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">News</h3>
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
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Legal</h3>
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
                </ul>
              </div>
            </div>
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