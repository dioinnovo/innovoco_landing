/**
 * Validation Utilities
 *
 * Functions to validate user responses and determine confirmation
 */

/**
 * Check if response is affirmative (yes, correct, etc.)
 */
export function isAffirmative(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return /^(yes|yeah|yep|yup|correct|right|exactly|sure|absolutely|that's right|that's correct|si|sí|correcto)/.test(
    lower
  );
}

/**
 * Check if response is negative (no, wrong, etc.)
 */
export function isNegative(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return /^(no|nope|nah|wrong|incorrect|not right|that's wrong|that's incorrect)/.test(lower);
}

/**
 * Check if user wants to skip a field
 */
export function wantsToSkip(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('skip') ||
    lower.includes('pass') ||
    lower.includes('later') ||
    lower.includes("don't have") ||
    lower.includes('not sure')
  );
}

/**
 * Check if user is providing feedback or asking a question
 * (not actually answering the current question)
 */
export function isFeedbackOrQuestion(text: string): boolean {
  const lower = text.toLowerCase();

  // Feedback indicators
  const feedbackIndicators = [
    'the ui',
    'the phone',
    'the email',
    'not showing',
    'not working',
    'not popping',
    'should',
    'you need',
    'problem with',
  ];

  // Question indicators
  const questionIndicators = ['why', 'how', 'what', 'when', 'where', 'can you', 'could you', 'will you'];

  const hasFeedback = feedbackIndicators.some((indicator) => lower.includes(indicator));
  const hasQuestion =
    questionIndicators.some((indicator) => lower.includes(indicator)) || text.trim().endsWith('?');

  return hasFeedback || hasQuestion;
}

/**
 * Check if user wants to end the conversation
 */
export function wantsToEnd(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('that\'s all') ||
    lower.includes('that\'s it') ||
    lower.includes('nothing else') ||
    lower.includes('that\'s everything') ||
    lower.includes('bye') ||
    lower.includes('goodbye') ||
    lower.includes('thank you') ||
    lower.includes('thanks')
  );
}

/**
 * Check if retry limit has been reached for a field
 */
export function hasReachedRetryLimit(retries: Record<string, number>, field: string, limit: number = 3): boolean {
  return (retries[field] || 0) >= limit;
}

/**
 * Increment retry counter for a field
 */
export function incrementRetry(retries: Record<string, number>, field: string): Record<string, number> {
  return {
    ...retries,
    [field]: (retries[field] || 0) + 1,
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (US numbers)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
}
