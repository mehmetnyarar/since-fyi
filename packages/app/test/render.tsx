/* eslint-disable @typescript-eslint/no-explicit-any */

import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { EventManagerProvider } from '~/hooks/event-manager'
import { i18n } from '~/i18n'
import { InitialScreen, Navigator } from '~/navigation'
import { light, ThemeProvider } from '~/theme'

const Wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>
    <I18nextProvider i18n={i18n}>
      <EventManagerProvider>{children}</EventManagerProvider>
    </I18nextProvider>
  </ThemeProvider>
)

/**
 * Renderer for screens.
 * @param name Screen name.
 * @param params Screen parameters.
 */
export const renderScreen = (name?: InitialScreen) => {
  return {
    ...rtlRender(<Navigator initialScreen={name} />, {
      wrapper: Wrapper
    })
  }
}

/**
 * Renderer non-screen components.
 */
export const render = (ui: React.ReactElement) => {
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper
    })
  }
}
