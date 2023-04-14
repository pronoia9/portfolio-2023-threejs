import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF, MeshWobbleMaterial, useMatcapTexture } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const Desk = () => {
  const file = useGLTF('./desk/desk.glb');

  return (
    <group>
      {file.nodes.Desk.children
        .filter((child) => child.name.includes('Desk'))
        .map((obj) => (<mesh key={obj.uuid} geometry={obj.geometry} material={obj.material}></mesh>))}
    </group>
  );
};

export default Desk;
