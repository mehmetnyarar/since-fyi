import { Theme as RNTheme } from '@react-navigation/native'
import { TextStyle, ViewStyle } from 'react-native'
import { DefaultTheme as SCTheme } from 'styled-components'

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
export type ElementType = 'box' | 'text'

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
export interface ThemeBase extends RNTheme, SCTheme {
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
 * Box props.
 */
export interface ViewProps extends ThemeProps, ViewStyle {
  hidden?: boolean
}

/**
 * Typography props.
 */
export interface TextProps extends ThemeProps, TextStyle {
  hidden?: boolean
}

/**
 * CSS unit.
 */
export type CssUnit = '' | 'px' | 'em' | 'rem'
