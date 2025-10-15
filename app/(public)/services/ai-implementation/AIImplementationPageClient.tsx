"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Database, Rocket, Bot, GitBranch, Gauge, Zap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function AIImplementationPageClient() {
  const breadcrumbs = [
    { label: 'Services', href: '/services' },
    { label: 'Enterprise AI Implementation', href: '/services/ai-implementation' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Define your AI roadmap before implementation. Strategic planning ensures you build the right solutions with measurable ROI.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Database,
      iconGradient: "bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]",
      title: "Data Engineering & Modernization",
      description: "Build the data foundation your AI needs. Modern data infrastructure optimized for AI workloads from day one.",
      href: "/services/data-engineering-modernization"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('Enterprise AI Implementation');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Enterprise AI Implementation Services",
        description: "From proof of concept to production in 12-16 weeks. Expert AI implementation services including LLM integration, custom AI agents, RAG systems, and enterprise MLOps with proven data foundation and 500+ successful deployments.",
        url: "https://innovoco.com/services/ai-implementation",
        serviceType: "AI Implementation"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Services", url: "https://innovoco.com/services" },
        { name: "Enterprise AI Implementation", url: "https://innovoco.com/services/ai-implementation" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="500+ AI Solutions Deployed"
          title="Enterprise AI Implementation Services"
          subtitle="From POC to Production in 12-16 Weeks"
          description="Turn AI strategy into measurable business results. Expert AI implementation services covering LLM integration, custom AI agents, RAG systems, and enterprise MLOps with proven frameworks that deliver production-grade AI on time and on budget."
          trustIndicators={[
            { metric: "500+", label: "AI Deployments" },
            { metric: "12-16W", label: "POC to Production" },
            { metric: "95%", label: "On-Time Delivery" },
            { metric: "3X", label: "Avg. ROI in Year 1" }
          ]}
          primaryCTA={{
            text: "Schedule Implementation Assessment",
            onClick: () => {
              window.location.href = '/contact?service=ai-implementation';
            }
          }}
          secondaryCTA={{
            text: "View AI Success Stories",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#EDE9FE] via-[#DBEAFE] to-[#D1FAE5]"
        />

        {/* Overview Section */}
        <ServiceSection
          icon={Rocket}
          iconGradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          title="Why AI Implementation Fails (And How We Succeed)"
          subtitle="Moving from pilot to production requires more than good models"
        >
          <p>
            The AI implementation graveyard is full of promising proof-of-concepts that never made it to production. Research shows 87%
            of AI projects fail to deploy—not because the models don't work, but because of integration challenges, data quality issues,
            scalability problems, or organizational resistance. The gap between "works in Jupyter notebook" and "runs reliably in production
            serving 10,000 users" is massive, and most teams underestimate the engineering required to bridge it.
          </p>

          <p>
            Our enterprise AI implementation services solve this problem with proven frameworks that accelerate the journey from POC to
            production. With 500+ successful AI deployments across industries and 10+ years of data engineering expertise, we've built
            the technical foundations, MLOps infrastructure, and deployment patterns that turn experimental AI into production systems
            delivering measurable business value. From LLM integration to custom AI agents, RAG systems to computer vision pipelines,
            we deliver enterprise-grade AI that scales, performs, and generates ROI.
          </p>

          <p>
            Whether you're integrating OpenAI GPT-4 into customer service workflows, building custom recommendation engines, deploying
            predictive maintenance models, or creating AI-powered document processing systems, our AI implementation methodology ensures
            you launch on time, on budget, and with the monitoring and governance needed for long-term success. We don't just hand you a
            model—we build the complete system: data pipelines, APIs, user interfaces, monitoring dashboards, and operational runbooks.
          </p>
        </ServiceSection>

        {/* Core Services Section */}
        <ServiceSection
          icon={Bot}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Core AI Implementation Services"
          subtitle="Production-ready AI systems from concept to scale"
        >
          <h3>1. LLM Integration & Application Development</h3>
          <p>
            Large Language Models (LLMs) like GPT-4, Claude, and Gemini unlock transformative use cases—document analysis, code generation,
            customer service automation, and knowledge search. However, integrating LLMs into enterprise systems requires more than API
            calls. Our LLM integration services handle prompt engineering, context management, cost optimization, security controls, and
            integration with your existing data and applications.
          </p>

          <p>
            We implement LLM-powered applications across use cases: customer support chatbots that understand context and company policies,
            document intelligence systems that extract structured data from contracts and invoices, code assistants that accelerate developer
            productivity, and internal knowledge search that answers questions across thousands of documents. Each implementation includes
            prompt templates, fallback strategies for model failures, content filtering for safety, and cost controls to prevent runaway
            token usage.
          </p>

          <p>
            For organizations concerned about data privacy or model costs, we also implement fine-tuned open-source LLMs (Llama 3, Mistral,
            Falcon) deployed on your infrastructure. Our fine-tuning services adapt models to your domain (legal language, medical terminology,
            technical documentation) using your proprietary data while maintaining security and compliance. We handle dataset curation,
            hyperparameter tuning, evaluation benchmarking, and deployment on cloud or on-premise infrastructure.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Production LLM Application:</strong> Fully integrated system with user interface, APIs, and backend infrastructure</li>
            <li><strong>Prompt Engineering Framework:</strong> Optimized prompts with version control, A/B testing, and performance tracking</li>
            <li><strong>Cost Optimization:</strong> Token usage monitoring, caching strategies, and model selection to minimize costs by 40-60%</li>
            <li><strong>Safety & Compliance:</strong> Content filtering, PII detection, audit logging, and access controls for enterprise deployment</li>
          </ul>

          <h3>2. Retrieval-Augmented Generation (RAG) Systems</h3>
          <p>
            RAG combines the power of LLMs with your proprietary data—enabling AI to answer questions using internal documents, customer
            records, product catalogs, or technical documentation. Unlike fine-tuning (which bakes knowledge into model weights), RAG
            retrieves relevant context dynamically, making it ideal for frequently updated information or use cases requiring source
            attribution and explainability.
          </p>

          <p>
            Our RAG implementation services cover the full pipeline: document ingestion and chunking, embedding generation with models like
            OpenAI Ada or open-source alternatives (Sentence Transformers, Instructor), vector database selection and optimization (Pinecone,
            Weaviate, Qdrant, ChromaDB), retrieval tuning (hybrid search, re-ranking), and LLM integration with context injection. We also
            implement advanced RAG techniques like parent-child chunking, hypothetical document embeddings (HyDE), and query expansion to
            improve retrieval accuracy.
          </p>

          <p>
            For enterprise knowledge management, we build RAG systems that index Confluence, SharePoint, Google Drive, Notion, and internal
            databases—providing a unified search interface that understands natural language queries and cites sources. These systems typically
            achieve 80-90% answer accuracy compared to 40-50% for traditional keyword search. We also implement feedback loops where users
            rate answers, allowing the system to improve over time through reinforcement learning from human feedback (RLHF).
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>End-to-End RAG Pipeline:</strong> Document ingestion, embedding, vector indexing, retrieval, and LLM generation</li>
            <li><strong>Vector Database Infrastructure:</strong> Optimized vector store with similarity search, filtering, and horizontal scaling</li>
            <li><strong>Retrieval Optimization:</strong> Hybrid search (semantic + keyword), re-ranking models, and query expansion for 20-40% accuracy improvement</li>
            <li><strong>Source Attribution:</strong> Citations and confidence scores for transparency and fact-checking</li>
          </ul>

          <h3>3. Custom AI Agent Development</h3>
          <p>
            AI agents go beyond chatbots—they're autonomous systems that can plan multi-step workflows, use tools (APIs, databases, search),
            and make decisions to accomplish complex tasks. Examples include scheduling assistants that coordinate across calendars and email,
            data analysis agents that write SQL queries and generate visualizations, and customer service agents that escalate to humans when
            needed. Our custom AI agent development services build these intelligent automation systems using frameworks like LangGraph,
            AutoGPT, and Microsoft Semantic Kernel.
          </p>

          <p>
            We design agents with proper guardrails: validation of tool outputs before taking actions, human-in-the-loop approvals for high-risk
            decisions, fallback strategies when the agent gets stuck, and comprehensive logging for debugging and compliance. Agent architectures
            include ReAct (Reasoning + Acting), Chain-of-Thought prompting for complex reasoning, and memory systems (short-term conversation
            history + long-term knowledge retrieval) to maintain context across interactions.
          </p>

          <p>
            For enterprise use cases, we integrate agents with your business systems: CRM (Salesforce, HubSpot), ERP (SAP, Oracle), ticketing
            (Jira, ServiceNow), and communication platforms (Slack, Teams, email). This allows agents to take real actions—creating support
            tickets, updating customer records, scheduling meetings, or generating reports—while maintaining audit trails and security controls.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Production AI Agent:</strong> Autonomous system with tool integration, decision logic, and human oversight</li>
            <li><strong>Agent Orchestration Framework:</strong> LangGraph or Semantic Kernel-based architecture with state management and error handling</li>
            <li><strong>Tool Library:</strong> Pre-built integrations with APIs, databases, search engines, and business systems</li>
            <li><strong>Monitoring Dashboard:</strong> Real-time tracking of agent actions, success rates, and cost per task</li>
          </ul>

          <h3>4. Machine Learning Model Development & Deployment</h3>
          <p>
            Not all AI problems require LLMs. For use cases like predictive maintenance, fraud detection, demand forecasting, churn prediction,
            or recommendation engines, traditional machine learning models (gradient boosting, neural networks, time series forecasting) often
            deliver better performance at lower cost. Our ML model development services cover the full lifecycle: problem framing, data preparation,
            feature engineering, model training, hyperparameter tuning, evaluation, and deployment.
          </p>

          <p>
            We implement supervised learning (classification, regression), unsupervised learning (clustering, anomaly detection), time series
            forecasting (Prophet, ARIMA, LSTM), and recommender systems (collaborative filtering, content-based, hybrid). For deep learning,
            we build custom neural networks using TensorFlow, PyTorch, or JAX—handling model architecture design, distributed training on
            multi-GPU clusters, and optimization for inference latency.
          </p>

          <p>
            Deployment is where many ML projects stall. We containerize models with Docker, deploy to Kubernetes for auto-scaling, expose
            REST or gRPC APIs for integration, and implement A/B testing frameworks to validate model performance in production. Our MLOps
            infrastructure includes automated retraining pipelines, model versioning, rollback capabilities, and continuous monitoring for
            model drift—ensuring models maintain accuracy as data distributions change over time.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Production ML Model:</strong> Trained, validated, and optimized model meeting performance SLAs (latency, throughput, accuracy)</li>
            <li><strong>Feature Engineering Pipeline:</strong> Automated data transformation and feature generation for training and inference</li>
            <li><strong>Model API:</strong> REST or gRPC endpoint with authentication, rate limiting, and monitoring</li>
            <li><strong>A/B Testing Framework:</strong> Controlled rollout with statistical analysis to validate model improvements</li>
          </ul>

          <h3>5. Computer Vision & Image Processing</h3>
          <p>
            Computer vision powers use cases like quality control automation in manufacturing, medical image analysis in healthcare, visual
            search in e-commerce, and document processing in financial services. Our computer vision implementation services cover object
            detection, image classification, semantic segmentation, optical character recognition (OCR), and facial recognition—leveraging
            pre-trained models (YOLO, ResNet, ViT) or custom models trained on your data.
          </p>

          <p>
            For manufacturing clients, we implement automated visual inspection systems that detect defects on production lines—achieving
            99%+ accuracy and reducing manual inspection costs by 60-80%. In healthcare, we build medical image analysis pipelines that
            assist radiologists in detecting tumors, fractures, or abnormalities. For document processing, we combine OCR with layout
            analysis and entity extraction to digitize invoices, contracts, and forms.
          </p>

          <p>
            Deployment considerations for computer vision include edge deployment (running models on IoT devices or cameras), GPU optimization
            (TensorRT, ONNX Runtime), and real-time inference pipelines processing video streams. We also handle data annotation and labeling—
            working with your SMEs to create high-quality training datasets or using active learning to minimize annotation costs.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Computer Vision Pipeline:</strong> End-to-end system from image capture to model inference to action/alert</li>
            <li><strong>Custom or Fine-Tuned Models:</strong> Trained on your data with accuracy benchmarks and performance metrics</li>
            <li><strong>Real-Time Processing:</strong> GPU-optimized inference for video streams or high-throughput image processing</li>
            <li><strong>Annotation Platform:</strong> Tools and workflows for data labeling with quality controls (optional)</li>
          </ul>

          <h3>6. Enterprise MLOps & Model Governance</h3>
          <p>
            Deploying one AI model is a project. Deploying and maintaining 50+ models across teams is an operations challenge. Our enterprise
            MLOps services build the infrastructure, processes, and governance needed to operationalize AI at scale. This includes model
            versioning (tracking experiments, datasets, hyperparameters), automated CI/CD pipelines for model deployment, feature stores for
            consistent training/inference features, and monitoring dashboards that track model performance, data drift, and business metrics.
          </p>

          <p>
            We implement model governance frameworks that ensure AI systems meet regulatory requirements and ethical standards. This includes
            model documentation (model cards), bias testing across demographic groups, explainability tools (SHAP, LIME) to interpret predictions,
            and approval workflows for high-risk models. For regulated industries (healthcare, finance), we build audit trails that track every
            model prediction back to training data, model version, and approval status.
          </p>

          <p>
            Our MLOps technology stack includes MLflow or Weights & Biases for experiment tracking, Kubeflow or AWS SageMaker for orchestration,
            Feast or Tecton for feature stores, and Evidently AI or Arize for monitoring. We also provide team training and runbooks so your
            internal ML engineers can maintain and extend the infrastructure post-deployment.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>MLOps Platform:</strong> Infrastructure for model training, deployment, monitoring, and retraining</li>
            <li><strong>Model Registry:</strong> Centralized catalog of models with versions, metadata, and approval status</li>
            <li><strong>Monitoring & Alerting:</strong> Dashboards tracking model accuracy, latency, data drift, and business KPIs</li>
            <li><strong>Governance Framework:</strong> Policies, documentation templates, and approval workflows for responsible AI</li>
          </ul>
        </ServiceSection>

        {/* Why Choose Innovoco Section */}
        <ServiceSection
          icon={CheckCircle}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Why Choose Innovoco for AI Implementation"
          subtitle="Proven frameworks that deliver production AI on time"
        >
          <h3>Data Engineering Foundation + AI Expertise</h3>
          <p>
            Unlike pure-play AI consultancies, we bring 10+ years of data engineering expertise to every AI implementation. This matters
            because AI is only as good as the data it's trained on. We've built data pipelines for Fortune 500 companies, so we know how to
            extract clean training data from messy enterprise systems, build feature stores that serve predictions in milliseconds, and
            architect data platforms that support both analytics and AI workloads. When your AI model needs real-time customer data, we
            build the streaming pipeline. When it needs historical transaction data, we optimize the data warehouse queries. This end-to-end
            capability means fewer handoffs, faster delivery, and AI systems that actually work in production.
          </p>

          <h3>12-16 Week Delivery with Agile Methodology</h3>
          <p>
            We break AI implementations into 2-week sprints with clear milestones: Week 2 (data assessment + POC), Week 4 (prototype with
            real data), Week 8 (alpha deployment), Week 12 (beta testing), Week 16 (production launch). This agile approach provides early
            feedback loops, manages risk, and ensures you're never surprised by timeline or scope changes. Every sprint delivers working
            software you can demo to stakeholders—building confidence and momentum throughout the project.
          </p>

          <h3>Framework-Agnostic, Best-of-Breed Technology</h3>
          <p>
            We're not tied to a single AI vendor or framework. Need OpenAI for some use cases and open-source Llama for others? We'll
            architect a hybrid solution. Want to compare Azure OpenAI vs. AWS Bedrock vs. Google Vertex AI? We'll run benchmarks on your
            data and recommend the best fit for your requirements, budget, and compliance needs. This technology-neutral stance ensures you
            get the right tool for each job—not the tool we're most comfortable with.
          </p>

          <h3>Production-Grade Quality from Day One</h3>
          <p>
            We don't build POCs that need to be rewritten for production. Our implementations follow production best practices from the first
            line of code: error handling, logging, monitoring, security, scalability, and documentation. By the time we reach production
            launch, the system has already been load tested, security reviewed, and validated by your stakeholders—minimizing last-minute
            surprises and reducing the risk of deployment delays.
          </p>

          <h3>Knowledge Transfer & Team Enablement</h3>
          <p>
            AI implementations shouldn't create vendor lock-in. We provide comprehensive documentation, code comments, architecture diagrams,
            and runbooks so your team can maintain and extend the system after we hand it off. We also offer training workshops covering the
            AI models, MLOps infrastructure, and operational procedures—empowering your engineers to take ownership and continue innovating.
          </p>
        </ServiceSection>

        {/* Implementation Process Section */}
        <ServiceSection
          icon={GitBranch}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Our AI Implementation Process"
          subtitle="From discovery to production in 12-16 weeks"
        >
          <h3>Phase 1: Discovery & POC (Weeks 1-2)</h3>
          <p>
            We start with stakeholder interviews, data assessment, and technical discovery to understand your use case, success criteria,
            and constraints. We prototype a simple proof-of-concept using sample data to validate technical feasibility and establish
            baseline performance metrics. This de-risks the project before committing to full implementation.
          </p>

          <p>
            <strong>Deliverables:</strong> POC demo, data assessment report, technical architecture document, project plan with milestones
          </p>

          <h3>Phase 2: Data Pipeline & Feature Engineering (Weeks 3-6)</h3>
          <p>
            We build the data infrastructure needed to train and serve AI models: ETL pipelines to extract training data, feature engineering
            transformations, data quality validation, and feature stores for real-time inference. This phase also includes labeling workflows
            if supervised learning is required. By Week 6, we have a clean training dataset and automated pipelines that will support model
            retraining.
          </p>

          <p>
            <strong>Deliverables:</strong> Production data pipelines, feature store, training dataset, data quality dashboard
          </p>

          <h3>Phase 3: Model Development & Optimization (Weeks 7-10)</h3>
          <p>
            We train production models using your data, tune hyperparameters, and optimize for your performance requirements (accuracy, latency,
            cost). For LLM applications, this includes prompt engineering and RAG pipeline optimization. For ML models, this includes feature
            selection, model architecture design, and distributed training. We conduct adversarial testing to identify edge cases and failure
            modes before deployment.
          </p>

          <p>
            <strong>Deliverables:</strong> Trained production models, evaluation benchmarks, model documentation, bias testing report
          </p>

          <h3>Phase 4: Integration & Alpha Deployment (Weeks 11-14)</h3>
          <p>
            We integrate the AI model with your applications, APIs, and user interfaces. This includes building REST APIs, implementing
            authentication and authorization, adding monitoring and logging, and deploying to a staging environment. Alpha testing with
            internal users validates end-to-end functionality and gathers feedback for final refinements.
          </p>

          <p>
            <strong>Deliverables:</strong> Deployed alpha system, API documentation, monitoring dashboards, alpha testing report
          </p>

          <h3>Phase 5: Production Launch & Handoff (Weeks 15-16)</h3>
          <p>
            We conduct final load testing, security review, and stakeholder sign-off before production launch. Launch typically uses a phased
            rollout (10% → 50% → 100% of traffic) to minimize risk. Post-launch, we provide 30 days of hypercare support to address any
            issues and tune performance. We also conduct knowledge transfer sessions and hand off documentation to your team.
          </p>

          <p>
            <strong>Deliverables:</strong> Production deployment, runbooks, architecture diagrams, training materials, 30-day hypercare support
          </p>
        </ServiceSection>

        {/* Technology Stack Section */}
        <ServiceSection
          icon={Gauge}
          iconGradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          title="AI Technology Stack"
          subtitle="Best-in-class tools for enterprise AI"
        >
          <h3>LLM Platforms & Frameworks</h3>
          <ul>
            <li><strong>OpenAI (GPT-4, GPT-3.5):</strong> Industry-leading LLMs for text generation, analysis, and reasoning</li>
            <li><strong>Anthropic Claude:</strong> Long-context LLM (100K+ tokens) for document analysis and multi-turn conversations</li>
            <li><strong>Azure OpenAI / AWS Bedrock / Google Vertex AI:</strong> Managed LLM services with enterprise security and compliance</li>
            <li><strong>LangChain / LlamaIndex:</strong> Orchestration frameworks for RAG, agents, and multi-step workflows</li>
            <li><strong>Llama 3 / Mistral / Falcon:</strong> Open-source LLMs for fine-tuning and self-hosted deployment</li>
          </ul>

          <h3>Vector Databases & Retrieval</h3>
          <ul>
            <li><strong>Pinecone / Weaviate:</strong> Managed vector databases optimized for similarity search at scale</li>
            <li><strong>ChromaDB / Qdrant:</strong> Open-source vector stores for self-hosted deployment</li>
            <li><strong>Postgres with pgvector:</strong> SQL database with vector similarity search extension</li>
            <li><strong>Elasticsearch / OpenSearch:</strong> Hybrid search (keyword + semantic) for best retrieval accuracy</li>
          </ul>

          <h3>ML Frameworks & Tools</h3>
          <ul>
            <li><strong>PyTorch / TensorFlow:</strong> Deep learning frameworks for custom model development</li>
            <li><strong>XGBoost / LightGBM:</strong> Gradient boosting for structured data (tabular) use cases</li>
            <li><strong>Hugging Face Transformers:</strong> Pre-trained models for NLP, vision, and multimodal tasks</li>
            <li><strong>scikit-learn:</strong> Classical ML algorithms for classification, regression, and clustering</li>
          </ul>

          <h3>MLOps & Deployment</h3>
          <ul>
            <li><strong>MLflow / Weights & Biases:</strong> Experiment tracking, model registry, and versioning</li>
            <li><strong>Kubeflow / AWS SageMaker:</strong> End-to-end ML pipelines from training to deployment</li>
            <li><strong>Docker / Kubernetes:</strong> Containerization and orchestration for scalable model serving</li>
            <li><strong>Feast / Tecton:</strong> Feature stores for consistent training/inference features</li>
            <li><strong>Evidently AI / Arize:</strong> Model monitoring for drift detection and performance tracking</li>
          </ul>
        </ServiceSection>

        {/* Get Started Section */}
        <ServiceSection
          icon={Zap}
          iconGradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          title="Get Started with AI Implementation"
          subtitle="Launch production AI in 12-16 weeks"
        >
          <p>
            Ready to transform your AI vision into production systems that deliver measurable business value? Our proven AI implementation
            methodology has delivered 500+ successful deployments across industries—from LLM-powered chatbots to predictive maintenance
            systems to computer vision quality control. Whether you're building your first AI application or scaling to dozens of models,
            we provide the expertise, frameworks, and MLOps infrastructure to succeed.
          </p>

          <p>
            <strong>Next Steps:</strong>
          </p>
          <ul>
            <li><strong>Schedule an Implementation Assessment:</strong> 90-minute technical consultation to scope your AI project, validate feasibility, and estimate timeline/budget (complimentary)</li>
            <li><strong>Request a POC Proposal:</strong> Receive a detailed statement of work with delivery milestones, team composition, and investment breakdown</li>
            <li><strong>Download Our AI Implementation Guide:</strong> Free resource covering LLM integration, RAG architecture, MLOps best practices, and common pitfalls to avoid</li>
            <li><strong>View Implementation Case Studies:</strong> See how we've helped enterprises deploy production AI across customer service, operations, analytics, and product innovation</li>
          </ul>

          <p>
            Stop experimenting and start deploying. Contact Innovoco today to schedule your complimentary AI implementation assessment and
            receive a customized roadmap from POC to production.
          </p>
        </ServiceSection>

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
