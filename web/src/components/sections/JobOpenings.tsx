"use client";

import { Briefcase, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getJobOpenings, type JobOpening } from "@/lib/api";
import { useApi } from "@/lib/useApi";

/** Open positions, loaded live from the admin panel's job openings. */
export function JobOpenings() {
  const state = useApi<JobOpening[]>(getJobOpenings, "job-openings");
  const openings = state.status === "ready" ? state.data : [];

  if (state.status === "loading") {
    return <SectionHeading eyebrow="Open positions" title="Current openings" />;
  }

  return (
    <>
      <SectionHeading
        eyebrow="Open positions"
        title={openings.length ? "Current openings" : "No posted openings right now"}
        intro={
          openings.length
            ? undefined
            : "We're always interested in hearing from skilled tradespeople. Submit a general application below and we'll keep it on file for upcoming work."
        }
      />
      {openings.length > 0 && (
        <ul className="mt-12 grid gap-4">
          {openings.map((opening, index) => (
            <Reveal as="li" key={opening.id} delay={index * 60} className="group flex flex-col gap-4 border border-steel-200 bg-white p-6 transition-shadow hover:shadow-lift sm:flex-row sm:items-center sm:p-8">
              <div className="flex-1">
                <p className="font-display text-xs font-semibold tracking-[0.2em] text-wine-600 uppercase">{opening.trade}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-steel-950 uppercase">{opening.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{opening.summary}</p>
                <p className="mt-3 flex flex-wrap gap-4 text-xs text-steel-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-wine-600" aria-hidden /> {opening.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5 text-wine-600" aria-hidden /> {opening.employment_type}
                  </span>
                </p>
              </div>
              <ButtonLink href="#apply" variant="outline" arrow>
                Apply
              </ButtonLink>
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}
