import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const states = ["Kansas", "Missouri", "Illinois"];

/** Homepage ownership band: the "Our Foundation" credentials closed by the regional service strip. */
export function FoundationBand() {
  return (
    <section aria-labelledby="foundation-heading" className="wine-surface relative overflow-hidden text-center">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px steel-rule opacity-70" />
      <div aria-hidden className="absolute -top-24 -left-24 size-96 rotate-45 border border-white/10" />
      <div aria-hidden className="absolute -right-32 -bottom-40 size-[28rem] rotate-45 border border-white/10" />

      <Container className="relative py-20 lg:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="font-mono text-xs font-semibold tracking-[0.3em] text-white uppercase sm:text-sm">Our Foundation</p>
          <div aria-hidden className="mt-5 flex justify-center gap-3">
            <span className="h-[3px] w-12 steel-rule" />
            <span className="h-[3px] w-12 steel-rule" />
          </div>
          <h2
            id="foundation-heading"
            className="mt-6 font-display text-4xl leading-[1.02] font-bold text-white uppercase sm:text-6xl lg:text-7xl"
          >
            100% Woman-Owned
            <br />
            Veteran-Owned
          </h2>
          <span aria-hidden className="mx-auto mt-7 block h-[3px] w-28 steel-rule" />
          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
            Jeffries Mechanicals LLC is a proud woman-owned, veteran-owned specialized trade contractor, delivering electrical,
            mechanical, and construction-support capability across the Kansas City metropolitan region and communities throughout
            Illinois.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center font-display text-base font-semibold tracking-[0.14em] uppercase sm:text-lg">
            {states.map((state, index) => (
              <li key={state} className={`px-5 text-white sm:px-7 ${index > 0 ? "border-l border-white/35" : ""}`}>
                {state}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="relative border-t border-white/15 bg-wine-950/60">
        <Container>
          <p className="py-4 font-display text-xs font-semibold tracking-[0.2em] text-white uppercase sm:text-sm">
            Serving commercial, public-sector &amp; institutional projects across the region &amp; beyond
          </p>
        </Container>
      </div>
    </section>
  );
}
