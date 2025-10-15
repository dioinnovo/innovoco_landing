# LangGraph Lead Qualification - Testing Guide

## 🚀 Testing Environment

**Server Status**: ✅ Running on http://localhost:3002
**Date**: 2025-10-14
**Implementation**: LangGraph StateGraph (NEW)

---

## 📋 Pre-Test Checklist

- [x] Dev server running (`npm run dev`)
- [x] No compilation errors
- [x] LangGraph dependencies installed
- [ ] Environment variables configured (.env.local)
- [ ] Browser console open for logging
- [ ] Network tab open to monitor API calls

---

## 🎯 Test Scenarios

### **Scenario 1: Happy Path (Full Qualification)**
**Objective**: User provides all information correctly and gets qualified

**Steps**:
1. Navigate to voice assistant page
2. Start conversation
3. **Greeting Phase**: Wait for AI greeting
4. **Name Phase**: Provide your name (e.g., "I'm John Smith")
5. **Company Phase**: Provide company (e.g., "I work at Acme Corp")
6. **Pain Point Phase**: Describe challenge (e.g., "We need to automate our data processing")
7. **Email Phase**:
   - AI should ask for email
   - UI should show email input field
   - Type email (e.g., "john@acme.com")
8. **Email Confirm Phase**:
   - AI should read back email and ask for confirmation
   - Say "Yes" or "Correct"
9. **Phone Phase**:
   - 🔥 **CRITICAL TEST** - AI should ask for phone
   - UI should show phone input field
   - Type phone (e.g., "5551234567")
10. **Phone Confirm Phase**:
    - AI should read back phone and ask for confirmation
    - Say "Yes" or "Correct"
11. **Qualified Phase**:
    - AI should acknowledge qualification
    - Lead data should be sent to backend

**Expected Results**:
- ✅ All phases transition smoothly
- ✅ Email UI appears after AI asks
- ✅ Phone UI appears after email confirmation
- ✅ Lead notification emails sent
- ✅ No errors in console

**Console Logs to Look For**:
```
[GraphManager] Creating new session: [sessionId]
[Graph] Building Lead Qualification StateGraph...
[greetingNode] Processing greeting phase
[nameNode] Extracted name: John Smith
[companyNode] Extracted company: Acme Corp
[painPointNode] Extracted pain point: ...
[emailNode] Extracted email: john@acme.com
[emailConfirmNode] Email confirmed by user
[phoneNode] Showing phone input UI
[phoneNode] Extracted phone: 5551234567
[phoneConfirmNode] Phone confirmed by user
[qualifiedNode] Lead is qualified!
[session-id] 🎉 Lead Qualified: { name, email, phone, ... }
```

---

### **Scenario 2: User Gives Feedback Instead of Phone (CRITICAL FIX TEST)**
**Objective**: Test that the system handles feedback gracefully and still shows phone UI

**Steps**:
1. Follow Scenario 1 steps 1-8 (up to email confirmation)
2. **Phone Phase**:
   - AI asks for phone
   - **Instead of typing phone, say**: "The phone UI is not showing on the screen"
3. **Expected Behavior**:
   - AI should acknowledge your feedback
   - AI should stay in phone phase
   - Next turn, AI should show phone UI
4. Then provide phone number normally

**Expected Results**:
- ✅ System detects feedback with `isFeedbackOrQuestion()`
- ✅ AI responds appropriately (e.g., "I understand your concern...")
- ✅ System stays in phone phase
- ✅ Phone UI eventually appears
- ✅ No infinite loop or stuck state

**Console Logs to Look For**:
```
[phoneNode] User is giving feedback, staying in phone phase
[phoneNode] Showing phone input UI
```

**This scenario directly tests the fix for your original issue!**

---

### **Scenario 3: Email Rejection**
**Objective**: User rejects email confirmation and provides new email

**Steps**:
1. Follow Scenario 1 steps 1-7 (up to email submission)
2. **Email Confirm Phase**:
   - AI asks "Is your email correct?"
   - Say "No" or "That's wrong"
3. **Expected Behavior**:
   - System should go back to email phase
   - Email input UI should appear again
   - Previous email should be cleared
4. Provide correct email
5. Confirm and continue

**Expected Results**:
- ✅ System detects negative response with `isNegative()`
- ✅ Transitions back to email phase
- ✅ Email field is reset
- ✅ Can proceed after providing correct email

**Console Logs to Look For**:
```
[emailConfirmNode] Email rejected, asking again
[Routing] Phase transition: emailConfirm → email
```

---

### **Scenario 4: Phone Rejection**
**Objective**: Similar to email rejection, but for phone

**Steps**:
1. Follow Scenario 1 through email confirmation
2. Provide phone number
3. **Phone Confirm Phase**:
   - AI asks "Is your number correct?"
   - Say "No" or "That's incorrect"
4. **Expected Behavior**:
   - System should go back to phone phase
   - Phone input UI should appear again
5. Provide correct phone
6. Confirm and qualify

**Expected Results**:
- ✅ Transitions back to phone phase
- ✅ Phone field is reset
- ✅ Can proceed after correction

---

### **Scenario 5: Retry Limit Test**
**Objective**: Test that system doesn't loop infinitely if user doesn't provide email

**Steps**:
1. Start conversation, provide name, company, pain point
2. **Email Phase**:
   - When AI asks for email, say something unrelated 3 times
   - (e.g., "I don't have an email", "Skip this", "Not sure")
3. **Expected Behavior**:
   - After 3 attempts, system should gracefully move to phone phase

**Expected Results**:
- ✅ Retry counter increments
- ✅ After 3 attempts, transitions to phone
- ✅ No infinite loop

**Console Logs to Look For**:
```
[emailNode] Max retries reached, moving to phone anyway
```

---

### **Scenario 6: State Validation - Phone Without Email Confirmation**
**Objective**: Test that phone phase REQUIRES email confirmation

**Steps**:
This is an internal test - the graph should enforce this automatically, but we can verify by checking logs.

**Expected Results**:
- ✅ If somehow phone phase is reached without emailConfirmed, it should force back to emailConfirm
- ✅ Console shows validation: `[phoneNode] ⚠️ Email not confirmed, returning to emailConfirm`

**This is the core fix that solves your original problem!**

---

### **Scenario 7: Spoken Phone Number**
**Objective**: Test that spoken phone numbers are converted to digits

**Steps**:
1. Follow Scenario 1 through email confirmation
2. **Phone Phase**:
   - Instead of typing, say the phone number out loud
   - Use words like: "five five five one two three four five six seven"
3. **Expected Behavior**:
   - System should convert "five" → "5", "oh" → "0", etc.
   - Extracted phone should be "5551234567"

**Expected Results**:
- ✅ `convertSpokenToDigits()` works correctly
- ✅ Phone extracted as digits
- ✅ AI reads back formatted number: "(555) 123-4567"

**Console Logs to Look For**:
```
[phoneNode] Extracted phone: 5551234567
```

---

## 🔍 Monitoring & Debugging

### **What to Watch in Browser Console**

1. **Graph Initialization**:
```
[GraphManager] Compiling StateGraph for first time...
[Graph] ✅ StateGraph compiled and cached
```

2. **Phase Transitions**:
```
[Routing] Current phase: email
[Routing] Email confirmed: true
[Routing] ✅ Email confirmed, moving to phone
[Graph] Phase transition: email → emailConfirm → phone
```

3. **UI Actions**:
```
[session-id] 🎯 UI Action triggered: { type: 'show_text_input', inputType: 'phone' }
```

4. **Lead Qualification**:
```
[session-id] 🎉 Lead Qualified: { name: "John", email: "john@acme.com", phone: "5551234567" }
[session-id] 📧 Sending lead notification emails...
```

### **What to Watch in Network Tab**

1. **POST /api/realtime/sync** - Every transcript sent
   - Request: `{ sessionId, transcript, role, ... }`
   - Response: `{ success, state, uiAction?, aiResponse?, leadData? }`

2. **Email Notification Requests** (when qualified)
   - Should see email API calls
   - Check response for `salesEmailSent` and `welcomeEmailSent`

### **Common Issues & Solutions**

| Issue | Cause | Solution |
|-------|-------|----------|
| Phone UI doesn't appear | Email not confirmed | Check `emailConfirmed` flag in state |
| Infinite loop | Retry limit not working | Check retry counter in state |
| Email extraction fails | Regex doesn't match | Check email format in extractors.ts |
| Graph doesn't compile | Import errors | Check all imports in graph files |
| Session state lost | Map not persisting | Expected - in-memory only for now |

---

## 📊 Test Results Template

Use this template to record your test results:

```markdown
## Test Session: [Date/Time]

### Scenario 1: Happy Path
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Scenario 2: Feedback Handling (CRITICAL)
- Status: ✅ / ❌
- Notes:
- Phone UI appeared after feedback: Yes / No
- Issues Found:

### Scenario 3: Email Rejection
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Scenario 4: Phone Rejection
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Scenario 5: Retry Limit
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Scenario 6: State Validation
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Scenario 7: Spoken Numbers
- Status: ✅ / ❌
- Notes:
- Issues Found:

### Overall Results
- Total Scenarios: 7
- Passed: X
- Failed: X
- Critical Issues: [List]
- Minor Issues: [List]

### Next Steps
- [ ] Fix critical issues
- [ ] Retest failed scenarios
- [ ] Deploy to production
```

---

## 🎯 Success Criteria

The implementation is considered successful if:

1. ✅ **Scenario 2 (Feedback Handling) PASSES** - This is the primary fix
2. ✅ All 7 test scenarios pass
3. ✅ No console errors during normal flow
4. ✅ Email and phone UI trigger correctly
5. ✅ Lead qualification data is captured
6. ✅ Email notifications are sent
7. ✅ State transitions are logged correctly

---

## 🚨 Known Limitations

1. **Session Storage**: Currently in-memory Map
   - Sessions lost on server restart
   - Not suitable for multi-instance deployments
   - **Production**: Replace with Redis

2. **Error Handling**: Basic try/catch in API route
   - May need more granular error handling based on testing
   - Should add error recovery mechanisms

3. **Testing Environment**: Development mode
   - Production build may behave differently
   - Test production build before deploying

---

## 📞 Support During Testing

If you encounter issues:

1. **Check Console Logs** - Comprehensive logging added
2. **Verify State** - Check `/api/realtime/sync` response
3. **Review Code** - Files in `/lib/orchestrator/`
4. **Check This Guide** - Common issues section above
5. **Report Issues** - Document in test results template

---

**Ready to Test!** 🚀

Server: http://localhost:3002
Console: Open and monitoring
Let's verify the LangGraph implementation works as designed!
