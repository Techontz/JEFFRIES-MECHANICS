import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="steel-wash py-20 lg:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-5xl font-bold text-steel-950 uppercase">{title}</h1>
        <p className="mt-3 text-sm text-steel-500">Last updated {updated}</p>
        <div className="mt-10 space-y-6 bg-white p-8 leading-relaxed text-steel-700 ring-1 ring-steel-200 sm:p-12 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-steel-950 [&_h2]:uppercase [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </section>
  );
}
