import { Theme as NavigationTheme } from '@react-navigation/native'
import { TextStyle, ViewStyle } from 'react-native'
import { DefaultTheme } from 'styled-components'

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
  | 'inverted'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

/**
 * Element state.
 */
export type ElementState = 'default' | 'active' | 'disabled'

/**
 * Element style.
 */
export interface ElementStyle {
  borderColor?: string
  backgroundColor?: string
  color?: string
}

/**
 * Variant style.
 */
export type VariantStyle = {
  [K in ElementState]: ElementStyle
}

/**
 * Theme variant.
 */
export type ThemeVariant = {
  [K in ColorVariant]: VariantStyle
}

/**
 * Theme.
 */
export interface Theme extends DefaultTheme, NavigationTheme {
  palette: ThemePalette
  variant: ThemeVariant
}

/**
 * Theming props for any UI element.
 */
export interface ThemeProps {
  variant?: ColorVariant
  state?: ElementState
}

/**
 * Box props.
 */
export interface ViewProps extends ThemeProps, ViewStyle {}

/**
 * Typography props.
 */
export interface TextProps extends ThemeProps, TextStyle {}

/**
 * CSS unit.
 */
export type CssUnit = 'px' | 'em' | 'rem'
