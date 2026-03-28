'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { CONSENT_EVENT } from '../constants/consent'

const cookieConsentStorageKey = 'ligaya_cookie_consent_v1'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !localStorage.getItem(cookieConsentStorageKey)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  useFocusTrap(visible, panelRef)

  const accept = () => {
    try {
      localStorage.setItem(cookieConsentStorageKey, 'accepted')
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div
        ref={panelRef}
        className="max-w-7xl mx-auto pointer-events-auto glass rounded-2xl border border-white/[0.1] px-5 py-4 md:flex md:items-center md:justify-between gap-4 shadow-[0_-8px_40px_rgba(0,0,0,0.45)]"
      >
        <p id="cookie-banner-title" className="text-white/70 text-sm leading-relaxed md:max-w-[70%]">
          We use essential cookies for preferences. If you enable analytics (Google Analytics), we load it only after you
          accept — see our{' '}
          <Link href="/cookies" className="text-cyan/85 hover:text-cyan underline underline-offset-2">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-cyan/85 hover:text-cyan underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0 shrink-0">
          <button
            type="button"
            onClick={accept}
            className="btn-primary text-sm py-2.5 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
