import { NavigationContainer } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { ColorSchemeName } from 'react-native-appearance'
import { DarkTheme, LightTheme } from '~/theme'
import { RootNavigator } from './root'

/**
 * <Navigator /> props.
 */
interface Props {
  scheme: ColorSchemeName
}

/**
 * Application navigator.
 * @returns <Navigator />.
 */
export const Navigator: React.FC<Props> = ({ scheme }) => {
  const theme = useMemo(() => (scheme === 'dark' ? DarkTheme : LightTheme), [
    scheme
  ])

  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
