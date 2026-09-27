import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="charcoal relative overflow-hidden py-32 text-center lg:py-44">
      <div aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-[40vw] leading-none font-bold text-white/[0.03] select-none">
        404
      </div>
      <Container className="relative">
        <p className="font-display text-xs font-semibold tracking-[0.24em] text-wine-400 uppercase">Page not found</p>
        <h1 className="mt-5 font-display text-5xl font-bold text-white uppercase sm:text-7xl">Off the drawings</h1>
        <p className="mx-auto mt-5 max-w-md text-steel-300">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="glass">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
