/**
 * Client for the Laravel backend (see backend/routes/api.php).
 */

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export type Option = { value: string; label: string };

export type FormOptions = {
  services: string[];
  markets: string[];
  project_types: string[];
  timelines: string[];
  budget_ranges: string[];
  preferred_contact: string[];
  system_types: string[];
  contact_subjects: string[];
  trades: string[];
  experience: string[];
  urgencies: Option[];
  uploads: {
    attachment_types: string[];
    attachment_max_kb: number;
    resume_types: string[];
    resume_max_kb: number;
  };
};

export type JobOpening = {
  id: number;
  title: string;
  slug: string;
  trade: string;
  location: string;
  employment_type: string;
  summary: string;
  description: string | null;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  market: string;
  service: string;
  location: string | null;
  completed_year: string | null;
  summary: string;
  description: string | null;
  image_url: string | null;
  gallery: string[];
  is_featured: boolean;
};

/** Local backends can't go through the Next image optimizer (private IPs are blocked). */
export const isLocalApi = /localhost|127\.0\.0\.1/.test(API_URL);

/** Server-side GET with ISR caching. Returns null if the backend is unreachable. */
async function getJson<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}/api/${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });

    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

export const getFormOptions = () => getJson<FormOptions>("form-options");

export const getJobOpenings = async () => (await getJson<{ data: JobOpening[] }>("job-openings", 120))?.data ?? [];

export const getProjects = async () => (await getJson<{ data: Project[] }>("projects", 120))?.data ?? [];

export const getProject = async (slug: string) => (await getJson<{ data: Project }>(`projects/${encodeURIComponent(slug)}`, 120))?.data ?? null;

/* ------------------------------------------------------------------
   Browser-side submissions
   ------------------------------------------------------------------ */

export type SubmissionEndpoint = "quote-requests" | "service-requests" | "contact-messages" | "career-applications";

export type SubmissionResult =
  | { ok: true; reference: string; message: string; duplicate: boolean }
  | { ok: false; kind: "validation"; errors: Record<string, string>; message: string }
  | { ok: false; kind: "rate-limited" | "network" | "server"; message: string };

export async function fetchFormToken(): Promise<string> {
  const response = await fetch(`${API_URL}/api/form-token`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to prepare the form.");
  }

  return ((await response.json()) as { token: string }).token;
}

export async function submitForm(endpoint: SubmissionEndpoint, body: FormData): Promise<SubmissionResult> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/${endpoint}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
  } catch {
    return {
      ok: false,
      kind: "network",
      message: "We couldn't reach our server. Check your connection and try again.",
    };
  }

  const payload = await response.json().catch(() => ({}));

  if (response.ok) {
    return { ok: true, reference: payload.reference, message: payload.message, duplicate: Boolean(payload.duplicate) };
  }

  if (response.status === 422) {
    const errors = Object.fromEntries(
      Object.entries((payload.errors ?? {}) as Record<string, string[]>).map(([field, messages]) => [field, messages[0]]),
    );

    return { ok: false, kind: "validation", errors, message: payload.message ?? "Please review the highlighted fields." };
  }

  if (response.status === 429) {
    return {
      ok: false,
      kind: "rate-limited",
      message: "Too many submissions from this connection. Please wait a minute and try again.",
    };
  }

  return { ok: false, kind: "server", message: "Something went wrong on our side. Please try again shortly." };
}
