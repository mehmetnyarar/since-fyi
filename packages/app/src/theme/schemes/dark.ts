import { DarkTheme as DefaultTheme } from '@react-navigation/native'
import { defaultPalette } from '../palette'
import { DynamicColors, StaticColors, Theme } from '../types'
import { invertBasic } from '../utility'

const palette = invertBasic(defaultPalette)

const base: StaticColors = {
  primary: palette.primary[500],
  backdrop: 'rgba(50, 50, 50, 0.75)',
  header: {
    background: [palette.primary[400], palette.primary[500]],
    text: palette.basic[900]
  },
  toolbar: {
    background: [palette.primary[500], palette.primary[600]],
    text: palette.basic[900]
  },
  notification: palette.primary[500]
}

const theme: DynamicColors = {
  background: palette.basic[200],
  card: palette.basic[100],
  text: palette.basic[900],
  hint: palette.basic[400],
  border: palette.basic[300]
}

const inverted: DynamicColors = {
  background: palette.basic[900],
  card: palette.basic[800],
  text: palette.basic[100],
  hint: palette.basic[600],
  border: palette.basic[600]
}

export const dark: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...base,
    ...theme,
    alt: inverted
  },
  palette
}
