# LangGraph.js Implementation - Corrected Guide

## Critical: Avoiding Recursion Limit Errors

### The Problem
The most common and critical error when implementing LangGraph.js is hitting the recursion limit:
```
Failed: Recursion limit of 25 reached without hitting a stop condition.
```

This happens when your graph has loops or conditional edges that can return to the same node.

### The Solution: Linear Graph Architecture

## Correct Implementation Pattern

### 1. Linear Edge Design (NO LOOPS)

```typescript
// CORRECT - Linear flow without loops
export function buildCallbackAgent() {
  const workflow = new StateGraph(CallbackAgentAnnotation)
    .addNode('initialize', initializeNode)
    .addNode('gather_info', gatherInfoNode)
    .addNode('qualify', qualifyNode)
    .addNode('recommend', recommendNode)
    .addNode('schedule', scheduleNode)
    .addNode('notify', notifyNode)
    
    // LINEAR EDGES ONLY - No conditionals that loop back
    .addEdge('__start__', 'initialize')
    .addEdge('initialize', 'gather_info')
    .addEdge('gather_info', 'qualify')
    .addEdge('qualify', 'recommend')
    .addEdge('recommend', 'schedule')
    .addEdge('schedule', 'notify')
    .addEdge('notify', '__end__');
  
  return workflow.compile();
}
```

### 2. Node Implementation - Handle Logic Internally

Instead of looping back to gather more info, handle it within the node:

```typescript
// CORRECT - Handle multiple questions in one node execution
export async function gatherInfoNode(
  state: CallbackAgentState
): Promise<Partial<CallbackAgentState>> {
  const { customerInfo } = state;
  
  // Check what's missing and ask for everything at once
  const missingInfo = [];
  if (!customerInfo.company) missingInfo.push("company name");
  if (!customerInfo.currentChallenges) missingInfo.push("current challenges");
  
  let message: AIMessage;
  if (missingInfo.length > 0) {
    // Ask for all missing info in one message
    message = new AIMessage(
      `To better help you, could you tell me about your ${missingInfo.join(' and ')}?`
    );
  } else {
    // Transition message when info is complete
    message = new AIMessage(
      "Thank you for that information. Let me evaluate how we can help."
    );
  }
  
  return {
    customerInfo: extractedInfo,
    messages: [message],
    // NO nextNode - let the linear edges handle flow
  };
}
```

## What NOT to Do (Common Mistakes)

### 1. ❌ WRONG: Conditional Edges with Loops
```typescript
// THIS CAUSES RECURSION ERRORS!
.addConditionalEdges('gather_info', (state) => {
  if (!state.customerInfo?.company) {
    return 'gather_info'; // LOOPS BACK TO ITSELF!
  }
  return 'qualify';
})
```

### 2. ❌ WRONG: Backwards Navigation
```typescript
// THIS CAUSES RECURSION ERRORS!
.addConditionalEdges('qualify', (state) => {
  if (!state.qualification.isQualified) {
    return 'gather_info'; // GOING BACKWARDS!
  }
  return 'recommend';
})
```

### 3. ❌ WRONG: Complex Routing Logic
```typescript
// THIS IS TOO COMPLEX AND ERROR-PRONE!
.addConditionalEdges('node', (state) => {
  if (condition1) return 'node_a';
  if (condition2) return 'node_b';
  if (condition3) return 'node'; // SELF-REFERENCE!
  return 'node_c';
})
```

## State Management Best Practices

### Use Annotation.Root with Proper Value Functions

```typescript
export const CallbackAgentAnnotation = Annotation.Root({
  sessionId: Annotation<string>({
    value: (current, update) => update ?? current,
    default: () => '',
  }),
  
  messages: Annotation<BaseMessage[]>({
    value: (current, update) => {
      if (!update) return current;
      // Accumulate messages, don't replace
      if (Array.isArray(update)) {
        return [...current, ...update];
      }
      return [...current, update];
    },
    default: () => [],
  }),
  
  // Track conversation state without loops
  conversationPhase: Annotation<string>({
    value: (current, update) => update ?? current,
    default: () => 'initial',
  }),
});
```

## Complete Working Example

Here's a complete implementation that avoids all recursion issues:

```typescript
// state.ts
import { Annotation } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';

export const AgentAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    value: (current, update) => {
      if (!update) return current;
      return Array.isArray(update) 
        ? [...current, ...update]
        : [...current, update];
    },
    default: () => [],
  }),
  phase: Annotation<string>({
    value: (_, update) => update ?? 'initial',
    default: () => 'initial',
  }),
});

// agent.ts
import { StateGraph } from '@langchain/langgraph';
import { AgentAnnotation } from './state';

function processNode(state: typeof AgentAnnotation.State) {
  // Process and return next phase
  return {
    messages: [new AIMessage("Processing...")],
    phase: 'complete',
  };
}

export function buildAgent() {
  return new StateGraph(AgentAnnotation)
    .addNode('process', processNode)
    .addEdge('__start__', 'process')
    .addEdge('process', '__end__')
    .compile();
}
```

## Testing Your Implementation

Before deploying, test for recursion issues:

```typescript
// test-recursion.ts
async function testAgent() {
  const agent = buildAgent();
  
  try {
    const result = await agent.invoke({
      messages: [new HumanMessage("Test message")],
      phase: 'initial',
    });
    console.log('✅ No recursion issues detected');
  } catch (error) {
    if (error.message.includes('Recursion limit')) {
      console.error('❌ RECURSION ERROR - Fix your graph edges!');
    }
    throw error;
  }
}
```

## Migration from Recursive to Linear Design

If you have an existing recursive implementation:

1. **Remove all conditional edges that loop back**
2. **Replace with linear edges**
3. **Move conditional logic into nodes**
4. **Use state fields to track progress instead of loops**

### Before (Recursive):
```typescript
.addConditionalEdges('gather', (state) => 
  state.hasInfo ? 'qualify' : 'gather'
)
```

### After (Linear):
```typescript
.addEdge('gather', 'qualify')
// Let the qualify node handle incomplete info
```

## Key Takeaways

1. **Always use linear edges** - no loops, no back-references
2. **Handle multi-step logic within nodes**, not through graph loops
3. **Use state management** to track conversation progress
4. **Test for recursion** before deploying
5. **Keep it simple** - complex routing leads to recursion errors

## Production Checklist

- [ ] No conditional edges that return to the same node
- [ ] No backwards navigation in the graph
- [ ] All edges move forward toward __end__
- [ ] Complex logic handled within nodes, not edges
- [ ] Recursion limit tested with various inputs
- [ ] State properly accumulates without loops
- [ ] Error handling doesn't create loops

Remember: **In LangGraph.js, simpler is better. Linear flows are more reliable than complex conditional routing.**