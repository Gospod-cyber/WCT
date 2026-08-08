"use client";
import { useEffect, useRef } from "react";
import { calculateTotalCost } from "@/data/calculateCost";
export default function CostCounter() {
  const counterRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const targetCost = calculateTotalCost();
    const duration = 2000;
    const startTime = performance.now();
    let animationFrame: number;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Плавне прискорення
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCost = Math.floor(targetCost * easeOut);
      if (counterRef.current) {
        counterRef.current.textContent =
          `$${currentCost.toLocaleString("en-US")}`;
      }
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  return (
    <div className="mt-14 text-center">
      <p className="text-gray-400 uppercase tracking-[4px]">
        Estimated Cost
      </p>
      <h2
        ref={counterRef}
        className="mt-2 text-5xl md:text-7xl font-extrabold text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.6)]"
      >
        $0
      </h2>
    </div>
  );
}