'use client'

/** Infinite scrolling marquee of service keywords */
import { motion } from 'framer-motion'

const marqueeItems = [
  'Web Development',
  '·',
  'System Solutions',
  '·',
  'POS Systems',
  '·',
  'Thesis & Capstone',
  '·',
  'Business Automation',
  '·',
  'Custom Software',
  '·',
  'UI / UX Design',
  '·',
  'Tech Consulting',
  '·',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <motion.div
      className="relative py-4 overflow-hidden border-y border-white/[0.06] bg-surface/40"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #03020F, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #03020F, transparent)' }}
      />

      <div className="marquee-container">
        <div className="marquee-inner">
          {items.map((item, i) => (
            <span
              key={i}
              className={`inline-block mx-4 font-mono text-sm tracking-widest uppercase ${
                item === '·' ? 'text-cyan' : 'text-white/30'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
