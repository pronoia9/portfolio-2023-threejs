import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';
import { useControls, folder } from 'leva';

import CanvasLoader from '../Loader';
import Desk from './desk/Desk';

const DeskCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const steps = { min: -10, max: 10, step: 0.001 };
  const cameraValues = useControls('Camera', {
    fov: { value: 25, min: 0, max: 100 },
    position: folder(
      { camPosX: { value: 0, ...steps }, camPosY: { value: 0, ...steps }, camPosZ: { value: 25, ...steps } },
      { collapsed: true }
    ),
    rotation: folder(
      {
        camRotX: { value: 54.4696, ...steps },
        camRotY: { value: 58.2668, ...steps },
        camRotZ: { value: 0.000035, ...steps },
      },
      { collapsed: true }
    ),
  });

  const sceneValues = useControls('Scene', {
    position: folder(
      {
        scenePosX: { value: 0, ...steps },
        scenePosY: { value: isMobile ? -3 : -3.25, ...steps },
        scenePosZ: { value: isMobile ? -2.2 : 0, ...steps },
      },
      { collapsed: true }
    ),
    rotation: folder(
      { sceneRotX: { value: 1.65, ...steps }, sceneRotY: { value: 0, ...steps }, sceneRotZ: { value: -0.25, ...steps } },
      { collapsed: true }
    ),
    sceneScale: { value: isMobile ? 0.25 : 0.5, ...steps },
  });

  return (
    <>
      <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 2]}
        camera={{ fov: cameraValues.fov, position: [cameraValues.camPosX, cameraValues.camPosY, cameraValues.camPosZ] }}
        gl={{ preserveDrawingBuffer: true }}>
        <axesHelper args={[2, 2, 2]} />
        <Suspense fallback={<CanvasLoader />}>
          {/* Controls */}
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />

          {/* Lights */}
          <hemisphereLight intensity={0.15} groundColor='black' />
          <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
          <pointLight intensity={1} />

          {/* Scene */}
          <group
            position={[sceneValues.scenePosX, sceneValues.scenePosY, sceneValues.scenePosZ]}
            rotation={[sceneValues.sceneRotX, sceneValues.sceneRotY, sceneValues.sceneRotZ]}
            scale={sceneValues.sceneScale}>
            {/* Desk */}
            <Desk isMobile={isMobile} />
          </group>

          {/* Postrocessing */}
          {/* <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
          </EffectComposer> */}
        </Suspense>
        <Preload all />
      </Canvas>
    </>
  );
};

export default DeskCanvas;

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
