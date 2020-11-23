import { styled } from '~/theme'

/**
 * Divider.
 * @returns &lt;Divider />.
 */
export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`
