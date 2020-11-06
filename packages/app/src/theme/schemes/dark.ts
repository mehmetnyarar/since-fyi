import { DarkTheme } from '@react-navigation/native'
import { defaultPalette, getVariant } from '../colors'
import { Theme, ThemePalette } from '../types'
import { reverse } from '../utility'

const palette: ThemePalette = {
  ...defaultPalette,
  basic: reverse(defaultPalette.basic)
}

const variant = getVariant(palette)

export const dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: palette.primary[500],
    text: palette.basic[800],
    border: palette.basic[500]
  },
  palette,
  variant
}
