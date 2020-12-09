import React from 'react'
import { SwitchProps } from 'react-native'
import { styled, useTheme } from '~/theme'

/**
 * &lt;Switch /> props.
 */
interface Props extends SwitchProps {}

const Styled = styled.Switch<SwitchProps>``

/**
 * Switch.
 * @param props Props.
 * @returns &lt;Switch />.
 */
export const Switch: React.FC<Props> = props => {
  const { colors } = useTheme()

  return (
    <Styled
      {...props}
      trackColor={{ false: colors.background, true: colors.primary }}
      accessible
      accessibilityRole='switch'
    />
  )
}
