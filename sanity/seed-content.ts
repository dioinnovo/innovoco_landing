/**
 * Sanity Content Seeding Script
 *
 * This script creates the initial author profile and first blog article.
 * Run with: bunx tsx sanity/seed-content.ts
 */

import { createClient } from '@sanity/client';

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0tib7egx';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_TOKEN environment variable is required');
  console.log('Get a token from: https://www.sanity.io/manage/project/' + projectId + '/api#tokens');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ============================================
// Author Profile
// ============================================

const authorDocument = {
  _type: 'author',
  _id: 'author-innovoco-team',
  name: 'Innovoco Team',
  email: 'team@innovoco.com',
  title: 'AI Strategy & Implementation',
  bio: 'Enterprise AI consulting experts helping organizations transform data into intelligent systems. We combine deep technical expertise with business acumen to deliver measurable AI outcomes.',
};

// ============================================
// First Blog Article
// ============================================

const articleDocument = {
  _type: 'article',
  _id: 'article-enterprise-ai-pilots-fail',
  title: "Why 95% of Enterprise AI Coding Pilots Fail—And It's Not About the Technology",
  slug: { current: 'why-enterprise-ai-coding-pilots-fail' },
  excerpt:
    'Most enterprise AI coding pilots fail not because of model selection, but due to organizational and change management factors. Learn the three patterns that separate successful AI implementations from expensive failures.',
  content: [
    // Hook paragraph
    {
      _type: 'block',
      _key: 'intro1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro1-span1',
          text: 'A stunning ',
        },
        {
          _type: 'span',
          _key: 'intro1-span2',
          text: '95% of enterprise AI pilots fail to deliver measurable P&L impact',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'intro1-span3',
          text: ', according to a ',
        },
        {
          _type: 'span',
          _key: 'intro1-span4',
          text: 'recent MIT report',
          marks: ['link-mit'],
        },
        {
          _type: 'span',
          _key: 'intro1-span5',
          text: ". Yet companies continue to pour billions into AI coding tools, expecting transformation while repeating the same mistakes. The problem isn't the technology—it's how organizations approach implementation.",
        },
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'link-mit',
          href: 'https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/',
          blank: true,
        },
      ],
    },
    // Second paragraph
    {
      _type: 'block',
      _key: 'intro2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'intro2-span1',
          text: 'The numbers are sobering: ',
        },
        {
          _type: 'span',
          _key: 'intro2-span2',
          text: '42% of companies abandoned most of their AI initiatives',
          marks: ['link-sp'],
        },
        {
          _type: 'span',
          _key: 'intro2-span3',
          text: ' in 2025, up dramatically from just 17% in 2024. Meanwhile, ',
        },
        {
          _type: 'span',
          _key: 'intro2-span4',
          text: 'only 26% of organizations can successfully move beyond pilots',
          marks: ['link-bcg'],
        },
        {
          _type: 'span',
          _key: 'intro2-span5',
          text: ' to achieve AI at scale.',
        },
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'link-sp',
          href: 'https://www.secondtalent.com/resources/ai-adoption-in-enterprise-statistics/',
          blank: true,
        },
        {
          _type: 'link',
          _key: 'link-bcg',
          href: 'https://agility-at-scale.com/implementing/scaling-ai-projects/',
          blank: true,
        },
      ],
    },
    // H2: The Real Problem
    {
      _type: 'block',
      _key: 'h2-problem',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2-problem-span',
          text: "The Real Problem: It's Not the Model",
        },
      ],
    },
    // Problem paragraph 1
    {
      _type: 'block',
      _key: 'problem1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'problem1-span1',
          text: 'When GitHub first released Copilot research showing ',
        },
        {
          _type: 'span',
          _key: 'problem1-span2',
          text: 'developers complete tasks 55% faster',
          marks: ['link-github'],
        },
        {
          _type: 'span',
          _key: 'problem1-span3',
          text: ', enterprises rushed to purchase licenses. But here\'s what the procurement teams didn\'t anticipate: ',
        },
        {
          _type: 'span',
          _key: 'problem1-span4',
          text: 'less than half of purchased AI licenses see active use after several months',
          marks: ['link-gartner'],
        },
        {
          _type: 'span',
          _key: 'problem1-span5',
          text: ', according to Gartner.',
        },
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'link-github',
          href: 'https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/',
          blank: true,
        },
        {
          _type: 'link',
          _key: 'link-gartner',
          href: 'https://www.faros.ai/blog/enterprise-ai-coding-assistant-adoption-scaling-guide',
          blank: true,
        },
      ],
    },
    // Problem paragraph 2
    {
      _type: 'block',
      _key: 'problem2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'problem2-span1',
          text: 'This is the "pilot purgatory" phenomenon—organizations stuck in perpetual experimentation without ever achieving production-level results. They treat AI coding tools like traditional software purchases: buy licenses, deploy to developers, and wait for productivity gains to materialize.',
        },
      ],
    },
    // Problem paragraph 3
    {
      _type: 'block',
      _key: 'problem3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'problem3-span1',
          text: "But AI isn't software—",
        },
        {
          _type: 'span',
          _key: 'problem3-span2',
          text: "it's a workflow transformation",
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'problem3-span3',
          text: '.',
        },
      ],
    },
    // H2: Three Failure Patterns
    {
      _type: 'block',
      _key: 'h2-patterns',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2-patterns-span',
          text: 'Three Organizational Failure Patterns',
        },
      ],
    },
    // H3: Pattern 1
    {
      _type: 'block',
      _key: 'h3-pattern1',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3-pattern1-span',
          text: '1. Tool Selection Before Workflow Redesign',
        },
      ],
    },
    // Pattern 1 content
    {
      _type: 'block',
      _key: 'pattern1-content',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern1-span1',
          text: 'Most organizations start by evaluating AI coding assistants—comparing Copilot vs. Claude vs. Cursor vs. internal solutions. They create elaborate POC matrices, run benchmark tests, and eventually select a "winner."',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'pattern1-content2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern1-span2',
          text: 'Then they deploy the tool onto existing workflows and wonder why adoption stalls.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'pattern1-content3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern1-span3',
          text: "The successful approach inverts this: ",
        },
        {
          _type: 'span',
          _key: 'pattern1-span4',
          text: 'redesign workflows first, then select tools',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'pattern1-span5',
          text: ' that fit the new process. Where can AI compress cycle time? Which handoffs create friction? What review processes could be augmented rather than replaced?',
        },
      ],
    },
    // H3: Pattern 2
    {
      _type: 'block',
      _key: 'h3-pattern2',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3-pattern2-span',
          text: '2. Missing C-Suite Sponsorship',
        },
      ],
    },
    // Pattern 2 content
    {
      _type: 'block',
      _key: 'pattern2-content',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern2-span1',
          text: 'According to ',
        },
        {
          _type: 'span',
          _key: 'pattern2-span2',
          text: 'WorkOS research',
          marks: ['link-workos'],
        },
        {
          _type: 'span',
          _key: 'pattern2-span3',
          text: ', companies with dedicated C-suite AI ownership are ',
        },
        {
          _type: 'span',
          _key: 'pattern2-span4',
          text: '3x more likely to scale AI successfully',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'pattern2-span5',
          text: ". Yet most AI coding pilots are run by engineering managers without executive air cover. When the initiative needs budget increases, process changes across teams, or resolution of political conflicts—it dies.",
        },
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'link-workos',
          href: 'https://workos.com/blog/why-most-enterprise-ai-projects-fail-patterns-that-work',
          blank: true,
        },
      ],
    },
    // H3: Pattern 3
    {
      _type: 'block',
      _key: 'h3-pattern3',
      style: 'h3',
      children: [
        {
          _type: 'span',
          _key: 'h3-pattern3-span',
          text: '3. Treating It as an IT Project',
        },
      ],
    },
    // Pattern 3 content
    {
      _type: 'block',
      _key: 'pattern3-content',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern3-span1',
          text: 'AI coding assistants get categorized alongside IDE plugins and DevOps tools—IT deploys them, developers optionally use them. This misses the fundamental nature of the change.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'pattern3-content2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'pattern3-span2',
          text: 'An ',
        },
        {
          _type: 'span',
          _key: 'pattern3-span3',
          text: 'ISG report',
          marks: ['link-isg'],
        },
        {
          _type: 'span',
          _key: 'pattern3-span4',
          text: ' found that organizations with ',
        },
        {
          _type: 'span',
          _key: 'pattern3-span5',
          text: 'strong AI change management programs are 60% more likely to achieve positive ROI',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'pattern3-span6',
          text: '. AI coding tools require redefining what "done" means, how code review works, and how teams collaborate. That\'s a business transformation, not an IT deployment.',
        },
      ],
      markDefs: [
        {
          _type: 'link',
          _key: 'link-isg',
          href: 'https://isg-one.com/state-of-enterprise-ai-adoption-report-2025',
          blank: true,
        },
      ],
    },
    // H2: What Success Looks Like
    {
      _type: 'block',
      _key: 'h2-success',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2-success-span',
          text: 'What Successful Organizations Do Differently',
        },
      ],
    },
    // Success content
    {
      _type: 'block',
      _key: 'success-content1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'success-span1',
          text: 'The organizations in the successful 5% share common characteristics:',
        },
      ],
    },
    // Bullet list
    {
      _type: 'block',
      _key: 'bullet1',
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 'bullet1-span1',
          text: 'Empower line managers',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'bullet1-span2',
          text: ' to own AI adoption, not central AI labs. The people closest to the work understand where AI creates leverage.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bullet2',
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 'bullet2-span1',
          text: 'Measure outcomes, not adoption',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'bullet2-span2',
          text: '. License activation rates are vanity metrics. Track cycle time reduction, defect rates, and developer satisfaction.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bullet3',
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 'bullet3-span1',
          text: 'Budget for the transition period',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'bullet3-span2',
          text: '. Research suggests 11 weeks for productivity to normalize after AI tool introduction. Organizations expecting immediate ROI set themselves up for failure.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'bullet4',
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          _key: 'bullet4-span1',
          text: 'Start with clear business KPIs',
          marks: ['strong'],
        },
        {
          _type: 'span',
          _key: 'bullet4-span2',
          text: ', not technology goals. "Reduce time-to-production by 30%" beats "achieve 80% Copilot adoption."',
        },
      ],
    },
    // H2: Path Forward
    {
      _type: 'block',
      _key: 'h2-forward',
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: 'h2-forward-span',
          text: 'The Path Forward',
        },
      ],
    },
    // Forward content
    {
      _type: 'block',
      _key: 'forward-content1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'forward-span1',
          text: "If your organization is considering—or struggling with—an AI coding pilot, the question isn't which model to choose. It's whether you've laid the organizational groundwork for success.",
        },
      ],
    },
    {
      _type: 'block',
      _key: 'forward-content2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'forward-span2',
          text: 'That means:',
        },
      ],
    },
    // Numbered list
    {
      _type: 'block',
      _key: 'number1',
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          _key: 'number1-span1',
          text: 'Mapping current workflows before selecting tools',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'number2',
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          _key: 'number2-span1',
          text: 'Securing executive sponsorship with decision-making authority',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'number3',
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          _key: 'number3-span1',
          text: 'Building change management into the timeline and budget',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'number4',
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          _key: 'number4-span1',
          text: 'Defining success metrics tied to business outcomes',
        },
      ],
    },
    // CTA paragraph
    {
      _type: 'block',
      _key: 'cta-content',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'cta-span1',
          text: 'The 95% failure rate is not inevitable. It\'s the result of applying old playbooks to new technology. Organizations that recognize AI coding assistants as ',
        },
        {
          _type: 'span',
          _key: 'cta-span2',
          text: 'workflow transformations',
          marks: ['em'],
        },
        {
          _type: 'span',
          _key: 'cta-span3',
          text: ' rather than tool deployments are building sustainable competitive advantages—while their competitors remain stuck in pilot purgatory.',
        },
      ],
    },
  ],
  author: {
    _type: 'reference',
    _ref: 'author-innovoco-team',
  },
  category: 'ai-ml',
  tags: ['AI Strategy', 'Enterprise AI', 'Developer Productivity', 'Change Management', 'GitHub Copilot'],
  publishDate: new Date().toISOString(),
  status: 'published',
  readTimeMinutes: 8,
  metaDescription:
    'Discover why 95% of enterprise AI coding pilots fail and the three organizational patterns that separate successful implementations from expensive failures.',
  featured: true,
};

// ============================================
// Seed Function
// ============================================

async function seedContent() {
  console.log('Starting Sanity content seeding...');
  console.log('Project ID:', projectId);
  console.log('Dataset:', dataset);

  try {
    // Create author
    console.log('\nCreating author profile...');
    const author = await client.createOrReplace(authorDocument);
    console.log('✓ Author created:', author._id);

    // Create article
    console.log('\nCreating blog article...');
    const article = await client.createOrReplace(articleDocument);
    console.log('✓ Article created:', article._id);

    console.log('\n✅ Content seeding complete!');
    console.log('View in Sanity Studio: https://' + projectId + '.sanity.studio/');
    console.log('View on website: http://localhost:3000/blog/why-enterprise-ai-coding-pilots-fail');
  } catch (error) {
    console.error('\n❌ Error seeding content:', error);
    process.exit(1);
  }
}

// Run the seed function
seedContent();
