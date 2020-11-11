/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { EventManagerProvider } from '~/hooks/event-manager'
import { i18n } from '~/i18n'
import { light, Theme, ThemeProvider } from '~/theme'

/**
 * Render options.
 */
interface RenderOptions {
  theme?: Theme
}

/**
 * Screen.
 */
interface Screen {
  name: string
  component: React.FC<any>
}

/**
 * Render options.
 */
interface ScreenRenderOptions extends RenderOptions {
  main: Screen
  next?: Screen
}

/**
 * Renderer for screens.
 * @param ui Screen.
 * @param options Options.
 */
export const renderScreen = (options: ScreenRenderOptions) => {
  const { theme = light, main, next } = options
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <EventManagerProvider>{children}</EventManagerProvider>
      </I18nextProvider>
    </ThemeProvider>
  )

  const Stack = createStackNavigator()

  return {
    ...rtlRender(
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen {...main} />
          {next && <Stack.Screen {...next} />}
        </Stack.Navigator>
      </NavigationContainer>,
      { wrapper: Wrapper }
    )
  }
}

/**
 * Renderer non-screen components.
 */
export const render = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const { theme = light } = options
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <EventManagerProvider>{children}</EventManagerProvider>
      </I18nextProvider>
    </ThemeProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper
    })
  }
}
