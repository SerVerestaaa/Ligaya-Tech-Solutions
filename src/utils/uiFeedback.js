/**
 * Lightweight UI feedback: optional micro-sound (Web Audio) + mobile haptics.
 * Sound is OFF by default until the visitor enables it (Sound toggle).
 */

const soundStorageKey = 'ligaya-sound-enabled'

let audioCtx = null

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
  }
  return audioCtx
}

export function isSoundEnabled() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(soundStorageKey) === '1'
}

export function setSoundEnabled(on) {
  localStorage.setItem(soundStorageKey, on ? '1' : '0')
}

export async function resumeAudioIfNeeded() {
  const ctx = getCtx()
  if (ctx?.state === 'suspended') await ctx.resume()
}

function playTone(freq, duration, gain = 0.035) {
  const ctx = getCtx()
  if (!ctx || !isSoundEnabled()) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  o.stop(ctx.currentTime + duration + 0.02)
}

export function hapticTap() {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10)
  } catch {
    /* ignore */
  }
}

/** Call on primary clicks (booking open, modal confirm, etc.) */
export async function uiTap() {
  hapticTap()
  if (!isSoundEnabled()) return
  await resumeAudioIfNeeded()
  playTone(880, 0.07, 0.028)
}

/** Short success chime */
export async function uiSuccess() {
  hapticTap()
  if (!isSoundEnabled()) return
  await resumeAudioIfNeeded()
  playTone(660, 0.06, 0.022)
  setTimeout(() => playTone(990, 0.08, 0.02), 45)
}
