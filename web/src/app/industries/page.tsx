import { FileCheck2, Handshake, Landmark, ScrollText } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { MarketPanels } from "@/components/sections/MarketPanels";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Jeffries Mechanicals serves government and municipal, commercial, institutional, prime contractor, facilities and infrastructure clients where safety, documentation and dependable trade performance are required.",
  path: "/industries",
});

const contracting = [
  { icon: Landmark, title: "Public agencies", text: "Municipal and agency projects, maintenance requirements and contracting opportunities." },
  { icon: Handshake, title: "Prime contractors", text: "Subcontracting and specialized-trade packages for general contractors and construction managers." },
  { icon: FileCheck2, title: "Documentation", text: "Submittals, project records, payroll and closeout documentation handled with discipline." },
  { icon: ScrollText, title: "Teaming", text: "Open to teaming arrangements on qualified commercial and public-sector bids." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for commercial
            <br />& public-sector work
          </>
        }
        intro="Jeffries Mechanicals serves organizations where safety, documentation, scheduling, compliance, and dependable trade performance are required."
        image="/images/photos/government-capitol.jpg"
        imageAlt="Government capitol building"
        imagePosition="center 30%"
      />

      <section className="steel-wash py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Markets we serve" title="Six markets. One standard." intro="From public facilities to prime-contractor trade packages, we bring the same preparation and accountability to every scope." />
          <div className="mt-14">
            <MarketPanels linked={false} />
          </div>
        </Container>
      </section>

      <section id="contracting" className="charcoal relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
        <div aria-hidden className="absolute top-0 right-0 h-full w-1/3 -skew-x-[14deg] translate-x-1/3 bg-gradient-to-b from-wine-700/40 to-transparent" />
        <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Government & prime"
              title={
                <>
                  Contracting <span className="steel-text">opportunities</span>
                </>
              }
              intro="Public agencies and prime contractors need trade partners who show up prepared. We welcome bid invitations, RFQs and teaming conversations for mechanical, electrical and specialized-trade scopes."
            />
            <Reveal className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact?subject=Contracting%20opportunity" arrow>
                Send an Opportunity
              </ButtonLink>
              <ButtonLink href="/quote" variant="glass">
                Request a Quote
              </ButtonLink>
            </Reveal>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {contracting.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 90} className="glass-dark p-7">
                <HexIcon icon={item.icon} tone="wine" />
                <h3 className="mt-5 font-display text-xl font-bold tracking-wide text-white uppercase">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
