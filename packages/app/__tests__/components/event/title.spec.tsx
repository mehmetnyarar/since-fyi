import { fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import { render } from 'test/render'
import { EventTitle } from '~/components/event/title'
import { EventAction } from '~/hooks/event-manager'
import { EVENT_TITLE_MAX_LENGTH } from '~/models'

// #region Setup

const onAction = jest.fn()
const onCancel = jest.fn()

interface Props {
  action: EventAction
}

const Component: React.FC<Props> = ({ action }) => {
  const [value, setValue] = useState('')

  return (
    <EventTitle
      action={action}
      onAction={onAction}
      onCancel={onCancel}
      loading={false}
      value={value}
      onChange={setValue}
    />
  )
}

beforeEach(() => {
  jest.resetAllMocks()
})

// #endregion

describe('components/event/title', () => {
  it('should create', () => {
    const { getByA11yLabel } = render(<Component action='create' />)

    const input = getByA11yLabel('event.title')

    // Change the title
    const title = 'Event'
    fireEvent.changeText(input, title)
    expect(input.props.value).toBe(title)

    const chars = getByA11yLabel('chars')
    const charsLeft = EVENT_TITLE_MAX_LENGTH - title.length
    const charsLeftText = `${charsLeft}/${EVENT_TITLE_MAX_LENGTH}`
    expect(chars).toHaveTextContent(charsLeftText)

    // Create
    const action = getByA11yLabel('event.create')
    fireEvent.press(action)
    expect(onAction).toHaveBeenCalled()

    // Cancel
    const cancel = getByA11yLabel('event.cancel')
    fireEvent.press(cancel)
    expect(onCancel).toHaveBeenCalled()
  })

  it('should upsert', () => {
    const { getByA11yLabel } = render(<Component action='upsert' />)

    const input = getByA11yLabel('event.title')

    // Change the title
    const title = 'Event'
    fireEvent.changeText(input, title)
    expect(input.props.value).toBe(title)

    const chars = getByA11yLabel('chars')
    const charsLeft = EVENT_TITLE_MAX_LENGTH - title.length
    const charsLeftText = `${charsLeft}/${EVENT_TITLE_MAX_LENGTH}`
    expect(chars).toHaveTextContent(charsLeftText)

    // Upsert
    const action = getByA11yLabel('event.upsert')
    fireEvent.press(action)
    expect(onAction).toHaveBeenCalled()

    // Cancel
    const cancel = getByA11yLabel('event.cancel')
    fireEvent.press(cancel)
    expect(onCancel).toHaveBeenCalled()
  })
})
