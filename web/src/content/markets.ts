import type { LucideIcon } from "lucide-react";
import { Landmark, Building2, School, Handshake, Building, Construction } from "lucide-react";

export type Market = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const markets: Market[] = [
  {
    slug: "government",
    title: "Government & Municipal",
    description: "Public facilities, municipal projects, maintenance requirements, and agency contracting opportunities.",
    image: "/images/photos/government-capitol.jpg",
    imageAlt: "Government capitol building",
    icon: Landmark,
  },
  {
    slug: "commercial",
    title: "Commercial",
    description: "Commercial buildings, offices, retail environments, property portfolios, and business facilities.",
    image: "/images/photos/commercial-glass.jpg",
    imageAlt: "Glass-clad commercial office tower",
    icon: Building2,
  },
  {
    slug: "institutional",
    title: "Institutional",
    description: "Schools, community facilities, nonprofit organizations, public-serving institutions, and similar facilities.",
    image: "/images/photos/institutional-school.jpg",
    imageAlt: "School campus building",
    icon: School,
  },
  {
    slug: "prime-contractors",
    title: "Prime Contractors",
    description: "Subcontracting and specialized-trade support for general contractors and construction teams.",
    image: "/images/photos/construction-team.jpg",
    imageAlt: "Two engineers in hard hats reviewing a blueprint together on a steel-frame site",
    icon: Handshake,
  },
  {
    slug: "facilities",
    title: "Facilities & Property Operations",
    description: "Scheduled maintenance, repairs, upgrades, and project-based facility support.",
    image: "/images/photos/plant-operations.jpg",
    imageAlt: "Technician in a hard hat and safety glasses working at a steel table inside an industrial plant",
    icon: Building,
  },
  {
    slug: "infrastructure",
    title: "Infrastructure & Construction",
    description: "Electrical, mechanical, and specialized-trade participation in qualified construction and infrastructure projects.",
    image: "/images/photos/site-engineer.jpg",
    imageAlt: "Engineer in a white hard hat and safety vest holding a clipboard on a steel-frame construction site",
    icon: Construction,
  },
];
