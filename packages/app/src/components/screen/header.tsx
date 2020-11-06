import { StackHeaderProps } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform } from 'react-native'
import { styled, useTheme } from '~/theme'
import { H1 } from '~/ui'
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
const Gradient = styled(LinearGradient)`
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
  const { palette } = useTheme()
  const textColor = palette.basic[100]

  return (
    <Gradient
      colors={[palette.primary[400], palette.primary[500]]}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Header'
    >
      <H1
        color={textColor}
        accessible
        accessibilityRole='text'
        accessibilityLabel='Since'
      >
        Since
      </H1>
      <Logo size={32} fill={textColor} testID='logo' />
    </Gradient>
  )
}
