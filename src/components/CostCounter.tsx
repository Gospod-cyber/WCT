"use client";

import { useEffect, useState } from "react";

export default function CostCounter() {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCost((previous) => previous + 125000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-14 text-center">
      <p className="text-gray-400 uppercase tracking-[4px]">
        Estimated Cost
      </p>

      <h2 className="mt-2 text-5xl md:text-7xl font-extrabold text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.6)]">
        ${cost.toLocaleString("en-US")}
      </h2>
    </div>
  );
}