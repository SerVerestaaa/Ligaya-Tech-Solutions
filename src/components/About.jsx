'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, stagger, viewportOnce } from '../utils/animations'

const aboutPillars = [
  {
    icon: '⚡',
    title: 'Speed & Precision',
    desc:  'We deliver on time, every time — with obsessive attention to quality.',
  },
  {
    icon: '🔮',
    title: 'Forward-Thinking',
    desc:  'We build with tomorrow in mind, using technologies that scale.',
  },
  {
    icon: '🤝',
    title: 'True Partnership',
    desc:  "Your success is our success. We're invested in your outcomes.",
  },
]

export default function About() {
  const [ref, inView] = useInView(viewportOnce)

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="orb w-[600px] h-[600px] bg-purple/10 -right-48 top-0" />

      <div id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-[5.5rem]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-w-0">

          {/* Left — Text */}
          <motion.div
            className="min-w-0"
            variants={stagger()}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span variants={fadeUp} className="section-tag">
              About Us
            </motion.span>

            <motion.h2 variants={fadeUp} className="section-title mt-3 mb-6">
              Built on{' '}
              <span className="text-gradient">Innovation.</span>
              <br />
              Driven by{' '}
              <span className="text-gradient">Purpose.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-5">
              Ligaya Technology Solutions was founded on a simple belief: that every business —
              regardless of size — deserves technology that truly works for them. We're a team of
              engineers, designers, and strategists who are passionate about turning complex
              problems into elegant digital solutions.
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-8">
              From the first student who trusted us with their thesis to the enterprise clients
              who rely on us for mission-critical systems, we've grown by earning trust — one
              delivered project at a time.
            </motion.p>

            {/* Mission & Vision */}
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'Our Mission',
                  text:  'We are committed to deliver reliable and high-quality mobile, web, and system development that meet clients needs. Through thoughtful design, following development standards, and a focus on quality, we aim to help clients to improve productivity and achieve long-term growth.',
                  accent: 'border-cyan/40',
                },
                {
                  label: 'Our Vision',
                  text:  'We envision in becoming a leading technology company partner known for setting the gold standard in quality, trust, and innovation.',
                  accent: 'border-purple/40',
                },
              ].map(({ label, text, accent }) => (
                <div
                  key={label}
                  className={`p-5 rounded-xl glass border-l-2 ${accent}`}
                >
                  <p className="font-display font-700 text-white text-sm mb-2 uppercase tracking-widest"
                     style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
                    {label}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual / Pillars */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-5 min-w-0"
          >
            {/* Big accent number */}
            <motion.div
              variants={fadeUp}
              className="glass-bright rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 min-w-0"
            >
              <div>
                <p
                  className="font-display font-800 text-7xl text-gradient-cyan leading-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                >
                  5+
                </p>
                <p className="font-mono text-white/40 text-sm tracking-widest uppercase mt-1">
                  Years of Excellence
                </p>
              </div>
              <div className="w-full h-px sm:h-auto sm:w-px sm:self-stretch shrink-0 bg-white/10" />
              <div>
                <p
                  className="font-display font-800 text-7xl text-gradient leading-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                >
                  150+
                </p>
                <p className="font-mono text-white/40 text-sm tracking-widest uppercase mt-1">
                  Projects Shipped
                </p>
              </div>
            </motion.div>

            {/* Pillars */}
            {aboutPillars.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/15 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center text-2xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p
                    className="font-display font-700 text-white text-sm mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                  >
                    {title}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
