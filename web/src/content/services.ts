import type { LucideIcon } from "lucide-react";
import { Fan, Zap, Gauge, Flame, HardHat } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  scope: string[];
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "mechanical",
    title: "Mechanical Services",
    short: "HVAC, piping and mechanical systems — installed, maintained and repaired.",
    description:
      "Mechanical contracting support, installation, maintenance, repair, and project-based services for commercial and facility environments.",
    scope: [
      "Heating, ventilation & air-conditioning systems",
      "Mechanical piping and equipment installation",
      "System replacements and upgrades",
      "Repair and troubleshooting",
    ],
    image: "/images/photos/factory-line.jpg",
    imageAlt: "Technician operating production equipment on a factory floor",
    icon: Fan,
  },
  {
    slug: "electrical",
    title: "Electrical Contracting",
    short: "Commercial electrical installation, upgrades and project support.",
    description:
      "Electrical installation, maintenance, repair, upgrades, and project support for commercial and institutional environments, subject to applicable licensing requirements.",
    scope: [
      "Commercial electrical installation",
      "Panel, distribution and controls work",
      "Upgrades, maintenance and repair",
      "Project support for institutional facilities",
    ],
    image: "/images/photos/panel-testing.jpg",
    imageAlt: "Electrician in a hard hat and face shield testing a distribution panel with a meter",
    icon: Zap,
  },
  {
    slug: "facility-maintenance",
    title: "Facility Maintenance",
    short: "Preventive and corrective maintenance that keeps buildings operational.",
    description:
      "Preventive and corrective maintenance support designed to help facilities maintain safe, dependable, and operational building systems.",
    scope: [
      "Preventive maintenance programs",
      "Corrective repairs and service calls",
      "Boiler, pump and mechanical room support",
      "Scheduled facility system checks",
    ],
    image: "/images/photos/machine-technician.jpg",
    imageAlt: "Technician in safety glasses and ear protection working on a machine",
    icon: Gauge,
  },
  {
    slug: "specialized-trades",
    title: "Specialized Trade Services",
    short: "Project-specific skilled trades for demanding assignments.",
    description:
      "Project-specific skilled-trade support for construction, renovation, maintenance, and infrastructure assignments.",
    scope: [
      "Welding and fabrication support",
      "Renovation and retrofit trade work",
      "Infrastructure assignments",
      "Skilled labor for defined scopes",
    ],
    image: "/images/photos/welder-woman.jpg",
    imageAlt: "Welder in eye protection welding steel plate at a workbench",
    icon: Flame,
  },
  {
    slug: "construction-support",
    title: "Construction Support",
    short: "Trade contracting and subcontracting for construction teams.",
    description:
      "Trade contracting and subcontracting support for general contractors, construction managers, public agencies, and commercial project teams.",
    scope: [
      "Subcontract trade packages",
      "Support for general contractors & CMs",
      "Public agency project participation",
      "Schedule-driven jobsite execution",
    ],
    image: "/images/photos/plans-check.jpg",
    imageAlt: "Engineer in a white hard hat checking construction plans",
    icon: HardHat,
  },
];

/** The four core disciplines featured in the homepage steel strip. */
export const featuredServices = services.slice(0, 4);
