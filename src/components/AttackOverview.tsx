import Link from "next/link";
import { attacks } from "@/data/attacks";

export default function AttackOverview() {
  const sortedAttacks = [...attacks].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  const firstAttack = sortedAttacks[0];
  const latestAttack = sortedAttacks[sortedAttacks.length - 1];

  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="mt-20 w-full max-w-5xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-red-400">
              Attack Overview
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Documented Attacks
            </h2>

            <p className="mt-2 text-gray-400">
              Based on available open-source information.
            </p>
          </div>

          <Link
            href="/attacks"
            className="w-fit rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-white"
          >
            View Attack History →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Recorded Attacks
            </p>

            <p className="mt-2 text-3xl font-bold">
              {attacks.length.toLocaleString("en-US")}
            </p>
          </div>

          <div className="rounded-2xl bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              First Recorded
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-200">
              {firstAttack ? formatDate(firstAttack.date) : "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              Latest Recorded
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-200">
              {latestAttack ? formatDate(latestAttack.date) : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}