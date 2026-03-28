import { NextResponse } from 'next/server'
import {
  hasAnyLlmConfigured,
  listConfiguredProviders,
  runProviderChat,
} from '../../../../server/llmChatCore.js'

function chatConfig() {
  return {
    CHAT_PROVIDER: process.env.CHAT_PROVIDER,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function GET() {
  const config = chatConfig()
  const providers = listConfiguredProviders(config)
  return NextResponse.json(
    { providers },
    { status: 200, headers: { 'Cache-Control': 'no-store', ...corsHeaders() } },
  )
}

export async function POST(req) {
  const config = chatConfig()

  if (!hasAnyLlmConfigured(config)) {
    return NextResponse.json(
      {
        error: 'no_llm_api_key',
        hint: 'Set OPENAI_API_KEY, ANTHROPIC_API_KEY, and/or GEMINI_API_KEY on the server (not NEXT_PUBLIC_*).',
      },
      { status: 503, headers: corsHeaders() },
    )
  }

  let json
  try {
    const raw = await req.text()
    if (raw.length > 150_000) {
      return NextResponse.json({ error: 'payload_too_large' }, { status: 400 })
    }
    json = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const messages = json?.messages
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages_array_required' }, { status: 400 })
  }

  const requestedProvider =
    typeof json?.provider === 'string' || json?.provider === null ? json.provider : undefined

  try {
    const reply = await runProviderChat(config, messages, { requestedProvider })
    return NextResponse.json({ reply }, { status: 200, headers: corsHeaders() })
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || 'chat_failed' },
      { status: 502, headers: corsHeaders() },
    )
  }
}
