import React from "react";
import * as THREE from "three";
import { Vector3 } from 'three'
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLight } from "@react-three/drei";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";

const useMousePosition = () => {
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 , z:4});
  
  
  
     
    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
  
      const x = ((clientX / innerWidth) * 2 - 1)*10;
      const y = (-(clientY / innerHeight) * 2 + 1)*10;
      const z = 4;
      setNormalizedPosition({ x, y, z });
    }
    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
  
   return normalizedPosition;
  }

const Lights = () => {
  const positionObject = useMousePosition();
  const positionCord = () => {
    return Object.values(positionObject);
  };

  const [targetS, setTarget] = useState([4, 4, 4]);
  const positionArr = positionCord();
   
  
  useEffect(() => {
    setTarget(positionArr);
  }, [positionArr]);
  
  const vec = new Vector3();
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })

  // console.log(targetS);

  return (
    <>
     <SpotLight position={targetS} ref={light} penumbra={1} distance={12} angle={Math.PI/2} attenuation={5} anglePower={6} intensity={0.01} decay={3}></SpotLight>
    </>
  );
};

export default Lights;
