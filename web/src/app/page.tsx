import { AboutPreview } from "@/components/sections/AboutPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ImageDuo } from "@/components/sections/ImageDuo";
import { MarketPanels } from "@/components/sections/MarketPanels";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceStrip } from "@/components/sections/ServiceStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySection } from "@/components/sections/WhySection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contractingHref } from "@/content/navigation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceStrip />
      <AboutPreview />
      <StatsBand />
      <ImageDuo />

      <section className="steel-wash relative py-28 lg:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Markets we serve"
              title="Built for commercial and public-sector work"
              intro="Jeffries Mechanicals serves organizations where safety, documentation, scheduling, compliance, and dependable trade performance are required."
            />
            <ButtonLink href={contractingHref} variant="outline" arrow className="shrink-0 self-start lg:self-end">
              Contracting Opportunities
            </ButtonLink>
          </div>
          <div className="mt-14">
            <MarketPanels />
          </div>
        </Container>
      </section>

      <WhySection />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
