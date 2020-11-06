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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
