'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, MeshDistortMaterial, Torus, Stars, Sparkles, Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

/** Distorted crystal core — reads stronger than a plain sphere */
function CrystalCore() {
  const meshRef = useRef()
  const wireRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12
      meshRef.current.rotation.y = t * 0.18
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * -0.08
      wireRef.current.rotation.z = t * 0.06
    }
  })
  return (
    <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.85}>
      <group ref={meshRef}>
        <mesh>
          <icosahedronGeometry args={[1.28, 1]} />
          <MeshDistortMaterial
            color="#06051c"
            emissive="#0a6b82"
            emissiveIntensity={0.11}
            roughness={0.22}
            metalness={0.88}
            distort={0.4}
            speed={2.2}
          />
        </mesh>
        <mesh ref={wireRef} scale={1.06}>
          <icosahedronGeometry args={[1.28, 1]} />
          <meshBasicMaterial
            color="#7B2FFF"
            wireframe
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitRing({ radius, tube, speed, tilt, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <Torus args={[radius, tube, 12, 64]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Torus>
    </mesh>
  )
}

function EnergyShard({ position, rotation, color, scale }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.31 + rotation[0]
    ref.current.rotation.y = t * 0.22 + rotation[1]
  })
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.22}
          metalness={0.88}
          roughness={0.22}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  )
}

function WireLattice({ position, color, scale = 1 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.15
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function ParticleField({ count, spread, color, size, speed }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    const tx = mouse.x * 0.55
    const ty = mouse.y * 0.35
    camera.position.x += (tx - camera.position.x) * 0.045
    camera.position.y += (ty - camera.position.y) * 0.045
    camera.lookAt(0, 0, 0)
  })
  return null
}

function SceneContent({ quality }) {
  const isLow = quality === 'low'
  const starCount = isLow ? 1200 : 4500
  const pCount = isLow ? 80 : 280

  return (
    <>
      <CameraRig />
      <color attach="background" args={['#03020f']} />

      <ambientLight intensity={0.22} />
      <spotLight
        position={[8, 10, 6]}
        angle={0.38}
        penumbra={0.88}
        intensity={isLow ? 14 : 22}
        color="#7ec8d4"
        distance={45}
        decay={2}
      />
      <spotLight
        position={[-8, -6, 4]}
        angle={0.48}
        penumbra={1}
        intensity={isLow ? 11 : 18}
        color="#9b7fcf"
        distance={40}
        decay={2}
      />
      <pointLight position={[0, 5, -6]} color="#FF2FBB" intensity={isLow ? 0.35 : 0.55} distance={20} />

      <Stars radius={95} depth={60} count={starCount} factor={2.8} saturation={0.35} fade speed={0.55} />

      <Sparkles
        count={isLow ? 24 : 56}
        scale={14}
        size={1.2}
        speed={0.32}
        opacity={0.22}
        color="#00D4FF"
      />
      <Sparkles
        count={isLow ? 18 : 40}
        scale={12}
        size={1}
        speed={0.25}
        opacity={0.18}
        color="#FF2FBB"
      />

      <ParticleField count={pCount} spread={22} color="#00D4FF" size={0.038} speed={0.018} />
      <ParticleField count={Math.floor(pCount * 0.7)} spread={24} color="#7B2FFF" size={0.03} speed={-0.012} />
      <ParticleField count={Math.floor(pCount * 0.45)} spread={18} color="#FF2FBB" size={0.022} speed={0.009} />

      <CrystalCore />

      <OrbitRing radius={2.35} tube={0.014} speed={0.32} tilt={0.42} color="#00D4FF" />
      <OrbitRing radius={3.05} tube={0.011} speed={-0.22} tilt={0.95} color="#7B2FFF" />
      <OrbitRing radius={3.85} tube={0.009} speed={0.14} tilt={1.42} color="#FF2FBB" />
      <OrbitRing radius={4.55} tube={0.006} speed={0.09} tilt={2.1} color="#00FFB2" />

      <WireLattice position={[-5, 2.5, -4]} color="#00D4FF" scale={0.65} />
      <WireLattice position={[5.5, -2, -3]} color="#7B2FFF" scale={0.55} />

      {!isLow && (
        <>
          <EnergyShard position={[4.2, 2.1, -1.8]} rotation={[0.5, 0.2, 0]} color="#00D4FF" scale={0.22} />
          <EnergyShard position={[-4.6, 1.4, -0.5]} rotation={[0.8, 0.1, 0.3]} color="#7B2FFF" scale={0.19} />
          <EnergyShard position={[3.6, -2.8, 0.8]} rotation={[0.2, 0.6, 0.1]} color="#FF2FBB" scale={0.16} />
        </>
      )}
      <EnergyShard position={[-3.2, 3.4, -2.5]} rotation={[0.3, 0.4, 0]} color="#00FFB2" scale={0.14} />
      <EnergyShard position={[1.2, 4.1, -3]} rotation={[0.1, 0.9, 0.2]} color="#00D4FF" scale={0.12} />
    </>
  )
}

/**
 * Full-viewport WebGL layer for the hero. `quality` toggles density for smaller GPUs / phones.
 */
export default function HeroCanvas({ quality }) {
  const dpr = quality === 'low' ? [1, 1] : [1, 1.5]

  return (
    <Canvas
      camera={{ position: [0, 0.15, 7.2], fov: 52 }}
      dpr={dpr}
      gl={{
        antialias: quality !== 'low',
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.88,
      }}
      style={{ background: '#03020f' }}
    >
      <Suspense fallback={null}>
        <SceneContent quality={quality} />
        {quality !== 'low' && (
          <Effects disableGamma>
            <unrealBloomPass attachArray="passes" args={[undefined, 0.48, 0.36, 0.42]} />
          </Effects>
        )}
      </Suspense>
    </Canvas>
  )
}
