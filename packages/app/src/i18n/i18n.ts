import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, DEFAULT_NS, LANGUAGES, NS } from './const'
import { Backend, LanguageDetector } from './plugins'
import { getTranslations } from './utility'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: getTranslations(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES,
    load: 'languageOnly',
    ns: NS,
    defaultNS: DEFAULT_NS,
    fallbackNS: DEFAULT_NS,
    keySeparator: false,
    pluralSeparator: '#',
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    backend: {},
    detection: {},
    debug: process.env.NODE_ENV === 'development'
  })

export { i18n }
export default i18n
