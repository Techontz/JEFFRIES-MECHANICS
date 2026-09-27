import { cn } from "@/lib/cn";

/** Standard content width for every section (see the `shell` utility in globals.css). */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("shell", className)}>{children}</div>;
}
