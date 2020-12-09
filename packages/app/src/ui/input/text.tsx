import { TextInputProps as RNTextInputProps } from 'react-native'
import {
  getTextStyles,
  getViewStyles,
  styled,
  TextProps,
  ViewProps
} from '~/theme'

type SafeViewProps = Omit<ViewProps, 'style'>

/**
 * &lt;TextInput /> props.
 */
export interface TextInputProps
  extends RNTextInputProps,
    SafeViewProps,
    TextProps {}

/**
 * TextInput.
 * @param props Props.
 * @returns &lt;TextInput />.
 */
export const TextInput = styled.TextInput<TextInputProps>`
  height: 32px;
  border-radius: 4px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  ${props => getViewStyles(props)}
  ${props => getTextStyles(props)}
`
