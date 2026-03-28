'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-void text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          The page hit a client error. Try again, or hard-refresh if it keeps happening.
        </p>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  )
}
