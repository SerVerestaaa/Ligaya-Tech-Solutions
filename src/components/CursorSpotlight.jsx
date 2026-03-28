'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 38, stiffness: 130 })
  const sy = useSpring(y, { damping: 38, stiffness: 130 })
  const tx = useTransform(sx, (v) => `${v}px`)
  const ty = useTransform(sy, (v) => `${v}px`)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[3] w-[42rem] h-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: tx,
        top: ty,
        background: 'radial-gradient(circle, rgba(0,212,255,0.1), rgba(123,47,255,0.04) 40%, transparent 70%)',
        filter: 'blur(18px)',
      }}
      aria-hidden
    />
  )
}

