import { getTextStyles, styled, TextProps } from '~/theme'

/**
 * &lt;Typography /> props.
 */
export interface TypographyProps extends TextProps {}

/**
 * Typography.
 * @param props Props.
 * @returns &lt;Typography />.
 */
export const Typography = styled.Text<TypographyProps>`
  font-family: 'Rubik_400Regular';
  ${props => getTextStyles(props)}
`
