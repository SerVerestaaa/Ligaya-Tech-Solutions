'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Goals, users, constraints, and success metrics.' },
  { step: '02', title: 'Blueprint', desc: 'Architecture, scope, milestones, and written estimate.' },
  { step: '03', title: 'Build', desc: 'Sprints with demos, reviews, and visible progress.' },
  { step: '04', title: 'Launch & scale', desc: 'QA, deployment, handover, and optional care.' },
]

export default function ProcessStrip() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section ref={ref} className="relative py-14 md:py-16 lg:py-20 border-y border-white/[0.06] bg-deep/50 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            How we work
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-4">
            From first call to <span className="text-gradient">launch</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto">
            A clear rhythm so you always know what happens next — no black-box delivery.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map(({ step, title, desc }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="glass rounded-2xl p-6 border border-white/[0.07] text-left"
            >
              <p className="font-mono text-cyan/80 text-xs tracking-widest mb-2">{step}</p>
              <h3
                className="font-display font-700 text-lg text-white mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
