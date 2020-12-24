import { ThemedStyledProps } from 'styled-components'
import { css } from './styled'
import {
  BaseProps,
  ColorPalette,
  ColorVariant,
  CssUnit,
  ElementStyles,
  ElementType,
  TextProps,
  Theme,
  ThemePalette,
  ViewProps
} from './types'

/**
 * Inverts the color order.
 * @param palette Palette.
 * @returns ColorPalette.
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

/**
 * Inverts a theme.
 * @param theme Theme.
 * @returns ThemePalette.
 */
export const invertTheme = (theme: ThemePalette): ThemePalette => {
  const keys = Object.keys(theme) as ColorVariant[]
  const inverted = keys.reduce((result, variant) => {
    result[variant] = invertColors(theme[variant])
    return result
  }, {} as Partial<ThemePalette>)

  return inverted as ThemePalette
}

/**
 * Inverts only basic colors.
 * @param theme Theme.
 * @returns ThemePalette.
 */
export const invertBasic = (theme: ThemePalette): ThemePalette => {
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

/**
 * Determines the element styles.
 * @param type Type of element.
 * @param props Element props.
 * @returns ElementStyles.
 */
const getElementStyles = (
  type: ElementType,
  props: ThemedStyledProps<BaseProps, Theme>
): ElementStyles => {
  const { theme, state } = props
  const basic = theme.palette.basic
  if (state === 'disabled') {
    return {
      borderColor: type === 'view' ? basic[500] : undefined,
      backgroundColor: type === 'view' ? basic[600] : undefined,
      color: type === 'view' ? basic[200] : basic[400]
    }
  }

  const { variant } = props
  if (!variant) return {}

  const { inverted, appearance } = props
  const palette = theme.palette[variant]

  switch (type) {
    case 'view':
      return {
        borderColor: state === 'active' ? palette[400] : palette[500],
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
 * Determines the CSS styles of a view element.
 * @param props Props.
 * @param [state] Element state.
 * @returns Styles.
 */
export const getViewStyles = (
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
  const styles = getElementStyles('view', props)

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
  const t = appearance === 'transparent'
  const u = appearance === 'underlined'
  const bc = t ? 'transparent' : borderColor || styles.borderColor
  const btw = t || u ? undefined : borderTopWidth || borderWidth
  const btc = btw ? String(bc) : undefined
  const brw = t || u ? undefined : borderRightWidth || borderWidth
  const brc = brw ? String(bc) : undefined
  const bbw = t ? undefined : borderBottomWidth || borderWidth
  const bbc = bbw ? String(bc) : undefined
  const blw = t || u ? undefined : borderLeftWidth || borderWidth
  const blc = blw ? String(bc) : undefined

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
    CSS('border-top-width', btw, unit),
    CSS('border-top-color', btc),
    CSS('border-right-width', brw, unit),
    CSS('border-right-color', brc),
    CSS('border-bottom-width', bbw, unit),
    CSS('border-bottom-color', bbc),
    CSS('border-left-width', blw, unit),
    CSS('border-left-color', blc),
    CSS('background-color', bg && String(bg))
  ].filter(value => Boolean(value))

  if (props.nativeID === 'EventCard') {
    console.debug('getViewStyles', {
      props,
      styles,
      t,
      u,
      btw,
      btc,
      brw,
      brc,
      bbw,
      bbc,
      blw,
      blc,
      cssStyles
    })
  }

  return css`
    ${cssStyles}
  `
}

/**
 * Determines the CSS styles of a text element.
 * @param variant Variant.
 * @param [state] Element state.
 * @returns Styles.
 */
export const getTextStyles = (
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
    ...getViewStyles(props),
    CSS('color', String(c)),
    CSS('font-size', fontSize, unit),
    CSS('font-style', fontStyle),
    CSS('font-weight', fontWeight),
    CSS('text-align', textAlign)
  ].filter(value => Boolean(value))

  if (props.nativeID === 'EventHeading') {
    console.debug('EventHeading', {
      styles,
      color,
      c
    })
  }

  return css`
    ${cssStyles}
  `
}
