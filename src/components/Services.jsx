'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useBookingModal } from '../context/BookingModalContext'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const serviceList = [
  {
    id:    'web',
    icon:  '🌐',
    title: 'Website Development',
    tag:   'Full-Stack',
    desc:  'Stunning, high-performance websites that convert visitors into customers. From landing pages to complex web applications — pixel-perfect and blazing fast.',
    stack: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    color: '#00D4FF',
    glow:  'rgba(0,212,255,0.15)',
  },
  {
    id:    'system',
    icon:  '⚙️',
    title: 'System Development',
    tag:   'Enterprise',
    desc:  'Custom software systems designed for scale. Inventory management, HR systems, automation platforms — built with enterprise-grade architecture.',
    stack: ['Laravel', 'Python', 'PostgreSQL', 'REST API'],
    color: '#7B2FFF',
    glow:  'rgba(123,47,255,0.15)',
  },
  {
    id:    'pos',
    icon:  '🖥️',
    title: 'POS Systems',
    tag:   'Retail & F&B',
    desc:  'Modern point-of-sale solutions tailored for restaurants, retail, and service businesses. Real-time analytics, inventory sync, and seamless payment integration.',
    stack: ['React', 'Electron', 'SQLite', 'Cloud Sync'],
    color: '#FF2FBB',
    glow:  'rgba(255,47,187,0.15)',
  },
  {
    id:    'thesis',
    icon:  '🎓',
    title: 'Thesis & Capstone',
    tag:   'Academic',
    desc:  'Expert guidance and full development support for academic projects. We help students build systems that impress panels and get top marks.',
    stack: ['Analysis', 'Prototyping', 'Documentation', 'Defense Prep'],
    color: '#00FFB2',
    glow:  'rgba(0,255,178,0.12)',
  },
  {
    id:    'biz',
    icon:  '💼',
    title: 'Custom Business Solutions',
    tag:   'Tailored',
    desc:  'Every business is unique. We craft bespoke digital tools — dashboards, CRMs, booking systems, ERPs — engineered precisely for your workflow.',
    stack: ['Discovery', 'Architecture', 'Delivery', 'Support'],
    color: '#FFB800',
    glow:  'rgba(255,184,0,0.12)',
  },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const { icon, title, tag, desc, stack, color, glow } = service

  return (
    <motion.div
      className="service-card group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--card-glow': glow }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Glow backdrop on hover */}
      <motion.div
        className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
        style={{ background: glow }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{
            color,
            background: `${color}15`,
            border:     `1px solid ${color}25`,
          }}
        >
          {tag}
        </span>
      </div>

      <h3
        className="relative z-10 font-display font-700 text-xl text-white mb-3 leading-snug"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
      >
        {title}
      </h3>

      <p className="relative z-10 text-white/55 text-sm leading-relaxed mb-5">{desc}</p>

      {/* Stack chips */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {stack.map(item => (
          <span
            key={item}
            className="font-mono text-[10px] text-white/40 px-2 py-1 rounded bg-white/[0.05] border border-white/[0.07]"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Bottom arrow */}
      <motion.div
        className="relative z-10 mt-6 flex items-center gap-2 text-sm font-display font-600"
        style={{ color, fontFamily: 'Syne, sans-serif' }}
        animate={{ x: hovered ? 6 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Learn more
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const [ref, inView] = useInView(viewportOnce)
  const { openBooking } = useBookingModal()

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-28 bg-deep overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Orbs */}
      <div className="orb w-[500px] h-[500px] bg-cyan/8 -left-40 top-20" />
      <div className="orb w-[400px] h-[400px] bg-purple/10 right-0 bottom-0" />

      <div id="services" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">
        {/* Header */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            What We Do
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            Services Built for{' '}
            <span className="text-gradient">Real Impact</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            We don't offer generic solutions. Every service is crafted with precision,
            passion, and a deep understanding of your needs.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {serviceList.map((service, i) => (
            <motion.div key={service.id} variants={fadeUp}>
              <ServiceCard service={service} index={i} />
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            className="service-card flex flex-col items-center justify-center text-center p-8 hover:border-cyan/20"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(123,47,255,0.06))',
            }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center mb-4 text-2xl">
              ✦
            </div>
            <p
              className="font-display font-700 text-white text-lg mb-2"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
            >
              Need Something Custom?
            </p>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              We love unique challenges. Let's talk about your idea.
            </p>
            <button
              type="button"
              className="btn-primary text-sm py-2.5 px-5"
              onClick={() => openBooking()}
            >
              Get a Free Quote
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
