import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ja from './locales/ja.json'

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'ja',  // Japan first
  fallbackLocale: 'en',
  messages: {
    ja,
    en
  }
})