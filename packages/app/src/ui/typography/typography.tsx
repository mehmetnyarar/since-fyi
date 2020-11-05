import { TextProps as RNTextProps } from 'react-native'
import { styled, TextProps, txt } from '~/theme'

/**
 * <Typography /> props.
 */
export interface TypographyProps extends TextProps, RNTextProps {}

/**
 * Typography.
 * @param props Props.
 * @returns <Typography />.
 */
export const Typography = styled.Text<TypographyProps>`
  font-family: 'Rubik_400Regular';
  ${props => txt(props)}
`
