import { ScrollViewProps } from 'react-native'
import { box, styled } from '~/theme'
import { BoxProps } from '../box'

/**
 * <ScrollBox /> props.
 */
export interface ScrollBoxProps extends BoxProps, ScrollViewProps {}

/**
 * ScrollBox.
 */
export const ScrollBox = styled.ScrollView<ScrollBoxProps>`
  ${props => box(props)}
`
