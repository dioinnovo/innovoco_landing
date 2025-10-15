/**
 * API Route: /api/realtime/sync
 *
 * Syncs transcripts and manages conversation state with LangGraph StateGraph
 * Updated to use proper state-aware orchestration instead of keyword-based workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import * as graphManager from '@/lib/orchestrator/graph-manager';
import { sendLeadNotification } from '@/lib/email/send-lead-notification';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, transcript, role, timestamp, provider, metadata } = await request.json();

    // Log the transcript for debugging
    console.log(`[${sessionId}] ${role}: ${transcript}`);

    // Process through LangGraph StateGraph
    const result = await graphManager.processTranscript(
      sessionId,
      transcript,
      role as 'user' | 'assistant'
    );

    // Build response with graph state data
    const response: any = {
      success: true,
      sessionId,
      timestamp: new Date().toISOString(),
      state: {
        currentPhase: result.state.phase,
        emailConfirmed: result.state.emailConfirmed,
        phoneConfirmed: result.state.phoneConfirmed,
        isQualified: graphManager.isQualified(sessionId),
        leadInfo: result.state.leadInfo,
      }
    };

    // Include UI action if graph triggered one
    if (result.uiAction) {
      response.uiAction = result.uiAction;
      console.log(`[${sessionId}] 🎯 UI Action triggered:`, result.uiAction);
    }

    // Include AI response if graph generated one
    if (result.aiResponse) {
      response.aiResponse = result.aiResponse;
      console.log(`[${sessionId}] 💬 AI Response:`, result.aiResponse);
    }

    // If lead is qualified, log the lead data and send notifications
    if (graphManager.isQualified(sessionId)) {
      const leadData = graphManager.getLeadData(sessionId);
      console.log(`[${sessionId}] 🎉 Lead Qualified:`, leadData);

      // Send notification emails (internal report + customer welcome)
      if (leadData) {
        console.log(`[${sessionId}] 📧 Sending lead notification emails...`);
        const emailResult = await sendLeadNotification(leadData);
        console.log(`[${sessionId}] Email results:`, {
          salesEmail: emailResult.salesEmailSent ? '✅ Sent' : '❌ Failed',
          welcomeEmail: emailResult.welcomeEmailSent ? '✅ Sent' : '❌ Failed',
          errors: emailResult.errors.length > 0 ? emailResult.errors : 'None'
        });

        response.emailNotifications = {
          sent: emailResult.salesEmailSent || emailResult.welcomeEmailSent,
          salesEmailSent: emailResult.salesEmailSent,
          welcomeEmailSent: emailResult.welcomeEmailSent,
          errors: emailResult.errors
        };
      }

      response.leadData = leadData;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error syncing transcript:', error);
    return NextResponse.json(
      { error: 'Failed to sync transcript' },
      { status: 500 }
    );
  }
}