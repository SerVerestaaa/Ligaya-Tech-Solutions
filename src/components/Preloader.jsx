'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const preloaderPhases = [
  { id: 'signal', label: 'Establishing secure signal' },
  { id: 'canvas', label: 'Priming immersive canvas' },
  { id: 'systems', label: 'Syncing product systems' },
  { id: 'polish', label: 'Applying final polish' },
]

/**
 * Multi-step boot sequence — calls onComplete when the timeline finishes.
 */
export default function Preloader({ onComplete }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const stepMs = 720
    const timers = preloaderPhases.map((_, i) =>
      setTimeout(() => setActive(i), i * stepMs),
    )
    const done = setTimeout(() => onComplete?.(), preloaderPhases.length * stepMs + 520)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
  }, [onComplete])

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        clipPath: 'inset(0 0 100% 0)',
        filter: 'blur(12px)',
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div
        className="orb w-96 h-96 bg-purple/30 top-1/4 left-1/4"
        style={{ position: 'absolute' }}
      />
      <div
        className="orb w-72 h-72 bg-cyan/20 bottom-1/4 right-1/4"
        style={{ position: 'absolute' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-md px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.55 } }}
      >
        <div className="relative">
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <polygon
              points="36,4 64,20 64,52 36,68 8,52 8,20"
              fill="none"
              stroke="url(#preload-grad)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="preload-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#7B2FFF" />
              </linearGradient>
            </defs>
          </motion.svg>
          <span
            className="absolute inset-0 flex items-center justify-center font-display font-800 text-xl text-white"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            L
          </span>
        </div>

        <div className="text-center w-full">
          <p className="font-display text-white text-2xl font-bold tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
            LIGAYA
          </p>
          <p className="font-mono text-cyan/60 text-xs tracking-[0.3em] uppercase mt-1">Technology Solutions</p>
        </div>

        <div className="w-full space-y-3">
          {preloaderPhases.map((phase, i) => {
            const done = i < active
            const current = i === active
            return (
              <div key={phase.id} className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                    done ? 'bg-cyan shadow-glow-cyan scale-110' : current ? 'bg-purple animate-pulse' : 'bg-white/15'
                  }`}
                />
                <span
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors ${
                    done || current ? 'text-white/80' : 'text-white/25'
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan to-purple rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%', transition: { duration: 3.35, ease: 'easeInOut' } }}
          />
        </div>

        <p className="font-mono text-white/30 text-[10px] tracking-[0.35em] uppercase">Boot sequence</p>
      </motion.div>
    </motion.div>
  )
}
