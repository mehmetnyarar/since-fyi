import { DarkTheme } from '@react-navigation/native'
import { defaultPalette } from '../palette'
import { Theme } from '../types'
import { invertBasic } from '../utility'

const palette = invertBasic(defaultPalette)

export const dark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: palette.primary[500],
    background: palette.basic[200],
    card: palette.basic[100],
    text: palette.basic[900],
    hint: palette.basic[600],
    border: palette.basic[300],
    backdrop: 'rgba(50, 50, 50, 0.75)',
    header: {
      back: [palette.primary[400], palette.primary[500]],
      text: palette.basic[900]
    },
    toolbar: {
      back: [palette.primary[500], palette.primary[600]],
      text: palette.basic[900]
    }
  },
  palette
}
