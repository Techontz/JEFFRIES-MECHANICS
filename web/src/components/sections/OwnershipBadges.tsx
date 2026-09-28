import { HardHat, Star, UsersRound } from "lucide-react";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";

/** Paired by index with company.ownership. */
export const ownershipIcons = [HardHat, Star, UsersRound];

/**
 * Ownership identifiers as a quiet, icon-led row. Deliberately smaller than section
 * headings — visible to procurement, never louder than the capability message.
 * No seals or "certified" wording (see company.ownership).
 */
export function OwnershipBadges({
  tone = "dark",
  stacked = false,
  className,
}: {
  tone?: "dark" | "light";
  /** One badge per line at every width (footer). */
  stacked?: boolean;
  className?: string;
}) {
  const onDark = tone === "light";

  return (
    <ul
      aria-label="Ownership"
      className={cn(
        "flex flex-col font-display font-semibold tracking-[0.14em] uppercase",
        stacked ? "gap-2.5 text-xs" : "gap-3 text-[13px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-0",
        onDark ? "text-white" : "text-steel-800",
        className,
      )}
    >
      {company.ownership.map((item, index) => {
        const Icon = ownershipIcons[index];
        return (
          <li
            key={item}
            className={cn(
              "flex items-center gap-3",
              !stacked && "sm:px-6 sm:first:pl-0 sm:last:pr-0",
              !stacked && index > 0 && (onDark ? "sm:border-l sm:border-white/20" : "sm:border-l sm:border-steel-300"),
            )}
          >
            <Icon aria-hidden className={cn("size-5 shrink-0", onDark ? "text-steel-300" : "text-wine-600")} strokeWidth={1.75} />
            {item}
          </li>
        );
      })}
    </ul>
  );
}
