'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const logos = [
  'Autosonic Car Accessories',
  'Pampanga State University',
  'SpiceRoute Group',
  'ClearPath BPO',
  'Bayking Law Partners',
  'Aether Retail',
]
const industries = ['Retail & e‑commerce', 'F&B & hospitality', 'BPO & HR', 'Education & research', 'Legal & professional']
const badges = ['NDA-First Workflow', 'Security-First Delivery', 'Weekly Demo Rhythm', 'Dedicated PM']

export default function TrustSignals() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section ref={ref} className="relative py-10 border-y border-white/[0.06] bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <motion.div variants={fadeUp}>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan/70 mb-3">
              Trusted by founders and operators
            </p>
            <div className="flex flex-wrap gap-3">
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="px-3 py-1.5 rounded-full text-white/55 text-xs border border-white/[0.09] bg-white/[0.02]"
                >
                  {logo}
                </span>
              ))}
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/35 mt-4 mb-2">Industries we serve</p>
            <p className="text-[11px] sm:text-xs text-white/45 leading-relaxed max-w-xl">{industries.join(' · ')}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 lg:justify-end">
            {badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-2 rounded-full glass-bright text-white/70"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

