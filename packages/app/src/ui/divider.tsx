import { styled } from '~/theme'

/**
 * Divider.
 * @returns <Divider />.
 */
export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`
