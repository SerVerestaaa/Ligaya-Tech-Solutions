'use client'

import { useEffect, useState } from 'react'
import { CONSENT_EVENT } from '../constants/consent'

function readConsent() {
  try {
    return localStorage.getItem('ligaya_cookie_consent_v1') === 'accepted'
  } catch {
    return false
  }
}

/** Injects GA4 only after cookie consent + NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export default function AnalyticsLoader() {
  const [consented, setConsented] = useState(readConsent)

  useEffect(() => {
    const sync = () => setConsented(readConsent())
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!consented || !id || typeof id !== 'string') return undefined

    const existing = document.querySelector(`script[data-ligaya-ga="${id}"]`)
    if (existing) return undefined

    const gtagSrc = document.createElement('script')
    gtagSrc.async = true
    gtagSrc.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    gtagSrc.dataset.ligayaGa = id
    document.head.appendChild(gtagSrc)

    const inline = document.createElement('script')
    inline.dataset.ligayaGa = id
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', { anonymize_ip: true });
    `
    document.head.appendChild(inline)

    return () => {
      gtagSrc.remove()
      inline.remove()
    }
  }, [consented])

  return null
}
