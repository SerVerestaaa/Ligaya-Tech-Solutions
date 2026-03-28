'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useSectionScroll } from '../context/SectionScrollContext'
import { useBookingModal } from '../context/BookingModalContext'
import { btnMotion, fadeUp, stagger, subtleLift } from '../utils/animations'

/** WebGL hero — client-only (no SSR) so Three.js stays out of the server bundle. */
const HeroCanvas = dynamic(() => import('./three/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 65% 40%, rgba(123,47,255,0.2), transparent), radial-gradient(ellipse 50% 45% at 30% 60%, rgba(0,212,255,0.12), transparent), #03020F',
      }}
    />
  ),
})

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function Main() {
  const scrollTo = useSectionScroll()
  const { openBooking } = useBookingModal()
  const [quality, setQuality] = useState('high')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (max-height: 640px)')
    const apply = () => setQuality(mq.matches ? 'low' : 'high')
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallaxX = useSpring(mx, { stiffness: 28, damping: 26 })
  const parallaxY = useSpring(my, { stiffness: 28, damping: 26 })

  const onMouseMove = useCallback(
    (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const w = window.innerWidth
      const h = window.innerHeight
      mx.set((e.clientX / w - 0.5) * 18)
      my.set((e.clientY / h - 0.5) * 12)
    },
    [mx, my],
  )

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-[5.5rem]"
      onMouseMove={onMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <HeroCanvas quality={quality} />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            /* Soft cap on the cyan core so it never reads "white-hot" through bloom */
            'radial-gradient(ellipse 42% 48% at 52% 46%, rgba(3,2,15,0.38) 0%, rgba(3,2,15,0.08) 38%, transparent 62%)',
            'radial-gradient(ellipse 55% 65% at 50% 50%, transparent 26%, rgba(3,2,15,0.72) 78%, rgba(3,2,15,0.98) 100%)',
          ].join(', '),
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-44 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #03020F)' }}
      />

      {/* Accent beams - depth without extra WebGL */}
      <div
        className="absolute top-1/4 -right-32 w-[min(55vw,520px)] h-[120%] z-[2] pointer-events-none opacity-28 blur-3xl rotate-12"
        style={{
          background: 'linear-gradient(180deg, rgba(0,212,255,0.1), transparent 55%, rgba(123,47,255,0.08))',
        }}
      />

      {/* Wide shell + 12-col grid: left | empty center (orb) | right - keeps the 3D focal point clear */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 pt-24 sm:pt-28 pb-16 sm:pb-20 min-w-0">
        <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-x-2 gap-y-14 xl:gap-y-0 items-center min-w-0">
          <motion.div
            className="xl:col-span-5 xl:col-start-1 max-w-xl xl:max-w-none w-full min-w-0 will-change-transform"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <span className="section-tag">Ligaya Technology Solutions</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="section-title mt-4 mb-6">
                Simplifying <span className="text-gradient">Tech</span>,
                <br />
                Amplifying <span className="text-gradient">Joy!</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
              >
                Websites, systems, POS, thesis work, and bespoke business software - delivered with
                the rigor of an elite product team and the craft of a design-led studio.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-row flex-wrap gap-2.5 sm:gap-3 md:gap-4 items-center min-w-0 w-full"
              >
                <motion.button
                  type="button"
                  className="btn-primary shrink-0 whitespace-nowrap text-[13px] py-2.5 px-4"
                  onClick={() => scrollTo('#contact')}
                  {...btnMotion}
                >
                  Get Started
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path
                      d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-outline shrink-0 whitespace-nowrap text-[13px] py-2.5 px-3 sm:px-4"
                  onClick={() => openBooking()}
                  {...subtleLift}
                >
                  Book strategy call
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-outline border-white/10 text-white/55 shrink-0 whitespace-nowrap text-[13px] py-2.5 px-3 sm:px-4"
                  onClick={() => scrollTo('#portfolio')}
                  {...subtleLift}
                >
                  View selected work
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  variants={stagger(0.12)}
                  className="flex flex-row flex-nowrap gap-6 sm:gap-8 md:gap-10 mt-14 pt-8 border-t border-white/[0.07]"
                >
                  {[
                    { value: '150+', label: 'Projects delivered' },
                    { value: '98%', label: 'On-time delivery' },
                    { value: '5★', label: 'Client satisfaction' },
                  ].map(({ value, label }) => (
                    <motion.div key={label} variants={fadeUp} className="flex flex-col gap-1 shrink-0">
                      <span
                        className="font-display text-3xl text-gradient-cyan"
                        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                      >
                        {value}
                      </span>
                      <span className="font-mono text-xs text-white/40 tracking-wider uppercase">{label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Deliberate empty lane so the hero WebGL orb reads in the center on large screens */}
          <div className="hidden xl:block xl:col-span-3 min-h-[min(60vh,520px)] pointer-events-none" aria-hidden />

          {/* Right column: capability card */}
          <motion.div
            className="hidden xl:flex xl:col-span-4 xl:col-start-9 flex-col justify-center w-full justify-self-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] } }}
          >
            <motion.div
              className="glass-bright rounded-2xl p-7 lg:p-8 border border-white/[0.08] shadow-glass relative overflow-hidden w-full max-w-[20rem] ml-auto"
              whileHover={{
                y: -6,
                boxShadow: '0 28px 80px rgba(0,0,0,0.55), 0 0 40px rgba(0,212,255,0.12)',
                transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
              }}
            >
              <div
                className="absolute -top-20 right-0 w-40 h-40 rounded-full opacity-50 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent)' }}
              />
              <p className="font-mono text-[10px] text-cyan/80 tracking-[0.25em] uppercase mb-4 relative">
                Capability stack
              </p>
              <p
                className="font-display text-2xl text-white leading-snug mb-6 relative"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                From first sketch to production - one accountable partner.
              </p>
              <ul className="space-y-3 relative">
                {['Web & app platforms', 'Internal systems & APIs', 'Retail / F&B POS', 'Academic R&D support'].map(
                  (line) => (
                    <li key={line} className="flex items-center gap-3 text-white/55 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan to-purple shrink-0" />
                      {line}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.6 } }}
      >
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-cyan/60 to-transparent"
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
