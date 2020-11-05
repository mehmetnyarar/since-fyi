import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Theme } from '~/theme'
import { RootNavigator } from './root'

/**
 * <Navigator /> props.
 */
interface Props {
  theme: Theme
}

/**
 * Application navigator.
 * @param props Props.
 * @returns <Navigator />.
 */
export const Navigator: React.FC<Props> = ({ theme }) => {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
