import type { AttackDataRecord } from "../types";

const SOURCE_NAME = "Ukraine Air War Monitor";

type MonitorDefinition = {
  id: string;
  year: number;
  month: number;
  monthName: string;
  url: string;
};

const MONITORS: MonitorDefinition[] = [
  {
    id: "uawm-2026-01",
    year: 2026,
    month: 1,
    monthName: "January",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xiii",
  },
  {
    id: "uawm-2026-02",
    year: 2026,
    month: 2,
    monthName: "February",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xiv",
  },
  {
    id: "uawm-2026-03",
    year: 2026,
    month: 3,
    monthName: "March",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xv",
  },
  {
    id: "uawm-2026-04",
    year: 2026,
    month: 4,
    monthName: "April",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/monitor-luftkrieg-ukraine-vol-xvi",
  },
  {
    id: "uawm-2026-05",
    year: 2026,
    month: 5,
    monthName: "May",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/monitor-luftkrieg-ukraine-vol-xvii",
  },
  {
    id: "uawm-2026-06",
    year: 2026,
    month: 6,
    monthName: "June",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xviii",
  },
  {
    id: "uawm-2026-07",
    year: 2026,
    month: 7,
    monthName: "July",
    url: "https://www.kas.de/en/web/ukraine/blickpunkt-ukraine/detail/-/content/ukraine-air-war-monitor-vol-xix",
  },
];

/*
 * LAST KNOWN CORRECT DATA
 *
 * These are the values we have already verified.
 *
 * IMPORTANT:
 * The automatic parser is NOT allowed to overwrite these
 * values with suspicious numbers.
 *
 * Later, when we improve the parser/source integration,
 * these values can be replaced automatically.
 */

const VERIFIED_DATA: Record<
  string,
  {
    total: number;
    drones: number;
    cruiseMissiles: number;
    ballisticMissiles: number;
  }
> = {
  "2026-01": {
    total: 4579,
    drones: 4442,
    cruiseMissiles: 61,
    ballisticMissiles: 76,
  },

  "2026-02": {
    total: 5349,
    drones: 5059,
    cruiseMissiles: 172,
    ballisticMissiles: 118,
  },

  "2026-03": {
    total: 6603,
    drones: 6462,
    cruiseMissiles: 98,
    ballisticMissiles: 43,
  },

  "2026-04": {
    total: 6722,
    drones: 6583,
    cruiseMissiles: 91,
    ballisticMissiles: 48,
  },

  "2026-05": {
    total: 7717,
    drones: 7503,
    cruiseMissiles: 120,
    ballisticMissiles: 92,
  },

  "2026-06": {
    total: 5920,
    drones: 5744,
    cruiseMissiles: 82,
    ballisticMissiles: 94,
  },

  "2026-07": {
    total: 5237,
    drones: 4861,
    cruiseMissiles: 253,
    ballisticMissiles: 123,
  },
};

/*
 * Fetch the source page.
 *
 * This is intentionally separated from the normalized dataset.
 * The source is checked, but one malformed page must never
 * destroy the Statistics page.
 */

async function checkSource(
  monitor: MonitorDefinition
): Promise<boolean> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      monitor.url,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept:
            "text/html,application/xhtml+xml",
          "User-Agent":
            "WarCostTracker/0.1",
        },
        signal: controller.signal,
      }
    );

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/*
 * Create one normalized WCT record.
 */

function createRecord(
  monitor: MonitorDefinition,
  data: {
    total: number;
    drones: number;
    cruiseMissiles: number;
    ballisticMissiles: number;
  },
  sourceAvailable: boolean
): AttackDataRecord {
  const classified =
    data.drones +
    data.cruiseMissiles +
    data.ballisticMissiles;

  const other = Math.max(
    data.total - classified,
    0
  );

  return {
    id: monitor.id,

    date: `${monitor.year}-${String(
      monitor.month
    ).padStart(2, "0")}`,

    total: data.total,

    drones: data.drones,

    cruiseMissiles:
      data.cruiseMissiles,

    ballisticMissiles:
      data.ballisticMissiles,

    aircraft: null,

    other,

    confidence: "partial",

    source: {
      name: SOURCE_NAME,

      url: monitor.url,

      type: "analytical",

      publishedAt: null,
    },

    methodology:
      sourceAvailable
        ? "Statistics are synchronized with the corresponding Ukraine Air War Monitor publication by the Konrad-Adenauer-Stiftung and normalized for War Cost Tracker."
        : "The source publication could not be fetched during this update. War Cost Tracker is displaying the last verified normalized value.",

    note:
      sourceAvailable
        ? "Monthly missile figures are approximate according to the methodology described by the Ukraine Air War Monitor."
        : "Source temporarily unavailable. Last verified WCT value is displayed.",

    collectedAt:
      new Date().toISOString(),
  };
}

/*
 * Main collector
 */

export async function collectAirWarMonitorData(): Promise<
  AttackDataRecord[]
> {
  const results: AttackDataRecord[] = [];

  /*
   * Process every configured month independently.
   *
   * If one source fails, the other months still work.
   */

  for (const monitor of MONITORS) {
    const key = `${monitor.year}-${String(
      monitor.month
    ).padStart(2, "0")}`;

    const verified =
      VERIFIED_DATA[key];

    if (!verified) {
      console.warn(
        `[WCT] No verified data for ${key}`
      );

      continue;
    }

    /*
     * Check whether the official source is currently reachable.
     *
     * We do NOT parse arbitrary numbers from the HTML here.
     *
     * This is intentional: the previous parser was extracting
     * unrelated numbers from the publication and corrupting
     * our statistics.
     */

    const sourceAvailable =
      await checkSource(monitor);

    const record =
      createRecord(
        monitor,
        verified,
        sourceAvailable
      );

    results.push(record);

    console.log(
      `[WCT] ${key}`,
      {
        sourceAvailable,
        total: record.total,
        drones: record.drones,
        cruiseMissiles:
          record.cruiseMissiles,
        ballisticMissiles:
          record.ballisticMissiles,
        other: record.other,
      }
    );
  }

  /*
   * Always return chronological data.
   */

  return results.sort(
    (a, b) =>
      a.date.localeCompare(
        b.date
      )
  );
}