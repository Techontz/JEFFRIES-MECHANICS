"use client";

import { useSearchParams } from "next/navigation";
import { CareerForm } from "@/components/forms/CareerForm";
import { ContactForms } from "@/components/forms/ContactForms";
import { FormLoading } from "@/components/forms/FormLoading";
import { FormUnavailable } from "@/components/forms/FormUnavailable";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { services } from "@/content/services";
import { getFormOptions, getJobOpenings, type FormOptions, type JobOpening } from "@/lib/api";
import { useApi } from "@/lib/useApi";

/*
 * The site is exported as static files, so these forms load their option lists from the
 * Laravel API in the browser. Pages wrap them in <Suspense> because they read the URL.
 */

function useFormOptions() {
  return useApi<FormOptions>(getFormOptions, "form-options");
}

export function ContactFormPanel() {
  const params = useSearchParams();
  const options = useFormOptions();

  if (options.status === "loading") return <FormLoading />;
  if (options.status === "error") return <FormUnavailable />;

  return (
    <ContactForms
      options={options.data}
      initialTab={params.get("type") === "service" ? "service" : "general"}
      initialSubject={params.get("subject") ?? ""}
    />
  );
}

export function QuoteFormPanel() {
  const params = useSearchParams();
  const options = useFormOptions();
  const requested = services.find((service) => service.slug === params.get("service"))?.title;

  if (options.status === "loading") {
    return (
      <div className="bg-white shadow-xl ring-1 ring-steel-200">
        <FormLoading />
      </div>
    );
  }

  if (options.status === "error") {
    return (
      <div className="bg-white shadow-xl ring-1 ring-steel-200">
        <FormUnavailable />
      </div>
    );
  }

  return <QuoteWizard options={options.data} initialService={requested} />;
}

export function CareerFormPanel() {
  const options = useFormOptions();
  const openings = useApi<JobOpening[]>(getJobOpenings, "job-openings");

  if (options.status === "loading" || openings.status === "loading") return <FormLoading />;
  if (options.status === "error") return <FormUnavailable />;

  return <CareerForm options={options.data} openings={openings.status === "ready" ? openings.data : []} />;
}
