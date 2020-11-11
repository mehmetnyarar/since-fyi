import { DEFAULT_LANGUAGE, DEFAULT_NS, LANGUAGES } from '~/i18n/const'
import { Backend } from '~/i18n/plugins'

jest.spyOn(console, 'debug')
const callback = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
})

describe('i18n/plugins/backend', () => {
  it('should function', () => {
    Backend.init({} as never, {}, {})
    expect(console.debug).toHaveBeenCalled()

    Backend.read(DEFAULT_LANGUAGE, DEFAULT_NS, callback)
    expect(console.debug).toHaveBeenCalled()

    Backend.create(LANGUAGES, DEFAULT_NS, 'test', 'value')
    expect(console.debug).toHaveBeenCalled()
  })
})
