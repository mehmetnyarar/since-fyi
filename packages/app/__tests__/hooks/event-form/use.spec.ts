import { act, renderHook } from '@testing-library/react-hooks'
import { useEventForm } from '~/hooks/event-form/use'
import { DEFAULT_EVENT, DEFAULT_PRESETS, Frequency, Schedule } from '~/models'

describe('hooks/event-form/use', () => {
  it('should render', async () => {
    const event = DEFAULT_EVENT
    const onSuccess = jest.fn()
    jest.spyOn(console, 'warn')

    const { result, waitFor, waitForNextUpdate } = renderHook(() =>
      useEventForm({
        onSuccess
      })
    )

    expect(result.current.values).toEqual(event)
    expect(result.current.loading).toBeFalsy()
    expect(result.current.presetOptions).toHaveLength(DEFAULT_PRESETS.length)
    expect(result.current.frequencyOptions).toHaveLength(
      Object.keys(Frequency).length
    )
    expect(result.current.isAtVisible).toBeFalsy()
    expect(result.current.isOnVisible).toBeFalsy()
    expect(result.current.onOptions).toHaveLength(0)

    act(() => {
      result.current.handlePresetChange('WEEK_1')
    })

    waitFor(() => {
      event.notification.frequency = Frequency.WEEK
      event.notification.every = 1
      expect(result.current.values).toEqual(event)
      expect(result.current.isOnVisible).toBeTruthy()
      expect(result.current.onOptions).toHaveLength(7)
    })

    act(() => {
      result.current.onSubmit()
    })

    await waitForNextUpdate()
    expect(console.warn).toHaveBeenCalled()

    const title = 'Test'
    const at: Schedule[] = [
      {
        on: 1,
        time: '08:00',
        active: true
      }
    ]

    act(() => {
      result.current.setValue('title', title)
      result.current.setValue('notification.at', at)
    })

    waitFor(() => {
      event.title = title
      event.notification.at = at
      expect(result.current.values).toEqual(event)
    })

    act(() => {
      result.current.onSubmit()
    })

    waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
