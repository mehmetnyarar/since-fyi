import { LANGUAGES } from '~/i18n/const'
import { getTranslations } from '~/i18n/utility'

describe('i18n/utility', () => {
  it('should return translations', () => {
    const value = getTranslations()
    const languages = Object.keys(value)

    expect(languages).toHaveLength(3)
    expect(languages).toEqual(LANGUAGES)
  })
})
