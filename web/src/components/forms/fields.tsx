"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, CircleAlert, FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";

const inputBase =
  "w-full border bg-white px-4 text-[15px] text-steel-950 placeholder:text-steel-400 shadow-[inset_0_1px_2px_rgb(20_22_25/0.06)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-wine-600 focus:ring-4 focus:ring-wine-600/12";

const inputState = (error?: string) => (error ? "border-wine-500 bg-wine-50/40" : "border-steel-300 hover:border-steel-400");

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

export function Field({ label, error, hint, required, className, children }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 font-display text-[13px] font-semibold tracking-[0.14em] text-steel-800 uppercase">
        {label}
        {required ? <span className="text-wine-600">*</span> : <span className="font-sans text-[11px] font-normal tracking-normal text-steel-400 normal-case">Optional</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-[13px] text-wine-600">
          <CircleAlert className="mt-px size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-2 text-[13px] text-steel-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
};

export function TextField({ label, name, value, onChange, error, hint, required, className, ...rest }: TextFieldProps) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          required={required}
          className={cn(inputBase, inputState(error), "h-[52px]")}
          {...rest}
        />
      )}
    </Field>
  );
}

type TextAreaProps = Omit<TextFieldProps, "type" | "inputMode"> & { rows?: number; maxLength?: number };

export function TextAreaField({ label, name, value, onChange, error, hint, required, className, rows = 6, maxLength, ...rest }: TextAreaProps) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <textarea
            id={id}
            name={name}
            value={value}
            rows={rows}
            maxLength={maxLength}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            required={required}
            className={cn(inputBase, inputState(error), "resize-y py-3.5 leading-relaxed")}
            {...rest}
          />
          {maxLength && (
            <span className="pointer-events-none absolute right-3 bottom-3 text-[11px] text-steel-400 tabular-nums">
              {value.length.toLocaleString()} / {maxLength.toLocaleString()}
            </span>
          )}
        </div>
      )}
    </Field>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { value: string; label: string }>;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export function SelectField({ label, name, value, onChange, options, error, hint, required, placeholder = "Select…", className }: SelectFieldProps) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            required={required}
            className={cn(inputBase, inputState(error), "h-[52px] appearance-none pr-11", !value && "text-steel-400")}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => {
              const { value: optionValue, label: optionLabel } = typeof option === "string" ? { value: option, label: option } : option;

              return (
                <option key={optionValue} value={optionValue} className="text-steel-950">
                  {optionLabel}
                </option>
              );
            })}
          </select>
          <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-2.5 -translate-y-3/4 rotate-45 border-r-2 border-b-2 border-wine-600" />
        </div>
      )}
    </Field>
  );
}

type ChoiceOption = { value: string; label: string; description?: string; icon?: LucideIcon };

type ChoiceGroupProps = {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  error?: string;
  required?: boolean;
  variant?: "tiles" | "chips";
  columns?: string;
};

/** Radio group rendered as selectable steel tiles or compact chips. */
export function ChoiceGroup({ legend, name, value, onChange, options, error, required, variant = "tiles", columns = "sm:grid-cols-2" }: ChoiceGroupProps) {
  const id = useId();

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-3 flex items-baseline gap-1.5 font-display text-[13px] font-semibold tracking-[0.14em] text-steel-800 uppercase">
        {legend}
        {required ? <span className="text-wine-600">*</span> : <span className="font-sans text-[11px] font-normal tracking-normal text-steel-400 normal-case">Optional</span>}
      </legend>

      <div className={cn(variant === "tiles" ? cn("grid gap-3", columns) : "flex flex-wrap gap-2.5")}>
        {options.map((option) => {
          const checked = value === option.value;
          const Icon = option.icon;

          return (
            <label
              key={option.value}
              className={cn(
                "group relative cursor-pointer border transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-wine-600/20",
                variant === "tiles" ? "flex items-start gap-3.5 p-4" : "px-4 py-2.5 text-sm",
                checked
                  ? "border-wine-600 bg-gradient-to-b from-wine-50 to-white shadow-wine"
                  : cn("border-steel-300 bg-white hover:border-steel-500", error && "border-wine-300"),
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
                required={required}
              />
              {variant === "tiles" && Icon && (
                <span className={cn("grid size-10 shrink-0 place-items-center transition-colors", checked ? "bg-wine-600 text-white" : "bg-steel-100 text-wine-600 group-hover:bg-steel-200")}>
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className={cn("block font-medium", variant === "tiles" ? "text-[15px] text-steel-950" : checked ? "text-wine-700" : "text-steel-700")}>
                  {option.label}
                </span>
                {option.description && <span className="mt-0.5 block text-[13px] leading-snug text-steel-500">{option.description}</span>}
              </span>
              {variant === "tiles" && (
                <span className={cn("grid size-5 shrink-0 place-items-center border transition-colors", checked ? "border-wine-600 bg-wine-600 text-white" : "border-steel-300 bg-white")}>
                  {checked && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                </span>
              )}
            </label>
          );
        })}
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-[13px] text-wine-600">
          <CircleAlert className="mt-px size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </fieldset>
  );
}

type FileFieldProps = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept: string[];
  maxKb: number;
  error?: string;
  required?: boolean;
  onError: (message: string | undefined) => void;
};

export function FileField({ label, file, onChange, accept, maxKb, error, required, onError }: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (candidate: File | undefined) => {
    if (!candidate) {
      return;
    }

    const extension = candidate.name.split(".").pop()?.toLowerCase() ?? "";
    if (!accept.includes(extension)) {
      onError(`Unsupported file type. Use ${accept.join(", ").toUpperCase()}.`);
      return;
    }
    if (candidate.size > maxKb * 1024) {
      onError(`File is too large. Maximum size is ${Math.round(maxKb / 1024)} MB.`);
      return;
    }

    onError(undefined);
    onChange(candidate);
  };

  return (
    <Field label={label} error={error} required={required}>
      {({ id, describedBy }) => (
        <div>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept.map((extension) => `.${extension}`).join(",")}
            aria-describedby={describedBy}
            className="sr-only"
            onChange={(event) => pick(event.target.files?.[0])}
          />
          {file ? (
            <div className="flex items-center gap-4 border border-steel-300 bg-steel-50 p-4">
              <span className="grid size-11 shrink-0 place-items-center bg-wine-600 text-white">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-steel-900">{file.name}</span>
                <span className="text-xs text-steel-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                className="grid size-9 place-items-center border border-steel-300 text-steel-600 transition-colors hover:border-wine-600 hover:text-wine-600"
              >
                <X className="size-4" aria-hidden />
                <span className="sr-only">Remove file</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                pick(event.dataTransfer.files?.[0]);
              }}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed px-6 py-8 text-center transition-colors",
                dragging ? "border-wine-600 bg-wine-50" : error ? "border-wine-300 bg-wine-50/40" : "border-steel-300 bg-steel-50 hover:border-wine-400",
              )}
            >
              <Upload className="size-6 text-wine-600" aria-hidden />
              <span className="text-sm font-medium text-steel-800">
                Drag a file here or <span className="text-wine-600 underline underline-offset-4">browse</span>
              </span>
              <span className="text-xs text-steel-500">
                {accept.join(", ").toUpperCase()} · up to {Math.round(maxKb / 1024)} MB
              </span>
            </button>
          )}
        </div>
      )}
    </Field>
  );
}

/** Off-screen trap field. Humans never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
    </div>
  );
}
