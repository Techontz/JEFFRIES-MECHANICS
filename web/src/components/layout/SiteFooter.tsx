import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/company";
import { markets } from "@/content/markets";
import { contractingHref, primaryNav, quoteHref } from "@/content/navigation";
import { services } from "@/content/services";

const columns = [
  { title: "Company", links: [...primaryNav, { label: "Get a Quote", href: quoteHref }] },
  { title: "Services", links: services.map((service) => ({ label: service.title, href: `/services#${service.slug}` })) },
  {
    title: "Markets",
    links: [
      ...markets.map((market) => ({ label: market.title, href: `/industries#${market.slug}` })),
      { label: "Contracting Opportunities", href: contractingHref },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="charcoal relative text-steel-400">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px steel-rule opacity-60" />

      <div className="shell pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src="/brand/logo-light.png" alt={company.legalName} width={720} height={264} className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{company.tagline}</p>

            <address className="mt-8 space-y-3 text-sm not-italic">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-wine-400" aria-hidden />
                <span>
                  <span className="block font-medium text-steel-100">{company.legalName}</span>
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.region} {company.address.postalCode}
                </span>
              </p>
              {company.phone && (
                <a href={`tel:${company.phone}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Phone className="size-4 text-wine-400" aria-hidden /> {company.phone}
                </a>
              )}
              {company.hours && (
                <p className="flex items-center gap-3">
                  <Clock3 className="size-4 text-wine-400" aria-hidden /> {company.hours}
                </p>
              )}
              {company.email && (
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Mail className="size-4 text-wine-400" aria-hidden /> {company.email}
                </a>
              )}
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((column, index) => (
              <nav key={column.title} aria-label={`Footer — ${column.title}`} className={index === 2 ? "col-span-2 sm:col-span-1" : undefined}>
                <h2 className="font-display text-xs font-semibold tracking-[0.24em] text-steel-200 uppercase">{column.title}</h2>
                <span aria-hidden className="mt-3 block h-[2px] w-8 bg-wine-600" />
                <ul className="mt-5 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
