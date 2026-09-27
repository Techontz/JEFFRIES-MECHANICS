import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", className }: Props) {
  const onDark = tone === "light";

  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow tone={onDark ? "light" : "wine"} className={cn(align === "center" && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-[2.35rem] leading-[1.02] font-bold uppercase sm:text-5xl lg:text-[3.4rem]",
          onDark ? "text-white" : "text-steel-950",
        )}
      >
        {title}
      </h2>
      <span aria-hidden className={cn("mt-6 block h-[3px] w-20 steel-rule", align === "center" && "mx-auto")} />
      {intro && (
        <p className={cn("mt-6 text-base leading-relaxed sm:text-lg", onDark ? "text-steel-300" : "text-steel-600")}>{intro}</p>
      )}
    </Reveal>
  );
}
