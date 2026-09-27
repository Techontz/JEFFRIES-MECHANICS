"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchFormToken, submitForm, type SubmissionEndpoint, type SubmissionResult } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Handles the anti-spam form token and the POST lifecycle for a public form.
 */
export function useSubmission(endpoint: SubmissionEndpoint) {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const refreshToken = useCallback(async () => {
    try {
      setToken(await fetchFormToken());
    } catch {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching the token is the external sync here
    refreshToken();
  }, [refreshToken]);

  const submit = useCallback(
    async (fields: Record<string, string | File | null | undefined>) => {
      setStatus("submitting");
      setResult(null);

      const body = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          body.append(key, value);
        }
      });
      body.append("form_token", token ?? (await fetchFormToken().catch(() => "")));
      body.append("website", honeypot);

      const response = await submitForm(endpoint, body);
      setResult(response);
      setStatus(response.ok ? "success" : "error");

      if (!response.ok && response.kind === "validation" && response.errors.form_token) {
        await refreshToken();
      }

      return response;
    },
    [endpoint, token, honeypot, refreshToken],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    refreshToken();
  }, [refreshToken]);

  return { status, result, submit, reset, honeypot, setHoneypot, ready: token !== null };
}
