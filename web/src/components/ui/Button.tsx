import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "wine" | "glass" | "outline" | "white" | "steel";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden font-display font-semibold uppercase tracking-[0.08em] transition-all duration-300 ease-[var(--ease-industrial)] disabled:pointer-events-none disabled:opacity-60 select-none";

const variants: Record<Variant, string> = {
  wine: "wine-fill border border-wine-400/60 border-b-wine-900 text-white shadow-wine hover:-translate-y-px hover:shadow-wine-lg hover:brightness-110 active:translate-y-0",
  glass:
    "border border-white/30 bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] backdrop-blur-md hover:border-white/55 hover:bg-white/[0.14]",
  outline: "border border-steel-900 text-steel-900 hover:bg-steel-900 hover:text-white",
  white: "border border-white bg-white text-wine-700 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] hover:-translate-y-px hover:bg-steel-50",
  steel: "steel-plate text-steel-900 hover:brightness-105",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[13px]",
  lg: "h-[58px] px-9 text-[14.5px]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {/* chrome sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover/btn:left-[120%] group-hover/btn:opacity-100"
      />
      <span className="relative inline-flex items-center gap-2.5 whitespace-nowrap">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </>
  );
}

export function ButtonLink({
  variant = "wine",
  size = "md",
  arrow,
  children,
  className,
  ...props
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "wine",
  size = "md",
  arrow,
  children,
  className,
  ...props
}: Props & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
