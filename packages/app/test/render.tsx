/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'

/**
 * Render options.
 */
interface RenderOptions {
  otherScreens?: React.FC[]
}

/**
 * <Navigator /> props.
 */
interface NavigatorProps {
  screens: React.FC[]
}

/**
 * React navigation wrapper.
 * Puts all screens into a stack navigator.
 * @param props Props.
 * @returns <Navigator />.
 */
const Navigator: React.FC<NavigatorProps> = ({ screens }) => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={`Screen${index}`}
            component={screen}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/**
 * Renderer for screens.
 * @param ui Screen.
 * @param options Options.
 */
export const renderScreen = (
  ui: React.FC<any>,
  options: RenderOptions = {}
) => {
  const { otherScreens = [], ...rest } = options

  return {
    ...rtlRender(<Navigator screens={[ui, ...otherScreens]} />, {
      ...rest
    })
  }
}

/**
 * Renderer non-screen components.
 */
export { rtlRender as render }
