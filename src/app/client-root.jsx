'use client'

import { MotionConfig } from 'framer-motion'
import { useGlobalUiSound } from '@/hooks/useGlobalUiSound'
import { BookingModalProvider } from '@/context/BookingModalContext'
import CustomCursor from '@/components/CustomCursor'
import CursorSpotlight from '@/components/CursorSpotlight'
import BookingModal from '@/components/BookingModal'
import SoundToggle from '@/components/SoundToggle'
import SkipLink from '@/components/SkipLink'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsLoader from '@/components/AnalyticsLoader'
import ChatAssistant from '@/components/ChatAssistant'

export default function ClientRoot({ children }) {
  useGlobalUiSound()

  return (
    <BookingModalProvider>
      <MotionConfig reducedMotion="user">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <CursorSpotlight />

        <BookingModal />

        <SoundToggle />
        <SkipLink />
        <CookieConsent />
        <AnalyticsLoader />
        <ChatAssistant />

        <div className="min-w-0 overflow-x-hidden">{children}</div>
      </MotionConfig>
    </BookingModalProvider>
  )
}
