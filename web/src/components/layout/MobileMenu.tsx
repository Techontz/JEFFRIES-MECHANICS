"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { company, fullAddress } from "@/content/company";
import { contractingHref, primaryNav, quoteHref } from "@/content/navigation";
import { cn } from "@/lib/cn";

type Props = { open: boolean; onClose: () => void; pathname: string };

export function MobileMenu({ open, onClose, pathname }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastPath = useRef(pathname);

  // Close after navigating.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      className={cn("fixed inset-0 z-[60] xl:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn("absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
      />

      {/* Panel */}
      <div
        className={cn(
          "charcoal absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto transition-[clip-path] duration-700 ease-[var(--ease-industrial)]",
          open ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]" : "[clip-path:polygon(100%_0,100%_0,100%_100%,115%_100%)]",
        )}
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 wine-fill-v" />

        <div className="flex items-center justify-between px-6 pt-5">
          <Logo tone="dark" className="text-[12.5px]" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-12 place-items-center border border-white/15 text-white transition-colors hover:border-wine-400 hover:bg-wine-600"
          >
            <span className="sr-only">Close menu</span>
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 px-6">
          <ul className="border-t border-white/10">
            {[{ label: "Home", href: "/" }, ...primaryNav].map((item, index) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li
                  key={item.href}
                  className={cn(
                    "border-b border-white/10 transition-all duration-500 ease-[var(--ease-industrial)]",
                    open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${150 + index * 55}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center gap-5 py-4"
                  >
                    <span className={cn("font-display text-xs tracking-[0.2em]", active ? "text-wine-400" : "text-steel-500")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[1.75rem] leading-none font-semibold tracking-wide uppercase transition-colors",
                        active ? "text-white" : "text-steel-200 group-hover:text-white",
                      )}
                    >
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-steel-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wine-400"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={cn(
            "mt-auto space-y-4 px-6 pt-10 pb-8 transition-all delay-500 duration-700",
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <ButtonLink href={quoteHref} arrow size="lg" className="w-full">
            Get a Quote
          </ButtonLink>
          <ButtonLink href={contractingHref} variant="glass" size="lg" className="w-full">
            Contracting Opportunities
          </ButtonLink>
          <div className="glass-dark mt-2 flex items-start gap-3 p-4 text-sm text-steel-300">
            <MapPin className="mt-0.5 size-4 shrink-0 text-wine-400" aria-hidden />
            <span>
              <span className="block font-medium text-white">{company.legalName}</span>
              {fullAddress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
