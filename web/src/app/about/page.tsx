import Image from "next/image";
import { FileCheck2, Landmark, ShieldCheck, Users } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySection } from "@/components/sections/WhySection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { company, fullAddress } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Jeffries Mechanicals LLC is a Kansas City, KS contractor delivering mechanical, electrical and specialized trade work with the systems and standards commercial and public-sector contracting demands.",
  path: "/about",
});

const readiness = [
  { icon: FileCheck2, title: "Procurement & documentation", text: "Business systems that support bid documents, submittals, project records and closeout packages." },
  { icon: ShieldCheck, title: "Insurance & bonding", text: "Business systems designed to support the insurance and bonding requirements of commercial and public-sector contracts." },
  { icon: Users, title: "Payroll & administration", text: "Payroll and project administration systems designed to meet contract reporting requirements." },
  { icon: Landmark, title: "Public-sector ready", text: "Prepared to participate in municipal, agency and prime-contractor opportunities across the region." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            More than mechanical.
            <br />A higher standard.
          </>
        }
        intro={company.description}
        image="/images/photos/mechanical-room.jpg"
        imageAlt="Commercial mechanical room with pumps and piping"
      />

      <section className="relative overflow-x-clip bg-white py-24 lg:py-32">
        <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-none font-bold text-steel-950 uppercase sm:text-5xl">
              A contractor built for <span className="wine-text">accountability</span>
            </h2>
            <span aria-hidden className="mt-7 block h-[3px] w-20 steel-rule" />
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-steel-700">
              <p>
                {company.legalName} provides mechanical, electrical, and specialized trade contracting for commercial,
                public-sector, and infrastructure projects across Kansas and the surrounding region.
              </p>
              <p className="text-base text-steel-600">
                Successful contracting requires more than technical capability. It requires preparation, communication,
                documentation, accountability, and disciplined execution. We operate with the systems and standards that
                commercial and public-sector contracting demands — so owners, agencies and prime contractors can rely on
                the scope we commit to.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={quoteHref} arrow>
                Request a Quote
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                View Services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div aria-hidden className="absolute -right-4 -bottom-6 h-2/3 w-2/3 -skew-x-[10deg] wine-fill sm:-right-8" />
            <div className="relative aspect-[4/3] overflow-hidden clip-angle-br [--cut:64px]">
              <Image src="/images/photos/electrician-testing.jpg" alt="Electrician testing a control panel with a multimeter" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="glass-dark absolute bottom-6 left-6 max-w-[16rem] p-5 text-white">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-steel-300 uppercase">Headquarters</p>
              <p className="mt-2 text-sm leading-relaxed">{fullAddress}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatsBand />
      <WhySection />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>Contract-ready</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-none font-bold text-steel-950 uppercase sm:text-5xl">The systems behind the work</h2>
            <span aria-hidden className="mt-7 block h-[3px] w-20 steel-rule" />
            <p className="mt-7 text-lg text-steel-600">
              Commercial and public-sector contracting demands more than field capability. Our business infrastructure is
              designed to support it from day one.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
            {readiness.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 90} className="group bg-white p-8 transition-colors hover:bg-steel-50">
                <HexIcon icon={item.icon} />
                <h3 className="mt-6 font-display text-lg font-bold tracking-wide text-steel-950 uppercase">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection />
      <CtaBand />
    </>
  );
}
