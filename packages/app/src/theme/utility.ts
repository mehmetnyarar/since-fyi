import { ThemedStyledProps } from 'styled-components'
import { css } from './styled'
import {
  ColorPalette,
  ColorVariant,
  CssUnit,
  ElementAppearance,
  ElementStyles,
  ElementType,
  TextProps,
  Theme,
  ThemePalette,
  ViewProps
} from './types'

/**
 * Reverses the order of colors.
 * @param palette Palette.
 * @returns Palette.
 */
export const invertColors = (palette: ColorPalette): ColorPalette => {
  return {
    100: palette[900],
    200: palette[800],
    300: palette[700],
    400: palette[600],
    500: palette[500],
    600: palette[400],
    700: palette[300],
    800: palette[200],
    900: palette[100]
  }
}

export const invertTheme = (theme: ThemePalette): ThemePalette => {
  const keys = Object.keys(theme) as ColorVariant[]
  const inverted = keys.reduce((result, variant) => {
    result[variant] = invertColors(theme[variant])
    return result
  }, {} as Partial<ThemePalette>)

  return inverted as ThemePalette
}

export const invert = (theme: ThemePalette): ThemePalette => {
  return {
    ...theme,
    basic: invertColors(theme.basic)
  }
}

/**
 * Calculates the CSS value.
 * @param value Value.
 * @param [unit] Unit.
 * @returns CSS value.
 */
const CSS = (prop: string, value?: number | string, unit?: CssUnit) => {
  if (typeof value === 'undefined') return ''

  if (typeof value === 'number' && unit) {
    return `${prop}: ${value}${unit};`
  }

  return `${prop}: ${value};`
}

const isTransparent = (appearance?: ElementAppearance) => {
  return appearance ? appearance === 'transparent' : false
}

const getElementStyles = (
  type: ElementType,
  props: ThemedStyledProps<ViewProps, Theme>
): ElementStyles => {
  const { theme, inverted, state, appearance, variant } = props

  if (!variant) {
    return {}
  }

  const basic = theme.palette.basic
  const palette = theme.palette[variant]

  switch (type) {
    case 'box':
      return {
        borderColor: !isTransparent(appearance)
          ? state === 'active'
              ? palette[400]
              : palette[500]
          : undefined,
        backgroundColor:
          state === 'active'
            ? palette[400]
            : appearance === 'filled'
              ? palette[500]
              : undefined,
        color:
          appearance === 'filled'
            ? state === 'active'
                ? basic[100]
                : palette[100]
            : state === 'active'
              ? palette[400]
              : palette[500]
      }
    case 'text':
      return {
        color: inverted ? palette[100] : palette[900]
      }
    default:
      return {}
  }
}

/**
 * Applies theme to a UI element.
 * @param variant Variant.
 * @param [state] Element state.
 * @returns Styles.
 */
export const box = (
  props: ThemedStyledProps<ViewProps, Theme>,
  unit: CssUnit = 'px'
) => {
  const { hidden } = props
  if (hidden) {
    return css`
      ${'display: none;'}
    `
  }

  const {
    appearance,
    position,
    top,
    right,
    bottom,
    left,
    flex,
    flexWrap,
    flexBasis,
    flexShrink,
    display,
    flexDirection,
    justifyContent,
    alignContent,
    alignItems,
    alignSelf,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    margin,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginVertical,
    marginTop,
    marginBottom,
    padding,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingVertical,
    paddingTop,
    paddingBottom,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderColor,
    backgroundColor
  } = props
  const styles = getElementStyles('box', props)

  // margin
  const mt = marginTop || marginVertical || margin
  const mr = marginRight || marginHorizontal || margin
  const mb = marginBottom || marginVertical || margin
  const ml = marginLeft || marginHorizontal || margin

  // padding
  const pt = paddingTop || paddingVertical || padding
  const pr = paddingRight || paddingHorizontal || padding
  const pb = paddingBottom || paddingVertical || padding
  const pl = paddingLeft || paddingHorizontal || padding

  // border radius
  const brtr = borderTopRightRadius || borderRadius
  const brbr = borderBottomRightRadius || borderRadius
  const brbl = borderBottomLeftRadius || borderRadius
  const brtl = borderTopLeftRadius || borderRadius

  // border
  const transparent = isTransparent(appearance)
  const bw = borderWidth || Number(!transparent)
  const bc = borderColor || styles.borderColor
  const bt = bc ? bw || borderTopWidth : undefined
  const br = bc ? bw || borderRightWidth : undefined
  const bb = bc ? bw || borderBottomWidth : undefined
  const bl = bc ? bw || borderLeftWidth : undefined

  // background
  const bg = backgroundColor || styles.backgroundColor

  const cssStyles = [
    CSS('position', position),
    CSS('top', top, unit),
    CSS('right', right, unit),
    CSS('bottom', bottom, unit),
    CSS('left', left, unit),
    CSS('flex', flex),
    CSS('flex-wrap', flexWrap),
    CSS('flex-basis', flexBasis, unit),
    CSS('flex-shrink', flexShrink),
    CSS('display', display),
    CSS('flex-direction', flexDirection),
    CSS('justify-content', justifyContent),
    CSS('align-content', alignContent),
    CSS('align-items', alignItems),
    CSS('align-self', alignSelf),
    CSS('width', width, unit),
    CSS('min-width', minWidth, unit),
    CSS('max-width', maxWidth, unit),
    CSS('height', height, unit),
    CSS('min-height', minHeight, unit),
    CSS('max-height', maxHeight, unit),
    CSS('margin-top', mt, unit),
    CSS('margin-right', mr, unit),
    CSS('margin-bottom', mb, unit),
    CSS('margin-left', ml, unit),
    CSS('padding-top', pt, unit),
    CSS('padding-right', pr, unit),
    CSS('padding-bottom', pb, unit),
    CSS('padding-left', pl, unit),
    CSS('border-top-right-radius', brtr, unit),
    CSS('border-bottom-right-radius', brbr, unit),
    CSS('border-bottom-left-radius', brbl, unit),
    CSS('border-top-left-radius', brtl, unit),
    CSS('border-top-width', bt, unit),
    bt ? `border-top-color: ${String(bc)};` : undefined,
    CSS('border-right-width', br, unit),
    br ? `border-right-color: ${String(bc)};` : undefined,
    CSS('border-bottom-width', bb, unit),
    bb ? `border-bottom-color: ${String(bc)};` : undefined,
    CSS('border-left-width', bl, unit),
    bl ? `border-left-color: ${String(bc)};` : undefined,
    CSS('background-color', bg ? String(bg) : undefined)
  ].filter(value => Boolean(value))

  return css`
    ${cssStyles}
  `
}

/**
 * Applies theme to a UI element.
 * @param variant Variant.
 * @param [state] Element state.
 * @returns Styles.
 */
export const txt = (
  props: ThemedStyledProps<TextProps, Theme>,
  unit: CssUnit = 'px'
) => {
  const { hidden } = props
  if (hidden) {
    return css`
      ${'display: none;'}
    `
  }

  const { theme, color, fontSize, fontStyle, fontWeight, textAlign } = props
  const styles = getElementStyles('text', props)
  const c = color || styles.color || theme.colors.text

  const cssStyles = [
    ...box(props),
    CSS('color', String(c)),
    CSS('font-size', fontSize, unit),
    CSS('font-style', fontStyle),
    CSS('font-weight', fontWeight),
    CSS('text-align', textAlign)
  ].filter(value => Boolean(value))

  return css`
    ${cssStyles}
  `
}
