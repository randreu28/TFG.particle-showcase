import React, { useRef, useEffect, useState } from "react";
import { useControls } from "leva";
import { ComputedAttribute, shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import useStore from "./store/store";

import type { Material, Points } from "three";

// @ts-ignore
import fragShader from "./shaders/fragment.glsl";
// @ts-ignore
import vertShader from "./shaders/vertex.glsl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//For uniforms type safety
interface myUniforms extends Material {
  uniforms: {
    particleSize: { value: number };
    bufferColor: { value: THREE.Color };
    time: { value: number };
    transparencyState: { value: number };
    randomState: { value: number };
    state1: { value: number };
    state2: { value: number };
    state3: { value: number };
  };
}

interface myPoints extends Points {
  material: myUniforms;
}

export default function Buffer() {
  const ref = useRef<myPoints>(null!);

  let { tick, incTick, resetTick } = useStore((state) => ({
    tick: state.tick,
    incTick: state.inc,
    resetTick: state.reset,
  }));

  const [params, setParams] = useControls("Particles", () => ({
    bufferColor: "#f8665d",
    particleSize: { value: 6, min: 0, max: 10 },
    transparencyState: { value: 0.0, min: 0, max: 1 },
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

  //Keeps the internal time variable of the shader updated
  useFrame((state) => {
    ref.current.material.uniforms.time.value = state.clock.elapsedTime;
  });

  //Initial animation
  useEffect(() => {
    gsap.to(params, {
      randomState: 1.0,
      duration: 3.0,
      ease: "circ.out",
      onUpdate: () => {
        setParams({
          randomState: params.randomState,
        });
      },
    });

    gsap.to(params, {
      delay: 1,
      transparencyState: 1.0,
      duration: 2.0,
      ease: "linear",
      onUpdate: () => {
        setParams({
          transparencyState: params.transparencyState,
        });
      },
    });
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (tick == 3) {
        tick = 0;
        resetTick();
      } else {
        ++tick;
        incTick();
      }

      switch (tick) {
        case 0:
          gsap.to(params, {
            state1: 1.0,
            state2: 1.0,
            state3: 1.0,
            duration: 1.25,
            ease: "circ.out",
            onUpdate: () => {
              setParams({
                state1: params.state1,
                state2: params.state2,
                state3: params.state3,
              });
            },
          });
          break;
        case 1:
          gsap.to(params, {
            state3: 0.0,
            duration: 1.25,
            ease: "circ.out",
            onUpdate: () => {
              setParams({
                state3: params.state3,
              });
            },
          });
          break;
        case 2:
          gsap.to(params, {
            state2: 0.0,
            duration: 1.25,
            ease: "circ.out",
            onUpdate: () => {
              setParams({
                state2: params.state2,
              });
            },
          });
          break;
        case 3:
          gsap.to(params, {
            state1: 0.0,
            duration: 1.25,
            ease: "circ.out",
            onUpdate: () => {
              setParams({
                state1: params.state1,
              });
            },
          });
          break;
        default:
          console.error("tic value expected to be between 0 and 3");
          break;
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const king = useLoader(GLTFLoader, "models/king.glb");
  const lightBulb = useLoader(GLTFLoader, "models/lightbulb.glb");
  const rocket = useLoader(GLTFLoader, "models/rocket.glb");

  return (
    <points ref={ref} scale={[2, 2, 2]}>
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
          compute={() => {
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
          compute={() => {
            const geometry3Attribute = new THREE.BufferAttribute(
              //@ts-ignore: Types vary in each model
              king.nodes.targetModel.geometry.attributes.position.array,
              3
            );
            return geometry3Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position4"
          compute={() => {
            const geometry4Attribute = new THREE.BufferAttribute(
              //@ts-ignore: Types vary in each model
              lightBulb.nodes.targetModel.geometry.attributes.position.array,
              3
            );
            return geometry4Attribute;
          }}
          usage={THREE.StaticReadUsage}
        />

        <ComputedAttribute
          name="position5"
          compute={() => {
            const geometry5Attribute = new THREE.BufferAttribute(
              //@ts-ignore: Types vary in each model
              rocket.nodes.targetModel.geometry.attributes.position.array,
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
