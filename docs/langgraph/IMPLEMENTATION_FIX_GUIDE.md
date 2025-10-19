# LangGraph Lead Agent - Implementation Fix Guide

## Quick Reference: The Problem

**Current Behavior:**
```
User: "My name is John"
  ↓
graph.invoke() executes:
  1. greetingNode → routes to name
  2. nameNode (extracts "John") → routes to company
  3. companyNode (tries to extract from "My name is John", fails)
  ↓
Agent: "I didn't catch your company name..."  ❌ SKIPPED NAME CONFIRMATION!
```

**Expected Behavior:**
```
User: "My name is John"
  ↓
graph.invoke() executes:
  1. greetingNode → PAUSES at interrupt()
  ↓
Agent: "What's your name?"

User: "John"
  ↓
graph.invoke(Command({ resume: "John" })) continues:
  2. greetingNode → extracts "John" → routes to nameNode → PAUSES
  ↓
Agent: "Nice to meet you, John! What company do you work for?"

User: "Acme Corp"
  ↓
And so on... ✅ PROPER SEQUENTIAL FLOW
```

## Option 1: Quick Fix with `interruptBefore` (2-4 hours)

### Step 1: Update graph compilation

**File:** `lib/orchestrator/lead-qualification-graph.ts`

```typescript
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

  // CRITICAL FIX: Add interruptBefore to pause before each node
  return workflow.compile({
    checkpointer,
    interruptBefore: [
      'greeting',
      'name',
      'company',
      'painPoint',
      'email',
      'emailConfirm',
      'phone',
      'phoneConfirm'
    ]
  });
}
```

### Step 2: Update processTranscript to handle interrupts

**File:** `lib/orchestrator/graph-manager.ts`

```typescript
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

  // Get compiled graph
  const graph = getGraph();

  // Configuration for persistence
  const config = {
    configurable: { thread_id: sessionId },
    recursionLimit: 50,
  };

  // Check if graph is currently interrupted
  const threadState = await graph.getState(config);

  let result;

  if (threadState.next && threadState.next.length > 0) {
    // Graph is interrupted, resume execution
    console.log(`[GraphManager] Resuming from interrupt at node: ${threadState.next[0]}`);
    result = await graph.invoke(null, config); // Resume without new input
  } else {
    // Graph is not interrupted, process new transcript
    const inputState: Partial<LeadQualificationState> = {
      ...currentState,
      lastTranscript: transcript,
      lastRole: role,
    };

    console.log(`[GraphManager] Invoking graph from phase: ${currentState.phase}`);
    console.log(`[GraphManager] Input role: ${role}, transcript: "${transcript.substring(0, 50)}..."`);

    result = await graph.invoke(inputState, config);
  }

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
```

### Step 3: Test

Run the test script:
```bash
npm run test:lead-graph
```

Expected output:
```
[Graph] Invoking graph...
[greetingNode] Processing greeting phase
[Graph] ⏸️  Interrupted before node: name
[Graph] Resuming...
[nameNode] Processing name collection
[Graph] ⏸️  Interrupted before node: company
```

### Pros of Option 1:
- ✅ Quick to implement (2-4 hours)
- ✅ Minimal code changes
- ✅ Immediately fixes the skipping behavior
- ✅ Uses built-in LangGraph feature

### Cons of Option 1:
- ⚠️ Less flexible than dynamic interrupts
- ⚠️ Can't conditionally skip pauses
- ⚠️ Documentation recommends dynamic interrupts for production

---

## Option 2: Proper Implementation with `interrupt()` (1-2 days)

### Step 1: Import interrupt function

**File:** `lib/orchestrator/nodes.ts`

```typescript
import { interrupt } from '@langchain/langgraph';
import { LeadQualificationState } from './lead-graph-state';
// ... other imports
```

### Step 2: Refactor greeting node

```typescript
export async function greetingNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[greetingNode] Processing greeting phase');

  // If already past greeting, skip
  if (state.phase !== 'greeting' && state.leadInfo.name) {
    return {};
  }

  // Greet and ask if they'd like to continue
  const response = interrupt({
    message: "Hi! I'm Luci from Innovoco. I help companies transform with AI and automation. May I ask you a few questions to better understand how we can help?",
    phase: 'greeting'
  });

  // User responded, move to name collection
  return {
    phase: 'name'
  };
}
```

### Step 3: Refactor name collection node

```typescript
export async function nameNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[nameNode] Processing name collection');

  const { leadInfo, retries } = state;

  // If we already have a name, move on
  if (leadInfo.name) {
    console.log(`[nameNode] Name already collected: ${leadInfo.name}`);
    return { phase: 'company' };
  }

  // Ask for name and wait for response
  const userInput = interrupt({
    message: "What's your name?",
    phase: 'name'
  });

  // Try to extract name
  const name = extractName(userInput);

  if (!name) {
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
    const retry = interrupt({
      message: "I didn't catch your name. Could you tell me what to call you?",
      phase: 'name'
    });

    const retryName = extractName(retry);
    if (retryName) {
      return {
        leadInfo: { ...leadInfo, name: retryName },
        phase: 'company',
        retries: incrementRetry(retries, 'name'),
        aiResponse: `Nice to meet you, ${retryName}! What company do you work for?`
      };
    }

    // Still failed, move on
    return {
      phase: 'company',
      retries: incrementRetry(retries, 'name', 2),
      aiResponse: "Let's continue. What company are you with?"
    };
  }

  // Successfully extracted name
  console.log(`[nameNode] ✅ Extracted name: ${name}`);
  return {
    leadInfo: { ...leadInfo, name },
    phase: 'company',
    aiResponse: `Nice to meet you, ${name}! What company do you work for?`
  };
}
```

### Step 4: Refactor company collection node

```typescript
export async function companyNode(
  state: LeadQualificationState
): Promise<Partial<LeadQualificationState>> {
  console.log('[companyNode] Processing company collection');

  const { leadInfo, retries } = state;

  // If we already have company, move on
  if (leadInfo.company) {
    console.log(`[companyNode] Company already collected: ${leadInfo.company}`);
    return { phase: 'painPoint' };
  }

  // Ask for company and wait
  const userInput = interrupt({
    message: "What company do you work for?",
    phase: 'company'
  });

  // Try to extract company
  const company = extractCompany(userInput);

  if (!company) {
    // Check retry limit
    if (hasReachedRetryLimit(retries, 'company')) {
      console.log('[companyNode] Max retries reached for company');
      return {
        phase: 'painPoint',
        aiResponse: "What specific challenge are you looking to solve with AI?"
      };
    }

    // Ask again
    const retry = interrupt({
      message: "I didn't catch your company name. Where do you work?",
      phase: 'company'
    });

    const retryCompany = extractCompany(retry);
    if (retryCompany) {
      return {
        leadInfo: { ...leadInfo, company: retryCompany },
        phase: 'painPoint',
        retries: incrementRetry(retries, 'company'),
        aiResponse: `Great! And what kind of Data & AI solutions is ${retryCompany} looking to implement?`
      };
    }

    return {
      phase: 'painPoint',
      retries: incrementRetry(retries, 'company', 2),
      aiResponse: "What specific challenge are you looking to solve with AI?"
    };
  }

  console.log(`[companyNode] Extracted company: ${company}`);
  return {
    leadInfo: { ...leadInfo, company },
    phase: 'painPoint',
    aiResponse: `Great! And what kind of Data & AI solutions is ${company} looking to implement?`
  };
}
```

### Step 5: Update graph manager for Command pattern

**File:** `lib/orchestrator/graph-manager.ts`

```typescript
import { Command } from '@langchain/langgraph';

export async function processTranscript(
  sessionId: string,
  transcript: string,
  role: 'user' | 'assistant'
): Promise<{
  state: LeadQualificationState;
  uiAction: any | null;
  aiResponse: string | null;
}> {
  const graph = getGraph();
  const config = {
    configurable: { thread_id: sessionId },
    recursionLimit: 50,
  };

  // Check if graph is interrupted
  const threadState = await graph.getState(config);

  let result;

  if (threadState.next && threadState.next.length > 0) {
    // Graph is interrupted, resume with user input
    console.log(`[GraphManager] Resuming from interrupt with input: "${transcript.substring(0, 50)}..."`);

    // Resume with Command pattern
    result = await graph.invoke(
      new Command({ resume: transcript }),
      config
    );
  } else {
    // Start new or continue
    const currentState = await getOrCreateSession(sessionId);
    const inputState: Partial<LeadQualificationState> = {
      ...currentState,
      lastTranscript: transcript,
      lastRole: role,
    };

    console.log(`[GraphManager] Invoking graph from phase: ${currentState.phase}`);
    result = await graph.invoke(inputState, config);
  }

  // Update session
  sessions.set(sessionId, result);

  return {
    state: result,
    uiAction: result.uiAction,
    aiResponse: result.aiResponse,
  };
}
```

### Step 6: Refactor remaining nodes

Apply the same pattern to:
- `painPointNode`
- `emailNode`
- `emailConfirmNode`
- `phoneNode`
- `phoneConfirmNode`

### Pros of Option 2:
- ✅ Follows official LangGraph best practices
- ✅ Full control over when to pause
- ✅ Can conditionally skip interrupts
- ✅ Better error handling
- ✅ More maintainable long-term

### Cons of Option 2:
- ⚠️ More code changes required
- ⚠️ Takes longer to implement (1-2 days)
- ⚠️ Requires thorough testing
- ⚠️ Need to update all nodes

---

## Recommendation

**Immediate:** Implement Option 1 (interruptBefore) as a hotfix to stop the skipping behavior

**Long-term:** Plan migration to Option 2 (interrupt()) for proper production-ready implementation

## Testing Checklist

After implementing either option:

- [ ] Agent greets user and waits for response
- [ ] Agent asks for name and waits
- [ ] Agent asks for company and waits
- [ ] Agent asks for pain point and waits
- [ ] Email UI appears at correct time
- [ ] Phone UI appears at correct time
- [ ] No steps are skipped
- [ ] Retry logic works when extraction fails
- [ ] State persists across page refreshes
- [ ] Multiple concurrent sessions work correctly

## Monitoring

After deployment, monitor for:

- Graph execution time (should NOT increase significantly)
- Interrupt/resume success rate
- User drop-off rates at each step
- Extraction accuracy per field
- Retry frequency

## Rollback Plan

If issues occur:

1. Revert changes to `lead-qualification-graph.ts`
2. Remove `interruptBefore` from compile options
3. Restore original `graph-manager.ts`
4. Clear all sessions: `DELETE FROM langgraph_checkpoints WHERE thread_id LIKE 'lead_%'`
5. Restart application

---

**Questions?** Review the [CRITICAL_ISSUE_ANALYSIS.md](./CRITICAL_ISSUE_ANALYSIS.md) for detailed explanation of the root cause.
