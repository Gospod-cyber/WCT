import AttackHistory from "@/components/AttackHistory";

export default function AttacksPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[4px] text-red-400">
          Attack History
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Russia's War Against Ukraine
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Documented attacks based on available open-source information.
        </p>

        <AttackHistory />
      </div>
    </main>
  );
}