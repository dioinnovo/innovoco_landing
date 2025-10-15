# Luci - Innovoco's AI Voice Assistant

## Overview
Luci is Innovoco's personalized AI assistant that provides natural voice and text conversations to help visitors understand AI solutions and automation services.

### Company Name Pronunciation
**Innovoco** is pronounced with stress on the second syllable: **In'novoco**
- Similar to "innovation" 
- 4 syllables with emphasis on the second one

## Key Features

### Natural Introduction
When a voice call starts **without** prior text conversation:
- Luci introduces herself warmly: "Hi! I'm Luci, Innovoco's AI assistant. May I know who I'm speaking with today?"
- After the user introduces themselves, Luci acknowledges them and asks how she can help
- This creates a more personal and professional first impression

### Context-Aware Conversations
When a voice call starts **with** existing text conversation:
- Luci continues naturally from where the text conversation left off
- References previous messages and maintains full context
- No redundant introductions - jumps right into helping

## Implementation Details

### Voice Mode Instructions
The system dynamically adjusts instructions based on context:

**Fresh Conversation:**
```
You are Luci, Innovoco's AI assistant. Start by introducing yourself briefly 
and warmly asking for the person's name. Say something like: "Hi! I'm Luci, 
Innovoco's AI assistant. May I know who I'm speaking with today?"
```

**Continuing Conversation:**
```
You are Luci, Innovoco's AI assistant. You're continuing a conversation 
that started in text. Reference the previous text conversation naturally 
and continue helping with their needs.
```

### Technical Implementation

1. **Context Detection** (`virtual-assistant.tsx`):
   - Checks if there's meaningful conversation history
   - Considers more than just the initial greeting as "meaningful"
   - Passes context flag when starting voice call

2. **Session Configuration** (`client.ts`):
   - `configureSession(hasExistingContext: boolean)`
   - Applies appropriate instructions based on context
   - Maintains consistent voice and audio settings

3. **Name Consistency**:
   - All prompts use "Luci" as the assistant's name
   - Chat greeting: "Hello! I'm Luci, Innovoco's AI assistant..."
   - LangGraph conversation agent also identifies as Luci

## User Experience Flow

### Scenario 1: New Voice Call
1. User clicks phone icon with no prior conversation
2. Luci: "Hi! I'm Luci, Innovoco's AI assistant. May I know who I'm speaking with today?"
3. User: "Hi, I'm John from ABC Company"
4. Luci: "Hello John! It's great to connect with you from ABC Company. How can I help you explore AI solutions for your business?"

### Scenario 2: Text-to-Voice Transition
1. User has text conversation about their needs
2. User clicks phone icon to switch to voice
3. Luci continues: "Based on what we've discussed about your inventory management challenges, I'd recommend..."
4. Natural continuation without repeated introductions

## Benefits

1. **Professional First Impression**
   - Personal introduction builds rapport
   - Asking for name shows respect and interest
   - Creates foundation for relationship building

2. **Seamless Experience**
   - No jarring transitions between text and voice
   - Maintains conversation flow and context
   - Reduces repetition and user frustration

3. **Lead Qualification**
   - Naturally captures name in voice conversations
   - Follows same BANT qualification process
   - Information syncs with LangGraph orchestrator

## Testing the Experience

### Test New Conversation:
1. Open chat widget (no prior messages)
2. Click phone icon
3. Listen for Luci's introduction
4. Introduce yourself
5. Observe natural conversation flow

### Test Context Continuation:
1. Have text conversation first
2. Discuss specific needs or challenges
3. Click phone icon
4. Verify Luci continues contextually
5. Check that she references prior discussion

## Configuration

No additional configuration needed. The feature works automatically based on conversation state.

To customize the assistant name or greeting:
1. Update `STRUCTURED_CONVERSATION_PROMPT` in `conversation-langchain.ts`
2. Update greeting in `virtual-assistant.tsx`
3. Update instructions in `client.ts` `configureSession()` method

## Integration with LangGraph

- Name captured via voice syncs to `customerInfo.name`
- All conversation data flows through master orchestrator
- Lead qualification works identically across voice and text
- Luci maintains consistent personality across all channels

---

**Version:** 1.1.0  
**Last Updated:** January 2025  
**Assistant Name:** Luci  
**Voice Options:** alloy, echo, shimmer (default: alloy)