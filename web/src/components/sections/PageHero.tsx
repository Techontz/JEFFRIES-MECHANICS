import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Set for backend-hosted photos when the API runs on a local address. */
  unoptimized?: boolean;
  children?: React.ReactNode;
};

/** Shorter cinematic hero for interior pages, closing on an angled steel edge. */
export function PageHero({ eyebrow, title, intro, image, imageAlt = "", imagePosition = "center", unoptimized, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-44">
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        unoptimized={unoptimized}
        sizes="100vw"
        style={{ objectPosition: imagePosition }}
        className="-z-20 animate-[heroZoom_2.4s_var(--ease-industrial)_both] object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 hero-grade-mobile sm:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden hero-grade sm:block" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/15" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay [background-image:var(--noise)]" />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="animate-rise">
          <ol className="flex items-center gap-2 font-display text-xs font-medium tracking-[0.2em] text-steel-300 uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <ChevronRight className="size-3.5 text-wine-400" aria-hidden />
            <li aria-current="page" className="text-white">
              {eyebrow}
            </li>
          </ol>
        </nav>
        <h1 className="mt-6 max-w-4xl animate-rise font-display text-5xl leading-[0.95] font-bold text-white uppercase [animation-delay:120ms] sm:text-6xl lg:text-[5.2rem]">
          {title}
        </h1>
        <span aria-hidden className="mt-8 block h-[3px] w-24 animate-rise steel-rule [animation-delay:240ms]" />
        {intro && (
          <p className="mt-7 max-w-2xl animate-rise text-base leading-relaxed text-steel-100 [animation-delay:320ms] sm:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="mt-9 animate-rise [animation-delay:440ms]">{children}</div>}
      </Container>

      {/* angled steel base */}
      <div aria-hidden className="absolute inset-x-0 -bottom-px h-16 bg-white [clip-path:polygon(0_100%,100%_0,100%_100%)] sm:h-24" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 steel-rule opacity-80 [clip-path:polygon(0_calc(100%-3px),100%_-3px,100%_0,0_100%)] sm:h-24" />
    </section>
  );
}
