import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => ({
  // Treat custom fence labels as known languages to avoid build errors.
  langAlias: {
    pseudo: 'markdown',
    pseudocode: 'markdown',
  },
  fallbackLanguage: 'markdown',
}))
