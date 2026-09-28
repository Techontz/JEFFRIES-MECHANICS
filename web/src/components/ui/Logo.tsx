import Image from "next/image";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";

type Props = {
  /** "light" = on white/steel surfaces (wine M, wine type); "dark" = on charcoal/wine (steel mark, white type). */
  tone?: "light" | "dark";
  /** Show the "Electrical | Mechanical | …" line under the name. */
  tagline?: boolean;
  /** Set a font-size (e.g. text-[16px]) — the mark and type are sized in em from it. */
  className?: string;
  priority?: boolean;
};

/**
 * JM bolt mark + live-type wordmark. The mark is raster (from the client's lockup);
 * the name is set in Montserrat so it stays crisp at every size.
 */
export function Logo({ tone = "light", tagline = false, className, priority }: Props) {
  const onDark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-[0.45em] leading-none", className)}>
      <Image
        src={onDark ? "/brand/jm-mark-steel.png" : "/brand/jm-mark.png"}
        alt=""
        width={onDark ? 498 : 601}
        height={onDark ? 459 : 429}
        loading={priority ? "eager" : undefined}
        className="h-[3.6em] w-auto shrink-0"
      />
      <span className="flex flex-col">
        <span className="sr-only">{company.legalName}</span>
        <span
          aria-hidden
          className={cn(
            "font-logo text-[1.72em] leading-[0.92] font-extrabold tracking-[0.005em]",
            onDark ? "text-white" : "text-wine-700",
          )}
        >
          JEFFRIES
        </span>
        <span
          aria-hidden
          className={cn(
            "mt-[0.14em] font-logo text-[0.86em] leading-none font-semibold tracking-[0.045em] whitespace-nowrap",
            onDark ? "text-steel-200" : "text-wine-700",
          )}
        >
          MECHANICALS <span className="text-[0.86em]">LLC</span>
        </span>
        {tagline && (
          <span
            aria-hidden
            className={cn(
              "mt-[0.5em] border-t pt-[0.45em] font-logo text-[0.335em] font-semibold tracking-[0.1em] whitespace-nowrap uppercase",
              onDark ? "border-white/25 text-steel-300" : "border-steel-300 text-steel-600",
            )}
          >
            {company.tagline.replaceAll("•", "|")}
          </span>
        )}
      </span>
    </span>
  );
}
