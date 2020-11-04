/* eslint-disable camelcase */

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts
} from '@expo-google-fonts/rubik'

/**
 * Loads the application resources and the initial data.
 */
export const useBoot = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  })

  return {
    isReady: fontsLoaded
  }
}
