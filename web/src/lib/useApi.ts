"use client";

import { useEffect, useState } from "react";

export type ApiState<T> = { status: "loading" } | { status: "ready"; data: T } | { status: "error" };

/**
 * Runs an API loader in the browser. A loader that resolves to null (backend unreachable)
 * becomes "error" so the page can show its fallback. `key` identifies the request; a result
 * for an older key reads as loading until the new one arrives.
 */
export function useApi<T>(loader: () => Promise<T | null>, key = ""): ApiState<T> {
  const [result, setResult] = useState<{ key: string; data: T | null } | null>(null);

  useEffect(() => {
    let active = true;
    loader().then((data) => active && setResult({ key, data }));

    return () => {
      active = false;
    };
    // The loader is identified by `key`; callers pass inline functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!result || result.key !== key) return { status: "loading" };

  return result.data === null ? { status: "error" } : { status: "ready", data: result.data };
}
