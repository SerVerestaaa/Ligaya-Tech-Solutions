'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useBookingModal } from '../context/BookingModalContext'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useMounted } from '../hooks/useMounted'
import BookingPanel from './BookingPanel'

export default function BookingModal() {
  const mounted = useMounted()
  const { open, closeBooking } = useBookingModal()
  const [panelKey, setPanelKey] = useState(0)
  const prevOpen = useRef(false)
  const dialogRef = useRef(null)

  useFocusTrap(open, dialogRef, { onEscape: closeBooking })

  useEffect(() => {
    if (open && !prevOpen.current) setPanelKey((k) => k + 1)
    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeBooking()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeBooking])

  const handleBackdrop = () => closeBooking()

  const node = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleBackdrop}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl glass border border-white/10 shadow-glass"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b border-white/[0.07]">
              <div>
                <p className="section-tag mb-2">Executive access</p>
                <h2 id="booking-modal-title" className="section-title text-2xl sm:text-3xl">
                  Book a <span className="text-gradient">Strategy Call</span>
                </h2>
                <p className="text-white/50 text-sm mt-2 max-w-xl">
                  30 minutes with our team. Embed Calendly/Cal.com via{' '}
                  <span className="font-mono text-cyan/70">NEXT_PUBLIC_BOOKING_EMBED_URL</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => closeBooking()}
                className="shrink-0 w-10 h-10 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <BookingPanel key={panelKey} omitHeader showPageLink onClose={closeBooking} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(node, document.body)
}
