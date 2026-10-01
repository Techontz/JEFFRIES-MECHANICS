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
    image: "/images/photos/street-crew.jpg",
    imageAlt: "Crew member in a safety vest setting up traffic control on a city street",
    icon: Handshake,
  },
  {
    slug: "facilities",
    title: "Facilities & Property Operations",
    description: "Scheduled maintenance, repairs, upgrades, and project-based facility support.",
    image: "/images/photos/jm-plan-review-pair.jpg",
    imageAlt: "Jeffries Mechanicals tradeswoman and colleague in hard hats reviewing drawings on a jobsite",
    icon: Building,
  },
  {
    slug: "infrastructure",
    title: "Infrastructure & Construction",
    description: "Electrical, mechanical, and specialized-trade participation in qualified construction and infrastructure projects.",
    image: "/images/photos/site-inspector.jpg",
    imageAlt: "Engineer in an orange hard hat and safety glasses inspecting an industrial site",
    icon: Construction,
  },
];
