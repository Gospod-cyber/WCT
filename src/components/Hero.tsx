import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import Globe from "./Globe";
import CostCounter from "./CostCounter";

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 text-white flex flex-col justify-center items-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-center">
          War Cost Tracker
        </h1>

        <p className="mt-6 text-xl text-gray-300 text-center max-w-3xl">
          Real-time estimation of the financial cost of Russia&apos;s war against Ukraine.
        </p>

        <CostCounter />


    <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
  <StatsCard title="Missiles" value="14,582" />
  <StatsCard title="Drones" value="52,341" />
  <StatsCard title="Aircraft" value="372" />
</div>


<button className="mt-12 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-lg shadow-red-500/30">
          Explore Data
        </button>

        <div className="mt-16 w-full max-w-4xl">
  <Globe />
</div>

      </section>
    </>
  );
}