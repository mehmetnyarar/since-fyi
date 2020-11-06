import {
  ElementStyle,
  ThemePalette,
  ThemeVariant,
  VariantStyle
} from '../types'

/**
 * Creates a variant for the given palette.
 * @param palette Theme palette.
 * @returns Theme variant.
 */
export const getVariant = (palette: ThemePalette): ThemeVariant => {
  const disabled: ElementStyle = {
    borderColor: palette.basic[100],
    backgroundColor: palette.basic[100],
    color: palette.basic[600]
  }

  const basic: VariantStyle = {
    default: {
      borderColor: palette.basic[700],
      backgroundColor: palette.basic[700],
      color: palette.basic[200]
    },
    active: {
      borderColor: palette.basic[800],
      backgroundColor: palette.basic[800],
      color: palette.basic[200]
    },
    disabled
  }

  const inverted: VariantStyle = {
    default: {
      borderColor: palette.basic[500],
      backgroundColor: palette.basic[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.basic[500],
      backgroundColor: palette.basic[600],
      color: palette.basic[100]
    },
    disabled
  }

  const primary: VariantStyle = {
    default: {
      borderColor: palette.primary[500],
      backgroundColor: palette.primary[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.primary[600],
      backgroundColor: palette.primary[600],
      color: palette.basic[100]
    },
    disabled
  }

  const success: VariantStyle = {
    default: {
      borderColor: palette.success[500],
      backgroundColor: palette.success[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.success[500],
      backgroundColor: palette.success[600],
      color: palette.basic[100]
    },
    disabled
  }

  const info: VariantStyle = {
    default: {
      borderColor: palette.info[500],
      backgroundColor: palette.info[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.info[500],
      backgroundColor: palette.info[600],
      color: palette.basic[100]
    },
    disabled
  }

  const warning: VariantStyle = {
    default: {
      borderColor: palette.warning[500],
      backgroundColor: palette.warning[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.warning[500],
      backgroundColor: palette.warning[600],
      color: palette.basic[100]
    },
    disabled
  }

  const danger: VariantStyle = {
    default: {
      borderColor: palette.danger[500],
      backgroundColor: palette.danger[500],
      color: palette.basic[100]
    },
    active: {
      borderColor: palette.danger[500],
      backgroundColor: palette.danger[600],
      color: palette.basic[100]
    },
    disabled
  }

  return {
    basic,
    inverted,
    primary,
    success,
    info,
    warning,
    danger
  }
}
