import { View as RNView, ViewProps as RNViewProps } from 'react-native'
import { box, styled, ViewProps } from '~/theme'

/**
 * <Box /> props.
 */
export interface BoxProps extends ViewProps, RNViewProps {}

/**
 * Box.
 * @param props Props.
 * @returns <Box />.
 */
export const Box = styled(RNView)<BoxProps>`
  ${props => box(props)}
`
