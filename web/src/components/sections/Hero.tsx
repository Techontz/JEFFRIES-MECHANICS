import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { contractingHref, quoteHref } from "@/content/navigation";

/**
 * First viewport: logo/nav (layout) → headline → CTA → photography → steel service strip.
 *
 * Desktop: a deep wine panel carries the type on the left; the photograph owns the right
 * ~two-thirds so the machinist is never under the headline.
 * Below lg: the photograph is a fixed-ratio band directly under the header and the copy
 * stacks beneath it — no viewport-height padding, so there is no empty space above the message.
 */
export function Hero() {
  return (
    <section className="hero-panel-stack lg:hero-panel relative isolate overflow-hidden lg:flex lg:min-h-[clamp(620px,calc(100svh-210px),860px)] lg:items-center">
      {/* Photograph — masked (not colour-faded) into the wine panel so there is never a seam */}
      <div className="relative h-[clamp(230px,62vw,300px)] overflow-hidden [mask-image:linear-gradient(180deg,#000_42%,transparent)] sm:h-[clamp(300px,46vw,380px)] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[34%] lg:h-auto lg:[mask-image:linear-gradient(90deg,transparent,#000_42%)] 2xl:left-[36%]">
        <Image
          src="/images/photos/hero-machinist-graded.jpg"
          alt="Jeffries Mechanicals tradesman in a hard hat operating heavy machining equipment"
          fill
          preload
          quality={85}
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="animate-[heroZoom_2.4s_var(--ease-industrial)_both] object-cover object-[46%_32%] lg:object-[50%_40%]"
        />
        <div aria-hidden className="absolute inset-0 hero-photo-grade" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-wine-950/80 to-transparent lg:block" />
        <div aria-hidden className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:var(--noise)]" />
      </div>

      {/* Wine blade on the right edge */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1.5 wine-fill-v lg:block" />

      <Container className="relative -mt-14 pb-24 sm:-mt-20 sm:pb-36 lg:mt-0 lg:pt-16 lg:pb-40 2xl:pb-44">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-[min(52rem,58%)]">
          <p className="flex animate-rise items-center gap-3 font-display text-[10.5px] font-medium tracking-[0.26em] whitespace-nowrap text-steel-200 uppercase sm:gap-4 sm:text-xs lg:tracking-[0.24em]">
            <span aria-hidden className="h-px w-8 steel-rule sm:w-12" />
            <span className="sm:hidden">Commercial • Public Sector • Trades</span>
            <span className="hidden sm:inline">Commercial • Public Sector • Institutional • Specialized Trades</span>
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.95rem,9vw,2.5rem)] leading-[0.95] font-bold tracking-[-0.005em] text-white uppercase sm:mt-6 sm:text-[clamp(2.75rem,7vw,3.75rem)] lg:text-[clamp(3.5rem,4.9vw,5.75rem)]">
            <span className="block animate-rise whitespace-nowrap [animation-delay:120ms]">Built for the work</span>
            <span className="relative isolate mt-1.5 inline-block animate-wipe px-2.5 pt-0.5 pb-1 [animation-delay:420ms] sm:mt-2 sm:px-4 sm:pb-1.5">
              <span aria-hidden className="absolute inset-0 -z-10 wine-plate [clip-path:polygon(0_0,100%_0,calc(100%-0.2em)_100%,0_100%)]" />
              that matters.
            </span>
          </h1>

          <span aria-hidden className="mt-6 block h-[3px] w-16 animate-rise steel-rule [animation-delay:520ms] sm:mt-8 sm:w-20" />

          <p className="mt-5 max-w-[34rem] animate-rise sm:max-w-[40rem] lg:max-w-[38rem] text-[15px] leading-relaxed text-steel-100/90 [animation-delay:600ms] sm:mt-6 sm:text-[17px] 2xl:max-w-[42rem] 2xl:text-lg">
            <span className="sm:hidden">{company.summary}</span>
            <span className="hidden sm:inline">{company.description}</span>
          </p>

          <div className="mt-7 flex animate-rise flex-col gap-3 [animation-delay:720ms] sm:mt-9 sm:flex-row sm:gap-4">
            <ButtonLink href={quoteHref} size="lg" arrow className="max-sm:h-[52px]">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={contractingHref} size="lg" variant="glass" className="max-sm:h-[52px]">
              Contracting Opportunities
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
