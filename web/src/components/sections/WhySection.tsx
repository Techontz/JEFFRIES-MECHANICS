import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/company-values";

export function WhySection() {
  return (
    <section className="charcoal relative overflow-hidden py-28 lg:py-36">
      {/* welding photo, wine-graded, bleeding off the left */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[42%] clip-slant-r [--slant:18%] lg:block">
        <Image src="/images/photos/boiler-room.jpg" alt="" fill sizes="42vw" className="object-cover object-[60%_center] brightness-[0.55] contrast-125 grayscale" />
        <div className="absolute inset-0 bg-wine-900/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-950/30 via-steel-900/70 to-steel-900" />
      </div>

      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:pt-8">
          <SectionHeading
            tone="light"
            eyebrow="Why Jeffries Mechanicals"
            title={
              <>
                Performance starts <span className="steel-text">before the jobsite</span>
              </>
            }
            intro="Successful contracting requires more than technical capability. It requires preparation, communication, documentation, accountability, and disciplined execution. Jeffries Mechanicals operates with the systems and standards that commercial and public-sector contracting demands."
          />
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title} delay={index * 100} className={index % 2 === 1 ? "sm:translate-y-10" : undefined}>
              <div className="glass-dark group flex h-full gap-5 p-5 transition-colors duration-300 hover:border-wine-400/50 sm:block sm:p-7 lg:p-8">
                <HexIcon icon={pillar.icon} tone="wine" className="max-sm:size-12" />
                <div>
                  <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase sm:mt-6 sm:text-xl">{pillar.title}</h3>
                  <span aria-hidden className="mt-3 hidden h-px w-10 steel-rule sm:block" />
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-300 sm:mt-4">{pillar.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
