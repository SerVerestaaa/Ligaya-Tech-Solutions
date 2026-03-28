'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSectionScroll } from '../context/SectionScrollContext'
import { useBookingModal } from '../context/BookingModalContext'
import { btnMotion, fadeUp, stagger, subtleLift, viewportOnce } from '../utils/animations'
import CtaLaptopScene from './three/CtaLaptopScene'

const ctaBadges = [
  '🏆 Award-Winning Quality',
  '⚡ Fast Delivery',
  '🔒 Secure & Scalable',
  '💬 Responsive Support',
]

export default function CTA() {
  const [ref, inView] = useInView(viewportOnce)
  const scrollTo = useSectionScroll()
  const { openBooking } = useBookingModal()

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Full-bleed gradient card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(123,47,255,0.12) 50%, rgba(255,47,187,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.7 } } : {}}
        >
          {/* Grid + scanline texture */}
          <div className="absolute inset-0 grid-bg opacity-35" />
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)',
            }}
          />

          {/* Soft color behind 3D — keep subtle so WebGL carries the depth */}
          <div
            className="absolute -top-16 right-[8%] w-[min(72%,360px)] aspect-square pointer-events-none opacity-55 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,255,0.14), transparent 68%)',
              filter: 'blur(18px)',
            }}
          />
          <div
            className="absolute bottom-[12%] right-[20%] w-[min(50%,220px)] aspect-square pointer-events-none opacity-45 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,47,187,0.1), transparent 70%)',
              filter: 'blur(16px)',
            }}
          />

          {/* 3D gaming laptop — draggable orbit; large frame fills the card */}
          <div
            className="absolute inset-y-0 right-0 w-[min(92vw,100%)] sm:w-[min(88%,620px)] lg:w-[min(62%,680px)] xl:w-[min(58%,720px)] min-h-[300px] sm:min-h-[380px] z-0 touch-none"
            data-lenis-prevent
          >
            <Suspense fallback={null}>
              <Canvas
                className="!absolute inset-0 !h-full !w-full min-h-[300px] sm:min-h-[380px]"
                camera={{ position: [3.6, 2.15, 5.25], fov: 42 }}
                dpr={[1, 1.75]}
                gl={{
                  alpha: true,
                  antialias: true,
                  powerPreference: 'high-performance',
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.05,
                }}
              >
                <CtaLaptopScene />
              </Canvas>
            </Suspense>
            <p className="pointer-events-none absolute bottom-3 right-4 z-[2] font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/35 hidden sm:block">
              Drag to rotate
            </p>
          </div>

          {/* Fade text over 3D edge */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[min(100%,58%)] md:w-[50%] lg:w-[46%] z-[1] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(3,2,15,1) 4%, rgba(3,2,15,0.94) 38%, rgba(3,2,15,0.2) 82%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 w-full min-w-0 px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20 max-w-2xl">
            <motion.div
              variants={stagger()}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.span variants={fadeUp} className="section-tag">
                Ready to Build?
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="section-title mt-3 mb-5"
              >
                Let's Create Something{' '}
                <span className="text-gradient">Extraordinary</span>{' '}
                Together
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed mb-8"
              >
                Whether you have a clear vision or just a rough idea — we'll help you shape it
                into something remarkable. Your first consultation is completely free.
              </motion.p>

              {/* Badges */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 mb-10"
              >
                {ctaBadges.map(b => (
                  <span
                    key={b}
                    className="font-mono text-xs text-white/60 px-3 py-1.5 rounded-full glass-bright"
                  >
                    {b}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <motion.button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollTo('#contact')}
                  {...btnMotion}
                >
                  Start Your Project
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-outline"
                  onClick={() => openBooking()}
                  {...subtleLift}
                >
                  Book Strategy Call
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-outline border-white/10 text-white/55"
                  onClick={() => scrollTo('#portfolio')}
                  {...subtleLift}
                >
                  See Our Work First
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
