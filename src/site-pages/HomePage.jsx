'use client'

import { useState, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { SectionScrollProvider } from '../context/SectionScrollContext'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import TrustSignals from '../components/TrustSignals'
import Marquee from '../components/Marquee'
import ProcessStrip from '../components/ProcessStrip'
import About from '../components/About'
import TeamSection from '../components/TeamSection'
import CeoMessage from '../components/CeoMessage'
import Services from '../components/Services'
import PricingTeaser from '../components/PricingTeaser'
import Portfolio from '../components/Portfolio'
import PerformanceProof from '../components/PerformanceProof'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import PageTransition from '../components/PageTransition'
import OrganizationJsonLd from '../components/OrganizationJsonLd'

export default function HomePage() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const fn = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.09,
        smoothWheel: !reduceMotion,
        syncTouch: !reduceMotion,
        wheelMultiplier: reduceMotion ? 1 : 0.92,
      }}
    >
      <OrganizationJsonLd />

      <SectionScrollProvider>
        {/*
          Navbar + BackToTop must NOT be inside PageTransition — motion.div uses transform,
          which breaks position:fixed (they would scroll with the page instead of the viewport).
        */}
        <Navbar />
        <PageTransition>
          <div className="relative min-h-screen w-full min-w-0 bg-void overflow-x-hidden">
            <main id="main-content">
              <Main />
              <TrustSignals />
              <Marquee />
              <ProcessStrip />
              <About />
              <TeamSection />
              <CeoMessage />
              <Services />
              <PricingTeaser />
              <Portfolio />
              <PerformanceProof />
              <WhyUs />
              <Testimonials />
              <CTA />
              <FAQ />
              <Contact />
            </main>

            <Footer />
          </div>
        </PageTransition>
        <BackToTop />
      </SectionScrollProvider>
    </ReactLenis>
  )
}
