import { CircleAlert } from "lucide-react";
import type { SubmissionResult } from "@/lib/api";

export function FormError({ result }: { result: SubmissionResult | null }) {
  if (!result || result.ok) {
    return null;
  }

  return (
    <div role="alert" className="flex items-start gap-3 border border-wine-300 bg-wine-50 p-4 text-sm text-wine-800">
      <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p>
        {result.message}
        {result.kind === "validation" && result.errors.form_token && " We've refreshed the form — please submit again."}
      </p>
    </div>
  );
}
