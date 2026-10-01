import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const states = ["Kansas", "Missouri", "Illinois"];

const serviceAreas = [
  {
    title: "Kansas City Metro — KS & MO",
    places: [
      "Kansas City, KS",
      "Kansas City, MO",
      "Overland Park",
      "Olathe",
      "Lenexa",
      "Shawnee",
      "Independence",
      "Lee’s Summit",
      "Johnson County",
      "Wyandotte County",
      "Jackson County",
      "Clay & Platte Counties",
    ],
  },
  {
    title: "Illinois",
    places: [
      "Chicagoland",
      "Metro East (Gtr. St. Louis)",
      "Springfield",
      "Peoria",
      "Rockford",
      "Champaign–Urbana",
      "Bloomington–Normal",
      "Quad Cities",
    ],
  },
];

/** Ownership credentials and service areas, closing the About page on the wine band. */
export function CredentialBand() {
  return (
    <section className="wine-surface relative overflow-hidden py-24 text-center lg:py-28">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px steel-rule opacity-70" />
      <div aria-hidden className="absolute -top-24 -left-24 size-96 rotate-45 border border-white/10" />
      <div aria-hidden className="absolute -right-32 -bottom-40 size-[28rem] rotate-45 border border-white/10" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl">
          <p className="font-mono text-xs font-semibold tracking-[0.3em] text-white uppercase sm:text-sm">Our Foundation</p>
          <div aria-hidden className="mt-5 flex justify-center gap-3">
            <span className="h-[3px] w-12 steel-rule" />
            <span className="h-[3px] w-12 steel-rule" />
          </div>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] font-bold text-white uppercase sm:text-6xl lg:text-7xl">
            100% Woman-Owned
            <br />
            Veteran-Owned
          </h2>
          <span aria-hidden className="mx-auto mt-7 block h-[3px] w-28 steel-rule" />
          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
            Jeffries Mechanicals LLC is a proud woman-owned, veteran-owned specialized trade contractor — delivering electrical,
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

        <span aria-hidden className="mx-auto mt-14 mb-12 block h-px max-w-5xl bg-white/20" />

        <Reveal>
          <p className="font-mono text-xs font-semibold tracking-[0.3em] text-white uppercase sm:text-sm">Service Areas</p>
          <div className="mx-auto mt-8 grid max-w-5xl gap-10 text-left md:grid-cols-2 md:gap-16">
            {serviceAreas.map((area) => (
              <div key={area.title}>
                <h3 className="border-b-[3px] border-white/40 pb-3 font-display text-xl font-semibold tracking-[0.05em] text-white uppercase sm:text-2xl">
                  {area.title}
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  {area.places.map((place) => (
                    <li key={place} className="relative pl-4 text-[15px] leading-snug text-white sm:text-base">
                      <span aria-hidden className="absolute top-[0.45em] left-0 size-2 rotate-45 bg-white" />
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-4xl border border-white/30 bg-white/5 px-6 py-5 text-base leading-relaxed text-white sm:px-9 sm:text-lg">
            Don’t see your location?{" "}
            <strong className="font-bold text-white">
              Our workforce is ready, willing, and able to travel beyond these service areas
            </strong>{" "}
            — mobilizing wherever the project takes us to meet client and contract requirements.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-white uppercase sm:text-xs">
            Serving commercial, public-sector &amp; institutional projects across the region &amp; beyond
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
