"use client";

import { weaponCosts } from "@/data/weaponCosts";
import { weaponUsage } from "@/data/weaponUsage";

export default function WeaponBreakdown() {
  return (
    <div className="mt-16 w-full max-w-5xl">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[4px] text-gray-500">
          Weapon Breakdown
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          Estimated Attack Cost
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-wider text-gray-500">
            <div className="col-span-5">Weapon</div>

            <div className="col-span-2 text-right">
              Quantity
            </div>

            <div className="col-span-2 text-right">
              Unit Cost
            </div>

            <div className="col-span-3 text-right">
              Total
            </div>
          </div>

          {weaponUsage.map((usage) => {
            const weapon = weaponCosts.find(
              (item) => item.name === usage.name
            );

            const primaryEstimate =
              weapon?.primaryEstimate ?? null;

            const hasCost = primaryEstimate !== null;

            const total = hasCost
              ? usage.quantity * primaryEstimate
              : null;

            return (
              <div
                key={usage.name}
                className="border-b border-white/5 px-5 py-5 transition hover:bg-white/[0.03]"
              >
                <div className="grid grid-cols-12 items-center">
                  {/* WEAPON */}
                  <div className="col-span-5">
                    <p className="font-semibold text-white">
                      {usage.name}
                    </p>

                    {weapon && (
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>
                          {weapon.confidence} confidence
                        </span>

                        <span>•</span>

                        <span>
                          {weapon.sourceName}
                        </span>

                        <span>•</span>

                        <span>
                          {weapon.sourceDate}
                        </span>
                      </div>
                    )}

                    {weapon?.sourceUrl && (
                      <a
                        href={weapon.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs text-red-400 transition hover:text-red-300 hover:underline"
                      >
                        View source ↗
                      </a>
                    )}
                  </div>

                  {/* QUANTITY */}
                  <div className="col-span-2 text-right text-gray-300">
                    {usage.quantity.toLocaleString("en-US")}
                  </div>

                  {/* UNIT COST */}
                  <div className="col-span-2 text-right text-gray-300">
                    {hasCost
                      ? `$${primaryEstimate.toLocaleString("en-US")}`
                      : "—"}
                  </div>

                  {/* TOTAL */}
                  <div className="col-span-3 text-right font-semibold">
                    {total !== null ? (
                      <span className="text-red-400">
                        ${total.toLocaleString("en-US")}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Not included
                      </span>
                    )}
                  </div>
                </div>

                {/* METHODOLOGY */}
                {weapon?.methodology && (
                  <div className="mt-3 border-t border-white/5 pt-3 text-xs leading-5 text-gray-600">
                    <span className="text-gray-500">
                      Methodology:
                    </span>{" "}
                    {weapon.methodology}
                  </div>
                )}

                {/* NO COST WARNING */}
                {!hasCost && (
                  <div className="mt-3 text-xs text-yellow-500/70">
                    No sufficiently reliable public cost estimate is
                    currently available. This weapon is excluded from
                    the calculated total.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE CARDS */}
        <div className="block md:hidden">
          {weaponUsage.map((usage) => {
            const weapon = weaponCosts.find(
              (item) => item.name === usage.name
            );

            const primaryEstimate =
              weapon?.primaryEstimate ?? null;

            const hasCost = primaryEstimate !== null;

            const total = hasCost
              ? usage.quantity * primaryEstimate
              : null;

            return (
              <div
                key={usage.name}
                className="border-b border-white/5 p-5 last:border-b-0"
              >
                {/* NAME */}
                <div>
                  <p className="text-lg font-bold text-white">
                    {usage.name}
                  </p>

                  {weapon && (
                    <p className="mt-1 text-xs text-gray-500">
                      {weapon.confidence} confidence
                    </p>
                  )}
                </div>

                {/* DATA */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] uppercase tracking-[2px] text-gray-600">
                      Quantity
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-300">
                      {usage.quantity.toLocaleString("en-US")}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                    <p className="text-[10px] uppercase tracking-[2px] text-gray-600">
                      Unit Cost
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-300">
                      {hasCost
                        ? `$${primaryEstimate.toLocaleString("en-US")}`
                        : "—"}
                    </p>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="mt-3 rounded-xl border border-red-400/10 bg-red-400/5 p-4">
                  <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                    Estimated Total
                  </p>

                  <p className="mt-1 text-2xl font-bold text-red-400">
                    {total !== null
                      ? `$${total.toLocaleString("en-US")}`
                      : "Not included"}
                  </p>
                </div>

                {/* SOURCE */}
                {weapon?.sourceUrl && (
                  <a
                    href={weapon.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs text-red-400 transition hover:text-red-300 hover:underline"
                  >
                    View source ↗
                  </a>
                )}

                {/* METHODOLOGY */}
                {weapon?.methodology && (
                  <div className="mt-4 border-t border-white/5 pt-3 text-xs leading-5 text-gray-600">
                    <span className="text-gray-500">
                      Methodology:
                    </span>{" "}
                    {weapon.methodology}
                  </div>
                )}

                {/* NO COST WARNING */}
                {!hasCost && (
                  <div className="mt-3 text-xs leading-5 text-yellow-500/70">
                    No sufficiently reliable public cost estimate is
                    currently available. This weapon is excluded from
                    the calculated total.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTNOTE */}
      <div className="mt-4 text-center">
        <p className="text-xs leading-6 text-gray-500">
          Cost estimates are based on publicly available sources.
          Weapons without a sufficiently reliable cost estimate are
          excluded from the calculated total.
        </p>
      </div>
    </div>
  );
}