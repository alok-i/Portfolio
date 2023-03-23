import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect, useState, useEffect , forwardRef, useImperativeHandle } from 'react'
import { Text3D , Center, useCubeTexture} from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from "three";
import gsap from "gsap";





const Text = forwardRef(function Text({children ,  vAlign = 'center', hAlign = 'center', size = 0.2, color = '#000000', ...props } , ref) {

  const config = useMemo(
    () => ({ size: 40, height: 20, curveSegments:20, bevelEnabled: true, bevelThickness: -0.3, bevelSize: 0.5, bevelOffset: 0, bevelSegments: 1}),
    []
  )
  const mesh = useRef()
  
  // const [pos , setPos] = useState([position])
  
  const name = (type) => `Metal036_2K_${type}.jpg`

  const[ colorMap , displacementMap , normalMap , roughnessMap , metalnessMap ] = useLoader(TextureLoader , [name("Color") , name("Displacement") , name("NormalGL") , name("Roughness"), name("Metalness")])
  const textures = useCubeTexture(["px.png" , "nx.png" , "py.png" , "ny.png" , "pz.png" , "nz.png"] , {path: "nightTexture/"});
  


  

  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === 'center' ? -size.x / 3: hAlign === 'right' ? 0 : -size.x
    mesh.current.position.y = vAlign === 'center' ? -size.y / 5 : vAlign === 'right' ? 0 : -size.y
  })
  return (
    <group {...props} scale={[0.4 * size, 0.4 * size, 0.02]}>
        <Text3D ref={mesh}  font={"/Inter_Bold.json"} {...config}  >
        {children}
       
        <meshBasicMaterial
          // displacementScale={0.2}
          map={colorMap}
          // displacementMap={displacementMap}
          // normalMap={normalMap}
          // roughnessMap={roughnessMap}
          // metalnessMap={metalnessMap}
          envMap={textures}
        />
      </Text3D>
   
    </group>
  )
})

export default Text;