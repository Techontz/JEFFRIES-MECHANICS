import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contractingHref, quoteHref } from "@/content/navigation";

type Props = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = "Built for the work ahead",
  text = "Commercial projects. Public-sector opportunities. Specialized trade requirements. Jeffries Mechanicals brings the people, systems, and contracting infrastructure required to support demanding projects throughout the Kansas City regional market.",
}: Props) {
  return (
    <section className="wine-surface relative overflow-hidden py-24 text-center lg:py-32">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px steel-rule opacity-70" />
      <div aria-hidden className="absolute -top-24 -right-24 size-96 rotate-45 border border-white/10" />
      <div aria-hidden className="absolute -bottom-32 -left-20 size-80 rotate-45 border border-white/10" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl">
          <div aria-hidden className="flex justify-center gap-4">
            <span className="h-[2px] w-16 steel-rule" />
            <span className="h-[2px] w-16 steel-rule" />
          </div>
          <h2 className="mt-7 font-display text-4xl leading-none font-bold text-white uppercase sm:text-6xl lg:text-7xl">{title}</h2>
          <span aria-hidden className="mx-auto mt-7 block h-[2px] w-40 steel-rule" />
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href={quoteHref} variant="white" size="lg" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href={contractingHref} variant="glass" size="lg">
              Contracting Opportunities
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
