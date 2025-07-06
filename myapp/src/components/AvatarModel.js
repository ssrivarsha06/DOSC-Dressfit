import React from "react";
import { useGLTF } from "@react-three/drei";

const AvatarModel = ({ scale = [1, 1, 1], position = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models/Bodymesh.glb");
  return <primitive object={scene} scale={scale} position={position} />;
};

export default AvatarModel;
