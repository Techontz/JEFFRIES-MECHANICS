import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%)";

type Props = {
  icon: LucideIcon;
  tone?: "steel" | "wine" | "glass";
  size?: "md" | "lg";
  className?: string;
};

/** Icon seated in a machined hex-nut frame. */
export function HexIcon({ icon: Icon, tone = "steel", size = "md", className }: Props) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-grid shrink-0 place-items-center", size === "md" ? "size-14" : "size-[72px]", className)}
    >
      <span
        className={cn(
          "absolute inset-0 transition-colors duration-300",
          tone === "steel" && "bg-gradient-to-b from-steel-300 via-steel-100 to-steel-400",
          tone === "wine" && "wine-fill-v",
          tone === "glass" && "bg-white/25",
        )}
        style={{ clipPath: HEX }}
      />
      <span
        className={cn(
          "absolute inset-[2px] transition-colors duration-300",
          tone === "steel" && "bg-gradient-to-b from-white to-steel-100 group-hover:from-wine-600 group-hover:to-wine-800",
          tone === "wine" && "wine-fill-v",
          tone === "glass" && "bg-wine-950/50 backdrop-blur",
        )}
        style={{ clipPath: HEX }}
      />
      <Icon
        className={cn(
          "relative transition-colors duration-300",
          size === "md" ? "size-6" : "size-8",
          tone === "steel" ? "text-wine-600 group-hover:text-white" : "text-white",
        )}
        strokeWidth={1.6}
      />
    </span>
  );
}
