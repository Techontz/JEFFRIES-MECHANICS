import { cn } from "@/lib/cn";

/** Slotted pan-head screw for steel plates. `angle` varies the slot so plates don't look stamped. */
export function Screw({ className, angle = 35 }: { className?: string; angle?: number }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute size-[11px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#d3d7dd_32%,#8a909a_72%,#4b5058_100%)] shadow-[0_1px_0_rgb(255_255_255/0.85),0_-1px_0_rgb(0_0_0/0.15),inset_0_-1px_1px_rgb(0_0_0/0.35)]",
        className,
      )}
    >
      <span
        className="absolute top-1/2 left-1/2 h-[1.5px] w-[7px] bg-steel-800/80 shadow-[0_1px_0_rgb(255_255_255/0.5)]"
        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
      />
    </span>
  );
}
