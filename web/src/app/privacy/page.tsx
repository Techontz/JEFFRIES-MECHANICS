import { LegalPage } from "@/components/sections/LegalPage";
import { company, fullAddress } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${company.legalName} collects and uses information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        {company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what we collect when you use
        this website and how we use it.
      </p>
      <h2>Information you submit</h2>
      <p>When you request a quote, send a message, request service or apply for a position, we collect the details you provide, such as:</p>
      <ul>
        <li>Name, company, email address and phone number</li>
        <li>Project, site or service details and any files you attach</li>
        <li>For job applications, your resume and application details</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use this information only to respond to your request, prepare proposals, deliver services, evaluate applications and
        operate our business. We do not sell your personal information.
      </p>
      <h2>Technical information</h2>
      <p>
        To protect our forms from spam and abuse, we record the IP address and browser type associated with each submission.
      </p>
      <h2>Retention & security</h2>
      <p>
        Submissions are stored on secured systems accessible only to authorized staff, and retained for as long as needed for
        the purposes above or as required by law.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be directed to {company.legalName}, {fullAddress}.
      </p>
    </LegalPage>
  );
}
