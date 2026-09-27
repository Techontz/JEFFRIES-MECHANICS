import Image from "next/image";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { quoteHref } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Mechanical services, electrical contracting, facility maintenance, specialized trade services and construction support for commercial and public-sector projects in the Kansas City region.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Contracting capabilities
            <br />
            built to perform
          </>
        }
        intro="We deliver mechanical, electrical, facility, and specialized-trade services for commercial facilities, public-sector projects, prime contractors, and organizations requiring dependable performance."
        image="/images/photos/electrical-panel.jpg"
        imageAlt="Commercial electrical control panel"
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="glass px-4 py-2 font-display text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white/25"
            >
              {service.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="bg-white">
        {services.map((service, index) => {
          const flipped = index % 2 === 1;

          return (
            <section key={service.slug} id={service.slug} className={cn("scroll-mt-28 overflow-x-clip py-20 lg:py-28", index % 2 === 1 && "steel-wash")}>
              <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn("relative", flipped && "lg:order-2")}>
                  <div aria-hidden className={cn("absolute -top-5 h-1/2 w-1/2 -skew-x-[10deg] wine-fill", flipped ? "-right-5" : "-left-5")} />
                  <div className={cn("relative aspect-[4/3] overflow-hidden", flipped ? "clip-slant-l" : "clip-slant-r", "[--slant:10%]")}>
                    <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine-950/40 to-transparent" />
                  </div>
                  <span className="absolute bottom-5 left-6 font-display text-7xl leading-none font-bold text-white/85 drop-shadow-[0_4px_20px_rgb(0_0_0/0.4)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Reveal>

                <Reveal delay={100}>
                  <HexIcon icon={service.icon} tone="wine" size="lg" />
                  <h2 className="mt-6 font-display text-4xl leading-none font-bold text-steel-950 uppercase sm:text-5xl">{service.title}</h2>
                  <span aria-hidden className="mt-6 block h-[3px] w-20 steel-rule" />
                  <p className="mt-6 text-lg leading-relaxed text-steel-700">{service.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-steel-700">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-wine-600 text-white">
                          <Check className="size-3" strokeWidth={3} aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <ButtonLink href={`${quoteHref}?service=${service.slug}`} arrow>
                      Request a Quote
                    </ButtonLink>
                    {service.slug === "facility-maintenance" && (
                      <ButtonLink href="/contact?type=service" variant="outline">
                        Request Service
                      </ButtonLink>
                    )}
                  </div>
                </Reveal>
              </Container>
            </section>
          );
        })}
      </div>

      <CtaBand title="Need a trade partner?" text="Whether you're an owner, facility manager, agency or prime contractor, tell us about the scope and we'll respond with a clear plan." />
    </>
  );
}
