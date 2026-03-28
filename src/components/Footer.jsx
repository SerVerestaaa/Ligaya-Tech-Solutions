'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSectionScroll } from '../context/SectionScrollContext'
import { btnMotion, fadeUp, stagger, viewportOnce } from '../utils/animations'

const footerColumns = {
  Services: [
    { label: 'Website Development', href: '#services' },
    { label: 'System Development', href: '#services' },
    { label: 'POS Systems', href: '#services' },
    { label: 'Thesis & Capstone', href: '#services' },
    { label: 'Custom Solutions', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Team', href: '#team' },
    { label: "CEO's message", href: '#ceo' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  Support: [
    { label: 'Insights', href: '/insights', route: true },
    { label: 'Company profile', href: '/downloads/company-profile.html', staticFile: true },
    { label: 'FAQ', href: '/faq', route: true },
    { label: 'Privacy Policy', href: '/privacy', route: true },
    { label: 'Terms of Service', href: '/terms', route: true },
    { label: 'Refund Policy', href: '/refunds', route: true },
    { label: 'Cookie Policy', href: '/cookies', route: true },
    { label: 'Sitemap', href: '/sitemap', route: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = useSectionScroll()
  const [footerRef, footerInView] = useInView(viewportOnce)

  return (
    <footer className="relative border-t border-white/[0.06] bg-void pt-16 pb-8 overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.08), transparent)', filter: 'blur(30px)' }}
      />

      <motion.div
        ref={footerRef}
        variants={stagger(0.11)}
        initial="hidden"
        animate={footerInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <motion.div variants={fadeUp} className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-10 mb-14 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                <polygon
                  points="20,2 36,11 36,29 20,38 4,29 4,11"
                  fill="none"
                  stroke="url(#footer-grad)"
                  strokeWidth="1.5"
                />
                <text x="13" y="25" fontFamily="Syne" fontWeight="800" fontSize="13" fill="white">
                  L
                </text>
                <defs>
                  <linearGradient id="footer-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00D4FF" />
                    <stop offset="1" stopColor="#7B2FFF" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <p className="font-display font-800 text-white leading-none" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
                  LIGAYA
                </p>
                <p className="font-mono text-cyan/50 text-[9px] tracking-[0.25em] uppercase">Technology Solutions</p>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Digital products, systems, and POS — engineered for clarity, speed, and long-term reliability.
            </p>

            <div className="flex gap-3">
              {['FB', 'LI', 'GH', 'IG'].map((s) => (
                <a
                  key={s}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo('#contact')
                  }}
                  className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerColumns).map(([category, links]) => (
            <div key={category}>
              <p
                className="font-display font-700 text-white text-sm mb-4 uppercase tracking-widest"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href, route, staticFile }) => (
                  <li key={label}>
                    {staticFile ? (
                      <a
                        href={href}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                      >
                        {label}
                      </a>
                    ) : route ? (
                      <Link
                        href={href}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollTo(href)
                        }}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(123,47,255,0.08))',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div>
            <p className="font-display font-700 text-white text-base" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              Stay in the loop
            </p>
            <p className="text-white/40 text-sm">Project updates and product notes — no noise.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-56 bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-cyan/40 transition-all font-body"
            />
            <motion.button type="button" className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap" {...btnMotion}>
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]"
        >
          <p className="text-white/25 text-xs font-mono">© {year} Ligaya Technology Solutions. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/25">Made with</span>
            <span className="text-pink text-sm">♥</span>
            <span className="font-mono text-[10px] text-white/25">in the Philippines</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link href="/privacy" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Terms
            </Link>
            <Link href="/refunds" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Refunds
            </Link>
            <Link href="/cookies" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Cookies
            </Link>
            <Link href="/sitemap" className="font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
