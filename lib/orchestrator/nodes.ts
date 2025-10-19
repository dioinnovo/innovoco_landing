/**
 * LangGraph Nodes for Lead Qualification
 *
 * Each node is a focused function that:
 * 1. Takes current state
 * 2. Performs ONE specific task
 * 3. Returns state update
 * 4. Decides next phase (for routing)
 *
 * Following LangGraph principle: "Nodes do the work. Edges tell what to do next."
 */

import { LeadQualificationState } from './lead-graph-state';
import {
  extractName,
  extractCompany,
  extractPainPoint,
  extractEmail,
  extractPhone,
  containsEmail,
  containsPhone,
  formatPhone,
} from './utils/extractors';
import {
  isAffirmative,
  isNegative,
  isFeedbackOrQuestion,
  hasReachedRetryLimit,
  incrementRetry,
} from './utils/validators';

/**
 * Greeting Node
 * Handles initial greeting and transitions to name collection
 *
 * ENHANCED: Tries to extract pain point from initial message
 */
export async function greetingNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[greetingNode] Processing greeting phase');

  const { leadInfo, lastRole, lastTranscript } = state;

  // First time entering greeting - set initial phase
  if (!state.phase || state.phase === 'greeting') {
    // If we have a user message, try to extract pain point FIRST
    if (lastRole === 'user' && lastTranscript) {
      console.log('[greetingNode] User responded:', lastTranscript);

      // Try to extract pain point from initial message
      const painPoint = extractPainPoint(lastTranscript);
      if (painPoint) {
        console.log('[greetingNode] 🎯 Extracted pain point from initial message:', painPoint);
        // User gave us their challenge right away - capture it!
        return {
          phase: 'name',
          leadInfo: { ...leadInfo, painPoint },
          aiResponse: "That's a great use case for AI! To help you better, what's your name?"
        };
      }

      // No pain point detected, just move to name collection
      console.log('[greetingNode] No pain point detected, moving to name collection');
      return {
        phase: 'name',
        aiResponse: "Great to meet you! What's your name?"
      };
    }

    // Initial greeting
    console.log('[greetingNode] Initial greeting');
    return {
      phase: 'greeting',
      aiResponse: "Hi! I'm Luci from Innovoco. I help companies transform with AI and automation. May I ask you a few questions to better understand how we can help?"
    };
  }

  // Already past greeting, don't change phase
  return {};
}

/**
 * Name Collection Node
 * Extracts name from user input
 * FIXED: Proper state management and responses
 */
export async function nameNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[nameNode] Processing name collection');

  const { leadInfo, lastTranscript, lastRole, retries } = state;

  // If we already have a name, move on
  if (leadInfo.name) {
    console.log(`[nameNode] Name already collected: ${leadInfo.name}`);
    // CONTEXT-AWARE: Acknowledge pain point if already collected
    const response = leadInfo.painPoint
      ? `Nice to meet you, ${leadInfo.name}! I understand you're looking to ${leadInfo.painPoint}. What company do you work for?`
      : `Nice to meet you, ${leadInfo.name}! What company do you work for?`;
    return {
      phase: 'company',
      aiResponse: response
    };
  }

  // Try to extract name from user input
  if (lastRole === 'user' && lastTranscript) {
    const name = extractName(lastTranscript);
    if (name) {
      console.log(`[nameNode] ✅ Extracted name: ${name}`);
      // CONTEXT-AWARE: Acknowledge pain point if already collected
      const response = leadInfo.painPoint
        ? `Nice to meet you, ${name}! I understand you're looking to ${leadInfo.painPoint}. What company do you work for?`
        : `Nice to meet you, ${name}! What company do you work for?`;
      return {
        leadInfo: { ...leadInfo, name },
        phase: 'company',
        aiResponse: response
      };
    }

    // Check retry limit
    if (hasReachedRetryLimit(retries, 'name')) {
      console.log('[nameNode] Max retries reached for name');
      return {
        phase: 'company',
        aiResponse: "Let's continue. What company are you with?"
      };
    }

    // Failed to extract, ask again
    console.log('[nameNode] Failed to extract name, asking again');
    return {
      phase: 'name',
      retries: incrementRetry(retries, 'name'),
      aiResponse: "I didn't catch your name. Could you tell me what to call you?"
    };
  }

  // Waiting for user input
  return {
    phase: 'name'
  };
}

/**
 * Company Collection Node
 * Extracts company from user input
 */
export async function companyNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[companyNode] Processing company collection');

  const { leadInfo, lastTranscript, lastRole, retries } = state;

  // If we already have company, move on
  if (leadInfo.company) {
    console.log(`[companyNode] Company already collected: ${leadInfo.company}`);
    // CONTEXT-AWARE: Skip to email if we already have pain point
    if (leadInfo.painPoint) {
      console.log(`[companyNode] Pain point already collected, skipping to email`);
      return {
        phase: 'email',
        uiAction: {
          type: 'show_text_input',
          inputType: 'email',
        },
        aiResponse: `Perfect! I understand ${leadInfo.company} is looking to ${leadInfo.painPoint}. What's the best email to reach you at? Please type it on the screen.`
      };
    }
    return {
      phase: 'painPoint',
      aiResponse: `Great! And what kind of Data & AI solutions is ${leadInfo.company} looking to implement?`
    };
  }

  // Try to extract company from last transcript
  if (lastRole === 'user' && lastTranscript) {
    const company = extractCompany(lastTranscript);
    if (company) {
      console.log(`[companyNode] Extracted company: ${company}`);
      // CONTEXT-AWARE: Skip to email if we already have pain point
      if (leadInfo.painPoint) {
        console.log(`[companyNode] Pain point already collected, skipping to email`);
        return {
          leadInfo: { ...leadInfo, company },
          phase: 'email',
          uiAction: {
            type: 'show_text_input',
            inputType: 'email',
          },
          aiResponse: `Perfect! I understand ${company} is looking to ${leadInfo.painPoint}. What's the best email to reach you at? Please type it on the screen.`
        };
      }
      return {
        leadInfo: { ...leadInfo, company },
        phase: 'painPoint',
        aiResponse: `Great! And what kind of Data & AI solutions is ${company} looking to implement?`
      };
    }

    // Check retry limit
    if (hasReachedRetryLimit(retries, 'company')) {
      console.log('[companyNode] Max retries reached for company');
      return {
        phase: 'painPoint',
        aiResponse: "What specific challenge are you looking to solve with AI?"
      };
    }

    // Failed to extract, ask again
    console.log('[companyNode] Failed to extract company, asking again');
    return {
      phase: 'company',
      retries: incrementRetry(retries, 'company'),
      aiResponse: "I didn't catch your company name. Where do you work?"
    };
  }

  // Waiting for user input - shouldn't normally get here
  return {
    phase: 'company',
    aiResponse: "What company are you with?"
  };
}

/**
 * Pain Point Collection Node
 * Extracts business challenge from user input
 * ENHANCED: Skips if already collected
 */
export async function painPointNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[painPointNode] Processing pain point collection');

  const { leadInfo, lastTranscript, lastRole, retries, phase } = state;

  // If we already have pain point, move directly to email
  if (leadInfo.painPoint) {
    console.log(`[painPointNode] ✅ Pain point already collected: ${leadInfo.painPoint}`);
    console.log('[painPointNode] Skipping pain point question, moving to email');
    return {
      phase: 'email',
      uiAction: {
        type: 'show_text_input',
        inputType: 'email',
      },
      aiResponse: `Perfect! I understand you're looking to ${leadInfo.painPoint}. To send you relevant information, what's the best email to reach you at? Please type it on the screen.`
    };
  }

  // Try to extract pain point from last transcript
  if (lastRole === 'user' && lastTranscript) {
    const painPoint = extractPainPoint(lastTranscript);
    if (painPoint) {
      console.log(`[painPointNode] Extracted pain point: ${painPoint}`);
      return {
        leadInfo: { ...leadInfo, painPoint },
        phase: 'email',
        // Important: Don't re-introduce yourself here!
        // Also trigger UI immediately when transitioning to email
        uiAction: {
          type: 'show_text_input',
          inputType: 'email',
        },
        aiResponse: `I understand. That's a great use case for AI automation. To send you relevant information, what's the best email to reach you at? Please type it on the screen.`
      };
    }

    // Check retry limit
    if (hasReachedRetryLimit(retries, 'painPoint')) {
      console.log('[painPointNode] Max retries reached for pain point');
      return {
        phase: 'email',
        aiResponse: "Let me get your contact details. What's your email address? Please type it on the screen."
      };
    }

    // Failed to extract, ask again
    console.log('[painPointNode] Failed to extract pain point, asking again');
    return {
      phase: 'painPoint',
      retries: incrementRetry(retries, 'painPoint'),
      aiResponse: "What specific challenge are you looking to solve with AI and automation?"
    };
  }

  // First time in pain point phase or waiting for input
  return {
    phase: 'painPoint',
    aiResponse: "What kind of Data & AI solutions are you looking to implement?"
  };
}

/**
 * Email Collection Node
 * Requests email and shows UI for input
 * FIXED: Properly triggers UI and handles state
 */
export async function emailNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[emailNode] Processing email collection');

  const { leadInfo, lastTranscript, lastRole, retries, phase } = state;

  // If we already have email, move to confirmation
  if (leadInfo.email) {
    console.log(`[emailNode] Email already collected: ${leadInfo.email}`);
    return {
      phase: 'emailConfirm',
      aiResponse: `Just to confirm, your email is ${leadInfo.email}, correct?`
    };
  }

  // Try to extract email from user input
  if (lastRole === 'user' && lastTranscript) {
    // Check if user is giving feedback about UI
    if (isFeedbackOrQuestion(lastTranscript)) {
      console.log('[emailNode] User is giving feedback, showing UI');
      return {
        phase: 'email',
        uiAction: {
          type: 'show_text_input',
          inputType: 'email',
        },
        aiResponse: 'I understand. Please type your email address in the field that appears on screen.',
      };
    }

    // Try to extract email
    if (containsEmail(lastTranscript)) {
      const email = extractEmail(lastTranscript);
      if (email) {
        console.log(`[emailNode] ✅ Extracted email: ${email}`);
        return {
          leadInfo: { ...leadInfo, email },
          phase: 'emailConfirm',
          uiAction: { type: 'hide_text_input' },
          aiResponse: `Perfect! Just to confirm, your email is ${email}, correct?`,
        };
      }
    }

    // Check retry limit
    if (hasReachedRetryLimit(retries, 'email')) {
      console.log('[emailNode] Max retries reached');
      return {
        phase: 'phone',
        aiResponse: "Let's continue. What's the best phone number to reach you?"
      };
    }

    // Failed to extract, ask again with UI
    console.log('[emailNode] Failed to extract email, showing UI');
    return {
      phase: 'email',
      retries: incrementRetry(retries, 'email'),
      uiAction: {
        type: 'show_text_input',
        inputType: 'email',
      },
      aiResponse: 'For accuracy, please type your email address in the field on screen.',
    };
  }

  // First time entering email phase - show UI immediately
  if (phase === 'email' && !retries?.email) {
    console.log('[emailNode] 🎯 First time in email phase, SHOWING EMAIL UI');
    const uiAction = {
      type: 'show_text_input',
      inputType: 'email',
    };
    console.log('[emailNode] 📤 Returning UI action:', JSON.stringify(uiAction));
    return {
      phase: 'email',
      uiAction,
      aiResponse: 'Perfect! To send you our information, please type your email address in the field on screen.',
      retries: incrementRetry(retries, 'email'),
    };
  }

  // Waiting for user input
  return {
    phase: 'email'
  };
}

/**
 * Email Confirmation Node
 * Confirms email with user
 */
export async function emailConfirmNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[emailConfirmNode] Processing email confirmation');

  const { leadInfo, lastTranscript, lastRole, emailConfirmed } = state;

  // Already confirmed
  if (emailConfirmed) {
    console.log('[emailConfirmNode] Email already confirmed');
    return { phase: 'phone' };
  }

  // Check user response
  if (lastRole === 'user') {
    if (isAffirmative(lastTranscript)) {
      console.log('[emailConfirmNode] Email confirmed by user');
      return {
        emailConfirmed: true,
        phase: 'phone',
        // CRITICAL: Show phone UI immediately after email confirmation
        uiAction: {
          type: 'show_text_input',
          inputType: 'phone',
        },
        aiResponse: 'Perfect! Now, could you please type your phone number on the screen?',
      };
    }

    if (isNegative(lastTranscript)) {
      console.log('[emailConfirmNode] Email rejected, asking again');
      return {
        leadInfo: { ...leadInfo, email: undefined },
        phase: 'email',
        uiAction: {
          type: 'show_text_input',
          inputType: 'email',
        },
        aiResponse: 'No problem! Let me get the correct email. Please type your email on the screen.',
      };
    }
  }

  // Stay in emailConfirm phase (waiting for confirmation)
  return { phase: 'emailConfirm' };
}

/**
 * Phone Collection Node
 * CRITICAL: Enforces email confirmation before proceeding
 * FIXED: Properly triggers UI regardless of how we enter the phase
 */
export async function phoneNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[phoneNode] Processing phone collection');

  const { leadInfo, emailConfirmed, lastTranscript, lastRole, retries, phase } = state;

  // CRITICAL VALIDATION: Cannot proceed without email confirmation
  if (!emailConfirmed) {
    console.log('[phoneNode] ⚠️  Email not confirmed, returning to emailConfirm');
    return {
      phase: 'emailConfirm',
      aiResponse: 'Let me first confirm your email before we proceed. Is the email I have correct?',
    };
  }

  // If we already have phone, move to confirmation
  if (leadInfo.phone) {
    console.log(`[phoneNode] Phone already collected: ${leadInfo.phone}`);
    return {
      phase: 'phoneConfirm',
      aiResponse: `Just to confirm, your phone number is ${formatPhone(leadInfo.phone)}, correct?`
    };
  }

  // Try to extract phone from user input
  if (lastRole === 'user' && lastTranscript) {
    // Check if user is giving feedback about UI not appearing
    if (lastTranscript.toLowerCase().includes('not popping') ||
        lastTranscript.toLowerCase().includes('not showing') ||
        lastTranscript.toLowerCase().includes('ui') ||
        isFeedbackOrQuestion(lastTranscript)) {
      console.log('[phoneNode] User reporting UI issue, showing UI now');
      return {
        phase: 'phone',
        uiAction: {
          type: 'show_text_input',
          inputType: 'phone',
        },
        aiResponse: 'I apologize for the issue. The phone input field should appear now. Please type your phone number.',
      };
    }

    // Try to extract phone
    if (containsPhone(lastTranscript)) {
      const phone = extractPhone(lastTranscript);
      if (phone) {
        console.log(`[phoneNode] ✅ Extracted phone: ${phone}`);
        return {
          leadInfo: { ...leadInfo, phone },
          phase: 'phoneConfirm',
          uiAction: { type: 'hide_text_input' },
          aiResponse: `Perfect! Just to confirm, your number is ${formatPhone(phone)}, correct?`,
        };
      }
    }

    // Check retry limit
    if (hasReachedRetryLimit(retries, 'phone')) {
      console.log('[phoneNode] Max retries reached');
      return {
        phase: 'qualified',
        aiResponse: "Thank you for your time. We'll reach out via email with more information."
      };
    }

    // Failed to extract, ask again with UI
    console.log('[phoneNode] Failed to extract phone, showing UI');
    return {
      phase: 'phone',
      retries: incrementRetry(retries, 'phone'),
      uiAction: {
        type: 'show_text_input',
        inputType: 'phone',
      },
      aiResponse: 'For accuracy, please type your phone number in the field on screen.',
    };
  }

  // CRITICAL FIX: First time entering phone phase - show UI immediately
  // This ensures UI appears when transitioning from emailConfirm
  if (phase === 'phone' && !retries?.phone) {
    console.log('[phoneNode] 🎯 First time in phone phase, SHOWING PHONE UI IMMEDIATELY');
    const uiAction = {
      type: 'show_text_input',
      inputType: 'phone',
    };
    console.log('[phoneNode] 📤 Returning UI action:', JSON.stringify(uiAction));
    return {
      phase: 'phone',
      uiAction,
      aiResponse: 'Perfect! Now, could you please type your phone number in the field on screen?',
      retries: incrementRetry(retries, 'phone'),
    };
  }

  // Waiting for user input
  return {
    phase: 'phone'
  };
}

/**
 * Phone Confirmation Node
 * Confirms phone with user
 */
export async function phoneConfirmNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[phoneConfirmNode] Processing phone confirmation');

  const { leadInfo, lastTranscript, lastRole, phoneConfirmed } = state;

  // Already confirmed
  if (phoneConfirmed) {
    console.log('[phoneConfirmNode] Phone already confirmed');
    return { phase: 'qualified' };
  }

  // Check user response
  if (lastRole === 'user') {
    if (isAffirmative(lastTranscript)) {
      console.log('[phoneConfirmNode] Phone confirmed by user');
      return {
        phoneConfirmed: true,
        phase: 'qualified',
        aiResponse: "Perfect! I have all your information. Is there anything else you'd like to know before we wrap up?",
      };
    }

    if (isNegative(lastTranscript)) {
      console.log('[phoneConfirmNode] Phone rejected, asking again');
      return {
        leadInfo: { ...leadInfo, phone: undefined },
        phase: 'phone',
        uiAction: {
          type: 'show_text_input',
          inputType: 'phone',
        },
        aiResponse: 'No problem! Let me get the correct number. Please type your phone number on the screen.',
      };
    }
  }

  // Stay in phoneConfirm phase (waiting for confirmation)
  return { phase: 'phoneConfirm' };
}

/**
 * Qualified Node
 * Lead is fully qualified - can answer questions or close
 */
export async function qualifiedNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[qualifiedNode] Lead is qualified!');
  console.log(`[qualifiedNode] Lead Info:`, state.leadInfo);

  // Lead is qualified - stay in qualified phase
  // Do NOT automatically close the call
  // Let the conversation continue naturally
  return { phase: 'qualified' };
}
