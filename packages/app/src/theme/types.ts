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
export type ElementState = 'default' | 'active' | 'disabled'

/**
 * Element appearance.
 */
export type ElementAppearance =
  | 'filled'
  | 'outlined'
  | 'underlined'
  | 'transparent'

export interface Border {
  width?: number
  color?: number
}
export interface BorderStyles {
  top?: Border
  right?: Border
  bottom?: Border
  left?: Border
}

/**
 * Element styles.
 */
export interface ElementStyles {
  border?: BorderStyles
  borderColor?: string
  backgroundColor?: string
  color?: string
}

export interface GradientColor {
  background: string[]
  text: string
}

/**
 * Static colors.
 */
export interface StaticColors {
  /**
   * The primary color of the app used to tint various elements.
   * Usually you'll want to use your brand color for this.
   */
  primary: string
  /**
   * Background color for modals.
   */
  backdrop: string
  /**
   * Gradient colors.
   */
  header: GradientColor
  toolbar: GradientColor
  /**
   * The color of Tab Navigator badge.
   */
  notification: string
}

/**
 * Dynamic colors.
 */
export interface DynamicColors {
  /**
   * The color of various backgrounds, such as background color for the screens.
   */
  background: string
  /**
   * The background color of card-like elements, such as headers, tab bars etc.
   */
  card: string
  /**
   * The text color of various elements.
   */
  text: string
  /**
   * The text color of various elements, such as placeholders.
   */
  hint: string
  /**
   * The color of borders, e.g. header border, tab bar border etc.
   */
  border: string
}

/**
 * Theme colors.
 */
export type ThemeColors = StaticColors &
  DynamicColors & {
    /**
     * Alternative/inverted colors.
     */
    alt: DynamicColors
  }

/**
 * Base theme.
 */
export interface ThemeBase extends ReactNavigationTheme {
  colors: ThemeColors
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
  disabled?: boolean
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
