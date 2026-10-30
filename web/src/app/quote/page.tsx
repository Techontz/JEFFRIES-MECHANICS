import { Suspense } from "react";
import { Clock3, FileCheck2, ShieldCheck } from "lucide-react";
import { FormLoading } from "@/components/forms/FormLoading";
import { QuoteFormPanel } from "@/components/forms/LiveForms";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a Quote",
  description:
    "Request a quote from Jeffries Mechanicals for mechanical, electrical, facility maintenance, specialized trade or construction support work in the Kansas City region.",
  path: "/quote",
});

const assurances = [
  { icon: ShieldCheck, text: "Reviewed by our team, never sold or shared" },
  { icon: FileCheck2, text: "Attach drawings, specs or photos up to 15 MB" },
  { icon: Clock3, text: "Takes about three minutes" },
];

export default function QuotePage() {

  return (
    <>
      <section className="wine-surface relative overflow-hidden pt-16 pb-40 sm:pt-20 lg:pb-44">
        <div aria-hidden className="absolute -top-40 right-[-10%] h-[140%] w-[40%] -skew-x-[14deg] border-l border-white/15 bg-white/[0.04]" />
        <Container className="relative">
          <Eyebrow tone="light" className="animate-rise">
            Get a quote
          </Eyebrow>
          <h1 className="mt-5 max-w-3xl animate-rise font-display text-5xl leading-[0.95] font-bold text-white uppercase [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            Tell us about your project
          </h1>
          <p className="mt-6 max-w-2xl animate-rise text-lg text-white/85 [animation-delay:200ms]">
            Share the scope, location and timing. We&apos;ll review it and follow up to confirm details before we price the work.
          </p>
          <ul className="mt-8 flex animate-rise flex-col gap-3 text-sm text-white/90 [animation-delay:300ms] sm:flex-row sm:flex-wrap sm:gap-8">
            {assurances.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon className="size-4 text-steel-200" aria-hidden /> {text}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="steel-wash pb-28">
        <Container className="relative -mt-28">
          <Suspense
            fallback={
              <div className="bg-white shadow-xl ring-1 ring-steel-200">
                <FormLoading />
              </div>
            }
          >
            <QuoteFormPanel />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
