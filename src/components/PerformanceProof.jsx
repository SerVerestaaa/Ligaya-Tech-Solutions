'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

function CountUp({ to, suffix = '' }) {
  const [value, setValue] = useState(0)
  const [ref, inView] = useInView(viewportOnce)

  useEffect(() => {
    if (!inView) return
    const duration = 1100
    const start = performance.now()
    let raf = 0

    const tick = (time) => {
      const p = Math.min(1, (time - start) / duration)
      setValue(Math.floor(to * p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="text-gradient-cyan">
      {value}
      {suffix}
    </span>
  )
}

const metrics = [
  { label: 'Avg. Revenue Growth', value: 147, suffix: '%' },
  { label: 'Delivery Predictability', value: 98, suffix: '%' },
  { label: 'Process Time Reduction', value: 63, suffix: '%' },
]

export default function PerformanceProof() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-cyan/8 -left-32 top-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Measurable Impact
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            Results Investors and Clients
            <br />
            Can <span className="text-gradient">Actually Measure</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="glass rounded-2xl p-7 text-center">
              <p
                className="font-display text-5xl mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                <CountUp to={m.value} suffix={m.suffix} />
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/45">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="glass-bright rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl border border-cyan/20 bg-cyan/5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Problem</p>
              <p className="text-white/65 text-sm">Manual operations, disconnected tools, and slow handoffs blocking growth.</p>
            </div>
            <div className="p-4 rounded-xl border border-purple/20 bg-purple/5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-purple-300 mb-2">Solution</p>
              <p className="text-white/65 text-sm">Unified systems, clean UX, and automation pipelines tailored to business flow.</p>
            </div>
            <div className="p-4 rounded-xl border border-pink/20 bg-pink/5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-pink-300 mb-2">Result</p>
              <p className="text-white/65 text-sm">Higher revenue velocity, lower operational friction, and stronger customer experience.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

