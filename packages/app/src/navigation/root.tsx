import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '~/screens/home'
import { RootParamList } from './parameters'

/**
 * Root navigator.
 */
const Root = createStackNavigator<RootParamList>()

/**
 * Renders <RootNavigator />.
 */
export const RootNavigator: React.FC = () => {
  return (
    <Root.Navigator headerMode='none'>
      <Root.Screen name='Home' component={HomeScreen} />
    </Root.Navigator>
  )
}
