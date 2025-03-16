import React, { useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

function Explore() {
  const beamRef = useRef();
  const beamRefThree = useRef();
  const beamRefTwo = useRef();

  useEffect(() => {
    gsap.to(beamRef.current.position, {
      scrollTrigger: {
        trigger: "beamRef.current.position",
        start: "1500px 40%",
        end: "1800px 90%",
        scrub: 1,
        markers: true,
        toogleActions: "restart pause reverse pause",
      },
      y: -2,
      duration: 0.5,
    });

    gsap.to(beamRefTwo.current.position, {
      scrollTrigger: {
        trigger: "sphere.current.position",
        start: "1800px 40%",
        end: "1800px 90%",
        scrub: 1,
        markers: true,
        toogleActions: "restart pause reverse pause",
      },
      y: -3,
      duration: 0.8,
    });

    gsap.to(beamRefThree.current.position, {
      scrollTrigger: {
        trigger: "sphere.current.position",
        start: "1500px 40%",
        end: "1800px 90%",
        scrub: 1,
        markers: true,
        toogleActions: "restart pause reverse pause",
      },
      y: -3,
      duration: 1.2,
    });
  }, []);

  return (
    <>
      <ambientLight intensity={1}></ambientLight>
      <group ref={beamRefTwo}>
        <mesh scale={[0.005, 5.6, 1]} position={[0, 5, 0]}>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh scale={0.06} position={[0, 2.2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
      <group ref={beamRefThree}>
        <mesh scale={[0.005, 5.6, 0.005]} position={[-0.8, 6, 0]}>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh scale={0.06} position={[-0.8, 3.2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
      <group ref={beamRef}>
        <mesh scale={[0.005, 6.4, 0.005]} position={[0.8, 6, 0]}>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh scale={0.06} position={[0.8, 2.8, 0]}>
          <sphereGeometry />
          <meshStandardMaterial></meshStandardMaterial>
        </mesh>
      </group>
    </>
  );
}

export default Explore;
