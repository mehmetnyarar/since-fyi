import { fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import { render } from 'test/render'
import { Title } from '~/components/event/title'
import { EventAction } from '~/hooks/event-manager'

// #region Setup

const onAction = jest.fn()
const onCancel = jest.fn()

interface Props {
  action: EventAction
  maxLength?: number
}

const Component: React.FC<Props> = ({ action, maxLength }) => {
  const [value, setValue] = useState('')

  return (
    <Title
      action={action}
      onAction={onAction}
      onCancel={onCancel}
      loading={false}
      value={value}
      onChange={setValue}
      maxLength={maxLength}
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

    fireEvent.changeText(input, 'New event')
    expect(input.props.value).toBe('New event')
    expect(getByText('26/35')).toBeTruthy()

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
    const { getByText, getByA11yLabel } = render(
      <Component action='update' maxLength={50} />
    )

    const input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()

    fireEvent.changeText(input, 'Existing event')
    expect(input.props.value).toBe('Existing event')
    expect(getByText('36/50')).toBeTruthy()

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
