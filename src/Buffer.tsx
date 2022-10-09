import React, { useRef, useEffect } from "react";
import { useControls } from "leva";
import { ComputedAttribute, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

import type { Points } from "three";

// @ts-ignore
import fragShader from "../public/shaders/fragment.glsl";
// @ts-ignore
import vertShader from "../public/shaders/vertex.glsl";

export default function Buffer() {
  const ref = useRef<Points>(null!);

  const [params, set] = useControls("Particles", () => ({
    bufferColor: "#f8665d",
    particleSize: { value: 2, min: 0, max: 7 },
    transparencyState: { value: 1.0, min: 0, max: 1 },
    randomState: { value: 0.0, min: 0, max: 1 },
    state1: { value: 1.0, min: 0, max: 1 },
    state2: { value: 1.0, min: 0, max: 1 },
    state3: { value: 1.0, min: 0, max: 1 },
  }));

  const ShaderMaterial = shaderMaterial(
    {
      particleSize: params.particleSize,
      bufferColor: new THREE.Color(params.bufferColor),
      time: 0,
      transparencyState: params.transparencyState,
      randomState: params.randomState,
      state1: params.state1,
      state2: params.state2,
      state3: params.state3,
    },
    vertShader,
    fragShader
  );

  extend({ ShaderMaterial });
  ShaderMaterial.key = THREE.MathUtils.generateUUID();

  return (
    <points ref={ref}>
      <bufferGeometry>
        <ComputedAttribute
          name="position"
          compute={() => {
            const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
            const geometry1Attribute = new THREE.BufferAttribute(
              geometry1.attributes.position.array,
              3
            );
            return geometry1Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position2"
          compute={(geometry) => {
            const geometry1 = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16);
            const geometry2 = new Float32Array(
              geometry1.attributes.position.count * 3
            );
            for (let i = 0; i < geometry1.attributes.position.count * 3; i++) {
              geometry2[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
            }
            const geometry2Attribute = new THREE.BufferAttribute(geometry2, 3);
            return geometry2Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position3"
          compute={(geometry) => {
            const geometry3 = new THREE.DodecahedronGeometry(0.65, 3);
            const geometry3Attribute = new THREE.BufferAttribute(
              geometry3.attributes.position.array,
              3
            );
            return geometry3Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position4"
          compute={(geometry) => {
            const geometry4 = new THREE.TorusGeometry(0.65, 0.2, 16, 100);
            const geometry4Attribute = new THREE.BufferAttribute(
              geometry4.attributes.position.array,
              3
            );
            return geometry4Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position5"
          compute={(geometry) => {
            const geometry5 = new THREE.TorusKnotGeometry(0.65, 0.2, 100, 16);
            const geometry5Attribute = new THREE.BufferAttribute(
              geometry5.attributes.position.array,
              3
            );
            return geometry5Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />
      </bufferGeometry>
      <shaderMaterial
        key={ShaderMaterial.key}
        transparent={true}
        vertexColors={true}
      />
    </points>
  );
}
