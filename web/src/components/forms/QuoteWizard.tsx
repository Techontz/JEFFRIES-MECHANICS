"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  CircleAlert,
  CircleCheckBig,
  ClipboardList,
  Construction,
  FileSearch,
  Hammer,
  HeartPulse,
  ListChecks,
  LoaderCircle,
  Lock,
  PencilLine,
  RefreshCw,
  Send,
  User,
  Wrench,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { FormOptions } from "@/lib/api";
import { cn } from "@/lib/cn";
import { markets } from "@/content/markets";
import { services } from "@/content/services";
import { ChoiceGroup, FileField, Honeypot, TextAreaField, TextField } from "./fields";
import { useSubmission } from "./useSubmission";
import { collectErrors, email, minLength, phone, required, without } from "./validators";

type QuoteData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  preferred_contact: string;
  project_type: string;
  project_location: string;
  timeline: string;
  budget_range: string;
  service: string;
  market: string;
  description: string;
};

const emptyQuote: QuoteData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  preferred_contact: "",
  project_type: "",
  project_location: "",
  timeline: "",
  budget_range: "",
  service: "",
  market: "",
  description: "",
};

const steps: Array<{ key: string; title: string; caption: string; icon: LucideIcon; fields: Array<keyof QuoteData | "attachment"> }> = [
  { key: "contact", title: "Contact", caption: "Who we'll be speaking with", icon: User, fields: ["name", "company", "email", "phone", "preferred_contact"] },
  { key: "project", title: "Project", caption: "Type, location and timing", icon: ClipboardList, fields: ["project_type", "project_location", "timeline", "budget_range"] },
  { key: "scope", title: "Service & Market", caption: "What trade and sector", icon: Wrench, fields: ["service", "market"] },
  { key: "details", title: "Details", caption: "Scope, drawings and notes", icon: PencilLine, fields: ["description", "attachment"] },
  { key: "review", title: "Review & Submit", caption: "Confirm and send", icon: ListChecks, fields: [] },
];

const projectTypeIcons: Record<string, LucideIcon> = {
  "New construction": Construction,
  "Renovation / tenant improvement": Hammer,
  "System replacement / upgrade": RefreshCw,
  Repair: Wrench,
  "Preventive maintenance program": CalendarCheck,
  "Bid / RFP support": FileSearch,
};

const serviceIcons = Object.fromEntries(services.map((service) => [service.title, service.icon]));
const marketIcons: Record<string, LucideIcon> = {
  ...Object.fromEntries(markets.map((market) => [market.title, market.icon])),
  Healthcare: HeartPulse,
  "Prime Contractor / Subcontract": markets.find((market) => market.slug === "prime-contractors")!.icon,
};

function validateStep(index: number, data: QuoteData): Record<string, string> {
  switch (steps[index].key) {
    case "contact":
      return collectErrors({
        name: minLength(data.name, 2, "Please enter your full name."),
        email: email(data.email),
        phone: phone(data.phone),
      });
    case "project":
      return collectErrors({
        project_type: required(data.project_type, "Select the type of project."),
        project_location: minLength(data.project_location, 2, "Where is the project located?"),
      });
    case "scope":
      return collectErrors({
        service: required(data.service, "Select the service you need."),
        market: required(data.market, "Select the market or facility type."),
      });
    case "details":
      return collectErrors({
        description: minLength(data.description, 20, "Please give us a little more detail about the project (at least 20 characters)."),
      });
    default:
      return {};
  }
}

type Props = { options: FormOptions; initialService?: string };

export function QuoteWizard({ options, initialService }: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<QuoteData>({
    ...emptyQuote,
    service: initialService && options.services.includes(initialService) ? initialService : "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const { status, result, submit, reset, honeypot, setHoneypot } = useSubmission("quote-requests");

  const set = <K extends keyof QuoteData>(key: K) => (value: QuoteData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => without(current, key));
  };

  const goTo = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const next = () => {
    const stepErrors = validateStep(step, data);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      goTo(step + 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (step < steps.length - 1) {
      next();
      return;
    }

    for (let index = 0; index < steps.length - 1; index++) {
      const stepErrors = validateStep(index, data);
      if (Object.keys(stepErrors).length) {
        setErrors(stepErrors);
        goTo(index);
        return;
      }
    }

    const response = await submit({ ...data, attachment });

    if (response.ok) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }

    if (!response.ok && response.kind === "validation") {
      const fieldErrors = without(response.errors, "form_token");
      setErrors(fieldErrors);
      const firstStep = steps.findIndex((candidate) => candidate.fields.some((field) => field in fieldErrors));
      if (firstStep >= 0) {
        goTo(firstStep);
      }
    }
  };

  const tiles = useMemo(
    () => ({
      projectTypes: options.project_types.map((value) => ({ value, label: value, icon: projectTypeIcons[value] ?? ClipboardList })),
      services: options.services.map((value) => ({
        value,
        label: value,
        description: services.find((service) => service.title === value)?.short,
        icon: serviceIcons[value] ?? Wrench,
      })),
      markets: options.markets.map((value) => ({ value, label: value, icon: marketIcons[value] ?? Building2 })),
      chips: (values: string[]) => values.map((value) => ({ value, label: value })),
    }),
    [options],
  );

  const succeeded = status === "success" && result?.ok === true;
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const successView = succeeded && result?.ok && (
      <div className="animate-rise p-8 text-center sm:p-14">
        <span className="mx-auto grid size-20 place-items-center wine-fill-v text-white [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0_50%)]">
          <CircleCheckBig className="size-9" strokeWidth={1.6} aria-hidden />
        </span>
        <h2 className="mt-8 font-display text-4xl font-bold text-steel-950 uppercase sm:text-5xl">
          {result.duplicate ? "Already received" : "Request received"}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-steel-600">{result.message}</p>

        <div className="steel-plate mx-auto mt-8 inline-flex flex-col items-center px-10 py-5">
          <span className="font-display text-[11px] font-semibold tracking-[0.24em] text-steel-600 uppercase">Your reference</span>
          <span className="mt-1 font-mono text-2xl font-semibold tracking-wider text-wine-700">{result.reference}</span>
        </div>

        <ol className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {[
            ["Review", "Our team reviews your scope and any drawings you attached."],
            ["Contact", `We reach out by ${data.preferred_contact ? data.preferred_contact.toLowerCase() : "phone or email"} to clarify details.`],
            ["Proposal", "You receive a clear, documented proposal for the work."],
          ].map(([title, text], index) => (
            <li key={title} className="border border-steel-200 bg-steel-50 p-5">
              <span className="font-display text-sm font-bold text-wine-600">0{index + 1}</span>
              <span className="mt-2 block font-display text-lg font-semibold tracking-wide text-steel-950 uppercase">{title}</span>
              <span className="mt-1 block text-sm text-steel-600">{text}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setData(emptyQuote);
              setAttachment(null);
              setStep(0);
            }}
          >
            Submit another request
          </Button>
        </div>
      </div>
  );

  const formView = (
    <div>
      {/* Progress rail */}
      <div className="border-b border-steel-200 px-6 pt-6 pb-5 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-steel-500 uppercase">
            Step <span className="text-wine-600">{String(step + 1).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-steel-500">
            <Lock className="size-3.5" aria-hidden /> Sent securely to our team
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden bg-steel-200" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length} aria-label="Quote progress">
          <div className="h-full wine-bar transition-[width] duration-700 ease-[var(--ease-industrial)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative px-6 py-8 sm:px-10 sm:py-10">
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <header className="mb-8">
          <h2 className="font-display text-3xl font-bold text-steel-950 uppercase sm:text-4xl">{current.title}</h2>
          <p className="mt-1 text-steel-500">{current.caption}</p>
        </header>

        <div key={current.key} className={cn("space-y-7", direction === 1 ? "animate-[stepIn_0.55s_var(--ease-industrial)_both]" : "animate-[stepBack_0.55s_var(--ease-industrial)_both]")}>
          {current.key === "contact" && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField label="Full name" name="name" value={data.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
                <TextField label="Company" name="company" value={data.company} onChange={set("company")} error={errors.company} autoComplete="organization" />
                <TextField label="Email" name="email" type="email" value={data.email} onChange={set("email")} error={errors.email} required autoComplete="email" inputMode="email" />
                <TextField label="Phone" name="phone" type="tel" value={data.phone} onChange={set("phone")} error={errors.phone} required autoComplete="tel" inputMode="tel" placeholder="(913) 555-0100" />
              </div>
              <ChoiceGroup
                legend="Preferred contact method"
                name="preferred_contact"
                variant="chips"
                value={data.preferred_contact}
                onChange={set("preferred_contact")}
                options={tiles.chips(options.preferred_contact)}
                error={errors.preferred_contact}
              />
            </>
          )}

          {current.key === "project" && (
            <>
              <ChoiceGroup
                legend="Project type"
                name="project_type"
                value={data.project_type}
                onChange={set("project_type")}
                options={tiles.projectTypes}
                error={errors.project_type}
                required
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
              <TextField
                label="Project location"
                name="project_location"
                value={data.project_location}
                onChange={set("project_location")}
                error={errors.project_location}
                required
                placeholder="City, state or site address"
                autoComplete="address-level2"
              />
              <ChoiceGroup legend="Timeline" name="timeline" variant="chips" value={data.timeline} onChange={set("timeline")} options={tiles.chips(options.timelines)} error={errors.timeline} />
              <ChoiceGroup legend="Budget range" name="budget_range" variant="chips" value={data.budget_range} onChange={set("budget_range")} options={tiles.chips(options.budget_ranges)} error={errors.budget_range} />
            </>
          )}

          {current.key === "scope" && (
            <>
              <ChoiceGroup legend="Service needed" name="service" value={data.service} onChange={set("service")} options={tiles.services} error={errors.service} required />
              <ChoiceGroup
                legend="Market / facility type"
                name="market"
                value={data.market}
                onChange={set("market")}
                options={tiles.markets}
                error={errors.market}
                required
                columns="sm:grid-cols-2 lg:grid-cols-3"
              />
            </>
          )}

          {current.key === "details" && (
            <>
              <TextAreaField
                label="Project description"
                name="description"
                value={data.description}
                onChange={set("description")}
                error={errors.description}
                required
                rows={7}
                maxLength={5000}
                hint="Scope, equipment, square footage, schedule constraints, bid dates — anything that helps us price accurately."
                placeholder="e.g. Replace two 20-ton rooftop units and associated ductwork at a 30,000 sq ft municipal building. Work must be completed after hours."
              />
              <FileField
                label="Drawings, specs or photos"
                file={attachment}
                onChange={setAttachment}
                accept={options.uploads.attachment_types}
                maxKb={options.uploads.attachment_max_kb}
                error={errors.attachment}
                onError={(message) => setErrors((currentErrors) => (message ? { ...currentErrors, attachment: message } : without(currentErrors, "attachment")))}
              />
            </>
          )}

          {current.key === "review" && (
            <ReviewSummary data={data} attachment={attachment} onEdit={goTo} />
          )}
        </div>

        {status === "error" && result && !result.ok && (
          <div role="alert" className="mt-8 flex items-start gap-3 border border-wine-300 bg-wine-50 p-4 text-sm text-wine-800">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>
              {result.message}
              {result.kind === "validation" && result.errors.form_token && " We've refreshed the form — please press Submit again."}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-steel-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="inline-flex items-center justify-center gap-2 px-2 py-3 font-display text-sm font-semibold tracking-[0.14em] text-steel-600 uppercase transition-colors hover:text-wine-600"
            >
              <ArrowLeft className="size-4" aria-hidden /> Back
            </button>
          ) : (
            <Link href="/contact" className="text-center text-sm text-steel-500 underline-offset-4 hover:text-wine-600 hover:underline sm:text-left">
              Just have a question? Contact us instead
            </Link>
          )}

          {step < steps.length - 1 ? (
            <Button type="submit" size="lg" arrow>
              Continue
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Submit request <Send className="size-4" aria-hidden />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div ref={panelRef} className="grid scroll-mt-28 items-start gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] xl:gap-8">
      <StepRail current={succeeded ? steps.length : step} onSelect={(index) => index < step && goTo(index)} />
      <div className="relative bg-white shadow-panel ring-1 ring-steel-200">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] wine-bar" />
        {succeeded ? successView : formView}
      </div>
    </div>
  );
}

function StepRail({ current, onSelect }: { current: number; onSelect: (index: number) => void }) {
  return (
    <aside className="charcoal relative hidden overflow-hidden p-8 lg:sticky lg:top-28 lg:block">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 wine-fill-v" />
      <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-steel-400 uppercase">Your request</p>
      <ol className="relative mt-7 space-y-1">
        <span aria-hidden className="absolute top-5 bottom-5 left-[19px] w-px bg-white/10" />
        {steps.map((item, index) => {
          const done = index < current;
          const active = index === current;
          const Icon = done ? CircleCheckBig : item.icon;

          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                disabled={!done}
                aria-current={active ? "step" : undefined}
                className="group relative flex w-full items-center gap-4 py-3 text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    "relative grid size-10 shrink-0 place-items-center border transition-all duration-500",
                    active && "border-wine-400 bg-wine-600 text-white shadow-glow",
                    done && "border-wine-700 bg-wine-900/60 text-white/75",
                    !active && !done && "border-white/15 bg-steel-900 text-steel-500",
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden />
                </span>
                <span>
                  <span className={cn("block font-display text-[15px] font-semibold tracking-wide uppercase transition-colors", active ? "text-white" : done ? "text-steel-200 group-hover:text-white" : "text-steel-500")}>
                    {item.title}
                  </span>
                  <span className="block text-xs text-steel-500">{item.caption}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="glass-dark mt-8 p-5 text-sm leading-relaxed text-steel-300">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-white uppercase">What happens next</p>
        <p className="mt-2">Every request is reviewed by our team — not a call center. We&apos;ll follow up to confirm scope before pricing.</p>
      </div>
    </aside>
  );
}

function ReviewSummary({ data, attachment, onEdit }: { data: QuoteData; attachment: File | null; onEdit: (step: number) => void }) {
  const groups: Array<{ step: number; title: string; rows: Array<[string, string]> }> = [
    {
      step: 0,
      title: "Contact",
      rows: [
        ["Name", data.name],
        ["Company", data.company || "—"],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Preferred contact", data.preferred_contact || "No preference"],
      ],
    },
    {
      step: 1,
      title: "Project",
      rows: [
        ["Type", data.project_type],
        ["Location", data.project_location],
        ["Timeline", data.timeline || "Not specified"],
        ["Budget", data.budget_range || "Not specified"],
      ],
    },
    { step: 2, title: "Service & market", rows: [["Service", data.service], ["Market", data.market]] },
    { step: 3, title: "Details", rows: [["Description", data.description], ["Attachment", attachment?.name ?? "None"]] },
  ];

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <section key={group.title} className="border border-steel-200 bg-steel-50/70">
          <div className="flex items-center justify-between border-b border-steel-200 px-5 py-3">
            <h3 className="font-display text-sm font-semibold tracking-[0.16em] text-steel-800 uppercase">{group.title}</h3>
            <button type="button" onClick={() => onEdit(group.step)} className="flex items-center gap-1.5 text-xs font-medium text-wine-600 hover:underline">
              <PencilLine className="size-3.5" aria-hidden /> Edit
            </button>
          </div>
          <dl className="grid gap-x-6 gap-y-3 px-5 py-4 text-sm sm:grid-cols-[160px_1fr]">
            {group.rows.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-steel-500">{label}</dt>
                <dd className="font-medium break-words whitespace-pre-line text-steel-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p className="text-xs leading-relaxed text-steel-500">
        By submitting, you agree that Jeffries Mechanicals may contact you about this request. We never sell your information. See our{" "}
        <Link href="/privacy" className="text-wine-600 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}

