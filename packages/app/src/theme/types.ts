import { Theme as ReactNavigationTheme } from '@react-navigation/native'
import {
  TextProps as RNTextProps,
  TextStyle,
  ViewProps as RNViewProps,
  ViewStyle
} from 'react-native'

/**
 * Color palette.
 */
export interface ColorPalette {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

/**
 * Theme palette.
 */
export type ThemePalette = {
  [K in ColorVariant]: ColorPalette
}

/**
 * Color variant.
 */
export type ColorVariant =
  | 'basic'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

/**
 * Element type.
 */
export type ElementType = 'view' | 'text'

/**
 * Element state.
 */
export type ElementState = 'default' | 'active'

/**
 * Element appearance.
 */
export type ElementAppearance = 'filled' | 'outlined' | 'transparent'

/**
 * Element styles.
 */
export interface ElementStyles {
  borderColor?: string
  backgroundColor?: string
  color?: string
}

/**
 * Base theme.
 */
export interface ThemeBase extends ReactNavigationTheme {
  colors: {
    primary: string
    background: string
    card: string
    text: string
    hint: string
    border: string
    notification: string
    backdrop: string
    header: {
      back: string[]
      text: string
    }
    toolbar: {
      back: string[]
      text: string
    }
  }
}

/**
 * Theme.
 */
export interface Theme extends ThemeBase {
  palette: ThemePalette
}

/**
 * Theming props for any UI element.
 */
export interface ThemeProps {
  state?: ElementState
  variant?: ColorVariant
  appearance?: ElementAppearance
  inverted?: boolean
}

/**
 * Base props for any UI element.
 */
export interface BaseProps extends ThemeProps {
  hidden?: boolean
}

/**
 * View props.
 */
export interface ViewProps extends BaseProps, ViewStyle, RNViewProps {}

/**
 * Text props.
 */
export interface TextProps extends BaseProps, TextStyle, RNTextProps {}

/**
 * Element props.
 */
export type ElementProps = ViewProps & TextProps

/**
 * CSS unit.
 */
export type CssUnit = '' | 'px' | 'em' | 'rem'
