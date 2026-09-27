import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Props = { title: string; message: string; reference: string; onReset: () => void; resetLabel?: string };

export function SubmissionSuccess({ title, message, reference, onReset, resetLabel = "Send another" }: Props) {
  return (
    <div role="status" className="animate-rise py-6 text-center">
      <span className="mx-auto grid size-16 place-items-center wine-fill-v text-white [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0_50%)]">
        <CircleCheckBig className="size-7" strokeWidth={1.7} aria-hidden />
      </span>
      <h3 className="mt-6 font-display text-3xl font-bold text-steel-950 uppercase">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-steel-600">{message}</p>
      <p className="mt-5 text-sm text-steel-500">
        Reference <span className="font-mono font-semibold text-wine-700">{reference}</span>
      </p>
      <Button type="button" variant="outline" className="mt-8" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
