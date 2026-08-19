export type WeaponFamily =
  | "drone"
  | "cruise-missile"
  | "ballistic-missile"
  | "aircraft"
  | "other";

export type WeaponModel = {
  id: string;

  name: string;

  family: WeaponFamily;

  aliases: string[];

  minCost: number | null;

  maxCost: number | null;

  primaryEstimate: number | null;

  currency: "USD";

  costBasis:
    | "production_cost"
    | "procurement_cost"
    | "unknown";

  confidence:
    | "high"
    | "medium"
    | "low"
    | "unknown";

  source: {
    name: string;

    url: string;

    publishedAt: string | null;
  };

  methodology: string;

  lastUpdated: string;
};

export type WeaponCategory = {
  id: WeaponFamily;

  name: string;

  description: string;

  models: WeaponModel[];
};