# Unified Lead Intelligence System with Multi-Agent Orchestration

## Executive Summary

The Unified Lead Intelligence System is a state-of-the-art, AI-powered customer service platform that combines natural conversation capabilities with sophisticated lead qualification, using LangGraph.js for multi-agent orchestration. This system consolidates all customer interactions through a single, intelligent endpoint that automatically extracts information, qualifies leads using BANT methodology, and routes them appropriately.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Core Components](#core-components)
3. [Implementation Guide](#implementation-guide)
4. [API Reference](#api-reference)
5. [Agent System](#agent-system)
6. [Lead Qualification](#lead-qualification)
7. [Configuration](#configuration)
8. [Testing & Monitoring](#testing--monitoring)
9. [Deployment](#deployment)

## System Architecture

### Overview

The system uses LangGraph.js StateGraph for orchestrating multiple specialized agents that work together to:
- Engage in natural conversations with visitors
- Extract relevant business information
- Qualify leads using BANT methodology
- Provide tailored recommendations
- Schedule meetings with qualified prospects
- Send notifications to sales teams

### Technology Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Orchestration**: LangGraph.js with TypeScript
- **AI Model**: Azure OpenAI GPT-5-chat-01
- **State Management**: LangGraph Annotation.Root pattern
- **Email**: Resend API
- **Language**: TypeScript 5 with strict mode

### Architecture Diagram

```
┌─────────────────┐
│  Virtual        │
│  Assistant UI   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  /api/          │
│  orchestrate    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│       Master Orchestrator               │
│  ┌─────────────────────────────────┐   │
│  │     StateGraph Workflow         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │Conv. │ │Extr. │ │Qual. │ │Recom.│ │
│  └──────┘ └──────┘ └──────┘ └──────┘ │
│                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │Sched.│ │Notif.│ │Anal. │ │Nurt. │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Master Orchestrator (`/lib/orchestrator/master.ts`)

The central coordinator that manages all agents and conversation flow:

```typescript
export class MasterOrchestrator {
  private orchestrator: ReturnType<typeof buildMasterOrchestrator>;
  private sessions: Map<string, MasterOrchestratorState>;
  
  // Session management
  async startSession(sessionId, conversationType, initialMessage?, initialData?)
  async continueSession(sessionId, userMessage)
  async endSession(sessionId)
  
  // Analytics
  getAnalytics()
  getActiveSessions()
}
```

### 2. Unified State Definition (`/lib/orchestrator/state.ts`)

Comprehensive state management using LangGraph Annotation.Root:

```typescript
export const MasterOrchestratorAnnotation = Annotation.Root({
  // Session Management
  sessionId: Annotation<string>(),
  conversationType: Annotation<'chat' | 'callback' | 'email' | 'form'>(),
  
  // Customer Information
  customerInfo: Annotation<CustomerInfo>(),
  
  // BANT Qualification
  qualification: Annotation<BANTQualification | null>(),
  
  // Service Recommendations
  recommendations: Annotation<ServiceRecommendation | null>(),
  
  // Analytics
  analytics: Annotation<AnalyticsData>(),
  
  // Workflow Control
  currentPhase: Annotation<Phase>(),
  nextNode: Annotation<string | null>(),
  conversationStatus: Annotation<Status>()
})
```

### 3. API Endpoint (`/app/api/orchestrate/route.ts`)

Single unified endpoint for all interactions:

```typescript
POST /api/orchestrate
{
  message: string;
  sessionId?: string;
  conversationType?: 'chat' | 'callback' | 'email' | 'form';
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
}

Response:
{
  response: string;
  sessionId: string;
  qualification?: {
    isQualified: boolean;
    score: number;
    tier: 'hot' | 'warm' | 'cold' | 'nurture' | 'disqualified';
  };
  recommendations?: {...};
  analytics?: {...};
}
```

## Agent System

### Agent Types and Responsibilities

#### 1. Conversation Agent (`/lib/agents/conversation.ts`)
- **Purpose**: Natural language interaction with visitors
- **Model**: Azure OpenAI GPT-5-chat-01
- **Features**:
  - 1-2 sentence responses for natural flow
  - No markdown formatting
  - Context-aware responses
  - Phase determination

#### 2. Extraction Agent (`/lib/agents/extraction.ts`)
- **Purpose**: Extract structured data from conversations
- **Capabilities**:
  - Email and phone extraction
  - Name and company identification
  - Job title and role detection
  - Budget and timeline extraction
  - Challenge identification

#### 3. Qualification Agent (`/lib/agents/qualification.ts`)
- **Purpose**: BANT scoring and lead qualification
- **Scoring**:
  - Budget: 0-30 points
  - Authority: 0-25 points
  - Need: 0-25 points
  - Timeline: 0-20 points
- **Industry Multipliers**:
  - Financial Services: 1.5x
  - Healthcare: 1.3x
  - Manufacturing: 1.2x
  - Legal: 1.2x
  - Retail: 1.1x

#### 4. Recommendation Agent (`/lib/agents/recommendation.ts`)
- **Purpose**: Match services to customer needs
- **Services**:
  - AI-Powered Data Transformation
  - Intelligent Process Automation
  - AI Analytics & Insights
  - Custom AI Solutions

#### 5. Scheduling Agent (`/lib/agents/scheduling.ts`)
- **Purpose**: Book meetings with qualified leads
- **Features**:
  - Automatic calendar coordination
  - Meeting URL generation
  - Agenda preparation

#### 6. Notification Agent (`/lib/agents/notification.ts`)
- **Purpose**: Alert sales team and send confirmations
- **Notifications**:
  - Qualified lead alerts to sales
  - Meeting confirmations to prospects
  - Follow-up reminders

#### 7. Analytics Agent (`/lib/agents/analytics.ts`)
- **Purpose**: Track engagement and sentiment
- **Metrics**:
  - Engagement score
  - Sentiment analysis
  - Conversion probability
  - Key conversation moments

#### 8. Nurture Agent (`/lib/agents/nurture.ts`)
- **Purpose**: Follow-up with unqualified leads
- **Actions**:
  - Resource sharing
  - Future follow-up scheduling
  - Educational content delivery

## Lead Qualification

### BANT Methodology Implementation

#### Scoring Breakdown (100 points total)

**Budget (0-30 points)**
- $1M+: 30 points
- $500K: 25 points
- $250K: 20 points
- $100K: 15 points
- $50K: 10 points
- Budget mentioned: 5 points
- Company size bonuses applied

**Authority (0-25 points)**
- C-Level (CEO, CTO, CFO): 25 points
- VP/Vice President: 20 points
- Director/Head of: 15 points
- Manager/Lead: 10 points
- Senior/Principal: 8 points
- Analyst/Coordinator: 5 points

**Need (0-25 points)**
- Number of challenges (max 15 points)
- Pain severity scoring
- Business impact assessment
- Urgency indicators

**Timeline (0-20 points)**
- Immediate/Urgent: 20 points
- This month: 15 points
- This quarter: 12 points
- This year: 8 points
- Next year: 3 points

### Qualification Tiers

- **Hot (80-100 points)**: Immediate sales engagement
- **Warm (60-79 points)**: Priority follow-up
- **Cold (40-59 points)**: Educational approach
- **Nurture (20-39 points)**: Long-term nurturing
- **Disqualified (<20 points)**: No further action

## Configuration

### Environment Variables

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-instance.openai.azure.com
AZURE_OPENAI_API_KEY=your-api-key
AZURE_DEPLOYMENT_NAME=GPT-5-chat-01

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-api-key

# Optional: Redis for session persistence
REDIS_URL=redis://localhost:6379
```

### System Prompts

The conversation agent uses a carefully crafted prompt for natural interaction:

```
You're a friendly AI assistant for Innovoco, helping visitors explore AI and automation solutions. 
Chat naturally, like a helpful colleague - not a robot.

CONVERSATION RULES:
1. Keep it SHORT - Max 1-2 sentences per response
2. One thing at a time - Never ask multiple questions  
3. Sound HUMAN - Write like you're texting a colleague
4. NO FORMATTING - Never use asterisks, bold, or markdown
5. Be conversational - Use contractions (I'm, you're, let's)
```

## Testing & Monitoring

### Testing the System

1. **Unit Tests**: Test individual agents
```bash
npm test agents/
```

2. **Integration Tests**: Test orchestration flow
```bash
npm test orchestrator/
```

3. **Manual Testing**: Use the API endpoint
```bash
curl -X POST http://localhost:3000/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"message": "I need help with data automation"}'
```

### Key Performance Indicators

- **Engagement Rate**: Messages per session
- **Qualification Rate**: % of leads qualified
- **Conversion Rate**: % qualified to meeting
- **Response Time**: Average AI response time
- **Data Capture**: % of key fields collected

### Analytics Dashboard

Access real-time analytics:
```bash
GET /api/orchestrate
```

Returns:
- Active sessions
- Qualification metrics
- Conversion funnel
- Average scores by tier

## Deployment

### Production Deployment on Vercel

1. **Environment Setup**
```bash
vercel env add AZURE_OPENAI_ENDPOINT
vercel env add AZURE_OPENAI_API_KEY
vercel env add RESEND_API_KEY
```

2. **Deploy**
```bash
vercel --prod
```

3. **Monitor**
- Check Vercel Functions logs
- Monitor API endpoint performance
- Track error rates

### Scaling Considerations

- **Session Storage**: Implement Redis for production
- **Rate Limiting**: Add API rate limits
- **Caching**: Cache AI responses for common questions
- **Load Balancing**: Use Vercel's automatic scaling

## Virtual Assistant Integration

### Component Usage (`/components/virtual-assistant.tsx`)

```tsx
<VirtualAssistant 
  apiEndpoint="/api/orchestrate"
  useCallbackAgent={false}
/>
```

The Virtual Assistant automatically:
- Manages session IDs
- Displays qualification status in console
- Handles error states gracefully
- Provides voice input capability

## Migration from Legacy Systems

This unified system replaces:
- Standalone Azure chat endpoints
- Separate n8n workflows
- Individual qualification agents
- Multiple parallel LangGraph implementations

All functionality is now consolidated into the single `/api/orchestrate` endpoint with the Master Orchestrator managing all agent interactions.

## Troubleshooting

### Common Issues

1. **Recursion Limit Errors**
   - Ensure routing logic returns END appropriately
   - Check for infinite loops in state transitions

2. **Azure OpenAI Errors**
   - Verify credentials in environment variables
   - Check deployment name matches Azure configuration

3. **Email Not Sending**
   - Confirm Resend API key is valid
   - Check email addresses are properly formatted

4. **Session Not Persisting**
   - Ensure sessionStorage is enabled in browser
   - Consider implementing server-side session storage

## Support and Maintenance

For issues or questions:
- Review error logs in console
- Check Vercel Functions logs
- Ensure all environment variables are set
- Verify Azure OpenAI deployment is active

---

*Last Updated: September 2025*
*Version: 1.0.0 - Unified System*