import { TextInputProps as RNTextInputProps } from 'react-native'
import { box, styled, TextProps, txt, ViewProps } from '~/theme'

/**
 * <TextInput /> props.
 */
export interface TextInputProps
  extends ViewProps,
    TextProps,
    RNTextInputProps {}

/**
 * TextInput.
 * @param props Props.
 * @returns <TextInput />.
 */
export const TextInput = styled.TextInput<TextInputProps>`
  height: 32px;
  border-radius: 4px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  ${props => box(props)}
  ${props => txt(props)}
`
