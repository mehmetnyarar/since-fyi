import React from 'react'
import { useTheme } from '~/theme'
import { GradientBox, GradientBoxProps } from '~/ui'

/**
 * <Toolbar /> props.
 */
interface Props extends Partial<GradientBoxProps> {}

/**
 * Toolbar.
 * @param props Props.
 * @returns <Toolbar />.
 */
export const Toolbar: React.FC<Props> = ({ children, ...gradientProps }) => {
  const { colors } = useTheme()

  return (
    <GradientBox
      {...gradientProps}
      colors={colors.toolbar.back}
      height={64}
      padding={16}
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='center'
      accessible
      accessibilityRole='toolbar'
      accessibilityLabel='Toolbar'
    >
      {children}
    </GradientBox>
  )
}
