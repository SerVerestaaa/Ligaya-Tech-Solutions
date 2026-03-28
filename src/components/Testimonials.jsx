'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const testimonials = [
  {
    id:      1,
    name:    'Jimes Dinyel Sabug',
    role:    'Owner, Autosonic Car Accessories',
    avatar:  'JS',
    color:   '#00D4FF',
    rating:  5,
    quote:
      "Our automotive parts and accessories shop needed a site that actually reflects what we sell. Ligaya delivered a clean, fast experience — customers browse categories and reach out much more easily now. Clear communication from discovery to launch.",
    service: 'Car Accessories Website',
  },
  {
    id:      2,
    name:    'Paolo Gabriel Iglesias',
    role:    'Operations Director, SpiceRoute Group',
    avatar:  'PI',
    color:   '#FF2FBB',
    rating:  5,
    quote:   "We were skeptical about a custom POS — we'd been burned before by promises that didn't deliver. Ligaya was different. They listened, delivered exactly what we needed, and the system has been running flawlessly across all four of our branches for over a year. Zero downtime.",
    service: 'POS System',
  },
  {
    id:      3,
    name:    'Shawnter Taga Betis',
    role:    'Faculty Adviser, Computer Engineering — Pampanga State University',
    avatar:  'SB',
    color:   '#00FFB2',
    rating:  5,
    quote:
      "Our CE capstone team built aNAILytics on Raspberry Pi with a camera pipeline for fingernail imaging — serious embedded and ML work. Ligaya helped the students structure the system, tighten the model workflow, and document everything for a rigorous defense. The panel could follow the full story from hardware to screening logic.",
    service: 'Thesis & Capstone',
  },
  {
    id:      4,
    name:    'Chris Malyud',
    role:    'HR Manager, ClearPath BPO',
    avatar:  'CM',
    color:   '#7B2FFF',
    rating:  5,
    quote:   "Before the HRMS, payroll took three days and was always stressful. Now it's done in minutes. The system is intuitive, powerful, and the Ligaya team was patient through every revision request. Our HR team actually looks forward to payroll day now — which I never thought I'd say.",
    service: 'HR Management System',
  },
  {
    id:      5,
    name:    'Remy Bayking',
    role:    'Founder, Bayking Law Partners',
    avatar:  'RB',
    color:   '#FFB800',
    rating:  5,
    quote:   "We needed a case management system built around the specific workflows of a Philippine law firm. Ligaya understood exactly what we needed — even things we hadn't thought to articulate. The solution has made our practice significantly more efficient.",
    service: 'Custom Business Solution',
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFB800">
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.6.6 3.6L7 9.3l-3.2 1.7.6-3.6L1.8 4.8l3.6-.5L7 1z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, isActive }) {
  const { name, role, avatar, color, rating, quote, service } = testimonial
  return (
    <motion.div
      className={`glass rounded-2xl p-7 flex flex-col gap-5 h-full transition-all duration-500 ${
        isActive ? 'border-white/15' : 'border-white/[0.06]'
      }`}
      style={isActive ? { boxShadow: `0 0 40px ${color}20` } : {}}
    >
      {/* Quote mark */}
      <div
        className="font-display text-5xl leading-none font-800 opacity-20"
        style={{ color, fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      >
        "
      </div>

      {/* Rating */}
      <StarRating count={rating} />

      {/* Quote text */}
      <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
        "{quote}"
      </p>

      {/* Service tag */}
      <span
        className="font-mono text-[10px] tracking-widest uppercase self-start px-3 py-1 rounded-full"
        style={{ color, background: `${color}12`, border: `1px solid ${color}25` }}
      >
        {service}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.07]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-700 text-sm text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, #7B2FFF)`, fontFamily: 'Syne, sans-serif' }}
        >
          {avatar}
        </div>
        <div>
          <p
            className="font-display font-700 text-white text-sm"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
          >
            {name}
          </p>
          <p className="text-white/40 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView(viewportOnce)
  const intervalRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i) => {
    setActive(i)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 5000)
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-cyan/8 left-0 top-0" />
      <div className="orb w-[400px] h-[400px] bg-pink/6 right-0 bottom-0" />

      <div id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            Trusted by{' '}
            <span className="text-gradient">Builders</span>
            ,{' '}
            <span className="text-gradient">Founders</span>
            ,{' '}
            <span className="text-gradient">Dreamers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-md mx-auto">
            Don't take our word for it. Hear from the clients who've seen the results firsthand.
          </motion.p>
        </motion.div>

        {/* Featured testimonial (large) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.7 } } : {}}
          className="mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
              className="glass rounded-2xl p-8 md:p-10"
              style={{
                boxShadow: `0 0 60px ${testimonials[active].color}15`,
                borderColor: `${testimonials[active].color}20`,
              }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div
                    className="font-display text-6xl leading-none font-800 mb-4 opacity-30"
                    style={{ color: testimonials[active].color, fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                  >
                    "
                  </div>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed italic mb-6">
                    "{testimonials[active].quote}"
                  </p>
                  <StarRating count={testimonials[active].rating} />
                </div>
                <div className="md:text-right flex md:flex-col items-center md:items-end gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-800 text-lg text-white flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${testimonials[active].color}, #7B2FFF)`,
                      fontFamily: 'Syne, sans-serif',
                    }}
                  >
                    {testimonials[active].avatar}
                  </div>
                  <div className="md:text-right">
                    <p
                      className="font-display font-700 text-white"
                      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                    >
                      {testimonials[active].name}
                    </p>
                    <p className="text-white/40 text-sm">{testimonials[active].role}</p>
                    <span
                      className="inline-block mt-2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color:       testimonials[active].color,
                        background:  `${testimonials[active].color}12`,
                        border:      `1px solid ${testimonials[active].color}25`,
                      }}
                    >
                      {testimonials[active].service}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail nav */}
        <div className="flex justify-center gap-3 flex-wrap">
          {testimonials.map(({ id, name, avatar, color }, i) => (
            <button
              key={id}
              onClick={() => goTo(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 text-sm ${
                active === i
                  ? 'bg-white/10 border border-white/20'
                  : 'border border-white/[0.07] hover:border-white/15'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${color}, #7B2FFF)` }}
              >
                {avatar[0]}
              </div>
              <span className="text-white/50 text-xs hidden sm:block">{name.split(' ')[0]}</span>
              {active === i && (
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: color }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
