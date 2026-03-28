'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const BookingModalContext = createContext(null)

export function BookingModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openBooking = useCallback(() => setOpen(true), [])
  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, openBooking, closeBooking }),
    [open, openBooking, closeBooking],
  )

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext)
  if (!ctx) {
    return {
      open: false,
      openBooking: () => {},
      closeBooking: () => {},
    }
  }
  return ctx
}
