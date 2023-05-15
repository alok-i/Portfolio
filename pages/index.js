import { Canvas } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Text from "../components/Text";
import Lights from "../components/Lights";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useFrame , useThree } from "@react-three/fiber";
import { button } from "react";
import { DecrementWrapStencilOp } from "three";
import Jumbo from "../components/Jumbo";
import Button from "../components/Button/button";
import ChangingTexts from "../components/ChangingTexts";
import Explore from "../components/explore";
import ParticleDance from "../components/particleDance";
import { OrbitControls } from "@react-three/drei";
import { CameraShake } from "@react-three/drei";
import * as THREE from 'three';
import ParticleMagic from "../components/ParticleMagic";
import splitType from 'split-type';
import AnimatedTexts from "../components/AnimatedTexts";

export default function Home() {
  
  const childRef = useRef(null);
  const textRef = useRef(null);
  
  const moveAlpha= ()=>{
   
   childRef.current.moveText();
  } 

  function Rig() {
    const [vec] = useState(() => new THREE.Vector3())
    const { camera, mouse } = useThree()
    useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.005))
    return <CameraShake maxYaw={0} maxPitch={0.005} maxRoll={0.002} yawFrequency={0} pitchFrequency={0.2} rollFrequency={0.4} />
  }

 

  useEffect(()=>{

    const tl = gsap.timeline();

    gsap.set(".ideaText", {
      // Change this to -200px for a bigger cylinder
      transformOrigin: "center center -100px",
      // Comment this out to see the backs of letters
      backfaceVisibility: "hidden"
    });

    tl.to(".ideaText", 1.8, {

      scrollTrigger : {
        trigger: "textRef.current.position",
        start:"1500px 40%",
        end: "1800px 90%",
        scrub:1,
        markers: true,
        toogleActions: "restart"
      },
      duration :20,
      delay: 2,
      rotationX: "360",
      stagger: 0.1,
    })

  })
 

  return (
    <>
    <section className="container"> 
       <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={10} color={"white"} ></ambientLight>
        <fog attach="fog" args={["#171720", 100, 120]}></fog>
        <Lights></Lights>
        <Jumbo ref={childRef}></Jumbo>
      </Canvas>
      <Button></Button>
      <ChangingTexts></ChangingTexts>
    </section>
    <section className="containerTwo" >
    <Canvas camera={{ position: [0, 0, 4], fov:5}}>
        <Explore></Explore>
        <ParticleMagic></ParticleMagic>
        <Rig></Rig>
    </Canvas>
      <div className="ideaText">
          <span ref={textRef}>Form An Idea!</span>
      </div>
    </section>
    <div className="container">
         <Button></Button>
    </div>
    </>
  );
}
