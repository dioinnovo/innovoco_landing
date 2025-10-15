import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #0ea5e9',
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0f172a',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e293b',
  },
  text: {
    fontSize: 11,
    marginBottom: 8,
    color: '#475569',
    lineHeight: 1.5,
  },
  badge: {
    backgroundColor: '#e0f2fe',
    color: '#0284c7',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
    marginRight: 8,
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  card: {
    border: '1 solid #e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f8fafc',
  },
  cardAccent: {
    borderLeft: '3 solid #0ea5e9',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0f172a',
  },
  cardText: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  list: {
    marginLeft: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e2e8f0',
    minHeight: 25,
  },
  tableHeader: {
    backgroundColor: '#f1f5f9',
    fontWeight: 'bold',
    borderTop: '2 solid #0ea5e9',
  },
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 8,
    color: '#475569',
  },
  tableCellFirst: {
    flex: 1.3,
    padding: 6,
    fontSize: 8,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  tableCellHeader: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  tableCellHeaderFirst: {
    flex: 1.3,
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 15,
  },
  singleColumn: {
    flexDirection: 'column',
    width: '100%',
  },
  column: {
    flex: 1,
  },
  workflowCard: {
    border: '1 solid #e2e8f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  workflowGrid: {
    flexDirection: 'column',
    gap: 15,
  },
  workflowRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  workflowCardEnhanced: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  workflowCardSecurity: {
    borderTopWidth: 3,
    borderTopColor: '#10b981',
  },
  workflowCardData: {
    borderTopWidth: 3,
    borderTopColor: '#3b82f6',
  },
  workflowCardAnalytics: {
    borderTopWidth: 3,
    borderTopColor: '#f59e0b',
  },
  workflowCardCustomer: {
    borderTopWidth: 3,
    borderTopColor: '#8b5cf6',
  },
  workflowCardOperations: {
    borderTopWidth: 3,
    borderTopColor: '#6b7280',
  },
  workflowCardFinance: {
    borderTopWidth: 3,
    borderTopColor: '#ef4444',
  },
  workflowCategory: {
    marginBottom: 8,
  },
  workflowCategoryText: {
    fontSize: 9,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  workflowMainTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  workflowSubtitle: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 8,
  },
  workflowTechStack: {
    marginBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  workflowTechLabel: {
    fontSize: 8,
    color: '#94a3b8',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  workflowTechText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.3,
  },
  workflowBenefit: {
    marginTop: 4,
  },
  workflowBenefitText: {
    fontSize: 9,
    color: '#059669',
    lineHeight: 1.3,
  },
  workflowNumber: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748b',
    marginRight: 6,
  },
  workflowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  workflowTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
  },
  workflowStack: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 3,
  },
  workflowValue: {
    fontSize: 9,
    color: '#475569',
  },
  roiCard: {
    border: '1 solid #e2e8f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    flexDirection: 'column',
  },
  roiCardHighlight: {
    borderLeft: '3 solid #0ea5e9',
    backgroundColor: '#f0f9ff',
  },
  roiSection: {
    marginBottom: 20,
  },
  roiSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0f172a',
  },
  roiCardContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  roiLevel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  roiTimeline: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 4,
  },
  roiOptions: {
    fontSize: 9,
    color: '#64748b',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1 solid #e5e5e5',
    paddingTop: 10,
    fontSize: 9,
    color: '#94a3b8',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
    color: '#94a3b8',
  },
  highlightBox: {
    backgroundColor: '#eff6ff',
    borderLeft: '3 solid #3b82f6',
    padding: 10,
    marginBottom: 10,
  },
});

// Data for the PDF
const TODAY = "August 25, 2025";

const recommendations = [
  {
    title: "Pillar A — Microsoft Agentic Stack",
    body: "Adopt Azure AI Foundry for runtime + SK Agents for SDK. Use AutoGen patterns where conversational multi‑agent fits. Aligns with MS ecosystems, security, and data residency.",
  },
  {
    title: "Pillar B — Google Vertex AI Stack",
    body: "For clients anchored in GCP, use Vertex AI (Agent Builder, Studio, Model Garden) with BigQuery‑native data, built‑in evals/observability, and enterprise controls (VPC‑SC/CMEK).",
  },
  {
    title: "Framework‑agnostic Orchestration — LangGraph",
    body: "Standardize on LangGraph for stateful, auditable, long‑running agent workflows across clouds (Azure or GCP). Deploy cloud/hybrid/self‑host; use LangSmith for evals/tracing.",
  },
  {
    title: "Bridge — Integration & Automation Layer",
    body: "Offer n8n (self‑host) as the integration fabric to connect ERPs/CRMs/DBs, enabling citizen‑dev changes under IT governance. Use Power Automate selectively for O365/RPA; Pipedream for dev‑centric SaaS.",
  },
];

const workflows = [
  {
    title: "Regulated Client Onboarding",
    stack: "LangGraph + n8n + Azure/Vertex",
    value: "Frictionless KYC/AML with auditable trails",
  },
  {
    title: "Enterprise Knowledge Copilot",
    stack: "Azure Foundry or Vertex + LangGraph",
    value: "Governed retrieval across all data sources",
  },
  {
    title: "Predictive Supply Chain",
    stack: "Vertex AI + n8n + LangGraph",
    value: "Demand forecasting → reorder → vendor orchestration",
  },
  {
    title: "360° Customer Support Bot",
    stack: "SK/AutoGen or Vertex + LangGraph + n8n",
    value: "Tiered triage; agent handoff; CRM updates",
  },
  {
    title: "Field Services & IoT Playbooks",
    stack: "n8n + LangGraph + Power Automate",
    value: "Sensor anomaly → dispatch → work order",
  },
  {
    title: "Enterprise Reporting Automation",
    stack: "LangSmith/LangGraph + n8n + Vertex",
    value: "Quarterly packs; lineage; audit trails",
  },
  {
    title: "Marketing Personalization",
    stack: "LangGraph + Vertex AI + n8n",
    value: "Segments, content variants, A/B learnings",
  },
  {
    title: "Cross‑border HR & Payroll",
    stack: "n8n + Azure Foundry or Vertex",
    value: "Policy checks; payroll runs; compliance",
  },
];

const roiFactors = {
  timeToValue: [
    { level: "Fast", timeline: "Days to Weeks", options: "n8n, LangChain, CrewAI" },
    { level: "Medium", timeline: "Weeks to Months", options: "Azure, Google Vertex" },
    { level: "Slow", timeline: "Months to Quarters", options: "Custom solutions" },
  ],
  scalabilityCosts: [
    { level: "Linear", type: "Predictable", options: "n8n self-hosted" },
    { level: "Progressive", type: "Tiered", options: "LangChain" },
    { level: "Exponential", type: "Usage-based", options: "Cloud platforms" },
  ],
  switchingCosts: [
    { level: "Low", type: "Portable", options: "Open source options" },
    { level: "Medium", type: "Some lock-in", options: "LangChain, n8n" },
    { level: "High", type: "Platform-specific", options: "Azure, Google" },
  ],
};

const dataUseCases = [
  {
    title: "Conversational Data Analytics",
    desc: "Empower every executive to become a data analyst. Ask questions in plain English, receive insights in seconds.",
    impact: [
      "300% increase in data adoption",
      "75% reduction in IT support tickets",
      "10x faster insight generation",
    ],
  },
  {
    title: "AI‑Powered Master Data Management",
    desc: "Ensure your data is AI‑ready with intelligent cleaning, standardization, and governance powered by machine learning.",
    impact: [
      "95% data quality improvement in 30 days",
      "60% reduction in data preparation time",
      "Automated GDPR/CCPA compliance tracking",
    ],
  },
  {
    title: "Intelligent Pipeline Support Agent",
    desc: "Never lose sleep over failed pipelines again. Our AI agent diagnoses, resolves, and prevents data pipeline issues autonomously.",
    impact: [
      "90% reduction in pipeline failures",
      "24/7 autonomous monitoring and healing",
      "15‑minute average resolution time",
    ],
  },
  {
    title: "AI‑Driven DataOps Platform",
    desc: "Revolutionize your data operations with AI‑powered CI/CD, automated testing, and intelligent resource optimization.",
    impact: [
      "40% reduction in infrastructure costs",
      "5x faster deployment cycles",
      "Zero‑downtime updates and migrations",
    ],
  },
];

const functionalUseCases = [
  {
    title: "Intelligent Inspection Report System",
    desc: "Transform field inspections with voice‑powered AI that creates comprehensive reports in real‑time.",
    impact: [
      "80% reduction in documentation time",
      "99% accuracy in technical terminology",
      "Automatic photo annotation",
    ],
  },
  {
    title: "AI Voice Assistant Platform",
    desc: "Deploy human‑like AI agents that handle customer inquiries 24/7, seamlessly escalating to human agents when needed.",
    impact: [
      "70% reduction in call center costs",
      "24/7 availability in 40+ languages",
      "3‑second average response time",
    ],
  },
  {
    title: "Intelligent HR Onboarding Suite",
    desc: "Streamline employee onboarding from application to first day, with AI handling 90% of administrative tasks.",
    impact: [
      "5‑day to 1‑day onboarding acceleration",
      "Automatic Microsoft 365 provisioning",
      "Full compliance tracking",
    ],
  },
  {
    title: "BMAD‑Powered Development Accelerator",
    desc: "From idea to MVP in hours, not months. Our AI agent system creates pitch decks, technical specs, and working prototypes.",
    impact: [
      "10x faster prototype development",
      "Automatic technical documentation",
      "Production‑ready code generation",
    ],
  },
];

const matrixData = [
  {
    category: "Enterprise Readiness",
    azure: "✔ GA; governance",
    vertex: "✔ GA; Agent Builder",
    langGraph: "✔ GA; SOC2/HIPAA",
    n8n: "✔ SOC2; RBAC",
  },
  {
    category: "Observability & Evals",
    azure: "Prompt Flow, tracing",
    vertex: "Vertex Studio evals",
    langGraph: "LangSmith evals/traces",
    n8n: "Exec logs; Prometheus",
  },
  {
    category: "Long‑running Agents",
    azure: "✔ Foundry Agent Service",
    vertex: "✔ Agent Builder",
    langGraph: "✔ Graph state + retries",
    n8n: "Flows & schedules",
  },
  {
    category: "Best For",
    azure: "MS stack apps",
    vertex: "Data‑native AI",
    langGraph: "Multi‑agent graphs",
    n8n: "Workflow automation",
  },
  {
    category: "Privacy & Deploy",
    azure: "Azure tenant; VNet",
    vertex: "GCP; VPC‑SC; CMEK",
    langGraph: "Cloud/hybrid/self",
    n8n: "Self‑host or cloud",
  },
  {
    category: "Stability",
    azure: "Very high",
    vertex: "Very high",
    langGraph: "High",
    n8n: "High",
  },
];

// PDF Document Component
export const CaseStudiesPDF = () => (
  <Document>
    {/* Page 1 - Executive Summary */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Agentic Frameworks</Text>
        <Text style={styles.subtitle}>Executive & Enterprise Ready • {TODAY}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          A decision‑grade view of the Microsoft & Google stacks, plus framework‑agnostic orchestration 
          with LangGraph, and automation with n8n. This comprehensive analysis provides enterprise‑ready 
          solutions for AI‑powered data transformation.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Strategic Recommendations</Text>
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <View style={[styles.card, styles.cardAccent]}>
              <Text style={styles.cardTitle}>{recommendations[0].title}</Text>
              <Text style={styles.cardText}>{recommendations[0].body}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={[styles.card, styles.cardAccent]}>
              <Text style={styles.cardTitle}>{recommendations[1].title}</Text>
              <Text style={styles.cardText}>{recommendations[1].body}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.card, styles.cardAccent]}>
          <Text style={styles.cardTitle}>{recommendations[2].title}</Text>
          <Text style={styles.cardText}>{recommendations[2].body}</Text>
        </View>
        <View style={[styles.card, styles.cardAccent]}>
          <Text style={styles.cardTitle}>{recommendations[3].title}</Text>
          <Text style={styles.cardText}>{recommendations[3].body}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 1</Text>
    </Page>

    {/* Page 2 - Landscape Matrix */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Landscape Matrix</Text>
        <Text style={styles.subtitle}>Platform Comparison • {TODAY}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCellHeaderFirst}>Category</Text>
          <Text style={styles.tableCellHeader}>Azure Foundry</Text>
          <Text style={styles.tableCellHeader}>Vertex AI</Text>
          <Text style={styles.tableCellHeader}>LangGraph</Text>
          <Text style={styles.tableCellHeader}>n8n</Text>
        </View>
        {matrixData.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>{row.category}</Text>
            <Text style={styles.tableCell}>{row.azure}</Text>
            <Text style={styles.tableCell}>{row.vertex}</Text>
            <Text style={styles.tableCell}>{row.langGraph}</Text>
            <Text style={styles.tableCell}>{row.n8n}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          Azure & Vertex both provide agent runtimes, evals, and prompt tooling; LangGraph adds 
          framework‑agnostic orchestration, including long‑running state across clouds.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 2</Text>
    </Page>

    {/* Page 3 - Data Use Cases */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Use Cases</Text>
        <Text style={styles.subtitle}>AI Solutions for Enterprise Data</Text>
      </View>

      <View style={styles.twoColumns}>
        <View style={styles.column}>
          {dataUseCases.slice(0, 2).map((useCase, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{useCase.title}</Text>
              <Text style={styles.cardText}>{useCase.desc}</Text>
              <View style={styles.list}>
                {useCase.impact.map((item, i) => (
                  <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {dataUseCases.slice(2, 4).map((useCase, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{useCase.title}</Text>
              <Text style={styles.cardText}>{useCase.desc}</Text>
              <View style={styles.list}>
                {useCase.impact.map((item, i) => (
                  <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 3</Text>
    </Page>

    {/* Page 4 - Functional Use Cases */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Functional Use Cases</Text>
        <Text style={styles.subtitle}>Industry‑Specific AI Applications</Text>
      </View>

      <View style={styles.twoColumns}>
        <View style={styles.column}>
          {functionalUseCases.slice(0, 2).map((useCase, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{useCase.title}</Text>
              <Text style={styles.cardText}>{useCase.desc}</Text>
              <View style={styles.list}>
                {useCase.impact.map((item, i) => (
                  <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {functionalUseCases.slice(2, 4).map((useCase, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{useCase.title}</Text>
              <Text style={styles.cardText}>{useCase.desc}</Text>
              <View style={styles.list}>
                {useCase.impact.map((item, i) => (
                  <Text key={i} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 4</Text>
    </Page>

    {/* Page 5 - Enterprise Automation Workflows */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Workflows</Text>
        <Text style={styles.subtitle}>Battle-tested workflow patterns combining the best of cloud platforms and open-source orchestration</Text>
      </View>

      <View style={styles.workflowGrid}>
        {/* Row 1 - Security, Data, Analytics */}
        <View style={styles.workflowRow}>
          <View style={[styles.workflowCardEnhanced, styles.workflowCardSecurity]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Security</Text>
            </View>
            <Text style={styles.workflowMainTitle}>Regulated Client Onboarding</Text>
            <Text style={styles.workflowSubtitle}>(Finance/Insurance)</Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>LangGraph + n8n + Azure Foundry / Vertex Agent Builder</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Frictionless KYC/AML with auditable trails & automated approvals</Text>
            </View>
          </View>

          <View style={[styles.workflowCardEnhanced, styles.workflowCardData]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Data</Text>
            </View>
            <Text style={styles.workflowMainTitle}>Enterprise Knowledge Copilot</Text>
            <Text style={styles.workflowSubtitle}>(Cross-Dept)</Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>Azure Foundry or Vertex + LangGraph</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Governed retrieval across SharePoint/SQL/BigQuery; answers w/ citations</Text>
            </View>
          </View>

          <View style={[styles.workflowCardEnhanced, styles.workflowCardAnalytics]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Analytics</Text>
            </View>
            <Text style={styles.workflowMainTitle}>Predictive Supply Chain Management</Text>
            <Text style={styles.workflowSubtitle}></Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>Vertex AI + n8n + LangGraph (or Azure analogs)</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Demand forecasting → reorder → vendor orchestration (SLA-aware)</Text>
            </View>
          </View>
        </View>

        {/* Row 2 - Customer, Operations, Finance */}
        <View style={styles.workflowRow}>
          <View style={[styles.workflowCardEnhanced, styles.workflowCardCustomer]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Customer</Text>
            </View>
            <Text style={styles.workflowMainTitle}>360° Customer Support Bot</Text>
            <Text style={styles.workflowSubtitle}></Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>SK/AutoGen or Vertex + LangGraph + n8n</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Tiered triage; agent handoff; CRM updates</Text>
            </View>
          </View>

          <View style={[styles.workflowCardEnhanced, styles.workflowCardOperations]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Operations</Text>
            </View>
            <Text style={styles.workflowMainTitle}>Field Services & IoT Incident Playbooks</Text>
            <Text style={styles.workflowSubtitle}></Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>n8n + LangGraph + Power Automate</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Sensor anomaly → dispatch → work order</Text>
            </View>
          </View>

          <View style={[styles.workflowCardEnhanced, styles.workflowCardFinance]}>
            <View style={styles.workflowCategory}>
              <Text style={styles.workflowCategoryText}>Finance</Text>
            </View>
            <Text style={styles.workflowMainTitle}>Enterprise Reporting & Audit Automation</Text>
            <Text style={styles.workflowSubtitle}></Text>
            <View style={styles.workflowTechStack}>
              <Text style={styles.workflowTechLabel}>TECH STACK</Text>
              <Text style={styles.workflowTechText}>LangSmith/LangGraph + n8n + Vertex</Text>
            </View>
            <View style={styles.workflowBenefit}>
              <Text style={styles.workflowBenefitText}>✓ Quarterly packs; lineage; audit trails</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 5</Text>
    </Page>

    {/* Page 6 is now ROI, so no need for workflows continuation */}

    {/* Page 6 - Return on Investment */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Return on Investment Factors</Text>
        <Text style={styles.subtitle}>Critical Decision Metrics • {TODAY}</Text>
      </View>

      <View style={styles.singleColumn}>
        {/* Time to Value Section */}
        <View style={styles.roiSection}>
          <Text style={styles.roiSectionTitle}>⏱️ Time to Value</Text>
          <View style={styles.roiCardContainer}>
            <View style={[styles.roiCard, styles.roiCardHighlight]}>
              <Text style={styles.roiLevel}>Fast</Text>
              <Text style={styles.roiTimeline}>Days to Weeks</Text>
              <Text style={styles.roiOptions}>n8n, LangChain, CrewAI</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>Medium</Text>
              <Text style={styles.roiTimeline}>Weeks to Months</Text>
              <Text style={styles.roiOptions}>Azure, Google Vertex</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>Slow</Text>
              <Text style={styles.roiTimeline}>Months to Quarters</Text>
              <Text style={styles.roiOptions}>Custom solutions</Text>
            </View>
          </View>
        </View>

        {/* Scalability Costs Section */}
        <View style={styles.roiSection}>
          <Text style={styles.roiSectionTitle}>📊 Scalability Costs</Text>
          <View style={styles.roiCardContainer}>
            <View style={[styles.roiCard, styles.roiCardHighlight]}>
              <Text style={styles.roiLevel}>Linear</Text>
              <Text style={styles.roiTimeline}>Predictable</Text>
              <Text style={styles.roiOptions}>n8n self-hosted</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>Progressive</Text>
              <Text style={styles.roiTimeline}>Tiered</Text>
              <Text style={styles.roiOptions}>LangChain</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>Exponential</Text>
              <Text style={styles.roiTimeline}>Usage-based</Text>
              <Text style={styles.roiOptions}>Cloud platforms</Text>
            </View>
          </View>
        </View>

        {/* Switching Costs Section */}
        <View style={styles.roiSection}>
          <Text style={styles.roiSectionTitle}>🔄 Switching Costs</Text>
          <View style={styles.roiCardContainer}>
            <View style={[styles.roiCard, styles.roiCardHighlight]}>
              <Text style={styles.roiLevel}>Low</Text>
              <Text style={styles.roiTimeline}>Portable</Text>
              <Text style={styles.roiOptions}>Open source options</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>Medium</Text>
              <Text style={styles.roiTimeline}>Some lock-in</Text>
              <Text style={styles.roiOptions}>LangChain, n8n</Text>
            </View>
            <View style={styles.roiCard}>
              <Text style={styles.roiLevel}>High</Text>
              <Text style={styles.roiTimeline}>Platform-specific</Text>
              <Text style={styles.roiOptions}>Azure, Google</Text>
            </View>
          </View>
        </View>

        {/* Decision Point */}
        <View style={styles.highlightBox}>
          <Text style={styles.cardTitle}>💡 Decision Point</Text>
          <Text style={styles.cardText}>
            Choose open-source for flexibility and control. Choose proprietary for faster time-to-market and managed services.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 6</Text>
    </Page>

    {/* Page 7 - Open Source vs Proprietary */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Open‑Source vs Proprietary — Practical Take</Text>
        <Text style={styles.subtitle}>Decision Framework • {TODAY}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Framework‑Agnostic Approach (LangGraph, n8n)</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✓ Advantages</Text>
          <Text style={styles.cardText}>
            Orchestrate across Azure & GCP; self‑host to keep data in VPC; avoid lock‑in; 
            pair with LangSmith for evals/tracing.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚠ Considerations</Text>
          <Text style={styles.cardText}>
            You own ops and SLAs when self‑hosting; budget for SRE/observability.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>First‑Party Cloud Platform (Azure Foundry • Vertex AI)</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✓ Advantages</Text>
          <Text style={styles.cardText}>
            Native evals/observability, agent runtimes, identity, and governance inside each cloud; 
            fastest path for in‑ecosystem clients.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚠ Considerations</Text>
          <Text style={styles.cardText}>
            Cross‑cloud portability lower than framework‑agnostic; pricing & quotas apply.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
        <Text>Prepared for: Florida & Ontario enterprise clients</Text>
      </View>

      <Text style={styles.pageNumber}>Page 7</Text>
    </Page>
  </Document>
);

// Export button component
export const PDFExportButton = ({ className }: { className?: string }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<CaseStudiesPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `innovoco-case-studies-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Use the provided className if available, otherwise use default styles
  const buttonClassName = className ? className : "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  return (
    <button 
      className={buttonClassName}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
};