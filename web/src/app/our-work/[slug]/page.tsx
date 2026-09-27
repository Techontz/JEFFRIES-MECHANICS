import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Wrench } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { projectCover } from "@/components/sections/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, isLocalApi } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 120;

export async function generateMetadata({ params }: PageProps<"/our-work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  return project
    ? pageMetadata({ title: project.title, description: project.summary, path: `/our-work/${project.slug}` })
    : { title: "Project not found", robots: { index: false } };
}

export default async function ProjectPage({ params }: PageProps<"/our-work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const cover = projectCover(project);
  const facts = [
    { icon: Wrench, label: "Service", value: project.service },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: CalendarDays, label: "Completed", value: project.completed_year },
  ].filter((fact) => fact.value);

  return (
    <>
      <PageHero eyebrow="Our Work" title={project.title} intro={project.summary} image={cover.src} imageAlt={project.title} unoptimized={cover.remote && isLocalApi} />

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{project.market}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-none font-bold text-steel-950 uppercase">Project overview</h2>
            <span aria-hidden className="mt-6 block h-[3px] w-20 steel-rule" />
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-steel-700">
              {(project.description ?? project.summary).split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} as="aside" className="steel-plate self-start p-8">
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-steel-600 uppercase">Project facts</p>
            <dl className="mt-6 space-y-5">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center wine-fill text-white">
                    <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-xs tracking-wide text-steel-600 uppercase">{label}</dt>
                    <dd className="font-medium text-steel-950">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Link href="/our-work" className="mt-8 flex items-center gap-2 font-display text-xs font-semibold tracking-[0.18em] text-brand uppercase hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> All projects
            </Link>
          </Reveal>
        </Container>
      </section>

      {project.gallery.length > 0 && (
        <section aria-label="Project gallery" className="steel-wash py-20 lg:py-28">
          <Container>
            <div className="grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-3 lg:gap-4">
              {project.gallery.map((src, index) => (
                <Reveal key={src} delay={(index % 3) * 80} className={index === 0 ? "relative col-span-2 row-span-2 overflow-hidden bg-steel-200" : "relative overflow-hidden bg-steel-200"}>
                  <Image
                    src={src}
                    alt={`${project.title} — photo ${index + 1}`}
                    fill
                    unoptimized={isLocalApi}
                    sizes="(min-width: 1024px) 40vw, 50vw"
                    className="object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand title="Planning similar work?" text="Tell us the scope, location and schedule. We'll review it and follow up with a clear, documented proposal." />
    </>
  );
}
