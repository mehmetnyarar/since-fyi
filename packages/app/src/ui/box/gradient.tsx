import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import omit from 'lodash/omit'
import { box, styled, ViewProps as ThemeViewProps } from '~/theme'

/**
 * ViewProps excluding `start` and `end`.
 */
type ViewProps = Omit<ThemeViewProps, 'start' | 'end'>

/**
 * <GradientBox /> props.
 */
export interface GradientBoxProps extends ViewProps, LinearGradientProps {}

/**
 * GradientBox.
 */
export const GradientBox = styled(LinearGradient)<GradientBoxProps>`
  ${props => box(omit(props, ['start', 'end']))}
`
