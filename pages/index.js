import { Canvas } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Text from "../components/Text";
import Lights from "../components/Lights";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { button } from "react";
import { DecrementWrapStencilOp } from "three";
import Jumbo from "../components/Jumbo";
import Button from "../components/Button/button";
import ChangingTexts from "../components/ChangingTexts";
import Explore from "../components/explore";

export default function Home() {
  
  const childRef = useRef(null);
  
  const moveAlpha= ()=>{
   
   childRef.current.moveText();
  } 

  return (
    <>
    <div className="container">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={10} color={"white"} ></ambientLight>
        <fog attach="fog" args={["#171720", 100, 120]}></fog>
        <Lights></Lights>
        <Jumbo ref={childRef}></Jumbo>
      </Canvas>
      <Button></Button>
      <ChangingTexts></ChangingTexts>
    </div>
    <Explore></Explore>
    </>
  );
}
