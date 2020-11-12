import { useIsDrawerOpen } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { useTheme } from '~/theme'
import { GradientBox, HBox, Heading, Icon, Pressable } from '~/ui'
import { Logo } from './logo'

/**
 * Determines the height of the header based on platform.
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

// NOTE Props should extend DrawerHeaderProps
// but it's not exported from the `@react-navigation/drawer` package.

/**
 * <Header /> props.
 */
interface Props {}

/**
 * Screen header.
 * @returns <Header />.
 */
export const Header: React.FC<Props> = () => {
  const { colors } = useTheme()

  const { dispatch } = useNavigation()
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
      flexDirection='row'
      justifyContent='center'
      alignItems='flex-end'
      accessible
      accessibilityRole='header'
      accessibilityLabel='Header'
    >
      <Pressable
        position='absolute'
        top={height / 2 + 6}
        right={16}
        onPress={toggleDrawer}
      >
        <Icon
          name={isDrawerOpen ? 'menu-open' : 'menu'}
          size={32}
          color={colors.header.text}
        />
      </Pressable>
      <HBox>
        <Heading
          level={1}
          color={colors.header.text}
          accessible
          accessibilityRole='text'
          accessibilityLabel='Since'
        >
          Since
        </Heading>
        <Logo size={32} fill={colors.header.text} testID='logo' />
      </HBox>
    </GradientBox>
  )
}
