import type {
  WeaponCategory,
  WeaponModel,
} from "./weapon-types";

const emptySource = {
  name: "Not yet collected",
  url: "",
  publishedAt: null,
};

const emptyModel = (
  id: string,
  name: string,
  family: WeaponModel["family"],
  aliases: string[] = []
): WeaponModel => ({
  id,
  name,
  family,
  aliases,

  minCost: null,
  maxCost: null,
  primaryEstimate: null,

  currency: "USD",

  costBasis: "unknown",

  confidence: "unknown",

  source: emptySource,

  methodology:
    "Cost data will be collected automatically from verified sources by the War Cost Tracker Data Engine.",

  lastUpdated: new Date(0).toISOString(),
});

export const weaponRegistry: WeaponCategory[] = [
  {
    id: "drone",

    name: "Drones",

    description:
      "Russian one-way attack drones and related loitering munitions.",

    models: [
      emptyModel(
        "shahed-136",
        "Shahed-136",
        "drone",
        [
          "Geran-2",
          "Geran 2",
          "Shahed-136",
          "Shahed 136",
        ]
      ),

      emptyModel(
        "shahed-131",
        "Shahed-131",
        "drone",
        [
          "Geran-1",
          "Geran 1",
          "Shahed-131",
          "Shahed 131",
        ]
      ),
    ],
  },

  {
    id: "cruise-missile",

    name: "Cruise Missiles",

    description:
      "Russian and foreign-supplied cruise missiles used in aerial attacks against Ukraine.",

    models: [
      emptyModel(
        "kh-101",
        "Kh-101",
        "cruise-missile",
        [
          "Kh-101",
          "X-101",
        ]
      ),

      emptyModel(
        "kalibr",
        "Kalibr",
        "cruise-missile",
        [
          "3M-14",
          "3M14",
          "Kalibr",
        ]
      ),

      emptyModel(
        "iskander-k",
        "Iskander-K",
        "cruise-missile",
        [
          "9M728",
          "R-500",
          "Iskander K",
        ]
      ),

      emptyModel(
        "zircon",
        "Zircon",
        "cruise-missile",
        [
          "3M22",
          "Tsirkon",
          "Zircon",
        ]
      ),
    ],
  },

  {
    id: "ballistic-missile",

    name: "Ballistic Missiles",

    description:
      "Ballistic and quasi-ballistic missiles used in attacks against Ukraine.",

    models: [
      emptyModel(
        "iskander-m",
        "Iskander-M",
        "ballistic-missile",
        [
          "9M723",
          "Iskander M",
        ]
      ),

      emptyModel(
        "kn-23",
        "KN-23",
        "ballistic-missile",
        [
          "Hwasong-11",
          "Hwasong-11Ga",
          "KN23",
        ]
      ),

      emptyModel(
        "kinzhal",
        "Kinzhal",
        "ballistic-missile",
        [
          "Kh-47M2",
          "Kinzhal",
        ]
      ),
    ],
  },

  {
    id: "aircraft",

    name: "Aircraft",

    description:
      "Aircraft involved in Russian aerial attack operations.",

    models: [],
  },

  {
    id: "other",

    name: "Other",

    description:
      "Weapons or attack systems that cannot yet be confidently classified.",

    models: [],
  },
];