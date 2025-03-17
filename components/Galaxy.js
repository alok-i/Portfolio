import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ParticleMagic from "./ParticleMagic";
import {
  PerspectiveCamera,
  useHelper,
  CameraHelper,
  OrbitControls,
  Box,
  CameraShake,
  Environment,
} from "@react-three/drei";

const randomSize = () => Math.random() * 0.6 + 0.2; // Random planet size between 0.2 - 0.8
const randomColor = () =>
  new THREE.Color(Math.random(), Math.random(), Math.random());

// Helper function to map values from one range to another (like Arduino map)
const map = (value, fromRange, toRange) => {
  return (
    toRange[0] +
    ((toRange[1] - toRange[0]) * (value - fromRange[0])) /
      (fromRange[1] - fromRange[0])
  );
};

function Ring({
  radius,
  tilt,
  ringColorStart,
  ringColorEnd,
  planetCount,
  planetColor,
  ringRandom,
}) {
  const planetRefs = useRef([]);
  const ringRef = useRef();

  // Initialize array to store offset angles for each planet
  const planetOffsets = useRef(
    Array.from({ length: planetCount }, () => Math.random() * Math.PI * 2)
  );

  // Create a ring with vertex colors
  const { geometry, colorArray } = useMemo(() => {
    const segments = 64;
    const points = [];
    const colors = [];
    const fromColor = new THREE.Color(ringColorStart);
    const toColor = new THREE.Color(ringColorEnd);

    // Create points around the ring
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(0, radius * Math.sin(angle), radius * Math.cos(angle))
      );

      // Create a color gradient for the vertices
      const color = fromColor.clone().lerp(toColor, i / segments);
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const colorArray = new Float32Array(colors);
    geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    return { geometry, colorArray };
  }, [radius, ringColorStart, ringColorEnd]);

  // Animate the color gradient
  useFrame(({ clock }) => {
    if (ringRef.current && colorArray) {
      const elapsedTime = clock.getElapsedTime() * ringRandom * 2;
      const segments = 64;
      const fromColor = new THREE.Color(ringColorStart);
      const toColor = new THREE.Color(ringColorEnd);
      const tempColor = new THREE.Color();

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const phaseShift =
          ((angle + elapsedTime) % (Math.PI * 2)) / (Math.PI * 2);

        // Create a traveling highlight effect
        const highlight = Math.pow(Math.sin(phaseShift * Math.PI * 2), 0.8); // Sharper peak

        tempColor.copy(fromColor).lerp(toColor, highlight);

        // Update the color buffer
        colorArray[i * 3] = tempColor.r;
        colorArray[i * 3 + 1] = tempColor.g;
        colorArray[i * 3 + 2] = tempColor.b;
      }

      // Update the buffer attribute
      ringRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Animate planets
    planetRefs.current.forEach((planet, index) => {
      if (planet) {
        // Different speed for each planet based on its index
        const speed = 0.3 + index * 0.05;
        const t = clock.getElapsedTime() * speed + planetOffsets.current[index];

        // Update planet position
        planet.position.y = radius * Math.sin(t);
        planet.position.z = radius * Math.cos(t);
      }
    });
  });

  return (
    <group rotation={[0, tilt, tilt]}>
      <line ref={ringRef} geometry={geometry}>
        <lineBasicMaterial
          attach="material"
          vertexColors={true}
          linewidth={3}
        />
      </line>
      {/* Create the exact number of planets specified by planetCount */}
      {Array.from({ length: planetCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (planetRefs.current[i] = el)}
          position={[
            0,
            radius * Math.sin(planetOffsets.current[i]),
            radius * Math.cos(planetOffsets.current[i]),
          ]}
        >
          <sphereGeometry args={[randomSize() * 3 * ringRandom, 32, 32]} />
          <meshBasicMaterial color={planetColor} />
        </mesh>
      ))}
    </group>
  );
}

function Galaxy() {
  return (
    <Canvas camera={{ position: [0, 23, 10] }}>
      <ParticleMagic />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Rings with different angles and planet counts */}
      <Ring
        radius={9}
        tilt={Math.PI / 3}
        ringColorStart="#ffffff"
        ringColorEnd="#ffffff"
        planetCount={1}
        planetColor="white"
        ringRandom={0.8}
      />
      <Ring
        radius={12}
        tilt={Math.PI / 3}
        ringColorStart="#ffffff"
        ringColorEnd="#8D8D8"
        planetCount={1}
        planetColor="grey"
        ringRandom={0.6}
      />
      <Ring
        radius={17}
        tilt={Math.PI / 3}
        ringColorStart="#ffffff"
        ringColorEnd="#8D8D8"
        planetCount={1}
        planetColor="grey"
        ringRandom={0.7}
      />
      <Ring
        radius={23}
        tilt={Math.PI / 3}
        ringColorStart="#ffffff"
        ringColorEnd="#8D8D8"
        planetCount={1}
        planetColor="white"
        ringRandom={1}
      />
    </Canvas>
  );
}

export default Galaxy;
