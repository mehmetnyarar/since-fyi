import { StackHeaderProps } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform } from 'react-native'
import { styled, useTheme } from '~/theme'
import { Heading } from '~/ui'
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

/**
 * Styled <LinearGradient />.
 */
const Container = styled(LinearGradient)`
  height: ${getHeight(Platform.OS)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`

/**
 * <Header /> props.
 */
interface Props extends Partial<StackHeaderProps> {}

/**
 * Screen header.
 * @returns <Header />.
 */
export const Header: React.FC<Props> = () => {
  const { colors } = useTheme()

  return (
    <Container
      colors={colors.header.back}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Header'
    >
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
    </Container>
  )
}
