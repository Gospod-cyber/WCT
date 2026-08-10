import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import Globe from "./Globe";
import CostCounter from "./CostCounter";
import WeaponBreakdown from "./WeaponBreakdown";
import AttackOverview from "./AttackOverview";
<div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 animate-[fadeIn_1s_ease-out_0.9s_both]"></div>
export default function Hero() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 text-white flex flex-col justify-center items-center px-6 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-center animate-[fadeIn_1s_ease-out]">
          War Cost Tracker
        </h1>
        <p className="mt-6 text-xl text-gray-300 text-center max-w-3xl animate-[fadeIn_1s_ease-out_0.3s_both]">
          Real-time estimation of the financial cost of Russia's war against Ukraine.
        </p>
        <CostCounter />
        <WeaponBreakdown />
        <AttackOverview />
        
        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 animate-[fadeIn_1s_ease-out_0.9s_both]">
          <StatsCard title="Missiles" value="14,582" />
          <StatsCard title="Drones" value="52,341" />
          <StatsCard title="Aircraft" value="372" />
        </div>
        <button className="mt-12 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-lg shadow-red-500/30 animate-[fadeIn_1s_ease-out_1.2s_both]">
          Explore Data
        </button>
        <div className="mt-16 w-full max-w-4xl animate-[fadeIn_1s_ease-out_1.5s_both]">
          <Globe />
        </div>
      </section>
    </>
  );
}