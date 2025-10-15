"use client";

import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { RelatedServices } from '@/components/services/RelatedServices';
import { SchemaMarkup } from '@/lib/seo/SchemaMarkup';
import { createServiceSchema, createBreadcrumbSchema } from '@/lib/seo/schema';
import { Brain, Rocket, Database, Cloud, GitBranch, Shield, Zap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { trackServicePageView, useScrollDepthTracking } from '@/lib/analytics/events';

export function DataEngineeringPageClient() {
  const breadcrumbs = [
    { label: 'Services', href: '/services' },
    { label: 'Data Engineering & Modernization', href: '/services/data-engineering-modernization' }
  ];

  const relatedServices = [
    {
      icon: Brain,
      iconGradient: "bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]",
      title: "AI Strategy & Consulting",
      description: "Build your AI roadmap on a foundation of modern data infrastructure. Strategic planning for AI-ready architecture.",
      href: "/services/ai-strategy-consulting"
    },
    {
      icon: Rocket,
      iconGradient: "bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]",
      title: "Enterprise AI Implementation",
      description: "Deploy AI solutions on your modernized data platform. From POC to production in 12-16 weeks.",
      href: "/services/ai-implementation"
    }
  ];

  // Track page view and scroll depth
  useEffect(() => {
    trackServicePageView('Data Engineering & Modernization');
    const cleanup = useScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <>
      <SchemaMarkup schema={createServiceSchema({
        name: "Data Engineering & Modernization Services",
        description: "Modernize your data warehouse for AI-ready infrastructure. Cloud migration, ETL optimization, and enterprise data architecture with 10+ years expertise building data platforms for Fortune 500 companies.",
        url: "https://innovoco.com/services/data-engineering-modernization",
        serviceType: "Data Engineering"
      })} />

      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://innovoco.com" },
        { name: "Services", url: "https://innovoco.com/services" },
        { name: "Data Engineering & Modernization", url: "https://innovoco.com/services/data-engineering-modernization" }
      ])} />

      <ServicePageLayout breadcrumbs={breadcrumbs}>
        <ServiceHero
          badge="10+ Years Building Enterprise Data Platforms"
          title="Data Engineering & Modernization"
          subtitle="Build the Foundation for AI-Ready Enterprise Data"
          description="Transform legacy data warehouses into modern, cloud-native platforms optimized for AI workloads. Expert data engineering services covering cloud migration, ETL modernization, and real-time data pipelines with proven expertise serving Fortune 500 companies."
          trustIndicators={[
            { metric: "1000+", label: "Data Pipelines Built" },
            { metric: "10Y+", label: "Data Engineering Expertise" },
            { metric: "5PB+", label: "Data Migrated to Cloud" },
            { metric: "99.9%", label: "Pipeline Uptime SLA" }
          ]}
          primaryCTA={{
            text: "Schedule Data Assessment",
            onClick: () => {
              window.location.href = '/contact?service=data-engineering';
            }
          }}
          secondaryCTA={{
            text: "View Data Case Studies",
            href: "/case-studies"
          }}
          backgroundGradient="bg-gradient-to-br from-[#D1FAE5] via-[#DBEAFE] to-[#EDE9FE]"
        />

        {/* Overview Section */}
        <ServiceSection
          icon={Database}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Why Data Modernization Matters in 2025"
          subtitle="Legacy infrastructure is the #1 blocker to AI adoption"
        >
          <p>
            Your AI ambitions are only as strong as your data foundation. Yet 73% of enterprises still rely on legacy data warehouses
            built 10-15 years ago—architectures designed for batch reporting, not real-time AI inference. These monolithic systems create
            bottlenecks: siloed data across departments, brittle ETL processes that break with schema changes, and infrastructure that
            cannot scale to support vector databases, embedding models, or LLM fine-tuning workloads.
          </p>

          <p>
            Our data engineering modernization services solve this problem by transforming legacy data warehouses into cloud-native,
            AI-ready platforms. With 10+ years of expertise building enterprise data infrastructure for Fortune 500 companies, we've
            migrated over 5 petabytes of data to Azure, Google Cloud, and AWS—designing architectures that support both traditional
            analytics and modern AI use cases. From ETL modernization to real-time streaming pipelines, we build data platforms that
            are scalable, secure, and optimized for the AI workloads you'll deploy tomorrow.
          </p>

          <p>
            Whether you're migrating from on-premise Oracle, SQL Server, or Teradata to the cloud, modernizing Hadoop clusters to
            Databricks or Snowflake, or building greenfield data lakes for AI training, our data warehouse modernization services
            provide the technical expertise and battle-tested frameworks to deliver results. We don't just "lift and shift"—we
            re-architect for performance, cost efficiency, and AI readiness.
          </p>
        </ServiceSection>

        {/* Core Services Section */}
        <ServiceSection
          icon={Cloud}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Core Data Engineering Services"
          subtitle="End-to-end data platform modernization"
        >
          <h3>1. Cloud Data Migration & Warehouse Modernization</h3>
          <p>
            Migrating enterprise data warehouses to the cloud is complex—data gravity, regulatory compliance, zero-downtime requirements,
            and legacy application dependencies all create challenges. Our cloud data migration services de-risk this transition with
            proven frameworks covering assessment, migration planning, execution, and validation.
          </p>

          <p>
            We've successfully migrated data warehouses from on-premise Oracle, SQL Server, Teradata, Netezza, and DB2 to cloud-native
            platforms including Snowflake, Google BigQuery, Azure Synapse Analytics, AWS Redshift, and Databricks. Our migration approach
            includes data profiling, schema optimization, query refactoring, performance tuning, and comprehensive testing to ensure the
            new platform meets or exceeds legacy system performance.
          </p>

          <p>
            For Hadoop modernization, we transition legacy HDFS clusters to managed services like Databricks, AWS EMR, or Google Dataproc—
            eliminating operational overhead while improving performance and cost efficiency. We also specialize in hybrid cloud architectures
            where sensitive data remains on-premise while compute-intensive AI workloads run in the cloud.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Migration Roadmap:</strong> Phased plan with wave-based migration strategy to minimize business disruption</li>
            <li><strong>Schema & Query Optimization:</strong> Re-engineered data models optimized for cloud data warehouse performance</li>
            <li><strong>Data Validation Framework:</strong> Automated testing to ensure 100% data integrity post-migration</li>
            <li><strong>Cost Optimization:</strong> Right-sizing compute, storage tiering, and query optimization to reduce cloud spend by 30-50%</li>
          </ul>

          <h3>2. ETL Modernization & Data Pipeline Engineering</h3>
          <p>
            Legacy ETL tools like Informatica, SSIS, and DataStage create technical debt: proprietary licensing costs, limited scalability,
            and difficulty integrating with modern data sources (APIs, streaming data, SaaS applications). Our ETL modernization services
            transition these brittle batch processes to modern, cloud-native data pipelines using Apache Airflow, dbt, Azure Data Factory,
            AWS Glue, or Google Dataflow.
          </p>

          <p>
            We design ELT (Extract, Load, Transform) architectures that leverage cloud data warehouse compute for transformations—eliminating
            the need for separate ETL servers and reducing infrastructure costs. For real-time use cases, we implement streaming pipelines
            with Apache Kafka, AWS Kinesis, or Google Pub/Sub to support event-driven architectures and real-time AI inference.
          </p>

          <p>
            Our data pipeline engineering follows DataOps best practices: version-controlled SQL transformations with dbt, CI/CD pipelines
            for automated testing and deployment, data quality checks at every stage, and comprehensive monitoring with alerting for pipeline
            failures. We also implement data lineage tracking so you can trace any data point back to its source—critical for regulatory
            compliance and debugging data quality issues.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Modernized Data Pipelines:</strong> Cloud-native ELT workflows replacing legacy ETL with 50-70% faster processing</li>
            <li><strong>Real-Time Streaming Architecture:</strong> Kafka-based event pipelines for sub-second data availability</li>
            <li><strong>DataOps Framework:</strong> CI/CD, automated testing, and monitoring for production-grade data operations</li>
            <li><strong>Data Quality Framework:</strong> Automated validation rules to catch data anomalies before they impact downstream systems</li>
          </ul>

          <h3>3. Data Lake & Lakehouse Architecture</h3>
          <p>
            Data lakes solve the "schema-on-read" problem that data warehouses struggle with—enabling you to ingest raw, unstructured data
            (logs, images, documents, sensor data) without upfront schema design. However, poorly architected data lakes become "data swamps"—
            unusable repositories of undocumented, low-quality data. Our data lake engineering services build well-governed, performant data
            lakes using AWS S3, Azure Data Lake Storage, or Google Cloud Storage with proper partitioning, cataloging, and access controls.
          </p>

          <p>
            For organizations needing both data lake flexibility and data warehouse performance, we design lakehouse architectures using
            Delta Lake, Apache Iceberg, or Apache Hudi. These open table formats provide ACID transactions, schema evolution, and time travel
            capabilities on top of cloud object storage—delivering the best of both worlds. Lakehouse architectures are particularly well-suited
            for AI/ML workloads where data scientists need access to raw feature data alongside aggregated business metrics.
          </p>

          <p>
            We also implement data mesh principles for large enterprises: decentralized data ownership where domain teams manage their own
            data products, discoverable through a central data catalog (AWS Glue Catalog, Azure Purview, Google Dataplex). This organizational
            model scales data engineering across hundreds of teams while maintaining governance and quality standards.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Data Lake Architecture:</strong> Multi-zone design (raw, curated, analytics) with proper governance and security</li>
            <li><strong>Lakehouse Implementation:</strong> Delta Lake or Iceberg on cloud object storage for unified analytics and AI</li>
            <li><strong>Data Catalog & Discovery:</strong> Searchable metadata repository with lineage tracking and data quality scores</li>
            <li><strong>Data Mesh Framework:</strong> Federated data ownership model for enterprise-scale data platforms (optional)</li>
          </ul>

          <h3>4. Real-Time Data Infrastructure for AI</h3>
          <p>
            AI applications demand real-time data: fraud detection models need transaction data within milliseconds, recommendation engines
            require live user behavior, and predictive maintenance alerts must trigger before equipment fails. Batch ETL running overnight
            is too slow for these use cases. Our real-time data infrastructure services build streaming pipelines, event-driven architectures,
            and feature stores that deliver fresh data to AI models in real time.
          </p>

          <p>
            We implement Apache Kafka or cloud-native alternatives (AWS Kinesis, Azure Event Hubs, Google Pub/Sub) as the backbone for
            event streaming. Change Data Capture (CDC) tools like Debezium or AWS DMS stream database changes in real time, ensuring AI
            models always have the latest data without batch delays. For feature engineering, we build online feature stores using Feast,
            Tecton, or cloud-native solutions that serve pre-computed features with single-digit millisecond latency.
          </p>

          <p>
            Real-time data infrastructure also supports operational AI: dashboards that update every second, alerting systems that react to
            anomalies immediately, and A/B testing platforms that measure experiment results in real time. These capabilities are essential
            for AI-first companies that compete on speed and responsiveness.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Streaming Data Platform:</strong> Kafka or cloud event hub architecture with producer/consumer patterns</li>
            <li><strong>Change Data Capture (CDC):</strong> Real-time database replication for analytics and AI without impacting OLTP systems</li>
            <li><strong>Feature Store:</strong> Online/offline feature storage for consistent model training and inference</li>
            <li><strong>Real-Time Analytics:</strong> Stream processing with Flink, Spark Streaming, or ksqlDB for live aggregations</li>
          </ul>

          <h3>5. Data Governance, Security & Compliance</h3>
          <p>
            Modernizing data infrastructure cannot come at the cost of security or compliance. Our data governance services ensure that
            cloud data platforms meet regulatory requirements (GDPR, HIPAA, SOC 2, PCI-DSS) while enabling data democratization. We implement
            role-based access controls (RBAC), column-level and row-level security, data masking, and encryption at rest and in transit.
          </p>

          <p>
            For data privacy, we design architectures that minimize data movement across regions, implement data residency controls, and
            provide audit trails for all data access. Sensitive PII (Personally Identifiable Information) is tokenized or pseudonymized
            to reduce risk. We also build data retention policies that automatically archive or delete data based on regulatory requirements.
          </p>

          <p>
            Data cataloging is critical for governance at scale. We implement enterprise data catalogs (AWS Glue, Azure Purview, Alation)
            that automatically discover datasets, classify sensitive data, and track lineage. Business glossaries and metadata tagging make
            data discoverable for analysts and data scientists while ensuring compliance teams can audit data usage.
          </p>

          <p>
            <strong>Key Deliverables:</strong>
          </p>
          <ul>
            <li><strong>Data Security Architecture:</strong> Encryption, access controls, and network isolation aligned with industry standards</li>
            <li><strong>Compliance Framework:</strong> GDPR, HIPAA, SOC 2, or PCI-DSS controls mapped to data platform components</li>
            <li><strong>Data Catalog & Classification:</strong> Automated discovery and tagging of sensitive data across the data estate</li>
            <li><strong>Audit & Monitoring:</strong> Centralized logging, access auditing, and anomaly detection for security threats</li>
          </ul>
        </ServiceSection>

        {/* Why Choose Innovoco Section */}
        <ServiceSection
          icon={CheckCircle}
          iconGradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          title="Why Choose Innovoco for Data Engineering"
          subtitle="10+ years building platforms that power AI at scale"
        >
          <h3>Deep Expertise Across Cloud Platforms</h3>
          <p>
            We're not a single-cloud shop. Our team holds certifications and real-world experience across Microsoft Azure, Google Cloud
            Platform, and AWS. This multi-cloud expertise means we recommend the right platform for your workload—not the one we're most
            comfortable with. Need Snowflake for analytics, Databricks for ML, and BigQuery for BI? We architect hybrid platforms that
            leverage the best capabilities of each service while minimizing data movement costs.
          </p>

          <h3>AI-First Architecture Design</h3>
          <p>
            Unlike traditional data engineering consultancies focused solely on analytics, we design data platforms with AI workloads in
            mind from day one. This means selecting data warehouses that support vector search (Postgres with pgvector, Snowflake with
            Cortex), building feature stores for ML model serving, and architecting data pipelines that feed both dashboards and training
            datasets. When you're ready to deploy LLMs or recommendation engines, your data infrastructure will already support it.
          </p>

          <h3>Cost Optimization & FinOps</h3>
          <p>
            Cloud data platforms can quickly become expensive if not properly optimized. We've helped clients reduce cloud data costs by
            30-60% through query optimization, storage tiering (hot/warm/cold), compute right-sizing, and reserved capacity planning. Our
            FinOps approach includes cost tagging, chargeback models for business unit accountability, and automated policies that pause
            idle resources. We also benchmark performance per dollar—ensuring you're getting the best ROI for your cloud spend.
          </p>

          <h3>Proven Migration Frameworks</h3>
          <p>
            We've migrated over 5 petabytes of data to the cloud without business disruption. Our migration methodology uses wave-based
            rollouts, parallel run validation (old and new systems running simultaneously), and automated reconciliation to ensure zero
            data loss. We've handled complex migrations involving 1000+ tables, terabytes of daily data ingest, and 24/7 uptime requirements.
            If your business cannot tolerate downtime, our phased migration approach keeps production running throughout the transition.
          </p>

          <h3>End-to-End Service from Strategy to Managed Operations</h3>
          <p>
            Data engineering is not a one-time project—it's an ongoing operation. While we can deliver a modernized data platform in 12-16
            weeks, we also offer long-term managed services to monitor, optimize, and evolve your infrastructure as your business grows.
            This includes 24/7 monitoring, proactive performance tuning, schema evolution management, and cost optimization—allowing your
            internal teams to focus on analytics and AI rather than infrastructure operations.
          </p>
        </ServiceSection>

        {/* Technology Stack Section */}
        <ServiceSection
          icon={GitBranch}
          iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          title="Modern Data Technology Stack"
          subtitle="Best-in-class tools for cloud-native data platforms"
        >
          <p>
            Our data engineering services leverage a modern technology stack designed for scalability, performance, and AI readiness.
            We're platform-agnostic and select technologies based on your specific requirements, existing investments, and long-term
            strategic goals.
          </p>

          <h3>Cloud Data Warehouses</h3>
          <ul>
            <li><strong>Snowflake:</strong> Multi-cloud data warehouse with near-zero maintenance, automatic scaling, and data sharing capabilities</li>
            <li><strong>Google BigQuery:</strong> Serverless analytics with built-in ML, fast SQL queries, and cost-effective storage</li>
            <li><strong>Azure Synapse Analytics:</strong> Unified analytics service integrating data warehousing and big data processing</li>
            <li><strong>AWS Redshift:</strong> Petabyte-scale data warehouse with tight integration into AWS ecosystem</li>
            <li><strong>Databricks SQL:</strong> Lakehouse platform combining data lake flexibility with data warehouse performance</li>
          </ul>

          <h3>Data Integration & Orchestration</h3>
          <ul>
            <li><strong>Apache Airflow:</strong> Open-source workflow orchestration with Python-based DAGs and extensive integrations</li>
            <li><strong>dbt (Data Build Tool):</strong> SQL-based transformation framework with version control and automated testing</li>
            <li><strong>Fivetran / Airbyte:</strong> Managed ELT connectors for 300+ data sources (SaaS, databases, files)</li>
            <li><strong>Azure Data Factory / AWS Glue:</strong> Cloud-native ETL services with serverless compute and visual editors</li>
          </ul>

          <h3>Streaming & Real-Time Data</h3>
          <ul>
            <li><strong>Apache Kafka:</strong> Distributed event streaming platform for high-throughput, low-latency data pipelines</li>
            <li><strong>AWS Kinesis / Azure Event Hubs:</strong> Managed streaming services with auto-scaling and native cloud integrations</li>
            <li><strong>Debezium:</strong> Change Data Capture (CDC) for real-time database replication</li>
            <li><strong>Apache Flink / Spark Streaming:</strong> Stream processing engines for real-time aggregations and transformations</li>
          </ul>

          <h3>Data Governance & Quality</h3>
          <ul>
            <li><strong>Azure Purview / AWS Glue Catalog:</strong> Enterprise data catalogs with automated discovery and lineage tracking</li>
            <li><strong>Great Expectations:</strong> Data quality testing framework with Python-based validation rules</li>
            <li><strong>Monte Carlo / Datadog:</strong> Data observability platforms for monitoring pipeline health and data quality</li>
          </ul>
        </ServiceSection>

        {/* Industries Section */}
        <ServiceSection
          icon={Shield}
          iconGradient="bg-gradient-to-br from-[#FECACA] to-[#FCA5A5]"
          title="Industry-Specific Data Solutions"
          subtitle="Tailored architectures for regulated and complex environments"
        >
          <p>
            We've built data platforms across highly regulated industries where data governance, security, and compliance are non-negotiable.
            In <strong>healthcare</strong>, we design HIPAA-compliant data lakes that support clinical analytics, population health management,
            and AI-driven diagnostics while ensuring PHI (Protected Health Information) is properly de-identified and audited.
          </p>

          <p>
            For <strong>financial services</strong>, our data architectures meet SOC 2, PCI-DSS, and regulatory reporting requirements (Basel III,
            Dodd-Frank). We build real-time risk management pipelines, fraud detection systems, and customer 360 platforms that integrate data
            from core banking systems, trading platforms, and external market data feeds.
          </p>

          <p>
            In <strong>retail and e-commerce</strong>, we specialize in unified customer data platforms (CDP) that consolidate data from
            e-commerce sites, mobile apps, point-of-sale systems, and marketing platforms. Real-time inventory management, dynamic pricing
            engines, and personalized recommendation systems all rely on the modern data infrastructure we build.
          </p>

          <p>
            <strong>Manufacturing</strong> clients benefit from our expertise in IoT data ingestion, time-series databases for sensor data,
            and predictive maintenance analytics. We integrate data from MES (Manufacturing Execution Systems), ERP, and supply chain systems
            to provide end-to-end visibility and enable AI-driven optimization.
          </p>
        </ServiceSection>

        {/* Get Started Section */}
        <ServiceSection
          icon={Zap}
          iconGradient="bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7]"
          title="Get Started with Data Modernization"
          subtitle="Transform your data infrastructure in 12-16 weeks"
        >
          <p>
            Ready to modernize your data warehouse and build the foundation for AI? Our proven methodology delivers cloud-native data
            platforms that are scalable, secure, and optimized for analytics and AI workloads. Whether you're migrating from legacy
            on-premise systems or optimizing an existing cloud data platform, we provide the expertise and frameworks to succeed.
          </p>

          <p>
            <strong>Next Steps:</strong>
          </p>
          <ul>
            <li><strong>Schedule a Data Assessment:</strong> 90-minute consultation to review your current data architecture and identify modernization opportunities (complimentary)</li>
            <li><strong>Request a Migration Roadmap:</strong> Receive a customized cloud migration plan with effort estimates, timeline, and cost projections</li>
            <li><strong>Download Our Data Modernization Guide:</strong> Free resource covering cloud platform comparison, migration best practices, and cost optimization strategies</li>
            <li><strong>View Data Engineering Case Studies:</strong> See how we've helped enterprises migrate to Snowflake, BigQuery, and Databricks with measurable results</li>
          </ul>

          <p>
            Transform your data warehouse into an AI-ready platform. Contact Innovoco today to schedule your complimentary data assessment
            and receive a personalized modernization roadmap.
          </p>
        </ServiceSection>

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </ServicePageLayout>
    </>
  );
}
