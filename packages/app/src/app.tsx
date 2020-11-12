import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React, { Suspense, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigator } from '~/navigation'
import { ErrorBoundary } from './components/error'
import { useBoot } from './hooks/boot'
import { EventManagerProvider } from './hooks/event-manager'
import { i18n } from './i18n'
import { dark, light, ThemeProvider } from './theme'
import { FullScreenLoading } from './ui'

/**
 * Provides theme, i18n and data to the application.
 */
const OtherProviders: React.FC = ({ children }) => {
  const scheme = useColorScheme()
  const theme = useMemo(() => {
    return scheme === 'dark' ? dark : light
  }, [scheme])

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <EventManagerProvider>{children}</EventManagerProvider>
      </I18nextProvider>
    </ThemeProvider>
  )
}

/**
 * Application UI.
 */
const App: React.FC = () => {
  const { isReady } = useBoot()

  return isReady ? (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Suspense fallback={<FullScreenLoading />}>
          <Navigator />
        </Suspense>
      </ErrorBoundary>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  ) : (
    <AppLoading autoHideSplash />
  )
}

/**
 * Application.
 */
export default function Application () {
  return (
    <AppearanceProvider>
      <OtherProviders>
        <App />
      </OtherProviders>
    </AppearanceProvider>
  )
}
