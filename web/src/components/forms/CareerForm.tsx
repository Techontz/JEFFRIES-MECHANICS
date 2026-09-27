"use client";

import { useState } from "react";
import type { FormOptions, JobOpening } from "@/lib/api";
import { FileField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError } from "./FormError";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { SubmitButton } from "./SubmitButton";
import { useSubmission } from "./useSubmission";
import { collectErrors, email, minLength, phone, required, without } from "./validators";

const empty = { position: "", name: "", email: "", phone: "", location: "", experience: "", cover_letter: "" };

export function CareerForm({ options, openings }: { options: FormOptions; openings: JobOpening[] }) {
  const [data, setData] = useState(empty);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { status, result, submit, reset, honeypot, setHoneypot } = useSubmission("career-applications");

  const set = (key: keyof typeof empty) => (value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => without(current, key));
  };

  // Openings are submitted by id; general trades by name.
  const positionOptions = [
    ...openings.map((opening) => ({ value: `opening:${opening.id}`, label: `${opening.title} — ${opening.employment_type}` })),
    ...options.trades.map((trade) => ({ value: trade, label: `${trade} (general application)` })),
  ];

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = collectErrors({
      position: required(data.position, "Select the position or trade you're applying for."),
      name: minLength(data.name, 2, "Please enter your full name."),
      email: email(data.email),
      phone: phone(data.phone),
      resume: resume ? undefined : "Please attach your resume (PDF or Word).",
    });
    setErrors(found);
    if (Object.keys(found).length) {
      return;
    }

    const opening = data.position.startsWith("opening:") ? data.position.slice(8) : null;
    const response = await submit({
      ...data,
      position: opening ? null : data.position,
      job_opening_id: opening,
      resume,
    });

    if (!response.ok && response.kind === "validation") {
      const openingError = response.errors.job_opening_id;
      const fieldErrors = without(response.errors, "form_token", "job_opening_id");
      setErrors(openingError ? { ...fieldErrors, position: openingError } : fieldErrors);
    }
  };

  if (status === "success" && result?.ok) {
    return (
      <SubmissionSuccess
        title="Application received"
        message={result.message}
        reference={result.reference}
        resetLabel="Submit another application"
        onReset={() => {
          setData(empty);
          setResume(null);
          reset();
        }}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <SelectField label="Position / trade" name="position" value={data.position} onChange={set("position")} options={positionOptions} error={errors.position} required />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" name="name" value={data.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <TextField label="Email" name="email" type="email" value={data.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
        <TextField label="Phone" name="phone" type="tel" value={data.phone} onChange={set("phone")} error={errors.phone} required autoComplete="tel" />
        <TextField label="City / state" name="location" value={data.location} onChange={set("location")} error={errors.location} autoComplete="address-level2" />
      </div>
      <SelectField label="Experience" name="experience" value={data.experience} onChange={set("experience")} options={options.experience} error={errors.experience} />
      <FileField
        label="Resume"
        required
        file={resume}
        onChange={(file) => {
          setResume(file);
          setErrors((current) => without(current, "resume"));
        }}
        accept={options.uploads.resume_types}
        maxKb={options.uploads.resume_max_kb}
        error={errors.resume}
        onError={(message) => setErrors((current) => (message ? { ...current, resume: message } : current))}
      />
      <TextAreaField label="Cover letter / notes" name="cover_letter" value={data.cover_letter} onChange={set("cover_letter")} error={errors.cover_letter} rows={5} maxLength={5000} />
      <FormError result={status === "error" ? result : null} />
      <SubmitButton submitting={status === "submitting"}>Submit application</SubmitButton>
    </form>
  );
}
