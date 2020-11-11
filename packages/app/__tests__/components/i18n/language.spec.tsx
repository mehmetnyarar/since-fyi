import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { LanguageSwitcher } from '~/components/i18n'

describe('components/i18n/language', () => {
  it('should render', () => {
    const { getByA11yLabel, getByTestId } = render(<LanguageSwitcher />)

    const trigger = getByA11yLabel(/language.a11y/)

    fireEvent.press(trigger)
    const picker = getByTestId(/LanguagePicker/)
    expect(picker.props.selectedValue).toBe('en')

    fireEvent(picker, 'onValueChange', 'tr')
    expect(picker.props.selectedValue).toBe('tr')
  })

  it('should render (debug)', () => {
    const { getByTestId } = render(<LanguageSwitcher debug />)

    const box = getByTestId(/DebugLanguage/)
    expect(box).toHaveTextContent(/_test/)
  })
})
