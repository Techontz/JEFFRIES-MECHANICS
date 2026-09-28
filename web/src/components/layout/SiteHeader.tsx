"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { company, fullAddress } from "@/content/company";
import { contractingHref, primaryNav, quoteHref } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Utility bar — wine tag plate + steel type, reads as part of the header */}
      <div className="charcoal relative z-50 hidden h-[38px] overflow-hidden text-[11px] text-steel-300 lg:block">
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="shell flex h-full items-center justify-between">
          <p className="relative flex h-full items-center font-display font-medium tracking-[0.24em] text-white uppercase">
            <span aria-hidden className="absolute inset-y-0 -left-[100vw] right-[-28px] -z-10 wine-fill [clip-path:polygon(0_0,100%_0,calc(100%-22px)_100%,0_100%)]" />
            {company.tagline}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5 text-wine-500" aria-hidden />
              {fullAddress}
            </span>
            <span aria-hidden className="h-3.5 w-px bg-steel-600" />
            <Link
              href={contractingHref}
              className="group flex items-center gap-2 font-display font-medium tracking-[0.2em] uppercase transition-colors hover:text-white"
            >
              Contracting Opportunities
              <ArrowRight className="size-3.5 text-wine-500 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 ease-[var(--ease-industrial)]",
          scrolled
            ? "bg-white/88 shadow-lift backdrop-blur-xl backdrop-saturate-150"
            : "bg-gradient-to-b from-white to-steel-50",
        )}
      >
        {/* Steel hairline + wine rule tie the header to the hero below */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-steel-300" />
        <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-[min(38%,560px)] wine-bar" />
        <div
          className={cn(
            "shell flex items-center justify-between gap-6 transition-[height] duration-500",
            scrolled ? "h-16 lg:h-[70px]" : "h-16 sm:h-[76px] lg:h-[92px]",
          )}
        >
          <Link href="/" className="relative shrink-0" aria-label={`${company.name} — home`}>
            <Logo
              priority
              className={cn("transition-[font-size] duration-500", scrolled ? "text-[12.5px] lg:text-[13.5px]" : "text-[12.5px] sm:text-[14.5px] lg:text-[17px]")}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex 2xl:gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "group relative px-4 py-3 font-display text-[14.5px] font-medium tracking-[0.14em] uppercase transition-colors",
                  isActive(item.href) ? "text-wine-600" : "text-steel-900 hover:text-wine-600",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 bottom-1 h-[2px] origin-left wine-bar transition-transform duration-300 ease-[var(--ease-industrial)]",
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ButtonLink href={quoteHref} arrow>
                Get a Quote
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="group relative grid size-11 place-items-center sm:size-12 border border-steel-300 bg-gradient-to-b from-white to-steel-100 transition-colors hover:border-wine-600 xl:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden className="flex w-5 flex-col items-end gap-[5px]">
                <span className="h-[2px] w-5 bg-steel-900 transition-all group-hover:bg-wine-600" />
                <span className="h-[2px] w-3.5 bg-wine-600 transition-all group-hover:w-5" />
                <span className="h-[2px] w-5 bg-steel-900 transition-all group-hover:bg-wine-600" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
