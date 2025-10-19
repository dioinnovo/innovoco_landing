"use client";

import { ServiceSection } from '@/components/services/ServiceSection';
import { UseCaseCard, UseCaseGrid } from './UseCaseCard';
import { MetricCard, MetricGrid } from './MetricCard';
import { TechnologyStack, financialTechnologies } from './TechnologyStack';
import { TrendingUp, Shield, DollarSign, Activity, AlertTriangle, TrendingDown, BarChart3, Lock } from 'lucide-react';

export function FinancialSection() {
  return (
    <div id="financial" className="scroll-mt-20">
      <ServiceSection
        icon={TrendingUp}
        iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
        title="Financial Services AI Automation & Analytics Solutions"
        subtitle="Real-time fraud detection automation, risk analytics, and regulatory compliance"
      >
        {/* Key Metrics */}
        <MetricGrid columns={4}>
          <MetricCard
            icon={DollarSign}
            metric="$50M+"
            label="Fraud Savings"
            description="Annual fraud losses prevented through ML detection"
            gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          />
          <MetricCard
            icon={Activity}
            metric="95%+"
            label="Detection Rate"
            description="Real-time fraud detection accuracy with low false positives"
            gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          />
          <MetricCard
            icon={TrendingUp}
            metric="<100ms"
            label="Transaction Scoring"
            description="Sub-100ms fraud risk scoring for real-time payments"
            gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          />
          <MetricCard
            icon={Shield}
            metric="100%"
            label="SOC 2 Compliant"
            description="Full compliance with PCI-DSS, SOC 2, and regulatory requirements"
            gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          />
        </MetricGrid>

        {/* Fraud Detection & AML */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            Fraud Detection & AML (Anti-Money Laundering)
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Financial fraud costs institutions billions annually. Our fraud detection systems use machine learning to identify suspicious
            transactions in real time—analyzing payment patterns, merchant categories, geographic anomalies, and behavioral biometrics
            to flag potential fraud before transactions complete. Models are trained on historical fraud data and continuously retrained
            as fraud tactics evolve, achieving 95%+ detection rates while minimizing false positives.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={AlertTriangle}
              title="Real-Time Payment Fraud"
              metric="Sub-100ms scoring"
              description="Transaction scoring for credit card, ACH, and wire fraud prevention"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
              expandable
              details="Machine learning models analyze payment patterns, merchant categories, geographic anomalies, and behavioral biometrics in real-time."
              benefits={[
                "95%+ fraud detection rate with low false positives",
                "Sub-100ms transaction scoring",
                "Continuous model retraining as fraud tactics evolve"
              ]}
            />
            <UseCaseCard
              icon={Shield}
              title="Account Takeover Detection"
              metric="Behavioral biometrics"
              description="Identify compromised accounts through behavioral anomaly detection"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
              expandable
              details="Behavioral biometrics and anomaly detection identify compromised accounts by analyzing login patterns, device fingerprints, and transaction behaviors."
              benefits={[
                "Real-time detection of account compromises",
                "Device fingerprinting and behavioral analysis",
                "Reduced customer friction from false alerts"
              ]}
            />
            <UseCaseCard
              icon={BarChart3}
              title="AML Transaction Monitoring"
              metric="High-quality SARs"
              description="Rule-based + ML hybrid systems generating Suspicious Activity Reports"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
              expandable
              details="Transaction monitoring systems detect structuring, smurfing, and money laundering patterns across checking accounts, wire transfers, and cryptocurrency exchanges."
              benefits={[
                "BSA and FinCEN compliance",
                "Hybrid rule-based and ML detection",
                "Automated SAR generation for compliance teams"
              ]}
            />
            <UseCaseCard
              icon={TrendingDown}
              title="Cryptocurrency Fraud"
              metric="Blockchain analytics"
              description="Detect wash trading, pump-and-dump schemes, and ransomware payments"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
              expandable
              details="Blockchain analytics detecting wash trading, pump-and-dump schemes, ransomware payments, and other cryptocurrency fraud patterns."
              benefits={[
                "Real-time blockchain transaction monitoring",
                "Pattern detection for crypto-specific fraud",
                "Integration with exchange platforms"
              ]}
            />
          </UseCaseGrid>
        </div>

        {/* Credit Risk Modeling */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            Credit Risk Modeling & Underwriting
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Traditional credit scoring models (FICO) miss opportunities to lend to underbanked populations and may contain hidden biases.
            Our alternative credit risk models incorporate non-traditional data—utility payments, rent history, cash flow analysis from
            bank transactions, education, and employment—to assess creditworthiness for applicants with thin credit files. Models comply
            with Fair Lending regulations (ECOA, Fair Housing Act) and are regularly tested for disparate impact.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={TrendingUp}
              title="Alternative Credit Scoring"
              metric="15-25% approval lift"
              description="ML models expanding credit access for thin-file applicants"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={DollarSign}
              title="Commercial Loan Underwriting"
              metric="Automated PD/LGD"
              description="Probability of default and loss given default estimation for middle-market lending"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={Activity}
              title="Portfolio Risk Management"
              metric="Stress testing"
              description="Scenario analysis for credit portfolios under adverse conditions"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={Shield}
              title="Fair Lending Compliance"
              metric="Bias testing"
              description="Explainability tools ensuring models comply with ECOA"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
          </UseCaseGrid>
        </div>

        {/* Algorithmic Trading */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Algorithmic Trading & Market Risk
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Quantitative trading firms and investment banks use AI to identify alpha-generating signals in market data. Our algorithmic
            trading solutions analyze order book dynamics, news sentiment, social media trends, and macroeconomic indicators to predict
            short-term price movements. For market risk management, we build VaR and Expected Shortfall models that estimate potential losses
            under normal and stressed market conditions.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={BarChart3}
              title="Sentiment-Driven Trading"
              metric="NLP alpha signals"
              description="News, earnings calls, and social media analysis for trading signals"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={Activity}
              title="High-Frequency Market Making"
              metric="Sub-millisecond"
              description="Low-latency order routing and inventory management"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={TrendingUp}
              title="Portfolio Optimization"
              metric="ML-based forecasts"
              description="Mean-variance optimization with return forecasts and risk constraints"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
            <UseCaseCard
              icon={AlertTriangle}
              title="VaR & Stress Testing"
              metric="Basel III compliant"
              description="Monte Carlo simulation and scenario analysis for risk management"
              gradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
            />
          </UseCaseGrid>
        </div>

        {/* Financial Compliance */}
        <div className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#6EE7B7]/30">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <Lock className="h-7 w-7 text-[#059669]" />
            Financial Data Compliance & Security
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-6">
            Financial services face stringent regulatory requirements: SOC 2 for data security, PCI-DSS for payment card data, GLBA for
            customer privacy, and SEC/FINRA rules for market data and trading systems. Our data platforms implement required controls:
            encryption, access logging, change management, incident response, and annual audits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#6EE7B7]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">SOC 2 Type II Controls</h4>
              <p className="text-sm text-[#525252]">Security, availability, confidentiality, processing integrity, privacy</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#6EE7B7]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">PCI-DSS Compliance</h4>
              <p className="text-sm text-[#525252]">Secure payment data storage, transmission, and processing (Level 1 certified)</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#6EE7B7]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Model Risk Management (MRM)</h4>
              <p className="text-sm text-[#525252]">SR 11-7 compliant model governance, validation, and documentation</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#6EE7B7]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Regulatory Reporting</h4>
              <p className="text-sm text-[#525252]">Automated CCAR, stress test, and liquidity coverage ratio (LCR) reports</p>
            </div>
          </div>
        </div>

        {/* Technology Integrations */}
        <TechnologyStack
          title="Financial Services Technology Integrations"
          description="Deep integration with core banking systems, data platforms, and regulatory compliance frameworks"
          technologies={financialTechnologies}
          columns={5}
        />
      </ServiceSection>
    </div>
  );
}
