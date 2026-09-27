import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";

const featured = [services[0], services[1]];

/** Full-bleed cinematic photo band split by a diagonal wine blade. */
export function ImageDuo() {
  return (
    <section aria-label="Core capabilities" className="relative grid bg-ink md:grid-cols-2">
      {featured.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services#${service.slug}`}
          className={`group relative block h-72 overflow-hidden sm:h-96 lg:h-[440px] ${index === 0 ? "md:clip-slant-r md:[--slant:9%]" : "md:-ml-[9%] md:w-[109%] md:clip-slant-l md:[--slant:9%]"}`}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover brightness-[0.72] contrast-[1.08] saturate-[0.75] transition-transform duration-[1.4s] ease-[var(--ease-industrial)] group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine-950/92 via-wine-950/60 to-wine-950/35 transition-opacity duration-500 group-hover:opacity-80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <service.icon className="size-9 text-white/90" strokeWidth={1.4} aria-hidden />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl lg:text-5xl">
              {service.title}
            </h2>
            <span aria-hidden className="mt-4 block h-[2px] w-24 steel-rule transition-all duration-500 group-hover:w-40" />
            <span className="mt-5 flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] text-steel-100 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:opacity-100 md:translate-y-2">
              Explore capability <ArrowRight className="size-3.5" aria-hidden />
            </span>
          </div>
        </Link>
      ))}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-3 -translate-x-1/2 -skew-x-[8deg] wine-fill-v shadow-glow md:block" />
    </section>
  );
}
