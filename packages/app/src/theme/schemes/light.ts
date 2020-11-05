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
    primary: defaultPalette.primary[500],
    text: defaultPalette.basic[800],
    border: defaultPalette.basic[600]
  },
  palette,
  variant
}
