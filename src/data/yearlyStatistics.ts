export type YearlyStatistic = {
  year: number;
  totalAttacks: number | null;
  missileAttacks: number | null;
  droneAttacks: number | null;
  airAttacks: number | null;
  status: "verified" | "partial" | "approximate" | "pending";
  methodology: string;
  sourceName: string;
  sourceUrl: string;
  note: string;
};

export const yearlyStatistics: YearlyStatistic[] = [
  {
    year: 2022,
    totalAttacks: null,
    missileAttacks: null,
    droneAttacks: null,
    airAttacks: null,
    status: "pending",
    methodology: "Historical data reconstruction is in progress.",
    sourceName: "Ukraine Air War Monitor",
    sourceUrl: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",
    note: "Complete comparable annual data is not currently available.",
  },
  {
    year: 2023,
    totalAttacks: 4484,
    missileAttacks: 1335,
    droneAttacks: 3149,
    airAttacks: null,
    status: "verified",
    methodology: "Ukrainian Air Force annual statistics.",
    sourceName: "Ukrainian Air Force",
    sourceUrl: "https://www.mil.gov.ua/",
    note: "1,335 missiles and 3,149 strike UAVs.",
  },
  {
    year: 2024,
    totalAttacks: 13300,
    missileAttacks: null,
    droneAttacks: 11000,
    airAttacks: null,
    status: "approximate",
    methodology: "Ukraine Air War Monitor.",
    sourceName: "Ukraine Air War Monitor",
    sourceUrl: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",
    note: "Approximately 13,300 documented air attacks.",
  },
  {
    year: 2025,
    totalAttacks: 56700,
    missileAttacks: null,
    droneAttacks: 54700,
    airAttacks: null,
    status: "approximate",
    methodology: "Ukraine Air War Monitor.",
    sourceName: "Ukraine Air War Monitor",
    sourceUrl: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",
    note: "Approximately 56,700 documented air attacks.",
  },
  {
    year: 2026,
    totalAttacks: 36890,
    missileAttacks: null,
    droneAttacks: null,
    airAttacks: null,
    status: "partial",
    methodology: "Ukraine Air War Monitor.",
    sourceName: "Ukraine Air War Monitor",
    sourceUrl: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine",
    note: "January–June 2026 only.",
  },
];