/**
 * LangGraph StateGraph - Lead Qualification
 *
 * Complete graph implementation following LangGraph.js best practices (Jan 2025)
 * This is the ACTUAL StateGraph orchestration that manages the lead qualification flow
 *
 * FIXED IMPLEMENTATION:
 * - Removed router pattern to prevent infinite loops
 * - Added persistence with MemorySaver
 * - Proper linear flow with conditional edges
 * - Command pattern for better control
 */

import { StateGraph, START, END, MemorySaver } from '@langchain/langgraph';
import { LeadQualificationAnnotation, LeadQualificationState } from './lead-graph-state';
import {
  greetingNode,
  nameNode,
  companyNode,
  painPointNode,
  emailNode,
  emailConfirmNode,
  phoneNode,
  phoneConfirmNode,
  qualifiedNode,
} from './nodes';

/**
 * Create checkpointer for persistence
 * In production, use SqliteSaver or PostgresSaver
 */
const checkpointer = new MemorySaver();

/**
 * Conditional routing functions for each node
 * Each function checks if data was collected and routes accordingly
 */

function shouldProceedFromGreeting(state: LeadQualificationState): 'name' | typeof END {
  // If we have user input, proceed to name collection
  if (state.lastRole === 'user' && state.lastTranscript) {
    return 'name';
  }
  return END;
}

function shouldProceedFromName(state: LeadQualificationState): 'company' | typeof END {
  // If we have a name, proceed to company
  if (state.leadInfo.name) {
    return 'company';
  }
  return END;
}

function shouldProceedFromCompany(state: LeadQualificationState): 'painPoint' | typeof END {
  // If we have company, proceed to pain point
  if (state.leadInfo.company) {
    return 'painPoint';
  }
  return END;
}

function shouldProceedFromPainPoint(state: LeadQualificationState): 'email' | typeof END {
  // If we have pain point, proceed to email
  if (state.leadInfo.painPoint) {
    return 'email';
  }
  return END;
}

function shouldProceedFromEmail(state: LeadQualificationState): 'emailConfirm' | typeof END {
  // If we have email, proceed to confirmation
  if (state.leadInfo.email) {
    return 'emailConfirm';
  }
  return END;
}

function shouldProceedFromEmailConfirm(state: LeadQualificationState): 'phone' | 'email' | typeof END {
  // If email is confirmed, proceed to phone
  if (state.emailConfirmed) {
    return 'phone';
  }
  // If email was rejected, go back to email collection
  if (state.phase === 'email') {
    return 'email';
  }
  return END;
}

function shouldProceedFromPhone(state: LeadQualificationState): 'phoneConfirm' | typeof END {
  // If we have phone, proceed to confirmation
  if (state.leadInfo.phone) {
    return 'phoneConfirm';
  }
  return END;
}

function shouldProceedFromPhoneConfirm(state: LeadQualificationState): 'qualified' | 'phone' | typeof END {
  // If phone is confirmed, proceed to qualified
  if (state.phoneConfirmed) {
    return 'qualified';
  }
  // If phone was rejected, go back to phone collection
  if (state.phase === 'phone') {
    return 'phone';
  }
  return END;
}

/**
 * Build and compile the Lead Qualification StateGraph
 *
 * FIXED Graph Flow:
 * START → greeting → name → company → painPoint → email → emailConfirm → phone → phoneConfirm → qualified → END
 *
 * Key Features:
 * - Direct node-to-node transitions (no router)
 * - Conditional edges based on state validation
 * - Persistence with checkpointing
 * - Phone collection REQUIRES email confirmation
 * - Proper END conditions to prevent infinite loops
 */
export function buildLeadQualificationGraph() {
  console.log('[Graph] Building Lead Qualification StateGraph with persistence...');

  const workflow = new StateGraph(LeadQualificationAnnotation)
    // Add all phase-specific nodes
    .addNode('greeting', greetingNode)
    .addNode('name', nameNode)
    .addNode('company', companyNode)
    .addNode('painPoint', painPointNode)
    .addNode('email', emailNode)
    .addNode('emailConfirm', emailConfirmNode)
    .addNode('phone', phoneNode)
    .addNode('phoneConfirm', phoneConfirmNode)
    .addNode('qualified', qualifiedNode)

    // Set entry point
    .addEdge(START, 'greeting')

    // Add conditional edges for each node
    .addConditionalEdges('greeting', shouldProceedFromGreeting)
    .addConditionalEdges('name', shouldProceedFromName)
    .addConditionalEdges('company', shouldProceedFromCompany)
    .addConditionalEdges('painPoint', shouldProceedFromPainPoint)
    .addConditionalEdges('email', shouldProceedFromEmail)
    .addConditionalEdges('emailConfirm', shouldProceedFromEmailConfirm)
    .addConditionalEdges('phone', shouldProceedFromPhone)
    .addConditionalEdges('phoneConfirm', shouldProceedFromPhoneConfirm)

    // Qualified node always ends
    .addEdge('qualified', END);

  console.log('[Graph] ✅ StateGraph built successfully with persistence');

  return workflow.compile({
    checkpointer, // Enable persistence
    // No recursion limit needed - graph has proper END conditions
  });
}

/**
 * Create a new graph instance with initial state
 */
export async function createLeadQualificationSession(sessionId: string) {
  const graph = buildLeadQualificationGraph();

  const initialState: Partial<LeadQualificationState> = {
    sessionId,
    phase: 'greeting',
    leadInfo: {},
    emailConfirmed: false,
    phoneConfirmed: false,
    retries: {},
    messages: [],
    lastTranscript: '',
    lastRole: null,
    uiAction: null,
    aiResponse: null,
    error: null,
  };

  console.log(`[Graph] Created new session: ${sessionId}`);
  return { graph, initialState };
}

/**
 * Process a conversation turn through the graph with persistence
 *
 * @param graph - The compiled StateGraph
 * @param sessionId - Session ID for persistence
 * @param currentState - Current state
 * @param transcript - User's transcript
 * @param role - Speaker role ('user' or 'assistant')
 * @returns Updated state after graph execution
 */
export async function processConversationTurn(
  graph: any,
  sessionId: string,
  currentState: LeadQualificationState,
  transcript: string,
  role: 'user' | 'assistant'
): Promise<LeadQualificationState> {
  console.log(`[Graph] Processing ${role} turn: "${transcript.substring(0, 50)}..."`);

  // Update state with new transcript
  const updatedState: Partial<LeadQualificationState> = {
    ...currentState,
    lastTranscript: transcript,
    lastRole: role,
  };

  // Invoke graph with thread_id for persistence
  const config = {
    configurable: { thread_id: sessionId },
    recursionLimit: 50,
  };

  const result = await graph.invoke(updatedState, config);

  console.log(`[Graph] Phase transition: ${currentState.phase} → ${result.phase}`);
  if (result.uiAction) {
    console.log(`[Graph] UI Action: ${JSON.stringify(result.uiAction)}`);
  }

  return result as LeadQualificationState;
}
