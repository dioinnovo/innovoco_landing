/**
 * LangGraph State Definition for Lead Qualification
 *
 * State management using LangGraph Annotation.Root pattern
 * Following best practices from LangGraph.js documentation (Jan 2025)
 */

import { Annotation } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';

/**
 * Lead information structure
 */
export interface LeadInfo {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  painPoint?: string;
  budget?: string;
  timeline?: string;
}

/**
 * Phase type for strict type checking
 */
export type Phase =
  | 'greeting'
  | 'name'
  | 'company'
  | 'painPoint'
  | 'email'
  | 'emailConfirm'
  | 'phone'
  | 'phoneConfirm'
  | 'qualified'
  | 'closing'
  | 'completed';

/**
 * Lead Qualification State Annotation
 *
 * Defines the shape and update logic for all state in the graph
 */
export const LeadQualificationAnnotation = Annotation.Root({
  /**
   * Conversation messages
   * Uses append pattern - new messages are concatenated to existing
   */
  messages: Annotation<BaseMessage[]>({
    value: (current, update) => {
      if (!update) return current;
      return Array.isArray(update) ? current.concat(update) : current.concat([update]);
    },
    default: () => [],
  }),

  /**
   * Current phase - drives graph routing
   * Uses override pattern - new value replaces old
   */
  phase: Annotation<Phase>({
    value: (_, update) => update ?? 'greeting',
    default: () => 'greeting',
  }),

  /**
   * Lead information collected during conversation
   * Uses merge pattern - new fields merged with existing
   */
  leadInfo: Annotation<LeadInfo>({
    value: (current, update) => {
      if (!update) return current;
      return { ...current, ...update };
    },
    default: () => ({}),
  }),

  /**
   * Email confirmation flag
   */
  emailConfirmed: Annotation<boolean>({
    value: (_, update) => update ?? false,
    default: () => false,
  }),

  /**
   * Phone confirmation flag
   */
  phoneConfirmed: Annotation<boolean>({
    value: (_, update) => update ?? false,
    default: () => false,
  }),

  /**
   * UI action to trigger (show email input, phone input, etc.)
   * Always takes latest value
   */
  uiAction: Annotation<any | null>({
    value: (_, update) => update,
    default: () => null,
  }),

  /**
   * AI response to send back to user
   * Used when workflow needs to override AI's response
   */
  aiResponse: Annotation<string | null>({
    value: (_, update) => update,
    default: () => null,
  }),

  /**
   * Session identifier
   */
  sessionId: Annotation<string>({
    value: (current, update) => update ?? current,
    default: () => '',
  }),

  /**
   * Error message if something goes wrong
   */
  error: Annotation<string | null>({
    value: (_, update) => update,
    default: () => null,
  }),

  /**
   * Retry counter for each field
   * Prevents infinite loops if extraction fails
   */
  retries: Annotation<Record<string, number>>({
    value: (current, update) => {
      if (!update) return current;
      return { ...current, ...update };
    },
    default: () => ({}),
  }),

  /**
   * Last transcript processed
   * Used for extraction and validation
   */
  lastTranscript: Annotation<string>({
    value: (_, update) => update ?? '',
    default: () => '',
  }),

  /**
   * Last speaker (user or assistant)
   * Used to track conversation flow
   */
  lastRole: Annotation<'user' | 'assistant' | null>({
    value: (_, update) => update,
    default: () => null,
  }),

  /**
   * Timestamp of state update
   */
  updatedAt: Annotation<Date>({
    value: () => new Date(),
    default: () => new Date(),
  }),
});

/**
 * Type alias for the state
 */
export type LeadQualificationState = typeof LeadQualificationAnnotation.State;

/**
 * Helper function to check if lead is qualified
 */
export function isLeadQualified(state: LeadQualificationState): boolean {
  const { leadInfo, emailConfirmed, phoneConfirmed } = state;
  return !!(
    leadInfo.email &&
    emailConfirmed &&
    leadInfo.phone &&
    phoneConfirmed
  );
}

/**
 * Helper function to get qualified lead data
 */
export function getQualifiedLeadData(state: LeadQualificationState) {
  if (!isLeadQualified(state)) {
    return null;
  }

  return {
    name: state.leadInfo.name,
    company: state.leadInfo.company,
    email: state.leadInfo.email,
    phone: state.leadInfo.phone,
    painPoint: state.leadInfo.painPoint,
    budget: state.leadInfo.budget,
    timeline: state.leadInfo.timeline,
    qualifiedAt: new Date(),
  };
}
