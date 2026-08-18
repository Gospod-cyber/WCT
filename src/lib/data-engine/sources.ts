import type {
  DataSourceType,
} from "./types";

export type DataSource = {
  id: string;

  name: string;

  url: string;

  type: DataSourceType;

  enabled: boolean;

  priority: number;
};

export const dataSources: DataSource[] = [
  {
    id: "mod-ukraine",

    name: "Ministry of Defence of Ukraine",

    url: "https://www.mil.gov.ua/en/",

    type: "official",

    enabled: true,

    priority: 1,
  },

  {
    id: "ukraine-air-force",

    name: "Ukrainian Air Force",

    url: "https://www.mil.gov.ua/",

    type: "official",

    enabled: true,

    priority: 1,
  },

  {
    id: "ukraine-air-war-monitor",

    name: "Ukraine Air War Monitor",

    url:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",

    type: "analytical",

    enabled: true,

    priority: 2,
  },
];