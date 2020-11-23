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
  const { palette } = useTheme()

  return (
    <Styled
      {...props}
      trackColor={{ false: palette.basic[300], true: palette.primary[300] }}
      thumbColor={props.value ? palette.primary[500] : palette.basic[500]}
      accessible
      accessibilityRole='switch'
    />
  )
}
