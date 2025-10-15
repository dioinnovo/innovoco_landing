/**
 * Extraction Utilities
 *
 * Functions to extract structured data from conversation transcripts
 */

/**
 * Check if text contains an email address
 */
export function containsEmail(text: string): boolean {
  return /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
}

/**
 * Extract email address from text
 */
export function extractEmail(text: string): string | null {
  const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Convert spoken numbers to digits
 * Handles "oh" for zero and number words
 */
export function convertSpokenToDigits(text: string): string {
  const numberWords: Record<string, string> = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    oh: '0', // "oh" is often used instead of "zero"
  };

  let converted = text.toLowerCase();

  for (const [word, digit] of Object.entries(numberWords)) {
    converted = converted.replace(new RegExp(`\\b${word}\\b`, 'g'), digit);
  }

  return converted;
}

/**
 * Check if text contains a phone number
 */
export function containsPhone(text: string): boolean {
  // First try to convert spoken numbers to digits
  const converted = convertSpokenToDigits(text);

  // Check for formatted phone number pattern
  if (/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/.test(converted)) {
    return true;
  }

  // Check for 10 consecutive digits (with possible spaces)
  const digitsOnly = converted.replace(/[^\d]/g, '');
  return digitsOnly.length === 10 || digitsOnly.length === 11;
}

/**
 * Extract phone number from text
 */
export function extractPhone(text: string): string | null {
  // First try to convert spoken numbers to digits
  const converted = convertSpokenToDigits(text);

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
 * Format phone for display
 */
export function formatPhone(phone: string): string {
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
 * Extract name from text
 * Handles patterns like "I'm X", "My name is X", "It's X", "This is X"
 */
export function extractName(text: string): string | null {
  // Skip common greetings that shouldn't be treated as names
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
  const lowerText = text.toLowerCase().trim();
  if (greetings.includes(lowerText)) {
    return null;
  }

  const namePatterns = [
    /(?:my name is|i'm|i am|it's|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
    // Only accept standalone names if they have at least two parts (first and last)
    // or are clearly not greetings
    /^([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)$/i, // Full name pattern
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      const extractedName = match[1].trim();
      // Additional validation: avoid single common words
      if (extractedName.split(' ').length === 1 && extractedName.length < 5) {
        continue; // Skip single short words that are likely not names
      }
      return extractedName;
    }
  }

  // Try to detect just first names when clearly stated
  const firstNamePattern = /^(?:I'm |My name is |It's |This is )?([A-Z][a-z]{3,})$/;
  const firstNameMatch = text.match(firstNamePattern);
  if (firstNameMatch && !greetings.includes(firstNameMatch[1].toLowerCase())) {
    return firstNameMatch[1];
  }

  return null;
}

/**
 * Extract company name from text
 * Handles patterns like "work at X", "from X", "I'm at X", "I work for X"
 */
export function extractCompany(text: string): string | null {
  // More specific patterns to avoid false matches
  const companyPatterns = [
    /(?:company (?:name )?is|I work (?:at|for)|I'm with|I'm at|from company|represent)\s+([A-Z][A-Za-z0-9\s&.-]+?)(?:\.|,|$)/i,
    /(?:work(?:ing)? (?:at|for))\s+([A-Z][A-Za-z0-9\s&.-]+?)(?:\.|,|$)/i,
  ];

  for (const pattern of companyPatterns) {
    const match = text.match(pattern);
    if (match) {
      const company = match[1].trim();
      // Filter out phrases that are clearly not companies
      if (company.toLowerCase().includes('automate') ||
          company.toLowerCase().includes('looking') ||
          company.toLowerCase().includes('want')) {
        continue;
      }
      return company;
    }
  }

  return null;
}

/**
 * Extract pain point/challenge from text
 */
export function extractPainPoint(text: string): string | null {
  const lower = text.toLowerCase();

  // Check if text contains pain point keywords
  const hasPainPointKeywords =
    lower.includes('need') ||
    lower.includes('looking for') ||
    lower.includes('looking to') ||
    lower.includes('problem') ||
    lower.includes('challenge') ||
    lower.includes('automate') ||
    lower.includes('improve') ||
    lower.includes('struggle');

  if (hasPainPointKeywords && text.length > 15) {
    return text;
  }

  return null;
}

/**
 * Extract timeline from text
 */
export function extractTimeline(text: string): string | null {
  const lower = text.toLowerCase();

  if (lower.match(/\b(week|month|quarter|year|asap|urgent|soon|within)\b/)) {
    return text;
  }

  return null;
}

/**
 * Extract budget from text
 */
export function extractBudget(text: string): string | null {
  const lower = text.toLowerCase();

  if (
    lower.match(/\$[\d,]+/) ||
    lower.includes('budget') ||
    lower.includes('thousand') ||
    lower.includes('million')
  ) {
    return text;
  }

  return null;
}
