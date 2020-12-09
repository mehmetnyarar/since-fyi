/* eslint-disable camelcase */

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts
} from '@expo-google-fonts/rubik'

/**
 * Initializes the resources that the application needs.
 */
export const useBoot = () => {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  })

  // NOTE There could be other loaders
  // Such as querying the signed user from the api or caching images

  return {
    isReady: fontsLoaded
  }
}
