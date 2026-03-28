'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const CEO_IMAGE = '/images/ceo.png'
const CEO_NAME = 'Francis "Pope" Erick Datu'

/** Message from the sign in the photo — Tagalog + English for all audiences. */
const messageTagalog = `Ang KABABAIHAN
AY ISANG
KAYAMANAN
NA DAPAT
PAHALAGAHAN`

const messageEnglish = 'Women are a treasure that should be valued and cherished.'

/** Stronger than generic fadeUp so the portrait reads as a deliberate reveal */
const photoVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
}

export default function CeoMessage() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section
      id="ceo"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-deep/40 border-y border-white/[0.05]"
    >
      <div className="orb w-[420px] h-[420px] bg-pink-500/8 -left-32 top-1/4 pointer-events-none" />
      <div className="orb w-[380px] h-[380px] bg-cyan/6 -right-24 bottom-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">
        {/* Staggered children must be direct descendants for Framer Motion staggerChildren */}
        <motion.div
          ref={ref}
          variants={stagger(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-x-14 lg:gap-y-6 items-start min-w-0"
        >
          <motion.div
            variants={photoVariants}
            className="relative mx-auto w-full max-w-sm lg:max-w-none lg:mx-0 lg:row-span-8 lg:col-start-1 flex flex-col gap-0"
          >
            <motion.div
              className="mx-auto w-full max-w-[380px] rounded-2xl will-change-transform"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}
              whileHover={{
                scale: 1.03,
                y: -4,
                boxShadow: '0 32px 90px rgba(0,0,0,0.55)',
                transition: { type: 'spring', stiffness: 380, damping: 28 },
              }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Full frame visible: natural aspect ratio (no object-cover crop) */}
              <motion.img
                src={CEO_IMAGE}
                alt={`${CEO_NAME}, Chief Executive Officer of Ligaya Technology Solutions, with a message for the community.`}
                className="block w-full h-auto max-h-[min(88vh,680px)] rounded-2xl border border-white/[0.08] bg-deep/80 object-contain object-center shadow-2xl select-none"
                width={760}
                height={1013}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <p className="font-mono text-[10px] text-white/30 text-center lg:text-left mt-3 tracking-wide">
              Photo: message on sign reflects our values — shared here for everyone we serve.
            </p>
          </motion.div>

          <motion.span variants={fadeUp} className="section-tag lg:col-start-2 lg:row-start-1">
            Leadership
          </motion.span>

          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-0 lg:col-start-2">
            A word from our{' '}
            <span className="text-gradient">CEO</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="lg:col-start-2">
            <p
              className="font-display text-xl text-white"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
            >
              {CEO_NAME}
            </p>
            <p className="font-mono text-xs text-cyan/60 tracking-widest uppercase mt-1">
              Chief Executive Officer · Ligaya Technology Solutions
            </p>
          </motion.div>

          <motion.p variants={fadeUp} className="text-white/55 text-base leading-relaxed lg:col-start-2">
            To our clients, partners, and community — wherever you are in your journey with technology: we build with
            integrity, care, and respect for every person behind the screen. The message I stand by is simple, and it
            belongs to everyone. #OGPerformativeMale
          </motion.p>

          <motion.div variants={fadeUp} className="lg:col-start-2">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3">In Filipino</p>
            <blockquote
              className="border-l-2 border-cyan/40 pl-5 py-1 text-lg text-white/90 leading-relaxed whitespace-pre-line font-display"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
            >
              {messageTagalog}
            </blockquote>
            <p className="text-white/45 text-sm italic mt-4 pl-5 border-l border-white/10">{messageEnglish}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
