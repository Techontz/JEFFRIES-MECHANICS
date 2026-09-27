import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SubmitButton({ submitting, children }: { submitting: boolean; children: React.ReactNode }) {
  return (
    <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
      {submitting ? (
        <>
          <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
        </>
      ) : (
        <>
          {children} <Send className="size-4" aria-hidden />
        </>
      )}
    </Button>
  );
}
