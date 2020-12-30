/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-native/extend-expect'
import 'react-native-gesture-handler/jestSetup'

jest.mock('@expo-google-fonts/rubik', () => {
  return {
    Rubik_400Regular: 400,
    Rubik_500Medium: 500,
    Rubik_700Bold: 700,
    useFonts: jest.fn(() => [true])
  }
})

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')
  Reanimated.default.call = () => {}

  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

// Mock AsyncStorage
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

// Mock nanoid
jest.mock('nanoid/async/index.native', () => ({
  nanoid: () => '123456'
}))

// Mock debug messages
jest.spyOn(console, 'debug').mockImplementation(() => jest.fn())

// Mock i18n
jest.mock('expo-localization', () => {
  return {
    getLocalizationAsync: async () => {
      return {
        locale: 'en-US'
      }
    }
  }
})
jest.mock('react-i18next', () => {
  const actual = jest.requireActual('react-i18next')

  return {
    ...actual,
    useTranslation: () => ({
      t: (t: string) => t,
      i18n: {
        language: 'en',
        changeLanguage: async (language: string) => {
          console.log(language)
        }
      }
    })
  }
})

jest.mock('@sincefyi/i18n', () => {
  const locales = {
    en: { common: {} },
    ru: { common: {} },
    tr: { common: {} }
  }

  return {
    locales,
    ...locales
  }
})

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('React')
  const RealComponent = jest.requireActual(
    '@react-native-community/datetimepicker'
  )

  class Picker extends React.Component {
    render () {
      return React.createElement('Picker', this.props, this.props.children)
    }
  }

  Picker.propTypes = RealComponent.propTypes
  return Picker
})

jest.mock('@react-native-community/picker', () => {
  const React = require('React')
  const RealComponent = jest.requireActual('@react-native-community/picker')

  class Picker extends React.Component {
    static Item = (props: { children: never }) => {
      return React.createElement('Item', props, props.children)
    }

    render () {
      return React.createElement('Picker', this.props, this.props.children)
    }
  }

  Picker.propTypes = RealComponent.propTypes
  return {
    Picker
  }
})
