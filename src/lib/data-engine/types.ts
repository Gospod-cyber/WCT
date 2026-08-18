export type DataSourceType =
  | "official"
  | "analytical"
  | "secondary";

export type DataConfidence =
  | "verified"
  | "partial"
  | "approximate"
  | "pending";

export type WeaponCategory =
  | "drone"
  | "cruise-missile"
  | "ballistic-missile"
  | "aircraft"
  | "other";

export type AttackDataRecord = {
  id: string;

  date: string;

  total: number | null;

  drones: number | null;

  cruiseMissiles: number | null;

  ballisticMissiles: number | null;

  aircraft: number | null;

  other: number | null;

  confidence: DataConfidence;

  source: {
    name: string;
    url: string;
    type: DataSourceType;
    publishedAt: string | null;
  };

  methodology: string;

  note: string | null;

  collectedAt: string;
};

export type MonthlyAttackStatistics = {
  year: number;
  month: number;

  total: number | null;

  drones: number | null;

  cruiseMissiles: number | null;

  ballisticMissiles: number | null;

  aircraft: number | null;

  other: number | null;

  confidence: DataConfidence;
};

export type YearlyAttackStatistics = {
  year: number;

  total: number | null;

  drones: number | null;

  cruiseMissiles: number | null;

  ballisticMissiles: number | null;

  missiles: number | null;

  aircraft: number | null;

  other: number | null;

  confidence: DataConfidence;

  months: MonthlyAttackStatistics[];
};