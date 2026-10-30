import { Suspense } from "react";
import { FormLoading } from "@/components/forms/FormLoading";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Project",
  description: "A Jeffries Mechanicals project: mechanical, electrical and specialized-trade work in the Kansas City region.",
  path: "/our-work/project",
});

export default function ProjectPage() {
  return (
    <>
      <Suspense fallback={<FormLoading label="Loading project" />}>
        <ProjectDetail />
      </Suspense>
      <CtaBand title="Planning similar work?" text="Tell us the scope, location and schedule. We'll review it and follow up with a clear, documented proposal." />
    </>
  );
}
