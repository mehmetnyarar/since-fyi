import AsyncStorage from '@react-native-community/async-storage'
import { getLocalizationAsync } from 'expo-localization'
import { LanguageDetectorAsyncModule } from 'i18next'
import { DEFAULT_LANGUAGE, STORAGE_KEY } from '../const'

/**
 * i18n language detector plugin.
 */
export const LanguageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: (services, detectorOptions, i18nextOptions) => {
    console.debug('LanguageDetector/init', {
      services,
      detectorOptions,
      i18nextOptions
    })
  },
  detect: async callback => {
    try {
      const localization = await getLocalizationAsync()
      const native = localization.locale.split('-')[0]
      const saved = await AsyncStorage.getItem(STORAGE_KEY)
      const lang = saved || native || DEFAULT_LANGUAGE
      console.debug('LanguageDetector/detect', {
        localization,
        native,
        saved,
        lang
      })
      callback(lang)
    } catch (error) {
      console.error('LanguageDetector/detect', error)
      callback(DEFAULT_LANGUAGE)
    }
  },
  cacheUserLanguage: async language => {
    try {
      console.debug('LanguageDetector/cacheUserLanguage', { language })
      await AsyncStorage.setItem(STORAGE_KEY, language)
    } catch (error) {
      console.error('LanguageDetector/cacheUserLanguage', error)
    }
  }
}
