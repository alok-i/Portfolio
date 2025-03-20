import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import TWEEN from "tween.js";
// import { BufferAttribute } from 'three';
// import { BufferGeometry } from 'three';

const ParticleMagic = () => {
  const count = 800;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 22;
      let y = (Math.random() + 0.1) * 22;
      let z = Math.random() * 22;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const pointsRef = useRef();

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03}></pointsMaterial>
    </points>
  );
};

export default ParticleMagic;
