'use client'

import Link from 'next/link'
import PageTransition from '../components/PageTransition'
import BookingPanel from '../components/BookingPanel'
import BackToTop from '../components/BackToTop'

export default function BookPage() {
  return (
    <>
      <BackToTop />
      <PageTransition>
        <div className="min-h-screen bg-void text-white relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
          <div className="orb w-[420px] h-[420px] bg-purple/15 -right-32 top-0" />

          <header className="relative z-20 border-b border-white/[0.07] bg-void/80 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="font-display font-800 text-white tracking-wide hover:text-cyan transition-colors"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                ← LIGAYA2231_tite_na_Maliit
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/#portfolio"
                  className="font-mono text-xs text-white/45 hover:text-white/80 tracking-widest uppercase"
                >
                  Work
                </Link>
                <Link href="/#contact" className="btn-outline text-sm py-2 px-4">
                  Contact
                </Link>
              </div>
            </div>
          </header>

          <main id="main-content" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-14 pb-24">
            <div className="glass rounded-2xl border border-white/10 p-8 sm:p-10 shadow-glass">
              <BookingPanel standalonePage />
            </div>
          </main>
        </div>
      </PageTransition>
    </>
  )
}
