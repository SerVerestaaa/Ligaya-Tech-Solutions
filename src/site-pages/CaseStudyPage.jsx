'use client'

import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useBookingModal } from '../context/BookingModalContext'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import { caseStudies, getCaseStudy } from '../data/caseStudies'
import PageTransition from '../components/PageTransition'
import BackToTop from '../components/BackToTop'

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug
  const router = useRouter()
  const { openBooking } = useBookingModal()
  const study = typeof slug === 'string' ? getCaseStudy(slug) : undefined

  if (!study) {
    return (
      <div className="min-h-screen bg-void text-white flex flex-col items-center justify-center gap-5 px-6">
        <p className="font-display text-3xl">Case study not found.</p>
        <button type="button" className="btn-primary" onClick={() => router.push('/')}>
          Back to home
        </button>
      </div>
    )
  }

  return (
    <>
      <BackToTop />
      <PageTransition>
        <div className="min-h-screen bg-void text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <button type="button" className="btn-outline" onClick={() => router.push('/')}>
              Back to Home
            </button>
            <button
              type="button"
              className="btn-primary hidden sm:inline-flex"
              onClick={() => openBooking()}
            >
              Start a Similar Project
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="section-tag">{study.industry} Transformation</p>
            <h1 className="section-title mt-3 mb-4">{study.title}</h1>
            <p className="text-white/60 max-w-3xl text-lg mb-8">{study.summary}</p>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {study.kpis.map((kpi) => (
                <div key={kpi.label} className="glass rounded-2xl p-6">
                  <p
                    className="font-display text-4xl text-gradient-cyan mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                  >
                    {kpi.value}%
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{kpi.label}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 mb-10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-cyan/70 mb-4">
                Six-month performance trajectory
              </p>
              <div style={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <LineChart data={study.chart}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                    <YAxis stroke="rgba(255,255,255,0.45)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(3,2,15,0.95)',
                        border: '1px solid rgba(0,212,255,0.2)',
                        borderRadius: 12,
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="baseline" stroke="#7B2FFF" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="after" stroke="#00D4FF" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Challenge</p>
                <p className="text-white/70 text-sm leading-relaxed">{study.challenge}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Solution</p>
                <p className="text-white/70 text-sm leading-relaxed">{study.solution}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Outcome</p>
                <p className="text-white/70 text-sm leading-relaxed">{study.outcome}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">More case studies</p>
            <div className="flex flex-wrap gap-2">
              {caseStudies.map((item) => (
                <Link
                  key={item.slug}
                  href={`/case-studies/${item.slug}`}
                  className="px-3 py-2 rounded-full border border-white/[0.1] text-white/60 hover:text-white hover:border-cyan/45 transition-all text-sm"
                >
                  {item.client}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
      </PageTransition>
    </>
  )
}

