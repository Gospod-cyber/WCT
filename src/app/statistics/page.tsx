import { attacks } from "@/data/attacks";

export default function StatisticsPage() {
  const recordedAttacks = attacks.length;

  const missileAttacks = attacks.filter((attack) =>
    attack.weapons.some((weapon) =>
      weapon.name.toLowerCase().includes("missile")
    )
  ).length;

  const droneAttacks = attacks.filter((attack) =>
    attack.weapons.some((weapon) =>
      weapon.name.toLowerCase().includes("drone")
    )
  ).length;

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Statistics
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Overview of Russian missile and drone attacks against Ukraine
          based on documented open-source data.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Missile Attacks
            </p>

            <p className="mt-3 text-4xl font-bold">
              {missileAttacks}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Drone Attacks
            </p>

            <p className="mt-3 text-4xl font-bold">
              {droneAttacks}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Recorded Attacks
            </p>

            <p className="mt-3 text-4xl font-bold">
              {recordedAttacks}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}