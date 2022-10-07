import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

export default function App() {
  const { color, scale } = useControls({
    color: "#ff005b",
    scale: [1, 1, 1],
  });

  return (
    <div className="h-screen bg-gray-600">
      <Canvas>
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
