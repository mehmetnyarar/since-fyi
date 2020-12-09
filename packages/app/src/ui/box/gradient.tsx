import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import omit from 'lodash/omit'
import { ReactNode } from 'react'
import { getViewStyles, styled } from '~/theme'
import { BoxProps } from './box'

type SafeBoxProps = Omit<BoxProps, 'start' | 'end'>

/**
 * &lt;GradientBox /> props.
 */
export interface GradientBoxProps extends SafeBoxProps, LinearGradientProps {
  children?: ReactNode
}

/**
 * GradientBox.
 * @param props Props.
 * @returns &lt;GradientBox />.
 */
export const GradientBox = styled(LinearGradient)<GradientBoxProps>`
  ${props => getViewStyles(omit(props, ['start', 'end']))}
`
