'use client'

import { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { inPageScrollEvent, useSectionScroll } from '../context/SectionScrollContext'
import { btnMotion, subtleLift } from '../utils/animations'

/** Longer than Lenis scrollTo duration (1.15s) so hide logic ignores programmatic scroll deltas. */
const navHideSuppressMs = 2000

const MotionLink = motion(Link)

const mobileNavItem = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] },
  },
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Book a call', href: '/book' },
  { label: 'Contact', href: '#contact' },
]

/** Logo SVG mark */
function LogoMark({ onHome }) {
  return (
    <a
      href="#home"
      className="flex items-center gap-3 group"
      onClick={(e) => {
        e.preventDefault()
        onHome()
      }}
    >
      <div className="relative w-10 h-10">
        <Image
          src="/images/logo-ligaya.png"
          alt="Ligaya Logo"
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
        {/* Glow pulse */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent)', filter: 'blur(8px)' }} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-800 text-white text-base tracking-wide" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
          LIGAYA
        </span>
        <span className="font-mono text-cyan/60 text-[9px] tracking-[0.25em] uppercase">
          Technology Solutions
        </span>
      </div>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  /** Slides up on scroll-down; any scroll-up brings the bar back (floating pattern) */
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  const suppressNavHideUntil = useRef(0)
  const scrollTo = useSectionScroll()
  const lenis = useLenis()

  useEffect(() => {
    const onInPageScroll = () => {
      setNavHidden(false)
      suppressNavHideUntil.current = Date.now() + navHideSuppressMs
    }
    window.addEventListener(inPageScrollEvent, onInPageScroll)
    return () => window.removeEventListener(inPageScrollEvent, onInPageScroll)
  }, [])

  useEffect(() => {
    if (!lenis) return undefined

    const onScroll = () => {
      const y = lenis.scroll
      const prev = lastScrollY.current
      const delta = y - prev
      lastScrollY.current = y

      setScrolled(y > 40)

      if (open) {
        setNavHidden(false)
        return
      }
      if (y < 64) {
        setNavHidden(false)
        return
      }
      if (delta < -0.5) {
        setNavHidden(false)
        return
      }
      if (delta > 2.5) {
        if (Date.now() < suppressNavHideUntil.current) return
        setNavHidden(true)
      }
    }

    lenis.on('scroll', onScroll)
    lastScrollY.current = lenis.scroll
    onScroll()
    return () => lenis.off('scroll', onScroll)
  }, [lenis, open])

  useEffect(() => {
    if (lenis) return undefined

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      const prev = lastScrollY.current
      const delta = y - prev
      lastScrollY.current = y

      setScrolled(y > 40)

      if (open) {
        setNavHidden(false)
        return
      }
      if (y < 64) {
        setNavHidden(false)
        return
      }
      if (delta < -0.5) {
        setNavHidden(false)
        return
      }
      if (delta > 2.5) {
        if (Date.now() < suppressNavHideUntil.current) return
        setNavHidden(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    lastScrollY.current = window.scrollY || 0
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis, open])

  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (href) => {
    flushSync(() => {
      setOpen(false)
    })
    document.body.style.overflow = ''
    scrollTo(href)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${
        navHidden && !open ? 'pointer-events-none' : ''
      } ${
        scrolled
          ? 'py-3 bg-void/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: navHidden && !open ? -120 : 0,
        opacity: 1,
        transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex min-w-0 items-center justify-between gap-2">
        <LogoMark
          onHome={() => {
            flushSync(() => {
              setOpen(false)
            })
            document.body.style.overflow = ''
            scrollTo('#home')
          }}
        />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) =>
            item.href.startsWith('/') ? (
              <MotionLink
                key={item.label}
                href={item.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan to-purple group-hover:w-full transition-all duration-300" />
              </MotionLink>
            ) : (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.href)}
                className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
                {...subtleLift}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan to-purple group-hover:w-full transition-all duration-300" />
              </motion.button>
            ),
          )}
        </nav>

        {/* Single primary CTA — booking stays in nav + hero + /book + floating pill */}
        <div className="hidden md:flex items-center">
          <motion.button
            type="button"
            onClick={() => handleNav('#contact')}
            className="btn-primary text-sm py-2.5 px-5"
            {...btnMotion}
          >
            Get a quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden absolute inset-x-0 top-full glass border-t border-white/5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
          >
            <motion.nav
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-col p-6 gap-4"
            >
              {navLinks.map((item) =>
                item.href.startsWith('/') ? (
                  <motion.div key={item.label} variants={mobileNavItem}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        flushSync(() => {
                          setOpen(false)
                        })
                        document.body.style.overflow = ''
                      }}
                      className="block text-left font-display font-600 text-lg text-white/80 hover:text-white transition-colors"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key={item.label} variants={mobileNavItem}>
                    <button
                      type="button"
                      onClick={() => handleNav(item.href)}
                      className="text-left font-display font-600 text-lg text-white/80 hover:text-white transition-colors w-full"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ),
              )}
              <motion.div variants={mobileNavItem}>
                <motion.button
                  type="button"
                  onClick={() => handleNav('#contact')}
                  className="btn-primary justify-center mt-2 w-full"
                  {...btnMotion}
                >
                  Get a quote
                </motion.button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
