import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Navigator } from '~/navigation'
import { ErrorBoundary } from './components/error'
import { useBoot } from './hooks/boot'

/**
 * Application.
 */
export const App = () => {
  const { isReady } = useBoot()

  if (!isReady) return <AppLoading autoHideSplash />

  return (
    <ErrorBoundary>
      <Navigator />
      <StatusBar style='auto' />
    </ErrorBoundary>
  )
}

export default App
