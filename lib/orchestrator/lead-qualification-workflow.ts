/**
 * Lead Qualification Workflow
 * State machine for collecting and confirming lead information
 */

export interface LeadQualificationState {
  // Contact Information
  name?: string;
  company?: string;
  email?: string;
  phone?: string;

  // State Tracking
  currentPhase: 'greeting' | 'name_request' | 'need_assessment' | 'email_request' | 'email_received' | 'email_confirmed' | 'phone_request' | 'phone_received' | 'phone_confirmed' | 'qualified' | 'closing' | 'completed';
  emailConfirmed: boolean;
  phoneConfirmed: boolean;

  // Business Context
  painPoint?: string;
  budget?: string;
  timeline?: string;

  // Metadata
  conversationHistory: Array<{ role: string; content: string; timestamp: Date }>;
  createdAt: Date;
  updatedAt: Date;
}

export class LeadQualificationWorkflow {
  private sessions: Map<string, LeadQualificationState> = new Map();

  /**
   * Initialize a new lead qualification session
   */
  initSession(sessionId: string): LeadQualificationState {
    const state: LeadQualificationState = {
      currentPhase: 'greeting',
      emailConfirmed: false,
      phoneConfirmed: false,
      conversationHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.set(sessionId, state);
    return state;
  }

  /**
   * Get current session state
   */
  getState(sessionId: string): LeadQualificationState | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Process a transcript and update state
   */
  processTranscript(
    sessionId: string,
    transcript: string,
    role: 'user' | 'assistant'
  ): { state: LeadQualificationState; uiAction?: any; aiResponse?: string } {
    let state = this.getState(sessionId);

    if (!state) {
      state = this.initSession(sessionId);
    }

    // Add to history
    state.conversationHistory.push({
      role,
      content: transcript,
      timestamp: new Date()
    });
    state.updatedAt = new Date();

    // Process based on current phase
    const result = this.processPhase(state, transcript, role);

    this.sessions.set(sessionId, state);
    return result;
  }

  /**
   * Core state machine logic
   */
  private processPhase(
    state: LeadQualificationState,
    transcript: string,
    role: 'user' | 'assistant'
  ): { state: LeadQualificationState; uiAction?: any; aiResponse?: string } {
    const lowerTranscript = transcript.toLowerCase();

    console.log(`[Workflow] Current phase: ${state.currentPhase}, Role: ${role}, Transcript: "${transcript}"`);

    // Extract information from transcript
    this.extractInformation(state, transcript, role);

    // State transitions based on current phase
    switch (state.currentPhase) {
      case 'greeting':
        if (role === 'user' && transcript.length > 10) {
          console.log(`[Workflow] Transitioning from greeting to name_request`);
          state.currentPhase = 'name_request';
        }
        break;

      case 'name_request':
        // Check if name was extracted or assistant asks for name
        if (role === 'assistant' && (lowerTranscript.includes('who') || lowerTranscript.includes('name'))) {
          console.log(`[Workflow] Assistant asking for name, staying in name_request phase`);
        } else if (role === 'user' && state.name) {
          console.log(`[Workflow] Name collected: ${state.name}, transitioning to need_assessment`);
          state.currentPhase = 'need_assessment';
        } else if (role === 'user' && transcript.length > 5) {
          // User responded but name wasn't extracted - transition anyway to avoid getting stuck
          console.log(`[Workflow] User responded to name request, transitioning to need_assessment`);
          state.currentPhase = 'need_assessment';
        }
        break;

      case 'need_assessment':
        // Check if AI is asking for email
        if (role === 'assistant' && (
          lowerTranscript.includes('email') ||
          lowerTranscript.includes('e-mail') ||
          lowerTranscript.includes('reach you') ||
          lowerTranscript.includes('contact you')
        )) {
          console.log(`[Workflow] ✅ Email trigger detected! Transitioning to email_request and showing UI`);
          state.currentPhase = 'email_request';

          // Trigger UI to show email input
          return {
            state,
            uiAction: {
              type: 'show_text_input',
              inputType: 'email'
            }
          };
        }
        break;

      case 'email_request':
        // User provided email (either typed or spoken)
        if (role === 'user' && this.containsEmail(transcript)) {
          const email = this.extractEmail(transcript);
          if (email) {
            console.log(`[Workflow] ✅ Email extracted: ${email}, transitioning to email_received`);
            state.email = email;
            state.currentPhase = 'email_received';

            // Hide the email input UI
            return {
              state,
              uiAction: {
                type: 'hide_text_input'
              },
              aiResponse: `Awesome! Just to confirm, your email is ${email}, correct?`
            };
          }
        }
        break;

      case 'email_received':
        // Waiting for email confirmation
        if (role === 'user') {
          const confirmed = this.isAffirmative(transcript);
          if (confirmed) {
            console.log(`[Workflow] ✅ Email confirmed! Transitioning to email_confirmed`);
            state.emailConfirmed = true;
            state.currentPhase = 'email_confirmed';

            return {
              state,
              aiResponse: `Perfect! Now, could you please type your phone number on the screen?`
            };
          } else if (this.isNegative(transcript)) {
            console.log(`[Workflow] Email rejected, asking again`);
            // Email was wrong, ask again
            state.currentPhase = 'email_request';
            state.email = undefined;

            return {
              state,
              uiAction: {
                type: 'show_text_input',
                inputType: 'email'
              },
              aiResponse: `No problem! Let me get the correct email. Please type your email on the screen.`
            };
          }
        }
        // FALLTHROUGH: If assistant asks for phone while still in email_received, treat it like email_confirmed
        if (role === 'assistant' && (
          lowerTranscript.includes('phone') ||
          lowerTranscript.includes('number') ||
          lowerTranscript.includes('reach you')
        )) {
          console.log(`[Workflow] ✅ Phone trigger detected in email_received! Force transitioning to phone_request and showing UI`);
          state.emailConfirmed = true;
          state.currentPhase = 'phone_request';

          // Trigger UI to show phone input
          return {
            state,
            uiAction: {
              type: 'show_text_input',
              inputType: 'phone'
            }
          };
        }
        break;

      case 'email_confirmed':
        // AI should ask for phone, then show UI
        if (role === 'assistant' && (
          lowerTranscript.includes('phone') ||
          lowerTranscript.includes('number') ||
          lowerTranscript.includes('reach you')
        )) {
          console.log(`[Workflow] ✅ Phone trigger detected! Transitioning to phone_request and showing UI`);
          state.currentPhase = 'phone_request';

          // Trigger UI to show phone input
          return {
            state,
            uiAction: {
              type: 'show_text_input',
              inputType: 'phone'
            }
          };
        }
        break;

      case 'phone_request':
        // User provided phone (either typed or spoken)
        console.log(`[Workflow] Checking if transcript contains phone: "${transcript}"`);
        const hasPhone = this.containsPhone(transcript);
        console.log(`[Workflow] containsPhone result: ${hasPhone}`);

        if (role === 'user' && hasPhone) {
          const phone = this.extractPhone(transcript);
          console.log(`[Workflow] extractPhone result: ${phone}`);

          if (phone) {
            console.log(`[Workflow] ✅ Phone extracted: ${phone}, transitioning to phone_received`);
            state.phone = phone;
            state.currentPhase = 'phone_received';

            // Hide the phone input UI
            return {
              state,
              uiAction: {
                type: 'hide_text_input'
              },
              aiResponse: `Just to confirm, your number is ${this.formatPhone(phone)}, correct?`
            };
          }
        }
        break;

      case 'phone_received':
        // Waiting for phone confirmation
        if (role === 'user') {
          const confirmed = this.isAffirmative(transcript);
          if (confirmed) {
            console.log(`[Workflow] ✅ Phone confirmed! Transitioning to phone_confirmed`);
            state.phoneConfirmed = true;
            state.currentPhase = 'phone_confirmed';

            return {
              state,
              aiResponse: `Perfect! I have all your information. Is there anything else you'd like to know before we wrap up?`
            };
          } else if (this.isNegative(transcript)) {
            console.log(`[Workflow] Phone rejected, asking again`);
            // Phone was wrong, ask again
            state.currentPhase = 'phone_request';
            state.phone = undefined;

            return {
              state,
              uiAction: {
                type: 'show_text_input',
                inputType: 'phone'
              },
              aiResponse: `No problem! Let me get the correct number. Please type your phone number on the screen.`
            };
          }
        }
        break;

      case 'phone_confirmed':
        // Transition to qualified once phone is confirmed
        if (role === 'assistant') {
          console.log(`[Workflow] Phone confirmed, transitioning to qualified`);
          state.currentPhase = 'qualified';
        }
        break;

      case 'qualified':
        console.log(`[Workflow] Lead is qualified! Name: ${state.name}, Email: ${state.email}, Phone: ${state.phone}`);

        // Check if assistant is delivering the warm closing
        if (role === 'assistant' && (
          lowerTranscript.includes('awesome') ||
          lowerTranscript.includes('thank you for your time') ||
          lowerTranscript.includes('have a great day') ||
          lowerTranscript.includes('our team will reach out')
        )) {
          console.log(`[Workflow] ✅ Assistant delivered warm closing, scheduling call end`);
          state.currentPhase = 'closing';

          // Schedule end_call action to happen after AI finishes speaking
          // This happens when the transcript is synced, so we queue it for next sync
          return {
            state,
            uiAction: {
              type: 'schedule_end_call',
              delay: 1500 // 1.5 seconds after AI finishes speaking
            }
          };
        }

        // Lead is fully qualified - can answer questions or end call
        if (role === 'user' && (
          lowerTranscript.includes('no') ||
          lowerTranscript.includes('that\'s all') ||
          lowerTranscript.includes('that\'s it') ||
          lowerTranscript.includes('nothing else') ||
          lowerTranscript.includes('that\'s everything')
        )) {
          console.log(`[Workflow] User ready to end call, generating closing message`);

          // Generate personalized closing message
          const userName = state.name ? state.name : '';
          const userNeed = state.painPoint ? state.painPoint : 'your data and AI needs';

          return {
            state,
            aiResponse: userName
              ? `Awesome, thank you for your time ${userName}! Our team will reach out shortly to discuss ${userNeed}. Have a great day!`
              : `Awesome, thank you for your time! Our team will reach out shortly to discuss ${userNeed}. Have a great day!`
          };
        }
        break;

      case 'closing':
        // Final phase - call should end automatically after closing message
        // If we're here and it's been more than a few seconds, force end call
        console.log(`[Workflow] In closing phase, ending call`);
        state.currentPhase = 'completed';
        return {
          state,
          uiAction: {
            type: 'end_call'
          }
        };
        break;
    }

    return { state };
  }

  /**
   * Extract information from conversation
   */
  private extractInformation(state: LeadQualificationState, transcript: string, role: string): void {
    if (role !== 'user') return;

    const lower = transcript.toLowerCase();

    // Extract name - flexible patterns
    if (!state.name && state.currentPhase === 'name_request') {
      // Match patterns like "I'm X", "My name is X", "It's X", "This is X"
      const namePatterns = [
        /(?:my name is|i'm|i am|it's|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
        /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/i  // Just a name by itself
      ];

      for (const pattern of namePatterns) {
        const match = transcript.match(pattern);
        if (match) {
          state.name = match[1].trim();
          console.log(`[Workflow] Extracted name: ${state.name}`);
          break;
        }
      }
    }

    // Extract company name - more flexible patterns
    if (!state.company) {
      // Match patterns like "My company name is X" or "work at X" or "from X" or "I'm at X"
      const companyPatterns = [
        /company (?:name )?is ([A-Z][A-Za-z\s&]+)/i,
        /work (?:at|for) ([A-Z][A-Za-z\s&]+)/i,
        /from ([A-Z][A-Za-z\s&]+)/i,
        /(?:I'm|I am) at ([A-Z][A-Za-z\s&]+)/i
      ];

      for (const pattern of companyPatterns) {
        const match = transcript.match(pattern);
        if (match) {
          state.company = match[1].trim();
          console.log(`[Workflow] Extracted company: ${state.company}`);
          break;
        }
      }
    }

    // Extract pain points
    if (lower.includes('need') || lower.includes('looking for') || lower.includes('looking to') || lower.includes('problem') || lower.includes('automate')) {
      if (!state.painPoint) {
        state.painPoint = transcript;
        console.log(`[Workflow] Extracted pain point: ${state.painPoint}`);
      }
    }

    // Extract timeline
    if (lower.match(/\b(week|month|quarter|year|asap|urgent|soon|within)\b/)) {
      if (!state.timeline) {
        state.timeline = transcript;
        console.log(`[Workflow] Extracted timeline: ${state.timeline}`);
      }
    }
  }

  /**
   * Helper: Check if transcript contains email
   */
  private containsEmail(text: string): boolean {
    return /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  }

  /**
   * Helper: Extract email from text
   */
  private extractEmail(text: string): string | null {
    const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1].toLowerCase() : null;
  }

  /**
   * Helper: Convert spoken numbers to digits
   */
  private convertSpokenToDigits(text: string): string {
    const numberWords: { [key: string]: string } = {
      'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
      'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
      'oh': '0' // "oh" is often used instead of "zero"
    };

    let converted = text.toLowerCase();
    console.log(`[Workflow] Converting spoken to digits - Input: "${text}"`);

    for (const [word, digit] of Object.entries(numberWords)) {
      converted = converted.replace(new RegExp(`\\b${word}\\b`, 'g'), digit);
    }

    console.log(`[Workflow] Converting spoken to digits - Output: "${converted}"`);
    return converted;
  }

  /**
   * Helper: Check if transcript contains phone number
   */
  private containsPhone(text: string): boolean {
    // First try to convert spoken numbers to digits
    const converted = this.convertSpokenToDigits(text);

    // Check for formatted phone number pattern
    if (/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/.test(converted)) {
      return true;
    }

    // Check for 10 consecutive digits (with possible spaces)
    const digitsOnly = converted.replace(/[^\d]/g, '');
    return digitsOnly.length === 10 || digitsOnly.length === 11;
  }

  /**
   * Helper: Extract phone from text
   */
  private extractPhone(text: string): string | null {
    // First try to convert spoken numbers to digits
    const converted = this.convertSpokenToDigits(text);

    // Try formatted phone number pattern
    const formattedMatch = converted.match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
    if (formattedMatch) {
      return formattedMatch[0].replace(/[^\d]/g, '');
    }

    // Try extracting all digits
    const digitsOnly = converted.replace(/[^\d]/g, '');
    if (digitsOnly.length === 10 || (digitsOnly.length === 11 && digitsOnly[0] === '1')) {
      return digitsOnly;
    }

    return null;
  }

  /**
   * Helper: Format phone for display
   */
  private formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  }

  /**
   * Helper: Check if response is affirmative
   */
  private isAffirmative(text: string): boolean {
    const lower = text.toLowerCase().trim();
    return /^(yes|yeah|yep|yup|correct|right|exactly|sure|absolutely|that's right|that's correct)/.test(lower);
  }

  /**
   * Helper: Check if response is negative
   */
  private isNegative(text: string): boolean {
    const lower = text.toLowerCase().trim();
    return /^(no|nope|nah|wrong|incorrect|not right)/.test(lower);
  }

  /**
   * Check if lead is qualified (has all required info)
   */
  isQualified(sessionId: string): boolean {
    const state = this.getState(sessionId);
    if (!state) return false;

    return !!(
      state.email &&
      state.emailConfirmed &&
      state.phone &&
      state.phoneConfirmed
    );
  }

  /**
   * Get qualified lead data
   */
  getLeadData(sessionId: string) {
    const state = this.getState(sessionId);
    if (!state || !this.isQualified(sessionId)) {
      return null;
    }

    return {
      name: state.name,
      company: state.company,
      email: state.email,
      phone: state.phone,
      painPoint: state.painPoint,
      budget: state.budget,
      timeline: state.timeline,
      conversationHistory: state.conversationHistory,
      qualifiedAt: new Date()
    };
  }
}

export const leadQualificationWorkflow = new LeadQualificationWorkflow();
