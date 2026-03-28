'use client'

import { createContext, useCallback, useContext } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Centralized in-page navigation: uses Lenis when available so scroll feels
 * consistent with smooth wheel scrolling (avoids fighting native smooth-scroll).
 */
const SectionScrollContext = createContext(null)

/** Navbar listens for this so auto-hide does not run during Lenis smooth scroll (large deltas). */
export const inPageScrollEvent = 'ligaya:in-page-scroll'

/** Keep in sync with `scroll-mt-[5.5rem]` on in-page hash targets (~navbar height). */
export function SectionScrollProvider({ children }) {
  const lenis = useLenis()

  const scrollToSection = useCallback(
    (selector) => {
      const el = typeof selector === 'string' ? document.querySelector(selector) : selector
      if (!el) return
      window.dispatchEvent(new CustomEvent(inPageScrollEvent))
      if (lenis) {
        /* scroll-margin-top on targets handles the fixed navbar; Lenis reads it (see lenis scrollTo). */
        lenis.scrollTo(el, {
          offset: 0,
          duration: 1.15,
          onComplete: () => {
            const a = document.activeElement
            if (a && typeof a.blur === 'function') a.blur()
          },
        })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        requestAnimationFrame(() => {
          const a = document.activeElement
          if (a && typeof a.blur === 'function') a.blur()
        })
      }
    },
    [lenis],
  )

  return (
    <SectionScrollContext.Provider value={scrollToSection}>
      {children}
    </SectionScrollContext.Provider>
  )
}

export function useSectionScroll() {
  const ctx = useContext(SectionScrollContext)
  return (
    ctx ??
    ((selector) => {
      window.dispatchEvent(new CustomEvent(inPageScrollEvent))
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
    })
  )
}
