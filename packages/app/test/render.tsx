/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { light, Theme, ThemeProvider } from '~/theme'

interface Screen {
  name: string
  component: React.FC<any>
}

/**
 * Render options.
 */
interface RenderOptions {
  theme?: Theme
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
  const Stack = createStackNavigator()

  return {
    ...rtlRender(
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen {...main} />
            {next && <Stack.Screen {...next} />}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    )
  }
}

/**
 * Renderer non-screen components.
 */
export const render = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const { theme = light, ...renderOptions } = options
  const Wrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}
