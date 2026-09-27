import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { isLocalApi, type Project } from "@/lib/api";
import { cn } from "@/lib/cn";

/** Cover image for a project, falling back to the matching service photo. */
export function projectCover(project: Project): { src: string; remote: boolean } {
  if (project.image_url) {
    return { src: project.image_url, remote: true };
  }

  return { src: services.find((service) => service.title === project.service)?.image ?? "/images/photos/mechanical-room.jpg", remote: false };
}

export function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const cover = projectCover(project);
  const photoCount = project.gallery.length + (project.image_url ? 1 : 0);

  return (
    <Reveal as="article" delay={(index % 3) * 90} className={cn("group", featured && "lg:col-span-full")}>
      <Link
        href={`/our-work/${project.slug}`}
        className={cn("block", featured && "grid items-stretch gap-0 bg-white shadow-panel ring-1 ring-steel-200 lg:grid-cols-[1.4fr_1fr]")}
      >
        <div className={cn("relative overflow-hidden bg-steel-200", featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[440px]" : "aspect-[4/3] clip-angle-tr [--cut:40px]")}>
          <Image
            src={cover.src}
            alt={project.title}
            fill
            unoptimized={cover.remote && isLocalApi}
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-industrial)] group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine-950/75 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-5 wine-fill px-3 py-1 font-display text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
            {project.market}
          </span>
          {featured && (
            <span className="glass absolute top-5 left-5 px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
              Featured project
            </span>
          )}
        </div>

        <div className={cn(featured ? "flex flex-col justify-center p-8 lg:p-12" : "pt-5")}>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-steel-500">
            <span className="font-display font-semibold tracking-[0.14em] text-brand uppercase">{project.service}</span>
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5 text-brand" aria-hidden /> {project.location}
              </span>
            )}
            {project.completed_year && <span>{project.completed_year}</span>}
          </p>
          <h3 className={cn("mt-2 font-display leading-tight font-bold text-steel-950 uppercase", featured ? "text-3xl lg:text-4xl" : "text-2xl")}>
            {project.title}
          </h3>
          <p className={cn("mt-3 leading-relaxed text-steel-600", featured ? "text-base" : "text-[15px]")}>{project.summary}</p>
          <span className="mt-5 flex items-center gap-4 font-display text-xs font-semibold tracking-[0.18em] text-steel-900 uppercase">
            <span className="flex items-center gap-2 transition-colors group-hover:text-brand">
              View project <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
            {photoCount > 1 && (
              <span className="flex items-center gap-1.5 font-sans text-xs font-normal tracking-normal text-steel-500 normal-case">
                <Images className="size-3.5" aria-hidden /> {photoCount} photos
              </span>
            )}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
