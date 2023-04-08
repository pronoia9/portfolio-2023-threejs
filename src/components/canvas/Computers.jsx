import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./room/scene.gltf');

  return (
    <mesh>
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.9}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, 0]}
        rotation={[0, 0.2, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
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

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ camera, gl, scene }) => {
        // gl.setPixelRatio(window.devicePixelRatio);
        // gl.outputEncoding = sRGBEncoding;
        gl.physicallyCorrectLights = true;
        gl.shadowMap.enabled = true;
        // gl.shadowMap.type = PCFSoftShadowMap;
        // gl.toneMapping = ACESFilmicToneMapping;
        // console.log({ camera });
        // const yAxis = new Vector3(0, 1, 0);
        // const xAxis = new Vector3(1, 0, 0);
        // camera.setRotationFromAxisAngle(yAxis, 60);
        // camera.lookAt([0, -50, 0]);
        // // camera.rotateY(Math.PI);
        // camera.updateProjectionMatrix();
      }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
