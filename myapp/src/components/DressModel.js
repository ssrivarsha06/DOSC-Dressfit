import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const DressModel = ({ url, scale, position, color = "hotpink" }) => {
  const { scene } = useGLTF(url);

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
  }, [scene, color]);

  return <primitive object={scene} scale={scale} position={position} />;
};

export default DressModel;
