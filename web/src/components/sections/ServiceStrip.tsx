import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HexIcon } from "@/components/ui/HexIcon";
import { Screw } from "@/components/ui/Screw";
import { featuredServices } from "@/content/services";

/**
 * Brushed-stainless plate that overlaps the bottom of the hero.
 * Phones: compact 2×2 tiles. Tablet: 2×2 with copy. Desktop: one row of four.
 */
export function ServiceStrip() {
  return (
    <div className="relative z-10 -mt-16 sm:-mt-28 lg:-mt-36">
      <Container>
        <nav aria-label="Core services" className="steel-plate clip-plate relative animate-rise [animation-delay:850ms]">
          <Screw className="top-3 left-3" angle={20} />
          <Screw className="top-3 right-9" angle={-40} />
          <Screw className="bottom-3 left-9" angle={65} />
          <Screw className="right-3 bottom-3" angle={-10} />

          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <li
                key={service.slug}
                className="relative steel-seam odd:border-r [&:nth-child(-n+2)]:border-b lg:border-r lg:last:border-r-0 lg:[&:nth-child(-n+2)]:border-b-0"
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative flex h-full flex-col p-5 transition-colors duration-300 hover:bg-white/40 sm:p-7 lg:p-9"
                >
                  <HexIcon icon={service.icon} className="max-sm:size-11" />
                  <span className="mt-4 block font-display text-[15px] leading-tight font-bold tracking-wide text-steel-950 uppercase sm:mt-6 sm:text-xl">
                    {service.title}
                  </span>
                  <span className="mt-2 hidden text-sm leading-relaxed text-steel-600 sm:block">{service.short}</span>
                  <span className="mt-3 flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.18em] text-brand uppercase sm:mt-4 sm:text-xs">
                    <span className="sm:hidden">View</span>
                    <span className="hidden sm:inline">Learn more</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 wine-bar transition-transform duration-500 ease-[var(--ease-industrial)] group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
