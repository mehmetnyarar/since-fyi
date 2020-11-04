import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { EventScreen } from '~/screens/event'
import { HomeScreen } from '~/screens/home'
import { RootStackParams } from './types'

/**
 * Root stack.
 */
const Root = createStackNavigator<RootStackParams>()

/**
 * Root navigator.
 * @returns <RootNavigator />.
 */
export const RootNavigator: React.FC = () => {
  return (
    <Root.Navigator>
      <Root.Screen name='Home' component={HomeScreen} />
      <Root.Screen name='Event' component={EventScreen} />
    </Root.Navigator>
  )
}
