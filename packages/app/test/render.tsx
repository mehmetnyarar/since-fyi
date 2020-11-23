/* eslint-disable @typescript-eslint/no-explicit-any */

import { render as rtlRender } from '@testing-library/react-native'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { EventManagerProvider } from '~/hooks/event-manager'
import { i18n } from '~/i18n'
import { InitialParams, InitialScreen, Navigator } from '~/navigation'
import { light, ThemeProvider } from '~/theme'

/**
 * Context providers.
 */
const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>
    <I18nextProvider i18n={i18n}>
      <EventManagerProvider>{children}</EventManagerProvider>
    </I18nextProvider>
  </ThemeProvider>
)

/**
 * Renders a screen.
 * @param name Screen name.
 * @param params Screen parameters.
 */
export const renderScreen = (name?: InitialScreen, params?: InitialParams) => {
  return {
    ...rtlRender(<Navigator initialScreen={name} initialParams={params} />, {
      wrapper: Providers
    })
  }
}

/**
 * Renders a non-screen component.
 */
export const render = (ui: React.ReactElement) => {
  return {
    ...rtlRender(ui, {
      wrapper: Providers
    })
  }
}
