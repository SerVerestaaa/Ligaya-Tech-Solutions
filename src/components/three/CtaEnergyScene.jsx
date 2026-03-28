'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, Environment, RoundedBox } from '@react-three/drei'

const phys = {
  metalness: 0.92,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.15,
}

/**
 * Crisp “product render” style — no MeshDistort blob.
 * Reads as separate metallic forms with real highlights instead of a flat purple mass.
 */
function TechOrbit() {
  const root = useRef()

  useFrame(({ clock }) => {
    if (!root.current) return
    const t = clock.getElapsedTime()
    root.current.rotation.y = t * 0.095
    root.current.rotation.x = Math.sin(t * 0.18) * 0.06
  })

  return (
    <group ref={root}>
      {/* Hero ring — thin, reads as 3D torus not a solid blob */}
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh rotation={[1.1, 0.35, 0.2]}>
          <torusGeometry args={[1.12, 0.042, 14, 96]} />
          <meshPhysicalMaterial
            color="#12101f"
            emissive="#00D4FF"
            emissiveIntensity={0.06}
            {...phys}
          />
        </mesh>
      </Float>

      <mesh rotation={[0.2, 0.85, -0.45]}>
        <torusGeometry args={[0.72, 0.022, 12, 72]} />
        <meshPhysicalMaterial
          color="#151228"
          emissive="#7B2FFF"
          emissiveIntensity={0.07}
          {...phys}
        />
      </mesh>

      {/* Center “core” — faceted box, breaks up silhouette */}
      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.5}>
        <RoundedBox args={[0.38, 0.38, 0.38]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#0a0818"
            emissive="#FF2FBB"
            emissiveIntensity={0.04}
            {...phys}
            roughness={0.14}
          />
        </RoundedBox>
      </Float>

      {/* Accent — small sharp crystal, not a big smear */}
      <mesh position={[0.85, 0.55, 0.35]} rotation={[0.4, 0.2, 0.3]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#0d1820"
          emissive="#00D4FF"
          emissiveIntensity={0.12}
          metalness={0.95}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.3}
        />
      </mesh>

      <mesh position={[-0.75, -0.45, 0.15]} rotation={[-0.15, 0.5, 0.2]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshPhysicalMaterial
          color="#140a14"
          emissive="#FF2FBB"
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.15}
        />
      </mesh>

      {/* Mint accent bar — deliberate product-detail feel */}
      <mesh position={[0.35, -0.72, -0.08]} rotation={[0.25, -0.2, 0.35]}>
        <boxGeometry args={[0.55, 0.055, 0.13]} />
        <meshPhysicalMaterial
          color="#061210"
          emissive="#00FFB2"
          emissiveIntensity={0.05}
          {...phys}
          roughness={0.28}
        />
      </mesh>

      {/* Subtle wire — low opacity, not the main read */}
      <mesh rotation={[0.35, 0.5, -0.1]} scale={1.22}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function CtaEnergyScene() {
  return (
    <>
      <Environment preset="city" environmentIntensity={0.55} blur={0.65} />

      <ambientLight intensity={0.12} />
      <hemisphereLight intensity={0.35} groundColor="#12081a" color="#1a2035" />

      <directionalLight position={[-5, 4, 6]} intensity={1.35} color="#c8f4ff" />
      <directionalLight position={[5, -1, 4]} intensity={0.55} color="#f0a8ff" />
      <directionalLight position={[0, -3, -8]} intensity={0.45} color="#7B2FFF" />

      <pointLight position={[2.5, 2.5, 3]} intensity={6} color="#00D4FF" distance={10} decay={2} />
      <pointLight position={[-2, -1.5, 2]} intensity={4} color="#FF2FBB" distance={9} decay={2} />

      <TechOrbit />
    </>
  )
}
