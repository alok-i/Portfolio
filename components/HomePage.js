import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  useHelper,
  CameraHelper,
  OrbitControls,
  Box,
  CameraShake,
  Environment,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Lights from "./Lights";
import Jumbo from "./Jumbo";
import { useThree, useFrame } from "@react-three/fiber";

function HomePage() {
  const camera = useRef();
  useHelper(camera, THREE.CameraHelper);

  const childRef = useRef(null);

  const moveAlpha = () => {
    childRef.current.moveText();
  };

  function Rig() {
    const [vec] = useState(() => new THREE.Vector3());
    const { camera, mouse } = useThree();
    useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05));

    return (
      <CameraShake
        maxYaw={0.01}
        maxPitch={0.01}
        maxRoll={0.01}
        yawFrequency={0.5}
        pitchFrequency={0.5}
        rollFrequency={0.4}
      />
    );
  }
  return (
    <>
      <ambientLight intensity={10} color={"white"}></ambientLight>
      <fog attach="fog" args={["#171720", 100, 120]}></fog>
      <Lights></Lights>
      <Jumbo ref={childRef}></Jumbo>
      <PerspectiveCamera
        ref={camera}
        near={1}
        far={4}
        position={[0, 0, 10]}
      ></PerspectiveCamera>
      {/* <Rig></Rig> */}
    </>
  );
}

export default HomePage;
