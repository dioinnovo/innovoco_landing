import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { Download } from 'lucide-react';

// Create styles for PDF - using ONLY basic characters
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
  bulletPoint: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 3,
    paddingLeft: 10,
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
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
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
  roiCard: {
    border: '1 solid #e2e8f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  roiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f766e',
    marginBottom: 4,
  },
  roiLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  workflowCard: {
    border: '1 solid #e2e8f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
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
});

// Get today's date
const TODAY = new Date().toLocaleDateString('en-US', { 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric' 
});

// Main recommendations data
const recommendations = [
  {
    title: "Microsoft Agentic Stack",
    body: "Adopt Azure AI Foundry for runtime + SK Agents for SDK. Use AutoGen patterns where conversational multi-agent fits. Aligns with MS ecosystems, security, and data residency.",
  },
  {
    title: "Google Vertex AI Stack",
    body: "For clients anchored in GCP, use Vertex AI (Agent Builder, Studio, Model Garden) with BigQuery-native data, built-in evals/observability, and enterprise controls (VPC-SC/CMEK).",
  },
  {
    title: "LangGraph Orchestration",
    body: "Standardize on LangGraph for stateful, auditable, long-running agent workflows across clouds (Azure or GCP). Deploy cloud/hybrid/self-host; use LangSmith for evals/tracing.",
  },
  {
    title: "Integration & Automation Layer",
    body: "Offer n8n (self-host) as the integration fabric to connect ERPs/CRMs/DBs, enabling citizen-dev changes under IT governance. Use Power Automate selectively for O365/RPA.",
  },
];

// Workflows data
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
    value: "Demand forecasting to reorder to vendor orchestration",
  },
  {
    title: "360 Customer Support Bot",
    stack: "SK/AutoGen or Vertex + LangGraph + n8n",
    value: "Tiered triage; agent handoff; CRM updates",
  },
  {
    title: "Field Services & IoT Playbooks",
    stack: "n8n + LangGraph + Power Automate",
    value: "Sensor anomaly to dispatch to work order",
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
    title: "Cross-border HR & Payroll",
    stack: "n8n + Azure Foundry or Vertex",
    value: "Policy checks; payroll runs; compliance",
  },
];

// Matrix data
const matrixData = [
  {
    category: "Enterprise Readiness",
    azure: "GA; governance",
    vertex: "GA; Agent Builder",
    langGraph: "GA; SOC2/HIPAA",
    n8n: "SOC2; RBAC",
  },
  {
    category: "Observability & Evals",
    azure: "Prompt Flow, tracing",
    vertex: "Vertex Studio evals",
    langGraph: "LangSmith evals/traces",
    n8n: "Exec logs; Prometheus",
  },
  {
    category: "Long-running Agents",
    azure: "Foundry Agent Service",
    vertex: "Agent Builder",
    langGraph: "Graph state + retries",
    n8n: "Flows & schedules",
  },
  {
    category: "Best For",
    azure: "MS stack apps",
    vertex: "Data-native AI",
    langGraph: "Multi-agent graphs",
    n8n: "Workflow automation",
  },
  {
    category: "Privacy & Deploy",
    azure: "Azure tenant; VNet",
    vertex: "GCP; VPC-SC; CMEK",
    langGraph: "Cloud/hybrid/self",
    n8n: "Self-host or cloud",
  },
];

// Data use cases
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
    title: "AI-Powered Master Data Management",
    desc: "Ensure your data is AI-ready with intelligent cleaning, standardization, and governance powered by machine learning.",
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
      "15-minute average resolution time",
    ],
  },
  {
    title: "AI-Driven DataOps Platform",
    desc: "Revolutionize your data operations with AI-powered CI/CD, automated testing, and intelligent resource optimization.",
    impact: [
      "40% reduction in infrastructure costs",
      "5x faster deployment cycles",
      "Zero-downtime updates and migrations",
    ],
  },
];

// PDF Document Component
export const EnhancedCaseStudiesPDF = () => (
  <Document>
    {/* Page 1 - Executive Summary & ROI */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise AI & Automation Framework</Text>
        <Text style={styles.subtitle}>Executive Decision Guide • {TODAY}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          Transforming data into intelligence. Turning intelligence into action.
        </Text>
        <Text style={styles.text}>
          A comprehensive framework for enterprise AI transformation with proven ROI, 
          rapid deployment, and enterprise-grade security.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Impact Metrics</Text>
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <View style={styles.roiCard}>
              <Text style={styles.roiValue}>40-60%</Text>
              <Text style={styles.roiLabel}>Cost Reduction</Text>
              <Text style={styles.cardText}>Year 1 operational savings</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.roiCard}>
              <Text style={styles.roiValue}>30 Days</Text>
              <Text style={styles.roiLabel}>POC Timeline</Text>
              <Text style={styles.cardText}>90 days to full production</Text>
            </View>
          </View>
        </View>
        <View style={styles.roiCard}>
          <Text style={styles.roiValue}>SOC2 + GDPR</Text>
          <Text style={styles.roiLabel}>Enterprise Compliance</Text>
          <Text style={styles.cardText}>Full regulatory compliance from day one</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 1</Text>
    </Page>

    {/* Page 2 - Strategic Foundations */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Strategic Foundations</Text>
        <Text style={styles.subtitle}>Four Pillars of AI Transformation • {TODAY}</Text>
      </View>

      {recommendations.map((rec, idx) => (
        <View key={idx} style={[styles.card, styles.cardAccent]}>
          <Text style={styles.cardTitle}>Pillar {idx + 1}: {rec.title}</Text>
          <Text style={styles.cardText}>{rec.body}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 2</Text>
    </Page>

    {/* Page 3 - Platform Comparison Matrix */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Platform Comparison Matrix</Text>
        <Text style={styles.subtitle}>Enterprise Capabilities Assessment • {TODAY}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableHeaderCell, {flex: 1.5}]}>Capability</Text>
          <Text style={styles.tableHeaderCell}>Azure</Text>
          <Text style={styles.tableHeaderCell}>Vertex AI</Text>
          <Text style={styles.tableHeaderCell}>LangGraph</Text>
          <Text style={styles.tableHeaderCell}>n8n</Text>
        </View>
        {matrixData.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableCell, {flex: 1.5, fontWeight: 'bold'}]}>{row.category}</Text>
            <Text style={styles.tableCell}>{row.azure}</Text>
            <Text style={styles.tableCell}>{row.vertex}</Text>
            <Text style={styles.tableCell}>{row.langGraph}</Text>
            <Text style={styles.tableCell}>{row.n8n}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 3</Text>
    </Page>

    {/* Page 4 - Data Use Cases */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Transformation Use Cases</Text>
        <Text style={styles.subtitle}>AI-Powered Solutions • {TODAY}</Text>
      </View>

      {dataUseCases.map((useCase, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardTitle}>{useCase.title}</Text>
          <Text style={styles.cardText}>{useCase.desc}</Text>
          <View style={{marginTop: 5}}>
            {useCase.impact.map((item, i) => (
              <Text key={i} style={styles.bulletPoint}>• {item}</Text>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 4</Text>
    </Page>

    {/* Page 5 - Enterprise Automation Workflows */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Automation Workflows</Text>
        <Text style={styles.subtitle}>Battle-tested Integration Patterns • {TODAY}</Text>
      </View>

      <View style={styles.twoColumns}>
        <View style={styles.column}>
          {workflows.slice(0, 4).map((workflow, idx) => (
            <View key={idx} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <Text style={styles.workflowNumber}>{idx + 1}.</Text>
                <Text style={styles.workflowTitle}>{workflow.title}</Text>
              </View>
              <Text style={styles.workflowStack}>Stack: {workflow.stack}</Text>
              <Text style={styles.workflowValue}>Value: {workflow.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {workflows.slice(4, 8).map((workflow, idx) => (
            <View key={idx + 4} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <Text style={styles.workflowNumber}>{idx + 5}.</Text>
                <Text style={styles.workflowTitle}>{workflow.title}</Text>
              </View>
              <Text style={styles.workflowStack}>Stack: {workflow.stack}</Text>
              <Text style={styles.workflowValue}>Value: {workflow.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 5</Text>
    </Page>

    {/* Page 6 - Decision Framework */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Open-Source vs Proprietary</Text>
        <Text style={styles.subtitle}>Decision Framework • {TODAY}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Framework-Agnostic Approach (LangGraph, n8n)</Text>
        <View style={[styles.card, {backgroundColor: '#f0fdf4', borderLeft: '3 solid #22c55e'}]}>
          <Text style={[styles.cardTitle, {color: '#166534'}]}>Advantages</Text>
          <Text style={styles.cardText}>
            Orchestrate across Azure & GCP; self-host to keep data in VPC; avoid lock-in; 
            pair with LangSmith for evals/tracing.
          </Text>
        </View>
        <View style={[styles.card, {backgroundColor: '#fef2f2', borderLeft: '3 solid #ef4444'}]}>
          <Text style={[styles.cardTitle, {color: '#991b1b'}]}>Considerations</Text>
          <Text style={styles.cardText}>
            You own ops and SLAs when self-hosting; budget for SRE/observability.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>First-Party Cloud Platform (Azure, Vertex AI)</Text>
        <View style={[styles.card, {backgroundColor: '#f0fdf4', borderLeft: '3 solid #22c55e'}]}>
          <Text style={[styles.cardTitle, {color: '#166534'}]}>Advantages</Text>
          <Text style={styles.cardText}>
            Native evals/observability, agent runtimes, identity, and governance inside each cloud; 
            fastest path for in-ecosystem clients.
          </Text>
        </View>
        <View style={[styles.card, {backgroundColor: '#fef2f2', borderLeft: '3 solid #ef4444'}]}>
          <Text style={[styles.cardTitle, {color: '#991b1b'}]}>Considerations</Text>
          <Text style={styles.cardText}>
            Cross-cloud portability lower than framework-agnostic; pricing & quotas apply.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© 2025 Innovoco • Enterprise Data Warehouse & Automation</Text>
      </View>
      <Text style={styles.pageNumber}>Page 6</Text>
    </Page>

    {/* Page 7 - Next Steps */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Next Steps</Text>
        <Text style={styles.subtitle}>Your Journey to AI Transformation • {TODAY}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.highlightBox}>
          <Text style={styles.cardTitle}>30-Day POC Timeline</Text>
          <Text style={styles.bulletPoint}>• Week 1: Requirements gathering and architecture design</Text>
          <Text style={styles.bulletPoint}>• Week 2: Environment setup and initial development</Text>
          <Text style={styles.bulletPoint}>• Week 3: Integration testing and refinement</Text>
          <Text style={styles.bulletPoint}>• Week 4: UAT and production readiness assessment</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Investment Range</Text>
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <View style={styles.roiCard}>
              <Text style={styles.roiValue}>$25-50K</Text>
              <Text style={styles.roiLabel}>POC Development</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.roiCard}>
              <Text style={[styles.roiValue, {color: '#8b5cf6'}]}>$100-250K</Text>
              <Text style={styles.roiLabel}>Production Deployment</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Why Innovoco?</Text>
        <Text style={styles.bulletPoint}>• Microsoft Gold Partner with Azure specialization</Text>
        <Text style={styles.bulletPoint}>• Google Cloud Partner with BigQuery expertise</Text>
        <Text style={styles.bulletPoint}>• Proven track record with Fortune 500 enterprises</Text>
        <Text style={styles.bulletPoint}>• SOC2 Type II certified development processes</Text>
        <Text style={styles.bulletPoint}>• 24/7 enterprise support with 99.9% SLA</Text>
      </View>

      <View style={[styles.footer, {textAlign: 'center'}]}>
        <Text>© 2025 Innovoco • info@innovoco.ai • www.innovoco.ai</Text>
        <Text>Florida • Ontario • Remote</Text>
      </View>
      <Text style={styles.pageNumber}>Page 7</Text>
    </Page>
  </Document>
);

// Export button component
export const EnhancedPDFExportButton = ({ className }: { className?: string }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<EnhancedCaseStudiesPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `innovoco-enterprise-ai-framework-${new Date().toISOString().split('T')[0]}.pdf`;
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
  
  const buttonClassName = className || "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  return (
    <button 
      className={buttonClassName}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? 'Generating...' : 'Download PDF'}
    </button>
  );
};