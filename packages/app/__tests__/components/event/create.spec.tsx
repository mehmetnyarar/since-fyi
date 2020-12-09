import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { EventCreate } from '~/components/event/create'

describe('components/event/create', () => {
  it('should render', () => {
    const handleSuccess = jest.fn()
    const { getByA11yLabel } = render(<EventCreate onSuccess={handleSuccess} />)

    const input = getByA11yLabel('event.title')

    // Change the title
    const title = 'Event'
    fireEvent.changeText(input, title)
    expect(input.props.value).toBe(title)

    // Cancel
    const cancel = getByA11yLabel('event.cancel')
    fireEvent.press(cancel)
    expect(input.props.value).toBe('')

    // Change the title
    fireEvent.changeText(input, title)
    expect(input.props.value).toBe(title)

    // Create
    const action = getByA11yLabel('event.create')
    fireEvent.press(action)
    expect(handleSuccess).toHaveBeenCalled()
  })
})
