import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { company, siteUrl } from "@/content/company";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Mechanical, Electrical & Specialized Trade Contractor — Kansas City, KS`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  keywords: [
    "mechanical contractor Kansas City",
    "electrical contractor Kansas City KS",
    "commercial HVAC contractor",
    "public sector contractor Kansas",
    "facility maintenance",
    "specialized trade contractor",
    "subcontractor for prime contractors",
  ],
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: "en_US",
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${company.name} — Built for the work that matters` }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#5a0f21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} antialiased`} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[100] bg-wine-600 px-4 py-3 font-display text-sm tracking-widest text-white uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
