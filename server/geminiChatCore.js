/**
 * Re-exports for older imports — prefer `./llmChatCore.js`.
 */
export {
  buildKnowledgeBlock,
  buildSystemPrompt,
  runGeminiChat,
  runProviderChat,
  pickProvider,
  hasAnyLlmConfigured,
  listConfiguredProviders,
} from './llmChatCore.js'
