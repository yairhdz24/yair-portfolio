"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SmallPrism({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.position.x += (mouse.x * 1.2 - meshRef.current.position.x) * 0.015;
    meshRef.current.position.y += (-mouse.y * 1.2 - meshRef.current.position.y) * 0.015;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.1} position={[1.5, -0.5, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.08} roughness={0.3} metalness={0.8} wireframe distort={0.15} speed={1.5} transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

function InnerGem() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= delta * 0.06;
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.6} position={[1.5, -0.5, 0]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.1} transparent opacity={0.08} wireframe />
    </mesh>
  );
}

export default function FloatingShape() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ pointerEvents: "auto" }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFFFFF" />
        <pointLight position={[-10, -5, 5]} intensity={0.25} color="#AAAAAA" />
        <SmallPrism mouse={mouse} />
        <InnerGem />
      </Canvas>
    </div>
  );
}
