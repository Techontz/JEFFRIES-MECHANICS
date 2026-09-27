import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/company-values";

export function ProcessSection() {
  return (
    <section className="steel-wash relative overflow-hidden py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="From opportunity review to closeout"
          intro="Clear communication at every stage — so owners, agencies and prime contractors always know where their scope stands."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute top-[27px] right-[8%] left-[4%] hidden h-[2px] bg-gradient-to-r from-wine-600 via-steel-300 to-steel-300 lg:block" />
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 110} className="relative">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="relative grid size-14 place-items-center wine-fill-v font-display text-lg font-bold text-white shadow-wine [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold tracking-wide text-steel-950 uppercase lg:mt-6">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-600 lg:max-w-[16rem]">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
