import { Canvas } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Text from "../components/Text";
import Lights from "../components/Lights";
import { gsap } from "gsap";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { button } from "react";
import { DecrementWrapStencilOp } from "three";
import Jumbo from "../components/Jumbo";
import Button from "../components/Button/button";
import ChangingTexts from "../components/ChangingTexts";
import * as THREE from "three";
import ParticleMagic from "../components/ParticleMagic";
import splitType from "split-type";
import { OrbitControls, CameraShake, Environment } from "@react-three/drei";
import Galaxy from "../components/Galaxy";
import HomePage from "../components/HomePage";
import Explore from "../components/explore";
import ParticleDance from "../components/particleDance";
import AstronautComp from "../components/HomePage";
const Home = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(".ideaText", {
      // Change this to -200px for a bigger cylinder
      transformOrigin: "center center -100px",
      // Comment this out to see the backs of letters
      backfaceVisibility: "hidden",
    });

    tl.to(".ideaText", 1.8, {
      scrollTrigger: {
        trigger: "textRef.current.position",
        start: "1500px 40%",
        end: "1800px 90%",
        scrub: 1,
        markers: true,
        toogleActions: "restart",
      },
      duration: 20,
      delay: 2,
      rotationX: "360",
      stagger: 0.1,
    });
  });

  return (
    <>
      <section className="container">
        <AstronautComp></AstronautComp>
        <Button></Button>
        <ChangingTexts></ChangingTexts>
      </section>
      <section className="container">
        <ParticleDance></ParticleDance>
        <div className="ideaText">
          <span ref={textRef}>Form An Idea!</span>
        </div>
      </section>
      <div className="container">
        <Button></Button>
        {/* <Canvas camera={{ position: [20, 20, 20], fov: 60 }}> */}
        {/* <ambientLight intensity={10} color={"white"}></ambientLight> */}
        <Galaxy></Galaxy>
        {/* <OrbitControls></OrbitControls> */}
        {/* </Canvas> */}
      </div>
    </>
  );
};

export default Home;
