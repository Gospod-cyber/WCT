"use client";

import { useEffect, useMemo, useState } from "react";
import { yearlyStatistics } from "@/data/yearlyStatistics";

type ApiRecord = {
  id: string;
  date: string;
  total: number | null;
  drones: number | null;
  cruiseMissiles: number | null;
  ballisticMissiles: number | null;
  aircraft: number | null;
  other: number | null;
  confidence: "verified" | "partial" | "approximate" | "pending";
  source: {
    name: string;
    url: string;
    type: string;
    publishedAt: string | null;
  };
  methodology: string;
  note: string | null;
  collectedAt: string;
  validation: {
    valid: boolean;
    calculatedTotal: number | null;
    difference: number | null;
    warnings: string[];
  };
};

type ApiResponse = {
  success: boolean;
  source?: string;
  records?: ApiRecord[];
  error?: string;
  details?: string;
  collectedAt?: string;
};

type StatisticsYear = {
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

  monthlyBreakdown?: {
    month: number;
    monthName: string;
    totalAttacks: number;
    drones: number | null;
    cruiseMissiles: number | null;
    ballisticMissiles: number | null;
  }[];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function StatisticsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [apiRecords, setApiRecords] = useState<ApiRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  /*
   * LOAD LIVE DATA
   */
  useEffect(() => {
    let cancelled = false;

    async function loadStatistics() {
      try {
        setIsLoading(true);
        setApiError(null);

        const response = await fetch("/api/statistics", {
          method: "GET",
          cache: "no-store",
        });

        const data: ApiResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.details ||
              data.error ||
              `Statistics API returned ${response.status}`
          );
        }

        if (!Array.isArray(data.records)) {
          throw new Error("Statistics API returned invalid records.");
        }

        if (!cancelled) {
          setApiRecords(data.records);
        }
      } catch (error) {
        console.error("Failed to load statistics:", error);

        if (!cancelled) {
          setApiError(
            error instanceof Error
              ? error.message
              : "Live statistics are temporarily unavailable."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * LIVE 2026 DATA
   */
  const live2026Data = useMemo<StatisticsYear | null>(() => {
    if (apiRecords.length === 0) {
      return null;
    }

    const records2026 = apiRecords
      .filter((record) => record.date.startsWith("2026-"))
      .sort((a, b) => a.date.localeCompare(b.date));

    if (records2026.length === 0) {
      return null;
    }

    /*
     * TOTAL
     *
     * We only calculate the annual total from records
     * that actually contain a total.
     */
    const recordsWithTotal = records2026.filter(
      (record) => record.total !== null
    );

    const totalAttacks =
      recordsWithTotal.length > 0
        ? recordsWithTotal.reduce(
            (sum, record) => sum + (record.total ?? 0),
            0
          )
        : null;

    /*
     * DRONES
     */
    const recordsWithDrones = records2026.filter(
      (record) => record.drones !== null
    );

    const droneAttacks =
      recordsWithDrones.length > 0
        ? recordsWithDrones.reduce(
            (sum, record) => sum + (record.drones ?? 0),
            0
          )
        : null;

    /*
     * CRUISE MISSILES
     */
    const recordsWithCruiseMissiles = records2026.filter(
      (record) => record.cruiseMissiles !== null
    );

    const cruiseMissiles =
      recordsWithCruiseMissiles.length > 0
        ? recordsWithCruiseMissiles.reduce(
            (sum, record) => sum + (record.cruiseMissiles ?? 0),
            0
          )
        : null;

    /*
     * BALLISTIC MISSILES
     */
    const recordsWithBallisticMissiles = records2026.filter(
      (record) => record.ballisticMissiles !== null
    );

    const ballisticMissiles =
      recordsWithBallisticMissiles.length > 0
        ? recordsWithBallisticMissiles.reduce(
            (sum, record) =>
              sum + (record.ballisticMissiles ?? 0),
            0
          )
        : null;

    /*
     * MISSILE TOTAL
     *
     * If neither missile category exists,
     * we keep the value as null.
     */
    const missileAttacks =
      cruiseMissiles !== null ||
      ballisticMissiles !== null
        ? (cruiseMissiles ?? 0) +
          (ballisticMissiles ?? 0)
        : null;

    /*
     * STATUS
     */
    let status: StatisticsYear["status"] = "verified";

    if (
      records2026.some(
        (record) => record.confidence === "partial"
      )
    ) {
      status = "partial";
    } else if (
      records2026.some(
        (record) => record.confidence === "approximate"
      )
    ) {
      status = "approximate";
    }

    /*
     * SOURCE
     */
    const firstRecord = records2026[0];

    /*
     * MONTHLY BREAKDOWN
     */
    const monthlyBreakdown = records2026.map((record) => {
      const monthNumber = Number(
        record.date.split("-")[1]
      );

      return {
        month: monthNumber,

        monthName:
          monthNames[monthNumber - 1] ??
          record.date,

        totalAttacks: record.total ?? 0,

        drones: record.drones,

        cruiseMissiles:
          record.cruiseMissiles,

        ballisticMissiles:
          record.ballisticMissiles,
      };
    });

    return {
      year: 2026,

      totalAttacks,

      missileAttacks,

      droneAttacks,

      airAttacks: null,

      status,

      methodology: firstRecord.methodology,

      sourceName: firstRecord.source.name,

      sourceUrl: firstRecord.source.url,

      note:
        "Live data automatically collected by the War Cost Tracker Data Engine.",

      monthlyBreakdown,
    };
  }, [apiRecords]);

  /*
   * COMBINE HISTORICAL + LIVE DATA
   */
  const statistics = useMemo<StatisticsYear[]>(() => {
    const historicalData: StatisticsYear[] =
      yearlyStatistics.map((item) => ({
        year: item.year,
        totalAttacks: item.totalAttacks,
        missileAttacks: item.missileAttacks,
        droneAttacks: item.droneAttacks,
        airAttacks: item.airAttacks,
        status: item.status,
        methodology: item.methodology,
        sourceName: item.sourceName,
        sourceUrl: item.sourceUrl,
        note: item.note,
        monthlyBreakdown:
          item.monthlyBreakdown,
      }));

    if (!live2026Data) {
      return historicalData;
    }

    return historicalData.map((item) =>
      item.year === 2026
        ? live2026Data
        : item
    );
  }, [live2026Data]);

  /*
   * SELECTED YEAR
   */
  const selectedYearData = statistics.find(
    (item) => item.year === selectedYear
  );

  /*
   * STATUS LABEL
   */
  const getStatusLabel = (
    status: StatisticsYear["status"]
  ) => {
    switch (status) {
      case "verified":
        return "Verified";

      case "partial":
        return "Partial data";

      case "approximate":
        return "Approximate";

      default:
        return "Data pending";
    }
  };

  /*
   * STATUS COLOR
   */
  const getStatusClass = (
    status: StatisticsYear["status"]
  ) => {
    switch (status) {
      case "verified":
        return "text-green-400";

      case "partial":
        return "text-yellow-400";

      case "approximate":
        return "text-orange-400";

      default:
        return "text-gray-500";
    }
  };

  /*
   * YEAR BAR MAX
   */
  const maxYearlyAttacks = Math.max(
    ...statistics.map(
      (item) => item.totalAttacks ?? 0
    ),
    1
  );

  /*
   * MONTH DATA
   */
  const monthlyData =
    selectedYearData?.monthlyBreakdown ?? [];

  const maxMonthlyAttacks = Math.max(
    ...monthlyData.map(
      (month) => month.totalAttacks
    ),
    1
  );

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <p className="text-sm uppercase tracking-[4px] text-red-400">
          Statistics
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Attack Statistics
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Overview of documented Russian aerial attacks
          against Ukraine.
        </p>

        {/* LIVE STATUS */}

        <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[2px]">

          <span
            className={
              isLoading
                ? "h-2 w-2 rounded-full bg-yellow-400"
                : apiError
                  ? "h-2 w-2 rounded-full bg-red-400"
                  : "h-2 w-2 rounded-full bg-green-400"
            }
          />

          <span className="text-gray-500">
            {isLoading
              ? "Loading live data..."
              : apiError
                ? "Live data unavailable"
                : "Live data connected"}
          </span>

        </div>

        {/* ERROR */}

        {apiError && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
            {apiError}
          </div>
        )}

        {/* TIMELINE */}

        <section className="mt-12">

          <p className="text-sm uppercase tracking-[4px] text-red-400">
            Timeline
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Attacks by Year
          </h2>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">

            <div className="space-y-6">

              {statistics.map((item) => {
                const isSelected =
                  selectedYear === item.year;

                const width =
                  item.totalAttacks !== null
                    ? (item.totalAttacks /
                        maxYearlyAttacks) *
                      100
                    : 0;

                return (
                  <div key={item.year}>

                    {/* YEAR BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedYear(
                          isSelected
                            ? null
                            : item.year
                        )
                      }
                      className="block w-full text-left"
                    >

                      <div className="mb-2 flex items-center justify-between">

                        <span
                          className={
                            isSelected
                              ? "text-sm font-semibold text-red-400"
                              : "text-sm font-semibold text-gray-300"
                          }
                        >
                          {item.year}
                        </span>

                        <span className="text-sm text-gray-500">

                          {item.totalAttacks !== null
                            ? item.totalAttacks.toLocaleString(
                                "en-US"
                              )
                            : "Pending"}

                        </span>

                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-white/5">

                        {item.totalAttacks !== null && (
                          <div
                            className={
                              isSelected
                                ? "h-full rounded-full bg-red-400 transition-all duration-500"
                                : "h-full rounded-full bg-red-400/60 transition-all duration-500"
                            }
                            style={{
                              width: `${width}%`,
                            }}
                          />
                        )}

                      </div>

                    </button>

                    {/* BREAKDOWN */}

                    {isSelected && (
                      <div className="mt-6 ml-4 border-l border-white/10 pl-5">

                        <div className="flex items-center justify-between">

                          <p className="text-xs uppercase tracking-[3px] text-gray-500">
                            {item.year} — Breakdown
                          </p>

                          <span
                            className={`text-xs uppercase tracking-[2px] ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {getStatusLabel(
                              item.status
                            )}
                          </span>

                        </div>

                        {/* SUMMARY CARDS */}

                        <div className="mt-6 grid gap-4 md:grid-cols-3">

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Missile Attacks
                            </p>

                            <p className="mt-3 text-3xl font-bold">

                              {item.missileAttacks !==
                              null
                                ? item.missileAttacks.toLocaleString(
                                    "en-US"
                                  )
                                : "—"}

                            </p>

                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Drone Attacks
                            </p>

                            <p className="mt-3 text-3xl font-bold">

                              {item.droneAttacks !==
                              null
                                ? item.droneAttacks.toLocaleString(
                                    "en-US"
                                  )
                                : "—"}

                            </p>

                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Aircraft
                            </p>

                            <p className="mt-3 text-3xl font-bold">

                              {item.airAttacks !==
                              null
                                ? item.airAttacks.toLocaleString(
                                    "en-US"
                                  )
                                : "—"}

                            </p>

                          </div>

                        </div>

                        {/* MONTHLY */}

                        {monthlyData.length > 0 && (
                          <div className="mt-8">

                            <p className="text-xs uppercase tracking-[3px] text-gray-500">
                              Monthly Breakdown
                            </p>

                            <div className="mt-6 space-y-6">

                              {monthlyData.map(
                                (month) => {
                                  const monthWidth =
                                    (month.totalAttacks /
                                      maxMonthlyAttacks) *
                                    100;

                                  return (
                                    <div
                                      key={`${item.year}-${month.month}`}
                                    >

                                      <div className="mb-2 flex items-center justify-between">

                                        <span className="text-sm font-medium text-gray-300">
                                          {
                                            month.monthName
                                          }
                                        </span>

                                        <span className="text-sm text-gray-500">
                                          {month.totalAttacks.toLocaleString(
                                            "en-US"
                                          )}
                                        </span>

                                      </div>

                                      <div className="h-2 overflow-hidden rounded-full bg-white/5">

                                        <div
                                          className="h-full rounded-full bg-slate-400/70 transition-all duration-500"
                                          style={{
                                            width: `${monthWidth}%`,
                                          }}
                                        />

                                      </div>

                                      <div className="mt-3 grid gap-3 md:grid-cols-3">

                                        <div className="rounded-xl border border-white/5 bg-black/30 p-3">

                                          <p className="text-[10px] uppercase tracking-[2px] text-gray-600">
                                            Drones
                                          </p>

                                          <p className="mt-1 text-sm font-semibold text-gray-300">

                                            {month.drones !==
                                            null
                                              ? month.drones.toLocaleString(
                                                  "en-US"
                                                )
                                              : "—"}

                                          </p>

                                        </div>

                                        <div className="rounded-xl border border-white/5 bg-black/30 p-3">

                                          <p className="text-[10px] uppercase tracking-[2px] text-gray-600">
                                            Cruise Missiles
                                          </p>

                                          <p className="mt-1 text-sm font-semibold text-gray-300">

                                            {month.cruiseMissiles !==
                                            null
                                              ? month.cruiseMissiles.toLocaleString(
                                                  "en-US"
                                                )
                                              : "—"}

                                          </p>

                                        </div>

                                        <div className="rounded-xl border border-white/5 bg-black/30 p-3">

                                          <p className="text-[10px] uppercase tracking-[2px] text-gray-600">
                                            Ballistic Missiles
                                          </p>

                                          <p className="mt-1 text-sm font-semibold text-gray-300">

                                            {month.ballisticMissiles !==
                                            null
                                              ? month.ballisticMissiles.toLocaleString(
                                                  "en-US"
                                                )
                                              : "—"}

                                          </p>

                                        </div>

                                      </div>

                                    </div>
                                  );
                                }
                              )}

                            </div>

                          </div>
                        )}

                        {/* SOURCE */}

                        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">

                          <p className="text-xs uppercase tracking-[2px] text-gray-500">
                            Source
                          </p>

                          <p className="mt-2 text-sm text-gray-300">
                            {item.sourceName}
                          </p>

                          <p className="mt-3 text-sm leading-6 text-gray-500">
                            {item.note}
                          </p>

                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm text-red-400 transition hover:text-red-300"
                          >
                            Open source →
                          </a>

                        </div>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        {/* SELECTED YEAR */}

        {selectedYearData && (
          <section className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/5 p-6 md:p-8">

            <p className="text-sm uppercase tracking-[3px] text-red-400">
              Selected Year
            </p>

            <div className="mt-3 flex items-end justify-between">

              <h2 className="text-3xl font-bold">
                {selectedYearData.year}
              </h2>

              <p className="text-gray-400">

                {selectedYearData.totalAttacks !==
                null
                  ? `${selectedYearData.totalAttacks.toLocaleString(
                      "en-US"
                    )} recorded attacks`
                  : "Data is being verified"}

              </p>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}