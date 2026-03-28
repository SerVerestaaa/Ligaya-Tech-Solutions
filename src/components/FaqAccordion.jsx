'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { faqItems } from '../data/faq'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

export default function FaqAccordion({ className = '' }) {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <motion.div
      ref={ref}
      variants={stagger(0.06)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col gap-3 ${className}`}
    >
      {faqItems.map((item) => (
        <motion.div key={item.question} variants={fadeUp}>
          <details className="group rounded-2xl border border-white/[0.08] bg-surface/40 backdrop-blur-sm overflow-hidden open:border-cyan/20 open:bg-surface/55 transition-colors duration-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display font-700 text-white text-base sm:text-lg marker:content-none [&::-webkit-details-marker]:hidden">
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{item.question}</span>
              <span
                className="shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-cyan/80 group-open:rotate-45 transition-transform duration-300"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-4 pt-0 border-t border-white/[0.05]">
              <p className="text-white/60 text-sm leading-relaxed pt-4">{item.answer}</p>
            </div>
          </details>
        </motion.div>
      ))}
    </motion.div>
  )
}
