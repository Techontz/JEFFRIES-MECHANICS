"use client";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects, type Project } from "@/lib/api";
import { useApi } from "@/lib/useApi";

/** "Selected projects", loaded live from the admin panel; hidden until there is at least one project. */
export function ProjectPortfolio() {
  const state = useApi<Project[]>(getProjects, "projects");

  if (state.status !== "ready" || state.data.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Project portfolio" title="Selected projects" />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} featured={index === 0 && project.is_featured} />
          ))}
        </div>
      </Container>
    </section>
  );
}
