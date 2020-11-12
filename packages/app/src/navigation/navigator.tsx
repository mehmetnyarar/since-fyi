import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useTheme } from '~/theme'
import { DrawerNavigator } from './drawer'
import { InitialScreen } from './types'

/**
 * <Navigator /> props.
 */
interface Props {
  initialScreen?: InitialScreen
}

/**
 * Application navigator.
 * @param props Props.
 * @returns <Navigator />.
 */
export const Navigator: React.FC<Props> = ({ initialScreen }) => {
  const theme = useTheme()

  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigator initialScreen={initialScreen} />
    </NavigationContainer>
  )
}
