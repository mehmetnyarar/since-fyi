import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigator } from '~/navigation'
import { ErrorBoundary } from './components/error'
import { useBoot } from './hooks/boot'
import { EventManagerProvider } from './hooks/event-manager'
import { dark, light, ThemeProvider } from './theme'

const AppContainer: React.FC = ({ children }) => {
  return (
    <ErrorBoundary>
      <AppearanceProvider>
        <EventManagerProvider>{children}</EventManagerProvider>
      </AppearanceProvider>
    </ErrorBoundary>
  )
}

const App: React.FC = () => {
  const { isReady } = useBoot()
  const scheme = useColorScheme()
  const theme = useMemo(() => {
    return scheme === 'dark' ? dark : light
  }, [scheme])

  if (!isReady) return <AppLoading autoHideSplash />

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Navigator theme={theme} />
      </ThemeProvider>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  )
}

/**
 * Application.
 */
export default function Application () {
  return (
    <AppContainer>
      <App />
    </AppContainer>
  )
}
