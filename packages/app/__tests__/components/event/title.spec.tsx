import { fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import { render } from 'test/render'
import { Title } from '~/components/event/title'
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
    <Title
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
  it('should render (create)', () => {
    const { getByText, getByA11yLabel } = render(<Component action='create' />)

    const input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()

    const value = 'New event'
    const charsLeft = EVENT_TITLE_MAX_LENGTH - value.length
    const charsLeftText = `${charsLeft}/${EVENT_TITLE_MAX_LENGTH}`

    fireEvent.changeText(input, value)
    expect(input.props.value).toBe(value)
    expect(getByText(charsLeftText)).toBeTruthy()

    const action = getByA11yLabel(/Add event/)
    expect(action).toBeTruthy()

    fireEvent.press(action)
    expect(onAction).toHaveBeenCalled()

    const cancel = getByA11yLabel(/Cancel/)
    expect(cancel).toBeTruthy()

    fireEvent.press(cancel)
    expect(onCancel).toHaveBeenCalled()
  })

  it('should render (update)', () => {
    const { getByText, getByA11yLabel } = render(<Component action='update' />)

    const input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()

    const value = 'Existing event'
    const charsLeft = EVENT_TITLE_MAX_LENGTH - value.length
    const charsLeftText = `${charsLeft}/${EVENT_TITLE_MAX_LENGTH}`

    fireEvent.changeText(input, value)
    expect(input.props.value).toBe(value)
    expect(getByText(charsLeftText)).toBeTruthy()

    const action = getByA11yLabel(/Update event/)
    expect(action).toBeTruthy()

    fireEvent.press(action)
    expect(onAction).toHaveBeenCalled()

    const cancel = getByA11yLabel(/Cancel/)
    expect(cancel).toBeTruthy()

    fireEvent.press(cancel)
    expect(onCancel).toHaveBeenCalled()
  })
})
