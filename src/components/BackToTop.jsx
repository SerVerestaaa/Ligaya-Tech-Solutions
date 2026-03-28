'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

const showAfterScrollPx = 400

/**
 * Above .noise-overlay (z-3) and main content; uses Lenis scroll + RAF fallback.
 */
export default function BackToTop() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(false)

  const updateFromY = useCallback((y) => {
    const n = typeof y === 'number' && !Number.isNaN(y) ? y : 0
    setVisible((prev) => {
      const next = n > showAfterScrollPx
      return prev === next ? prev : next
    })
  }, [])

  useEffect(() => {
    if (!lenis) return undefined

    const onScroll = () => updateFromY(lenis.scroll)
    lenis.on('scroll', onScroll)
    onScroll()

    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis, updateFromY])

  useEffect(() => {
    if (lenis) return undefined
    const onScroll = () => updateFromY(window.scrollY || document.documentElement.scrollTop)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis, updateFromY])

  const goTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.05 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[10020] w-12 h-12 rounded-full glass border border-white/15 text-white/90 hover:text-white hover:border-cyan/40 shadow-glow-cyan flex items-center justify-center transition-colors pointer-events-auto"
          onClick={goTop}
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M10 4v12M5 9l5-5 5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
