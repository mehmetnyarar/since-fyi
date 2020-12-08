import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { LanguageSwitcher } from '~/components/i18n/language'

jest.spyOn(console, 'log')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('components/i18n/language', () => {
  it('should render on ios', async () => {
    const { getByA11yLabel, findByA11yLabel } = render(<LanguageSwitcher />)

    // Should show the current language
    const button = getByA11yLabel('language')
    expect(button.children[0]).toHaveTextContent('LANGUAGE.en')

    // Show dialog
    fireEvent.press(button)

    // Select a language
    const picker = await findByA11yLabel('language.pick')
    expect(picker.props.selectedValue).toBe('en')

    fireEvent(picker, 'onValueChange', 'tr')
    expect(picker.props.selectedValue).toBe('tr')

    // Confirm
    const confirm = await findByA11yLabel('confirm')
    fireEvent.press(confirm)
    expect(console.log).toHaveBeenCalledWith('tr')
  })
})
