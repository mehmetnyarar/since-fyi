/* eslint-disable react/display-name */

import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Header, Menu } from '~/components/screen'
import { AboutScreen } from '~/screens/drawer/about'
import { PolicyScreen } from '~/screens/drawer/policy'
import { SettingsScreen } from '~/screens/drawer/settings'
import { useTheme } from '~/theme'
import { MainNavigator } from './main'
import { DrawerNavigationParams, InitialScreen } from './types'

/**
 * Drawer navigation.
 */
const Drawer = createDrawerNavigator<DrawerNavigationParams>()

/**
 * <DrawerNavigator /> props.
 */
interface Props {
  initialScreen?: InitialScreen
}

/**
 * Drawer navigator.
 * @returns <DrawerNavigator />.
 */
export const DrawerNavigator: React.FC<Props> = ({ initialScreen }) => {
  const { colors } = useTheme()

  return (
    <Drawer.Navigator
      initialRouteName={initialScreen}
      drawerPosition='left'
      drawerType='front'
      hideStatusBar={false}
      statusBarAnimation='none'
      keyboardDismissMode='on-drag'
      overlayColor={colors.backdrop}
      drawerContent={props => <Menu {...props} />}
      screenOptions={{ header: () => <Header /> }}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
      <Drawer.Screen name='About' component={AboutScreen} />
      <Drawer.Screen name='Policy' component={PolicyScreen} />
    </Drawer.Navigator>
  )
}
