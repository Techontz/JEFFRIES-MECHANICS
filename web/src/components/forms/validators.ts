/** Client-side checks that mirror the Laravel form requests. */

export const required = (value: string, message = "This field is required.") => (value.trim() ? undefined : message);

export const minLength = (value: string, length: number, message?: string) =>
  value.trim().length >= length ? undefined : (message ?? `Please enter at least ${length} characters.`);

export const email = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? undefined : "Enter a valid email address.";

export const phone = (value: string, optional = false) => {
  if (optional && !value.trim()) {
    return undefined;
  }
  const digits = value.replace(/\D/g, "");

  return /^\+?[\d\s().-]{10,24}$/.test(value.trim()) && digits.length >= 10 && digits.length <= 15
    ? undefined
    : "Enter a valid phone number, including area code.";
};

/** Return only the fields that failed. */
export function collectErrors(checks: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(Object.entries(checks).filter((entry): entry is [string, string] => Boolean(entry[1])));
}

/** Copy of an error map without the given keys. */
export function without(errors: Record<string, string>, ...keys: string[]): Record<string, string> {
  return Object.fromEntries(Object.entries(errors).filter(([key]) => !keys.includes(key)));
}
