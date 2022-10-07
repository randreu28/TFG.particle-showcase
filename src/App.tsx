import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vignette, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function App() {
  const { color, scale, backgroundColor } = useControls({
    color: "#ff005b",
    scale: [1, 1, 1],
    backgroundColor: "#ffffff",
  });

  return (
    <div className="h-screen">
      <Canvas>
        <color attach="background" args={[backgroundColor]} />
        <EffectComposer>
          <Vignette eskil={true} opacity={0.5} offset={0.1} darkness={1.5} />
        </EffectComposer>
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight color={color} position={[1, 2, 5]} />
        <directionalLight color={color} position={[-1, -2, -5]} />
        <mesh scale={scale}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
