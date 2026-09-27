import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { contractingHref, quoteHref } from "@/content/navigation";

/**
 * First viewport: logo/nav (layout) → headline → CTA → photography → steel service strip.
 * Phones get a vertical grade so the crew stays visible above the message.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-76px)] items-end overflow-hidden bg-ink pb-24 sm:min-h-[780px] sm:pb-40 lg:min-h-[max(820px,calc(100svh-130px))] lg:pb-52 2xl:max-h-[1120px]">
      <Image
        src="/images/photos/hero-crew-graded.jpg"
        alt="Jeffries Mechanicals field crew in hard hats on a commercial jobsite"
        fill
        preload
        quality={85}
        sizes="100vw"
        className="-z-20 animate-[heroZoom_2.4s_var(--ease-industrial)_both] object-cover object-[36%_18%] contrast-[1.04] sm:object-[58%_28%] lg:object-[60%_30%]"
      />

      {/* Photo grading */}
      <div aria-hidden className="absolute inset-0 -z-10 hero-grade-mobile lg:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden hero-grade lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/2 bg-gradient-to-t from-ink/90 to-transparent lg:block" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-35 mix-blend-overlay [background-image:var(--noise)]" />
      {/* Wine blade on the right edge */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-2 wine-fill-v lg:block" />

      <Container className="relative">
        <div className="max-w-[min(72rem,64vw)] max-lg:max-w-none">
          <p className="flex animate-rise items-center gap-4 font-display text-[11px] font-medium tracking-[0.28em] text-steel-200 uppercase sm:text-xs">
            <span aria-hidden className="h-px w-10 steel-rule sm:w-14" />
            <span className="sm:hidden">Commercial • Public Sector • Trades</span>
            <span className="hidden sm:inline">Commercial • Public Sector • Institutional • Specialized Trades</span>
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.1rem,10.4vw,2.75rem)] leading-[0.9] font-bold tracking-[-0.015em] text-white uppercase sm:mt-8 sm:text-7xl lg:text-[clamp(5.6rem,6.3vw,8.4rem)]">
            <span className="block animate-rise [animation-delay:120ms]">Built for the work</span>
            <span className="relative isolate mt-2 inline-block animate-wipe px-3 pt-1 pb-2 [animation-delay:420ms] sm:mt-3 sm:px-5">
              <span aria-hidden className="absolute inset-0 -z-10 wine-plate [clip-path:polygon(0_0,100%_0,calc(100%-0.22em)_100%,0_100%)]" />
              that matters.
            </span>
          </h1>

          <span aria-hidden className="mt-8 block h-[3px] w-24 animate-rise steel-rule [animation-delay:520ms] sm:mt-10" />

          <p className="mt-6 max-w-2xl animate-rise text-[15px] leading-relaxed text-steel-100 [animation-delay:600ms] sm:mt-7 sm:text-lg 2xl:max-w-3xl 2xl:text-xl">
            <span className="sm:hidden">{company.summary}</span>
            <span className="hidden sm:inline">{company.description}</span>
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:720ms] sm:mt-10 sm:flex-row sm:gap-4">
            <ButtonLink href={quoteHref} size="lg" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href={contractingHref} size="lg" variant="glass">
              Contracting Opportunities
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
