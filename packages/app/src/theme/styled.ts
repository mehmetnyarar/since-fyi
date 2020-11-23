import * as styledComponents from 'styled-components/native'
import { Theme } from '~/theme'

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<Theme>

export { css, ThemeProvider, useTheme }
export default styled
