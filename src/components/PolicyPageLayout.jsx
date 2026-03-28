'use client'

import Link from 'next/link'
import PageTransition from './PageTransition'
import BackToTop from './BackToTop'
/**
 * Shared chrome for legal / reference pages (no Lenis — keeps fixed UI reliable).
 */
export default function PolicyPageLayout({ title: _title, description: _description, children }) {
  return (
    <>
      <BackToTop />
      <PageTransition>
        <div className="min-h-screen bg-void text-white relative overflow-x-hidden">
          <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
          <div className="orb w-[380px] h-[380px] bg-purple/12 -right-24 top-0 pointer-events-none" />

          <header className="relative z-20 border-b border-white/[0.07] bg-void/85 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/"
                className="font-display font-800 text-white tracking-wide hover:text-cyan transition-colors"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                ← LIGAYA
              </Link>
              <nav className="flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-white/40">
                <Link href="/insights" className="hover:text-white/80 transition-colors">
                  Insights
                </Link>
                <Link href="/faq" className="hover:text-white/80 transition-colors">
                  FAQ
                </Link>
                <Link href="/privacy" className="hover:text-white/80 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white/80 transition-colors">
                  Terms
                </Link>
                <Link href="/#contact" className="hover:text-white/80 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </header>

          <main id="main-content" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-28">
            {children}
          </main>
        </div>
      </PageTransition>
    </>
  )
}
