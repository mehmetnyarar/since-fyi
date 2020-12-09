import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useTheme } from '~/theme'
import { DrawerNavigator } from './drawer'
import { NavigatorProps } from './types'

/**
 * Application navigator.
 * @param props Props.
 * @returns &lt;Navigator />.
 */
export const Navigator: React.FC<NavigatorProps> = props => {
  const theme = useTheme()

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator {...props} />
    </NavigationContainer>
  )
}
