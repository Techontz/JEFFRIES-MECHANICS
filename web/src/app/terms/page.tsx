import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${company.legalName} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="September 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Website content</h2>
      <p>
        Content on this site is provided for general information about {company.legalName} and its services. It does not
        constitute an offer, proposal or contract. Any work is governed solely by a written agreement between the parties.
      </p>
      <h2>Submissions</h2>
      <p>
        Information you submit must be accurate and must not include unlawful, harmful or malicious content or files. We may
        decline or remove any submission.
      </p>
      <h2>Intellectual property</h2>
      <p>The {company.name} name, logo and site content may not be used without prior written permission.</p>
      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law, {company.legalName} is not liable for damages
        arising from use of the website.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the site means you accept the current terms.</p>
    </LegalPage>
  );
}
