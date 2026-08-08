"use client";

import { attacks } from "@/data/attacks";

export default function AttackHistory() {
  return (
    <div className="mt-20 w-full max-w-5xl">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[4px] text-gray-500">
          Attack History
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
          Russia's War Against Ukraine
        </h2>
      </div>

      <div className="space-y-4">
        {attacks.map((attack) => (
          <div
            key={attack.date}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:bg-white/[0.05]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[3px] text-red-400">
                  {new Date(attack.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  Full-scale invasion begins
                </h3>

                <p className="mt-2 text-gray-400">
                  {attack.location}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Weapons
                </p>

                {attack.weapons.map((weapon) => (
                  <p
                    key={weapon.name}
                    className="mt-1 font-semibold text-gray-200"
                  >
                    {weapon.name} -{" "}
                    {weapon.quantity !== null
                      ? weapon.quantity.toLocaleString("en-US")
                      : "Not reliably established"}
                  </p>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              {attack.description}
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs text-gray-500">
                Source:{" "}
                <a
                  href={attack.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 underline underline-offset-4 hover:text-white"
                >
                  {attack.sourceName}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}