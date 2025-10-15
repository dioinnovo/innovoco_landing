'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Users, FileText, Mail, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              Last Updated: January 2025
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A58D0]/5 via-[#3B82F6]/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[#0A58D0] to-[#3B82F6] rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B0F19]">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#525252]">
              Your privacy is important to us. This policy explains how Innovoco collects, 
              uses, and protects your personal information.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: FileText, label: 'Information Collected', href: '#collected' },
              { icon: Eye, label: 'How We Use It', href: '#usage' },
              { icon: Users, label: 'Information Sharing', href: '#sharing' },
              { icon: Lock, label: 'Your Rights', href: '#rights' },
              { icon: Mail, label: 'Contact Us', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-[#0A58D0] hover:bg-[#0A58D0]/5 transition-all duration-200"
              >
                <item.icon className="h-4 w-4 text-[#0A58D0]" />
                <span className="text-sm text-[#525252]">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Information We Collect */}
            <motion.div 
              id="collected"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <FileText className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      Information We Collect
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#525252] mb-4">
                        Innovoco collects information through various channels to provide and improve our services:
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Product Activation & Online Forms</h3>
                          <ul className="list-disc list-inside space-y-1 text-[#525252]">
                            <li>Name and contact information</li>
                            <li>Company name and job title</li>
                            <li>Email address and phone number</li>
                            <li>Billing and shipping addresses</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Browser Traffic</h3>
                          <ul className="list-disc list-inside space-y-1 text-[#525252]">
                            <li>IP address and device information</li>
                            <li>Browser type and version</li>
                            <li>Pages visited and time spent</li>
                            <li>Referring website information</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Customer Support</h3>
                          <ul className="list-disc list-inside space-y-1 text-[#525252]">
                            <li>Support ticket information</li>
                            <li>Communication history</li>
                            <li>Technical details about issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* How We Use Information */}
            <motion.div 
              id="usage"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <Eye className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      How We Use Your Information
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#525252] mb-4">
                        We use the collected information for the following purposes:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Service Delivery</h3>
                          <p className="text-sm text-[#525252]">
                            Processing orders, providing customer support, and delivering our AI & automation solutions
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Product Improvement</h3>
                          <p className="text-sm text-[#525252]">
                            Analyzing usage patterns to enhance our platforms and develop new features
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Communication</h3>
                          <p className="text-sm text-[#525252]">
                            Sending product updates, security alerts, and relevant marketing information
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-[#0B0F19] mb-2">Research & Analytics</h3>
                          <p className="text-sm text-[#525252]">
                            Understanding market trends and user needs to better serve our clients
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Information Sharing */}
            <motion.div 
              id="sharing"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <Users className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      Information Sharing
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-800 font-semibold mb-1">Our Commitment</p>
                        <p className="text-green-700 text-sm">
                          We do not sell your personal information to third parties.
                        </p>
                      </div>
                      
                      <p className="text-[#525252] mb-4">
                        We may share your information only in these limited circumstances:
                      </p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2"></div>
                          <div>
                            <strong className="text-[#0B0F19]">Business Partners:</strong>
                            <span className="text-[#525252] ml-2">
                              With trusted partners who help us operate our business and deliver services
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2"></div>
                          <div>
                            <strong className="text-[#0B0F19]">Legal Requirements:</strong>
                            <span className="text-[#525252] ml-2">
                              When required by law or to protect our rights and safety
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2"></div>
                          <div>
                            <strong className="text-[#0B0F19]">Business Transfers:</strong>
                            <span className="text-[#525252] ml-2">
                              In connection with a merger, acquisition, or sale of assets
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A58D0] mt-2"></div>
                          <div>
                            <strong className="text-[#0B0F19]">With Consent:</strong>
                            <span className="text-[#525252] ml-2">
                              When you explicitly agree to the sharing
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Cookies */}
            <motion.div 
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <Globe className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      Cookies & Tracking
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#525252] mb-4">
                        We use cookies and similar technologies to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[#525252] mb-4">
                        <li>Remember your preferences and settings</li>
                        <li>Understand how you use our services</li>
                        <li>Provide personalized content and experiences</li>
                        <li>Measure the effectiveness of our marketing</li>
                      </ul>
                      <p className="text-[#525252]">
                        You can control cookies through your browser settings. Note that disabling certain cookies 
                        may limit your ability to use some features of our services.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div 
              id="rights"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <Lock className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      Your Privacy Rights
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#525252] mb-4">
                        You have the following rights regarding your personal information:
                      </p>
                      
                      <div className="space-y-3">
                        {[
                          {
                            title: 'Access',
                            description: 'Request a copy of the personal information we hold about you'
                          },
                          {
                            title: 'Correction',
                            description: 'Request that we correct any inaccurate or incomplete information'
                          },
                          {
                            title: 'Deletion',
                            description: 'Request that we delete your personal information, subject to legal requirements'
                          },
                          {
                            title: 'Opt-Out',
                            description: 'Unsubscribe from marketing communications at any time'
                          },
                          {
                            title: 'Data Portability',
                            description: 'Request your data in a structured, machine-readable format'
                          },
                          {
                            title: 'Withdraw Consent',
                            description: 'Withdraw previously given consent for data processing'
                          }
                        ].map((right) => (
                          <div key={right.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-[#0A58D0] mt-2"></div>
                            <div>
                              <h3 className="font-semibold text-[#0B0F19]">{right.title}</h3>
                              <p className="text-sm text-[#525252] mt-1">{right.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div 
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-[#0A58D0]/10 hover:border-[#0A58D0]/20 transition-colors duration-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-[#0A58D0]/10 to-[#3B82F6]/10 rounded-xl">
                    <Shield className="h-6 w-6 text-[#0A58D0]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                      Data Security
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#525252] mb-4">
                        We implement industry-standard security measures to protect your personal information:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Shield className="h-5 w-5 text-[#0A58D0]" />
                          <span className="text-sm text-[#525252]">Encryption in transit and at rest</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Lock className="h-5 w-5 text-[#0A58D0]" />
                          <span className="text-sm text-[#525252]">Access controls and authentication</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Eye className="h-5 w-5 text-[#0A58D0]" />
                          <span className="text-sm text-[#525252]">Regular security audits</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Users className="h-5 w-5 text-[#0A58D0]" />
                          <span className="text-sm text-[#525252]">Employee training and policies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              id="contact"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#0A58D0]/5 to-[#3B82F6]/5 border-[#0A58D0]/20">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#0B0F19] mb-4">
                    Questions About Privacy?
                  </h2>
                  <p className="text-[#525252] mb-6">
                    If you have any questions or concerns about our privacy practices, please contact us:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="mailto:dio.delahoz@innovoco.com"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-[#0A58D0]/20 hover:bg-[#0A58D0]/5 transition-colors duration-200"
                    >
                      <Mail className="h-5 w-5 text-[#0A58D0]" />
                      <span className="text-[#0B0F19]">dio.delahoz@innovoco.com</span>
                    </a>
                    <a 
                      href="tel:+13054158760"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-[#0A58D0]/20 hover:bg-[#0A58D0]/5 transition-colors duration-200"
                    >
                      <Phone className="h-5 w-5 text-[#0A58D0]" />
                      <span className="text-[#0B0F19]">+1 305-415-8760</span>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Updates Notice */}
            <motion.div 
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <p className="text-sm text-[#525252]">
                  <strong>Policy Updates:</strong> We may update this privacy policy from time to time. 
                  The latest version will always be available on this page with the last updated date shown at the top.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}