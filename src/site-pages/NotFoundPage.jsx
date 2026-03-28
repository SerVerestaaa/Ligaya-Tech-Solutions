'use client'

import Link from 'next/link'
import PageTransition from '../components/PageTransition'
import BackToTop from '../components/BackToTop'

export default function NotFoundPage() {
  return (
    <>
      <BackToTop />
      <PageTransition>
        <div className="min-h-screen bg-void text-white flex flex-col items-center justify-center px-6 py-24">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan/50 mb-4">404</p>
          <h1
            className="font-display font-800 text-4xl sm:text-5xl text-center mb-4"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            This page doesn&apos;t exist
          </h1>
          <p className="text-white/50 text-center max-w-md mb-10">
            The link may be broken or the page may have moved. Head home or reach us directly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/#contact" className="btn-outline">
              Contact us
            </Link>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
