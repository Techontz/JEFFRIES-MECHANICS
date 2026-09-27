import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "wine", className }: { children: React.ReactNode; tone?: "wine" | "light" | "steel"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em]",
        tone === "wine" && "text-wine-600",
        tone === "light" && "text-steel-200",
        tone === "steel" && "text-steel-500",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-10", tone === "wine" ? "bg-wine-600" : "steel-rule")} />
      {children}
    </p>
  );
}
