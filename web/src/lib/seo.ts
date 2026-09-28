import type { Metadata } from "next";
import { company, siteUrl } from "@/content/company";

const ogImage = { url: "/og-image.jpg", width: 1200, height: 630, alt: `${company.name} — Built for the work that matters` };

/** Per-page metadata with consistent Open Graph defaults. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${company.name}`, description, url: path, images: [ogImage] },
    twitter: { card: "summary_large_image", title: `${title} | ${company.name}`, description, images: [ogImage.url] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.legalName,
    alternateName: company.name,
    description: company.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    areaServed: ["Kansas City metropolitan area", "Kansas", "Missouri"],
    knowsAbout: ["Mechanical contracting", "Electrical contracting", "Facility maintenance", "Specialized trade services", "Construction support"],
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(company.email ? { email: company.email } : {}),
  };
}
