import { MapPin, TriangleAlert } from "lucide-react";
import { company, fullAddress } from "@/content/company";

/** Shown when the backend cannot supply form options. */
export function FormUnavailable() {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-center sm:p-14">
      <TriangleAlert className="size-10 text-wine-600" strokeWidth={1.5} aria-hidden />
      <h2 className="font-display text-3xl font-bold text-steel-950 uppercase">Online requests are temporarily unavailable</h2>
      <p className="max-w-md text-steel-600">
        Please try again in a few minutes. You can also reach {company.legalName} directly
        {company.phone ? ` at ${company.phone}` : ""}
        {company.email ? ` or ${company.email}` : ""}.
      </p>
      <p className="flex items-center gap-2 text-sm text-steel-500">
        <MapPin className="size-4 text-wine-600" aria-hidden /> {fullAddress}
      </p>
    </div>
  );
}
