"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const GlobeGL = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export default function Globe() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let animationFrame: number;

    const startRotation = () => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();

        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        return;
      }

      animationFrame = requestAnimationFrame(startRotation);
    };

    startRotation();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <GlobeGL
        ref={globeRef}
        width={700}
        height={500}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
}