import { getViewStyles, styled, ViewProps } from '~/theme'

/**
 * &lt;Box /> props.
 */
export interface BoxProps extends ViewProps {}

/**
 * Box.
 * @param props Props.
 * @returns &lt;Box />.
 */
export const Box = styled.View<BoxProps>`
  ${props => getViewStyles(props)}
`
