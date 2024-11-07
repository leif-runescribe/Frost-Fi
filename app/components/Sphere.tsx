// InteractiveSharpTorus.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Create the animated sharp torus knot component
const AnimatedSharpTorus: React.FC = () => {
  const shapeRef = useRef<THREE.Mesh>(null);

  // Load a texture for the torus knot
  const texture = useLoader(TextureLoader, '/f.avif'); // Replace with your texture path

  // Animate the shape based on cursor position
  const handleMouseMove = (event: MouseEvent) => {
    if (shapeRef.current) {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1
      const y = -(clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1
      shapeRef.current.rotation.x = y * 0.3*Math.PI; // Rotate shape on Y-axis based on cursor
      shapeRef.current.rotation.y = x * 0.3*Math.PI; // Rotate shape on X-axis based on cursor
    }
  };

  // Use frame to rotate the shape continuously
  useFrame(() => {
    if (shapeRef.current) {
      shapeRef.current.rotation.y += 0.005;
      shapeRef.current.rotation.x += 0.005; // Spin the shape
    }
  });

  // Add event listener for mouse move
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Create the geometry directly
  const geometry = new THREE.TorusKnotGeometry(0.7, 1.7, 28, 5);

  return (
    <mesh ref={shapeRef} geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial map={texture} roughness={0.} metalness={0.8} />
    </mesh>
  );
};

// Define the main component that contains the Canvas
const InteractiveSharpTorusComponent: React.FC = () => {
  return (
    <Canvas
      style={{ height: '600px' }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows // Enable shadows for the canvas
    >
      <ambientLight intensity={90} />
      <directionalLight position={[5, 5, 5]} intensity={200} castShadow />
      <AnimatedSharpTorus />
    </Canvas>
  );
};

export default InteractiveSharpTorusComponent;
