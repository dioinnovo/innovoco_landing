/**
 * Seed Sanity with initial blog content
 *
 * Run: bunx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '0tib7egx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Optional for public datasets
});

async function seedContent() {
  console.log('🌱 Seeding Sanity with initial content...\n');

  // First, create an author
  const author = await client.createOrReplace({
    _id: 'author-diego',
    _type: 'author',
    name: 'Diego de la Hoz',
    email: 'diego@innovoco.com',
    title: 'CEO & Founder',
    bio: 'Enterprise AI strategist with 15+ years of experience helping Fortune 500 companies transform their data into competitive advantage.',
  });
  console.log('✓ Created author:', author.name);

  // Create blog articles
  const articles = [
    {
      _id: 'article-ai-2025',
      _type: 'article',
      title: 'The Future of Enterprise AI: Trends to Watch in 2025',
      slug: { _type: 'slug', current: 'future-enterprise-ai-2025' },
      excerpt:
        'Explore the emerging AI trends that will shape enterprise technology in the coming year, from generative AI to autonomous agents.',
      content: `## The AI Landscape is Evolving Rapidly

As we approach 2025, enterprise AI is undergoing a fundamental transformation. The technologies that seemed experimental just a year ago are now becoming production-ready solutions that deliver measurable business value.

### Key Trends to Watch

**1. Generative AI Goes Enterprise**
Large language models are moving beyond consumer applications into enterprise workflows. Companies are now deploying custom AI assistants trained on their proprietary data.

**2. AI Agents Emerge**
Autonomous AI agents that can plan, execute, and learn are becoming more sophisticated. These agents can handle complex multi-step tasks with minimal human intervention.

**3. Data Quality Becomes Critical**
With AI systems only as good as their training data, organizations are investing heavily in data quality, governance, and management.

### What This Means for Your Business

The organizations that will thrive in 2025 are those that start preparing now. This means:
- Building robust data infrastructure
- Establishing AI governance frameworks
- Training teams on AI-first workflows
- Partnering with experienced implementation teams

At Innovoco, we're helping enterprises navigate this transition with our AI Discovery Workshop and implementation services.`,
      category: 'ai-ml',
      tags: ['AI', 'Enterprise', 'Trends', '2025'],
      publishDate: new Date().toISOString(),
      status: 'published',
      readTimeMinutes: 8,
      metaDescription:
        'Discover the key enterprise AI trends for 2025 including generative AI adoption, AI agents, and the critical role of data quality.',
      featured: true,
      author: { _type: 'reference', _ref: 'author-diego' },
    },
    {
      _id: 'article-data-pipelines',
      _type: 'article',
      title: 'Building Scalable Data Pipelines with Modern Tools',
      slug: { _type: 'slug', current: 'scalable-data-pipelines' },
      excerpt:
        'Learn best practices for designing and implementing data pipelines that can handle enterprise-scale workloads.',
      content: `## Why Data Pipelines Matter

In the age of AI, your data pipeline is the foundation of everything. Without reliable, scalable data infrastructure, even the most sophisticated AI models will fail to deliver value.

### Core Principles of Modern Data Pipelines

**1. Design for Scale**
Your pipeline should handle 10x your current data volume without major architectural changes.

**2. Embrace Immutability**
Treat data as immutable events. This enables:
- Easy debugging and auditing
- Time-travel queries
- Simpler recovery from failures

**3. Monitor Everything**
Every stage of your pipeline should emit metrics. Data observability is not optional.

### Technology Choices

The modern data stack includes:
- **Ingestion**: Apache Kafka, AWS Kinesis, or Google Pub/Sub
- **Storage**: Delta Lake, Apache Iceberg, or Apache Hudi
- **Processing**: Apache Spark, dbt, or Snowflake
- **Orchestration**: Apache Airflow, Dagster, or Prefect

### Getting Started

The best approach is to start small:
1. Document your current data flows
2. Identify the biggest bottlenecks
3. Implement changes incrementally
4. Measure improvements continuously`,
      category: 'data-engineering',
      tags: ['Data Engineering', 'Pipelines', 'Big Data'],
      publishDate: new Date(Date.now() - 86400000).toISOString(),
      status: 'published',
      readTimeMinutes: 12,
      metaDescription:
        'Best practices for building scalable enterprise data pipelines with modern tools like Kafka, Delta Lake, and dbt.',
      featured: false,
      author: { _type: 'reference', _ref: 'author-diego' },
    },
    {
      _id: 'article-ai-analytics',
      _type: 'article',
      title: 'Transforming Business Intelligence with AI-Powered Analytics',
      slug: { _type: 'slug', current: 'ai-powered-analytics' },
      excerpt:
        'Discover how AI is revolutionizing business intelligence and enabling faster, more accurate decision-making.',
      content: `## Beyond Traditional BI

Traditional business intelligence served us well for decades, but the demands of modern business have outgrown dashboard-based reporting.

### The AI-Powered Analytics Revolution

**Natural Language Queries**
Ask questions in plain English: "What drove our Q4 sales increase?" AI understands context and returns actionable insights.

**Automated Anomaly Detection**
AI systems continuously monitor your metrics and alert you to unusual patterns before they become problems.

**Predictive Analytics**
Move from "what happened" to "what will happen" with ML-powered forecasting.

### Implementation Strategies

1. **Start with a use case** - Pick one high-value decision that could benefit from better analytics
2. **Connect your data** - Ensure all relevant data sources are accessible
3. **Train your team** - AI tools are only valuable if people use them
4. **Iterate quickly** - Start with basic questions and expand based on user feedback

### Measuring Success

Track these metrics:
- Time to insight (how long to answer business questions)
- Decision accuracy (are AI-informed decisions better?)
- User adoption (are people actually using the tools?)`,
      category: 'analytics-bi',
      tags: ['Analytics', 'Business Intelligence', 'AI'],
      publishDate: new Date(Date.now() - 172800000).toISOString(),
      status: 'published',
      readTimeMinutes: 6,
      metaDescription:
        'How AI is transforming business intelligence with natural language queries, automated anomaly detection, and predictive analytics.',
      featured: false,
      author: { _type: 'reference', _ref: 'author-diego' },
    },
  ];

  for (const article of articles) {
    const created = await client.createOrReplace(article);
    console.log('✓ Created article:', created.title);
  }

  console.log('\n✅ Seeding complete!');
  console.log('\nYou can now view your content at:');
  console.log('- Blog: http://localhost:3000/blog');
  console.log('- Studio: http://localhost:3000/studio');
}

seedContent().catch(console.error);
