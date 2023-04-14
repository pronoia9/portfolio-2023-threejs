import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF, MeshWobbleMaterial, useMatcapTexture } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const Desk = ({ isMobile }) => {
  const file = useGLTF('./desk/desk.glb');

  return (
    <group>
      {file.nodes.Desk.children
        .filter((child) => child.name.includes('Desk'))
        .map((obj) => {
          {/* console.log(obj); */}
          return <mesh key={obj.uuid} geometry={obj.geometry} material={obj.material}></mesh>;
        })}
    </group>
  );
};

export default Desk;

// <mesh>
//   <hemisphereLight intensity={0.15} groundColor='black' />
//   <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
//   <pointLight intensity={1} />
//   <primitive
//     object={computer.scene}
//     scale={isMobile ? 0.4 : 0.6}
//     position={isMobile ? [0, -3, -2.2] : [0, -3.25, 0]}
//     rotation={[0, 0.15, 0]}
//   />
// </mesh>
// <mesh>{/* <primitive object={desk.scene}></primitive> */}</mesh>;
