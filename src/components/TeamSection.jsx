'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const team = [
  {
    name: 'Francis "Pope" Erick Datu',
    role: 'Chief Executive Officer',
    focus: 'Strategy, partnerships, delivery standards',
  },
  {
    name: 'James Daniel Sibug',
    role: 'Lead Engineer',
    focus: 'Full-stack systems, architecture, code quality',
  },
  {
    name: 'Remiel Baking',
    role: 'Client Success & Operations',
    focus: 'Timelines, communication, thesis & capstone coordination',
  },
]

export default function TeamSection() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section id="team" className="relative py-16 md:py-20 overflow-hidden border-y border-white/[0.05] bg-deep/30 scroll-mt-[5.5rem]">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={stagger(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="section-tag justify-center inline-flex mx-auto">People</span>
            <h2 className="section-title mt-3 mb-4">
              The team behind <span className="text-gradient">Ligaya</span>
            </h2>
            <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
              A small, senior-led group — we stay close to your build so decisions stay fast and outcomes stay accountable.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="glass rounded-2xl p-6 text-left border border-white/[0.06] hover:border-white/10 transition-colors"
              >
                <p
                  className="font-display font-700 text-lg text-white mb-1"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                >
                  {m.name}
                </p>
                <p className="font-mono text-[10px] text-cyan/70 tracking-widest uppercase mb-3">{m.role}</p>
                <p className="text-white/45 text-sm leading-relaxed">{m.focus}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
