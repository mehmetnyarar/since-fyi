/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'

interface RenderOptions {}

// Original RTL render
// In the future, we might need a wrapper for context creators
export const render = rtlRender

// #region Screen

interface NavigatorProps<P = unknown> {
  screen: React.FC<P>
}

const Navigator: React.FC<NavigatorProps> = ({ screen }) => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Screen' component={screen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const renderScreen = (
  ui: React.FC<any>,
  options: RenderOptions = {}
) => {
  return {
    ...rtlRender(<Navigator screen={ui} />, {
      ...options
    })
  }
}

// #endregion
