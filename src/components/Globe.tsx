"use client";

import GlobeGL from "react-globe.gl";
import { useEffect, useRef } from "react";

export default function Globe() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.35;
  }, []);

  return (
    <div className="w-full h-[420px] md:h-[500px] flex justify-center">
      <GlobeGL
        ref={globeRef}
        width={typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 700) : 600}
height={500}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
}