

I have enough context from the codebase exploration. Let me now produce the comprehensive PRD document. Since I cannot write files in read-only mode, I will deliver the full PRD directly in my response.

---

# Product Requirements Document: AI-Native Customer Intelligence Platform for Superior Propane

## Demo Prototype - Codename: "PropaneIQ"

---

## 1. Executive Summary

Superior Propane is Canada's largest propane supplier, serving residential, commercial, agricultural, and industrial customers nationwide. Despite having digital infrastructure (mySUPERIOR portal, SMART Tank wireless monitoring), their VP of Marketing faces persistent challenges: customer churn, seasonal demand volatility, commodity price sensitivity, low cross-sell rates, and high support costs. Customer acquisition costs are high (600L free propane switching incentive), yet retention remains weaker than acquisition.

This demo prototype showcases an AI-Native Customer Intelligence Platform purpose-built for Superior Propane. It transforms fragmented customer data into a unified intelligence layer that every employee can use to drive revenue, reduce churn, and increase customer lifetime value. The demo is designed for a boardroom presentation to the VP of Marketing, telling a narrative story from problem (a churning customer) through AI-driven insight to measurable outcome.

**Target KPIs the platform promises:**
- 15-25% measurable revenue growth through hyper-personalization
- 30-40% churn reduction through proactive retention
- 25-35% CLV increase through intelligent upsell/cross-sell
- Significant cost-to-serve optimization through AI-powered support
- Real-time customer intelligence accessible to every employee

---

## 2. Problem Statement

### 2.1 The VP of Marketing's Pain Points

**Fragmented Customer View.** Customer data lives in silos: mySUPERIOR app usage in one system, SMART Tank telemetry in another, delivery history in a third, billing in a fourth, support calls in a fifth. No single employee can see the full picture of a customer relationship.

**Reactive Churn Management.** By the time Superior Propane knows a customer is leaving, they have already called a competitor. There is no early warning system that combines behavioral signals (declining consumption, reduced app engagement, competitive price searches) into an actionable churn risk score.

**Untapped Cross-Sell Revenue.** Residential propane customers who heat their homes are also candidates for SMART Tank upgrades, auto-delivery enrollment, backup generators, and outdoor living equipment. Commercial accounts may benefit from fleet fueling or equipment rental. These opportunities are invisible without a product affinity model.

**Expensive Acquisition, Weak Retention.** The 600L free propane switching incentive represents a high customer acquisition cost. If the VP could shift even 20% of acquisition budget into retention, the ROI would be dramatically higher -- but they lack the intelligence to know which customers to target and with what offer.

**Seasonal Volatility.** Propane demand is highly seasonal (winter heating, fall grain drying, summer outdoor), creating revenue forecasting challenges and missed engagement windows.

### 2.2 What Success Looks Like

The VP of Marketing opens a dashboard and within 30 seconds understands:
- How many customers are at risk of churning this quarter and how much revenue that represents
- Which 10 actions would have the highest P&L impact this week
- Whether last month's retention campaign worked and by how much
- Which customers are primed for a SMART Tank upsell right now

---

## 3. Solution Overview

PropaneIQ is a six-page Next.js application that simulates a fully operational AI-native customer intelligence platform. It uses realistic mock data for ~50 Superior Propane customers across all segments, with pre-computed AI outputs (health scores, churn predictions, LTV models, next-best-actions) that demonstrate what a production system would deliver.

**Architecture Pattern:** The demo is a standalone Next.js 16 App Router application with dark-mode dashboard aesthetic, mock data seeded in TypeScript files, and AI SDK integration for the conversational intelligence agent. It is NOT embedded within the existing Innovoco marketing site -- it is a separate deployable prototype.

**Key Design Principle:** Every screen answers "so what?" in P&L terms. No vanity metrics. Every number connects to revenue, cost, or retention.

---

## 4. Feature Specifications

### 4.1 Dashboard Overview (Route: `/`)

**Purpose:** Command center for the VP of Marketing. At a glance: what matters today, what is at risk, what actions to take.

#### 4.1.1 KPI Cards Row (Top)

Four primary KPI cards following vertical layout hierarchy:

| Card | Primary Metric | Trend | Target/Benchmark |
|------|---------------|-------|-------------------|
| Active Customers | 12,847 | Up 2.3% vs last quarter | vs 13,500 target |
| Revenue at Risk | $2.4M | Up 18% (worsening) | vs $1.8M last quarter |
| Avg Customer Health | 72/100 | Down 3 pts | vs 78 industry avg |
| Cross-Sell Pipeline | $890K | Up 34% | vs $650K last quarter |

Implementation notes:
- Use the vertical stacking pattern from the CLAUDE.md KPI card design guidelines: Title -> Primary Value -> Trend/Change -> Target -> Sparkline
- Primary metric at 2.5-3x label size, sans-serif
- Inline trend display: "Up 18% vs $1.8M last quarter" (NOT badges)
- Semantic color on left card border (green for healthy, amber for warning, red for critical)
- Sparkline below each card showing 12-month trend
- Abbreviate large values with tooltip for full number

#### 4.1.2 Revenue Intelligence Panel

A two-column section below the KPI cards:

**Left column: Revenue at Risk Breakdown**
- Horizontal bar chart showing revenue at risk by segment (Residential: $1.1M, Commercial: $890K, Agricultural: $410K)
- Each bar clickable to filter the at-risk customer list
- Below: "Top 5 Accounts at Risk" table with customer name, LTV, churn probability, recommended action

**Right column: Upsell Pipeline**
- Stacked bar chart: SMART Tank upgrades ($340K), Auto-Delivery enrollment ($220K), Fixed-Rate locks ($180K), Equipment rental ($150K)
- Conversion probability overlay (e.g., 78% likely, 45% likely)
- "Total addressable revenue: $890K" header with confidence band

#### 4.1.3 Alerts & Actions Feed

A scrollable feed of AI-generated alerts, most urgent first:

```
[URGENT] 23 commercial accounts showing churn signals — consumption down >20% vs same period last year. Estimated revenue at risk: $1.2M. [View Accounts] [Launch Retention Campaign]

[ACTION] 156 residential customers are candidates for SMART Tank upgrade based on consumption patterns and tank age. Projected incremental revenue: $340K/year. [View Segment] [Create Campaign]

[INSIGHT] Fixed-rate plan customers show 42% lower churn than floating-rate customers. Consider targeted migration campaign for 890 floating-rate accounts. [View Analysis]
```

Each alert has: severity icon (color + shape per accessibility guidelines), timestamp, P&L impact number, and 1-2 action buttons.

#### 4.1.4 Seasonal Demand Forecast

Line chart with area fill showing:
- Projected demand by month (next 6 months) with confidence band
- Overlaid: same period last year (dashed line)
- Annotations for key engagement windows: "Pre-winter check-in window", "Grain drying season start", "Summer outdoor campaign"
- Segmented by: Residential heating, Commercial, Agricultural

---

### 4.2 Customer List (Route: `/customers`)

**Purpose:** Searchable, filterable list of all customers with segment views and bulk actions.

#### 4.2.1 Search & Filter Bar

- Full-text search (name, account number, address, company name)
- Filter chips: Segment (Residential, Commercial, Agricultural, Industrial), Health Score range, Churn Risk (Low/Medium/High/Critical), Province, Product holdings, Engagement level
- Sort by: Health Score, LTV, Churn Risk, Last Activity, Name
- Saved filter presets: "At-Risk High-Value", "SMART Tank Upsell Candidates", "Inactive 60+ Days"

#### 4.2.2 Customer Table

Columns:
- Customer name (with avatar/icon for segment type: house, building, tractor, factory)
- Segment badge
- Health Score (color-coded circular indicator: green 70+, amber 40-69, red <40)
- Churn Risk (Low/Medium/High/Critical with color + icon)
- LTV (formatted as currency, abbreviated with tooltip)
- Last Activity (relative time: "3 days ago", "2 weeks ago")
- Next Best Action (truncated with tooltip, e.g., "Offer SMART Tank upgrade")
- Quick actions: View, Email, Flag

Pagination: 20 per page with total count.

#### 4.2.3 Segment Summary Cards

Above the table, collapsible segment summary:
- 4 cards (Residential, Commercial, Agricultural, Industrial)
- Each shows: count, avg health, avg LTV, total revenue at risk
- Clicking a card filters the table to that segment

---

### 4.3 Customer 360 Page (Route: `/customers/[id]`) -- THE CROWN JEWEL

**Purpose:** Everything known about a single customer, unified into a golden record with AI-powered insights and actions.

#### 4.3.1 Customer Header

Full-width header section:
- Customer name (large), account number, segment badge
- Address with province flag
- Customer since date, tenure in years
- Account status (Active, At Risk, Churned)
- Primary contact info (phone, email)
- Quick action buttons: [Compose Email] [Log Interaction] [Create Offer]

#### 4.3.2 Health Score Card (Prominent, left position)

Large circular gauge (0-100) with:
- Composite score prominently displayed
- Breakdown bars below:
  - Engagement: 78/100 (app logins, email opens, website visits)
  - Payment Behavior: 85/100 (on-time payments, balance trends)
  - Consumption Trend: 45/100 (declining vs seasonal norm)
  - Support Sentiment: 62/100 (recent call sentiment, complaint history)
- Trend arrow: "Down 12 pts in 90 days"
- Color: Overall score determines the gauge color (green/amber/red)

#### 4.3.3 Churn Risk Panel

Horizontal card adjacent to health score:
- Churn probability: "67% likely to churn in next 90 days" (large text)
- Confidence: "High confidence (based on 8 signals)"
- Top churn drivers (ranked):
  1. "Consumption dropped 30% vs same period last year"
  2. "Searched competitor pricing 3 times this month (website behavior)"
  3. "Missed last scheduled delivery (first time in 4 years)"
  4. "Support call sentiment: negative (billing dispute unresolved)"
- Recommended intervention with predicted impact: "Offer 10% loyalty discount + priority delivery scheduling — predicted to reduce churn probability to 28%"

#### 4.3.4 LTV Prediction

Card showing:
- Current LTV: $18,400 (with breakdown: propane revenue $14,200, equipment rental $2,800, service premium $1,400)
- Predicted 3-year LTV: $22,600 (if retained) vs $0 (if churned)
- LTV trajectory chart (mini line chart, 24 months historical + 12 months projected)
- Confidence band on projection
- "Revenue at risk: $22,600" callout if churn risk is high

#### 4.3.5 Identity Graph

Visual network diagram showing how fragmented records were resolved:
- Central node: unified customer profile
- Connected nodes: mySUPERIOR account, SMART Tank device ID, billing account, support ticket history, website cookie, email address(es), phone number(s)
- Lines showing which systems contributed which data points
- "7 data sources unified into 1 golden record" label
- Implementation: Simple SVG/canvas node-link diagram or a Recharts-compatible network visualization

#### 4.3.6 Segment Membership

Tags/pills showing all segments this customer belongs to:
- Primary: "High-Value Residential"
- Behavioral: "Winter-Peak Consumer", "App Power User", "Price-Sensitive"
- Lifecycle: "At-Risk Loyal" (>3 years tenure, declining engagement)
- Opportunity: "SMART Tank Upgrade Candidate", "Fixed-Rate Migration Target"

#### 4.3.7 Next-Best-Action Panel

Ranked list (most impactful first), each item showing:

```
1. [HIGH IMPACT] Offer SMART Tank upgrade
   Predicted conversion: 78% | Revenue impact: +$2,800/year | ROI: 2.3x over 12 months
   Reasoning: High consumption volume, aging manual tank, frequent delivery scheduling via app
   [Send Offer Email] [Schedule Call] [Dismiss]

2. [MEDIUM IMPACT] Recommend fixed-rate lock
   Predicted conversion: 62% | Revenue impact: stabilizes $14,200/year revenue
   Reasoning: Customer searched competitor pricing 3x, currently on floating rate
   [Send Pricing Comparison] [Dismiss]

3. [RETENTION] Schedule pre-winter tank inspection
   Predicted impact: reduces emergency call probability by 40%
   Reasoning: Tank age >5 years, no inspection in 18 months, high-consumption winter customer
   [Schedule Inspection] [Dismiss]

4. [GROWTH] Send referral incentive
   Predicted conversion: 45% | Revenue impact: +$8,200 (avg new customer LTV)
   Reasoning: NPS score 9, connected to 4 potential customers in neighborhood
   [Send Referral Offer] [Dismiss]
```

#### 4.3.8 AI Email Composer (Slide-over Panel)

Triggered by any "Send Email" or "Compose Email" action. Opens as a right-side slide-over panel (Dialog/Sheet component):

**Pre-populated context:**
- To: customer email
- From: assigned account manager
- Template selector: Retention Offer, Upsell Recommendation, Seasonal Check-In, Payment Reminder, Referral Ask
- Tone selector: Formal, Friendly, Urgent (radio pills)

**AI-generated content:**
- Subject line (AI-generated based on template + customer context)
- Body (personalized with: customer name, specific product recommendation, relevant usage data, seasonal context, specific offer terms)
- Example for a retention offer to the at-risk customer above:

```
Subject: Margaret, we want to make sure you're set for winter

Hi Margaret,

I noticed your last propane delivery was a bit later than usual, and I wanted to personally 
reach out to make sure everything is running smoothly with your heating system.

You've been a valued Superior Propane customer for 4 years, and I want to ensure you're 
getting the best experience possible. As a thank you for your loyalty, I'd like to offer you:

- Priority delivery scheduling for the upcoming winter season
- A complimentary tank inspection (valued at $149)  
- 10% off your next two deliveries

Your SMART Tank data shows your current level at 42%, so you're well-stocked for now. 
We'll keep monitoring and ensure you never run low.

Would you like me to schedule that inspection? Just reply to this email or call me directly.

Warm regards,
Sarah Chen
Your Account Manager, Superior Propane
```

**Controls:**
- [Regenerate] button to get alternative versions
- Editable text area (the user can modify the AI draft)
- [Send Now] [Schedule Send] [Save Draft] buttons
- Character count and reading level indicator

#### 4.3.9 Engagement Timeline

Vertical timeline (most recent first) showing every customer interaction:

```
Mar 22, 2026 — [DELIVERY] 800L propane delivered. Tank at 85%. Auto-delivery.
Mar 18, 2026 — [APP] Logged into mySUPERIOR. Viewed billing page. 2 min session.
Mar 15, 2026 — [WEBSITE] Visited competitor comparison page. 4 min session.
Mar 12, 2026 — [EMAIL] Opened "Spring maintenance" campaign email. Did not click CTA.
Mar 8, 2026  — [SUPPORT] Called about billing discrepancy. Sentiment: Negative. Resolved: Partial.
Feb 28, 2026 — [SMART TANK] Alert sent: tank below 25%. Customer did not respond.
Feb 15, 2026 — [DELIVERY] 600L propane delivered. Delayed 3 days from schedule.
```

Each entry has:
- Icon for channel type (truck, phone, mail, globe, gauge)
- Timestamp
- Brief description
- Sentiment indicator where applicable
- Expandable detail on click

#### 4.3.10 Consumption Analytics

**Consumption chart:** Area chart showing monthly propane consumption (litres) for 24 months. Overlaid with:
- Same period previous year (dashed line)
- Seasonal norm for segment/region (light shaded area)
- Annotations for anomalies: "30% below seasonal norm" highlighted in red

**Channel preference:** Small donut chart showing interaction distribution: App 45%, Email 30%, Phone 20%, SMS 5%

**Campaign response history:** Mini table: campaign name, date, channel, opened (y/n), clicked (y/n), converted (y/n)

---

### 4.4 Campaigns (Route: `/campaigns`)

**Purpose:** Build, launch, and measure AI-powered campaigns targeting specific customer segments.

#### 4.4.1 Campaign List View (Default)

Table of existing campaigns:
- Campaign name
- Status: Draft, Scheduled, Active, Completed
- Segment targeted
- Channel (Email, SMS, Multi-channel)
- Sent / Opened / Clicked / Converted counts
- Revenue impact (actual or projected)
- Created date

Pre-seeded with 5-6 demo campaigns:
1. "Winter Readiness 2026" (Completed) - Residential, Email, 2,400 sent, 18% converted, $124K revenue
2. "SMART Tank Upgrade Q1" (Active) - High-consumption residential, Email+SMS, 450 sent, 12% converted so far
3. "Commercial Retention" (Active) - At-risk commercial accounts, Email, 89 sent, targeting $890K at-risk revenue
4. "Grain Drying Season Prep" (Scheduled) - Agricultural, Email, 340 recipients, projected $67K
5. "Referral Spring Push" (Draft) - High-NPS customers, Email, 680 candidates

#### 4.4.2 Campaign Builder (New Campaign Flow)

Step 1: **Segment Selection**
- Visual segment builder with AND/OR logic
- Pre-built segments: "At-Risk Residential", "SMART Tank Candidates", "High-NPS Referral Pool", "Inactive 60+ Days"
- Custom segment: pick from filters (churn risk, health score, tenure, consumption level, province, product holdings)
- Live count: "347 customers match this segment"
- Revenue context: "Total LTV of this segment: $4.2M"

Step 2: **Content Creation**
- Template selection (same templates as email composer)
- AI generates subject line + body personalized per-recipient
- Preview with 3 sample recipients showing how personalization varies
- A/B test toggle: create variant B with different subject line or offer
- Hold-out group toggle: "Reserve 10% as control group for measurement"

Step 3: **Scheduling & Prediction**
- Send immediately or schedule date/time
- AI prediction panel:
  - Predicted open rate: 34% (vs 28% industry avg)
  - Predicted conversion rate: 12% (vs 8% for similar past campaigns)
  - Projected revenue impact: $67,400
  - Confidence level: Medium (based on segment size and historical data)
- Channel selection: Email, SMS, or both

Step 4: **Review & Launch**
- Summary card with all settings
- [Launch Campaign] button

#### 4.4.3 Campaign Performance Dashboard

For completed/active campaigns:
- Real-time metrics: Sent, Delivered, Opened, Clicked, Converted
- Funnel visualization (horizontal funnel chart)
- Revenue attribution: "This campaign generated $124K in incremental revenue"
- A/B test results (if applicable): "Variant A outperformed by 23% on conversion"
- Control group comparison: "Campaign group converted at 12% vs 3% for control — 4x lift"
- Time-series chart: daily conversions since launch

---

### 4.5 AI Intelligence Agent (Route: `/intelligence`)

**Purpose:** Conversational AI agent (text + voice) that answers any question about the customer base using natural language.

#### 4.5.1 Chat Interface

Full-page chat interface with:
- Message history (left-aligned AI responses, right-aligned user messages)
- Text input bar at bottom with send button
- Voice button (microphone icon) next to text input
- Suggested queries as clickable pills above the input:
  - "What's the churn risk for our top 50 commercial accounts?"
  - "Which residential customers in Ontario haven't ordered in 60 days?"
  - "What's our projected Q1 revenue if we reduce churn by 15%?"
  - "Show me SMART Tank upgrade candidates with highest conversion probability"

#### 4.5.2 AI Response Types

The agent responds with rich content blocks:

**Data Tables:** When asked about lists of customers, the AI returns a formatted table within the chat (using the shadcn Table component styled for dark mode).

**Inline Charts:** When asked about trends or distributions, the AI returns an embedded Recharts chart within the chat message. For example: "Show me churn trend by quarter" returns a bar chart inline.

**Action Cards:** When the AI recommends an action, it returns a card with: recommendation text, predicted impact, and action buttons ([Create Campaign], [View Customers], [Export List]).

**Summary Cards:** For aggregate queries ("What's our projected Q1 revenue..."), a KPI-style summary card is embedded in the response.

#### 4.5.3 Voice Integration (ElevenLabs)

- Microphone button activates voice input
- Visual indicator: animated orb/waveform during listening (reference: existing SiriOrb component pattern in the Innovoco codebase at `/components/ui/siri-orb.tsx`)
- Speech-to-text processes the query
- AI responds in text AND voice (ElevenLabs text-to-speech)
- Voice output uses a professional, warm voice
- Toggle to enable/disable voice responses
- Implementation: ElevenLabs streaming TTS API, triggered after text response is generated

#### 4.5.4 Pre-Built Demo Queries (for the boardroom presentation)

These queries must produce polished, demo-ready responses:

1. **"What's the churn risk for our top 50 commercial accounts?"**
   Response: Table of 10 highest-risk accounts with name, churn probability, revenue at risk, top churn signal, recommended action. Summary: "12 of your top 50 commercial accounts are at high risk, representing $1.8M in annual revenue."

2. **"Which residential customers in Ontario haven't ordered propane in 60 days?"**
   Response: "I found 47 residential customers in Ontario with no delivery in 60+ days. 23 of these are flagged as at-risk based on their consumption patterns deviating from seasonal norms. Here's the breakdown..." with a table and a mini bar chart by region.

3. **"Generate a retention campaign for at-risk customers who've been with us over 3 years"**
   Response: "I've identified 156 at-risk customers with 3+ years tenure. Here's a recommended campaign..." with campaign configuration card, AI-drafted email preview, and predicted performance metrics.

4. **"What's our projected Q1 revenue if we reduce churn by 15%?"**
   Response: Summary card showing: "Current Q1 projection: $34.2M. With 15% churn reduction: $38.1M (+$3.9M). Breakdown by segment..." with stacked bar chart comparing scenarios.

5. **"Tell me about Margaret Chen's account"**
   Response: Customer summary card with key metrics, health score, churn risk, recent activity, and recommended actions. Link to full Customer 360 page.

---

### 4.6 Aggregate Insights (Route: `/insights`)

**Purpose:** Portfolio-level analytics showing trends, distributions, and segment performance.

#### 4.6.1 Churn Analytics

- **Churn trend chart:** Monthly churn rate over 24 months (line chart with area fill)
- **Churn by segment:** Grouped bar chart (Residential, Commercial, Agricultural, Industrial) showing current quarter vs previous quarter
- **Churn drivers breakdown:** Horizontal bar chart ranking top churn signals across the portfolio (price sensitivity, service issues, consumption decline, competitor activity, billing disputes)
- **Cohort retention:** Heatmap showing retention rate by acquisition cohort and month

#### 4.6.2 LTV Distribution

- **Histogram:** Customer count by LTV bucket ($0-$5K, $5K-$15K, $15K-$30K, $30K-$50K, $50K+)
- **Segment comparison:** Box plot or grouped bar comparing avg LTV across segments
- **LTV growth/decline:** Scatter plot with customer count on x-axis, LTV change on y-axis, bubble size = revenue

#### 4.6.3 Segment Performance Dashboard

Four segment cards (expandable), each showing:
- Customer count and trend
- Avg health score and trend
- Total revenue and growth rate
- Churn rate
- Top opportunity (e.g., "SMART Tank penetration: 23% — 340 upgrade candidates")
- Top risk (e.g., "12 accounts dropped below 40 health score this month")

#### 4.6.4 Product Penetration Matrix

Heatmap/matrix showing which products each segment holds vs. could hold:
- Rows: customer segments
- Columns: products (Auto-Delivery, SMART Tank, Fixed-Rate, Equipment Rental, Budget Payment Plan)
- Cell value: current penetration % with color intensity
- Hover: shows number of candidates and estimated revenue if penetration increased by 10%

---

## 5. Technical Architecture

### 5.1 Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | Standalone project, NOT embedded in existing Innovoco site |
| Styling | Tailwind CSS v4 + shadcn/ui (new-york style, zinc base) | Dark mode by default for dashboard aesthetic |
| UI Components | shadcn/ui (Card, Table, Dialog, Tabs, ScrollArea, Select, Badge, Button, Tooltip, Progress, Separator, Dropdown) | Install all needed components via `npx shadcn@latest add` |
| Charts | Recharts v3 | Already a dependency in reference project; use for all data visualizations |
| Animations | Framer Motion | For page transitions, panel slides, chart animations |
| AI SDK | Vercel AI SDK v5 (`ai` package) | For the conversational intelligence agent streaming responses |
| Voice TTS | ElevenLabs API | Text-to-speech for the AI agent voice mode |
| Voice STT | Web Speech API (browser native) | Speech-to-text for voice input |
| Icons | Lucide React | Consistent with existing Innovoco codebase |
| Font | Inter (Google Fonts) | Consistent with existing Innovoco codebase |
| Package Manager | pnpm | Consistent with existing Innovoco codebase |
| Deployment | Vercel | Standard deployment target |

### 5.2 Project Structure

```
superior-propane-demo/
├── app/
│   ├── layout.tsx                    # Root layout with sidebar navigation, dark mode
│   ├── globals.css                   # Theme variables (dark-first), Tailwind v4 import
│   ├── page.tsx                      # Dashboard overview (/)
│   ├── customers/
│   │   ├── page.tsx                  # Customer list (/customers)
│   │   └── [id]/
│   │       └── page.tsx              # Customer 360 (/customers/[id])
│   ├── campaigns/
│   │   ├── page.tsx                  # Campaign list + builder (/campaigns)
│   │   └── [id]/
│   │       └── page.tsx              # Campaign detail/performance (/campaigns/[id])
│   ├── intelligence/
│   │   └── page.tsx                  # AI agent chat (/intelligence)
│   ├── insights/
│   │   └── page.tsx                  # Aggregate analytics (/insights)
│   └── api/
│       ├── chat/
│       │   └── route.ts             # AI chat endpoint (Vercel AI SDK)
│       └── tts/
│           └── route.ts             # ElevenLabs TTS proxy endpoint
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── dashboard/
│   │   ├── kpi-card.tsx             # Reusable KPI card (vertical layout)
│   │   ├── alert-feed.tsx           # AI alerts feed
│   │   ├── revenue-at-risk.tsx      # Revenue at risk panel
│   │   ├── upsell-pipeline.tsx      # Upsell pipeline chart
│   │   └── seasonal-forecast.tsx    # Seasonal demand forecast
│   ├── customers/
│   │   ├── customer-table.tsx       # Customer list table
│   │   ├── customer-filters.tsx     # Search and filter bar
│   │   ├── segment-cards.tsx        # Segment summary cards
│   │   ├── health-score-gauge.tsx   # Circular health score gauge
│   │   ├── churn-risk-panel.tsx     # Churn risk display
│   │   ├── ltv-card.tsx             # LTV prediction card
│   │   ├── identity-graph.tsx       # Visual identity resolution graph
│   │   ├── next-best-action.tsx     # NBA recommendation panel
│   │   ├── engagement-timeline.tsx  # Customer interaction timeline
│   │   ├── consumption-chart.tsx    # Consumption analytics
│   │   └── email-composer.tsx       # AI email composer slide-over
│   ├── campaigns/
│   │   ├── campaign-table.tsx       # Campaign list
│   │   ├── campaign-builder.tsx     # Multi-step campaign builder
│   │   ├── campaign-preview.tsx     # Email/SMS preview
│   │   └── campaign-performance.tsx # Performance dashboard
│   ├── intelligence/
│   │   ├── chat-interface.tsx       # Chat UI with message list
│   │   ├── chat-message.tsx         # Individual message (supports rich content)
│   │   ├── voice-controls.tsx       # Mic button + voice orb
│   │   └── suggested-queries.tsx    # Query suggestion pills
│   └── insights/
│       ├── churn-analytics.tsx      # Churn trend charts
│       ├── ltv-distribution.tsx     # LTV histogram + comparisons
│       ├── segment-performance.tsx  # Segment dashboard cards
│       └── product-matrix.tsx       # Product penetration heatmap
├── lib/
│   ├── data/
│   │   ├── customers.ts            # Mock customer data (~50 records)
│   │   ├── deliveries.ts           # Delivery history data
│   │   ├── interactions.ts         # Support calls, app logins, emails
│   │   ├── smart-tank.ts           # SMART Tank telemetry data
│   │   ├── campaigns.ts            # Mock campaign data
│   │   ├── segments.ts             # Segment definitions
│   │   └── seed.ts                 # Data generation helpers
│   ├── ai/
│   │   ├── system-prompt.ts        # System prompt for the intelligence agent
│   │   └── tools.ts                # AI SDK tool definitions for the agent
│   ├── utils.ts                    # cn() utility, formatters
│   └── types.ts                    # TypeScript interfaces for all data models
├── hooks/
│   ├── use-customers.ts            # Customer data access hook
│   ├── use-voice.ts                # Voice input/output hook
│   └── use-filters.ts              # Filter state management
├── public/
│   └── images/
│       └── superior-propane-logo.svg  # Superior Propane branding element
├── next.config.ts
├── tailwind.config.ts
├── components.json                  # shadcn/ui config
├── tsconfig.json
└── package.json
```

### 5.3 API Routes

**`/api/chat` (POST)**
- Uses Vercel AI SDK `streamText()` for streaming responses
- System prompt loaded from `lib/ai/system-prompt.ts`
- Has access to mock customer data via tool calls
- Tools defined: `searchCustomers`, `getCustomerDetail`, `getSegmentAnalytics`, `getChurnForecast`, `generateCampaignDraft`
- Returns streaming text response with embedded structured content (tables, charts, action cards)

**`/api/tts` (POST)**
- Proxies text to ElevenLabs API
- Accepts: `{ text: string, voice_id?: string }`
- Returns: audio stream
- Uses ElevenLabs streaming API for low-latency voice output

### 5.4 Environment Variables

```
# AI Configuration
OPENAI_API_KEY=             # For AI SDK chat completions (or use Azure)
AZURE_OPENAI_ENDPOINT=      # Alternative: Azure OpenAI
AZURE_OPENAI_KEY=
AZURE_OPENAI_DEPLOYMENT=

# Voice
ELEVENLABS_API_KEY=         # ElevenLabs TTS
ELEVENLABS_VOICE_ID=        # Specific voice to use

# App
NEXT_PUBLIC_APP_URL=        # For CORS/redirects
```

Manage via `vercel env` for deployment. Never hardcode secrets.

---

## 6. Data Model

### 6.1 Core Types

```typescript
// lib/types.ts

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string; // Canadian provinces
    postalCode: string;
  };
  segment: 'residential' | 'commercial' | 'agricultural' | 'industrial';
  subSegment: string; // e.g., "home-heating", "restaurant", "grain-drying"
  accountNumber: string;
  customerSince: string; // ISO date
  status: 'active' | 'at-risk' | 'churned';
  
  // Products & Services
  products: ProductHolding[];
  pricingPlan: 'fixed' | 'floating';
  hasSmartTank: boolean;
  hasAutoDelivery: boolean;
  hasBudgetPlan: boolean;
  
  // AI-Computed Scores
  healthScore: HealthScore;
  churnRisk: ChurnRisk;
  ltv: LTVPrediction;
  segments: string[]; // behavioral/lifecycle segment tags
  
  // Engagement
  channelPreference: ChannelPreference;
  npsScore: number | null;
  lastActivity: string; // ISO date
  
  // For the identity graph
  dataSources: DataSource[];
}

interface HealthScore {
  overall: number; // 0-100
  engagement: number;
  paymentBehavior: number;
  consumptionTrend: number;
  supportSentiment: number;
  trend: 'rising' | 'stable' | 'falling';
  changeFromLastQuarter: number;
}

interface ChurnRisk {
  probability: number; // 0-1
  level: 'low' | 'medium' | 'high' | 'critical';
  confidence: 'low' | 'medium' | 'high';
  topDrivers: ChurnDriver[];
  recommendedIntervention: {
    action: string;
    predictedImpact: string; // e.g., "reduces churn probability to 28%"
    estimatedCost: number;
    estimatedRevenueSaved: number;
  };
}

interface ChurnDriver {
  signal: string;
  severity: 'low' | 'medium' | 'high';
  detail: string;
}

interface LTVPrediction {
  currentLTV: number;
  breakdown: {
    propaneRevenue: number;
    equipmentFees: number;
    servicePremium: number;
  };
  predictedLTV3Year: number;
  confidenceBand: { low: number; high: number };
  trajectory: { month: string; value: number }[];
}

interface NextBestAction {
  id: string;
  customerId: string;
  type: 'upsell' | 'retention' | 'cross-sell' | 'growth' | 'service';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  predictedConversion: number; // 0-1
  revenueImpact: number;
  roi: number | null;
  reasoning: string;
  actions: { label: string; type: 'email' | 'call' | 'schedule' | 'campaign' }[];
}

interface Interaction {
  id: string;
  customerId: string;
  type: 'delivery' | 'support_call' | 'app_login' | 'email' | 'website_visit' | 'smart_tank_alert' | 'sms';
  date: string;
  description: string;
  detail?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  resolved?: boolean;
}

interface Delivery {
  id: string;
  customerId: string;
  date: string;
  litres: number;
  tankLevelAfter: number; // percentage
  type: 'auto' | 'scheduled' | 'emergency';
  onTime: boolean;
}

interface SmartTankReading {
  customerId: string;
  timestamp: string;
  level: number; // percentage
  temperature: number;
  alertSent: boolean;
  alertType?: 'low_level' | 'rapid_decline' | 'anomaly';
}

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  segment: string;
  channel: 'email' | 'sms' | 'multi';
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
  recipientCount: number;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
  };
  prediction?: {
    predictedOpenRate: number;
    predictedConversionRate: number;
    projectedRevenue: number;
    confidence: 'low' | 'medium' | 'high';
  };
  template: string;
  abTest?: {
    variantA: string;
    variantB: string;
    winnerMetric: 'open_rate' | 'conversion';
  };
}

interface DataSource {
  system: string; // "mySUPERIOR", "SMART Tank", "Billing", "Support", "Website", "Email"
  recordId: string;
  lastSync: string;
  fieldsContributed: string[];
}

interface ChannelPreference {
  email: number;   // percentage of interactions
  app: number;
  phone: number;
  sms: number;
}

interface ProductHolding {
  product: string; // "propane-delivery", "smart-tank", "auto-delivery", "equipment-rental", "budget-plan"
  startDate: string;
  monthlyRevenue: number;
  status: 'active' | 'cancelled' | 'pending';
}
```

### 6.2 Mock Data Requirements

Create ~50 realistic customers distributed as follows:

**Residential (25 customers):**
- 10 healthy, loyal customers (high health, low churn, various provinces)
- 5 at-risk customers with clear churn signals
- 3 high-value power users (SMART Tank, auto-delivery, high consumption)
- 4 price-sensitive customers (floating rate, competitor search signals)
- 3 new customers (<1 year, still being onboarded)

**Commercial (12 customers):**
- 4 restaurants (high winter consumption, seasonal outdoor patio)
- 3 office buildings (steady consumption, multi-year contracts)
- 3 multi-location chains (high LTV, complex accounts)
- 2 at-risk commercial accounts with declining consumption

**Agricultural (10 customers):**
- 5 grain drying operations (highly seasonal: Sept-Nov spike)
- 3 livestock/farm heating (winter-heavy)
- 2 mixed-use farm operations

**Industrial (3 customers):**
- 1 construction site (temporary, high-volume)
- 1 mining operation (remote location, premium delivery)
- 1 manufacturing plant (consistent year-round)

**Each customer must have:**
- 12-24 months of delivery history (monthly records)
- 6-12 interaction records (support calls, app logins, emails)
- SMART Tank readings (if applicable) at weekly intervals for 3 months
- Realistic consumption patterns reflecting Canadian seasonality (winter peaks, summer lows for heating; fall peaks for grain drying)
- Internally consistent data (churn signals should align with health scores; LTV should reflect actual delivery history)

**Named showcase customers for the demo script:**
1. **Margaret Chen** (Residential, Ontario) - The "about to churn" story. 4-year customer, consumption declining, searched competitor pricing, billing dispute. Health: 38. Churn: 67%.
2. **Blackstone Restaurant Group** (Commercial, Alberta) - Multi-location, high-value. Candidate for SMART Tank upgrade across 4 locations. Health: 82. LTV: $94,000.
3. **Prairie Harvest Farms** (Agricultural, Saskatchewan) - Seasonal grain drying. Last fall's consumption was 40% higher than usual (expanded operations). Upsell: larger tank + auto-delivery. Health: 71.
4. **James and Patricia Wheeler** (Residential, BC) - Perfect referral candidates. NPS: 9, 6-year tenure, connected to neighbors who use oil heating. Health: 91.
5. **Northern Shield Mining** (Industrial, NWT) - Highest individual LTV at $156,000/year. Remote delivery premium. Contract renewal in 90 days. Health: 65 (contract uncertainty).

---

## 7. UX/UI Guidelines

### 7.1 Visual Design System

**Color Palette (Dark Mode Default):**
- Background: zinc-950 (`#09090b`)
- Card/Surface: zinc-900 (`#18181b`)
- Elevated Surface: zinc-800 (`#27272a`)
- Border: zinc-700 (`#3f3f46`) at 50% opacity
- Text Primary: zinc-100 (`#f4f4f5`)
- Text Secondary: zinc-400 (`#a1a1aa`)
- Text Muted: zinc-500 (`#71717a`)

**Accent Color:** A single accent -- sky-500 (`#0ea5e9`) -- consistent with the Innovoco reference project's primary color. Use sparingly for: active states, important metrics, CTAs, chart highlights.

**Status Colors (always paired with shape for accessibility):**
- Success/Positive: emerald-500 (`#10b981`) + upward arrow
- Warning/Caution: amber-500 (`#f59e0b`) + dash/horizontal arrow
- Error/Critical: red-500 (`#ef4444`) + downward arrow
- Info: blue-500 (`#3b82f6`) + info icon

### 7.2 Typography

- Font: Inter (variable weight)
- KPI primary values: text-3xl to text-4xl, font-bold
- Section headings: text-xl, font-semibold
- Card titles: text-sm, font-medium, text-zinc-400 (uppercase tracking)
- Body text: text-sm, text-zinc-300
- Data labels: text-xs, text-zinc-500

### 7.3 Layout Principles

- **Sidebar navigation** (collapsible, following the existing Innovoco dashboard layout pattern from `app/dashboard/layout.tsx`)
- **Desktop-first** (minimum viewport: 1280px for optimal presentation)
- **Card-based layout** using CSS Grid: 4-column for KPI row, 2-column for content panels, full-width for tables and charts
- **Consistent padding:** p-6 on page containers, p-4 on cards, gap-4 between cards, gap-6 between sections
- **Backdrop blur** on sidebar and elevated panels: `bg-card/50 backdrop-blur`
- **Subtle borders:** `border-border/50` (half opacity for refinement)

### 7.4 Component Patterns

- **KPI Cards:** Use vertical stacking (title -> value -> trend -> sparkline). Left border color for status. Card component from shadcn.
- **Tables:** shadcn Table with hover rows, sticky header. Zebra striping optional. Row click navigates to detail.
- **Charts:** Dark theme Recharts with zinc-800 grid lines, sky-500 primary series, emerald-500/red-500 for positive/negative. Tooltips with dark background.
- **Slide-over Panels:** Use shadcn Dialog/Sheet for email composer and detail panels. Slide from right.
- **Action Buttons:** Primary actions in sky-500 fill. Secondary in ghost variant. Destructive in red.
- **Loading States:** Skeleton loaders matching card shapes. Animate with pulse.
- **Empty States:** Illustration + message + CTA button.

### 7.5 Branding Context

This demo is branded for **Innovoco presenting to Superior Propane**, not as if Superior Propane built it. The platform chrome (sidebar, header) uses Innovoco styling. The content and data are Superior Propane-specific. Include "Powered by Innovoco" or similar in the sidebar footer.

Optionally, include a Superior Propane logo mark in the dashboard header area to show this is "their" instance, but the platform brand is Innovoco.

---

## 8. Demo Flow Script

This is the narrative for the boardroom presentation. Each step maps to a specific page and interaction.

### Act 1: "The Problem" (2 minutes)

**Open the Dashboard (`/`)**

"Let me show you what your customer data looks like when it's unified and intelligent."

Point to the KPI cards:
- "You have 12,847 active customers, but $2.4 million in revenue is at risk right now from customers showing churn signals. That's 18% more than last quarter."
- "Your average customer health score has dropped 3 points. That's a leading indicator -- it precedes actual churn by 60-90 days."

Point to the alerts feed:
- "The system has already identified 23 commercial accounts showing churn signals. It's not waiting for them to leave -- it's telling you now."

### Act 2: "Meet Margaret" (5 minutes)

**Navigate to Customers (`/customers`), filter by "At-Risk", click Margaret Chen**

"Let me show you a specific customer. Margaret Chen. She's been with you for 4 years. She's a residential customer in Ontario."

**On the Customer 360 page (`/customers/margaret-chen`):**

Point to health score:
- "Her health score is 38 out of 100 and falling. Three months ago she was at 72. Something changed."

Point to churn risk panel:
- "The system says she has a 67% chance of churning in the next 90 days. Here's why..."
- Walk through the churn drivers: consumption drop, competitor searches, missed delivery, unresolved billing dispute.

Point to the engagement timeline:
- "Look at the timeline. March 15th she visited your competitor comparison page. March 8th she called about a billing issue that wasn't fully resolved. These are warning signs that no one would connect without AI."

Point to next-best-actions:
- "But the system doesn't just diagnose -- it prescribes. It recommends a loyalty discount plus priority delivery, and predicts that would reduce her churn probability from 67% to 28%."

### Act 3: "The AI in Action" (3 minutes)

**Click "Compose Email" to open the email composer**

- "Watch this. One click and the system drafts a personalized retention email for Margaret, using everything it knows about her."
- Show the AI-generated email. Point out the personalization: her name, 4-year tenure, specific offer, tank level from SMART Tank data.
- "Sarah, her account manager, can review, edit, and send this in under 30 seconds. No template hunting, no data lookup, no guessing."

### Act 4: "Scale This Across the Business" (3 minutes)

**Navigate to Campaigns (`/campaigns`)**

- "Margaret is one customer. But there are 156 at-risk customers with 3+ years tenure. Let me show you how to reach all of them."
- Open the "Commercial Retention" campaign to show performance: "This campaign targeting 89 at-risk commercial accounts is already showing 12% conversion, protecting $890K in revenue."
- Briefly show the campaign builder: "The AI generates personalized content for each recipient, predicts performance, and sets up A/B tests automatically."

### Act 5: "Ask Anything" (3 minutes)

**Navigate to Intelligence (`/intelligence`)**

- "But the real power is this. You can ask the system anything, in plain English."
- Type or speak: "What's our projected Q1 revenue if we reduce churn by 15%?"
- Show the response: "$38.1M, up from $34.2M -- that's $3.9M in incremental revenue."
- Ask: "Which residential customers in Ontario haven't ordered in 60 days?"
- Show the table response with 47 customers and the AI's analysis.

### Act 6: "The Portfolio View" (2 minutes)

**Navigate to Insights (`/insights`)**

- Show churn trend improving: "Over the last 6 months, this system has helped reduce churn by X%."
- Show the product penetration matrix: "Only 23% of your high-consumption residential customers have SMART Tanks. That's 340 upgrade candidates worth $340K in annual recurring revenue."
- Point to the segment performance cards: "Every segment, every metric, answering one question: where is the money?"

### Closing (1 minute)

Return to Dashboard. Summarize:
- "This is what it means to be AI-native in customer intelligence. Not dashboards full of vanity metrics. A system that tells every employee what to do, why, and predicts what will happen if they do it."

---

## 9. Success Metrics

### Demo Success Criteria

The prototype is successful if:

1. **Narrative coherence:** The Margaret Chen story flows from problem to insight to action to outcome without any data inconsistencies
2. **Visual polish:** Every page looks production-ready. No placeholder text, no broken charts, no layout glitches at 1920x1080
3. **Interactivity:** The AI agent responds meaningfully to at least the 5 pre-built demo queries with rich content (tables, charts, action cards)
4. **Voice works:** ElevenLabs TTS produces audible, natural-sounding responses for at least 2 demo queries
5. **Data realism:** A propane industry executive would look at the mock data and find it plausible (seasonal patterns, consumption volumes, pricing, geography)
6. **Speed:** Pages load in <1 second. AI agent responds within 3 seconds for pre-built queries
7. **P&L connection:** Every metric on every page can be traced to a revenue, cost, or retention impact

### Platform Value Metrics (What the Demo Claims)

These are the metrics the platform would deliver in production:
- 30-40% reduction in churn rate (from proactive retention)
- 15-25% increase in revenue per customer (from cross-sell/upsell)
- 25-35% increase in customer lifetime value
- 60% reduction in time-to-insight for marketing team
- 4x improvement in campaign conversion rates (from personalization)
- 50% reduction in support escalations (from proactive outreach)

---

## 10. Implementation Notes

### 10.1 Build Sequence

**Phase 1: Foundation (Day 1)**
1. Initialize Next.js 16 project with pnpm, Tailwind v4, shadcn/ui (zinc base, new-york style)
2. Set up the dark-mode theme in globals.css (zinc palette as specified)
3. Create the sidebar layout (`app/layout.tsx`) following the Innovoco dashboard layout pattern
4. Install dependencies: recharts, framer-motion, ai, lucide-react
5. Create all TypeScript interfaces in `lib/types.ts`
6. Seed all mock data in `lib/data/` files

**Phase 2: Dashboard + Customer List (Day 2)**
1. Build the KPI card component (reusable, follows vertical layout guidelines)
2. Build the dashboard overview page with all four sections
3. Build the customer list page with search, filters, and table
4. Build the segment summary cards

**Phase 3: Customer 360 - Crown Jewel (Day 3)**
1. Build the Customer 360 page with all 10 sub-sections
2. Health score gauge, churn risk panel, LTV card
3. Identity graph visualization
4. Next-best-action panel
5. Engagement timeline
6. Consumption analytics charts

**Phase 4: Email Composer + Campaigns (Day 4)**
1. Build the AI email composer slide-over
2. Build the campaign list view
3. Build the campaign builder (multi-step form)
4. Build the campaign performance dashboard

**Phase 5: AI Agent + Insights (Day 5)**
1. Set up the `/api/chat` route with AI SDK and tool definitions
2. Build the chat interface with rich content rendering
3. Implement ElevenLabs voice integration
4. Build the insights page with all four analytics sections
5. Pre-build responses for the 5 demo queries

**Phase 6: Polish (Day 6)**
1. Animation refinements (page transitions, chart animations)
2. Data consistency audit (ensure Margaret Chen's story is airtight)
3. Responsive adjustments for boardroom display (optimize for 1920x1080 and 2560x1440)
4. Performance optimization (ensure <1s page loads)
5. Deploy to Vercel, configure environment variables

### 10.2 Key Implementation Decisions

**Mock data vs. real AI:** The health scores, churn predictions, LTV models, and next-best-actions are all pre-computed mock data. They do NOT require a real ML model. Only the conversational AI agent and email composer use live AI (via API). This keeps the demo fast and deterministic.

**AI agent responses:** For the 5 pre-built demo queries, implement pattern matching in the system prompt that returns well-formatted responses with embedded structured data. For ad-hoc queries, the AI uses the mock data tools to generate reasonable responses.

**Charts library:** Use Recharts v3 exclusively. All charts should use the dark theme consistently: zinc-800 grid lines, transparent backgrounds, sky-500 primary color, and proper axis labels.

**No authentication:** This is a demo. No login screen. The app loads directly into the dashboard.

**No real database:** All data lives in TypeScript files under `lib/data/`. Mutations (like "sending" an email or "launching" a campaign) can use React state to show success feedback but do not persist.

### 10.3 Potential Challenges

1. **Recharts dark mode:** Recharts does not have a built-in dark theme. Every chart needs explicit dark-mode colors for axes, grid, tooltips, and legends. Create a shared chart theme config.

2. **Identity graph visualization:** There is no standard Recharts component for node-link diagrams. Options: (a) use a simple SVG custom component, (b) use CSS-positioned circles with SVG connector lines, (c) use a lightweight library like react-flow. Recommendation: simple SVG is sufficient for a demo -- do not over-engineer.

3. **ElevenLabs streaming latency:** First-byte latency on ElevenLabs streaming TTS can be 500ms-1s. Show a "generating voice..." state with an animated orb during this period.

4. **AI response consistency:** The AI agent must produce consistent responses for the same demo queries every time. Use a low temperature (0.1-0.2) and specific system prompt instructions for the pre-built queries.

5. **Data consistency:** The most important thing in the demo. Margaret Chen's delivery history, consumption chart, timeline events, health score breakdown, and churn drivers must all tell the same story. Audit this carefully during Phase 6.

---

### Critical Files for Implementation

- `/lib/types.ts` - Core TypeScript interfaces for Customer, HealthScore, ChurnRisk, LTVPrediction, NextBestAction, Campaign, and all other data models. Every component depends on these types being defined first.
- `/lib/data/customers.ts` - The mock customer dataset (~50 records) with all pre-computed AI scores. This is the single source of truth that powers every page. The data must be internally consistent and realistic.
- `/app/customers/[id]/page.tsx` - The Customer 360 page, described as the "crown jewel." This is the most complex page with 10 sub-sections and is the centerpiece of the demo narrative (Margaret Chen's story).
- `/app/layout.tsx` - Root layout with dark-mode sidebar navigation. Sets the visual tone for the entire application and must follow the collapsible sidebar pattern from the existing Innovoco dashboard (`/Users/diodelahoz/Projects/innovoco-public/app/dashboard/layout.tsx`).
- `/app/api/chat/route.ts` - The AI agent API route using Vercel AI SDK `streamText()`. Defines the system prompt, tool definitions, and response formatting that powers the intelligence page and makes the conversational AI demo work.