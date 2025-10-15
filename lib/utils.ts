import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extract email from text, handling both written and spoken formats
 * Examples:
 * - john@example.com
 * - john at example.com
 * - john at example dot com
 * - DiosTenesD at Hotmail.com
 */
export function extractEmailFromText(text: string): string | null {
  if (!text) return null;
  
  // First try standard email regex
  const standardEmailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  if (standardEmailMatch) {
    return standardEmailMatch[1].toLowerCase();
  }
  
  // Handle spoken format: "X at Y.com" or "X at Y dot com"
  // More flexible pattern to handle various spoken formats
  const spokenPatterns = [
    // "name at domain.com" or "name at domain dot com"
    /([a-zA-Z0-9._%+-]+)\s+at\s+([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})/i,
    /([a-zA-Z0-9._%+-]+)\s+at\s+([a-zA-Z0-9.-]+)\s+dot\s+([a-zA-Z]{2,})/i,
    // Handle cases with spaces in domain like "hot mail"
    /([a-zA-Z0-9._%+-]+)\s+at\s+([a-zA-Z0-9\s-]+)\.([a-zA-Z]{2,})/i,
    /([a-zA-Z0-9._%+-]+)\s+at\s+([a-zA-Z0-9\s-]+)\s+dot\s+([a-zA-Z]{2,})/i,
  ];
  
  for (const pattern of spokenPatterns) {
    const match = text.match(pattern);
    if (match) {
      // Reconstruct email from parts
      const username = match[1];
      const domain = match[2].replace(/\s+/g, ''); // Remove spaces from domain
      const tld = match[3];
      const email = `${username}@${domain}.${tld}`.toLowerCase();
      
      // Validate the reconstructed email
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return email;
      }
    }
  }
  
  return null;
}

/**
 * Extract phone number from text, handling various formats
 */
export function extractPhoneFromText(text: string): string | null {
  if (!text) return null;
  
  // Handle various phone formats
  const patterns = [
    // Standard formats with optional country code
    /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
    // Spoken format: "six four seven five three seven..."
    /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/,
    // With extensions
    /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})(?:\s*(?:ext|x|extension)\.?\s*\d+)?/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Clean up the phone number
      const phone = match[1].replace(/[^\d+]/g, '').replace(/^1/, '');
      if (phone.length >= 10) {
        return phone;
      }
    }
  }
  
  return null;
}