/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { EventManagerProvider } from '~/hooks/event-manager'
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
    <EventManagerProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </EventManagerProvider>
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
    <EventManagerProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </EventManagerProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper
    })
  }
}
