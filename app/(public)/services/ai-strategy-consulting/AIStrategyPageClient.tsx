"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Database, Rocket, Target, TrendingUp, DollarSign, Zap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function AIStrategyPageClient() {
  const breadcrumbs = [
    { label: 'Services', href: '/services' },
    { label: 'AI Strategy & Consulting', href: '/services/ai-strategy-consulting' }
  ];

  const relatedServices = [
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build the modern data infrastructure your AI needs. Cloud-native architecture ready for AI workloads from day one.",
      href: "/services/data-engineering-modernization"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "From proof of concept to production in 12-16 weeks. Turn your AI strategy into measurable business results.",
      href: "/services/ai-implementation"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('AI Strategy & Consulting');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "AI Strategy & Consulting Services",
        description: "Expert AI strategy consulting to guide your enterprise AI transformation with framework-agnostic roadmaps, governance, and ROI modeling backed by 10+ years of data expertise.",
        url: "https://innovoco.com/services/ai-strategy-consulting",
        serviceType: "AI Consulting"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Services", url: "https://innovoco.com/services" },
        { name: "AI Strategy & Consulting", url: "https://innovoco.com/services/ai-strategy-consulting" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="Trusted by 300+ Enterprises"
          title="AI Strategy & Consulting Services"
          subtitle="Turn AI Vision into Measurable Business Results"
          description="Expert AI strategy consulting to navigate your enterprise AI transformation with confidence. Framework-agnostic roadmaps, responsible AI governance, and ROI modeling backed by 10+ years of data expertise and 500+ successful AI solutions."
          trustIndicators={[
            { metric: "500+", label: "AI Solutions Delivered" },
            { metric: "10Y+", label: "Data & AI Expertise" },
            { metric: "300+", label: "Enterprise Clients" },
            { metric: "90D", label: "Avg. Strategy Delivery" }
          ]}
          primaryCTA={{
            text: "Schedule Strategy Assessment",
            onClick: () => {
              // Navigate to contact or calendar
              window.location.href = '/contact?service=ai-strategy';
            }
          }}
          secondaryCTA={{
            text: "View AI Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#DBEAFE] via-[#EDE9FE] to-[#FECACA]"
        />

        {/* Overview Section */}
        <ServiceSection
          icon={Target}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Why AI Strategy Matters"
          subtitle="The difference between AI success and expensive experimentation"
        >
          <p>
            In 2025, enterprise AI adoption is no longer a question of "if" but "how." Yet 87% of AI initiatives fail to reach production,
            often due to a lack of strategic planning, unclear ROI expectations, or misalignment between technical capabilities and business objectives.
            Our AI strategy consulting services bridge this gap by providing a framework-agnostic, pragmatic approach to AI transformation
            that prioritizes measurable business outcomes over technological novelty.
          </p>

          <p>
            With over 10 years of data engineering expertise and 500+ successful AI implementations across industries like healthcare,
            finance, manufacturing, and retail, Innovoco's AI strategy consulting goes beyond generic frameworks. We assess your current
            data maturity, identify high-ROI AI use cases, select the right AI frameworks and architectures, and build actionable roadmaps
            that align with your budget, timeline, and risk tolerance. Our AI strategy consulting ensures you invest in AI initiatives that
            deliver results, not just prototypes that never leave the sandbox.
          </p>

          <p>
            Whether you're taking your first steps in AI adoption or scaling existing AI capabilities across multiple departments, our
            enterprise AI roadmap services provide the clarity, governance, and technical direction you need to succeed. From responsible
            AI governance frameworks to AI framework selection and ROI modeling, we help you navigate the complexity of modern AI with
            confidence and precision.
          </p>
        </ServiceSection>

        {/* Core Strategy Services Section */}
        <ServiceSection
          icon={TrendingUp}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Core AI Strategy Services"
          subtitle="Comprehensive planning for enterprise AI transformation"
        >
          <h3>1. AI Maturity Assessment & Current State Analysis</h3>
          <p>
            Before investing in AI, you need to understand where you stand. Our AI maturity assessment evaluates your organization across
            five critical dimensions: data infrastructure, technical talent, governance policies, business alignment, and existing analytics
            capabilities. Using a proprietary scoring methodology developed from 500+ enterprise assessments, we identify your current AI
            maturity level (from Ad-Hoc to Optimized) and map the gaps preventing you from reaching the next stage.
          </p>

          <p>
            This assessment includes a detailed audit of your data warehouse architecture, data quality standards, security policies, and
            technical debt. We evaluate whether your current infrastructure can support modern AI workloads—including large language models
            (LLMs), vector databases, and real-time inference pipelines—or if modernization is required. The result is a Current State Report
            that provides a transparent, jargon-free view of your AI readiness with specific, prioritized recommendations.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>AI Maturity Score:</strong> Quantified assessment across 5 dimensions with benchmarking against industry peers</li>
            <li><strong>Data Readiness Audit:</strong> Evaluation of data quality, accessibility, and infrastructure for AI workloads</li>
            <li><strong>Gap Analysis:</strong> Identification of technical, organizational, and process gaps blocking AI success</li>
            <li><strong>Quick Win Identification:</strong> High-ROI, low-effort AI initiatives you can start immediately</li>
          </ul>

          <h3>2. AI Framework Selection & Architecture Design</h3>
          <p>
            Not all AI frameworks are created equal, and choosing the wrong one can cost you months of development time and hundreds of
            thousands in sunk costs. Our AI framework selection service evaluates your specific use cases against the latest AI architectures—
            including OpenAI GPT-4, Azure OpenAI, Google Gemini, Anthropic Claude, open-source LLMs like Llama 3 and Mistral, and specialized
            frameworks like LangChain, LlamaIndex, and Semantic Kernel.
          </p>

          <p>
            We conduct a multi-criteria comparison based on cost per token, model performance on your domain, latency requirements, data
            privacy policies, on-premise vs. cloud deployment needs, and integration complexity with your existing tech stack. Our AI
            framework consulting ensures you select the right architecture for each use case—whether that's a managed cloud service,
            fine-tuned open-source model, or hybrid RAG (Retrieval-Augmented Generation) system.
          </p>

          <p>
            Beyond framework selection, we design the end-to-end AI architecture including vector database selection (Pinecone, Weaviate,
            ChromaDB, Qdrant), embedding strategy, prompt engineering frameworks, observability tools (LangSmith, Helicone), and integration
            patterns with your data warehouse. Our architecture blueprints are production-ready, not whiteboard concepts—complete with
            infrastructure-as-code templates, CI/CD pipelines, and security guardrails.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Framework Comparison Matrix:</strong> Side-by-side evaluation of AI frameworks against your specific requirements</li>
            <li><strong>Architecture Blueprint:</strong> Detailed technical design with component diagrams, data flow, and integration points</li>
            <li><strong>Cost Projection Model:</strong> TCO analysis comparing cloud-managed vs. self-hosted options over 3 years</li>
            <li><strong>Proof of Concept Plan:</strong> 2-4 week POC roadmap to validate architecture decisions with real data</li>
          </ul>

          <h3>3. Enterprise AI Roadmap Development</h3>
          <p>
            An enterprise AI roadmap is more than a Gantt chart—it's a strategic plan that sequences AI initiatives based on business impact,
            technical dependencies, and organizational readiness. Our AI roadmap consulting services prioritize use cases using a proprietary
            scoring framework that evaluates each initiative across ROI potential, implementation complexity, data availability, and stakeholder
            alignment.
          </p>

          <p>
            We structure your AI roadmap into three phases: Quick Wins (0-6 months), Strategic Initiatives (6-18 months), and Transformational
            Projects (18+ months). Quick Wins focus on high-ROI, low-risk projects that build organizational confidence and secure executive
            buy-in. Strategic Initiatives tackle more complex use cases that require process re-engineering or data infrastructure upgrades.
            Transformational Projects are moonshot ideas that fundamentally change how your business operates—like fully autonomous supply chain
            optimization or AI-driven drug discovery.
          </p>

          <p>
            Each roadmap includes milestone definitions, success metrics, resource requirements (FTEs, cloud budget, vendor costs), and risk
            mitigation strategies. We also define your AI operating model—whether you'll build an internal Center of Excellence, partner with
            external AI consultants like Innovoco, or use a hybrid approach. The result is a living document that guides your AI investments
            over the next 2-3 years while remaining flexible enough to adapt to new AI breakthroughs.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Prioritized Use Case Backlog:</strong> Ranked list of 10-20 AI initiatives with ROI scores and effort estimates</li>
            <li><strong>3-Year AI Roadmap:</strong> Phase-based implementation plan with quarterly milestones and dependencies</li>
            <li><strong>Resource Plan:</strong> Detailed staffing, budget, and vendor partnership requirements per phase</li>
            <li><strong>Executive Presentation:</strong> Board-ready slide deck communicating the AI vision and business case</li>
          </ul>

          <h3>4. Responsible AI Governance & Risk Management</h3>
          <p>
            As AI regulation tightens globally—with frameworks like the EU AI Act, US Executive Orders on AI safety, and industry-specific
            guidelines (HIPAA for healthcare, SOC 2 for SaaS)—enterprises need robust AI governance frameworks to manage compliance risk,
            bias detection, explainability, and ethical use. Our responsible AI consulting helps you build governance structures that balance
            innovation speed with regulatory compliance.
          </p>

          <p>
            We design AI governance policies covering model approval workflows, bias testing protocols, data lineage tracking, explainability
            requirements, and incident response procedures. For high-risk AI applications (credit scoring, hiring algorithms, medical diagnosis),
            we implement red-team testing, adversarial validation, and continuous monitoring dashboards to detect model drift or unexpected
            behaviors.
          </p>

          <p>
            Our governance frameworks are tailored to your industry and risk profile. For healthcare clients, we ensure HIPAA compliance,
            de-identification strategies, and audit trails for AI-assisted diagnoses. For financial services, we implement model risk management
            (MRM) frameworks aligned with Federal Reserve SR 11-7 guidance. For retail, we focus on consumer privacy, GDPR compliance, and
            transparency in AI-driven personalization.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>AI Governance Framework:</strong> Policies covering model development, approval, monitoring, and decommissioning</li>
            <li><strong>Bias Detection Protocols:</strong> Testing procedures to identify and mitigate bias across demographic groups</li>
            <li><strong>Compliance Checklist:</strong> Industry-specific regulatory requirements mapped to your AI initiatives</li>
            <li><strong>Incident Response Plan:</strong> Procedures for handling AI failures, data breaches, or unexpected model behavior</li>
          </ul>

          <h3>5. AI ROI Modeling & Business Case Development</h3>
          <p>
            Securing executive buy-in for AI investments requires more than technical feasibility—you need a compelling financial business case.
            Our AI ROI modeling services quantify the expected value of AI initiatives using both hard savings (cost reduction, efficiency gains)
            and soft benefits (customer satisfaction, employee retention, competitive differentiation).
          </p>

          <p>
            We build financial models that project 3-year TCO (Total Cost of Ownership) including cloud infrastructure, model training costs,
            vendor licensing, internal staffing, and ongoing maintenance. On the benefit side, we quantify impact using metrics like revenue
            lift from personalized recommendations, time savings from automated document processing, or fraud prevention from anomaly detection
            models. Our models include sensitivity analysis to show how ROI changes under different adoption scenarios, cost assumptions, or
            performance outcomes.
          </p>

          <p>
            For each AI use case, we define clear KPIs and measurement frameworks to track actual vs. projected ROI post-deployment. This
            ensures accountability and provides the data needed to secure funding for future AI initiatives. Our business cases have helped
            clients secure $500K to $5M+ in AI investment budgets by translating technical potential into language executives understand:
            profit, growth, and competitive advantage.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Financial Model:</strong> 3-year TCO and benefit projections with sensitivity analysis and break-even timeline</li>
            <li><strong>KPI Framework:</strong> Measurable success criteria for each AI initiative with baseline and target values</li>
            <li><strong>Executive Business Case:</strong> One-pager summarizing investment, expected ROI, risks, and strategic rationale</li>
            <li><strong>Measurement Plan:</strong> Post-deployment tracking methodology to validate actual ROI vs. projections</li>
          </ul>
        </ServiceSection>

        {/* Why Choose Innovoco Section */}
        <ServiceSection
          icon={CheckCircle}
          iconGradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          title="Why Choose Innovoco for AI Strategy Consulting"
          subtitle="Experience, pragmatism, and results that matter"
        >
          <h3>10+ Years of Data & AI Expertise</h3>
          <p>
            Unlike pure-play AI consultancies founded in the ChatGPT era, Innovoco has been building enterprise data platforms and analytics
            solutions since 2014. We understand that AI strategy consulting isn't just about picking the latest LLM—it's about ensuring your
            data infrastructure, governance policies, and organizational capabilities can support AI at scale. Our team has built data warehouses
            for Fortune 500 companies, migrated petabyte-scale datasets to the cloud, and implemented MLOps pipelines long before "LLMOps" became
            a buzzword.
          </p>

          <p>
            This depth of data engineering experience means we can spot the red flags other consultants miss: siloed data systems that will
            block RAG implementations, data quality issues that will poison your fine-tuned models, or security gaps that will fail compliance
            audits. Our AI strategy consulting is grounded in the reality of enterprise IT environments, not theoretical best practices that
            assume greenfield projects.
          </p>

          <h3>Framework-Agnostic, Technology-Neutral Guidance</h3>
          <p>
            We're not in the business of selling you a specific AI vendor or framework. Our AI framework consulting evaluates the full landscape—
            OpenAI, Azure OpenAI, Google Vertex AI, AWS Bedrock, Anthropic Claude, open-source models (Llama 3, Mistral, Falcon), and specialized
            frameworks like LangChain, Haystack, and Semantic Kernel. We recommend what's best for your use case, budget, and risk profile, even
            if that means multiple frameworks for different workloads.
          </p>

          <p>
            This technology-neutral stance extends to deployment models. We'll help you evaluate managed cloud services vs. self-hosted open-source
            models, hybrid architectures that keep sensitive data on-premise, and edge AI deployments for latency-sensitive applications. Our goal
            is to find the right fit for your constraints, not to push a one-size-fits-all solution.
          </p>

          <h3>Proven Methodologies from 500+ AI Implementations</h3>
          <p>
            Our AI strategy consulting framework is battle-tested across 500+ implementations spanning healthcare (clinical decision support,
            patient triage), finance (fraud detection, credit risk modeling), retail (demand forecasting, personalized recommendations),
            manufacturing (predictive maintenance, quality control), and logistics (route optimization, warehouse automation).
          </p>

          <p>
            We've learned what works and what doesn't. We know that starting with a massive enterprise-wide AI transformation is a recipe for
            failure—Quick Wins build momentum and trust. We know that ignoring data quality issues in favor of fancy models leads to "garbage in,
            garbage out." We know that responsible AI governance can't be bolted on after deployment—it must be baked into the architecture from
            day one. These lessons, earned through real-world successes and failures, inform every enterprise AI roadmap we create.
          </p>

          <h3>Business-Outcome Focus, Not Technology for Technology's Sake</h3>
          <p>
            Our AI roadmap consulting starts with the business problem, not the technology solution. We don't recommend implementing LLMs because
            they're trendy—we recommend them when they're the best tool to solve a specific pain point like contract analysis, customer support
            automation, or internal knowledge search. If a simpler solution (rule-based system, traditional ML model, process automation) delivers
            90% of the value at 10% of the cost, we'll tell you.
          </p>

          <p>
            This pragmatic approach ensures that AI investments are judged by the same ROI standards as any other business initiative. Every AI
            use case in your roadmap will have clear success metrics, measurable KPIs, and a defined path to production. We don't do research
            projects disguised as business solutions—we build AI systems that deliver results.
          </p>

          <h3>End-to-End Partnership from Strategy to Managed Services</h3>
          <p>
            Unlike strategy-only consultancies that hand you a PowerPoint deck and disappear, Innovoco offers a full spectrum of AI services
            from initial AI strategy consulting through data engineering, AI implementation, and long-term managed AI services. This means the
            roadmap we create is one we can actually execute—no handoff risk, no knowledge loss, no finger-pointing between consultants and
            implementation teams.
          </p>

          <p>
            If you choose to implement with us (no obligation), we already understand your technical landscape, business priorities, and
            organizational constraints from the strategy phase. This continuity accelerates delivery, reduces rework, and ensures the final
            solution matches the original vision. And with our managed AI services, we can monitor, optimize, and evolve your AI systems long
            after deployment—turning initial Quick Wins into sustained competitive advantages.
          </p>
        </ServiceSection>

        {/* Our AI Strategy Process Section */}
        <ServiceSection
          icon={Zap}
          iconGradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          title="Our AI Strategy Process"
          subtitle="From discovery to actionable roadmap in 6-12 weeks"
        >
          <h3>Phase 1: Discovery & Assessment (2-3 Weeks)</h3>
          <p>
            We begin with stakeholder interviews across business units, IT, data teams, and executives to understand your AI ambitions, current
            pain points, and organizational constraints. In parallel, we conduct a technical assessment of your data infrastructure, analytics
            capabilities, and existing AI/ML initiatives. This includes architecture reviews, data quality audits, and compliance gap analysis.
          </p>

          <p>
            <strong>Deliverables:</strong> AI Maturity Assessment Report, Current State Architecture Diagram, Stakeholder Alignment Summary
          </p>

          <h3>Phase 2: Use Case Identification & Prioritization (2-3 Weeks)</h3>
          <p>
            Through facilitated workshops, we brainstorm 20-30 potential AI use cases spanning operational efficiency, customer experience,
            revenue growth, and risk management. Each use case is scored on business impact, technical feasibility, data readiness, and strategic
            alignment. We then narrow the list to 10-15 high-priority initiatives and validate them with cross-functional teams.
          </p>

          <p>
            <strong>Deliverables:</strong> Prioritized Use Case Backlog, ROI Estimates per Use Case, Data Readiness Assessment
          </p>

          <h3>Phase 3: Architecture Design & Framework Selection (2-3 Weeks)</h3>
          <p>
            For each prioritized use case, we design the target AI architecture and recommend the optimal AI framework. This includes detailed
            cost modeling, latency analysis, and compliance validation. We also define your AI technology stack including vector databases,
            observability tools, prompt management platforms, and MLOps infrastructure.
          </p>

          <p>
            <strong>Deliverables:</strong> AI Architecture Blueprint, Framework Comparison Matrix, TCO Analysis, POC Recommendations
          </p>

          <h3>Phase 4: Roadmap Development & Governance Design (2-3 Weeks)</h3>
          <p>
            We sequence the prioritized use cases into a phased roadmap spanning Quick Wins (0-6 months), Strategic Initiatives (6-18 months),
            and Transformational Projects (18+ months). For each phase, we define milestones, resource requirements, budget estimates, and
            success metrics. We also build the responsible AI governance framework including policies, approval workflows, and monitoring protocols.
          </p>

          <p>
            <strong>Deliverables:</strong> 3-Year AI Roadmap, AI Governance Framework, Resource & Budget Plan, Executive Presentation
          </p>

          <h3>Phase 5: Executive Alignment & Handoff (1-2 Weeks)</h3>
          <p>
            We present the final AI strategy to executive leadership, secure buy-in, and facilitate Q&A sessions to address concerns. If you
            choose to proceed with implementation, we conduct a detailed handoff to internal teams or transition to Innovoco's AI implementation
            services. We also provide a 30-day post-delivery support period to answer questions and refine the roadmap based on new insights.
          </p>

          <p>
            <strong>Deliverables:</strong> Executive Summary Deck, Implementation Handoff Package, 30-Day Post-Delivery Support
          </p>
        </ServiceSection>

        {/* Industries We Serve Section */}
        <ServiceSection
          icon={Target}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Industries We Serve"
          subtitle="Deep expertise across high-value sectors"
        >
          <p>
            Our AI strategy consulting has delivered measurable results across diverse industries. In <strong>healthcare</strong>, we've helped
            hospital networks build AI roadmaps for clinical decision support, patient risk stratification, and administrative automation while
            ensuring HIPAA compliance and bias-free models. In <strong>financial services</strong>, we've designed fraud detection architectures,
            credit risk models, and regulatory compliance frameworks aligned with model risk management (MRM) standards.
          </p>

          <p>
            For <strong>retail and e-commerce</strong> clients, we've prioritized AI use cases in demand forecasting, personalized product
            recommendations, and dynamic pricing optimization—delivering 10-25% revenue lifts in pilot programs. In <strong>manufacturing</strong>,
            our AI roadmaps have focused on predictive maintenance, quality control automation, and supply chain optimization, reducing downtime
            by 15-30% and defect rates by 20-40%.
          </p>

          <p>
            We also serve <strong>logistics and transportation</strong> (route optimization, warehouse automation), <strong>energy and utilities</strong>
            (demand forecasting, grid optimization), and <strong>professional services</strong> (document automation, knowledge management).
            Regardless of industry, our AI strategy consulting adapts to your unique regulatory environment, competitive landscape, and
            operational realities.
          </p>
        </ServiceSection>

        {/* Get Started Section */}
        <ServiceSection
          icon={DollarSign}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Get Started with AI Strategy Consulting"
          subtitle="Turn AI potential into competitive advantage"
        >
          <p>
            Whether you're just beginning your AI journey or looking to accelerate existing initiatives, Innovoco's AI strategy consulting
            provides the clarity, confidence, and actionable roadmap you need to succeed. Our framework-agnostic approach, proven methodologies,
            and 10+ years of data expertise ensure you invest in AI initiatives that deliver measurable business results.
          </p>

          <p>
            <strong>Next Steps:</strong>
          </p>
          <ul>
            <li><strong>Schedule a Strategy Assessment:</strong> 60-minute consultation to discuss your AI goals and current challenges (no cost, no obligation)</li>
            <li><strong>Request a Proposal:</strong> Receive a customized AI strategy consulting proposal with scope, timeline, and investment details</li>
            <li><strong>Download Our AI Readiness Guide:</strong> Free resource covering AI maturity assessment, use case prioritization, and governance best practices</li>
            <li><strong>View Case Studies:</strong> See how we've helped enterprises across healthcare, finance, retail, and manufacturing build winning AI strategies</li>
          </ul>

          <p>
            Ready to transform your AI vision into reality? Contact Innovoco today to schedule your complimentary AI strategy assessment.
            Let's build an enterprise AI roadmap that turns data into your most valuable business asset.
          </p>
        </ServiceSection>

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
