/**
 * Single source of truth for company facts shown on the website.
 *
 * Everything here is published, so only add details the business has confirmed.
 * Phone, email and hours come from environment variables and render only when set.
 * The address below was taken from the company's own Airo draft site — confirm it
 * with the owner before launch.
 */
export const company = {
  name: "Jeffries Mechanicals",
  legalName: "Jeffries Mechanicals LLC",
  tagline: "Mechanical • Electrical • Specialized Trade Contracting",
  description:
    "Jeffries Mechanicals LLC provides mechanical, electrical, and specialized trade contracting for commercial, public-sector, and infrastructure projects across Kansas and the surrounding region, with a focus on quality workmanship, dependable execution, and contract-ready performance.",
  /** Short positioning line used where space is tight (mobile hero, cards). */
  summary:
    "Mechanical, electrical and specialized trade contracting for commercial, public-sector and infrastructure projects across Kansas and the surrounding region.",
  address: {
    street: "4327 State Ave",
    city: "Kansas City",
    region: "KS",
    postalCode: "66102",
    country: "US",
  },
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || null,
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || null,
  /** e.g. "Mon–Fri 7:00 AM – 5:00 PM" */
  hours: process.env.NEXT_PUBLIC_COMPANY_HOURS || null,
  serviceArea: "Kansas City regional market",
  mapsQuery: "4327 State Ave, Kansas City, KS 66102",
} as const;

export const fullAddress = `${company.address.street}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
