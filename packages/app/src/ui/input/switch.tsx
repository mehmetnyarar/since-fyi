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
  const { palette } = useTheme()

  return (
    <StyledSwitch
      {...props}
      trackColor={{ false: palette.basic[300], true: palette.primary[300] }}
      thumbColor={props.value ? palette.primary[500] : palette.basic[500]}
    />
  )
}
