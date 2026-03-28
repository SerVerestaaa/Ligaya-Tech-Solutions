'use client'

import { useState } from 'react'
import Link from 'next/link'
import { uiSuccess } from '../utils/uiFeedback'
import { strategyCallGoogleCalendarUrl } from '../utils/googleCalendar'

const bookingEmbedUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL || ''
const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

/**
 * Shared booking UI: scheduler embed, request form, or success state.
 * @param {{ omitHeader?: boolean, showPageLink?: boolean, standalonePage?: boolean, onClose?: () => void }} props
 */
export default function BookingPanel({
  omitHeader = false,
  showPageLink = false,
  standalonePage = false,
  onClose,
}) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!web3Key) {
      setStatus('sent')
      uiSuccess()
      return
    }
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: 'Strategy call request — Ligaya Technology Solutions',
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          message: `Strategy call — preferred times / agenda:\n${data.get('notes') || ''}`,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        uiSuccess()
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const calendarHref = strategyCallGoogleCalendarUrl()

  return (
    <div className="space-y-6">
      {!omitHeader && (
        <div>
          <p className="section-tag mb-2">Executive access</p>
          <h2 id="booking-title" className="section-title text-2xl sm:text-3xl">
            Book a <span className="text-gradient">Strategy Call</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 max-w-xl">
            30 minutes to align scope, timeline, and investment.
            {standalonePage ? (
              <> Share this URL with stakeholders — no account required.</>
            ) : (
              <>
                {' '}
                For a shareable link, use the{' '}
                <Link href="/book" className="text-cyan/80 hover:text-cyan underline-offset-2 hover:underline">
                  dedicated booking page
                </Link>
                .
              </>
            )}
          </p>
        </div>
      )}

      {showPageLink && omitHeader && (
        <p className="font-mono text-[10px] text-white/35 tracking-wider">
          <Link href="/book" className="text-cyan/70 hover:text-cyan">
            Open full-page booking →
          </Link>
        </p>
      )}

      {bookingEmbedUrl ? (
        <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black/30 min-h-[520px]">
          <iframe
            title="Schedule a strategy call"
            src={bookingEmbedUrl}
            className="w-full h-[min(70vh,640px)] border-0"
            loading="lazy"
          />
        </div>
      ) : status === 'sent' ? (
        <div className="text-center py-6 px-2">
          <p className="font-display text-2xl text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
            You&apos;re on the list.
          </p>
          <p className="text-white/55 text-sm max-w-md mx-auto mb-6">
            We&apos;ll confirm your call by email. Add{' '}
            <span className="text-cyan/90">ligayatechsolutions@gmail.com</span> to your safe senders.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center mb-6">
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
            >
              Add placeholder to Google Calendar
            </a>
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                type="button"
                className="btn-outline text-sm border-white/15 text-white/60"
                onClick={() => {
                  navigator
                    .share({
                      title: 'Book a call — Ligaya Technology Solutions',
                      text: 'Schedule a strategy session with Ligaya.',
                      url: `${window.location.origin}/book`,
                    })
                    .catch(() => {})
                }}
              >
                Share this page
              </button>
            )}
          </div>
          <p className="text-white/35 text-xs max-w-sm mx-auto mb-6">
            Calendar time is a placeholder — adjust it once we confirm your slot.
          </p>
          {onClose && (
            <button type="button" className="btn-primary" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Name *</label>
              <input
                name="name"
                required
                className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Company</label>
            <input
              name="company"
              className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm"
              placeholder="Organization (optional)"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
              Preferred times & agenda *
            </label>
            <textarea
              name="notes"
              required
              rows={4}
              className="w-full bg-surface/60 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm resize-none"
              placeholder="e.g. Weekday mornings PHT, discuss POS rollout for 4 branches…"
            />
          </div>
          {!web3Key && (
            <p className="text-amber-200/80 text-xs font-mono">
              Demo mode: submissions are simulated. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY for real email delivery.
            </p>
          )}
          {status === 'error' && (
            <p className="text-pink text-sm">Something went wrong. Please email ligayatechsolutions@gmail.com directly.</p>
          )}
          <button type="submit" disabled={status === 'sending'} className="btn-primary justify-center disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Request call'}
          </button>
        </form>
      )}
    </div>
  )
}
