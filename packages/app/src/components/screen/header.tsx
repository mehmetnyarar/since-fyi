import { useIsDrawerOpen } from '@react-navigation/drawer'
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { useTheme } from '~/theme'
import { GradientBox, HBox, Heading, Icon, Pressable } from '~/ui'
import { Logo } from './logo'

// Can be used in two places:
// Layout component or DrawerNavigator.screenOptions.header

/**
 * Determines the height of the header based on the platform.
 */
export const getHeight = (os: typeof Platform.OS) => {
  switch (os) {
    case 'ios':
      return 96
    case 'android':
      return 72
    default:
      return 64
  }
}

/**
 * &lt;Header /> props.
 */
interface Props extends Partial<DrawerHeaderProps> {}

/**
 * Screen header.
 * @param props Props.
 * @returns &lt;Header />.
 */
export const Header: React.FC<Props> = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const { dispatch, navigate } = useNavigation()
  const isDrawerOpen = useIsDrawerOpen()
  const toggleDrawer = useCallback(() => {
    dispatch(DrawerActions.toggleDrawer())
  }, [dispatch])

  const height = useMemo(() => getHeight(Platform.OS), [])

  return (
    <GradientBox
      colors={colors.header.back}
      position='relative'
      height={height}
      padding={16}
      paddingTop={48}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      accessible
      accessibilityRole='header'
      accessibilityLabel={t('header')}
    >
      <Pressable
        width={32}
        height={32}
        borderRadius={8}
        variant='primary'
        appearance='transparent'
        onPress={() => navigate('Home')}
        accessibilityHint={t('home.hint')}
        accessibilityLabel={t('home')}
      >
        <Logo size={24} fill={colors.header.text} testID='app.logo' />
      </Pressable>
      <HBox flex={1} justifyContent='center'>
        <Heading
          level={1}
          color={colors.header.text}
          textAlign='center'
          accessible
          accessibilityRole='text'
          accessibilityLabel={t('app.name')}
        >
          {t('app.name')}
        </Heading>
      </HBox>
      <Pressable
        width={32}
        height={32}
        borderRadius={8}
        variant='primary'
        appearance='transparent'
        onPress={toggleDrawer}
        accessibilityHint={t('menu.toggle.hint')}
        accessibilityLabel={t('menu.toggle')}
      >
        <Icon
          name={isDrawerOpen ? 'menu-open' : 'menu'}
          size={24}
          color={colors.header.text}
        />
      </Pressable>
    </GradientBox>
  )
}
