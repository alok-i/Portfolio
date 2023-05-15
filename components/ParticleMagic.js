import React from 'react'
import { useMemo } from 'react';

function ParticleMagic() {


    const count = 1000;
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(count * 3);
    
      for (let i = 0; i < count; i++) {
        // Generate random values for x, y, and z on every loop
        let x = (Math.random() - 0.5) * 22;
        let y = (Math.random() - 0.5) * 22;
        let z = (Math.random()) * 2;
    
        // We add the 3 values to the attribute array for every loop
        positions.set([x, y, z], i * 3);
      }
    
      return positions;
    }, [count]);

  return (

    <points>
    <bufferGeometry>
      <bufferAttribute
       attach="attributes-position"
       count={particlesPosition.length / 3}
       array={particlesPosition}
       itemSize={3}

      ></bufferAttribute>
    </bufferGeometry>
    <pointsMaterial size={0.01}></pointsMaterial>
  </points>
   
  )
}

export default ParticleMagic