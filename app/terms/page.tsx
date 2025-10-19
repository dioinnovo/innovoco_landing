'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import ContactModal from '@/components/landing/ContactModal';
import { FileText, Scale, Shield, AlertCircle, CheckCircle, Mail } from 'lucide-react';

export default function TermsOfServicePage() {
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
              <Scale className="h-6 w-6" />
              <span className="text-sm font-semibold">Legal Terms & Conditions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0F19] mb-4">
              Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your")
                  and Innovoco ("Company," "we," "us," or "our") governing your access to and use of our website (innovoco.com)
                  and professional services.
                </p>
                <p className="text-[#525252] leading-relaxed mb-4">
                  By accessing our website or engaging our services, you acknowledge that you have read, understood, and agree
                  to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access
                  our website or use our services.
                </p>
                <p className="text-[#525252] leading-relaxed">
                  These Terms apply to all visitors, users, clients, and others who access or use our services.
                </p>
              </div>
            </div>
          </Card>

          {/* Services Description */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              2. Services Description
            </h2>
            <p className="text-[#525252] leading-relaxed mb-3">
              Innovoco provides enterprise AI and data transformation consulting services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mb-4">
              <li>Artificial Intelligence and Machine Learning implementation and strategy</li>
              <li>Data engineering, analytics, and business intelligence solutions</li>
              <li>Cloud platform implementation (Microsoft Azure, Google Cloud, AWS)</li>
              <li>Enterprise data platform consulting (Databricks, Snowflake)</li>
              <li>Generative AI and Large Language Model (LLM) deployment</li>
              <li>Data governance, security, and compliance consulting</li>
              <li>Custom software development and system integration</li>
            </ul>
            <p className="text-[#525252] leading-relaxed">
              Specific service terms, deliverables, timelines, and pricing will be detailed in individual Statements of Work (SOWs)
              or service agreements executed between the parties.
            </p>
          </Card>

          {/* Client Responsibilities */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              3. Client Responsibilities
            </h2>
            <p className="text-[#525252] leading-relaxed mb-3">
              As a client engaging our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4">
              <li>Provide accurate, complete, and timely information necessary for service delivery</li>
              <li>Grant appropriate access to systems, data, and personnel as required</li>
              <li>Designate qualified representatives with decision-making authority</li>
              <li>Respond to requests for information within agreed-upon timeframes</li>
              <li>Comply with all applicable laws, regulations, and licensing requirements</li>
              <li>Maintain the confidentiality of any proprietary methodologies or tools we provide</li>
              <li>Ensure you have the right to use and share all data and materials provided to us</li>
              <li>Pay all fees according to the agreed-upon payment terms</li>
            </ul>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  4. Intellectual Property Rights
                </h2>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Client Data and Materials</h3>
                <p className="text-[#525252] leading-relaxed mb-4">
                  You retain all ownership rights to your data, content, and materials provided to us. You grant us a limited,
                  non-exclusive license to use your materials solely for the purpose of delivering services under our agreement.
                </p>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Deliverables and Work Product</h3>
                <p className="text-[#525252] leading-relaxed mb-4">
                  Upon full payment, you will own all custom deliverables specifically created for you under the engagement,
                  including custom code, models, documentation, and reports, subject to the exclusions below.
                </p>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Innovoco Intellectual Property</h3>
                <p className="text-[#525252] leading-relaxed mb-3">
                  We retain all rights to our pre-existing and independently developed:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-1 ml-4 mb-4">
                  <li>Methodologies, frameworks, and best practices</li>
                  <li>Proprietary tools, templates, and accelerators</li>
                  <li>Generalized knowledge and expertise gained during engagements</li>
                  <li>Third-party software, platforms, and open-source components</li>
                </ul>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Third-Party Software</h3>
                <p className="text-[#525252] leading-relaxed">
                  Any third-party software, platforms, or services (e.g., Microsoft Azure, Google Cloud, Databricks, Snowflake,
                  OpenAI) are subject to their respective license terms. You are responsible for obtaining and maintaining
                  appropriate licenses for third-party products.
                </p>
              </div>
            </div>
          </Card>

          {/* Confidentiality */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              5. Confidentiality
            </h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              Both parties agree to maintain the confidentiality of all non-public information disclosed during the engagement.
              Confidential information includes business strategies, technical data, customer information, pricing, and any
              information marked as confidential.
            </p>
            <p className="text-[#525252] leading-relaxed mb-3">
              Confidential information does not include information that:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-1 ml-4 mb-4">
              <li>Is or becomes publicly available through no breach of this agreement</li>
              <li>Was rightfully possessed prior to disclosure</li>
              <li>Is independently developed without use of confidential information</li>
              <li>Is required to be disclosed by law or court order</li>
            </ul>
            <p className="text-[#525252] leading-relaxed">
              This confidentiality obligation survives the termination of services and continues for five (5) years from the
              date of disclosure.
            </p>
          </Card>

          {/* Payment Terms */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              6. Payment Terms
            </h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              All fees and payment terms will be specified in the applicable Statement of Work or service agreement. Unless
              otherwise agreed in writing:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4 mb-4">
              <li>Invoices are due within thirty (30) days of invoice date</li>
              <li>Late payments may incur interest at 1.5% per month or the maximum rate permitted by law</li>
              <li>All fees are non-refundable except as expressly stated in the service agreement</li>
              <li>You are responsible for all taxes, except those based on our net income</li>
              <li>Expenses will be billed separately unless otherwise agreed</li>
            </ul>
            <p className="text-[#525252] leading-relaxed">
              We reserve the right to suspend services for accounts with overdue balances exceeding thirty (30) days.
            </p>
          </Card>

          {/* Warranties and Disclaimers */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  7. Warranties and Disclaimers
                </h2>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Our Warranties</h3>
                <p className="text-[#525252] leading-relaxed mb-4">
                  We warrant that our services will be performed in a professional and workmanlike manner consistent with industry
                  standards. We will re-perform any services that fail to meet this standard at no additional cost, provided you
                  notify us in writing within thirty (30) days of delivery.
                </p>

                <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Disclaimer of Warranties</h3>
                <p className="text-[#525252] leading-relaxed mb-3 uppercase font-semibold">
                  EXCEPT AS EXPRESSLY PROVIDED HEREIN, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-1 ml-4 mb-4">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Warranties that services will be uninterrupted or error-free</li>
                  <li>Warranties regarding specific results, ROI, or business outcomes</li>
                  <li>Warranties regarding third-party services or platforms</li>
                </ul>
                <p className="text-[#525252] leading-relaxed">
                  We do not guarantee specific business results, cost savings, or return on investment, although we strive to
                  deliver maximum value. Actual results depend on many factors outside our control including your implementation,
                  adoption, and business environment.
                </p>
              </div>
            </div>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-8 p-6 sm:p-8 border-red-200 bg-red-50/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4 uppercase font-semibold">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL INNOVOCO BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-[#525252] space-y-1 ml-4 mb-4">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Loss of data or information</li>
                  <li>Business interruption or downtime</li>
                  <li>Cost of substitute services</li>
                  <li>Loss of goodwill or reputation</li>
                </ul>
                <p className="text-[#525252] leading-relaxed mb-4">
                  This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or
                  otherwise) and even if we have been advised of the possibility of such damages.
                </p>
                <p className="text-[#525252] leading-relaxed uppercase font-semibold">
                  OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO SERVICES SHALL NOT EXCEED THE TOTAL
                  FEES PAID BY YOU TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $50,000 USD, WHICHEVER IS GREATER.
                </p>
              </div>
            </div>
          </Card>

          {/* Indemnification */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              9. Indemnification
            </h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Innovoco, its officers, directors, employees, and agents from
              and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising
              out of or related to:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-2 ml-4">
              <li>Your use of our services or deliverables</li>
              <li>Your breach of these Terms or any applicable service agreement</li>
              <li>Your violation of any laws, regulations, or third-party rights</li>
              <li>Your data, content, or materials provided to us</li>
              <li>Your failure to obtain necessary licenses or permissions for third-party services</li>
            </ul>
          </Card>

          {/* Term and Termination */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              10. Term and Termination
            </h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              These Terms remain in effect while you access or use our services. Specific engagement terms and termination
              provisions will be detailed in individual service agreements.
            </p>
            <p className="text-[#525252] leading-relaxed mb-3">
              Either party may terminate an engagement for cause if:
            </p>
            <ul className="list-disc list-inside text-[#525252] space-y-1 ml-4 mb-4">
              <li>The other party materially breaches the agreement and fails to cure within thirty (30) days of written notice</li>
              <li>The other party becomes insolvent or files for bankruptcy protection</li>
              <li>Continuation would violate applicable law or regulation</li>
            </ul>
            <p className="text-[#525252] leading-relaxed mb-4">
              Upon termination, you must pay for all services performed through the termination date. Provisions regarding
              confidentiality, intellectual property, warranties, limitations of liability, and indemnification survive termination.
            </p>
            <p className="text-[#525252] leading-relaxed">
              We may immediately suspend access to our services if you breach payment obligations, violate security policies,
              or engage in conduct that could harm our systems, reputation, or other clients.
            </p>
          </Card>

          {/* Data Protection and Security */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
                  11. Data Protection and Security
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4">
                  We maintain industry-standard security measures including SOC 2 Type II, HIPAA, GDPR compliance frameworks,
                  and ISO/IEC 42001:2023 AI Management Systems certification. Our data handling practices are detailed in our
                  Privacy Policy.
                </p>
                <p className="text-[#525252] leading-relaxed mb-4">
                  For engagements involving sensitive or regulated data, we will execute appropriate Data Processing Agreements
                  (DPAs) and Business Associate Agreements (BAAs) as required by law.
                </p>
                <p className="text-[#525252] leading-relaxed">
                  You are responsible for ensuring you have the legal right to provide us access to any data and for complying
                  with all applicable data protection laws in your collection and use of data.
                </p>
              </div>
            </div>
          </Card>

          {/* Export Compliance */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              12. Export Compliance
            </h2>
            <p className="text-[#525252] leading-relaxed">
              Our services and deliverables may be subject to U.S. export control laws and regulations. You agree to comply
              with all applicable import/export laws and regulations and will not export, re-export, or transfer any deliverables,
              technology, or technical data to prohibited countries, entities, or individuals without required government
              authorization.
            </p>
          </Card>

          {/* Dispute Resolution */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              13. Dispute Resolution and Governing Law
            </h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States,
              without regard to its conflict of law provisions.
            </p>
            <p className="text-[#525252] leading-relaxed mb-4">
              Any disputes arising out of or related to these Terms or our services shall first be attempted to be resolved
              through good-faith negotiation between the parties' senior executives within thirty (30) days.
            </p>
            <p className="text-[#525252] leading-relaxed">
              If negotiation fails, disputes shall be resolved through binding arbitration in Miami, Florida, administered by
              the American Arbitration Association under its Commercial Arbitration Rules. The arbitrator's award shall be final
              and may be entered as a judgment in any court of competent jurisdiction. Each party bears its own costs except as
              awarded by the arbitrator.
            </p>
          </Card>

          {/* General Provisions */}
          <Card className="mb-8 p-6 sm:p-8 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-4">
              14. General Provisions
            </h2>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Entire Agreement</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              These Terms, together with any applicable Statement of Work or service agreement, constitute the entire agreement
              between the parties and supersede all prior communications and proposals.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Amendments</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of material changes via email or
              website notice. Continued use of services after changes constitutes acceptance of modified Terms.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Assignment</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              You may not assign or transfer these Terms or any rights hereunder without our prior written consent. We may
              assign these Terms in connection with a merger, acquisition, or sale of assets with notice to you.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Severability</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary so that these Terms otherwise remain in full force and effect.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Waiver</h3>
            <p className="text-[#525252] leading-relaxed mb-4">
              No waiver of any term or condition shall be deemed a further or continuing waiver of such term or any other term.
              Failure to enforce any right or provision shall not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">Force Majeure</h3>
            <p className="text-[#525252] leading-relaxed">
              Neither party shall be liable for failure or delay in performance due to causes beyond its reasonable control,
              including acts of God, war, terrorism, pandemics, labor disputes, internet failures, or government actions.
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
                  15. Contact Information
                </h2>
                <p className="text-[#525252] leading-relaxed mb-4">
                  For questions about these Terms of Service or to discuss engagement terms, please contact us:
                </p>
                <div className="space-y-2 text-[#525252]">
                  <p>
                    <span className="font-semibold">Legal Inquiries:</span>{' '}
                    <a href="mailto:legal@innovoco.com" className="text-[#0A58D0] hover:underline">
                      legal@innovoco.com
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

          {/* Acknowledgment */}
          <Card className="mb-8 p-6 sm:p-8 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B0F19] mb-3">
                  Acknowledgment
                </h2>
                <p className="text-[#525252] leading-relaxed">
                  BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
                  IF YOU ARE ENTERING INTO THESE TERMS ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE
                  THE AUTHORITY TO BIND SUCH ENTITY TO THESE TERMS.
                </p>
              </div>
            </div>
          </Card>

        </div>
      </section>

      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}
