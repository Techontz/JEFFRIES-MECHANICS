import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Screw } from "@/components/ui/Screw";
import { company } from "@/content/company";
import { pillars } from "@/content/company-values";

/**
 * "Who we are": a balanced two-column composition (~48 / 52) sized so the image,
 * copy, all four pillars and both buttons fit a 1440×900 viewport together.
 */
export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-20 lg:py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] blueprint [mask-image:radial-gradient(60%_60%_at_25%_50%,black,transparent)]"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-[clamp(3rem,5vw,6rem)]">
        {/* Image composition: wine backing, steel sliver, main photo, inset photo */}
        <Reveal className="relative mx-auto w-full max-w-2xl pt-5 pl-5 sm:pt-6 sm:pl-6 lg:max-w-none">
          <div aria-hidden className="absolute top-0 left-0 h-[68%] w-[52%] wine-fill [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]" />
          <div aria-hidden className="absolute top-0 left-[49%] h-[34%] w-[10%] steel-plate [clip-path:polygon(28%_0,100%_0,62%_100%,0_100%)]" />

          <div className="relative aspect-[3/2] overflow-hidden bg-steel-200 shadow-panel sm:aspect-[5/4]">
            <Image
              src="/images/photos/mechanical-ductwork.jpg"
              alt="Mechanical technicians installing insulated HVAC ductwork"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover object-[58%_50%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-wine-950/45 via-transparent to-transparent" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] wine-bar" />

            <div className="glass-dark absolute top-4 left-4 flex items-center gap-3 px-4 py-2.5 text-white sm:top-5 sm:left-5">
              <MapPin className="size-4 text-wine-400" aria-hidden />
              <span className="leading-tight">
                <span className="block font-display text-[13px] font-semibold tracking-wider uppercase">Kansas City, KS</span>
                <span className="block text-[11px] text-white/80">{company.address.street}</span>
              </span>
            </div>
          </div>

          {/* Inset: steel-framed, overlaps only the window area at the lower right */}
          <div className="steel-plate absolute -right-2 -bottom-10 w-[32%] p-1.5 sm:-right-5 sm:-bottom-12 sm:w-[30%] lg:-right-[9%] lg:w-[28%]">
            <Screw className="top-0.5 left-0.5 !size-[7px]" angle={30} />
            <Screw className="right-0.5 bottom-0.5 !size-[7px]" angle={-20} />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/photos/valves-corridor.jpg"
                alt="Industrial valves and piping in a mechanical corridor"
                fill
                sizes="(min-width: 1024px) 14vw, 30vw"
                className="object-cover brightness-[0.8] contrast-125 grayscale"
              />
              <div aria-hidden className="absolute inset-0 bg-wine-800/55 mix-blend-multiply" />
            </div>
          </div>
        </Reveal>

        <div className="max-w-[46rem]">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-display text-[2.3rem] leading-[0.98] font-bold text-steel-950 uppercase sm:text-5xl lg:text-[clamp(2.75rem,3.3vw,3.75rem)]">
              More than mechanical.
              <span className="block wine-text">A higher standard.</span>
            </h2>
            <span aria-hidden className="mt-5 block h-[3px] w-20 steel-rule" />
            <p className="mt-5 text-[17px] leading-relaxed text-steel-700">
              Successful contracting requires more than technical capability. It requires preparation, communication,
              documentation, accountability, and disciplined execution.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-steel-600">
              {company.legalName} operates with the systems and standards that commercial and public-sector contracting
              demands — bringing mechanical, electrical, and specialized-trade capability to projects across Kansas and the
              surrounding region.
            </p>
          </Reveal>

          {/* 2 × 2 pillar grid on a steel hairline frame */}
          <ul className="mt-7 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={index * 70} className="group flex gap-3 bg-white p-4 transition-colors hover:bg-steel-50 sm:p-5">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center wine-fill text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-[15px] leading-tight font-semibold tracking-wide text-steel-950 uppercase">
                    {pillar.title}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-snug text-steel-600">{pillar.short}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <ButtonLink href="/about" arrow>
              About Jeffries
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" className="bg-white">
              Our Capabilities
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
