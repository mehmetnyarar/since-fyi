import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigator } from '~/navigation'
import { ErrorBoundary } from './components/error'
import { useBoot } from './hooks/boot'
import { dark, light, ThemeProvider } from './theme'

const AppContainer: React.FC = ({ children }) => (
  <ErrorBoundary>
    <AppearanceProvider>{children}</AppearanceProvider>
  </ErrorBoundary>
)

const App: React.FC = () => {
  const scheme = useColorScheme()
  const theme = useMemo(() => {
    return scheme === 'dark' ? dark : light
  }, [scheme])

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
  const { isReady } = useBoot()

  if (!isReady) return <AppLoading autoHideSplash />

  return (
    <AppContainer>
      <App />
    </AppContainer>
  )
}
