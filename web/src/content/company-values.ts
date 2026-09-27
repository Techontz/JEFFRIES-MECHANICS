import type { LucideIcon } from "lucide-react";
import { Award, FileCheck2, PhoneCall, ShieldCheck } from "lucide-react";

export type Pillar = { title: string; description: string; short: string; icon: LucideIcon };

export const pillars: Pillar[] = [
  {
    title: "Quality-Focused",
    description: "Work performed according to project requirements, applicable standards, and defined scope.",
    short: "Work performed to project requirements, applicable standards and defined scope.",
    icon: Award,
  },
  {
    title: "Contract-Ready",
    description:
      "Business systems designed to support procurement, documentation, insurance, bonding, payroll, and project administration requirements.",
    short: "Systems that support procurement, insurance, bonding, payroll and documentation.",
    icon: FileCheck2,
  },
  {
    title: "Responsive",
    description: "Clear communication from opportunity review through project execution and closeout.",
    short: "Clear communication from opportunity review through execution and closeout.",
    icon: PhoneCall,
  },
  {
    title: "Built for Accountability",
    description: "Defined company management, documentation controls, project records, and compliance-focused operations.",
    short: "Defined management, documentation controls and compliance-focused operations.",
    icon: ShieldCheck,
  },
];

export const processSteps = [
  {
    title: "Opportunity Review",
    description: "We review drawings, scope, schedule and contract requirements before we commit.",
  },
  {
    title: "Scope & Pricing",
    description: "A clear, documented proposal that defines what is included — and what is not.",
  },
  {
    title: "Execution",
    description: "Disciplined field work with consistent communication and schedule accountability.",
  },
  {
    title: "Closeout",
    description: "Documentation, records and a clean handover so the owner is ready to operate.",
  },
];

/**
 * Headline figures. These describe the business factually; replace or extend
 * with verified numbers (years in business, completed projects) once confirmed.
 */
export const stats = [
  { value: 3, suffix: "", label: "Core Trades", detail: "Mechanical · Electrical · Specialized" },
  { value: 6, suffix: "", label: "Markets Served", detail: "Public, commercial & institutional" },
  { value: 100, suffix: "%", label: "Commitment to Safety", detail: "On every jobsite, every shift" },
  { value: null, display: "KC", suffix: "", label: "Regional Market", detail: "Kansas City, KS & surrounding region" },
] as const;
