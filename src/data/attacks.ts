export type AttackWeapon = {
  name: string;
  quantity: number | null;
};
export type Attack = {
  date: string;
  location: string;
  description: string;
  weapons: AttackWeapon[];
  sourceName: string;
  sourceUrl: string;
  sourceDate: string;
  confidence: "high" | "medium" | "low";
};
export const attacks: Attack[] = [
  {
    date: "2022-02-24",
    location: "Ukraine",
    description:
      "Russia launched a full-scale invasion of Ukraine. Missile strikes were reported against military and other important defence-related targets across Ukraine.",
    weapons: [
      {
        name: "Missile strikes",
        quantity: null,
      },
    ],
    sourceName: "Office of the President of Ukraine",
    sourceUrl:
      "https://www.president.gov.ua/en/news/rosiya-rozpochala-novu-vijskovu-operaciyu-proti-nashoyi-derz-73105",
    sourceDate: "2022-02-24",
    confidence: "high",
  },
    {
    date: "2022-02-25",
    location: "Kyiv",
    description:
      "Russian forces continued missile and air strikes against Kyiv during the second day of the full-scale invasion.",
    weapons: [
      {
        name: "Missile strikes",
        quantity: null,
      },
    ],
    sourceName: "Office of the President of Ukraine",
    sourceUrl:
      "https://www.president.gov.ua/en/news/promova-prezidenta-ukrayini-volodimira-zelenskogo-pered-kong-73609",
    sourceDate: "2022-02-25",
    confidence: "high",
  },
  ];