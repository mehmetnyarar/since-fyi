import { ThemedStyledProps } from 'styled-components'
import { css } from './styled'
import { ColorPalette, CssUnit, TextProps, Theme, ViewProps } from './types'

/**
 * Reverses the order of colors.
 * @param palette Palette.
 * @returns Palette.
 */
export const reverse = (palette: ColorPalette): ColorPalette => {
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

/**
 * Calculates the CSS value.
 * @param value Value.
 * @param [unit="px"] Unit.
 * @returns CSS value.
 */
const cssValue = (value?: number | string, unit: CssUnit = 'px') => {
  if (!value) return undefined
  if (typeof value === 'number') return `${value}${unit}`
  return value
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
  const { theme, variant, state, ...rest } = props

  const {
    flex,
    flexWrap,
    flexBasis,
    flexShrink,
    display,
    flexDirection,
    justifyContent,
    alignItems,
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
  } = rest

  const style = variant && theme.variant[variant]

  // margin
  const mt = margin || marginVertical || marginTop
  const mr = margin || marginHorizontal || marginRight
  const mb = margin || marginVertical || marginBottom
  const ml = margin || marginHorizontal || marginLeft

  // padding
  const pt = padding || paddingVertical || paddingTop
  const pr = padding || paddingHorizontal || paddingRight
  const pb = padding || paddingVertical || paddingBottom
  const pl = padding || paddingHorizontal || paddingLeft

  // border radius
  const brtr = borderRadius || borderTopRightRadius
  const brbr = borderRadius || borderBottomRightRadius
  const brbl = borderRadius || borderBottomLeftRadius
  const brtl = borderRadius || borderTopLeftRadius

  // border
  const bc = String(borderColor || (style && state && style[state].borderColor))
  const bt = bc && (borderWidth || borderTopWidth)
  const br = bc && (borderWidth || borderRightWidth)
  const bb = bc && (borderWidth || borderBottomWidth)
  const bl = bc && (borderWidth || borderLeftWidth)

  // background
  const bg = String(
    backgroundColor || (style && state && style[state].backgroundColor)
  )

  return css`
    ${flex && `flex: ${flex};`}
    ${flexWrap && `flex-wrap: ${flexWrap};`}
    ${flexBasis && `flex-basis: ${flexBasis};`}
    ${flexShrink && `flex-shrink: ${flexShrink};`}
    ${display && `display: ${display};`}
    ${flexDirection && `flex-direction: ${flexDirection};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${width && `width: ${cssValue(width, unit)};`}
    ${minWidth && `min-width: ${cssValue(minWidth, unit)};`}
    ${maxWidth && `max-width: ${cssValue(maxWidth, unit)};`}
    ${height && `height: ${cssValue(height, unit)};`}
    ${minHeight && `min-height: ${cssValue(minHeight, unit)};`}
    ${maxHeight && `max-height: ${cssValue(maxHeight, unit)};`}
    ${pt && `padding-top: ${cssValue(pt, unit)};`}
    ${pr && `padding-right: ${cssValue(pr, unit)};`}
    ${pb && `padding-bottom: ${cssValue(pb, unit)};`}
    ${pl && `padding-left: ${cssValue(pl, unit)};`}
    ${mt && `margin-top: ${cssValue(mt, unit)};`}
    ${mr && `margin-right: ${cssValue(mr, unit)};`}
    ${mb && `margin-bottom: ${cssValue(mb, unit)};`}
    ${ml && `margin-left: ${cssValue(ml, unit)};`}
    ${pt && `padding-top: ${cssValue(pt, unit)};`}
    ${pr && `padding-right: ${cssValue(pr, unit)};`}
    ${pb && `padding-bottom: ${cssValue(pb, unit)};`}
    ${pl && `padding-left: ${cssValue(pl, unit)};`}
    ${brtr && `border-radius-top-right: ${cssValue(brtr, unit)};`}
    ${brbr && `border-radius-bottom-right: ${cssValue(brbr, unit)};`}
    ${brbl && `border-radius-bottom-left: ${cssValue(brbl, unit)};`}
    ${brtl && `border-radius-top-left: ${cssValue(brtl, unit)};`}
    ${bt && `border-top-width: ${cssValue(bt, unit)};`}
    ${bt && `border-top-color: ${bc};`}
    ${br && `border-right-width: ${cssValue(br, unit)};`}
    ${br && `border-right-color: ${bc};`}
    ${bb && `border-bottom-width: ${cssValue(bb, unit)};`}
    ${bb && `border-bottom-color: ${bc};`}
    ${bl && `border-left-width: ${cssValue(bl, unit)};`}
    ${bl && `border-left-color: ${bc};`}
    ${bg && `background-color: ${bg};`}
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
  const { theme, variant, state, ...rest } = props
  const { color, fontSize, fontStyle, fontWeight } = rest

  const style = variant && theme.variant[variant]
  const c = color || (style && state && style[state].color) || theme.colors.text

  return css`
    ${c && `color: ${String(c)};`}
    ${fontSize && `font-size: ${cssValue(fontSize, unit)};`}
    ${fontStyle && `font-style: ${fontStyle};`}
    ${fontWeight && `font-weight: ${fontWeight};`}
  `
}
