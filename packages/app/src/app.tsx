import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { ErrorBoundary } from './components/error-boundary'
import { useBoot } from './hooks'
import { Navigator } from './navigation'

/**
 * Application.
 */
export const App = () => {
  const { isReady } = useBoot()

  useEffect(() => {
    try {
      SplashScreen.preventAutoHideAsync()
    } catch (error) {
      console.error('App/SplashScreen/preventAutoHideAsync', { error })
    }
  }, [])

  useEffect(() => {
    try {
      SplashScreen.hideAsync()
    } catch (error) {
      console.error('App/SplashScreen/hideAsync', { error })
    }
  }, [isReady])

  if (!isReady) return null

  return (
    <ErrorBoundary>
      <Navigator />
    </ErrorBoundary>
  )
}

export default App
