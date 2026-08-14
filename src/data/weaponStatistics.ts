export type WeaponStatistic = {
  category: "missile" | "drone" | "aircraft";
  name: string;
  quantity: number | null;
  sourceName: string;
  sourceUrl: string;
  sourceDate: string;
  confidence: "high" | "medium" | "low";
};

export const weaponStatistics: WeaponStatistic[] = [
  {
    category: "missile",
    name: "Missiles",
    quantity: null,
    sourceName: "Data pending",
    sourceUrl: "",
    sourceDate: "",
    confidence: "low",
  },

  {
    category: "drone",
    name: "Strike drones",
    quantity: null,
    sourceName: "Data pending",
    sourceUrl: "",
    sourceDate: "",
    confidence: "low",
  },

  {
    category: "aircraft",
    name: "Aircraft",
    quantity: null,
    sourceName: "Data pending",
    sourceUrl: "",
    sourceDate: "",
    confidence: "low",
  },
];