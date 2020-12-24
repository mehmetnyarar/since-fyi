import { locales } from '@sincefyi/i18n'
import { Resource } from 'i18next'
import { LANGUAGES } from './const'

/**
 * Returns i18n translations.
 */
export const getTranslations = () => {
  const value = LANGUAGES.reduce((translations, language) => {
    translations[language] = {
      common: locales[language].common
    }

    return translations
  }, {} as Resource)

  return value
}
