import { GraduationCap, HardHat, ShieldCheck, Users } from "lucide-react";
import { CareerFormPanel } from "@/components/forms/LiveForms";
import { JobOpenings } from "@/components/sections/JobOpenings";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Build your trade career with Jeffries Mechanicals in Kansas City, KS. We hire mechanical, electrical, pipefitting, welding, maintenance and project administration professionals.",
  path: "/careers",
});

const values = [
  { icon: ShieldCheck, title: "Safety first", text: "Every jobsite, every shift. Safe work is the standard, not the exception." },
  { icon: HardHat, title: "Skilled trades", text: "Mechanical, electrical and specialized work on commercial and public-sector projects." },
  { icon: GraduationCap, title: "Room to grow", text: "Apprentices and experienced professionals alike are welcome to apply." },
  { icon: Users, title: "Accountable team", text: "Clear expectations, clear communication, and people who own their work." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build the work
            <br />
            that matters
          </>
        }
        intro="We're building a team of skilled tradespeople and project professionals who take pride in doing the job right."
        image="/images/photos/jm-careers-team.jpg"
        imageAlt="Jeffries Mechanicals team in hard hats, safety glasses and navy workwear at an industrial plant"
        imagePosition="center 30%"
      >
        <ButtonLink href="#apply" arrow size="lg">
          Apply now
        </ButtonLink>
      </PageHero>

      <section className="bg-white py-24 lg:py-28">
        <Container>
          <SectionHeading eyebrow="Why join us" title="What we look for" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 90} className="group border border-steel-200 bg-steel-50 p-7 transition-colors hover:border-wine-300">
                <HexIcon icon={value.icon} />
                <h3 className="mt-5 font-display text-xl font-bold tracking-wide text-steel-950 uppercase">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="steel-wash py-24 lg:py-28">
        <Container>
          <JobOpenings />
        </Container>
      </section>

      <section id="apply" className="relative scroll-mt-28 bg-white py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Apply</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-none font-bold text-steel-950 uppercase sm:text-5xl">Send us your application</h2>
            <span aria-hidden className="mt-7 block h-[3px] w-20 steel-rule" />
            <p className="mt-7 text-steel-600">
              Choose a posted opening or the trade you work in, attach your resume, and our team will review it. Applications
              are kept confidential and used only for hiring.
            </p>
          </Reveal>
          <div className="relative bg-white p-6 shadow-panel ring-1 ring-steel-200 sm:p-10">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] wine-bar" />
            <CareerFormPanel />
          </div>
        </Container>
      </section>
    </>
  );
}
