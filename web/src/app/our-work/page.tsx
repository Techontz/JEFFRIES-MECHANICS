import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectPortfolio } from "@/components/sections/ProjectPortfolio";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "The mechanical, electrical, maintenance and specialized-trade work Jeffries Mechanicals delivers for commercial, institutional and public-sector clients.",
  path: "/our-work",
});

const capabilityGallery = [
  { image: "/images/photos/mechanical-ductwork.jpg", title: "HVAC & ductwork", tag: "Mechanical" },
  { image: "/images/photos/electrical-panel.jpg", title: "Panels & controls", tag: "Electrical" },
  { image: "/images/photos/specialized-welding.jpg", title: "Welding & fabrication", tag: "Specialized trades" },
  { image: "/images/photos/boiler-room.jpg", title: "Mechanical rooms", tag: "Facility maintenance" },
  { image: "/images/photos/rooftop-hvac.jpg", title: "Rooftop equipment", tag: "Mechanical" },
  { image: "/images/photos/valves-corridor.jpg", title: "Piping & valves", tag: "Mechanical" },
  { image: "/images/photos/electrician-testing.jpg", title: "Testing & troubleshooting", tag: "Electrical" },
  { image: "/images/photos/infrastructure-structure.jpg", title: "Infrastructure support", tag: "Construction support" },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Work that holds
            <br />
            up to scrutiny
          </>
        }
        intro="Mechanical, electrical and specialized-trade work for commercial facilities, public agencies, institutions and prime contractors across the Kansas City region."
        image="/images/photos/jm-pipefitter-wide-v2.jpg"
        imageAlt="Jeffries Mechanicals pipefitter in a hard hat working on stainless process piping"
        imagePosition="right center"
      />

      <ProjectPortfolio />

      <section className="steel-wash py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="In the field"
            title="The work we're built for"
            intro="A look at the systems, spaces and trade work behind our capabilities, from mechanical rooms and rooftop equipment to panels, piping and fabrication."
          />
          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] lg:grid-cols-4 lg:gap-4">
            {capabilityGallery.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 4) * 80}
                className={cn(
                  "group relative overflow-hidden bg-ink",
                  (index === 0 || index === 5) && "col-span-2 lg:row-span-2",
                  index === 3 && "row-span-2",
                )}
              >
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-industrial)] group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-wine-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-steel-200 uppercase">{item.tag}</p>
                  <p className="mt-1 font-display text-xl font-bold tracking-wide text-white uppercase lg:text-2xl">{item.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Have a project in mind?" text="Tell us the scope, location and schedule. We'll review it and follow up with a clear, documented proposal." />
    </>
  );
}
