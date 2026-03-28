'use client'

import { useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Environment, OrbitControls, RoundedBox, useTexture } from '@react-three/drei'

const metal = {
  metalness: 0.9,
  roughness: 0.26,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  envMapIntensity: 1.05,
}

/**
 * Stylized gaming laptop for the “Ready to build” CTA — auto-orbit + drag to orbit (OrbitControls).
 */
const SCREEN_TEXTURE_URL = '/cta-laptop-screen.png'

function GamingLaptop() {
  const screenMap = useTexture(SCREEN_TEXTURE_URL)
  useLayoutEffect(() => {
    screenMap.colorSpace = THREE.SRGBColorSpace
    screenMap.anisotropy = Math.min(8, typeof window !== 'undefined' ? window.devicePixelRatio * 4 : 8)
    screenMap.needsUpdate = true
  }, [screenMap])

  return (
    <group rotation={[0.05, -0.42, 0]} scale={1.08}>
      {/* Base / chassis */}
      <RoundedBox args={[2.5, 0.17, 1.72]} radius={0.055} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial color="#0a0a14" {...metal} />
      </RoundedBox>

      {/* Front RGB strip */}
      <mesh position={[0, -0.02, 0.875]}>
        <boxGeometry args={[2.15, 0.028, 0.045]} />
        <meshPhysicalMaterial
          color="#001820"
          emissive="#00D4FF"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[-0.45, -0.02, 0.876]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.026, 0.042]} />
        <meshPhysicalMaterial
          color="#180818"
          emissive="#FF2FBB"
          emissiveIntensity={0.55}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.52, -0.02, 0.876]}>
        <boxGeometry args={[0.5, 0.026, 0.042]} />
        <meshPhysicalMaterial
          color="#100818"
          emissive="#7B2FFF"
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>

      {/* Keyboard deck */}
      <mesh position={[0, 0.087, 0.04]} rotation={[-0.035, 0, 0]}>
        <boxGeometry args={[2.18, 0.019, 1.22]} />
        <meshStandardMaterial color="#06060d" roughness={0.55} metalness={0.75} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.096, 0.52]}>
        <boxGeometry args={[0.85, 0.012, 0.45]} />
        <meshPhysicalMaterial color="#111118" metalness={0.85} roughness={0.22} clearcoat={0.8} envMapIntensity={0.9} />
      </mesh>

      {/* Screen pivot — back edge of base */}
      <group position={[0, 0.085, -0.86]} rotation={[0.52, 0, 0]}>
        {/* Lid bezel */}
        <RoundedBox
          args={[2.42, 1.34, 0.07]}
          radius={0.025}
          smoothness={3}
          position={[0, 0.67, 0]}
        >
          <meshPhysicalMaterial color="#05050a" {...metal} roughness={0.35} />
        </RoundedBox>
        {/* Display — wallpaper / texture */}
        <mesh position={[0, 0.67, 0.038]}>
          <planeGeometry args={[2.12, 1.08]} />
          <meshStandardMaterial
            map={screenMap}
            color="#ffffff"
            roughness={0.32}
            metalness={0.04}
            emissive="#ffffff"
            emissiveMap={screenMap}
            emissiveIntensity={0.18}
            toneMapped
            envMapIntensity={0.35}
          />
        </mesh>
        {/* Subtle inner glow frame */}
        <mesh position={[0, 0.67, 0.041]}>
          <planeGeometry args={[2.18, 1.14]} />
          <meshBasicMaterial
            color="#7B2FFF"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Corner vent accents */}
      <mesh position={[-1.18, 0, -0.72]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.09, 0.11, 0.22]} />
        <meshPhysicalMaterial color="#121018" {...metal} roughness={0.45} />
      </mesh>
      <mesh position={[1.18, 0, -0.72]} rotation={[0, -0.35, 0]}>
        <boxGeometry args={[0.09, 0.11, 0.22]} />
        <meshPhysicalMaterial color="#121018" {...metal} roughness={0.45} />
      </mesh>
    </group>
  )
}

export default function CtaLaptopScene() {
  return (
    <>
      <Environment preset="city" environmentIntensity={0.5} blur={0.7} />

      <ambientLight intensity={0.08} />
      <hemisphereLight intensity={0.32} groundColor="#0a0814" color="#203044" />
      <directionalLight position={[-4, 6, 5]} intensity={1.25} color="#d5f4ff" />
      <directionalLight position={[4, 2, -3]} intensity={0.5} color="#c8a8ff" />
      <pointLight position={[2, 3, 3]} intensity={5} color="#00D4FF" distance={14} decay={2} />
      <pointLight position={[-2.5, -0.5, 2]} intensity={3.5} color="#FF2FBB" distance={12} decay={2} />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.58}
        minDistance={2.85}
        maxDistance={7.5}
        target={[0, 0.2, 0]}
        rotateSpeed={0.65}
        zoomSpeed={0.55}
      />

      <GamingLaptop />
    </>
  )
}
