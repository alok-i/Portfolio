import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TWEEN from 'tween.js';

const ParticleMagic = () => {
  const count = 100000;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 22;
      let y = (Math.random() - 0.5) * 22;
      let z = Math.random() * 2;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const pointsRef = useRef();

  const startAnimation = () => {
    const points = pointsRef.current;

    const animationDuration = 20000; // 2 seconds
    const targetSphere = new THREE.SphereBufferGeometry(10, 32, 32);

    const targetPositions = targetSphere.getAttribute('position').array
    console.log(targetPositions);

    const tween = new TWEEN.Tween(points.position)
      .to(targetPositions, animationDuration)
      // console.log(points.geometry.attributes.position)
      .onUpdate(() => {
        // console.log(points.geometry.attributes.array)
        points.position.needsUpdate = true;
      })
      .start();
  };

  // Trigger the animation after mount
  React.useEffect(() => {
    startAnimation();
  }, []);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1}></pointsMaterial>
    </points>
  );
};

export default ParticleMagic;
