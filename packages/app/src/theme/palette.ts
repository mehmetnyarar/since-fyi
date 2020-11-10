import { ColorPalette, ThemePalette } from './types'

const basic: ColorPalette = {
  100: '#FFFFFF',
  200: '#F7F9FC',
  300: '#EDF1F7',
  400: '#E4E9F2',
  500: '#C5CEE0',
  600: '#8F9BB3',
  700: '#2E3A59',
  800: '#222B45',
  900: '#1A2138'
}

const primary: ColorPalette = {
  100: '#d3fbfd',
  200: '#a8f1fb',
  300: '#7bdef3',
  400: '#58c4e7',
  500: '#26a1d8',
  600: '#1b7eb9',
  700: '#135f9b',
  800: '#0c437d',
  900: '#073067'
}

const success: ColorPalette = {
  100: '#f1fccf',
  200: '#dffaa1',
  300: '#c5f270',
  400: '#aae64c',
  500: '#83d617',
  600: '#68b810',
  700: '#4f9a0b',
  800: '#397c07',
  900: '#2a6604'
}

const info: ColorPalette = {
  100: '#cfecff',
  200: '#9fd5ff',
  300: '#70baff',
  400: '#4ca1ff',
  500: '#1178ff',
  600: '#0c5cdb',
  700: '#0844b7',
  800: '#053093',
  900: '#03217a'
}

const warning: ColorPalette = {
  100: '#fff4cc',
  200: '#ffe699',
  300: '#ffd466',
  400: '#ffc23f',
  500: '#ffa500',
  600: '#db8500',
  700: '#b76900',
  800: '#934f00',
  900: '#7a3d00'
}

const danger: ColorPalette = {
  100: '#ffe4da',
  200: '#ffc3b5',
  300: '#ff9b90',
  400: '#ff7675',
  500: '#ff4756',
  600: '#db3350',
  700: '#b7234a',
  800: '#931642',
  900: '#7a0d3d'
}

/**
 * Default theme palette.
 */
export const defaultPalette: ThemePalette = {
  basic,
  primary,
  success,
  info,
  warning,
  danger
}
