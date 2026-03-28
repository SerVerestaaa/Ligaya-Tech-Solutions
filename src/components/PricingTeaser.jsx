'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useBookingModal } from '../context/BookingModalContext'
import { btnMotion, fadeUp, stagger, viewportOnce } from '../utils/animations'

const pricingModels = [
  {
    name: 'Project-based',
    blurb: 'Fixed scope and milestones after discovery — ideal when outcomes are well defined.',
    hint: 'Typical for websites, MVPs, and scoped systems.',
  },
  {
    name: 'Phased delivery',
    blurb: 'Roadmap split into paid phases so you can validate before scaling investment.',
    hint: 'Common for larger apps and multi-site rollouts.',
  },
  {
    name: 'Retainer & care',
    blurb: 'Ongoing improvements, monitoring, and priority response after launch.',
    hint: 'Best when uptime and iteration matter day-to-day.',
  },
]

export default function PricingTeaser() {
  const [ref, inView] = useInView(viewportOnce)
  const { openBooking } = useBookingModal()

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="orb w-[420px] h-[420px] bg-purple/8 -left-32 top-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={stagger(0.06)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Engagement
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-4">
            Ways we can <span className="text-gradient">work together</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto">
            Exact numbers depend on scope — we quote in writing after a short discovery. Here is how engagements usually
            take shape.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {pricingModels.map(({ name, blurb, hint }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="glass rounded-2xl p-7 border border-white/[0.08] flex flex-col"
            >
              <h3
                className="font-display font-700 text-xl text-white mb-3"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                {name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">{blurb}</p>
              <p className="font-mono text-[10px] text-white/35 tracking-wide uppercase">{hint}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center">
          <motion.button type="button" className="btn-primary" onClick={() => openBooking()} {...btnMotion}>
            Discuss your project
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
