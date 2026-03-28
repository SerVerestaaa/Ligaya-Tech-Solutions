'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { isSoundEnabled, uiTap } from '../utils/uiFeedback'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const portfolioProjects = [
  {
    id:       'ecomm',
    category: 'Web Development',
    title:    'Autosonic Car Accessories Website',
    client:   'Autosonic Car Accessories',
    year:     '2024',
    tags:     ['React', 'Node.js', 'MongoDB'],
    color:    '#00D4FF',
    problem:  'An automotive parts and accessories shop had no credible web presence — customers could not browse categories, brands, or contact the team online.',
    solution:
      'Designed and built a fast, mobile-friendly site that showcases parts and accessories, highlights promotions, and makes inquiries and store details easy to find.',
    result:
      'Stronger discovery and inquiry volume after launch; shoppers browse inventory-style content on any device and the team can update offers without rebuilding the site.',
    gradient: 'from-cyan/20 to-blue-900/20',
  },
  {
    id:       'pos',
    category: 'POS System',
    title:    'SpiceRoute Restaurant POS',
    client:   'SpiceRoute Group (4 branches)',
    year:     '2024',
    tags:     ['Electron', 'React', 'SQLite'],
    color:    '#FF2FBB',
    problem:  'Manual order-taking causing long queues, incorrect orders, and no centralized sales reporting across 4 branches.',
    solution: 'Custom POS system with touchscreen order management, real-time kitchen display, inventory tracking, and cloud-based analytics dashboard.',
    result:   '60% reduction in order errors. 2x faster table turnover. Live revenue tracking across all branches.',
    gradient: 'from-pink/20 to-purple-900/20',
  },
  {
    id:       'hrms',
    category: 'System Development',
    title:    'ClearPath HRMS',
    client:   'ClearPath BPO Solutions',
    year:     '2023',
    tags:     ['Laravel', 'Vue.js', 'PostgreSQL'],
    color:    '#7B2FFF',
    problem:  'HR team drowning in manual payroll, attendance tracking, and 200+ employee record management using spreadsheets.',
    solution: 'End-to-end HR management system with biometric integration, automated payroll computation, leave management, and performance reviews.',
    result:   'Saved 80+ hours/month in manual work. 100% payroll accuracy. 3-minute payroll runs vs 3-day manual process.',
    gradient: 'from-purple/20 to-indigo-900/20',
  },
  {
    id:       'thesis',
    category: 'Thesis & Capstone',
    title:    'aNAILytics',
    subtitle:
      'A Non-Invasive Pre-Diagnosis of Iron Deficiency Anemia, Chronic Kidney Disease, and B12 Deficiency Through Fingernail Analysis',
    client:   'Pampanga State University — Computer Engineering',
    year:     '2024',
    tags:     ['Raspberry Pi', 'Python', 'Artificial Intelligence'],
    color:    '#00FFB2',
    problem:
      'Computer Engineering students needed a capstone device that could support non-invasive screening: scan fingernails and surface early signs of iron deficiency anemia, chronic kidney disease, or B12 deficiency — without replacing clinical diagnosis.',
    solution:
      'Built an embedded pipeline on Raspberry Pi with camera capture, fingernail image preprocessing, and a trained screening model, plus a clear interface for results and full thesis documentation for defense.',
    result:
      'Demonstrated end-to-end prototype: on-device capture and analysis, practical pre-diagnostic cues for users, and a strong capstone deliverable for the PSU CE panel.',
    gradient: 'from-emerald-500/20 to-teal-900/20',
  },
]

const portfolioFilters = ['All', 'Web Development', 'POS System', 'System Development', 'Thesis & Capstone']
const caseStudySlugs = {
  ecomm: 'autosonic-car-accessories',
  hrms: 'clearpath-hrms',
  pos: 'spiceroute-pos',
  thesis: 'anailytics-capstone',
}

function ProjectCard({ project, onOpenCaseStudy }) {
  const [expanded, setExpanded] = useState(false)
  const { title, subtitle, client, year, tags, color, problem, solution, result, gradient, category } = project

  const toggle = () => setExpanded((v) => !v)

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      className="glass rounded-2xl overflow-hidden cursor-pointer group"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (isSoundEnabled()) void uiTap()
          toggle()
        }
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
    >
      {/* Card header / visual — top row (badge + year) stays out of the title flow to avoid overlap */}
      <div
        className={`min-h-[11rem] sm:min-h-[12rem] bg-gradient-to-br ${gradient} flex flex-col p-6 relative overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative z-10 flex justify-between items-start gap-3 shrink-0">
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full inline-block whitespace-nowrap"
            style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
          >
            {category}
          </span>
          <span className="font-mono text-xs text-white/30 shrink-0">{year}</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-end min-w-0 pr-10 mt-4">
          <h3
            className="font-display font-800 text-xl text-white leading-snug"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            {title}
          </h3>
          <p className="font-mono text-xs text-white/40 mt-2">{client}</p>
        </div>

        {/* Expand indicator */}
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Tags */}
      <div className="px-6 py-3 flex gap-2 border-b border-white/[0.06]">
        {tags.map(t => (
          <span key={t} className="font-mono text-[10px] text-white/35 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07]">
            {t}
          </span>
        ))}
      </div>

      {caseStudySlugs[project.id] && (
        <div className="px-6 py-3 border-b border-white/[0.06]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpenCaseStudy?.(caseStudySlugs[project.id])
            }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan/75 hover:text-cyan transition-colors"
          >
            Open full case study →
          </button>
        </div>
      )}

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {subtitle && (
                <p className="text-white/55 text-sm leading-relaxed border-l-2 border-white/15 pl-3 -mt-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/35 block mb-1">
                    Full title
                  </span>
                  {subtitle}
                </p>
              )}
              {[
                { label: '🔴 Problem',  text: problem  },
                { label: '🔵 Solution', text: solution },
                { label: '🟢 Result',   text: result   },
              ].map(({ label, text }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-1"
                  >
                    {label}
                  </p>
                  <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [ref, inView] = useInView(viewportOnce)
  const router = useRouter()

  const filtered = filter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === filter)

  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-cyan/8 right-0 top-1/4" />

      <div id="portfolio" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Portfolio
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            Work That{' '}
            <span className="text-gradient">Speaks</span>{' '}
            for Itself
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-lg mx-auto">
            Real projects. Real results. Click any card to see the full story.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {portfolioFilters.map(f => (
            <motion.button
              key={f}
              variants={fadeUp}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-cyan to-purple text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                  : 'text-white/40 border border-white/[0.1] hover:border-white/25 hover:text-white/70'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} onOpenCaseStudy={(slug) => router.push(`/case-studies/${slug}`)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
