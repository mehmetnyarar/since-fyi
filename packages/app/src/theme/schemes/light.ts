import { DefaultTheme } from '@react-navigation/native'
import { defaultPalette, getVariant } from '../colors'
import { Theme, ThemePalette } from '../types'

const palette: ThemePalette = {
  ...defaultPalette
}

const variant = getVariant(palette)

export const light: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary[500],
    text: palette.basic[800],
    border: palette.basic[500]
  },
  palette,
  variant
}
