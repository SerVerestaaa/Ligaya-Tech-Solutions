import { faqItems } from '../data/faq'
import { siteName } from '../siteConfig'

/** Phrases that mean the user wants a human — answer with handoff + CTAs. */
const HUMAN_TRIGGERS =
  /\b(human|real person|someone real|live person|live agent|customer service|client service|support team|speak to someone|talk to someone|talk to a person|speak to a person|real support|phone support|call me|call us|representative|account manager|escalate|manager)\b/i

const EXTRA_SNIPPETS = [
  {
    keys: ['service', 'offer', 'do you', 'what do you build', 'tech stack'],
    text:
      `${siteName} builds marketing sites, web apps, internal systems, POS and inventory tools, and thesis or capstone projects. We often use React, Node, and can align with your existing stack when it makes sense.`,
  },
  {
    keys: ['hello', 'hi', 'hey'],
    text: `Hi there — I'm the on-site helper for ${siteName}. Ask about pricing, timelines, location, or how to get started. If you prefer a person, use "Talk to our team" below.`,
  },
  {
    keys: ['contact', 'email', 'reach'],
    text:
      'You can email ligayatechsolutions@gmail.com, use the contact form on this site, or book a call — we usually reply within one business day.',
  },
  {
    keys: ['book', 'schedule', 'call', 'meeting', 'calendar'],
    text:
      'You can book a discovery call from the site (Book / Get a quote) so we can match you with the right person on the team.',
  },
]

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function scoreFaq(userNorm, item) {
  const qWords = normalize(item.question)
    .split(' ')
    .filter((w) => w.length > 2)
  let score = 0
  for (const w of qWords) {
    if (userNorm.includes(w)) score += 1
  }
  const answerWords = ['pricing', 'payment', 'retainer', 'timeline', 'launch', 'stack', 'based', 'communicate']
  for (const w of answerWords) {
    if (userNorm.includes(w) && normalize(item.question + ' ' + item.answer).includes(w)) score += 0.5
  }
  return score
}

function bestFaqAnswer(query) {
  const userNorm = normalize(query)
  if (userNorm.length < 2) return null

  let best = null
  let bestScore = 0
  for (const item of faqItems) {
    const s = scoreFaq(userNorm, item)
    if (s > bestScore) {
      bestScore = s
      best = item
    }
  }
  if (best && bestScore >= 1.5) return best.answer
  if (best && bestScore >= 1 && userNorm.length <= 48) return best.answer
  return null
}

function extraAnswer(query) {
  const n = normalize(query)
  for (const block of EXTRA_SNIPPETS) {
    if (block.keys.some((k) => n.includes(k.replace(/\s+/g, ' ')))) return block.text
  }
  return null
}

export function resolveChatApiUrl() {
  const custom = process.env.NEXT_PUBLIC_ASSISTANT_API_URL
  if (custom && String(custom).trim()) return String(custom).trim()
  /** Same-origin: Next.js `app/api/chat` or equivalent */
  return '/api/chat'
}

/**
 * @returns {Promise<('openai'|'anthropic'|'gemini')[] | null>} list when GET succeeded (may be empty);
 *   `null` when the server did not return JSON (preview build, static host, or old deploy).
 */
export async function fetchChatProviders(opts = {}) {
  try {
    const res = await fetch(resolveChatApiUrl(), { method: 'GET', signal: opts.signal })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) return null
    const data = await res.json()
    if (!Array.isArray(data?.providers)) return null
    return data.providers
  } catch {
    return null
  }
}

async function tryLlmReply(trimmed, history, opts) {
  const apiUrl = resolveChatApiUrl()
  const messages = [...history.map(({ role, content }) => ({ role, content })), { role: 'user', content: trimmed }]
  const body = { messages }
  if (opts.provider && String(opts.provider).trim()) {
    body.provider = opts.provider
  }
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: opts.signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    const text =
      typeof data?.reply === 'string'
        ? data.reply
        : typeof data?.message === 'string'
          ? data.message
          : typeof data?.text === 'string'
            ? data.text
            : ''
    const t = text.trim()
    return t || null
  } catch {
    return null
  }
}

/**
 * @param {string} userText
 * @param {{ role: 'user' | 'assistant', content: string }[]} history Prior turns only (excludes `userText`).
 * @param {{ signal?: AbortSignal, provider?: 'auto' | 'openai' | 'anthropic' | 'gemini' }} [opts]
 * @returns {Promise<{ text: string, kind: 'human_handoff' | 'api' | 'faq' | 'snippet' | 'fallback' }>}
 */
export async function getAssistantReply(userText, history, opts = {}) {
  const trimmed = userText.trim()
  if (!trimmed) {
    return {
      text: `Ask a question about ${siteName}, or tap "Talk to our team" for customer service.`,
      kind: 'fallback',
    }
  }

  const llm = await tryLlmReply(trimmed, history, {
    signal: opts.signal,
    provider: opts.provider,
  })
  if (llm) return { text: llm, kind: 'api' }

  if (HUMAN_TRIGGERS.test(trimmed)) {
    return {
      text: 'No problem — our team can take it from here. Use email, the contact form, or book a call; we typically respond within one business day.',
      kind: 'human_handoff',
    }
  }

  const faq = bestFaqAnswer(trimmed)
  if (faq) return { text: faq, kind: 'faq' }

  const snippet = extraAnswer(trimmed)
  if (snippet) return { text: snippet, kind: 'snippet' }

  return {
    text: `I don't have a specific answer for that on file. Try rephrasing, browse our FAQ, or tap "Talk to our team" — a real person will help you out.`,
    kind: 'fallback',
  }
}
