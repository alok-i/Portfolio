import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SphereGeometry, MeshBasicMaterial, MathUtils } from 'three';
import * as THREE from "three";

function Galaxy() {
    const orbitRef = useRef();
    const planetRef = useRef();
    const xRadius =9;
    const zRadius = 19;

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
    useFrame(({clock}) => {
      // orbitRef.current.position.x += 0.005; // Rotate the orbit
      // const angle = (i / 64) * 2 * Math.PI;
      const t = clock.getElapsedTime();
      const x = xRadius * Math.cos(t);
      const z = zRadius * Math.sin(t);
      planetRef.current.position.x = x; // Rotate the planet
      planetRef.current.position.z = z;
    });
  
    return (
      <group>
        {/* Sun */}
        <mesh>
          <sphereGeometry args={[4, 64, 64]} />
          <meshBasicMaterial color="white" />
        </mesh>
  
        {/* {/* Orbit  */}
         {/* <mesh ref={orbitRef} >
        <planeGeometry args={[1, 5, 32]} />
        <lineBasicMaterial color="grey" linewidth={10} />
      </mesh>  */}
        <line geometry={lineGeometry}>
          <lineBasicMaterial
          ref={orbitRef}
          attach="material"
          linewidth={40}
          />

          
        </line>
        <line geometry={lineGeometry}>
          <lineBasicMaterial
          ref={orbitRef}
          attach="material"
          linewidth={40}
          />

          
        </line>

  
        {/* Planet */}
        <mesh ref={planetRef} position={[6, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="grey" />
        </mesh>
      </group>
    );
  }

  
 
 
  

export default Galaxy