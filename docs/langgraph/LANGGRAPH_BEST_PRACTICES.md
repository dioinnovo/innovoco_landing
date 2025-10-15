# LangGraph Best Practices - CORRECTED GUIDE

## ⚠️ CRITICAL: Documentation Corrections

This document corrects misleading patterns found in initial implementation documentation and provides the **CORRECT** LangGraph.js patterns verified against official documentation (January 2025).

---

## 🚨 Common Mistake: Self-Looping Nodes

### ❌ WRONG PATTERN (Causes Recursion Error)

**DO NOT DO THIS:**

```typescript
// WRONG: Routing function that loops nodes back to themselves
function routeFromPhase(state: LeadQualificationState): string {
  switch (state.phase) {
    case 'name':
      return state.leadInfo.name ? 'company' : 'name';  // ← INFINITE LOOP!
    case 'company':
      return state.leadInfo.company ? 'painPoint' : 'company';  // ← INFINITE LOOP!
    // ... etc
  }
}

// WRONG: Conditional edges with self-loops
.addConditionalEdges('name', routeFromPhase, {
  name: 'name',      // ← This creates infinite recursion!
  company: 'company',
  [END]: END,
})
```

**Why This Fails:**
- When `nameNode` returns `{ phase: 'name' }`, routing returns `'name'`
- This triggers `nameNode` again immediately
- Graph hits recursion limit of 25 iterations
- Results in `GraphRecursionError`

---

## ✅ CORRECT PATTERN: Return END When Waiting

### How LangGraph Actually Works

From official documentation:
> "When you call `graph.invoke()`, the graph executes through a series of 'super-steps'. The graph terminates when all nodes become 'inactive' and no messages are in transit."

**Key Principle**: Nodes should return `END` when waiting for user input, NOT loop back to themselves.

### ✅ CORRECT Implementation

```typescript
/**
 * CORRECT: Routing function that returns END when waiting
 */
function routeFromPhase(state: LeadQualificationState): string {
  const { phase, emailConfirmed, phoneConfirmed, leadInfo } = state;

  switch (phase) {
    case 'greeting':
      return 'name';  // Always proceed to name

    case 'name':
      // If we have name, move forward. Otherwise END (wait for next invoke)
      return leadInfo.name ? 'company' : '__end__';  // ✅ CORRECT

    case 'company':
      return leadInfo.company ? 'painPoint' : '__end__';  // ✅ CORRECT

    case 'painPoint':
      return leadInfo.painPoint ? 'email' : '__end__';  // ✅ CORRECT

    case 'email':
      return leadInfo.email ? 'emailConfirm' : '__end__';  // ✅ CORRECT

    case 'emailConfirm':
      // Wait for confirmation
      return emailConfirmed ? 'phone' : '__end__';  // ✅ CORRECT

    case 'phone':
      return leadInfo.phone ? 'phoneConfirm' : '__end__';  // ✅ CORRECT

    case 'phoneConfirm':
      return phoneConfirmed ? 'qualified' : '__end__';  // ✅ CORRECT

    case 'qualified':
      return '__end__';  // ✅ Always end when qualified

    default:
      return '__end__';
  }
}
```

### ✅ CORRECT Graph Construction

```typescript
/**
 * CORRECT: Simplified conditional edges without explicit mappings
 */
const workflow = new StateGraph(LeadQualificationAnnotation)
  .addNode('greeting', greetingNode)
  .addNode('name', nameNode)
  .addNode('company', companyNode)
  .addNode('painPoint', painPointNode)
  .addNode('email', emailNode)
  .addNode('emailConfirm', emailConfirmNode)
  .addNode('phone', phoneNode)
  .addNode('phoneConfirm', phoneConfirmNode)
  .addNode('qualified', qualifiedNode)
  .addEdge(START, 'greeting')

  // CORRECT: Let routing function determine next node OR END
  .addConditionalEdges('greeting', routeFromPhase)
  .addConditionalEdges('name', routeFromPhase)
  .addConditionalEdges('company', routeFromPhase)
  .addConditionalEdges('painPoint', routeFromPhase)
  .addConditionalEdges('email', routeFromPhase)
  .addConditionalEdges('emailConfirm', routeFromPhase)
  .addConditionalEdges('phone', routeFromPhase)
  .addConditionalEdges('phoneConfirm', routeFromPhase)
  .addConditionalEdges('qualified', routeFromPhase);

return workflow.compile();
```

**Why This Works:**
- When data is missing, routing returns `'__end__'`
- Graph stops execution and returns current state
- Next `graph.invoke()` picks up where it left off
- State is preserved between invocations
- No infinite loops!

---

## 🔄 Proper Invocation Pattern

### ✅ CORRECT: Invoke Graph Per Conversation Turn

```typescript
/**
 * CORRECT: Process each transcript by invoking the graph once
 */
export async function processTranscript(
  sessionId: string,
  transcript: string,
  role: 'user' | 'assistant'
) {
  // Get current state
  const currentState = await getOrCreateSession(sessionId);

  // Update state with new transcript
  const inputState = {
    ...currentState,
    lastTranscript: transcript,
    lastRole: role,
  };

  // Invoke graph - it will execute until it hits END
  const result = await graph.invoke(inputState);

  // Save updated state
  sessions.set(sessionId, result);

  return {
    state: result,
    uiAction: result.uiAction,
    aiResponse: result.aiResponse,
  };
}
```

### How It Flows

**First Invocation** (assistant greeting):
1. Input: `{ phase: 'greeting', lastRole: 'assistant', lastTranscript: '...' }`
2. Graph executes: `greeting → name (returns END)`
3. Output: `{ phase: 'name', ...  }`
4. Graph stops, waits for next invoke

**Second Invocation** (user provides name):
1. Input: `{ phase: 'name', lastRole: 'user', lastTranscript: 'My name is John' }`
2. Graph executes: `name` (extracts name) `→ company (returns END)`
3. Output: `{ phase: 'company', leadInfo: { name: 'John' } }`
4. Graph stops again

**And so on...**

---

## 📊 Node Design Patterns

### ✅ CORRECT Node Structure

```typescript
/**
 * CORRECT: Node that updates state and returns next phase
 */
export async function emailNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  const { leadInfo, lastTranscript, lastRole, retries } = state;

  // Already have email? Move forward
  if (leadInfo.email) {
    return { phase: 'emailConfirm' };
  }

  // User giving feedback? Stay in email phase and acknowledge
  if (lastRole === 'user' && isFeedbackOrQuestion(lastTranscript)) {
    return {
      phase: 'email',
      aiResponse: 'I understand. Please type your email when ready.',
    };
  }

  // Try to extract email from transcript
  if (lastRole === 'user' && containsEmail(lastTranscript)) {
    const email = extractEmail(lastTranscript);
    if (email) {
      return {
        leadInfo: { ...leadInfo, email },
        phase: 'emailConfirm',
        uiAction: { type: 'hide_text_input' },
      };
    }
  }

  // Retry limit reached? Skip this field
  if (hasReachedRetryLimit(retries, 'email')) {
    return {
      phase: 'phone',
      uiAction: null,
    };
  }

  // Show UI when assistant asks for email
  if (lastRole === 'assistant') {
    return {
      phase: 'email',
      uiAction: {
        type: 'show_text_input',
        inputType: 'email',
      },
      retries: incrementRetry(retries, 'email'),
    };
  }

  // Default: stay in email phase
  return { phase: 'email' };
}
```

**Key Points:**
- Node returns partial state update
- Node decides next phase based on conditions
- Routing function uses the returned phase to determine next node
- No direct calls to other nodes
- State is immutable - return new object, don't mutate

---

## 🎯 Critical Validation Pattern

### Phone Node Example: Enforcing Prerequisites

```typescript
export async function phoneNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  const { leadInfo, emailConfirmed, lastTranscript, lastRole, retries } = state;

  // CRITICAL: Cannot proceed without email confirmation
  if (!emailConfirmed) {
    console.log('[phoneNode] ⚠️  Email not confirmed, forcing back');
    return {
      phase: 'emailConfirm',
      aiResponse: 'Let me first confirm your email before we proceed.',
    };
  }

  // Rest of phone collection logic...
}
```

**This is the fix for the original bug!**
- Old system: Keywords failed, phone UI never appeared
- New system: State validation enforces email confirmation first
- Graph cannot skip required steps

---

## 🔁 State Persistence Between Invocations

### How State Flows

```typescript
// First invoke - Greeting
await graph.invoke({
  phase: 'greeting',
  leadInfo: {}
});
// Returns: { phase: 'name', leadInfo: {} }

// Second invoke - Name collection
await graph.invoke({
  phase: 'name',           // ← Preserved from previous
  leadInfo: {},            // ← Preserved from previous
  lastTranscript: 'John',
  lastRole: 'user',
});
// Returns: { phase: 'company', leadInfo: { name: 'John' } }

// Third invoke - Company collection
await graph.invoke({
  phase: 'company',                 // ← Preserved
  leadInfo: { name: 'John' },       // ← Preserved
  lastTranscript: 'Acme Corp',
  lastRole: 'user',
});
// Returns: { phase: 'painPoint', leadInfo: { name: 'John', company: 'Acme Corp' } }
```

**State accumulates over time** - each invoke adds to it.

---

## 🚀 Recursion Limit Configuration

### When to Increase Limit

```typescript
// ONLY increase if your graph legitimately needs many iterations
return workflow.compile({
  recursionLimit: 50,  // Default is 25
});
```

### When NOT to Increase

**If you're hitting the limit, it's usually because:**
1. ❌ Nodes are looping back to themselves
2. ❌ Routing function doesn't return `END`
3. ❌ Graph design has cycles

**Fix the design first, don't just increase the limit!**

---

## 📝 Documentation Audit Results

### Files Reviewed

1. ✅ **`lead-graph-state.ts`** - CORRECT (good state definition)
2. ✅ **`utils/extractors.ts`** - CORRECT (utility functions)
3. ✅ **`utils/validators.ts`** - CORRECT (validation logic)
4. ✅ **`nodes.ts`** - CORRECT (all nodes properly structured)
5. ✅ **`routing.ts`** - NOW CORRECT (fixed to return END)
6. ✅ **`lead-qualification-graph.ts`** - NOW CORRECT (simplified edges)
7. ✅ **`graph-manager.ts`** - NOW CORRECT (proper invoke pattern)

### Documentation Files Status

❌ **`LANGGRAPH_IMPLEMENTATION_PLAN.md`** (lines 224-250)
- Shows routing WITHOUT END returns
- **MISLEADING** - needs correction

❌ **`LANGGRAPH_IMPLEMENTATION_COMPLETE.md`** (line 115)
- Shows `return 'emailConfirm'` instead of `return '__end__'`
- **MISLEADING** - needs correction

✅ **`LANGGRAPH_BEST_PRACTICES.md`** (this file)
- **CORRECT** - use this as the source of truth

---

## 📚 Official LangGraph Resources

### Verified Documentation (January 2025)

1. **Concepts - Low Level**
   https://langchain-ai.github.io/langgraphjs/concepts/low_level/
   - How graphs execute
   - Super-steps and termination
   - State management

2. **How-Tos**
   https://langchain-ai.github.io/langgraphjs/how-tos/
   - Streaming patterns
   - State persistence
   - Error handling

3. **Troubleshooting - Recursion Limit**
   https://langchain-ai.github.io/langgraphjs/troubleshooting/errors/GRAPH_RECURSION_LIMIT/
   - Why it happens
   - How to fix it
   - When to increase limit

---

## ✅ Replication Checklist

To replicate this implementation for any other AI agent:

1. **Define State Schema**
   - Use `Annotation.Root` pattern
   - Define all state fields with proper reducers
   - Include phase/status field for routing

2. **Create Utility Functions**
   - Extraction logic (separate from business logic)
   - Validation functions
   - Helper functions

3. **Implement Nodes**
   - One responsibility per node
   - Return partial state updates
   - Include next phase in return value

4. **Design Routing Logic**
   - **CRITICAL**: Return `'__end__'` when waiting for input
   - Never return the same node (no self-loops)
   - Validate prerequisites before progression

5. **Build Graph**
   - Add all nodes
   - Set entry point with `addEdge(START, 'firstNode')`
   - Add conditional edges WITHOUT explicit mappings
   - Compile with appropriate recursion limit

6. **Create Manager**
   - Session storage (Map for dev, Redis for production)
   - Singleton compiled graph
   - Simple invoke wrapper

7. **Test Thoroughly**
   - Unit test each node
   - Integration test full flow
   - Verify no recursion errors
   - Test edge cases (rejections, retries, feedback)

---

## 🎯 Summary: The Fix

### The Problem
Nodes routing back to themselves caused infinite loops and recursion errors.

### The Solution
Nodes return `'__end__'` when waiting for user input, graph stops naturally.

### The Pattern
```typescript
// Routing logic
return hasRequiredData ? 'nextNode' : '__end__';

// NOT this:
return hasRequiredData ? 'nextNode' : 'sameNode';  // ❌ WRONG
```

---

**Created**: 2025-10-14
**Based on**: Official LangGraph.js docs (January 2025)
**Status**: ✅ VERIFIED CORRECT
**Use**: This document for replication, not the other docs (until they're updated)
