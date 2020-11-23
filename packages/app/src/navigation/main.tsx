import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { EventScreen } from '~/screens/main/event'
import { HomeScreen } from '~/screens/main/home'
import { MainNavigationParams } from './types'

/**
 * Main navigation.
 */
const Main = createStackNavigator<MainNavigationParams>()

/**
 * Main navigator.
 * @returns &lt;MainNavigator />.
 */
export const MainNavigator: React.FC = () => {
  return (
    <Main.Navigator headerMode='none'>
      <Main.Screen name='Home' component={HomeScreen} />
      <Main.Screen name='Event' component={EventScreen} />
    </Main.Navigator>
  )
}
