import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf,
  Image
} from '@react-pdf/renderer';
import { Download } from 'lucide-react';

// Using default fonts to avoid font loading issues

// Enhanced styles with better design
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: '48pt 48pt 60pt 48pt',
  },
  coverPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  coverContent: {
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 12,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#525252',
    marginBottom: 8,
    textAlign: 'center',
  },
  coverTagline: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 600,
    marginBottom: 48,
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 24,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: '2pt solid #0A58D0',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#525252',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: 12,
  },
  heroCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeft: '4pt solid #0A58D0',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#8B5CF6',
    marginBottom: 12,
  },
  roiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  roiCard: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 16,
    borderLeft: '3pt solid #0F766E',
  },
  roiValue: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0F766E',
    marginBottom: 4,
  },
  roiLabel: {
    fontSize: 10,
    color: '#525252',
  },
  foundationCard: {
    backgroundColor: '#FAFBFC',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeft: '3pt solid #0A58D0',
  },
  foundationTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 4,
  },
  foundationSubtitle: {
    fontSize: 11,
    color: '#8B5CF6',
    marginBottom: 8,
    fontWeight: 600,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0A58D0',
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    fontSize: 10,
    color: '#525252',
    flex: 1,
    lineHeight: 1.5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  tag: {
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 9,
    color: '#0A58D0',
    fontWeight: 600,
  },
  matrixTable: {
    marginTop: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderTop: '2pt solid #0A58D0',
    borderBottom: '1pt solid #E2E8F0',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #E2E8F0',
    paddingVertical: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 10,
    fontWeight: 700,
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  tableHeaderCellFirst: {
    flex: 1.5,
    fontSize: 10,
    fontWeight: 700,
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    color: '#475569',
    paddingHorizontal: 8,
  },
  tableCellFirst: {
    flex: 1.5,
    fontSize: 9,
    fontWeight: 600,
    color: '#1E293B',
    paddingHorizontal: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '0.5pt solid #E5E7EB',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#94A3B8',
  },
  footerLogo: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0A58D0',
  },
  pageNumber: {
    fontSize: 10,
    color: '#94A3B8',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  useCaseCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderTop: '2pt solid #8B5CF6',
  },
  useCaseTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0B0F19',
    marginBottom: 6,
  },
  useCaseDesc: {
    fontSize: 10,
    color: '#525252',
    marginBottom: 8,
    lineHeight: 1.4,
  },
  impactList: {
    marginTop: 6,
  },
  impactItem: {
    fontSize: 9,
    color: '#0F766E',
    marginBottom: 3,
    paddingLeft: 12,
  },
  workflowCard: {
    backgroundColor: '#FAFBFC',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    borderLeft: '2pt solid #DC2626',
  },
  workflowTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#0B0F19',
    marginBottom: 4,
  },
  workflowStack: {
    fontSize: 9,
    color: '#8B5CF6',
    marginBottom: 3,
    fontWeight: 600,
  },
  workflowValue: {
    fontSize: 9,
    color: '#525252',
    lineHeight: 1.3,
  },
  highlightBox: {
    backgroundColor: '#EFF6FF',
    borderLeft: '3pt solid #3B82F6',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  highlightTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1E40AF',
    marginBottom: 6,
  },
  highlightText: {
    fontSize: 10,
    color: '#1E293B',
    lineHeight: 1.5,
  },
  prosConsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  prosCard: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    borderTop: '2pt solid #22C55E',
  },
  consCard: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    borderTop: '2pt solid #EF4444',
  },
  prosTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#166534',
    marginBottom: 6,
  },
  consTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#991B1B',
    marginBottom: 6,
  },
  prosText: {
    fontSize: 10,
    color: '#15803D',
    lineHeight: 1.4,
  },
  consText: {
    fontSize: 10,
    color: '#DC2626',
    lineHeight: 1.4,
  },
});

// Get today's date
const getToday = () => {
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Enhanced PDF Document Component with all content
export const EnhancedCaseStudiesPDF = () => {
  const TODAY = getToday();

  return (
    <Document>
      {/* Cover Page */}
      <Page size="LETTER" style={[styles.page, styles.coverPage]}>
        <View style={styles.coverContent}>
          <Text style={styles.coverTitle}>Enterprise AI & Automation</Text>
          <Text style={styles.coverTitle}>Strategic Framework</Text>
          <Text style={styles.coverSubtitle}>Executive Decision Guide</Text>
          <Text style={styles.coverTagline}>Transforming data into intelligence. Turning intelligence into action.</Text>
          
          <View style={{ marginTop: 48, marginBottom: 48 }}>
            <View style={styles.roiGrid}>
              <View style={[styles.roiCard, { borderColor: '#0F766E' }]}>
                <Text style={styles.roiValue}>40-60%</Text>
                <Text style={styles.roiLabel}>Cost Reduction</Text>
              </View>
              <View style={[styles.roiCard, { borderColor: '#8B5CF6' }]}>
                <Text style={[styles.roiValue, { color: '#8B5CF6' }]}>30 Days</Text>
                <Text style={styles.roiLabel}>POC Timeline</Text>
              </View>
              <View style={[styles.roiCard, { borderColor: '#0A58D0' }]}>
                <Text style={[styles.roiValue, { color: '#0A58D0' }]}>SOC2+GDPR</Text>
                <Text style={styles.roiLabel}>Compliance Ready</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.coverDate}>Updated: {TODAY}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.footerText}>Microsoft Partner • Google Cloud Partner</Text>
        </View>
      </Page>

      {/* Page 1 - Strategic Foundations */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Strategic Foundations</Text>
          <Text style={styles.pageSubtitle}>Four proven frameworks for enterprise AI transformation</Text>
        </View>

        <View style={styles.section}>
          <View style={[styles.foundationCard, { borderColor: '#0A58D0' }]}>
            <Text style={styles.foundationTitle}>Microsoft Agentic Stack</Text>
            <Text style={styles.foundationSubtitle}>Azure-First Enterprise AI Platform</Text>
            <View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Azure AI Foundry for enterprise runtime</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Semantic Kernel for flexible SDK</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>AutoGen for multi-agent workflows</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Full Microsoft ecosystem integration</Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Microsoft Partner</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Enterprise Ready</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>SOC2 Compliant</Text>
              </View>
            </View>
          </View>

          <View style={[styles.foundationCard, { borderColor: '#DC2626' }]}>
            <Text style={styles.foundationTitle}>Google Vertex AI Stack</Text>
            <Text style={styles.foundationSubtitle}>GCP-Native AI Infrastructure</Text>
            <View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.bulletText}>Vertex AI Agent Builder for rapid deployment</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.bulletText}>BigQuery-native data processing</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.bulletText}>Built-in model evaluation & monitoring</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
                <Text style={styles.bulletText}>Enterprise security with VPC-SC/CMEK</Text>
              </View>
            </View>
          </View>

          <View style={[styles.foundationCard, { borderColor: '#0F766E' }]}>
            <Text style={styles.foundationTitle}>LangGraph Orchestration</Text>
            <Text style={styles.foundationSubtitle}>Cloud-Agnostic Workflow Engine</Text>
            <View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#0F766E' }]} />
                <Text style={styles.bulletText}>Stateful agent workflows across clouds</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#0F766E' }]} />
                <Text style={styles.bulletText}>Full audit trail and compliance tracking</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#0F766E' }]} />
                <Text style={styles.bulletText}>Deploy anywhere: cloud, hybrid, on-premise</Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: '#0F766E' }]} />
                <Text style={styles.bulletText}>LangSmith integration for observability</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.pageNumber}>Page 1</Text>
        </View>
      </Page>

      {/* Page 2 - Landscape Matrix */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Platform Comparison Matrix</Text>
          <Text style={styles.pageSubtitle}>Enterprise capabilities across technology stacks</Text>
        </View>

        <View style={styles.matrixTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCellFirst}>Capability</Text>
            <Text style={styles.tableHeaderCell}>Azure Foundry</Text>
            <Text style={styles.tableHeaderCell}>Vertex AI</Text>
            <Text style={styles.tableHeaderCell}>LangGraph</Text>
            <Text style={styles.tableHeaderCell}>n8n</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>Enterprise Readiness</Text>
            <Text style={styles.tableCell}>✓ GA, governance</Text>
            <Text style={styles.tableCell}>✓ GA, Agent Builder</Text>
            <Text style={styles.tableCell}>✓ GA, SOC2/HIPAA</Text>
            <Text style={styles.tableCell}>✓ SOC2, RBAC</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>Observability & Evals</Text>
            <Text style={styles.tableCell}>Prompt Flow, tracing</Text>
            <Text style={styles.tableCell}>Vertex Studio evals</Text>
            <Text style={styles.tableCell}>LangSmith traces</Text>
            <Text style={styles.tableCell}>Exec logs, Prometheus</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>Long-running Agents</Text>
            <Text style={styles.tableCell}>✓ Foundry Agent Service</Text>
            <Text style={styles.tableCell}>✓ Agent Builder</Text>
            <Text style={styles.tableCell}>✓ Graph state + retries</Text>
            <Text style={styles.tableCell}>Flows & schedules</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>Best For</Text>
            <Text style={styles.tableCell}>MS stack apps</Text>
            <Text style={styles.tableCell}>Data-native AI</Text>
            <Text style={styles.tableCell}>Multi-agent graphs</Text>
            <Text style={styles.tableCell}>Workflow automation</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>Privacy & Deploy</Text>
            <Text style={styles.tableCell}>Azure tenant, VNet</Text>
            <Text style={styles.tableCell}>GCP, VPC-SC, CMEK</Text>
            <Text style={styles.tableCell}>Cloud/hybrid/self</Text>
            <Text style={styles.tableCell}>Self-host or cloud</Text>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightTitle}>Key Decision Factors</Text>
            <Text style={styles.highlightText}>
              • Azure & Vertex provide native agent runtimes with built-in evals and governance{'\n'}
              • LangGraph offers framework-agnostic orchestration across clouds{'\n'}
              • n8n enables citizen developer automation with enterprise controls{'\n'}
              • Consider existing infrastructure, team skills, and compliance requirements
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* Page 3 - Data Use Cases */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Enterprise Data Use Cases</Text>
          <Text style={styles.pageSubtitle}>AI-powered solutions for data transformation</Text>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseTitle}>Conversational Data Analytics</Text>
              <Text style={styles.useCaseDesc}>
                Empower every executive to become a data analyst. Ask questions in plain English, receive insights in seconds.
              </Text>
              <View style={styles.impactList}>
                <Text style={styles.impactItem}>• 300% increase in data adoption</Text>
                <Text style={styles.impactItem}>• 75% reduction in IT support tickets</Text>
                <Text style={styles.impactItem}>• 10x faster insight generation</Text>
              </View>
            </View>
            
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseTitle}>AI-Powered Master Data Management</Text>
              <Text style={styles.useCaseDesc}>
                Ensure your data is AI-ready with intelligent cleaning, standardization, and governance.
              </Text>
              <View style={styles.impactList}>
                <Text style={styles.impactItem}>• 95% data quality improvement</Text>
                <Text style={styles.impactItem}>• 60% reduction in prep time</Text>
                <Text style={styles.impactItem}>• Automated compliance tracking</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseTitle}>Intelligent Pipeline Support Agent</Text>
              <Text style={styles.useCaseDesc}>
                AI agent that diagnoses, resolves, and prevents data pipeline issues autonomously.
              </Text>
              <View style={styles.impactList}>
                <Text style={styles.impactItem}>• 90% reduction in pipeline failures</Text>
                <Text style={styles.impactItem}>• 24/7 autonomous monitoring</Text>
                <Text style={styles.impactItem}>• 15-minute resolution time</Text>
              </View>
            </View>
            
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseTitle}>AI-Driven DataOps Platform</Text>
              <Text style={styles.useCaseDesc}>
                Revolutionize data operations with AI-powered CI/CD and intelligent optimization.
              </Text>
              <View style={styles.impactList}>
                <Text style={styles.impactItem}>• 40% infrastructure cost reduction</Text>
                <Text style={styles.impactItem}>• 5x faster deployment cycles</Text>
                <Text style={styles.impactItem}>• Zero-downtime migrations</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.pageNumber}>Page 3</Text>
        </View>
      </Page>

      {/* Page 4 - Automation Workflows */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Enterprise Automation Workflows</Text>
          <Text style={styles.pageSubtitle}>Battle-tested integration patterns for immediate deployment</Text>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>1. Regulated Client Onboarding</Text>
              <Text style={styles.workflowStack}>Stack: LangGraph + n8n + Azure/Vertex</Text>
              <Text style={styles.workflowValue}>Value: Frictionless KYC/AML with auditable trails</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>2. Enterprise Knowledge Copilot</Text>
              <Text style={styles.workflowStack}>Stack: Azure Foundry or Vertex + LangGraph</Text>
              <Text style={styles.workflowValue}>Value: Governed retrieval across SharePoint/SQL/BigQuery</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>3. Predictive Supply Chain</Text>
              <Text style={styles.workflowStack}>Stack: Vertex AI + n8n + LangGraph</Text>
              <Text style={styles.workflowValue}>Value: Demand forecasting → reorder → vendor orchestration</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>4. 360° Customer Support Bot</Text>
              <Text style={styles.workflowStack}>Stack: SK/AutoGen or Vertex + LangGraph + n8n</Text>
              <Text style={styles.workflowValue}>Value: Tiered triage, agent handoff, CRM updates</Text>
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>5. Field Services & IoT Playbooks</Text>
              <Text style={styles.workflowStack}>Stack: n8n + LangGraph + Power Automate</Text>
              <Text style={styles.workflowValue}>Value: Sensor anomaly → dispatch → work order</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>6. Enterprise Reporting Automation</Text>
              <Text style={styles.workflowStack}>Stack: LangSmith/LangGraph + n8n + Vertex</Text>
              <Text style={styles.workflowValue}>Value: Quarterly packs, lineage, immutable audit trails</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>7. Marketing Personalization Engine</Text>
              <Text style={styles.workflowStack}>Stack: LangGraph + Vertex AI (BQ) + n8n</Text>
              <Text style={styles.workflowValue}>Value: Segments, content variants, A/B learnings</Text>
            </View>
            
            <View style={styles.workflowCard}>
              <Text style={styles.workflowTitle}>8. Cross-border HR & Payroll</Text>
              <Text style={styles.workflowStack}>Stack: n8n + Azure Foundry or Vertex</Text>
              <Text style={styles.workflowValue}>Value: Policy checks, payroll runs, compliance evidence</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.pageNumber}>Page 4</Text>
        </View>
      </Page>

      {/* Page 5 - Decision Framework */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Open-Source vs Proprietary</Text>
          <Text style={styles.pageSubtitle}>Practical decision framework for enterprise architects</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Framework-Agnostic Approach</Text>
          <Text style={styles.sectionSubtitle}>LangGraph + n8n</Text>
          
          <View style={styles.prosConsGrid}>
            <View style={styles.prosCard}>
              <Text style={styles.prosTitle}>✓ Advantages</Text>
              <Text style={styles.prosText}>
                • Orchestrate across Azure & GCP{'\n'}
                • Self-host to keep data in VPC{'\n'}
                • Avoid vendor lock-in{'\n'}
                • LangSmith for evals/tracing{'\n'}
                • Lower long-term costs
              </Text>
            </View>
            
            <View style={styles.consCard}>
              <Text style={styles.consTitle}>⚠ Considerations</Text>
              <Text style={styles.consText}>
                • You own ops and SLAs{'\n'}
                • Budget for SRE/observability{'\n'}
                • Requires technical expertise{'\n'}
                • Longer initial setup time{'\n'}
                • Integration complexity
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>First-Party Cloud Platform</Text>
          <Text style={styles.sectionSubtitle}>Azure Foundry • Vertex AI</Text>
          
          <View style={styles.prosConsGrid}>
            <View style={styles.prosCard}>
              <Text style={styles.prosTitle}>✓ Advantages</Text>
              <Text style={styles.prosText}>
                • Native evals/observability{'\n'}
                • Built-in agent runtimes{'\n'}
                • Identity and governance{'\n'}
                • Fastest time to market{'\n'}
                • Managed services & SLAs
              </Text>
            </View>
            
            <View style={styles.consCard}>
              <Text style={styles.consTitle}>⚠ Considerations</Text>
              <Text style={styles.consText}>
                • Cross-cloud portability lower{'\n'}
                • Pricing & quotas apply{'\n'}
                • Potential vendor lock-in{'\n'}
                • Limited customization{'\n'}
                • Platform-specific skills needed
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Executive Recommendation</Text>
          <Text style={styles.highlightText}>
            Start with first-party cloud platforms for rapid prototyping and POC development. 
            Transition to framework-agnostic approach for production deployments requiring 
            multi-cloud flexibility or strict data residency requirements.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.pageNumber}>Page 5</Text>
        </View>
      </Page>

      {/* Final Page - Contact & Next Steps */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Next Steps</Text>
          <Text style={styles.pageSubtitle}>Your journey to AI-powered transformation</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightTitle}>30-Day POC Timeline</Text>
            <Text style={styles.highlightText}>
              Week 1: Requirements gathering and architecture design{'\n'}
              Week 2: Environment setup and initial development{'\n'}
              Week 3: Integration testing and refinement{'\n'}
              Week 4: UAT and production readiness assessment
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>Investment Range</Text>
            <View style={styles.roiGrid}>
              <View style={styles.roiCard}>
                <Text style={styles.roiValue}>$25-50K</Text>
                <Text style={styles.roiLabel}>POC Development</Text>
              </View>
              <View style={styles.roiCard}>
                <Text style={[styles.roiValue, { color: '#8B5CF6' }]}>$100-250K</Text>
                <Text style={styles.roiLabel}>Production Deployment</Text>
              </View>
              <View style={styles.roiCard}>
                <Text style={[styles.roiValue, { color: '#0A58D0' }]}>6-12 Months</Text>
                <Text style={styles.roiLabel}>ROI Achievement</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.sectionTitle}>Why Innovoco?</Text>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Microsoft Gold Partner with Azure specialization</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Google Cloud Partner with BigQuery expertise</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Proven track record with Fortune 500 enterprises</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>SOC2 Type II certified development processes</Text>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>24/7 enterprise support with 99.9% SLA</Text>
            </View>
          </View>
        </View>

        <View style={[styles.footer, { flexDirection: 'column', alignItems: 'center' }]}>
          <Text style={styles.footerLogo}>INNOVOCO</Text>
          <Text style={styles.footerText}>info@innovoco.ai • www.innovoco.ai</Text>
          <Text style={styles.footerText}>Florida • Ontario • Remote</Text>
        </View>
      </Page>
    </Document>
  );
};

// Enhanced Export Button Component
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
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const buttonClassName = className || "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0A58D0] to-[#0A58D0]/80 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300";
  
  return (
    <button 
      className={buttonClassName}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      <Download className="h-4 w-4" />
      {isGenerating ? 'Generating...' : 'Download PDF'}
    </button>
  );
};