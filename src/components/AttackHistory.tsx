"use client";

import { useMemo, useState } from "react";
import { attacks } from "@/data/attacks";

export default function AttackHistory() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [location, setLocation] = useState("all");
  const [weapon, setWeapon] = useState("all");

  const years = useMemo(() => {
    return Array.from(
      new Set(attacks.map((attack) => attack.date.slice(0, 4)))
    ).sort((a, b) => Number(b) - Number(a));
  }, []);

  const locations = useMemo(() => {
    return Array.from(
      new Set(attacks.map((attack) => attack.location))
    ).sort();
  }, []);

  const weapons = useMemo(() => {
    return Array.from(
      new Set(
        attacks.flatMap((attack) =>
          attack.weapons.map((weapon) => weapon.name)
        )
      )
    ).sort();
  }, []);

  const filteredAttacks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return attacks.filter((attack) => {
      const matchesSearch =
        query === "" ||
        attack.location.toLowerCase().includes(query) ||
        attack.description.toLowerCase().includes(query) ||
        attack.sourceName.toLowerCase().includes(query) ||
        attack.weapons.some((weapon) =>
          weapon.name.toLowerCase().includes(query)
        );

      const matchesYear =
        year === "all" || attack.date.startsWith(year);

      const matchesLocation =
        location === "all" || attack.location === location;

      const matchesWeapon =
        weapon === "all" ||
        attack.weapons.some(
          (attackWeapon) => attackWeapon.name === weapon
        );

      return (
        matchesSearch &&
        matchesYear &&
        matchesLocation &&
        matchesWeapon
      );
    });
  }, [search, year, location, weapon]);

  const resetFilters = () => {
    setSearch("");
    setYear("all");
    setLocation("all");
    setWeapon("all");
  };

  return (
    <div className="mt-10">
      {/* Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search attacks..."
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-red-400/50"
          />

          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          >
            <option value="all">All years</option>

            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          >
            <option value="all">All locations</option>

            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={weapon}
            onChange={(event) => setWeapon(event.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          >
            <option value="all">All weapons</option>

            {weapons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredAttacks.length} of {attacks.length} attacks
          </p>

          <button
            onClick={resetFilters}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Attack list */}
      <div className="mt-8 space-y-5">
        {filteredAttacks.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-gray-400">
              No attacks match your search criteria.
            </p>
          </div>
        ) : (
          filteredAttacks.map((attack, index) => (
            <article
              key={`${attack.date}-${attack.location}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-red-400">
                    {new Date(attack.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {attack.location}
                  </h2>

                  <p className="mt-3 leading-relaxed text-gray-300">
                    {attack.description}
                  </p>
                </div>

                <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wider text-gray-400">
                  Confidence: {attack.confidence}
                </span>
              </div>

              <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    Weapons
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {attack.weapons.map((item, weaponIndex) => (
                      <span
                        key={`${item.name}-${weaponIndex}`}
                        className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300"
                      >
                        {item.name}
                        {item.quantity !== null
                          ? ` × ${item.quantity}`
                          : " — quantity not reliably established"}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:text-right">
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    Source
                  </p>

                  <a
                    href={attack.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                  >
                    {attack.sourceName}
                  </a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}