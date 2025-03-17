import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const randomSize = () => Math.random() * 0.6 + 0.2; // Random planet size between 0.2 - 0.8
const randomColor = () =>
  new THREE.Color(Math.random(), Math.random(), Math.random());

function Ring({ radius, tilt, ringColorStart, ringColorEnd, planetCount }) {
  const points = [];
  const segments = 64;
  const planetRefs = useRef([]);

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(0, radius * Math.sin(angle), radius * Math.cos(angle))
    );
  }

  const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const color1 = new THREE.Color(ringColorStart);
  const color2 = new THREE.Color(ringColorEnd);

  useFrame(({ clock }) => {
    planetRefs.current.forEach((planet, index) => {
      if (planet) {
        const t =
          clock.getElapsedTime() * 0.3 + (index * (Math.PI * 2)) / planetCount;
        planet.position.y = radius * Math.sin(t);
        planet.position.z = radius * Math.cos(t);
      }
    });
  });

  return (
    <group rotation={[0, tilt, tilt]}>
      <line geometry={ringGeometry}>
        <lineBasicMaterial
          attach="material"
          color={color1.lerp(color2, 0.5)}
          linewidth={3}
        />
      </line>
      {Array.from({ length: planetCount }).map((_, i) => (
        <mesh key={i} ref={(el) => (planetRefs.current[i] = el)}>
          <sphereGeometry args={[randomSize(), 32, 32]} />
          <meshBasicMaterial color={randomColor()} />
        </mesh>
      ))}
    </group>
  );
}

function Galaxy() {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

      {/* Rings with different angles and planet counts */}
      <Ring
        radius={15}
        tilt={Math.PI / 3}
        ringColorStart="grey"
        ringColorEnd="white"
        planetCount={3}
      />
      <Ring
        radius={20}
        tilt={Math.PI / 4}
        ringColorStart="grey"
        ringColorEnd="white"
        planetCount={4}
      />
      <Ring
        radius={25}
        tilt={Math.PI / 4}
        ringColorStart="grey"
        ringColorEnd="white"
        planetCount={5}
      />
    </Canvas>
  );
}

export default Galaxy;
