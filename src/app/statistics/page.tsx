"use client";

import { useState } from "react";
import { yearlyStatistics } from "@/data/yearlyStatistics";

export default function StatisticsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const selectedYearData = yearlyStatistics.find(
    (item) => item.year === selectedYear
  );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "partial":
        return "Partial data";
      default:
        return "Data pending";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-400";
      case "partial":
        return "text-yellow-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <p className="text-sm uppercase tracking-[4px] text-red-400">
          Statistics
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Attack Statistics
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Overview of documented Russian aerial attacks against Ukraine.
        </p>

        {/* Timeline */}
        <section className="mt-12">
          <p className="text-sm uppercase tracking-[4px] text-red-400">
            Timeline
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Attacks by Year
          </h2>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="space-y-6">
              {yearlyStatistics.map((item) => {
                const isSelected = selectedYear === item.year;

                return (
                  <div key={item.year}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedYear(
                          isSelected ? null : item.year
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
                            ? item.totalAttacks.toLocaleString("en-US")
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
                              width: `${Math.min(
                                (item.totalAttacks / 56700) * 100,
                                100
                              )}%`,
                            }}
                          />
                        )}
                      </div>
                    </button>

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
                            {getStatusLabel(item.status)}
                          </span>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Missile Attacks
                            </p>

                            <p className="mt-3 text-3xl font-bold">
                              {item.missileAttacks !== null
                                ? item.missileAttacks.toLocaleString("en-US")
                                : "—"}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Drone Attacks
                            </p>

                            <p className="mt-3 text-3xl font-bold">
                              {item.droneAttacks !== null
                                ? item.droneAttacks.toLocaleString("en-US")
                                : "—"}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-xs uppercase tracking-[2px] text-gray-500">
                              Air Attacks
                            </p>

                            <p className="mt-3 text-3xl font-bold">
                              {item.airAttacks !== null
                                ? item.airAttacks.toLocaleString("en-US")
                                : "—"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
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
                {selectedYearData.totalAttacks !== null
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