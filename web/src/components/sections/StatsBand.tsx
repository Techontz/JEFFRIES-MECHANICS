"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/content/company-values";

function useCountUp(target: number | null, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || target === null) {
      return;
    }

    const length = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const progress = length === 0 ? 1 : Math.min(1, (now - began) / length);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}

const cellBorders = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-r lg:border-b-0",
  "border-r",
  "",
];

function Stat({ stat, start, className }: { stat: (typeof stats)[number]; start: boolean; className: string }) {
  const count = useCountUp(stat.value, start);
  const display = stat.value === null ? stat.display : `${count}${stat.suffix}`;

  return (
    <div className={`relative border-white/10 px-2 py-10 text-center sm:px-6 lg:py-14 ${className}`}>
      <p className="font-display text-6xl leading-none font-bold steel-text tabular-nums lg:text-7xl">{display}</p>
      <span aria-hidden className="mx-auto mt-5 block h-[3px] w-10 bg-wine-500" />
      <p className="mt-4 font-display text-sm font-semibold tracking-[0.2em] text-white uppercase">{stat.label}</p>
      <p className="mt-1.5 text-xs text-steel-400">{stat.detail}</p>
    </div>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setStart(true), { threshold: 0.4 });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Jeffries Mechanicals at a glance" className="charcoal relative">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px steel-rule opacity-50" />
      <Container>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} start={start} className={cellBorders[index]} />
          ))}
        </div>
      </Container>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px steel-rule opacity-50" />
    </section>
  );
}
