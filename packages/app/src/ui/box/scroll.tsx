import { ScrollViewProps } from 'react-native'
import { getViewStyles, styled } from '~/theme'
import { BoxProps } from '../box'

/**
 * &lt;ScrollBox /> props.
 */
export interface ScrollBoxProps extends BoxProps, ScrollViewProps {}

/**
 * ScrollBox.
 * @param props Props.
 * @returns &lt;ScrollBox />.
 */
export const ScrollBox = styled.ScrollView<ScrollBoxProps>`
  ${props => getViewStyles(props)}
`
