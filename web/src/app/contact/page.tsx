import { ArrowUpRight, Clock3, FileText, Mail, MapPin, Phone } from "lucide-react";
import { ContactForms } from "@/components/forms/ContactForms";
import { FormUnavailable } from "@/components/forms/FormUnavailable";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { company, fullAddress } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { getFormOptions } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${company.legalName} at ${fullAddress}. Send a general inquiry, a contracting opportunity, or a service request for an existing building system.`,
  path: "/contact",
});

function ChannelTag({ href, ...props }: React.ComponentProps<"a">) {
  return href ? <a href={href} {...props} /> : <div className={props.className}>{props.children}</div>;
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [options, params] = await Promise.all([getFormOptions(), searchParams]);
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(company.mapsQuery)}`;

  const channels = [
    { icon: MapPin, label: "Office", value: fullAddress, href: directionsUrl, external: true },
    ...(company.phone ? [{ icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}`, external: false }] : []),
    ...(company.email ? [{ icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}`, external: false }] : []),
    ...(company.hours ? [{ icon: Clock3, label: "Hours", value: company.hours, href: undefined, external: false }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about
            <br />
            the work
          </>
        }
        intro="Questions, bid invitations, teaming opportunities or a building system that needs attention — reach the Jeffries Mechanicals team here."
        image="/images/photos/commercial-office.jpg"
        imageAlt="Commercial office building"
      />

      <section className="bg-white pt-16 pb-24 lg:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div className="space-y-5">
            <Reveal>
              <Eyebrow>Reach us</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-none font-bold text-steel-950 uppercase">{company.legalName}</h2>
            </Reveal>

            {channels.map(({ icon: Icon, label, value, href, external }, index) => (
              <Reveal key={label} delay={index * 80}>
                <ChannelTag
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start gap-4 border border-steel-200 bg-steel-50 p-5 transition-colors hover:border-wine-400"
                >
                  <span className="grid size-11 shrink-0 place-items-center bg-wine-600 text-white">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xs font-semibold tracking-[0.2em] text-steel-500 uppercase">{label}</span>
                    <span className="mt-1 block font-medium text-steel-900">{value}</span>
                  </span>
                  {href && <ArrowUpRight className="size-5 text-steel-400 transition-colors group-hover:text-wine-600" aria-hidden />}
                </ChannelTag>
              </Reveal>
            ))}

            <Reveal delay={200} className="charcoal relative overflow-hidden p-7 text-white">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-wine-600" />
              <FileText className="size-6 text-wine-400" aria-hidden />
              <p className="mt-4 font-display text-xl font-bold tracking-wide uppercase">Pricing a project?</p>
              <p className="mt-2 text-sm text-steel-300">Use our quote request to share scope, location, timing and drawings in one place.</p>
              <ButtonLink href={quoteHref} arrow className="mt-6">
                Get a Quote
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={100} className="relative self-start bg-white shadow-panel ring-1 ring-steel-200">
            <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[3px] wine-bar" />
            {options ? (
              <ContactForms
                options={options}
                initialTab={params.type === "service" ? "service" : "general"}
                initialSubject={typeof params.subject === "string" ? params.subject : ""}
              />
            ) : (
              <FormUnavailable />
            )}
          </Reveal>
        </Container>
      </section>

      <section aria-label="Map" className="relative h-[420px] bg-steel-200 lg:h-[480px]">
        <iframe
          title={`Map showing ${fullAddress}`}
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 grayscale-[0.85] contrast-[1.05]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-wine-900/10 mix-blend-multiply" />
        <Container className="pointer-events-none relative h-full">
          <div className="glass-dark pointer-events-auto absolute bottom-8 left-5 max-w-xs p-6 text-white sm:left-8 lg:right-12 lg:left-auto">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-steel-300 uppercase">Visit</p>
            <p className="mt-2 font-display text-lg font-bold tracking-wide uppercase">{company.legalName}</p>
            <p className="mt-1 text-sm text-steel-200">{fullAddress}</p>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.18em] text-white uppercase hover:text-steel-200">
              Get directions <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
