'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, scaleIn, viewportOnce } from '../utils/animations'

const advantages = [
  {
    icon: '🎯',
    title: 'Outcome-Obsessed',
    desc:  "We measure success by your results, not by deliverables. If it doesn't move your metrics, we're not done.",
    stat:  '98%',
    statLabel: 'On-time delivery',
    color: '#00D4FF',
  },
  {
    icon: '🔐',
    title: 'Enterprise-Grade Security',
    desc:  'Every system we build follows security best practices — HTTPS, encrypted databases, secure auth, and regular audits.',
    stat:  '0',
    statLabel: 'Security breaches',
    color: '#7B2FFF',
  },
  {
    icon: '📞',
    title: '24/7 Client Support',
    desc:  "You're never left in the dark. Our team is reachable via chat, call, or email whenever you need us.",
    stat:  '<2h',
    statLabel: 'Avg. response time',
    color: '#FF2FBB',
  },
  {
    icon: '🔧',
    title: 'Post-Launch Care',
    desc:  'We provide maintenance, updates, and improvements long after launch. Your product grows with you.',
    stat:  '12mo',
    statLabel: 'Free support window',
    color: '#00FFB2',
  },
  {
    icon: '💡',
    title: 'Strategic Thinking',
    desc:  "We don't just code what you ask — we challenge assumptions, identify opportunities, and recommend better paths.",
    stat:  '100%',
    statLabel: 'Client retention',
    color: '#FFB800',
  },
  {
    icon: '🚀',
    title: 'Rapid Prototyping',
    desc:  'See your idea come alive in days, not months. We move fast without sacrificing quality.',
    stat:  '7 days',
    statLabel: 'Avg. prototype time',
    color: '#00D4FF',
  },
]

const whyUsProcessSteps = [
  { step: '01', title: 'Discovery',    desc: 'Deep-dive into your goals, users, and constraints.' },
  { step: '02', title: 'Blueprint',    desc: 'Architecture, wireframes, and technical planning.' },
  { step: '03', title: 'Build',        desc: 'Agile sprints with weekly demos and feedback loops.' },
  { step: '04', title: 'Launch',       desc: 'Rigorous QA, deployment, and launch support.' },
  { step: '05', title: 'Scale',        desc: 'Continuous improvement, monitoring, and growth.' },
]

export default function WhyUs() {
  const [headerRef, headerInView] = useInView(viewportOnce)
  const [cardsRef,  cardsInView]  = useInView(viewportOnce)
  const [procRef,   procInView]   = useInView(viewportOnce)

  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-deep overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="orb w-[600px] h-[600px] bg-purple/10 -left-40 top-0" />

      <div id="why-us" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={stagger()}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Why Ligaya
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            The Difference is in{' '}
            <span className="text-gradient">the Details</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-lg mx-auto">
            Many agencies can build software. Few can build the{' '}
            <em className="text-white/80 not-italic">right</em> software — on time, on budget, with zero headaches.
          </motion.p>
        </motion.div>

        {/* Advantages grid */}
        <motion.div
          ref={cardsRef}
          variants={stagger(0.08)}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {advantages.map(({ icon, title, desc, stat, statLabel, color }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="glass rounded-2xl p-6 hover:border-white/12 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  {icon}
                </div>
                <div className="text-right">
                  <p
                    className="font-display font-800 text-2xl leading-none"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color }}
                  >
                    {stat}
                  </p>
                  <p className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{statLabel}</p>
                </div>
              </div>

              <h3
                className="font-display font-700 text-white text-base mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process timeline */}
        <motion.div
          ref={procRef}
          variants={stagger(0.1)}
          initial="hidden"
          animate={procInView ? 'visible' : 'hidden'}
        >
          <motion.h3
            variants={fadeUp}
            className="font-display font-800 text-center text-2xl text-white mb-10"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            Our Process
          </motion.h3>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent z-0" />

            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              {whyUsProcessSteps.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 font-mono font-500 text-sm"
                    style={{
                      background: i === 2
                        ? 'linear-gradient(135deg, #00D4FF, #7B2FFF)'
                        : 'rgba(13,11,42,0.8)',
                      border: i === 2
                        ? 'none'
                        : '1px solid rgba(0,212,255,0.3)',
                      color: i === 2 ? '#fff' : '#00D4FF',
                      boxShadow: i === 2 ? '0 0 30px rgba(0,212,255,0.3)' : 'none',
                    }}
                  >
                    {step}
                  </div>
                  <p
                    className="font-display font-700 text-white text-sm mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                  >
                    {title}
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
