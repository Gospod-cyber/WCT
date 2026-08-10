export type YearlyStatistics = {
  year: number;

  // Total number of recorded aerial attack assets/events
  // depending on the source methodology.
  totalAttacks: number | null;

  // Category breakdown.
  // null means that reliable year-level data is not available yet.
  missileAttacks: number | null;
  droneAttacks: number | null;
  airAttacks: number | null;

  status: "verified" | "partial" | "pending";

  note: string;

  sourceName: string;
  sourceUrl: string;
};

export const yearlyStatistics: YearlyStatistics[] = [
  {
    year: 2022,

    totalAttacks: null,
    missileAttacks: null,
    droneAttacks: null,
    airAttacks: null,

    status: "pending",

    note:
      "Year-level data is being reconstructed from verified historical sources. The Ukraine Air War Monitor database begins in September 2022.",

    sourceName: "Ukraine Air War Monitor / Kyiv Dialogue",
    sourceUrl:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xviii",
  },

  {
    year: 2023,

    totalAttacks: null,
    missileAttacks: null,
    droneAttacks: null,
    airAttacks: null,

    status: "pending",

    note:
      "Year-level data is being reconstructed from verified historical sources.",

    sourceName: "Ukraine Air War Monitor / Kyiv Dialogue",
    sourceUrl:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xviii",
  },

  {
    year: 2024,

    totalAttacks: 13300,

    missileAttacks: null,
    droneAttacks: 11000,
    airAttacks: null,

    status: "verified",

    note:
      "Approximately 13,300 air attacks using drones, missiles and cruise missiles against civilian targets were recorded in 2024. Approximately 11,000 drone attacks were recorded.",

    sourceName: "Ukraine Air War Monitor Vol. XII",
    sourceUrl:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xi",
  },

  {
    year: 2025,

    totalAttacks: 56700,

    missileAttacks: null,
    droneAttacks: 54700,
    airAttacks: null,

    status: "verified",

    note:
      "Approximately 56,700 air attacks using drones, missiles and cruise missiles against civilian targets were recorded in 2025. Approximately 54,700 were drone attacks.",

    sourceName: "Ukraine Air War Monitor Vol. XII",
    sourceUrl:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xi",
  },

  {
    year: 2026,

    totalAttacks: 36463,

    missileAttacks: null,
    droneAttacks: null,
    airAttacks: null,

    status: "partial",

    note:
      "January–June 2026 only. The figure represents the recorded long-range drones, cruise missiles and ballistic missiles used against Ukraine during these six months. The full-year figure will be updated as new data becomes available.",

    sourceName: "Ukraine Air War Monitor",
    sourceUrl:
      "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xviii",
  },
];