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
    minCost: 2000000,
    maxCost: 2400000,
    primaryEstimate: 2200000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "medium",
    sourceName: "Militarnyi",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "Estimated from reported Russian procurement contracts and open-source analysis for 2025.",
  },
  {
    name: "Kalibr",
    category: "missile",
    minCost: 2000000,
    maxCost: 2000000,
    primaryEstimate: 2000000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "medium",
    sourceName: "Militarnyi",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "Estimated from reported Russian procurement data and open-source analysis.",
  },
  {
    name: "Iskander-M / KN-23",
    category: "missile",
    minCost: 2400000,
    maxCost: 3000000,
    primaryEstimate: 2700000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "low",
    sourceName: "Militarnyi / Ministry of Defence of Ukraine",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "The Ukrainian Ministry of Defence reports 10 missiles as a combined Iskander-M / KN-23 category and does not provide a breakdown between the two missile types. For this estimate, the Iskander-M procurement-cost range is used as the reference value. This is a proxy estimate and does not imply that all 10 missiles were Iskander-M.",
  },
  {
    name: "Iskander-K",
    category: "missile",
    minCost: 1500000,
    maxCost: 1500000,
    primaryEstimate: 1500000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "medium",
    sourceName: "Militarnyi",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "Estimated from reported procurement values for the Iskander-K cruise missile system.",
  },
  {
    name: "Kinzhal",
    category: "missile",
    minCost: 4500000,
    maxCost: 4500000,
    primaryEstimate: 4500000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "medium",
    sourceName: "Militarnyi",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "Estimated from reported Russian procurement data and open-source analysis.",
  },
  {
    name: "Zircon",
    category: "missile",
    minCost: 5200000,
    maxCost: 5600000,
    primaryEstimate: 5400000,
    currency: "USD",
    costBasis: "procurement_cost",
    confidence: "medium",
    sourceName: "Militarnyi",
    sourceUrl:
      "https://militarnyi.com/en/articles/from-kalibr-to-kinzhal-how-much-do-russian-missiles-really-cost/",
    sourceDate: "2025-10",
    methodology:
      "Estimated range based on reported procurement values and open-source analysis.",
  },
];