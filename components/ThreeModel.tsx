'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function ThreeModel() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={false} />
        <mesh rotation={[0.3, 0.3, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#00ffd5" metalness={0.7} roughness={0.1} />
        </mesh>
      </Canvas>
    </div>
  );
}
