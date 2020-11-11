import React from 'react'
import { SwitchProps } from 'react-native'
import { styled, useTheme } from '~/theme'

const StyledSwitch = styled.Switch``

/**
 * <Switch /> props.
 */
interface Props extends SwitchProps {}

/**
 * Switch.
 * @param props Props.
 * @returns <Switch />.
 */
export const Switch: React.FC<Props> = props => {
  const { colors, palette } = useTheme()

  return (
    <StyledSwitch
      {...props}
      trackColor={{ false: palette.basic[500], true: palette.primary[500] }}
      thumbColor={props.value ? palette.primary[700] : palette.basic[500]}
      ios_backgroundColor={colors.background}
    />
  )
}
