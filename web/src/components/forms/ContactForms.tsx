"use client";

import { useState } from "react";
import { MessageSquare, Siren } from "lucide-react";
import type { FormOptions, SubmissionResult } from "@/lib/api";
import { cn } from "@/lib/cn";
import { ChoiceGroup, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError } from "./FormError";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { SubmitButton } from "./SubmitButton";
import { useSubmission } from "./useSubmission";
import { collectErrors, email, minLength, phone, required, without } from "./validators";

export type ContactTab = "general" | "service";
type Tab = ContactTab;

const tabs: Array<{ key: Tab; label: string; caption: string; icon: typeof MessageSquare }> = [
  { key: "general", label: "General inquiry", caption: "Questions, teaming, opportunities", icon: MessageSquare },
  { key: "service", label: "Service request", caption: "Existing system needs attention", icon: Siren },
];

function useFieldState<T extends Record<string, string>>(initial: T) {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof T) => (value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => without(current, key as string));
  };

  const applyServerErrors = (result: SubmissionResult) => {
    if (!result.ok && result.kind === "validation") {
      setErrors(without(result.errors, "form_token"));
    }
  };

  return { data, setData, errors, setErrors, set, applyServerErrors, reset: () => setData(initial) };
}

export function ContactForms({ options, initialTab = "general", initialSubject = "" }: { options: FormOptions; initialTab?: Tab; initialSubject?: string }) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      <div role="tablist" aria-label="Contact type" className="grid grid-cols-2 border-b border-steel-200">
        {tabs.map(({ key, label, caption, icon: Icon }) => (
          <button
            key={key}
            role="tab"
            type="button"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={cn(
              "relative flex items-center gap-3 px-5 py-5 text-left transition-colors sm:px-8",
              tab === key ? "bg-white" : "bg-steel-50 hover:bg-steel-100",
            )}
          >
            <Icon className={cn("hidden size-5 shrink-0 sm:block", tab === key ? "text-wine-600" : "text-steel-400")} aria-hidden />
            <span>
              <span className={cn("block font-display text-sm font-semibold tracking-[0.12em] uppercase sm:text-base", tab === key ? "text-steel-950" : "text-steel-500")}>
                {label}
              </span>
              <span className="hidden text-xs text-steel-500 sm:block">{caption}</span>
            </span>
            <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-[3px] bg-wine-600 transition-transform duration-300", tab === key ? "scale-x-100" : "scale-x-0")} />
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-10">
        <div id="panel-general" role="tabpanel" aria-labelledby="tab-general" hidden={tab !== "general"}>
          <GeneralForm options={options} initialSubject={options.contact_subjects.includes(initialSubject) ? initialSubject : ""} />
        </div>
        <div id="panel-service" role="tabpanel" aria-labelledby="tab-service" hidden={tab !== "service"}>
          <ServiceForm options={options} />
        </div>
      </div>
    </div>
  );
}

function GeneralForm({ options, initialSubject }: { options: FormOptions; initialSubject: string }) {
  const form = useFieldState({ name: "", company: "", email: "", phone: "", subject: initialSubject, message: "" });
  const { status, result, submit, reset, honeypot, setHoneypot } = useSubmission("contact-messages");
  const { data, errors, set } = form;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = collectErrors({
      name: minLength(data.name, 2, "Please enter your full name."),
      email: email(data.email),
      phone: phone(data.phone, true),
      subject: required(data.subject, "Choose a subject."),
      message: minLength(data.message, 10, "Please add a short message (at least 10 characters)."),
    });
    form.setErrors(found);
    if (Object.keys(found).length) {
      return;
    }

    form.applyServerErrors(await submit(data));
  };

  if (status === "success" && result?.ok) {
    return (
      <SubmissionSuccess
        title="Message sent"
        message={result.message}
        reference={result.reference}
        onReset={() => {
          form.reset();
          reset();
        }}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" name="name" value={data.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <TextField label="Company" name="company" value={data.company} onChange={set("company")} error={errors.company} autoComplete="organization" />
        <TextField label="Email" name="email" type="email" value={data.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
        <TextField label="Phone" name="phone" type="tel" value={data.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
      </div>
      <SelectField label="Subject" name="subject" value={data.subject} onChange={set("subject")} options={options.contact_subjects} error={errors.subject} required />
      <TextAreaField label="Message" name="message" value={data.message} onChange={set("message")} error={errors.message} required rows={6} maxLength={5000} />
      <FormError result={status === "error" ? result : null} />
      <SubmitButton submitting={status === "submitting"}>Send message</SubmitButton>
    </form>
  );
}

function ServiceForm({ options }: { options: FormOptions }) {
  const form = useFieldState({ name: "", company: "", email: "", phone: "", site_address: "", system_type: "", urgency: "", description: "" });
  const { status, result, submit, reset, honeypot, setHoneypot } = useSubmission("service-requests");
  const { data, errors, set } = form;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = collectErrors({
      name: minLength(data.name, 2, "Please enter your full name."),
      email: email(data.email),
      phone: phone(data.phone),
      site_address: minLength(data.site_address, 5, "Enter the site address."),
      system_type: required(data.system_type, "Select the system that needs service."),
      urgency: required(data.urgency, "How urgent is this?"),
      description: minLength(data.description, 10, "Describe the issue (at least 10 characters)."),
    });
    form.setErrors(found);
    if (Object.keys(found).length) {
      return;
    }

    form.applyServerErrors(await submit(data));
  };

  if (status === "success" && result?.ok) {
    return (
      <SubmissionSuccess
        title="Service request logged"
        message={result.message}
        reference={result.reference}
        resetLabel="Log another request"
        onReset={() => {
          form.reset();
          reset();
        }}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" name="name" value={data.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <TextField label="Company / facility" name="company" value={data.company} onChange={set("company")} error={errors.company} autoComplete="organization" />
        <TextField label="Email" name="email" type="email" value={data.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
        <TextField label="Phone" name="phone" type="tel" value={data.phone} onChange={set("phone")} error={errors.phone} required autoComplete="tel" />
      </div>
      <TextField label="Site address" name="site_address" value={data.site_address} onChange={set("site_address")} error={errors.site_address} required autoComplete="street-address" />
      <SelectField label="System" name="system_type" value={data.system_type} onChange={set("system_type")} options={options.system_types} error={errors.system_type} required />
      <ChoiceGroup
        legend="Urgency"
        name="urgency"
        value={data.urgency}
        onChange={set("urgency")}
        options={options.urgencies.map(({ value, label }) => {
          const [title, description] = label.split(" — ");
          return { value, label: title, description };
        })}
        error={errors.urgency}
        required
        columns="sm:grid-cols-3"
      />
      <TextAreaField label="Describe the issue" name="description" value={data.description} onChange={set("description")} error={errors.description} required rows={5} maxLength={5000} />
      <FormError result={status === "error" ? result : null} />
      <SubmitButton submitting={status === "submitting"}>Submit service request</SubmitButton>
    </form>
  );
}
