import Link from "next/link";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import { weaponStatistics } from "@/data/weaponStatistics";
import Globe from "./Globe";
import CostCounter from "./CostCounter";
import WeaponBreakdown from "./WeaponBreakdown";
import AttackOverview from "./AttackOverview";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 px-6 pt-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center">

          {/* HERO */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl font-bold md:text-8xl">
              War Cost Tracker
            </h1>

            <p className="mt-6 max-w-3xl text-xl text-gray-300">
              Real-time estimation of the financial cost of Russia's war
              against Ukraine.
            </p>

            <CostCounter />
          </div>

          {/* WEAPON BREAKDOWN */}
          <WeaponBreakdown />

          {/* ATTACK OVERVIEW */}
          <AttackOverview />

          {/* STATS */}
          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {weaponStatistics.map((item) => (
              <StatsCard
                key={item.category}
                title={item.name}
                value={
                  item.quantity !== null
                    ? item.quantity.toLocaleString("en-US")
                    : "Data pending"
                }
              />
            ))}
          </div>

          {/* EXPLORE */}
          <Link
            href="/statistics"
            className="mt-12 rounded-full bg-red-500 px-8 py-4 text-lg font-semibold shadow-lg shadow-red-500/30 transition-all duration-300 hover:bg-red-600"
          >
            Explore Data
          </Link>

          {/* GLOBE */}
          <div className="mt-16 w-full max-w-4xl">
            <Globe />
          </div>

        </div>
      </section>
    </>
  );
}