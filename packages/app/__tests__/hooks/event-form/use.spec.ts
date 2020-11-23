import { act, renderHook } from '@testing-library/react-hooks'
import { useEventForm } from '~/hooks/event-form/use'
import { getEvent } from '~/models'

jest.spyOn(console, 'warn')
const onCreate = jest.fn()
const onUpdate = jest.fn()

describe('hooks/event-form/use', () => {
  it('should render (invalid form)', () => {
    const event = getEvent()
    const { result, waitFor } = renderHook(() =>
      useEventForm({
        event,
        onCreate,
        onUpdate
      })
    )

    // Values should equal to the event values
    expect(result.current.values).toEqual(event)

    // Submit form
    act(() => result.current.onSubmit())
    waitFor(() => expect(console.warn).toHaveBeenCalled())
  })

  it('should render (valid form)', () => {
    const event = getEvent({ title: 'Event' })
    const { result, waitFor } = renderHook(() =>
      useEventForm({
        event,
        onCreate,
        onUpdate
      })
    )

    // Values should equal to the event values
    expect(result.current.values).toEqual(event)

    // Submit form
    act(() => result.current.onSubmit())
    waitFor(() => expect(onCreate).toHaveBeenCalled())
  })
})
