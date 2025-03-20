import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
// import "./scene.css";

const CustomGeometryParticles = (props) => {
  const { count } = props;

  // This reference gives us direct access to our points
  const points = useRef();

  // State to control the animation
  const [currentShape, setCurrentShape] = useState(-1); // -1: random, 0: sphere, 1: box, 2: torus
  const [animationProgress, setAnimationProgress] = useState(0); // 0 to 1
  const [targetShape, setTargetShape] = useState(0); // Next shape to animate to

  // Generate our positions attributes array for all shapes
  const { randomPositions, boxPositions, spherePositions, torusPositions } =
    useMemo(() => {
      const randomPos = new Float32Array(count * 3);
      const boxPos = new Float32Array(count * 3);
      const spherePos = new Float32Array(count * 3);
      const torusPos = new Float32Array(count * 3);

      // Random positions (more spread out)
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * 5;
        let y = (Math.random() - 0.5) * 5;
        let z = (Math.random() - 0.5) * 5;

        randomPos.set([x, y, z], i * 3);
      }

      // Box positions
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        let z = (Math.random() - 0.5) * 2;

        boxPos.set([x, y, z], i * 3);
      }

      // Sphere positions
      const radius = 1;
      for (let i = 0; i < count; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        let x = radius * Math.sin(theta) * Math.cos(phi);
        let y = radius * Math.sin(theta) * Math.sin(phi);
        let z = radius * Math.cos(theta);

        spherePos.set([x, y, z], i * 3);
      }

      // Torus (doughnut) positions
      const torusRadius = 1;
      const tubeRadius = 0.3;
      for (let i = 0; i < count; i++) {
        // Torus parametric equations
        const u = Math.random() * Math.PI * 2; // around the tube
        const v = Math.random() * Math.PI * 2; // around the torus

        let x = (torusRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
        let y = (torusRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
        let z = tubeRadius * Math.sin(v);

        torusPos.set([x, y, z], i * 3);
      }

      return {
        randomPositions: randomPos,
        boxPositions: boxPos,
        spherePositions: spherePos,
        torusPositions: torusPos,
      };
    }, [count]);

  // Create a buffer for the current positions
  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);

  // Initialize with random positions
  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] = randomPositions[i];
    }

    if (points.current) {
      points.current.geometry.attributes.position.array = currentPositions;
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [count, randomPositions]);

  // Set up the animation cycle
  useEffect(() => {
    const cycleInterval = 3000; // Time for each shape (5 seconds)
    const transitionInterval = 3000; // Time between shapes (3 seconds of random positions)

    const intervalId = setInterval(() => {
      if (currentShape === -1) {
        // Currently in random state, animate to next shape
        setCurrentShape(targetShape);
        setAnimationProgress(0);

        // Schedule next shape after this one is done
        setTimeout(() => {
          // Go back to random positions
          setCurrentShape(-1);
          setAnimationProgress(0);

          // Update target shape for next cycle
          setTargetShape((prev) => (prev + 1) % 3);
        }, cycleInterval);
      }
    }, cycleInterval + transitionInterval);

    return () => clearInterval(intervalId);
  }, [currentShape, targetShape]);

  // Animation frame
  useFrame(() => {
    // Update animation progress
    setAnimationProgress((prev) => {
      const newProgress = prev + 0.01;
      return Math.min(newProgress, 1); // Clamp at 1
    });

    // Get the current and target position arrays
    let sourcePositions, targetPositions;

    if (currentShape === -1) {
      // We're either starting from random positions or going back to random
      sourcePositions = randomPositions;

      // Determine where we're going
      switch (targetShape) {
        case 0:
          targetPositions = spherePositions;
          break;
        case 1:
          targetPositions = boxPositions;
          break;
        case 2:
          targetPositions = torusPositions;
          break;
        default:
          targetPositions = randomPositions;
      }
    } else {
      // We're going from a shape back to random positions
      switch (currentShape) {
        case 0:
          sourcePositions = spherePositions;
          break;
        case 1:
          sourcePositions = boxPositions;
          break;
        case 2:
          sourcePositions = torusPositions;
          break;
        default:
          sourcePositions = randomPositions;
      }
      targetPositions = randomPositions;
    }

    // Interpolate positions
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] =
        sourcePositions[i] * (1 - animationProgress) +
        targetPositions[i] * animationProgress;
    }

    // Update the actual geometry
    points.current.geometry.attributes.position.array = currentPositions;
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={currentPositions.length / 3}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#ffffff"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const ParticleDance = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      {/* <ambientLight intensity={0.5} /> */}
      <CustomGeometryParticles count={2000} />
      <OrbitControls autoRotate enableZoom={false} zoomSpeed={0} />
    </Canvas>
  );
};

export default ParticleDance;
