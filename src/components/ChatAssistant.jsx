'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useBookingModal } from '../context/BookingModalContext'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useMounted } from '../hooks/useMounted'
import { fetchChatProviders, getAssistantReply } from '../utils/chatAssistant'
import { siteName } from '../siteConfig'

const CHAT_PROVIDER_STORAGE = 'ligaya_chat_provider'

const PROVIDER_LABEL = {
  auto: 'Auto',
  openai: 'ChatGPT',
  anthropic: 'Claude',
  gemini: 'Gemini',
}

/** Always shown — selection is sent to POST /api/chat even when GET /api/chat is unavailable. */
const PROVIDER_PICKER_ORDER = ['auto', 'openai', 'anthropic', 'gemini']

const MAIL_CUSTOMER =
  'mailto:ligayatechsolutions@gmail.com?subject=' +
  encodeURIComponent('Website help — customer service') +
  '&body=' +
  encodeURIComponent('Hi Ligaya team,\n\nI’d like help with:\n\n')

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ChatAssistant() {
  const mounted = useMounted()
  const router = useRouter()
  const pathname = usePathname() || '/'
  const { openBooking } = useBookingModal()
  const panelRef = useRef(null)
  const messagesScrollRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  /** `null` = could not detect (e.g. `vite preview`); `[]` = server OK but no keys; else configured ids. */
  const [configuredProviders, setConfiguredProviders] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState('auto')
  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      content: `Hi — I’m ${siteName}’s chat guide. Pick **ChatGPT**, **Claude**, or **Gemini** below when more than one is wired up on the server — or **Auto** and we’ll choose. No API keys on the server yet? I’ll fall back to our FAQs. **Talk to our team** reaches a human.`,
    },
  ])

  const close = useCallback(() => setOpen(false), [])
  useFocusTrap(open, panelRef, { onEscape: close })

  const appendAssistant = useCallback((text) => {
    setMessages((prev) => [...prev, { role: 'assistant', content: text }])
  }, [])

  const goContact = useCallback(() => {
    close()
    if (pathname === '/') {
      requestAnimationFrame(scrollToContact)
    } else {
      router.push('/')
      window.setTimeout(scrollToContact, 350)
    }
  }, [close, pathname, router])

  const handleHuman = useCallback(() => {
    appendAssistant(
      'Here’s how to reach our team:\n\n• **Contact form** — scroll to Contact on the homepage.\n• **Email** — ligayatechsolutions@gmail.com\n• **Book a call** — use Book / Get a quote.\n\nWe typically reply within one business day.',
    )
  }, [appendAssistant])

  const applyProviderChoice = useCallback((list, preference) => {
    if (list.length === 0) {
      setSelectedProvider('auto')
      return
    }
    if (list.length === 1) {
      setSelectedProvider(list[0])
      return
    }
    const allow = new Set([...list, 'auto'])
    if (preference && allow.has(preference)) {
      setSelectedProvider(preference)
      return
    }
    setSelectedProvider('auto')
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const ac = new AbortController()
    let cancelled = false
    ;(async () => {
      const list = await fetchChatProviders({ signal: ac.signal })
      if (cancelled) return
      setConfiguredProviders(list)
      let saved = null
      try {
        saved = localStorage.getItem(CHAT_PROVIDER_STORAGE)
      } catch {
        saved = null
      }
      if (list === null) {
        if (saved && PROVIDER_PICKER_ORDER.includes(saved)) setSelectedProvider(saved)
        return
      }
      applyProviderChoice(list, saved)
    })()
    return () => {
      cancelled = true
      ac.abort()
    }
  }, [open, applyProviderChoice])

  const setProvider = useCallback((id) => {
    setSelectedProvider(id)
    try {
      localStorage.setItem(CHAT_PROVIDER_STORAGE, id)
    } catch {
      /* ignore */
    }
  }, [])

  const isProviderChoiceDisabled = (id) => {
    if (id === 'auto') return false
    if (configuredProviders === null) return false
    if (configuredProviders.length === 0) return true
    return !configuredProviders.includes(id)
  }

  const providerHint =
    configuredProviders === null
      ? 'Could not detect which models the server has (common with static preview). Your choice is still sent when you message — use npm run dev or a host with /api/chat.'
      : configuredProviders.length === 0
        ? 'No LLM API keys on the server yet — answers use FAQs until you add keys to .env.'
        : null

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setBusy(true)
    const prior = messages.map(({ role, content }) => ({ role, content }))
    try {
      const { text: reply } = await getAssistantReply(text, prior, {
        provider: selectedProvider,
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } finally {
      setBusy(false)
    }
  }, [busy, input, messages, selectedProvider])

  /** Stop the page (or Lenis) from scrolling behind the chat while the panel is open. */
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /** Pin the thread to the latest message whenever content or “thinking” state changes. */
  useLayoutEffect(() => {
    if (!open) return
    const el = messagesScrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [open, messages, busy])

  const node = (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-backdrop"
            role="presentation"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[115] bg-void/70 sm:hidden"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${siteName} help chat`}
            data-lenis-prevent
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[116] flex flex-col w-[min(100vw-1rem,400px)] h-[min(100dvh-1rem,560px)] sm:h-[min(72vh,520px)] left-1/2 -translate-x-1/2 bottom-3 sm:left-auto sm:translate-x-0 sm:right-5 sm:bottom-[5.25rem] rounded-2xl border border-white/12 bg-deep/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden overscroll-contain"
          >
            <header className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-widest uppercase text-cyan/80">Help</p>
                <p className="font-display font-700 text-white text-sm truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Chat assistant
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/faq"
                  className="text-[11px] font-mono uppercase tracking-wider text-white/50 hover:text-cyan/90 px-2 py-1 rounded-md border border-transparent hover:border-white/10 transition-colors"
                  onClick={close}
                >
                  FAQ
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="w-9 h-9 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-cyan/35 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div
              role="radiogroup"
              aria-label="AI engine"
              className="shrink-0 px-3 py-2 border-b border-white/8 bg-white/[0.02] space-y-2"
            >
              <div className="flex flex-wrap gap-1.5">
                {PROVIDER_PICKER_ORDER.map((id) => {
                  const disabled = isProviderChoiceDisabled(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selectedProvider === id}
                      disabled={disabled}
                      title={
                        disabled
                          ? 'This model is not configured on the server (missing API key).'
                          : undefined
                      }
                      onClick={() => !disabled && setProvider(id)}
                      className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-colors ${
                        disabled
                          ? 'border-white/8 text-white/25 cursor-not-allowed'
                          : selectedProvider === id
                            ? 'border-cyan/45 bg-cyan/15 text-white'
                            : 'border-white/12 text-white/55 hover:border-white/20 hover:text-white/85'
                      }`}
                    >
                      {PROVIDER_LABEL[id]}
                    </button>
                  )
                })}
              </div>
              {providerHint && (
                <p className="text-[10px] text-white/40 leading-snug pr-1">{providerHint}</p>
              )}
            </div>

            <div
              ref={messagesScrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3 overscroll-y-contain touch-pan-y"
            >
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.role}`}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-cyan/25 to-purple/20 border border-white/10 text-white/95'
                        : 'bg-white/[0.06] border border-white/10 text-white/85'
                    }`}
                  >
                    {m.content.split('\n').map((line, li) => (
                      <p key={li} className={li > 0 ? 'mt-2' : ''}>
                        {formatLine(line)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-3 py-2 text-white/45 text-xs font-mono tracking-wider uppercase">
                    Thinking…
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 px-3 pb-2 pt-1 border-t border-white/8 bg-white/[0.02] space-y-2">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleHuman()
                  }}
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-pink/15 border border-pink/35 text-pink/95 hover:bg-pink/25 transition-colors"
                >
                  Talk to our team
                </button>
                <button
                  type="button"
                  onClick={() => {
                    close()
                    openBooking()
                  }}
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/15 text-white/80 hover:border-cyan/40 hover:text-white transition-colors"
                >
                  Book a call
                </button>
                <a
                  href={MAIL_CUSTOMER}
                  className="inline-flex text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/15 text-white/80 hover:border-cyan/40 hover:text-white transition-colors"
                >
                  Email us
                </a>
                <button
                  type="button"
                  onClick={goContact}
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/15 text-white/80 hover:border-cyan/40 hover:text-white transition-colors"
                >
                  Contact form
                </button>
              </div>
              <div className="flex gap-2 items-end">
                <label htmlFor="chat-assistant-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="chat-assistant-input"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send()
                    }
                  }}
                  placeholder="Ask a question…"
                  className="flex-1 min-h-[44px] max-h-28 resize-y rounded-xl bg-void/80 border border-white/12 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-cyan/35"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={busy || !input.trim()}
                  className="shrink-0 h-11 px-4 rounded-xl btn-primary text-xs font-mono uppercase tracking-wider disabled:opacity-40 disabled:pointer-events-none"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={false}
        animate={{ scale: open ? 0.92 : 1 }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-20 z-[117] w-14 h-14 rounded-full border border-cyan/30 bg-gradient-to-br from-cyan/20 to-purple/25 text-white shadow-glow-cyan flex items-center justify-center hover:border-cyan/50 transition-colors"
        aria-label={open ? 'Close help chat' : 'Open help chat'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3C6.48 3 2 6.58 2 11c0 2.24 1.68 4.2 4.2 5.32-.12.88-.44 2.96-.48 3.48 0 0 0 .12.08.18.1.08.22.06.32-.02 0 0 2.36-2.12 3.04-2.56.56.08 1.16.12 1.76.12 5.52 0 10-3.58 10-8S17.52 3 12 3z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="rgba(0,212,255,0.12)"
            />
          </svg>
        )}
      </motion.button>
    </>
  )

  if (!mounted) return null
  return createPortal(node, document.body)
}

/** Bold **segments** in assistant copy */
function formatLine(line) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/)
    if (m) {
      return (
        <strong key={i} className="text-white/95 font-semibold">
          {m[1]}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
