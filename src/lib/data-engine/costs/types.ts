import type {
  WeaponFamily,
} from "../weapons/weapon-types";

export type CostSourceType =
  | "official"
  | "intelligence"
  | "procurement"
  | "analytical"
  | "secondary";

export type WeaponCostRecord = {
  weaponId: string;

  weaponName: string;

  family: WeaponFamily;

  minCost: number | null;

  maxCost: number | null;

  primaryEstimate: number | null;

  currency: "USD";

  costBasis:
    | "production_cost"
    | "procurement_cost"
    | "estimated_cost"
    | "unknown";

  confidence:
    | "high"
    | "medium"
    | "low"
    | "unknown";

  source: {
    name: string;

    url: string;

    type: CostSourceType;

    publishedAt: string | null;
  };

  methodology: string;

  collectedAt: string;
};

export type CostCollectionResult = {
  success: boolean;

  records: WeaponCostRecord[];

  warnings: string[];

  collectedAt: string;
};