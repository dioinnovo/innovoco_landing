/**
 * LangGraph Session Manager
 *
 * Manages multiple graph sessions for different users
 * Provides singleton pattern for graph instances
 */

import { buildLeadQualificationGraph, createLeadQualificationSession } from './lead-qualification-graph';
import { LeadQualificationState } from './lead-graph-state';
import { getQualifiedLeadData, isLeadQualified } from './lead-graph-state';

/**
 * Session storage
 * In production, this should be Redis or a proper session store
 */
const sessions = new Map<string, LeadQualificationState>();

/**
 * Compiled graph instance (singleton)
 */
let compiledGraph: any = null;

/**
 * Get or create a session
 */
export async function getOrCreateSession(sessionId: string): Promise<LeadQualificationState> {
  // Check if session already exists
  if (sessions.has(sessionId)) {
    return sessions.get(sessionId)!;
  }

  // Create new session with initial state
  console.log(`[GraphManager] Creating new session: ${sessionId}`);
  const { initialState } = await createLeadQualificationSession(sessionId);

  // Store session
  sessions.set(sessionId, initialState as LeadQualificationState);

  return initialState as LeadQualificationState;
}

/**
 * Get the compiled graph (singleton)
 */
function getGraph() {
  if (!compiledGraph) {
    console.log('[GraphManager] Compiling StateGraph...');
    compiledGraph = buildLeadQualificationGraph();
    console.log('[GraphManager] ✅ StateGraph compiled and cached');
  }
  return compiledGraph;
}

/**
 * Process a transcript through the LangGraph workflow
 *
 * FIXED PATTERN (with persistence):
 * 1. Update state with new transcript
 * 2. Invoke graph with thread_id for persistence
 * 3. Graph executes nodes until it hits END
 * 4. Return final state with UI actions
 *
 * @param sessionId - Unique session identifier
 * @param transcript - User or assistant transcript
 * @param role - Speaker role
 * @returns Workflow result with state and actions
 */
export async function processTranscript(
  sessionId: string,
  transcript: string,
  role: 'user' | 'assistant'
): Promise<{
  state: LeadQualificationState;
  uiAction: any | null;
  aiResponse: string | null;
}> {
  // Get or create session
  const currentState = await getOrCreateSession(sessionId);

  // Update state with new transcript
  const inputState: Partial<LeadQualificationState> = {
    ...currentState,
    lastTranscript: transcript,
    lastRole: role,
  };

  // Get compiled graph
  const graph = getGraph();

  // Configuration for persistence
  const config = {
    configurable: { thread_id: sessionId },
    recursionLimit: 50,
  };

  // Invoke graph with persistence - it will execute until it hits END
  console.log(`[GraphManager] Invoking graph from phase: ${currentState.phase}`);
  console.log(`[GraphManager] Input role: ${role}, transcript: "${transcript.substring(0, 50)}..."`);

  const result = await graph.invoke(inputState, config);

  console.log(`[GraphManager] Phase: ${currentState.phase} → ${result.phase}`);
  if (result.uiAction) {
    console.log(`[GraphManager] 🎯 UI Action:`, result.uiAction);
  }
  if (result.aiResponse) {
    console.log(`[GraphManager] 💬 AI Response: "${result.aiResponse.substring(0, 50)}..."`);
  }

  // Update session storage
  sessions.set(sessionId, result);

  // Return result
  return {
    state: result,
    uiAction: result.uiAction,
    aiResponse: result.aiResponse,
  };
}

/**
 * Check if a lead is qualified
 */
export function isQualified(sessionId: string): boolean {
  const state = sessions.get(sessionId);
  if (!state) return false;

  return isLeadQualified(state);
}

/**
 * Get qualified lead data
 */
export function getLeadData(sessionId: string) {
  const state = sessions.get(sessionId);
  if (!state) return null;

  return getQualifiedLeadData(state);
}

/**
 * Get current session state
 */
export function getSessionState(sessionId: string): LeadQualificationState | null {
  return sessions.get(sessionId) || null;
}

/**
 * Clear a session (for testing or cleanup)
 */
export function clearSession(sessionId: string): void {
  sessions.delete(sessionId);
  console.log(`[GraphManager] Cleared session: ${sessionId}`);
}

/**
 * Get all active sessions (for monitoring)
 */
export function getActiveSessions(): string[] {
  return Array.from(sessions.keys());
}

/**
 * Get session count (for monitoring)
 */
export function getSessionCount(): number {
  return sessions.size;
}
