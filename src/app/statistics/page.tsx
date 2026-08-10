"use client";

import { useMemo, useState } from "react";
import { attacks } from "@/data/attacks";
import {
  calculateYearlyStatistics,
  calculateMonthlyStatistics,
} from "@/data/calculateStatistics";

export default function StatisticsPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const yearlyStatistics = useMemo(
    () => calculateYearlyStatistics(),
    []
  );

  const monthlyStatistics = useMemo(
    () => calculateMonthlyStatistics(),
    []
  );

  const totalAttacks = attacks.length;

  const selectedYearData = yearlyStatistics.find(
    (item) => item.year === selectedYear
  );

  const selectedYearMonths = monthlyStatistics.filter(
    (item) => item.year === selectedYear
  );

  const maxYearlyAttacks = Math.max(
    ...yearlyStatistics.map((item) => item.attacks),
    1
  );

  const maxMonthlyAttacks = Math.max(
    ...selectedYearMonths.map((item) => item.attacks),
    1
  );

  const getMonthName = (monthNumber: number) => {
    return new Date(2022, monthNumber - 1, 1).toLocaleDateString(
      "en-US",
      {
        month: "long",
      }
    );
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[4px] text-red-400">
          Statistics
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Attack Statistics
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Overview of documented Russian missile and drone attacks against
          Ukraine.
        </p>

        {/* Overview */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Total Recorded Attacks
            </p>

            <p className="mt-3 text-4xl font-bold">
              {totalAttacks.toLocaleString("en-US")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Years Covered
            </p>

            <p className="mt-3 text-4xl font-bold">
              {yearlyStatistics.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Selected Year
            </p>

            <p className="mt-3 text-4xl font-bold">
              {selectedYear ?? "All"}
            </p>
          </div>
        </div>

        {/* Years */}
        <section className="mt-12">
          <p className="text-sm uppercase tracking-[4px] text-red-400">
            Timeline
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Attacks by Year
          </h2>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            {yearlyStatistics.length === 0 ? (
              <p className="text-center text-gray-500">
                No attack data available.
              </p>
            ) : (
              <div className="space-y-6">
                {yearlyStatistics.map((item) => {
                  const width =
                    (item.attacks / maxYearlyAttacks) * 100;

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
                            {item.attacks.toLocaleString("en-US")}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-white/5">
                          <div
                            className={
                              isSelected
                                ? "h-full rounded-full bg-red-400 transition-all duration-500"
                                : "h-full rounded-full bg-red-400/60 transition-all duration-500"
                            }
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </button>

                      {/* Months */}
                      {isSelected && (
                        <div className="mt-6 ml-4 border-l border-white/10 pl-5">
                          <p className="mb-4 text-xs uppercase tracking-[3px] text-gray-500">
                            {item.year} — Monthly Breakdown
                          </p>

                          {selectedYearMonths.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              No monthly data available.
                            </p>
                          ) : (
                            <div className="space-y-4">
                              {selectedYearMonths.map((month) => {
                                const monthWidth =
                                  (month.attacks /
                                    maxMonthlyAttacks) *
                                  100;

                                return (
                                  <div key={`${month.year}-${month.month}`}>
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="text-sm text-gray-300">
                                        {getMonthName(
                                          month.monthNumber
                                        )}
                                      </span>

                                      <span className="text-sm text-gray-500">
                                        {month.attacks.toLocaleString(
                                          "en-US"
                                        )}
                                      </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                                      <div
                                        className="h-full rounded-full bg-slate-400/60 transition-all duration-500"
                                        style={{
                                          width: `${monthWidth}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Selected Year Summary */}
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
                {selectedYearData.attacks.toLocaleString("en-US")} recorded
                attacks
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}