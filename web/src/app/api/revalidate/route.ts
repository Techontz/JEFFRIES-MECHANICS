import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

/**
 * Called by the Laravel backend when admin-managed content changes,
 * so the public pages update immediately instead of waiting for ISR.
 */
const scopes: Record<string, Array<[string, "page" | undefined]>> = {
  projects: [
    ["/our-work", undefined],
    ["/our-work/[slug]", "page"],
    ["/sitemap.xml", undefined],
  ],
  jobs: [["/careers", undefined]],
};

function authorized(provided: string | null): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || !provided) {
    return false;
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!authorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { scope } = (await request.json().catch(() => ({}))) as { scope?: string };
  const paths = scope ? scopes[scope] : undefined;

  if (!paths) {
    return Response.json({ message: "Unknown scope" }, { status: 422 });
  }

  paths.forEach(([path, type]) => revalidatePath(path, type));

  return Response.json({ revalidated: true, scope });
}
