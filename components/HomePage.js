import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader, AnimationMixer, BackSide } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleMagic from "./ParticleMagic";

// Astronaut component with color and lighting adjustments
const Astronaut = () => {
  const { scene, animations } = useGLTF("/astronaut.glb"); // Load the GLB model
  const astronautRef = useRef(null);

  // Load textures
  const textureColor = useLoader(
    TextureLoader,
    "/textures/gltf_embedded_0.png"
  );
  const textureRoughness = useLoader(
    TextureLoader,
    "/textures/gltf_embedded_3@channels=R.png"
  );
  const textureMetalness = useLoader(
    TextureLoader,
    "/textures/gltf_embedded_1@channels=A.png"
  );
  const textureNormal = useLoader(
    TextureLoader,
    "/textures/gltf_embedded_4.png"
  );
  const textureAO = useLoader(TextureLoader, "/textures/gltf_embedded_5.png");

  const mixer = useRef(null);

  // Apply the textures and adjust material properties
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          material.map = textureColor;
          material.roughnessMap = textureRoughness;
          material.metalnessMap = textureMetalness;
          material.normalMap = textureNormal;
          material.aoMap = textureAO;

          material.transparent = false;
          material.needsUpdate = true;
        }
      });
      scene.scale.set(0.3, 0.3, 0.3);
    }
  }, [
    scene,
    textureColor,
    textureRoughness,
    textureMetalness,
    textureNormal,
    textureAO,
  ]);

  // Set up animation
  useFrame((state, delta) => {
    if (!mixer.current && animations.length) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive ref={astronautRef} object={scene} position={[0, 0, 0]} />;
};

const SpaceBackground = () => {
  const spaceTexture = useLoader(TextureLoader, "/space-2638158.jpg");
  return (
    <mesh>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={spaceTexture} side={BackSide} />
    </mesh>
  );
};

const AstronautComp = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 0, 3], fov: 50 }}
    >
      <SpaceBackground />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2.0} />
      <spotLight
        position={[2, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={3}
        castShadow
        color={new THREE.Color(0xffffff)}
      />
      <Astronaut />
      <OrbitControls enableZoom={false} enablePan={true} />
      <EffectComposer>
        <Bloom intensity={0.7} />
      </EffectComposer>
    </Canvas>
  );
};

export default AstronautComp;
