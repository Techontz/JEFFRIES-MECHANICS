import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HexIcon } from "@/components/ui/HexIcon";
import { Reveal } from "@/components/ui/Reveal";
import { markets, type Market } from "@/content/markets";
import { cn } from "@/lib/cn";

function Panel({ market, index, linked }: { market: Market; index: number; linked: boolean }) {
  const content = (
    <>
      <Image
        src={market.image}
        alt={market.imageAlt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
        className="object-cover brightness-[0.85] saturate-[0.7] transition-transform duration-[1.4s] ease-[var(--ease-industrial)] group-hover:scale-[1.07]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/55 to-ink/10 transition-opacity duration-500" />
      <div aria-hidden className="absolute inset-0 bg-wine-900/0 transition-colors duration-500 group-hover:bg-wine-900/30" />
      {/* diagonal sheen */}
      <div aria-hidden className="absolute -inset-y-10 -left-1/2 w-1/2 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[120%]" />

      <span className="absolute top-6 left-6 font-display text-sm font-semibold tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
        <HexIcon icon={market.icon} tone="glass" />
        <h3 className="mt-5 font-display text-2xl leading-tight font-bold tracking-wide text-white uppercase lg:text-[1.7rem]">
          {market.title}
        </h3>
        <span aria-hidden className="mt-4 block h-[2px] w-12 bg-wine-500 transition-all duration-500 group-hover:w-24" />
        <p className={cn("mt-4 text-sm leading-relaxed text-steel-200 transition-all duration-500", linked && "lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100")}>
          {market.description}
        </p>
      </div>

      {linked && (
        <span className="absolute top-5 right-5 grid size-11 place-items-center border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:border-wine-400 group-hover:bg-wine-600">
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
        </span>
      )}
    </>
  );

  const className = "group relative block h-[420px] overflow-hidden bg-ink clip-angle-tr [--cut:56px] lg:h-[460px]";

  return linked ? (
    <Link href={`/industries#${market.slug}`} className={className} aria-label={`${market.title} — ${market.description}`}>
      {content}
    </Link>
  ) : (
    <div id={market.slug} className={cn(className, "scroll-mt-40")}>
      {content}
    </div>
  );
}

/** Large architectural image panels. Horizontal snap-scroll on phones, grid above. */
export function MarketPanels({ linked = true }: { linked?: boolean }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
      {markets.map((market, index) => (
        <Reveal key={market.slug} delay={(index % 3) * 90} className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none">
          <Panel market={market} index={index} linked={linked} />
        </Reveal>
      ))}
    </div>
  );
}
