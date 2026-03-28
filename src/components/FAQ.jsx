'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import FaqAccordion from './FaqAccordion'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

export default function FAQ({ showStandaloneLink = true }) {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section id="faq" ref={ref} className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-deep/40">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="orb w-[480px] h-[480px] bg-cyan/6 -left-48 bottom-0 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="section-title mt-3 mb-5"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            Common <span className="text-gradient">questions</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Straight answers about how we work, timelines, and what to expect before you reach out.
          </motion.p>
        </motion.div>

        <FaqAccordion />

        {showStandaloneLink && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mt-10 text-white/35 text-sm font-mono"
          >
            Prefer a dedicated page?{' '}
            <Link href="/faq" className="text-cyan/70 hover:text-cyan transition-colors">
              Open full FAQ →
            </Link>
          </motion.p>
        )}
      </div>
    </section>
  )
}
