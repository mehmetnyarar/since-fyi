import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Menu } from '~/components/screen'
import { AboutScreen } from '~/screens/drawer/about'
import { PolicyScreen } from '~/screens/drawer/policy'
import { SettingsScreen } from '~/screens/drawer/settings'
import { useTheme } from '~/theme'
import { MainNavigator } from './main'
import { DrawerNavigationParams, NavigatorProps } from './types'

/**
 * Drawer navigation.
 */
const Drawer = createDrawerNavigator<DrawerNavigationParams>()

/**
 * &lt;DrawerNavigator /> props.
 */
interface Props extends NavigatorProps {}

/**
 * Drawer navigator.
 * @param props Props.
 * @returns &lt;DrawerNavigator />.
 */
export const DrawerNavigator: React.FC<Props> = props => {
  const { initialScreen, initialParams } = props
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
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
      <Drawer.Screen name='About' component={AboutScreen} />
      <Drawer.Screen
        name='Policy'
        component={PolicyScreen}
        initialParams={initialParams}
      />
    </Drawer.Navigator>
  )
}
