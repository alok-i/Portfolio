import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SphereGeometry, MeshBasicMaterial, MathUtils } from 'three';
import * as THREE from "three";

function Galaxy() {
    const orbitRef = useRef();
    const planetRef = useRef();
    const xRadius = 1;
    const zRadius = 1;

    const points =[]
    for(let i=0; i<64; i++){
      const angle = (i / 64) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0 , z));
    }

    points.push(points[0]);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    // Animation loop
    useFrame(() => {
      // orbitRef.current.rotation.y += 0.005; // Rotate the orbit
      // planetRef.current.rotation.y += 0.01; // Rotate the planet
    });
  
    return (
      <group>
        {/* Sun */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
  
        {/* Orbit */}
        {/* <mesh ref={orbitRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 5, 32]} />
        <lineBasicMaterial color="gray" linewidth={1} />
      </mesh> */}
        <line geometry={lineGeometry}>
          <lineBasicMaterial
          ref={orbitRef}
          attach="material"
          linewidth={10}
          />

          
        </line>

  
        {/* Planet */}
        <mesh ref={planetRef} position={[6, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
    );
  }

  
 
 
  

export default Galaxy