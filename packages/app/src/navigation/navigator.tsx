import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { RootNavigator } from './root'

/**
 * Application navigator.
 * @returns <Navigator />.
 */
export const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
