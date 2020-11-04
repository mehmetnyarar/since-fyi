import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { Navigator } from '~/navigation'
import { ErrorBoundary } from './components/error'
import { useBoot } from './hooks/boot'

const AppContainer: React.FC = ({ children }) => (
  <ErrorBoundary>
    <AppearanceProvider>{children}</AppearanceProvider>
    <StatusBar style='auto' />
  </ErrorBoundary>
)

/**
 * Application.
 */
export default function App () {
  const { isReady } = useBoot()
  const scheme = useColorScheme()

  if (!isReady) return <AppLoading autoHideSplash />

  return (
    <AppContainer>
      <Navigator scheme={scheme} />
    </AppContainer>
  )
}
