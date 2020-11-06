/* eslint-disable camelcase */

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts
} from '@expo-google-fonts/rubik'
import { useContext, useEffect, useMemo } from 'react'
import { EventManagerContext } from './event-manager'

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

  // Load data
  const { load, result: data } = useContext(EventManagerContext)
  useEffect(() => {
    load()
  }, [load])

  // Is ready?
  const isReady = useMemo(() => {
    return fontsLoaded && Boolean(data)
  }, [fontsLoaded, data])

  return {
    isReady
  }
}
