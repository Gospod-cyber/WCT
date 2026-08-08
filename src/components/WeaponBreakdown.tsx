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
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
          Estimated Attack Cost
        </h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="grid grid-cols-12 border-b border-white/10 px-5 py-4 text-xs uppercase tracking-wider text-gray-500">
          <div className="col-span-5">
            Weapon
          </div>
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
          const hasCost =
            primaryEstimate !== null;
          const total = hasCost
            ? usage.quantity * primaryEstimate
            : null;
          return (
            <div
              key={usage.name}
              className="grid grid-cols-12 items-center border-b border-white/5 px-5 py-5 transition hover:bg-white/[0.03]"
            >
              <div className="col-span-5">
                <p className="font-semibold text-white">
                  {usage.name}
                </p>
                {weapon && (
                  <p className="mt-1 text-xs text-gray-500">
                    {weapon.confidence} confidence
                  </p>
                )}
              </div>
              <div className="col-span-2 text-right text-gray-300">
                {usage.quantity.toLocaleString("en-US")}
              </div>
              <div className="col-span-2 text-right text-gray-300">
                {hasCost
                  ? `$${primaryEstimate.toLocaleString("en-US")}`
                  : "—"}
              </div>
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
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-6 text-gray-500">
          Weapons without a sufficiently reliable cost estimate
          are excluded from the calculated total.
        </p>
      </div>
    </div>
  );
}