'use client'

import { useEffect, useState } from 'react'
import { isSoundEnabled, resumeAudioIfNeeded, setSoundEnabled } from '../utils/uiFeedback'

export default function SoundToggle() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    setOn(isSoundEnabled())
  }, [])

  const toggle = async () => {
    const next = !on
    setOn(next)
    setSoundEnabled(next)
    if (next) await resumeAudioIfNeeded()
  }

  return (
    <button
      type="button"
      data-no-ui-sound
      data-ligaya-sound-toggle
      onClick={toggle}
      className="fixed bottom-5 left-5 z-[65] hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full glass-bright border border-white/10 text-white/60 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
      aria-pressed={on}
      aria-label={on ? 'Disable UI sounds' : 'Enable UI sounds'}
    >
      <span className={`w-2 h-2 rounded-full ${on ? 'bg-cyan shadow-glow-cyan' : 'bg-white/25'}`} />
      Sound {on ? 'on' : 'off'}
    </button>
  )
}
