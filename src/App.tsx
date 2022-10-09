import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vignette, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import Buffer from "./Buffer";

export default function App() {
  const { lightColor, backgroundColor } = useControls("Scene", {
    lightColor: "#ffffff",
    backgroundColor: "#191a2e",
  });

  return (
    <div className="h-screen">
      <Canvas>
        <color attach="background" args={[backgroundColor]} />
        <EffectComposer>
          <Vignette eskil={true} opacity={0.5} offset={0.1} darkness={1.5} />
        </EffectComposer>
        <OrbitControls />
        <ambientLight color={lightColor} intensity={0.1} />
        <Buffer />
      </Canvas>
    </div>
  );
}
