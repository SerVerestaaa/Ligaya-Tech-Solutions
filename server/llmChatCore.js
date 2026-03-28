/**
 * Multi-provider site chat — OpenAI (ChatGPT), Anthropic (Claude), or Google Gemini.
 * Used by Vite dev middleware and Vercel `api/chat`. Keys stay server-side only.
 */
import { faqItems } from '../src/data/faq.js'

const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash'
const DEFAULT_OPENAI_MODEL = 'gpt-4o'
/** Strong default; override with ANTHROPIC_MODEL (e.g. claude-3-5-haiku-20241022 for cheaper turns). */
const DEFAULT_ANTHROPIC_MODEL = 'claude-3-5-sonnet-20241022'

const MAX_MESSAGES = 24
const MAX_MESSAGE_CHARS = 4000
const MAX_TOTAL_CHARS = 14000

export function buildKnowledgeBlock() {
  return faqItems.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
}

export function buildSystemPrompt() {
  const kb = buildKnowledgeBlock()
  return `You are the witty, razor-sharp website concierge for Ligaya Technology Solutions — a software studio in Pampanga, Philippines (remote-friendly worldwide). You are powered by a real frontier LLM, not a script: think, clarify, and answer like a senior consultant who actually enjoys helping.

How to behave:
- Be genuinely useful first, entertaining second. If the question is vague, ask one short clarifying question OR make one reasonable assumption and state it.
- When our FAQ/knowledge applies, lean on it and paraphrase naturally — don't paste it verbatim unless they want exact wording.
- For anything not in the knowledge (pricing specifics, legal, health, unrelated tech support), say you don't have that on file and point them to ligayatechsolutions@gmail.com, the contact form, or booking a discovery call. Humans usually reply within a business day.
- Never invent exact prices, signed timelines, guarantees, or legal claims.
- If they want a human, customer service, or a real person, sound delighted to hand off — same email, contact form, booking.
- Style: warm, concise, confident. Light wordplay is welcome; avoid corny puns every line. No markdown # headings; short paragraphs or bullets are fine.

Knowledge base:
${kb}`
}

function clampMessages(raw) {
  if (!Array.isArray(raw)) return []
  const out = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, MAX_MESSAGE_CHARS),
    }))

  let total = 0
  const trimmed = []
  for (let i = out.length - 1; i >= 0; i--) {
    const len = out[i].content.length
    if (total + len > MAX_TOTAL_CHARS) break
    total += len
    trimmed.push(out[i])
  }
  return trimmed.reverse()
}

/** Drop leading assistant turns so the API always starts with a user message (required by OpenAI/Anthropic pattern). */
function normalizeTurns(messages) {
  const list = clampMessages(messages)
  let start = 0
  while (start < list.length && list[start].role === 'assistant') start += 1
  const turns = list.slice(start)
  if (turns.length === 0) throw new Error('no_user_messages')
  if (turns[0].role !== 'user') throw new Error('invalid_conversation_start')
  return turns
}

export async function runGeminiChat(apiKey, modelId, messages) {
  const systemPrompt = buildSystemPrompt()
  const turns = normalizeTurns(messages)
  const contents = turns.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${encodeURIComponent(apiKey)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.88,
        maxOutputTokens: 1200,
        topP: 0.95,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    const errObj = new Error(`gemini_http_${res.status}`)
    errObj.detail = err.slice(0, 400)
    throw errObj
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text || !String(text).trim()) {
    const block = data?.promptFeedback?.blockReason
    if (block) throw new Error(`gemini_blocked:${block}`)
    throw new Error('gemini_empty_reply')
  }
  return String(text).trim()
}

export async function runOpenAiChat(apiKey, modelId, messages) {
  const systemPrompt = buildSystemPrompt()
  const turns = normalizeTurns(messages)
  const openaiMessages = [{ role: 'system', content: systemPrompt }]
  for (const m of turns) {
    openaiMessages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    })
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: openaiMessages,
      temperature: 0.88,
      max_tokens: 1200,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    const e = new Error(`openai_http_${res.status}`)
    e.detail = err.slice(0, 400)
    throw e
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text || !String(text).trim()) throw new Error('openai_empty_reply')
  return String(text).trim()
}

export async function runAnthropicChat(apiKey, modelId, messages) {
  const systemPrompt = buildSystemPrompt()
  const turns = normalizeTurns(messages)
  const anthropicMessages = turns.map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }))

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 1200,
      system: systemPrompt,
      messages: anthropicMessages,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    const e = new Error(`anthropic_http_${res.status}`)
    e.detail = err.slice(0, 400)
    throw e
  }

  const data = await res.json()
  const parts = data?.content
  if (!Array.isArray(parts) || parts.length === 0) throw new Error('anthropic_empty_reply')
  const text = parts.map((p) => (p.type === 'text' ? p.text : '')).join('')
  if (!text.trim()) throw new Error('anthropic_empty_reply')
  return text.trim()
}

function normalizeProvider(raw) {
  const p = String(raw || 'auto').toLowerCase().trim()
  if (['openai', 'anthropic', 'gemini', 'auto'].includes(p)) return p
  return 'auto'
}

/** @param {Record<string, string | undefined>} config env or loadEnv object */
export function hasAnyLlmConfigured(config) {
  return Boolean(
    config.OPENAI_API_KEY?.trim() || config.ANTHROPIC_API_KEY?.trim() || config.GEMINI_API_KEY?.trim(),
  )
}

/** Which providers have keys set (for UI buttons). Order: OpenAI, Anthropic, Gemini. */
export function listConfiguredProviders(config) {
  const out = []
  if (config.OPENAI_API_KEY?.trim()) out.push('openai')
  if (config.ANTHROPIC_API_KEY?.trim()) out.push('anthropic')
  if (config.GEMINI_API_KEY?.trim()) out.push('gemini')
  return out
}

function normalizeRequestedProvider(raw) {
  if (raw === undefined || raw === null || raw === '') return 'auto'
  const p = String(raw).toLowerCase().trim()
  if (p === 'auto') return 'auto'
  if (['openai', 'anthropic', 'gemini'].includes(p)) return p
  return '__invalid__'
}

/**
 * @param {Record<string, string | undefined>} config
 * @returns {'openai'|'anthropic'|'gemini'}
 */
export function pickProvider(config) {
  const want = normalizeProvider(config.CHAT_PROVIDER)
  const keys = {
    openai: Boolean(config.OPENAI_API_KEY?.trim()),
    anthropic: Boolean(config.ANTHROPIC_API_KEY?.trim()),
    gemini: Boolean(config.GEMINI_API_KEY?.trim()),
  }

  if (want === 'openai') {
    if (!keys.openai) throw new Error('OPENAI_API_KEY missing (CHAT_PROVIDER=openai)')
    return 'openai'
  }
  if (want === 'anthropic') {
    if (!keys.anthropic) throw new Error('ANTHROPIC_API_KEY missing (CHAT_PROVIDER=anthropic)')
    return 'anthropic'
  }
  if (want === 'gemini') {
    if (!keys.gemini) throw new Error('GEMINI_API_KEY missing (CHAT_PROVIDER=gemini)')
    return 'gemini'
  }

  // auto: prefer OpenAI (ChatGPT-class), then Claude, then Gemini
  if (keys.openai) return 'openai'
  if (keys.anthropic) return 'anthropic'
  if (keys.gemini) return 'gemini'
  throw new Error('no_llm_api_key')
}

/**
 * @param {Record<string, string | undefined>} config env-style map (Vite loadEnv or process.env)
 * @param {{ requestedProvider?: string }} [options] optional per-request override from the chat UI (`openai` | `anthropic` | `gemini` | `auto`)
 */
export async function runProviderChat(config, messages, options = {}) {
  const requested = normalizeRequestedProvider(options.requestedProvider ?? options.provider)
  if (requested === '__invalid__') throw new Error('invalid_provider')

  let provider
  if (requested === 'auto') {
    provider = pickProvider(config)
  } else {
    const keys = {
      openai: Boolean(config.OPENAI_API_KEY?.trim()),
      anthropic: Boolean(config.ANTHROPIC_API_KEY?.trim()),
      gemini: Boolean(config.GEMINI_API_KEY?.trim()),
    }
    if (requested === 'openai' && !keys.openai) throw new Error('provider_not_configured:openai')
    if (requested === 'anthropic' && !keys.anthropic) throw new Error('provider_not_configured:anthropic')
    if (requested === 'gemini' && !keys.gemini) throw new Error('provider_not_configured:gemini')
    provider = requested
  }

  if (provider === 'openai') {
    const model = config.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL
    return runOpenAiChat(config.OPENAI_API_KEY.trim(), model, messages)
  }
  if (provider === 'anthropic') {
    const model = config.ANTHROPIC_MODEL?.trim() || DEFAULT_ANTHROPIC_MODEL
    return runAnthropicChat(config.ANTHROPIC_API_KEY.trim(), model, messages)
  }
  const model = config.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL
  return runGeminiChat(config.GEMINI_API_KEY.trim(), model, messages)
}
