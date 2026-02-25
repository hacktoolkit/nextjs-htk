/**
 * Creates a telephone URL for phone numbers
 */
export function createPhoneUrl(phone: string, countryCode: string = '1'): string {
  const cleanPhone = phone.replace(/\D/g, '');
  return `tel:+${countryCode}${cleanPhone}`;
}

/**
 * Creates a Google Maps URL for a location
 */
export function createGoogleMapsUrl(businessName: string, address: string): string {
  const query = encodeURIComponent(`${businessName}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Creates a mailto URL
 */
export function createMailtoUrl(email: string, subject?: string): string {
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${subjectParam}`;
}

/**
 * Gets URL parameters from the current URL
 * @returns Object containing URL parameters
 */
export function getUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};

  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Gets a specific URL parameter value
 * @param paramName The name of the parameter to get
 * @returns The parameter value or null if not found
 */
export function getUrlParam(paramName: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}
