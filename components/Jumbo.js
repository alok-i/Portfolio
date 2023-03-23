import React, { use, useEffect, useImperativeHandle } from "react";
import { forwardRef } from "react";
import Text from "./Text";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { TextureDataType } from "three";
 // eslint-disable-next-line react/display-name
const Jumbo = forwardRef((props , ref) =>{
  
  const TextRef  = useRef(null);

   useImperativeHandle(ref , ()=>{

    return{
        moveText(){
            console.log(TextRef.current);
        }
    }

   }, [])



  return (  
    <>
      <Text
        ref={TextRef}
        hAlign="center"
        className='first'
        position={[-4.2, 0, 0]}
        children="A"
       />
      <Text
        hAlign="center"
        className="second"
        position={[-1.6, 0, 0]}
        children="L"
      />
      <Text
        hAlign="center"
        className="third"
        position={[0.8, 0, 0]}
        children="Ø"
      />
      <Text
        hAlign="center"
        className="four"
        position={[4.0, 0, 0]}
        children="K"
      />
    </>
  );
})

// const forwardedText = React.forwardRef(Jumbo);

export default Jumbo;
