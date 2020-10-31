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

jest.mock('expo-splash-screen', () => {
  return {
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn()
  }
})

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {}

  return Reanimated
})

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useNavigation: () => ({
      canGoBack: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn()
    })
  }
})
