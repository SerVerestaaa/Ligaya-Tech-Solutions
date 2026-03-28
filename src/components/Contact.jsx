'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../utils/animations'
import { useBookingModal } from '../context/BookingModalContext'
import { uiSuccess } from '../utils/uiFeedback'

const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

const servicesOptions = [
  'Website Development',
  'System Development',
  'POS System',
  'Thesis / Capstone',
  'Custom Business Solution',
  'Other',
]

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 6.667c0-.92.747-1.667 1.667-1.667h11.666c.92 0 1.667.747 1.667 1.667v6.666c0 .92-.747 1.667-1.667 1.667H4.167C3.247 15 2.5 14.253 2.5 13.333V6.667z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.5 7.5l7.5 4.167L17.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Email',
    value: 'ligayatechsolutions@gmail.com',
    href:  'mailto:ligayatechsolutions@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.5 3h3l1.5 4-2 1.167c.898 1.816 2.317 3.235 4.133 4.133L12.3 10.3l4 1.5v3c0 .828-.672 1.5-1.5 1.5C7.716 16.3 3.7 12.284 3 5.2 3 4.372 3.672 3.7 4.5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Phone / WhatsApp',
    value: '+63 917 000 0000',
    href:  'tel:+639170000000',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: 'Location',
    value: 'Pampanga, Philippines',
    href:  null,
  },
]

const socialLinks = [
  { label: 'Facebook',  icon: 'FB', href: '#', color: '#1877F2' },
  { label: 'LinkedIn',  icon: 'LI', href: '#', color: '#0A66C2' },
  { label: 'GitHub',    icon: 'GH', href: '#', color: '#fff'     },
  { label: 'Instagram', icon: 'IG', href: '#', color: '#E1306C'  },
]

const quickSlots = ['Mon 10:00 AM', 'Tue 2:30 PM', 'Wed 11:00 AM']

function FormInput({ label, type = 'text', name, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
        {label} {required && <span className="text-cyan">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/20 focus:bg-surface transition-all duration-300 font-body"
      />
    </div>
  )
}

const contactViewport = { once: true, amount: 0.22, margin: '0px 0px -12% 0px' }

export default function Contact() {
  const [status, setStatus]   = useState('idle')  // idle | sending | sent | error
  const [service, setService] = useState('')
  const [formError, setFormError] = useState('')
  const { openBooking } = useBookingModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    const form = e.target
    const fd = new FormData(form)

    if (fd.get('website')) {
      return
    }

    if (!service) {
      setFormError('Please choose a service so we can route your inquiry.')
      return
    }

    const fileInput = form.querySelector('input[name="attachment"]')
    const file = fileInput?.files?.[0]
    if (file && file.size > 5 * 1024 * 1024) {
      setFormError('Attachment must be 5 MB or smaller.')
      return
    }

    setStatus('sending')

    if (!web3Key) {
      setTimeout(() => {
        setStatus('sent')
        uiSuccess()
        form.reset()
        setService('')
        if (fileInput) fileInput.value = ''
      }, 1600)
      return
    }

    try {
      const timeline = fd.get('timeline') || '—'
      const budget = fd.get('budget') || '—'
      const company = (fd.get('company') || '').trim()
      const companyLine = company ? `Company: ${company}\n` : ''
      const fullMessage = `Service: ${service}\n${companyLine}Timeline: ${timeline}\nBudget: ${budget}\n\n${fd.get('message')}`

      const body = new FormData()
      body.append('access_key', web3Key)
      body.append('subject', 'New inquiry — Ligaya website')
      body.append('name', fd.get('name'))
      body.append('email', fd.get('email'))
      body.append('message', fullMessage)
      if (file && file.size > 0) {
        body.append('attachment', file)
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        uiSuccess()
        form.reset()
        setService('')
        if (fileInput) fileInput.value = ''
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-deep overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] bg-cyan/8 -right-40 top-0 pointer-events-none" />
      <div className="orb w-[400px] h-[400px] bg-purple/10 -left-40 bottom-0 pointer-events-none" />

      <div id="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-4 scroll-mt-[5.5rem]">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={contactViewport}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-tag justify-center">
            Get in Touch
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-3 mb-5">
            Let's Build{' '}
            <span className="text-gradient">Your Vision</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mx-auto mt-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden />
            <span className="font-mono text-[11px] sm:text-xs text-emerald-200/90 tracking-wide">
              Typical reply within 24 hours — often the same day on business days
            </span>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-6 text-left"
          >
            {[
              { k: 'Reply time', v: 'Within 24 hours on business days — often same day' },
              { k: 'What to send', v: 'Goals, timeline, budget band, and any brief or deck' },
              { k: 'Attachments', v: 'Optional file below (PDF, images, ZIP — max 5 MB)' },
            ].map(({ k, v }) => (
              <div
                key={k}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
              >
                <p className="font-mono text-[10px] text-cyan/65 uppercase tracking-widest mb-1">{k}</p>
                <p className="text-white/65 text-xs leading-snug">{v}</p>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-md mx-auto mt-8">
            Tell us about your project — we&apos;ll respond with clear next steps.
          </motion.p>
          {!web3Key && (
            <motion.p variants={fadeUp} className="text-amber-200/70 text-xs font-mono mt-4 max-w-lg mx-auto">
              Contact form runs in demo mode until you add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (Web3Forms) in .env
            </motion.p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,400px)] gap-8 min-w-0">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
            viewport={contactViewport}
            className="glass rounded-2xl p-5 sm:p-8 min-w-0"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-5 py-10"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-4xl">
                  ✓
                </div>
                <h3
                  className="font-display font-800 text-2xl text-white"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                >
                  Message Received!
                </h3>
                <p className="text-white/60 max-w-sm leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                  We're excited to hear about your project!
                </p>
                <button
                  type="button"
                  className="btn-outline mt-2"
                  onClick={() => {
                    setStatus('idle')
                    setService('')
                    setFormError('')
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
                {/* Honeypot — leave empty (bots often fill hidden fields) */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput label="Full Name"    name="name"  placeholder="James Daniel Sibug" required />
                  <FormInput label="Email"        name="email" type="email" placeholder="JamesSibug@gmail.com" required />
                </div>

                <FormInput label="Company / Organization" name="company" placeholder="Your company (optional)" />

                {/* Service selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                    Service Needed <span className="text-cyan">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesOptions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`font-mono text-xs px-3 py-2 rounded-full border transition-all duration-200 ${
                          service === s
                            ? 'border-cyan/50 bg-cyan/10 text-cyan'
                            : 'border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                      Target timeline
                    </label>
                    <select
                      name="timeline"
                      className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/20 transition-all duration-300 font-body appearance-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2300D4FF' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" className="bg-deep">Select…</option>
                      <option value="asap" className="bg-deep">ASAP / urgent</option>
                      <option value="1-4w" className="bg-deep">1–4 weeks</option>
                      <option value="1-3m" className="bg-deep">1–3 months</option>
                      <option value="3m+" className="bg-deep">3+ months</option>
                      <option value="flex" className="bg-deep">Flexible</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                      Estimated budget
                    </label>
                    <select
                      name="budget"
                      className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/20 transition-all duration-300 font-body appearance-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2300D4FF' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" className="bg-deep">Select a range…</option>
                      <option value="5k-" className="bg-deep">Under ₱5,000</option>
                      <option value="5k-20k" className="bg-deep">₱5,000 – ₱20,000</option>
                      <option value="20k-50k" className="bg-deep">₱20,000 – ₱50,000</option>
                      <option value="50k-100k" className="bg-deep">₱50,000 – ₱100,000</option>
                      <option value="100k+" className="bg-deep">₱100,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                    Project Details <span className="text-cyan">*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    rows={5}
                    required
                    className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-cyan/40 focus:ring-2 focus:ring-cyan/20 focus:bg-surface transition-all duration-300 font-body resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
                    Attachment <span className="text-white/25 font-normal">(optional)</span>
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.zip"
                    className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-mono file:bg-white/[0.08] file:text-cyan/90 hover:file:bg-white/[0.12] cursor-pointer"
                  />
                  <p className="text-white/30 text-[11px] font-mono">Max 5 MB. PDF, images, or ZIP.</p>
                </div>

                {formError && (
                  <p className="text-amber-200/90 text-sm text-center font-mono">{formError}</p>
                )}
                {status === 'error' && (
                  <p className="text-pink text-sm text-center">
                    Could not send. Email us at ligayatechsolutions@gmail.com or try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2.25 9h13.5M9 3.75l5.625 5.25L9 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.08 } }}
            viewport={contactViewport}
            className="flex flex-col gap-5 min-w-0"
          >
            {/* Contact info */}
            <div className="glass rounded-2xl p-6 flex flex-col gap-5">
              <h3
                className="font-display font-700 text-white text-base"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                Contact Information
              </h3>
              {contactInfo.map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan flex-shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white/70 text-sm hover:text-white transition-colors break-words">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/70 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6">
              <h3
                className="font-display font-700 text-white text-base mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                Fast-Track Consultation
              </h3>
              <p className="text-white/45 text-xs mb-4">Reserve an available strategy call slot.</p>
              <div className="flex flex-col gap-2">
                {quickSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="text-left px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/65 text-sm hover:text-white hover:border-cyan/35 transition-all"
                    onClick={() => openBooking()}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="glass rounded-2xl p-6">
              <h3
                className="font-display font-700 text-white text-base mb-4"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              >
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ label, icon, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-all duration-300 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white"
                      style={{ background: `${color}20`, color }}
                    >
                      {icon}
                    </div>
                    <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="glass rounded-2xl p-6 flex items-center gap-4"
              style={{ borderColor: 'rgba(0,255,178,0.2)' }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
              </div>
              <div>
                <p
                  className="font-display font-700 text-white text-sm"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                >
                  Currently Accepting Projects
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Limited slots available for Q2 2026
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
