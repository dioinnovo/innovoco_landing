import { NextRequest, NextResponse } from 'next/server'
import { 
  createDefaultClientEmailSchema,
  validateClientEmailSchema
} from '@/lib/email/client-schema'
import { 
  mapChallengesToSolutions, 
  generateSuccessMetrics, 
  generateIndustryProof 
} from '@/lib/email/solution-vision'
import { buildClientEmail } from '@/lib/email/client-template'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

// Send qualification email to the lead
async function sendQualificationEmail(
  extractedInfo: any, 
  qualificationScore: number, 
  qualificationStatus: string,
  qualificationReasons: string[]
): Promise<boolean> {
  if (!RESEND_API_KEY || !extractedInfo.email) {
    console.log('📧 Email not sent (missing API key or email)')
    return false
  }

  try {
    // Create structured email schema
    const emailSchema = createDefaultClientEmailSchema()
    
    // Populate with extracted lead info
    emailSchema.personalization.recipientName = extractedInfo.name || 'there'
    emailSchema.personalization.companyName = extractedInfo.company || 'your company'
    emailSchema.personalization.role = extractedInfo.role || 'your team'
    emailSchema.personalization.companySize = extractedInfo.employees ? `${extractedInfo.employees} employees` : 'your organization'
    
    // Map challenges if available
    const challenges = extractedInfo.challenges ? extractedInfo.challenges.split(',') : []
    if (challenges.length > 0) {
      const mappedChallenges = mapChallengesToSolutions(
        challenges,
        extractedInfo.industry || 'General',
        extractedInfo.employees || '50+',
        extractedInfo.timeline || 'Q1 2025'
      )
      emailSchema.personalization.challenges = mappedChallenges
      
      if (mappedChallenges.length > 0) {
        emailSchema.solutionVision.primarySolution = mappedChallenges[0].solution
      }
    }
    
    // Set timeline and urgency
    emailSchema.personalization.timeline = {
      phase: extractedInfo.timeline || 'evaluation',
      urgency: qualificationStatus === 'highly_qualified' ? 'immediate' : 'standard',
      decisionTimeframe: extractedInfo.timeline || 'upcoming quarter',
      businessDrivers: challenges
    }
    
    // Configure email subject and tone
    emailSchema.emailConfig.subject = `${extractedInfo.name || 'Hi'}, thank you for connecting with Innovoco`
    emailSchema.emailConfig.preheader = `Next steps for your AI & automation transformation`
    emailSchema.tone.formality = extractedInfo.decisionMaker ? 'executive' : 'professional'
    emailSchema.tone.urgency = qualificationStatus === 'highly_qualified' ? 'priority' : 'standard'
    
    // Build and send email
    const emailHtml = buildClientEmail(emailSchema)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const from = `Innovoco AI Team <${fromEmail}>`
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [extractedInfo.email],
        subject: emailSchema.emailConfig.subject,
        html: emailHtml,
      }),
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('❌ Email send failed:', error)
      return false
    }
    
    const result = await response.json()
    console.log('✅ Qualification email sent successfully:', result.id)
    return true
    
  } catch (error) {
    console.error('❌ Failed to send qualification email:', error)
    return false
  }
}

// Qualification scoring agent - evaluates conversation transcripts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, conversationHistory } = body

    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'Conversation history is required' },
        { status: 400 }
      )
    }

    // Combine all messages into a single transcript for analysis
    const fullTranscript = conversationHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n')
      .toLowerCase()

    // Initialize scoring
    let qualificationScore = 0
    let qualificationReasons = []
    const extractedInfo: any = {
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      employees: '',
      role: '',
      budget: '',
      timeline: '',
      challenges: '',
      decisionMaker: false,
      hasAllRequiredInfo: false
    }

    // 1. COMPANY SIZE SCORING (Max 40 points)
    const employeePattern = /\b(\d+)\s*(employee|people|person|staff|lawyer|attorney|consultant|worker|team\s*member|professional|associate|partner|developer|engineer)/i
    const employeeMatch = fullTranscript.match(employeePattern)
    if (employeeMatch) {
      const employeeCount = parseInt(employeeMatch[1])
      extractedInfo.employees = employeeCount
      
      if (employeeCount >= 1000) {
        qualificationScore += 40
        qualificationReasons.push(`Enterprise company (${employeeCount} professionals)`)
      } else if (employeeCount >= 500) {
        qualificationScore += 35
        qualificationReasons.push(`Large company (${employeeCount} professionals)`)
      } else if (employeeCount >= 100) {
        qualificationScore += 25
        qualificationReasons.push(`Mid-size company (${employeeCount} professionals)`)
      } else if (employeeCount >= 50) {
        qualificationScore += 15
        qualificationReasons.push(`Small-mid company (${employeeCount} professionals)`)
      } else {
        qualificationScore += 5
        qualificationReasons.push(`Small company (${employeeCount} professionals)`)
      }
    }

    // 2. BUDGET SCORING (Max 35 points)
    const budgetPatterns = [
      /\$\s*(\d+)k/i,
      /\$\s*(\d+),?(\d+)k/i,
      /\$\s*(\d+(?:,\d{3})*)/i,
      /(\d+)\s*k\s*budget/i,
      /budget.*?(\d+)k/i
    ]
    
    let budgetAmount = 0
    for (const pattern of budgetPatterns) {
      const match = fullTranscript.match(pattern)
      if (match) {
        if (match[0].includes('k')) {
          budgetAmount = parseInt(match[1].replace(/,/g, '')) * 1000
        } else {
          budgetAmount = parseInt(match[1].replace(/,/g, ''))
        }
        break
      }
    }

    if (budgetAmount > 0) {
      extractedInfo.budget = `$${budgetAmount.toLocaleString()}`
      
      if (budgetAmount >= 500000) {
        qualificationScore += 35
        qualificationReasons.push(`Enterprise budget (${extractedInfo.budget})`)
      } else if (budgetAmount >= 200000) {
        qualificationScore += 30
        qualificationReasons.push(`Large budget (${extractedInfo.budget})`)
      } else if (budgetAmount >= 100000) {
        qualificationScore += 25
        qualificationReasons.push(`Good budget (${extractedInfo.budget})`)
      } else if (budgetAmount >= 50000) {
        qualificationScore += 15
        qualificationReasons.push(`Adequate budget (${extractedInfo.budget})`)
      } else {
        qualificationScore += 5
        qualificationReasons.push(`Small budget (${extractedInfo.budget})`)
      }
    }

    // 3. TIMELINE URGENCY (Max 20 points)
    const urgentKeywords = [
      'urgent', 'asap', 'immediately', 'as soon as possible',
      'right away', 'quickly', 'this week', 'next week',
      'this month', 'q1', 'q2', 'critical', 'priority'
    ]
    
    const hasUrgency = urgentKeywords.some(keyword => fullTranscript.includes(keyword))
    if (hasUrgency) {
      qualificationScore += 20
      qualificationReasons.push('Urgent timeline')
      extractedInfo.timeline = 'Urgent/Immediate'
    } else {
      const timelineMatch = fullTranscript.match(/(\d+)\s*(month|week|quarter|year)/i)
      if (timelineMatch) {
        const timeValue = parseInt(timelineMatch[1])
        const timeUnit = timelineMatch[2]
        extractedInfo.timeline = `${timeValue} ${timeUnit}(s)`
        
        if (timeUnit.includes('week') || (timeUnit.includes('month') && timeValue <= 3)) {
          qualificationScore += 15
          qualificationReasons.push(`Short timeline (${extractedInfo.timeline})`)
        } else if (timeUnit.includes('month') && timeValue <= 6) {
          qualificationScore += 10
          qualificationReasons.push(`Medium timeline (${extractedInfo.timeline})`)
        } else {
          qualificationScore += 5
          qualificationReasons.push(`Long timeline (${extractedInfo.timeline})`)
        }
      }
    }

    // 4. ENGAGEMENT SIGNALS (Max 25 points)
    const engagementKeywords = {
      'yes please': 10,
      'definitely': 10,
      'absolutely': 10,
      'interested': 8,
      'let\'s do it': 10,
      'sounds good': 8,
      'tell me more': 6,
      'schedule': 10,
      'meeting': 10,
      'demo': 10,
      'call': 8,
      'proposal': 10,
      'next steps': 8
    }

    let engagementScore = 0
    for (const [keyword, points] of Object.entries(engagementKeywords)) {
      if (fullTranscript.includes(keyword)) {
        engagementScore = Math.max(engagementScore, points)
      }
    }
    
    if (engagementScore > 0) {
      qualificationScore += Math.min(25, engagementScore + 15)
      qualificationReasons.push('High engagement level')
    }

    // 5. DECISION MAKER (Max 10 points)
    const decisionMakerTitles = [
      'ceo', 'cto', 'cfo', 'coo', 'president', 'vp', 'vice president',
      'director', 'head of', 'manager', 'partner', 'owner', 'founder',
      'decision maker', 'decision-maker', 'c-suite', 'executive'
    ]
    
    const hasDecisionMaker = decisionMakerTitles.some(title => fullTranscript.includes(title))
    if (hasDecisionMaker) {
      qualificationScore += 10
      qualificationReasons.push('Decision maker involved')
      extractedInfo.decisionMaker = true
      
      // Extract specific role
      for (const title of decisionMakerTitles) {
        if (fullTranscript.includes(title)) {
          extractedInfo.role = title.toUpperCase()
          break
        }
      }
    }

    // 6. EXTRACT CONTACT INFORMATION
    // Name extraction (look for patterns like "I'm John" or "my name is Sarah")
    const namePatterns = [
      /(?:i'm|i am|my name is|this is|name:?)\s+([a-z]+(?:\s+[a-z]+)?)/i,
      /^([a-z]+(?:\s+[a-z]+)?)\s+(?:here|speaking|calling)/i
    ]
    
    for (const pattern of namePatterns) {
      const match = fullTranscript.match(pattern)
      if (match && match[1]) {
        extractedInfo.name = match[1].split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        break
      }
    }

    // Email extraction
    const emailMatch = fullTranscript.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
    if (emailMatch) {
      extractedInfo.email = emailMatch[1]
    }

    // Phone extraction
    const phonePatterns = [
      /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
      /(\d{3}[-.\s]\d{3}[-.\s]\d{4})/,
      /(\d{3}[-.\s]\d{4})/
    ]
    
    for (const pattern of phonePatterns) {
      const match = fullTranscript.match(pattern)
      if (match) {
        extractedInfo.phone = match[1]
        break
      }
    }

    // Company extraction (look for common patterns)
    const companyPatterns = [
      /(?:company|firm|organization|work at|with|from)\s+(?:is\s+)?([a-z]+(?:\s+[a-z]+){0,3})/i,
      /([a-z]+(?:\s+[a-z]+){0,3})\s+(?:llc|inc|corp|company|firm|associates|partners)/i
    ]
    
    for (const pattern of companyPatterns) {
      const match = fullTranscript.match(pattern)
      if (match && match[1] && !['a', 'the', 'our', 'my', 'we'].includes(match[1].toLowerCase())) {
        extractedInfo.company = match[1].split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        break
      }
    }

    // 7. CHECK REQUIRED INFORMATION COMPLETENESS
    const hasRequiredInfo = !!(
      extractedInfo.name &&
      extractedInfo.email &&
      extractedInfo.phone &&
      (extractedInfo.company || extractedInfo.employees)
    )
    
    if (hasRequiredInfo) {
      qualificationScore += 10
      qualificationReasons.push('Complete contact information')
      extractedInfo.hasAllRequiredInfo = true
    } else {
      const missingFields = []
      if (!extractedInfo.name) missingFields.push('name')
      if (!extractedInfo.email) missingFields.push('email')
      if (!extractedInfo.phone) missingFields.push('phone')
      if (!extractedInfo.company) missingFields.push('company')
      
      qualificationReasons.push(`Missing: ${missingFields.join(', ')}`)
    }

    // 8. DETERMINE QUALIFICATION STATUS
    const qualificationThresholds = {
      highPriority: 80,
      qualified: 45,
      nurture: 25
    }

    let qualificationStatus = 'unqualified'
    let priority = 'low'
    
    if (qualificationScore >= qualificationThresholds.highPriority) {
      qualificationStatus = 'highly_qualified'
      priority = 'high'
    } else if (qualificationScore >= qualificationThresholds.qualified) {
      qualificationStatus = 'qualified'
      priority = 'medium'
    } else if (qualificationScore >= qualificationThresholds.nurture) {
      qualificationStatus = 'nurture'
      priority = 'low'
    }

    // 9. CHECK IF CONVERSATION IS ENDING
    const lastAssistantMessage = conversationHistory
      .filter(msg => msg.role === 'assistant')
      .pop()?.content || ''
    
    const conversationEnding = [
      "you'll hear from",
      "reach out",
      "contact you",
      "get in touch",
      "speak soon",
      "talk soon",
      "follow up"
    ].some(phrase => lastAssistantMessage.toLowerCase().includes(phrase))

    // 10. PREPARE RESPONSE
    const response = {
      sessionId,
      qualified: qualificationStatus === 'qualified' || qualificationStatus === 'highly_qualified',
      qualificationScore,
      qualificationStatus,
      priority,
      qualificationReasons,
      extractedInfo,
      conversationEnding,
      shouldSendNotification: (
        (qualificationStatus === 'qualified' || qualificationStatus === 'highly_qualified') ||
        (conversationEnding && qualificationScore >= 30 && extractedInfo.email)
      ),
      recommendations: generateRecommendations(qualificationStatus, extractedInfo, qualificationScore),
      timestamp: new Date().toISOString()
    }

    // If should send notification, trigger email
    if (response.shouldSendNotification && extractedInfo.email) {
      console.log(`📧 Sending qualification email for session ${sessionId}:`, {
        score: qualificationScore,
        status: qualificationStatus,
        contact: extractedInfo.email
      })
      
      // Send qualification notification email
      await sendQualificationEmail(extractedInfo, qualificationScore, qualificationStatus, qualificationReasons)
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Qualification API Error:', error)
    return NextResponse.json(
      { error: 'Failed to qualify lead' },
      { status: 500 }
    )
  }
}

// Helper function to generate recommendations
function generateRecommendations(status: string, info: any, score: number): string[] {
  const recommendations = []
  
  if (status === 'highly_qualified') {
    recommendations.push('🔥 IMMEDIATE ACTION: Contact within 1 hour')
    recommendations.push('Assign to senior sales executive')
    recommendations.push('Prepare custom demo based on their industry')
  } else if (status === 'qualified') {
    recommendations.push('Contact within 24 hours')
    recommendations.push('Send relevant case studies')
    recommendations.push('Schedule discovery call')
  } else if (status === 'nurture') {
    recommendations.push('Add to nurture campaign')
    recommendations.push('Send educational content')
    recommendations.push('Follow up in 2-4 weeks')
  }
  
  // Specific recommendations based on missing info
  if (!info.budget) {
    recommendations.push('Qualify budget in first call')
  }
  if (!info.timeline) {
    recommendations.push('Understand implementation timeline')
  }
  if (!info.decisionMaker) {
    recommendations.push('Identify decision makers')
  }
  
  return recommendations
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    service: 'Lead Qualification Agent',
    status: 'operational',
    version: '1.0.0',
    capabilities: [
      'Conversation transcript analysis',
      'Lead scoring (0-100 scale)',
      'Contact information extraction',
      'Qualification status determination',
      'Actionable recommendations'
    ],
    timestamp: new Date().toISOString()
  })
}