import { styled } from '~/theme'

/**
 * Input.
 */
export const Input = styled.TextInput`
  flex: 1;
  height: 32px;
  border-radius: 4px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`
