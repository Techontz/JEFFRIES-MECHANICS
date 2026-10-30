import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/company";
import { getProjects } from "@/lib/api";

const routes = ["", "/about", "/services", "/industries", "/our-work", "/careers", "/contact", "/quote", "/privacy", "/terms"];

// Built with the site; project URLs reflect the projects that exist at build time.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}/`,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/quote" || route === "/services" ? 0.9 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/our-work/project/?slug=${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
