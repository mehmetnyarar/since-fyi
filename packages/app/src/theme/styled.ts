import * as styledComponents from 'styled-components/native'
import { Theme } from './types'

const {
  default: styled,
  css,
  ThemeProvider
} = (styledComponents as unknown) as styledComponents.ReactNativeThemedStyledComponentsModule<
  Theme
>

export { styled, css, ThemeProvider }
export default styled
