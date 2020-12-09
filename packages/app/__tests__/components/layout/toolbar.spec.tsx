import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { Toolbar } from '~/components/layout/toolbar'

describe('components/layout/toolbar', () => {
  it('should render', () => {
    const { getByA11yLabel, queryByA11yLabel } = render(<Toolbar />)

    expect(queryByA11yLabel(/add|update/i)).toBeFalsy()

    const input = getByA11yLabel(/title/i)
    fireEvent.changeText(input, 'Test event')

    expect(input.props.value).toBe('Test event')
    expect(queryByA11yLabel(/event/i)).toBeTruthy()

    jest.spyOn(console, 'log')

    const action = getByA11yLabel(/add|update/i)
    fireEvent.press(action)

    expect(console.log).toHaveBeenCalled()

    test.todo('Test onPressIn/onPressOut events')
  })
})
