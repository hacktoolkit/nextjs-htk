/**
 * Email validation and obfuscation utilities
 */

/**
 * Validates if a string is a valid email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Email obfuscation utilities for anti-spam protection
 */
export const emailUtils = {
  /**
   * Encodes text to a mix of decimal and hex entities
   * @param text The text to encode
   * @returns HTML entity encoded string
   */
  encodeToEntities: (text: string) => {
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        return Math.random() > 0.5 ? `&#${code};` : `&#x${code.toString(16)};`;
      })
      .join('');
  },

  /**
   * Creates an obfuscated email string for display
   * @param email The email address to obfuscate
   * @returns HTML entity encoded email string
   */
  getObfuscatedEmail: (email: string) => {
    return emailUtils.encodeToEntities(email);
  },
} as const;
