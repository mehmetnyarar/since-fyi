import {
  DarkTheme as DefaultDarkTheme,
  DefaultTheme as DefaultLightTheme,
  Theme
} from '@react-navigation/native'

export const LightTheme: Theme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#26A1D8'
  }
}

export const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#26A1D8'
  }
}
