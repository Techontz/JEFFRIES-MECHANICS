import { LoaderCircle } from "lucide-react";

/** Placeholder while form options load from the backend; holds the form's space so the page doesn't jump. */
export function FormLoading({ label = "Loading form" }: { label?: string }) {
  return (
    <div role="status" className="flex min-h-[420px] flex-col items-center justify-center gap-4 p-10 text-center">
      <LoaderCircle className="size-8 animate-spin text-wine-600" aria-hidden />
      <p className="font-display text-sm font-semibold tracking-[0.2em] text-steel-500 uppercase">{label}…</p>
    </div>
  );
}
