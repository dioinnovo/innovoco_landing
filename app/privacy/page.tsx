'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import ContactModal from '@/components/landing/ContactModal';
import { Shield, Lock, Eye, Database, FileText, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logos/Innovoco-Logo-hires.png"
                alt="Innovoco"
                width={140}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ height: '32px', width: 'auto' }}
                priority
              />
            </Link>
            <Button
              onClick={() => setContactModalOpen(true)}
              size="sm"
              className="bg-[#0A58D0] hover:bg-[#084BB3] text-white text-xs sm:text-sm px-3 sm:px-4"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-[#0A58D0]/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 text-[#0A58D0]">
              <Shield className="h-6 w-6" />
              <span className="text-sm font-semibold">Privacy & Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-[#525252]">
              Last updated: October 17, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">

          {/* Introduction */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-[#0A58D0]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-3">
                  Introduction
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4">
                  Innovoco ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                  innovoco.com or use our services.
                </p>
                <p className="text-[#525252] leading-relaxed">
                  By accessing or using our services, you agree to this Privacy Policy. If you do not agree with the terms of this Privacy Policy,
                  please do not access our website or use our services.
                </p>
              </div>
            </div>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="h-5 w-5 text-[#0A58D0]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  Information We Collect
                </h2>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Personal Information</h3>
                <p className="text-[#525252] leading-relaxed mb-3">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-[#525252] mb-4 space-y-1 ml-4">
                  <li>Fill out contact forms or request information</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Register for webinars or events</li>
                  <li>Apply for job positions</li>
                  <li>Engage with our services</li>
                </ul>
                <p className="text-[#525252] leading-relaxed mb-4">
                  This information may include: name, email address, phone number, company name, job title, and any other
                  information you choose to provide.
                </p>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Automatically Collected Information</h3>
                <p className="text-[#525252] leading-relaxed mb-3">
                  When you visit our website, we automatically collect certain information about your device and usage, including:
                </p>
                <ul className="list-disc list-inside text-[#525252] mb-4 space-y-1 ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Click patterns and navigation paths</li>
                </ul>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Cookies and Tracking Technologies</h3>
                <p className="text-[#525252] leading-relaxed">
                  We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze usage patterns,
                  and deliver targeted content. You can control cookie preferences through your browser settings.
                </p>
              </div>
            </div>
          </Card>

          {/* How We Use Your Information */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-[#0A58D0]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-[#525252] leading-relaxed mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To respond to your inquiries and communicate with you</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To personalize your experience on our website</li>
                  <li>To analyze usage patterns and improve our website functionality</li>
                  <li>To detect, prevent, and address technical issues or security threats</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                  <li>To process job applications and recruitment activities</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Data Sharing and Disclosure */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-[#0A58D0]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-[#525252] leading-relaxed mb-3">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mb-4">
                  <li><span className="font-semibold">Service Providers:</span> Third-party vendors who perform services on our behalf (e.g., email delivery, analytics, hosting)</li>
                  <li><span className="font-semibold">Business Partners:</span> Microsoft, Google Cloud, AWS, Databricks, OpenAI, and Snowflake, when necessary to provide services</li>
                  <li><span className="font-semibold">Legal Compliance:</span> When required by law, court order, or government request</li>
                  <li><span className="font-semibold">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
                  <li><span className="font-semibold">With Your Consent:</span> When you explicitly authorize us to share your information</li>
                </ul>
                <p className="text-[#525252] leading-relaxed">
                  All third-party service providers are contractually obligated to maintain the confidentiality and security of your information.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Security */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  Data Security
                </h2>
                <p className="text-[#525252] leading-relaxed mb-3">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mb-4">
                  <li>Encryption of data in transit and at rest using TLS/SSL and AES-256</li>
                  <li>Secure access controls and authentication mechanisms</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>SOC 2 Type II, HIPAA, and GDPR compliance frameworks</li>
                  <li>ISO/IEC 42001:2023 AI Management Systems certification</li>
                  <li>Employee training on data protection and privacy best practices</li>
                </ul>
                <p className="text-[#525252] leading-relaxed">
                  While we strive to protect your information, no method of transmission over the Internet or electronic storage
                  is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </Card>

          {/* Your Rights and Choices */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-[#525252] leading-relaxed mb-3">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mb-4">
              <li><span className="font-semibold">Access:</span> Request a copy of the personal information we hold about you</li>
              <li><span className="font-semibold">Correction:</span> Request correction of inaccurate or incomplete information</li>
              <li><span className="font-semibold">Deletion:</span> Request deletion of your personal information (subject to legal obligations)</li>
              <li><span className="font-semibold">Portability:</span> Request transfer of your data to another service provider</li>
              <li><span className="font-semibold">Opt-Out:</span> Unsubscribe from marketing communications at any time</li>
              <li><span className="font-semibold">Restriction:</span> Request restriction of processing in certain circumstances</li>
              <li><span className="font-semibold">Objection:</span> Object to processing based on legitimate interests</li>
            </ul>
            <p className="text-[#525252] leading-relaxed">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@innovoco.com" className="text-[#0A58D0] hover:underline">
                privacy@innovoco.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </Card>

          {/* Data Retention */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Data Retention
            </h2>
            <p className="text-[#525252] leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
              unless a longer retention period is required or permitted by law. When we no longer need your information, we securely
              delete or anonymize it. Retention periods vary based on the type of data and purpose of processing, typically ranging
              from 1-7 years for business records and indefinitely for anonymized analytics data.
            </p>
          </Card>

          {/* International Data Transfers */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              International Data Transfers
            </h2>
            <p className="text-[#525252] leading-relaxed mb-3">
              Your information may be transferred to and processed in the United States, Canada, or other countries where we or
              our service providers operate. These countries may have different data protection laws than your country of residence.
            </p>
            <p className="text-[#525252] leading-relaxed">
              When we transfer data internationally, we use appropriate safeguards such as Standard Contractual Clauses (SCCs)
              approved by the European Commission, or other legally approved transfer mechanisms to ensure your data receives
              adequate protection.
            </p>
          </Card>

          {/* Children's Privacy */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Children's Privacy
            </h2>
            <p className="text-[#525252] leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information
              from children. If we become aware that we have collected personal information from a child without parental consent,
              we will take steps to delete that information promptly.
            </p>
          </Card>

          {/* Third-Party Links */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Third-Party Links and Services
            </h2>
            <p className="text-[#525252] leading-relaxed">
              Our website may contain links to third-party websites and services that are not operated by us. We are not
              responsible for the privacy practices of these third parties. We encourage you to review the privacy policies
              of any third-party sites you visit.
            </p>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-[#525252] leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              The "Last updated" date at the top of this page indicates when the policy was last revised. We encourage you to
              review this Privacy Policy periodically. Continued use of our services after changes constitutes acceptance of
              the updated policy.
            </p>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 p-6 sm:p-8 border-[#0A58D0]/20 bg-gradient-to-br from-[#0A58D0]/5 to-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-[#0A58D0]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  Contact Us
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-[#525252]">
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:privacy@innovoco.com" className="text-[#0A58D0] hover:underline">
                      privacy@innovoco.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">General Inquiries:</span>{' '}
                    <a href="mailto:info@innovoco.com" className="text-[#0A58D0] hover:underline">
                      info@innovoco.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href="tel:+13054158760" className="text-[#0A58D0] hover:underline">
                      +1 305-415-8760
                    </a>
                  </p>
                  <p className="pt-2">
                    <span className="font-semibold">Mailing Address:</span><br />
                    Innovoco<br />
                    333 SE 2nd Avenue, Suite 2000<br />
                    Miami, FL 33131<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* GDPR/CCPA Specific Information */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              Additional Information for EU/EEA and California Residents
            </h2>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">GDPR Rights (EU/EEA Residents)</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              Under the General Data Protection Regulation (GDPR), you have enhanced rights including the right to lodge a
              complaint with your local supervisory authority. Our legal basis for processing includes: consent, contract
              performance, legal obligations, and legitimate interests.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">CCPA Rights (California Residents)</h3>
            <p className="text-[#525252] leading-relaxed">
              Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal
              information we collect, the right to delete personal information, and the right to opt-out of the sale of
              personal information. We do not sell personal information. To exercise your CCPA rights, contact us at{' '}
              <a href="mailto:privacy@innovoco.com" className="text-[#0A58D0] hover:underline">
                privacy@innovoco.com
              </a>.
            </p>
          </Card>

        </div>
      </section>

      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}
