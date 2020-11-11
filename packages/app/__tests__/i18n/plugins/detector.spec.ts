import AsyncStorage from '@react-native-community/async-storage'
import { waitFor } from '@testing-library/react-native'
import { STORAGE_KEY } from '~/i18n/const'
import { LanguageDetector } from '~/i18n/plugins'

jest.spyOn(console, 'debug')
const callback = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
})

describe('i18n/plugins/detector', () => {
  it('should function', async () => {
    LanguageDetector.init({} as never, {}, {})
    expect(console.debug).toHaveBeenCalled()

    LanguageDetector.detect(callback)
    await waitFor(() => {
      expect(callback).toHaveBeenCalledWith('en')
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY)
    })

    LanguageDetector.cacheUserLanguage('tr')
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, 'tr')
    })
  })
})
