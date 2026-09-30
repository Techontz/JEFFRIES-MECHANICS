import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contractingHref, quoteHref } from "@/content/navigation";

const sectors = ["Commercial", "Public Sector", "Institutional", "Infrastructure", "Specialized Trades"];
const values = ["People", "Safety", "Quality", "Accountability", "Results"];

/**
 * First viewport, after the client's reference: near-black industrial field, the jobsite
 * photograph bleeding in from the right, Montserrat headline with a chrome middle line,
 * and a dark brushed-steel values tag on the right edge. The steel service strip overlaps
 * the bottom, so the tag sits just above it.
 * Below lg the photograph is a band under the header and the copy stacks beneath it.
 */
export function Hero() {
  return (
    <section className="hero-ink relative isolate overflow-hidden lg:flex lg:min-h-[clamp(640px,calc(100svh-130px),900px)] lg:items-center">
      <div className="relative h-[clamp(260px,70vw,360px)] overflow-hidden [mask-image:linear-gradient(180deg,#000_55%,transparent)] sm:h-[clamp(340px,52vw,440px)] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[30%] lg:h-auto lg:[mask-image:linear-gradient(90deg,transparent,#000_34%)]">
        <Image
          src="/images/photos/hero-jobsite.jpg"
          alt="Tradeswoman in a white hard hat and high-visibility vest holding a clipboard beside a crew member on a steel-frame jobsite"
          fill
          preload
          quality={85}
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="animate-[heroZoom_2.4s_var(--ease-industrial)_both] object-cover object-[62%_30%] brightness-[0.78] contrast-[1.1] saturate-[0.85] lg:object-[58%_30%]"
        />
        <div aria-hidden className="absolute inset-0 hero-ink-grade" />
      </div>

      {/* Values tag — right edge, just above the service strip */}
      <div className="steel-dark-plate absolute right-0 bottom-32 z-10 hidden py-5 pr-[clamp(1.5rem,3vw,3.5rem)] pl-20 [clip-path:polygon(52px_0,100%_0,100%_100%,0_100%)] lg:block 2xl:bottom-36">
        <ul className="space-y-1 font-logo text-[12.5px] font-bold tracking-[0.06em] text-white uppercase [text-shadow:0_1px_2px_rgb(0_0_0/0.5)]">
          {values.map((value) => (
            <li key={value} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-4 bg-wine-400" />
              {value}.
            </li>
          ))}
        </ul>
      </div>

      <Container className="relative -mt-20 pb-24 sm:-mt-28 sm:pb-36 lg:mt-0 lg:pt-14 lg:pb-40 2xl:pb-44">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-[min(44rem,50%)]">
          <h1 className="font-logo text-[clamp(2.4rem,10.5vw,3.3rem)] leading-[1] font-extrabold tracking-[-0.01em] uppercase [text-shadow:0_2px_24px_rgb(0_0_0/0.45)] sm:text-[clamp(3.3rem,8vw,4.6rem)] lg:text-[clamp(3.6rem,5vw,5.9rem)]">
            <span className="block animate-rise text-white [animation-delay:120ms]">Built for</span>
            <span className="block animate-rise chrome-text [animation-delay:240ms]">the work</span>
            <span className="block animate-rise text-white [animation-delay:360ms]">that matters</span>
          </h1>

          <p className="mt-6 max-w-[36rem] animate-rise text-[15px] leading-relaxed text-white/90 [animation-delay:480ms] sm:text-[17px] 2xl:text-lg">
            Jeffries Mechanicals LLC delivers electrical, mechanical, facility, construction-support, and specialized trade
            capabilities for commercial, institutional, public-sector, and infrastructure environments throughout the Kansas
            City region.
          </p>

          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:600ms] sm:flex-row sm:gap-4">
            <ButtonLink href={quoteHref} size="lg" arrow className="font-logo tracking-[0.06em] max-sm:h-[52px]">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={contractingHref} size="lg" variant="glass" arrow className="font-logo tracking-[0.06em] max-sm:h-[52px]">
              Contracting Opportunities
            </ButtonLink>
          </div>

          <span aria-hidden className="mt-9 block h-px w-10 animate-rise bg-white/60 [animation-delay:700ms]" />
          <ul
            aria-label="Sectors served"
            className="mt-4 flex animate-rise flex-wrap items-center gap-x-4 gap-y-2 font-logo text-[10.5px] font-bold tracking-[0.05em] whitespace-nowrap text-white uppercase [animation-delay:740ms] sm:gap-x-0 sm:text-[12px] lg:flex-nowrap lg:text-[clamp(10.5px,0.82vw,12.5px)]"
          >
            {sectors.map((sector, index) => (
              <li key={sector} className="flex items-center">
                {index > 0 && <span aria-hidden className="mx-3.5 hidden h-3 w-px bg-white/45 sm:block" />}
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
