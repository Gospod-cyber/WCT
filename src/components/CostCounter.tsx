"use client";

import { calculateTotalCost } from "@/data/calculateCost";

export default function CostCounter() {
  const totalCost = calculateTotalCost();

  return (
    <div className="mt-14 text-center">
      <p className="text-gray-400 uppercase tracking-[4px]">
        Estimated Cost
      </p>

      <h2 className="mt-2 text-5xl font-extrabold text-red-400 md:text-7xl">
        ${totalCost.toLocaleString("en-US")}
      </h2>
    </div>
  );
}