import type { CostSourceType } from "./types";

export type CostSource = {
  id: string;

  name: string;

  url: string;

  type: CostSourceType;

  priority: number;

  enabled: boolean;

  description: string;
};

export const costSources: CostSource[] = [
  {
    id: "estonian-intelligence",
    name: "Estonian Foreign Intelligence Service",
    url: "https://raport.valisluureamet.ee/",
    type: "intelligence",
    priority: 1,
    enabled: true,
    description:
      "Official intelligence assessments and publicly released estimates concerning Russian military production.",
  },

  {
    id: "ukraine-mod",
    name: "Ministry of Defence of Ukraine",
    url: "https://mod.gov.ua/",
    type: "official",
    priority: 1,
    enabled: true,
    description:
      "Official Ukrainian defence information and reported Russian weapon usage.",
  },

  {
    id: "ukraine-air-force",
    name: "Air Force of Ukraine",
    url: "https://www.mil.gov.ua/",
    type: "official",
    priority: 1,
    enabled: true,
    description:
      "Official Ukrainian Air Force information concerning aerial attacks and weapon systems.",
  },

  {
    id: "militarnyi",
    name: "Militarnyi",
    url: "https://militarnyi.com/",
    type: "analytical",
    priority: 2,
    enabled: true,
    description:
      "Open-source defence analysis and reporting based on procurement data and other publicly available information.",
  },

  {
    id: "uawm-kas",
    name: "Ukraine Air War Monitor",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",
    type: "analytical",
    priority: 2,
    enabled: true,
    description:
      "Analytical publications documenting Russian aerial attacks against Ukraine.",
  },
];