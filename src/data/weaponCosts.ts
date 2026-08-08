export type WeaponCost = {
  name: string;
  category: "missile" | "drone";

  minCost: number | null;
  maxCost: number | null;
  primaryEstimate: number | null;

  currency: "USD";

  costBasis:
    | "production_cost"
    | "procurement_cost"
    | "unknown";

  confidence: "high" | "medium" | "low";

  sourceName: string;
  sourceUrl: string;
  sourceDate: string;

  methodology: string;
};

export const weaponCosts: WeaponCost[] = [
  {
    name: "Geran-2 / Shahed-136",
    category: "drone",

    minCost: 35000,
    maxCost: 48800,
    primaryEstimate: 41900,

    currency: "USD",

    costBasis: "production_cost",

    confidence: "medium",

    sourceName: "Estonian Foreign Intelligence Service",
    sourceUrl:
      "https://raport.valisluureamet.ee/2025/en/1-russian-armed-forces-and-the-war-in-ukraine/1-2-russia-is-committed-to-advancing-drone-technology/",
    sourceDate: "2025",

    methodology:
      "Range based on open-source estimates of Russian Geran-2 production cost.",
  },

  {
    name: "Kh-101",
    category: "missile",

    minCost: null,
    maxCost: null,
    primaryEstimate: null,

    currency: "USD",

    costBasis: "unknown",

    confidence: "low",

    sourceName: "Ministry of Defence of Ukraine",
    sourceUrl:
      "https://mod.gov.ua/en/news/russia-modified-kh-101-missiles-four-times-to-strengthen-its-aerial-terror-campaign-ukraine-still-intercepts-88",
    sourceDate: "2026-05-11",

    methodology:
      "Weapon characteristics are confirmed by Ukrainian MoD analysis, but no sufficiently reliable current public production-cost estimate is fixed yet.",
  },

  {
    name: "Kalibr",
    category: "missile",

    minCost: null,
    maxCost: null,
    primaryEstimate: null,

    currency: "USD",

    costBasis: "unknown",

    confidence: "low",

    sourceName: "Ministry of Defence of Ukraine",
    sourceUrl:
      "https://mod.gov.ua/explanation/dvi-znachni-zminy-minoborony-detalno-proanalizuvalo-zbyti-rakety-kalibr",
    sourceDate: "2026-06-09",

    methodology:
      "Weapon characteristics are confirmed by Ukrainian MoD analysis, but no sufficiently reliable current public production-cost estimate is fixed yet.",
  },

  {
    name: "Iskander-M / KN-23",
    category: "missile",

    minCost: null,
    maxCost: null,
    primaryEstimate: null,

    currency: "USD",

    costBasis: "unknown",

    confidence: "low",

    sourceName: "Ministry of Defence of Ukraine",
    sourceUrl:
      "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
    sourceDate: "2026-06-05",

    methodology:
      "The MoD confirms use of Iskander-M/KN-23 in May 2026, while a sufficiently reliable current cost estimate remains under review.",
  },

  {
    name: "Kinzhal",
    category: "missile",

    minCost: null,
    maxCost: null,
    primaryEstimate: null,

    currency: "USD",

    costBasis: "unknown",

    confidence: "low",

    sourceName: "Ministry of Defence of Ukraine",
    sourceUrl:
      "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
    sourceDate: "2026-06-05",

    methodology:
      "The MoD confirms Kinzhal use in May 2026, but public cost estimates vary substantially and require further validation.",
  },

  {
    name: "Zircon",
    category: "missile",

    minCost: null,
    maxCost: null,
    primaryEstimate: null,

    currency: "USD",

    costBasis: "unknown",

    confidence: "low",

    sourceName: "Ministry of Defence of Ukraine",
    sourceUrl:
      "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
    sourceDate: "2026-06-05",

    methodology:
      "The MoD confirms Zircon use during a large-scale May 2026 attack, but a sufficiently reliable public cost estimate is not fixed yet.",
  },
];