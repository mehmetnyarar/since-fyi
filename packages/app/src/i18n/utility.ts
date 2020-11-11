import { Resource } from 'i18next'
import { LANGUAGES } from './const'
import { common } from './resources'

/**
 * Returns i18n translations.
 */
export const getTranslations = () => {
  const value = LANGUAGES.reduce((translations, language) => {
    translations[language] = {
      common: common[language]
    }

    return translations
  }, {} as Resource)

  return value
}
