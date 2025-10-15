/**
 * Enhanced Test API endpoint using new structured client email system
 * Demonstrates the solution vision mapping and enterprise-grade templates
 */

import { NextResponse } from 'next/server';
import { 
  createDefaultClientEmailSchema,
  validateClientEmailSchema
} from '@/lib/email/client-schema';
import { 
  mapChallengesToSolutions, 
  generateSuccessMetrics, 
  generateIndustryProof 
} from '@/lib/email/solution-vision';
import { buildClientEmail } from '@/lib/email/client-template';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

async function sendEmail(to: string, subject: string, html: string, fromName: string = 'Innovoco AI'): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('Email notification (API key not configured):', { to, subject });
    return true;
  }
  
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const from = `${fromName} <${fromEmail}>`;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', response.status, error);
      return false;
    }
    
    const result = await response.json();
    console.log('📧 Email sent successfully:', result.id);
    return true;
  } catch (error) {
    console.error('❌ Email send failed:', error);
    return false;
  }
}

export async function POST() {
  try {
    console.log('🚀 Testing new structured client email system...');
    
    // Maria's data from the original conversation
    const mariaData = {
      name: 'Maria',
      company: 'Education Wings Ltd',
      industry: 'Education',
      role: 'COO',
      companySize: '500+',
      currentChallenges: ['manual processes', 'waste of time'],
      budget: '$150K+',
      timeline: 'deciding',
      stakeholders: ['three execs'],
      evaluationStage: 'deciding',
      email: 'diostenesd@hotmail.com'
    };
    
    // Create structured client email schema
    const clientEmailSchema = createDefaultClientEmailSchema();
    
    // Populate with Maria's data
    clientEmailSchema.personalization.recipientName = mariaData.name;
    clientEmailSchema.personalization.companyName = mariaData.company;
    clientEmailSchema.personalization.industry = mariaData.industry;
    clientEmailSchema.personalization.companySize = mariaData.companySize;
    clientEmailSchema.personalization.role = mariaData.role;
    
    // Map challenges to intelligent solution visions
    console.log('🧠 Mapping challenges to solution visions...');
    const mappedChallenges = mapChallengesToSolutions(
      mariaData.currentChallenges,
      mariaData.industry,
      mariaData.companySize,
      mariaData.timeline
    );
    clientEmailSchema.personalization.challenges = mappedChallenges;
    
    // Update primary solution with first mapped challenge
    if (mappedChallenges.length > 0) {
      clientEmailSchema.solutionVision.primarySolution = mappedChallenges[0].solution;
      if (mappedChallenges.length > 1) {
        clientEmailSchema.solutionVision.secondarySolutions = [mappedChallenges[1].solution];
      }
    }
    
    // Set timeline context for urgency
    clientEmailSchema.personalization.timeline = {
      phase: 'deciding',
      urgency: 'immediate',
      decisionTimeframe: 'ready to make a decision',
      businessDrivers: mariaData.currentChallenges
    };
    
    // Set decision context 
    clientEmailSchema.personalization.decisionContext = {
      stakeholders: mariaData.stakeholders,
      decisionProcess: 'executive team evaluation',
      currentEvaluation: 'comparing automation solutions',
      competitiveFactors: ['multiple vendor options', 'internal build consideration']
    };
    
    // Generate industry-specific success metrics and social proof
    console.log('📊 Generating industry-specific content...');
    clientEmailSchema.solutionVision.successMetrics = generateSuccessMetrics(
      mappedChallenges,
      mariaData.industry
    );
    clientEmailSchema.solutionVision.socialProof = generateIndustryProof(
      mariaData.industry,
      mariaData.companySize
    );
    
    // Configure email for executive audience (COO)
    clientEmailSchema.emailConfig.subject = `${mariaData.name}, thank you for connecting with Innovoco`;
    clientEmailSchema.emailConfig.preheader = `Next steps for ${mariaData.company}'s automation transformation`;
    clientEmailSchema.tone.formality = 'executive';
    clientEmailSchema.tone.urgency = 'priority';
    clientEmailSchema.tone.confidence = 'high';
    
    // Validate email quality
    const validation = validateClientEmailSchema(clientEmailSchema);
    console.log('✨ Email quality validation:', {
      score: validation.qualityScore,
      issues: validation.issues.length > 0 ? validation.issues : ['None - high quality!'],
      isValid: validation.isValid
    });
    
    // Build the structured email
    console.log('🏗️ Building enterprise-grade email template...');
    const clientHtml = buildClientEmail(clientEmailSchema);
    const clientSubject = clientEmailSchema.emailConfig.subject;
    
    // Send to verified email address
    const success = await sendEmail(
      'dio.delahoz@innovoco.com',
      clientSubject,
      clientHtml,
      'Innovoco AI Strategy Team'
    );
    
    return NextResponse.json({
      success,
      message: success ? 'Enhanced client email sent successfully!' : 'Failed to send enhanced email',
      systemInfo: {
        emailSystem: 'New Structured Client Email System',
        features: [
          'Solution vision mapping',
          'Industry-specific customization', 
          'Enterprise-grade design system',
          'Quality validation',
          'No scoring awareness',
          'Consistent UI/UX'
        ]
      },
      clientData: {
        name: mariaData.name,
        company: mariaData.company,
        industry: mariaData.industry,
        role: mariaData.role,
        challengesMapped: mappedChallenges.length,
        qualityScore: validation.qualityScore,
        templateUsed: 'Universal Structured Template',
        originalEmail: mariaData.email,
        sentTo: 'dio.delahoz@innovoco.com'
      },
      solutionVisions: mappedChallenges.map(c => ({
        challenge: c.original,
        category: c.category,
        severity: c.severity,
        vision: c.solution.visionStatement,
        benefit: c.solution.specificBenefit,
        impact: c.solution.impactMetric
      }))
    });
    
  } catch (error) {
    console.error('Enhanced test email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send enhanced client email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}